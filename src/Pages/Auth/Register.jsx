import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff, FiCheck, FiX, FiShield } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import VerifyEmailPopup from './VerifyEmailPopup';

const RULES = [
  { id: 'length',  label: 'At least 6 characters',                  test: v => v.length >= 6 },
  { id: 'upper',   label: 'At least one uppercase letter',           test: v => /[A-Z]/.test(v) },
  { id: 'special', label: 'At least one special character (!@#$…)',  test: v => /[^A-Za-z0-9]/.test(v) },
];
const validatePassword = v => RULES.map(r => ({ ...r, passed: r.test(v) }));

function StrengthBar({ password }) {
  const results = useMemo(() => validatePassword(password), [password]);
  const passed  = results.filter(r => r.passed).length;
  const BARS   = ['bg-transparent', 'bg-red-400', 'bg-yellow-400', 'bg-green-500'];
  const LABELS = ['', 'text-red-500', 'text-yellow-500', 'text-green-600'];
  const NAMES  = ['', 'Weak', 'Fair', 'Strong'];
  if (!password) return null;
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1,2,3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= passed ? BARS[passed] : 'bg-gray-200'}`} />
        ))}
      </div>
      {NAMES[passed] && <p className={`font-body text-xs font-semibold ${LABELS[passed]}`}>{NAMES[passed]}</p>}
      <ul className="space-y-1 pt-0.5">
        {results.map(r => (
          <li key={r.id} className="flex items-center gap-2">
            <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 ${r.passed ? 'bg-green-100' : 'bg-gray-100'}`}>
              {r.passed
                ? <FiCheck className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
                : <FiX     className="w-2.5 h-2.5 text-gray-400"  strokeWidth={3} />}
            </span>
            <span className={`font-body text-xs transition-colors duration-200 ${r.passed ? 'text-green-600' : 'text-gray-400'}`}>{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PasswordInput({ name, value, onChange, placeholder, hasError }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        name={name} value={value} onChange={onChange} required placeholder={placeholder}
        className={`w-full px-4 py-3 pr-11 rounded-xl border font-body text-sm focus:outline-none focus:ring-2 transition-colors
          ${hasError ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50/30' : 'border-gray-200 focus:ring-[#ff8000]/30 focus:border-[#ff8000]'}`}
      />
      <button type="button" onClick={() => setShow(v => !v)} tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a2744] transition-colors">
        {show ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
      </button>
    </div>
  );
}

function GdprCheckbox({ checked, onChange, touched }) {
  const showError = touched && !checked;
  return (
    <div className={`rounded-xl border-2 p-4 transition-all duration-200 ${
      showError ? 'border-red-300 bg-red-50/40' : checked ? 'border-green-300 bg-green-50/30' : 'border-gray-200 bg-gray-50/50'
    }`}>
      <label className="flex items-start gap-3 cursor-pointer select-none">
        {/* custom checkbox */}
        <div className="relative flex-shrink-0 mt-0.5">
          <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" aria-label="GDPR consent" />
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
            ${checked ? 'bg-[#ff8000] border-[#ff8000]' : showError ? 'border-red-400 bg-white' : 'border-gray-300 bg-white'}`}>
            {checked && <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
        </div>
        {/* text */}
        <div>
          <p className="font-body text-sm text-gray-700 leading-relaxed">
            I agree to Spark Traineeships storing and processing my personal data (name, email address, and profile information) in accordance with the{' '}
            <Link to="/privacy" target="_blank" rel="noopener noreferrer"
              className="text-[#ff8000] font-semibold hover:underline">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link to="/terms" target="_blank" rel="noopener noreferrer"
              className="text-[#ff8000] font-semibold hover:underline">
              Terms & Conditions
            </Link>
            .{' '}
            <span className="text-gray-400 text-xs">(GDPR — EU 2016/679)</span>
          </p>
          <p className="font-body text-xs text-gray-400 mt-1.5 leading-relaxed">
            Your data is stored securely and used only for traineeship matching. You may request deletion at any time by contacting{' '}
            <a href="mailto:info@sparktraineeships.fi" className="hover:underline">info@sparktraineeships.fi</a>.
          </p>
        </div>
      </label>

      {/* inline failure message */}
      {showError && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-red-200">
          <FiShield className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
          <p className="font-body text-xs text-red-600 font-semibold">
            You must accept the Privacy Policy and Terms & Conditions to create an account.
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════ */
const Register = () => {
  const [form, setForm] = useState({
    role:            'trainee',   // role is first
    firstName:       '',
    lastName:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
  });
  const [gdprAccepted,   setGdprAccepted]   = useState(false);
  const [gdprTouched,    setGdprTouched]    = useState(false);
  const [error,          setError]          = useState('');
  const [loading,        setLoading]        = useState(false);
  const [googleLoading,  setGoogleLoading]  = useState(false);
  const [pwTouched,      setPwTouched]      = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [showPopup,      setShowPopup]      = useState(false);

  const { sendVerificationEmail, completeRegistration, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const pwResults      = useMemo(() => validatePassword(form.password), [form.password]);
  const pwAllPassed    = pwResults.every(r => r.passed);
  const passwordsMatch = form.password === form.confirmPassword;
  const confirmError   = confirmTouched && form.confirmPassword.length > 0 && !passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPwTouched(true);
    setConfirmTouched(true);
    setGdprTouched(true);

    if (!pwAllPassed) {
      setError('Your password does not meet all the requirements listed below.');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match. Please re-enter and try again.');
      return;
    }
    if (!gdprAccepted) {
      setError('You must accept the Privacy Policy and Terms & Conditions to create an account.');
      return;
    }

    setLoading(true);
    try {
      await sendVerificationEmail(form.email, form.password);
      setShowPopup(true);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerified = async () => {
    setError('');
    try {
      await completeRegistration(form.email, form.password, form.firstName, form.lastName, form.role);
      setShowPopup(false);
      navigate('/login', {
        state: {
          message: 'Email verified! Your account is ready. Please sign in.',
          email: form.email,
        },
      });
    } catch (err) {
      if (err.message === 'not_verified') {
        /* popup handles */
      } else {
        setShowPopup(false);
        setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
      }
    }
  };

  const handleGoogle = async () => {
    setGdprTouched(true);
    if (!gdprAccepted) {
      setError('You must accept the Privacy Policy and Terms & Conditions before continuing with Google.');
      return;
    }
    setError('');
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      {showPopup && (
        <VerifyEmailPopup
          email={form.email}
          password={form.password}
          firstName={form.firstName}
          onVerified={handleVerified}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="bg-gray-50 flex items-center justify-center px-4 py-12 pt-20">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="font-body text-3xl font-bold text-[#1a2744]">Join us in just ~5 minutes</h1>
            <p className="font-body text-gray-500 mt-2 text-sm">Free for trainees. Join the ecosystem.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            {error && (
              <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-body">
                <FiX className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={2.5} />{error}
              </div>
            )}

            {/* Google */}
            <button type="button" onClick={handleGoogle} disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border-2 border-gray-200 rounded-full font-body text-sm font-semibold text-gray-700 hover:border-[#ff8000] hover:text-[#1a2744] hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mb-5">
              {googleLoading
                ? <div className="w-5 h-5 border-2 border-gray-300 border-t-[#ff8000] rounded-full animate-spin" />
                : <FcGoogle className="w-5 h-5 flex-shrink-0" />}
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-body text-xs text-gray-400 font-medium">or register with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* 1. Role — toggle buttons at the very top */}
              <div>
                <label className="block font-body text-sm font-medium text-[#1a2744] mb-2">I am a...</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'trainee',      label: 'Trainee / Young Professional' },
                    { value: 'organization', label: 'Organization / Employer' },
                  ].map(opt => (
                    <button key={opt.value} type="button"
                      onClick={() => setForm(p => ({ ...p, role: opt.value }))}
                      className={`py-3 px-3 rounded-xl border-2 font-body text-xs font-semibold transition-all duration-150 leading-tight text-center
                        ${form.role === opt.value
                          ? 'border-[#ff8000] bg-[#ff8000]/5 text-[#ff8000]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:text-[#1a2744]'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Name */}
              <div className="grid grid-cols-2 gap-3">
                {['firstName', 'lastName'].map(n => (
                  <div key={n}>
                    <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">
                      {n === 'firstName' ? 'First name' : 'Last name'}
                    </label>
                    <input type="text" name={n} value={form[n]} onChange={handleChange} required
                      placeholder={n === 'firstName' ? 'First' : 'Last'}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8000]/30 focus:border-[#ff8000] transition-colors" />
                  </div>
                ))}
              </div>

              {/* 3. Email */}
              <div>
                <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8000]/30 focus:border-[#ff8000] transition-colors" />
              </div>

              {/* 4. Password */}
              <div>
                <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Password</label>
                <PasswordInput name="password" value={form.password} onChange={handleChange}
                  placeholder="Min. 6 chars, 1 uppercase, 1 special"
                  hasError={pwTouched && !pwAllPassed && form.password.length > 0} />
                {form.password.length > 0 && <StrengthBar password={form.password} />}
              </div>

              {/* 5. Confirm password */}
              <div>
                <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Confirm password</label>
                <PasswordInput name="confirmPassword" value={form.confirmPassword}
                  onChange={e => { handleChange(e); setConfirmTouched(true); }}
                  placeholder="Re-enter your password" hasError={confirmError} />
                {form.confirmPassword.length > 0 && (
                  <div className={`flex items-center gap-1.5 mt-1.5 font-body text-xs font-medium ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordsMatch
                      ? <><FiCheck className="w-3 h-3" strokeWidth={3} />Passwords match</>
                      : <><FiX    className="w-3 h-3" strokeWidth={3} />Passwords do not match</>}
                  </div>
                )}
              </div>

              {/* 6. GDPR */}
              <GdprCheckbox
                checked={gdprAccepted}
                touched={gdprTouched}
                onChange={e => {
                  setGdprAccepted(e.target.checked);
                  setGdprTouched(true);
                  if (e.target.checked) setError('');
                }}
              />

              {/* Submit */}
              <button type="submit" disabled={loading || googleLoading}
                className="w-full py-3.5 bg-[#ff8000] text-white font-semibold rounded-full hover:bg-[#d96e00] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 font-body text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending verification email...</>
                  : "Create Account — It's Free"}
              </button>
            </form>

            <p className="text-center font-body text-sm text-gray-500 mt-6">
              Have an account?{' '}
              <Link to="/login" className="text-[#ff8000] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
