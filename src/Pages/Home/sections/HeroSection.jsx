import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#1a2744] overflow-hidden w-99/11">

      {/* dot-grid overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* glow blobs */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#E85D26] opacity-[0.07] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-[0.05] blur-[80px] pointer-events-none" />

      {/* top orange bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 pt-20 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT COPY ── */}
          <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* pill badge */}
            <div className="hidden md:inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E85D26] animate-pulse" />
              <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">
                Päijät-Häme Region, Finland
              </span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.07] text-4xl sm:text-5xl lg:text-[3.4rem] mb-4">
              Spark Your Career.{' '}
              <span className="text-[#E85D26]">Empower</span>{' '}
              Your Future.
            </h1>

            <p className="font-body text-white/65 text-base sm:text-lg leading-relaxed mb-5 max-w-[500px]">
              Spark Traineeships connects skilled young professionals with private and public sector employers — bridging talent, creating opportunity, and strengthening our region's workforce.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center items-center">
              <Link to="/for-organizations"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E85D26] text-white text-xs md:text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                For Organizations: Join Our Pilot
                <FaArrowRight />
              </Link>
              <Link to="/for-organizations"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E85D26] text-white text-xs md:text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                For Trainee: Join Our Pilot
                <FaArrowRight />
              </Link>
              
            </div>

            {/* trust ticks */}
            <div className="flex flex-wrap gap-3 md:gap-5 flex-row">
              {['Free for trainees', 'Long-term matching', 'Finnish work culture guidance'].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 font-body text-white/45 text-xs">
                  <svg className="w-3.5 h-3.5 text-[#E85D26] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT VISUAL ── */}
          <div className={`transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">

              {/* main card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#243358] to-[#111b33] border border-white/10">
                {/* placeholder graphic */}
                 <img
                     src="/hero1.png"
                     alt="Spark Logo"
                     
                     className=" w-auto h-full object-cover"/>

                {/* floating stat — open roles */}
                <div className="absolute top-4 right-4 bg-white rounded-xl px-4 py-3 shadow-2xl hidden md:block">
                  <p className="font-body text-[11px] text-gray-400 font-medium mb-0.5">Open Roles</p>
                  <p className="font-display text-2xl font-bold text-[#1a2744]">1,284</p>
                </div>

                {/* floating stat — time to match */}
                <div className="absolute bottom-4 left-4 bg-[#E85D26] rounded-xl px-4 py-3 shadow-2xl hidden md:block">
                  <p className="font-body text-[11px] text-white/75 font-medium mb-0.5">Avg. time to match</p>
                  <p className="font-display text-2xl font-bold text-white">4 days</p>
                </div>
              </div>

              {/* bottom badge */}
              <div className="hidden md:block absolute -bottom-5 right-6 bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100 items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-body text-[11px] text-gray-400">Trainees placed</p>
                  <p className="font-body text-sm font-bold text-[#1a2744]">Growing every week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
          <span className="font-body text-white/25 text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
