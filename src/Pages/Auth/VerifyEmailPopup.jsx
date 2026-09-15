import { useState, useEffect, useRef } from 'react';
import { FiMail, FiRefreshCw, FiCheckCircle, FiX, FiArrowRight, FiLogIn } from 'react-icons/fi';
import { auth } from '../../firebase/firebase.config';
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';

/*
  Props:
    email              — address the link was sent to
    password           — needed to re-authenticate for verification check
    firstName          — for personalised greeting
    onVerified         — called when Firebase confirms emailVerified: true
                         (registration saved to MongoDB, now redirect to login)
    onClose            — user cancels
*/
export default function VerifyEmailPopup({ email, password, firstName, onVerified, onClose }) {
  const [checking,  setChecking]  = useState(false);
  const [resending, setResending] = useState(false);
  const [resent,    setResent]    = useState(false);
  const [notYet,    setNotYet]    = useState(false);
  const [error,     setError]     = useState('');
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  /* auto-poll every 5 seconds */
  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        /* sign in temporarily to check verification status */
        const credential = await signInWithEmailAndPassword(auth, email, password);
        await credential.user.reload();
        if (credential.user.emailVerified) {
          clearInterval(poll);
          await signOut(auth); // clean up before handing off
          onVerified();
        } else {
          await signOut(auth);
        }
      } catch (_) {}
    }, 5000);
    return () => clearInterval(poll);
  }, [email, password, onVerified]);

  /* countdown timer */
  useEffect(() => {
    if (countdown <= 0) return;
    timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [countdown]);

  /* manual check */
  const handleCheck = async () => {
    setChecking(true);
    setNotYet(false);
    setError('');
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await credential.user.reload();
      if (credential.user.emailVerified) {
        await signOut(auth);
        onVerified();
      } else {
        await signOut(auth);
        setNotYet(true);
      }
    } catch (err) {
      setError('Could not check verification status. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  /* resend */
  const handleResend = async () => {
    setResending(true);
    setResent(false);
    setError('');
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(credential.user);
      await signOut(auth);
      setResent(true);
      setCountdown(60);
    } catch (err) {
      if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait before resending.');
        setCountdown(60);
      } else {
        setError('Failed to resend. Please try again.');
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-[#1a2744]/70 backdrop-blur-sm" onClick={onClose} />

      {/* card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1 w-full bg-[#ff8000]" />

        {/* close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Close">
          <FiX className="w-4 h-4 text-gray-500" />
        </button>

        <div className="px-8 pt-8 pb-8">

          {/* icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#ff8000]/10 border border-[#ff8000]/20 flex items-center justify-center mx-auto mb-5">
            <FiMail className="w-8 h-8 text-[#ff8000]" />
          </div>

          {/* heading */}
          <h2 className="font-body text-2xl font-bold text-[#1a2744] text-center mb-2">
            Verify your email
          </h2>
          <p className="font-body text-gray-500 text-sm text-center leading-relaxed mb-1">
            {firstName ? `Hey ${firstName}! We` : 'We'} sent a verification link to:
          </p>
          <p className="font-body text-[#1a2744] font-semibold text-sm text-center break-all mb-6">
            {email}
          </p>

          {/* steps */}
          <ol className="space-y-3 mb-6">
            {[
              'Check your email. Be sure to check your SPAM folder.',
              'Click the "Verify email" link.',
              'You\'ll be redirected to sign in.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a2744] text-white font-body text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="font-body text-sm text-gray-600 leading-snug">{step}</span>
              </li>
            ))}
          </ol>

          {/* not verified yet */}
          {notYet && (
            <div className="flex items-start gap-2.5 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 mb-4">
              <FiMail className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-yellow-700">
                Not verified yet. Please click the link in your inbox first, then try again.
              </p>
            </div>
          )}

          {/* error */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
              <FiX className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <p className="font-body text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* resent */}
          {resent && !error && (
            <div className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-4">
              <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="font-body text-sm text-green-700">Verification email resent successfully.</p>
            </div>
          )}

          {/* primary CTA */}
          <button onClick={handleCheck} disabled={checking}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#ff8000] text-white font-semibold font-body text-sm rounded-full hover:bg-[#d96e00] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mb-3">
            {checking
              ? <><FiRefreshCw className="w-4 h-4 animate-spin" />Checking...</>
              : <><FiCheckCircle className="w-4 h-4" />I've verified my email <FiArrowRight className="w-4 h-4" /></>
            }
          </button>

          {/* resend */}
          <div className="text-center mb-4">
            <span className="font-body text-sm text-gray-400">Didn't receive it? </span>
            {countdown > 0 ? (
              <span className="font-body text-sm text-gray-400">
                Resend in <strong className="text-[#1a2744]">{countdown}s</strong>
              </span>
            ) : (
              <button onClick={handleResend} disabled={resending}
                className="font-body text-sm font-semibold text-[#ff8000] hover:underline disabled:opacity-50 inline-flex items-center gap-1">
                {resending && <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />}
                {resending ? 'Resending...' : 'Resend email'}
              </button>
            )}
          </div>

          {/* auto-check note */}
          <p className="font-body text-xs text-gray-300 text-center">
            Checking automatically every few seconds…
          </p>
        </div>
      </div>
    </div>
  );
}
