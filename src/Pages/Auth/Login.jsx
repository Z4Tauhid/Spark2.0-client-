import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiInfo } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [error,         setError]         = useState('');
  const [successMsg,    setSuccessMsg]     = useState('');
  const [loading,       setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/dashboard';

  /* Show success message when redirected from Register after verification */
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      if (location.state.email) setEmail(location.state.email);
    }
    /* Show auto-logout messages */
    const reason = sessionStorage.getItem('spark_logout_reason');
    if (reason === 'inactivity') {
      setError('You were signed out due to inactivity. Please sign in again.');
      sessionStorage.removeItem('spark_logout_reason');
    }
    if (reason === 'expired') {
      setError('Your session has expired. Please sign in again.');
      sessionStorage.removeItem('spark_logout_reason');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === 'auth/email-not-verified') {
        setError('Please verify your email before signing in. Check your inbox for the verification link.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSuccessMsg('');
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="font-body text-3xl font-bold text-[#1a2744]">Welcome back</h1>
          <p className="font-body text-gray-500 mt-2 text-sm">Sign in to your Spark account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Success message from registration */}
          {successMsg && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-green-50 border border-green-100 rounded-xl text-green-700 text-sm font-body">
              <FiInfo className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {successMsg}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-body">
              {error}
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
            <span className="font-body text-xs text-gray-400 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8000]/30 focus:border-[#ff8000] transition-colors" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-body text-sm font-medium text-[#1a2744]">Password</label>
                <Link to="/forgot-password" className="font-body text-xs text-[#ff8000] hover:underline">Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8000]/30 focus:border-[#ff8000] transition-colors" />
            </div>

            <button type="submit" disabled={loading || googleLoading}
              className="w-full py-3.5 bg-[#ff8000] text-white font-semibold rounded-full hover:bg-[#d96e00] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 font-body text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in...</>
                : 'Sign In'}
            </button>
          </form>

          <p className="text-center font-body text-sm text-gray-500 mt-6">
            No account? <Link to="/register" className="text-[#ff8000] font-semibold hover:underline">Get started free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
