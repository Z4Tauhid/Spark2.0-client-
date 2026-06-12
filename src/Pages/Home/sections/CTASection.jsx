import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-10 bg-[#E85D26] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-14 -left-14 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-body text-white/65 font-semibold text-xs tracking-widest uppercase mb-4">Ready to Get Started?</p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight">
          Bridge the Gap Between Talent and Opportunity
        </h2>
        <p className="font-body text-white/75 text-base sm:text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
          Whether you're a young professional seeking your first meaningful role, or an organisation looking to strengthen your team — Spark is here to make it happen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#E85D26] text-sm font-bold font-body rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
            I'm a Trainee — Get Matched
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
          <Link to="/for-organizations"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white text-sm font-bold font-body rounded-full border-2 border-white/40 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200">
            I'm an Organization — Join the Pilot
          </Link>
        </div>
        <p className="font-body text-white/40 text-xs mt-3">
          Free for trainees · No hidden fees · Finnish-based team
        </p>
      </div>
    </section>
  );
}
