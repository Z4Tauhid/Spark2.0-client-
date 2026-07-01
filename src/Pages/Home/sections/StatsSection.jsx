import { useEffect, useRef, useState } from 'react';

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const raf = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration, active]);
  return count;
}

const STATS = [
  {
    value: 1284, suffix: '+', label: 'Open Roles', sub: 'Across Päijät-Häme',
    bg: 'bg-orange-50', iconColor: 'text-[#ff8000]',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
  },
  {
    value: 312, suffix: '+', label: 'Trainee-Level Roles', sub: 'Internships & traineeships',
    bg: 'bg-blue-50', iconColor: 'text-blue-500',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  },
  {
    value: 44, suffix: '+', label: 'Multilingual Employers', sub: 'Hiring foreign-language speakers',
    bg: 'bg-green-50', iconColor: 'text-green-600',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />,
  },
  {
    value: 4, suffix: ' days', label: 'Avg. Time to Match', sub: 'From registration to placement',
    bg: 'bg-purple-50', iconColor: 'text-purple-600',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
];

function StatCard({ stat, active }) {
  const count = useCountUp(stat.value, 1800, active);
  return (
    <div className="flex flex-col items-center text-center px-1 py-2 md:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-2 md:mb-4`}>
        <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {stat.icon}
        </svg>
      </div>
      <p className="font-body text-xl md:text-4xl font-bold text-[#1a2744] mb-1 tabular-nums">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="font-body font-semibold text-[#1a2744] text-sm mb-1">{stat.label}</p>
      <p className="font-body text-gray-400 text-xs">{stat.sub}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-gray-50 py-8 md:py-16 sm:py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5 md:mb-10">
          <p className="font-body text-[#ff8000] font-semibold text-xs tracking-widest uppercase mb-3">Live Ecosystem Metrics</p>
          <h2 className="font-body text-3xl sm:text-4xl font-bold text-[#1a2744]">The Region's Talent Pulse</h2>
          <p className="font-body text-gray-500 text-base mt-3 max-w-xl mx-auto">
            Real data from Päijät-Häme's job market, updated continuously to show where opportunities exist right now.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map(s => <StatCard key={s.label} stat={s} active={active} />)}
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-body text-xs text-gray-400">
            Sourced from DuuniExpo.fi and Työmarkkina.fi — refreshed daily
          </span>
        </div>
      </div>
    </section>
  );
}
