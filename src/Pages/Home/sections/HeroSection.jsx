import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#1c244b] overflow-hidden">

      {/* dot-grid overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* glow blobs */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#ff8000] opacity-[0.07] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-[0.05] blur-[80px] pointer-events-none" />

      {/* top orange bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#ff8000]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-24 lg:pt-32">

        <div className='flex flex-col justify-center'>

          {/* pill badge */}
            <div className="hidden md:inline-flex self-start items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#ff8000] animate-pulse" />
              <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">
                Päijät-Häme Region, Finland
              </span>
            </div>

             {/* heading */}
            <h1 className="font-body font-bold text-white leading-[1.07] text-4xl sm:text-5xl lg:text-[3.2rem] mb-5">
              Spark Your Career.{' '}
              <span className="text-[#ff8000]">Empower</span>{' '}
              Your Future.
            </h1>

        </div>

        {/* ── Equal 50/50 grid — stacked on mobile, side-by-side on lg ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div className={`flex flex-col transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            

           

            {/* body copy */}
            <p className="font-body text-white/65 text-base sm:text-lg leading-relaxed mb-7">
              Spark Traineeships connects skilled young professionals with private and public sector employers — bridging talent, creating opportunity, and strengthening our region's workforce.
            </p>

            {/* CTA button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link to="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#ff8000] text-white text-base font-semibold font-body rounded-full hover:bg-[#d96e00] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Join Now
                <FaArrowRight />
              </Link>
            </div>

            {/* stat cards — 2x2 grid inside left column */}
            <div className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-300 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                { value: '1,284+', label: 'Open Roles',         sub: 'In Päijät-Häme',       bg: 'bg-white',                        text: 'text-[#1a2744]', sub2: 'text-gray-400' },
                { value: '312+',   label: 'Trainee Positions',  sub: 'Right for your level',  bg: 'bg-[#ff8000]',                    text: 'text-white',     sub2: 'text-white/60' },
                { value: '4 days', label: 'Avg. Time to Match', sub: 'From sign-up to offer', bg: 'bg-white/10 border border-white/20', text: 'text-white',   sub2: 'text-white/50' },
                { value: '100%',   label: 'Free for Trainees',  sub: 'No hidden fees, ever',  bg: 'bg-white/10 border border-white/20', text: 'text-white',   sub2: 'text-white/50' },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-4 sm:p-5`}>
                  <p className={`font-body text-2xl sm:text-3xl font-bold ${s.text} leading-none mb-1`}>{s.value}</p>
                  <p className={`font-body font-semibold text-xs sm:text-sm ${s.text} mb-0.5`}>{s.label}</p>
                  <p className={`font-body text-xs ${s.sub2}`}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════ RIGHT COLUMN ══════════════ */}
          <div className={`transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">

              {/* main image card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#243358] to-[#111b33] border border-white/10">
                <img
                  src="/hero1.png"
                  alt="Spark Traineeships"
                  className="w-full h-full object-cover"
                />

                {/* floating stat — open roles */}
                

                {/* floating stat — time to match */}
                
              </div>

             
              
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
          <span className="font-body text-white/25 text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
