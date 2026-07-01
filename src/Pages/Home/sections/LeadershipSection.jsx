import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiCompass, FiTrendingUp, FiZap, FiShield, FiEye } from 'react-icons/fi';

function useInView(t = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, inView];
}

const PILLARS = [
  { label: 'Personal Coaching',   Icon: FiTarget },
  { label: 'Internal Clarity',    Icon: FiCompass },
  { label: 'Leadership Skills',   Icon: FiTrendingUp },
  { label: 'Critical Thinking',   Icon: FiZap },
  { label: 'Resilience Building', Icon: FiShield },
  { label: 'Self-Awareness',      Icon: FiEye },
];

export default function LeadershipSection() {
  const [ref, inView] = useInView();

  return (
    <section className="py-10 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* COPY */}
          <div className={`order-2 lg:order-1 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="font-body text-[#ff8000] font-semibold text-xs tracking-widest uppercase mb-3">Leadership Program</p>
            <h2 className="font-body text-3xl sm:text-4xl font-bold text-[#1a2744] leading-tight mb-5">
              Personal Leadership Program
            </h2>
            <p className="font-body text-gray-600 leading-relaxed mb-4">
              <strong className="text-[#1a2744]">Personal leadership program</strong> focuses on personal coaching, internal and bodily meetings, and reflection in a safe environment. While trainees learn hard skills, this program enhances soft skills, self-awareness, resilience, and critical thinking.
            </p>
            <p className="font-body text-gray-600 leading-relaxed mb-7">
              For young professionals, sessions focus on self-discovery. The core questions —
              {' '}<em className="text-[#1a2744] font-medium">"Who am I? What do I want? What am I capable of?"</em>{' '}
              — guide every meeting.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {PILLARS.map(({ label, Icon }) => (
                <div key={label}
                  className="flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-2.5 border border-gray-100 shadow-sm">
                  <Icon className="w-4 h-4 flex-shrink-0 text-[#ff8000]" strokeWidth={2} />
                  <span className="font-body text-xs font-semibold text-[#1a2744] leading-tight">{label}</span>
                </div>
              ))}
            </div>

            <Link to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff8000] text-white text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              Join Now. It's Free!
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>

          {/* VISUAL */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="/leader.png"
                  alt="Leadership coaching session"
                  className="w-full h-full object-cover"
                />
                {/* quote overlay */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
                  <p className="font-body text-[#1a2744] text-sm italic leading-relaxed">
                    "Who am I? What do I want? What am I capable of?"
                  </p>
                  <p className="font-body text-[#1a2744] text-xs mt-2">— Core questions of every session</p>
                </div>
              </div>
              {/* 1:1 badge */}
              <div className="absolute -top-4 -right-4 w-[72px] h-[72px] rounded-full bg-[#ff8000] shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="font-body text-xl font-bold text-white leading-none">1:1</p>
                  <p className="font-body text-white/75 text-[9px] mt-0.5">Coaching</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
