import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const Register = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'trainee' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await register(form); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed.'); }
    finally { setLoading(false); }
  };
  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 py-12 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <Link to="/" className="inline-flex items-center gap-0.5 mb-6">
            <span className="font-display text-2xl font-bold text-[#1a2744]">spark</span>
            <span className="w-2 h-2 rounded-full bg-[#E85D26] mb-0.5 ml-0.5" />
          </Link> */}
          <h1 className="font-display text-3xl font-bold text-[#1a2744]">Create your account</h1>
          <p className="font-body text-gray-500 mt-2 text-sm">Free for trainees. Join the ecosystem.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-body">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {['firstName','lastName'].map(n => (
                <div key={n}>
                  <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">{n === 'firstName' ? 'First name' : 'Last name'}</label>
                  <input type="text" name={n} value={form[n]} onChange={handleChange} required placeholder={n === 'firstName' ? 'First' : 'Last'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/30 focus:border-[#E85D26] transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/30 focus:border-[#E85D26] transition-colors" />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="Min. 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/30 focus:border-[#E85D26] transition-colors" />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-[#1a2744] mb-1.5">I am a...</label>
              <select name="role" value={form.role} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26]/30 focus:border-[#E85D26] bg-white transition-colors">
                <option value="trainee">Trainee / Young Professional</option>
                <option value="organization">Organization / Employer</option>
              </select>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-[#E85D26] text-white font-semibold rounded-full hover:bg-[#c44d1c] transition-colors font-body text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Creating account...' : "Create Account — It's Free"}
            </button>
          </form>
          <p className="text-center font-body text-sm text-gray-500 mt-6">
            Have an account? <Link to="/login" className="text-[#E85D26] font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
