import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login(email, password); navigate(from, { replace: true }); }
    catch (err) { setError(err.response?.data?.message || 'Login failed.'); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <Link to="/" className="inline-flex items-center gap-0.5 mb-6">
            <span className="font-body text-2xl font-bold text-[#1a2744]">spark</span>
            <span className="w-2 h-2 rounded-full bg-[#ff8000] mb-0.5 ml-0.5" />
          </Link> */}
          <h1 className="font-body text-3xl font-bold text-[#1a2744]">Welcome back</h1>
          <p className="font-body text-gray-500 mt-2 text-sm">Sign in to your Spark account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-body">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8000]/30 focus:border-[#ff8000] transition-colors" />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8000]/30 focus:border-[#ff8000] transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#ff8000] text-white font-semibold rounded-full hover:bg-[#c44d1c] transition-colors font-body text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center font-body text-sm text-gray-500 mt-6">
            No account? <Link to="/register" className="text-[#ff8000] font-semibold hover:underline">Get started</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
