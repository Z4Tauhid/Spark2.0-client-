import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, inView];
}

const STEPS = [
  {
    n: '01', title: 'Talent Identification',
    desc: 'We identify skilled young professionals through academic partnerships, career platforms, and our growing trainee network — focusing on real skill alignment, not just CVs.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>,
  },
  {
    n: '02', title: 'Smart Matching',
    desc: 'We align trainees with organisations based on skills, personality, work culture, language, and long-term potential — not just job descriptions.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>,
  },
  {
    n: '03', title: 'Placement & Support',
    desc: 'We facilitate the placement process, handle administration, and stay actively involved during the assignment — supporting both trainee and employer throughout.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
  },
  {
    n: '04', title: 'Long-Term Retention',
    desc: 'Our goal is retention, not just placement. We track outcomes, measure impact, and ensure trainees stay in the region and grow within their organisations.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>,
  },
];

export default function ApproachSection() {
  const [ref, inView] = useInView();

  return (
    <section className="pt-5 pb-3 bg-[#1c244b]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* banner */}
        {/* <div className="relative rounded-2xl overflow-hidden mb-20 h-[120px] sm:h-[140px] bg-gradient-to-r from-[#1a2744] via-[#243358] to-[#1a2744]">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-1">
              <span className="font-body font-bold text-white/20 text-5xl sm:text-7xl tracking-tight">spark</span>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#ff8000]/35 mb-1" />
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#ff8000] via-[#f07142] to-[#ff8000]" />
        </div> */}

        {/* header */}
        <div className={`text-center mb-5 md:mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-body text-white font-semibold text-lg tracking-widest uppercase mb-3">Our Approach</p>
          <h2 className="font-body text-3xl sm:text-4xl font-bold text-[#ff8000] mb-3">More Than a Recruitment Agency</h2>
          <p className="font-body text-gray-300 text-base max-w-3xl mx-auto leading-relaxed">
            Spark Traineeships Oy is a Finnish company dedicated to building stronger connections between young professionals and the working world. We specialise in high-quality traineeship programs combined with personal development, tailored to meet the needs of both Generation Z talent and modern employers.
          </p>
          <p className="font-body text-gray-300 text-base max-w-3xl mx-auto leading-relaxed mt-3">
            Our integrated approach supports trainees in becoming resilient, self-aware future leaders while guiding employers toward inclusive, engaging workplaces that attract and retain new talent.
          </p>
        </div>

        {/* steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div key={s.n}
              className={`p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1c244b] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                </div>
                <span className="font-body text-4xl font-bold text-gray-300">{s.n}</span>
              </div>
              <h3 className="font-body text-lg font-bold text-[#1a2744] mb-2">{s.title}</h3>
              <p className="font-body text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-5 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link to="/about"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#1c244b] text-white text-sm font-semibold font-body rounded-full hover:bg-[#243358] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            About Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
