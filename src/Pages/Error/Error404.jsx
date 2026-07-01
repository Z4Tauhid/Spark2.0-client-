import { Link, useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1c244b] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff8000] opacity-[0.07] blur-[120px] pointer-events-none" />

      {/* top bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#ff8000]" />

      <div className="relative z-10 w-full max-w-md mx-auto">

        {/* Logo */}
        <Link to="/" className="inline-flex items-center mb-12 group">
          <span className="font-body text-2xl font-bold text-white leading-none">spark</span>
          <span className="w-[7px] h-[7px] rounded-full bg-[#ff8000] mb-[3px] ml-[2px] group-hover:scale-125 transition-transform duration-200" />
        </Link>

        {/* Ghost number behind icon */}
        <div className="relative flex items-center justify-center mb-6">
          <span className="font-body font-bold select-none text-[130px] sm:text-[160px] leading-none text-white/[0.06]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#ff8000]/15 border border-[#ff8000]/30 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#ff8000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="font-body text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Page Not Found
        </h1>
        <p className="font-body text-white/50 text-sm sm:text-base leading-relaxed mb-10 max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#ff8000] text-white text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white/10 text-white text-sm font-semibold font-body rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Quick nav links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="font-body text-white/30 text-xs uppercase tracking-widest mb-5">Or go to</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: '/for-trainees',      label: 'For Trainees' },
              { to: '/for-organizations', label: 'For Organizations' },
              { to: '/contact',           label: 'Contact Us' },
            ].map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="font-body text-xs text-white/40 hover:text-white transition-colors duration-150 underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
