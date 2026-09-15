import { createContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL;

/* ── Session constants ── */
const INACTIVITY_LIMIT = 30 * 60 * 1000;   // 30 minutes
const ABSOLUTE_LIMIT   =  8 * 60 * 60 * 1000; // 8 hours
const SESSION_KEY      = 'spark_token';
const LOGIN_TIME_KEY   = 'spark_login_time';
const ACTIVITY_EVENTS  = ['mousedown', 'keydown', 'touchstart', 'scroll', 'click'];

const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  const inactivityTimer = useRef(null);
  const absoluteTimer   = useRef(null);

  /* ─────────────────────────────────────────────
     LOGOUT — clears everything
  ───────────────────────────────────────────── */
  const logout = useCallback(async (reason) => {
    clearTimeout(inactivityTimer.current);
    clearTimeout(absoluteTimer.current);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LOGIN_TIME_KEY);
    try { await signOut(auth); } catch (_) {}
    setUser(null);
    if (reason === 'inactivity') {
      // small flag so Login page can show a message
      sessionStorage.setItem('spark_logout_reason', 'inactivity');
    }
    if (reason === 'expired') {
      sessionStorage.setItem('spark_logout_reason', 'expired');
    }
  }, []);

  /* ─────────────────────────────────────────────
     INACTIVITY TIMER
     Resets on every user interaction.
     Auto-logout after INACTIVITY_LIMIT of no activity.
  ───────────────────────────────────────────── */
  const resetInactivityTimer = useCallback(() => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      logout('inactivity');
    }, INACTIVITY_LIMIT);
  }, [logout]);

  const startActivityListeners = useCallback(() => {
    ACTIVITY_EVENTS.forEach(e =>
      window.addEventListener(e, resetInactivityTimer, { passive: true })
    );
    resetInactivityTimer(); // start immediately
  }, [resetInactivityTimer]);

  const stopActivityListeners = useCallback(() => {
    ACTIVITY_EVENTS.forEach(e =>
      window.removeEventListener(e, resetInactivityTimer)
    );
    clearTimeout(inactivityTimer.current);
  }, [resetInactivityTimer]);

  /* ─────────────────────────────────────────────
     ABSOLUTE SESSION TIMER
     Logs out after ABSOLUTE_LIMIT regardless of activity.
  ───────────────────────────────────────────── */
  const startAbsoluteTimer = useCallback((loginTime) => {
    clearTimeout(absoluteTimer.current);
    const elapsed   = Date.now() - loginTime;
    const remaining = ABSOLUTE_LIMIT - elapsed;
    if (remaining <= 0) {
      logout('expired');
      return;
    }
    absoluteTimer.current = setTimeout(() => {
      logout('expired');
    }, remaining);
  }, [logout]);

  /* ─────────────────────────────────────────────
     SET AUTHENTICATED USER
     Called after every successful login.
  ───────────────────────────────────────────── */
  const setAuthenticatedUser = useCallback((userData, token, loginTime) => {
    localStorage.setItem(SESSION_KEY, token);
    localStorage.setItem(LOGIN_TIME_KEY, String(loginTime));
    setUser(userData);
    startActivityListeners();
    startAbsoluteTimer(loginTime);
  }, [startActivityListeners, startAbsoluteTimer]);

  /* ─────────────────────────────────────────────
     RESTORE SESSION ON PAGE LOAD
  ───────────────────────────────────────────── */
  useEffect(() => {
    const token     = localStorage.getItem(SESSION_KEY);
    const loginTime = parseInt(localStorage.getItem(LOGIN_TIME_KEY) || '0', 10);

    if (token && loginTime) {
      /* Check if absolute session has already expired */
      if (Date.now() - loginTime >= ABSOLUTE_LIMIT) {
        logout('expired');
        setLoading(false);
        return;
      }

      axios
        .get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setUser({ ...res.data.user, authMethod: 'jwt' });
          startActivityListeners();
          startAbsoluteTimer(loginTime);
        })
        .catch(() => {
          localStorage.removeItem(SESSION_KEY);
          localStorage.removeItem(LOGIN_TIME_KEY);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    /* Firebase listener — only for Google sessions */
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(prev => {
          if (prev?.authMethod === 'jwt') return prev;
          /* During registration Firebase creates a session —
             we DON'T want to log them in automatically here.
             Only set user if they came from Google login. */
          return prev;
        });
      }
    });

    return () => {
      unsubscribe();
      stopActivityListeners();
      clearTimeout(absoluteTimer.current);
    };
  }, []);  // eslint-disable-line

  /* ─────────────────────────────────────────────
     REGISTRATION STEP 1
     Creates Firebase account + sends verification email.
     Immediately signs OUT of Firebase so the user
     is NOT logged in during the verification wait.
  ───────────────────────────────────────────── */
  const sendVerificationEmail = async (email, password) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(credential.user);
    /* ← KEY: sign out immediately so Firebase doesn't
       auto-create a session for an unverified user */
    await signOut(auth);
    return credential.user;
  };

  /* ─────────────────────────────────────────────
     REGISTRATION STEP 2
     User clicks "I've verified" in the popup.
     Signs back into Firebase temporarily to check
     verification status, gets token, sends to backend,
     then signs out of Firebase again.
     The user is directed to /login — NOT auto-logged-in.
  ───────────────────────────────────────────── */
  const completeRegistration = async (email, password, firstName, lastName, role) => {
    /* Sign back in temporarily to get a verified token */
    let credential;
    try {
      credential = await signInWithEmailAndPassword(auth, email, password);
    } catch {
      throw new Error('Could not verify your account. Please try logging in.');
    }

    const fbUser = credential.user;
    await fbUser.reload();

    if (!fbUser.emailVerified) {
      await signOut(auth);
      throw new Error('not_verified');
    }

    const idToken = await fbUser.getIdToken(true);

    /* Save to MongoDB */
    const res = await axios.post(`${API}/auth/register-firebase`, {
      idToken,
      firstName,
      lastName,
      role,
    });

    /* Sign out of Firebase — user must log in properly */
    await signOut(auth);

    /* Return the MongoDB user but do NOT set session */
    return res.data.user;
  };

  /* ─────────────────────────────────────────────
     LOGIN — email + password
     Checks emailVerified before allowing in.
  ───────────────────────────────────────────── */
  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const fbUser     = credential.user;

    /* Block unverified users */
    if (!fbUser.emailVerified) {
      await signOut(auth);
      const err = new Error('Please verify your email before signing in. Check your inbox for the verification link.');
      err.code = 'auth/email-not-verified';
      throw err;
    }

    const idToken = await fbUser.getIdToken();
    const res     = await axios.post(`${API}/auth/login-firebase`, { idToken });

    /* Sign out of Firebase — our JWT handles the session */
    await signOut(auth);

    const loginTime = Date.now();
    setAuthenticatedUser(
      { ...res.data.user, authMethod: 'jwt' },
      res.data.token,
      loginTime
    );

    return res.data.user;
  };

  /* ─────────────────────────────────────────────
     GOOGLE LOGIN
  ───────────────────────────────────────────── */
  const loginWithGoogle = async () => {
    const result  = await signInWithPopup(auth, googleProvider);
    const fbUser  = result.user;
    const idToken = await fbUser.getIdToken();

    const res = await axios.post(`${API}/auth/google`, { idToken });

    await signOut(auth); // Firebase session not needed — JWT takes over

    const loginTime = Date.now();
    setAuthenticatedUser(
      { ...res.data.user, authMethod: 'google' },
      res.data.token,
      loginTime
    );

    return res.data.user;
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    sendVerificationEmail,
    completeRegistration,
    logout,
    isAuthenticated: !!user,
    isTrainee:       user?.role === 'trainee',
    isOrganization:  user?.role === 'organization',
    isAdmin:         user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
