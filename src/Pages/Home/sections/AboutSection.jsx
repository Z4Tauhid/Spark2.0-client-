import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function AboutSection() {
  const [ref, inView] = useInView();

  return (
    <section className="py-20 sm:py-28 bg-white" id="about" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: image + badge ── */}
          <div className={`relative transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-[#1a2744]/8 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#1a2744]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <p className="font-body text-gray-400 text-xs">Add your team photo here</p>
              </div>
            </div>
            {/* orange corner badge */}
            <div className="absolute -bottom-5 -right-5 w-[88px] h-[88px] rounded-2xl bg-[#E85D26] flex items-center justify-center shadow-xl">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-white leading-none">5+</p>
                <p className="font-body text-white/75 text-[10px] mt-0.5 tracking-wide">Years</p>
              </div>
            </div>
            {/* top-left Finnish badge */}
            <div className="absolute -top-4 -left-3 bg-white rounded-xl px-3.5 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2">
              <span className="text-base">🇫🇮</span>
              <span className="font-body text-xs font-semibold text-[#1a2744]">Finnish Company</span>
            </div>
          </div>

          {/* ── RIGHT: copy ── */}
          <div className={`transition-all duration-700 delay-200 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">About Spark</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] leading-tight mb-5">
              Bridging Talent and Opportunity Across Finland
            </h2>
            <p className="font-body text-gray-600 leading-relaxed mb-4">
              <strong className="text-[#1a2744]">Spark Traineeships Oy</strong> connects skilled young professionals with private and public sector employers in non-metropolitan Finland — addressing talent shortages and fostering long-term community growth.
            </p>
            <p className="font-body text-gray-600 leading-relaxed mb-4">
              Through tailored <strong className="text-[#1a2744]">traineeship programs</strong> and personal leadership training, Spark empowers young talent to thrive in meaningful roles, while helping organisations build a diverse and skilled workforce.
            </p>
            <p className="font-body text-gray-600 leading-relaxed mb-8">
              Our model is designed to bring new energy and ideas to communities facing workforce renewal challenges, whether you are a young graduate starting to make a difference, or an organization looking to invest in the future.
            </p>
            <Link to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a2744] text-white text-sm font-semibold font-body rounded-full hover:bg-[#243358] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Audience cards ── */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mt-20 transition-all duration-700 delay-300 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            {
              title: 'Trainee',
              desc: 'From a renewed job market aligned to your skills and ambitions, we match you with the perfect opportunity and offer young professionals a clear path to their first role in Finland.',
              cta: 'Learn More', to: '/for-trainees', accent: 'bg-[#1a2744]',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />,
            },
            {
              title: 'Organization',
              desc: 'Strengthen your local workforce by connecting with skilled young professionals. We match the right talent to the right roles for long-term employment and regional retention.',
              cta: 'Learn More', to: '/for-organizations', accent: 'bg-[#E85D26]',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
            },
          ].map(card => (
            <div key={card.title}
              className="group relative bg-[#1a2744] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`h-1.5 w-full ${card.accent}`} />
              <div className="p-7">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{card.icon}</svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-6">{card.desc}</p>
                <Link to={card.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold font-body text-[#E85D26] group-hover:gap-3 transition-all duration-200">
                  {card.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
