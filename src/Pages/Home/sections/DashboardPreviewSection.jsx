import { useRef, useState, useEffect, useCallback } from 'react';
import {
  FiMap, FiZap, FiClipboard, FiUser, FiDollarSign, FiGlobe,
  FiChevronLeft, FiChevronRight,
} from 'react-icons/fi';

import { FaLightbulb } from "react-icons/fa6";

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

const FEATURES = [
  { title: 'Labour Market Heatmaps',  Icon: FiMap,        desc: 'Interactive maps showing job density by municipality, industry, and skill cluster across Päijät-Häme.' },
  { title: 'Real-Time Job Counters',  Icon: FiZap,        desc: 'Live numbers from DuuniExpo.fi and Työmarkkina.fi — always up-to-date with open roles across the region.' },
  { title: 'Readiness Diagnostic',   Icon: FiClipboard,  desc: 'Short assessment giving companies a talent readiness score, inclusion maturity score, and tailored Spark recommendations.' },
  { title: 'Career Diagnostic Tool', Icon: FiUser,       desc: 'Self-assessment covering workstyle profile, skill alignment, and readiness for Finnish work culture with a personal pathway.' },
  { title: 'Cost Savings Calculator',Icon: FiDollarSign, desc: 'Interactive tool comparing traditional hiring vs Spark Traineeships — showing annual savings, reduced risk, and workload.' },
  { title: 'Regional Impact Tracker',Icon: FiGlobe,      desc: 'Public dashboard showing economic value created, admin burden removed, and integration success across the region.' },
];

/* ── Mobile Carousel ── */
const PEEK = 28;
const GAP  = 12;

function MobileCarousel({ items }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const startX = useRef(null);
  const startY = useRef(null);
  const isHoriz = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(280);
  const count = items.length;

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(p => (p + 1) % count), 3400);
  }, [count]);

  useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [resetTimer]);

  const goTo = useCallback((idx) => {
    setActive(((idx % count) + count) % count);
    resetTimer();
  }, [count, resetTimer]);

  const onDragStart = (cx, cy) => {
    startX.current = cx; startY.current = cy;
    isHoriz.current = null;
    setDragging(true); setDragDelta(0);
    clearInterval(timerRef.current);
  };
  const onDragMove = (cx, cy) => {
    if (startX.current === null) return;
    const dx = cx - startX.current, dy = cy - startY.current;
    if (isHoriz.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6))
      isHoriz.current = Math.abs(dx) >= Math.abs(dy);
    if (isHoriz.current) setDragDelta(dx);
  };
  const onDragEnd = () => {
    if (isHoriz.current && Math.abs(dragDelta) > 40) goTo(dragDelta < 0 ? active + 1 : active - 1);
    else resetTimer();
    setDragging(false); setDragDelta(0);
    startX.current = null; isHoriz.current = null;
  };

  const cardWidth = containerWidth - PEEK * 2 - GAP * 2;
  const step = cardWidth + GAP;
  const baseOffset = PEEK + GAP + active * step;
  const translateX = dragging ? -(baseOffset - dragDelta) : -baseOffset;

  return (
    <div className="relative select-none">
      {/* arrows */}
      <button onClick={() => goTo(active - 1)} aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-10 z-20 bg-[#1c244b]/8 hover:bg-[#ff8000]/80 transition-colors rounded-full p-2 -ml-1">
        <FiChevronLeft className="w-4 h-4 text-[#1a2744]" />
      </button>
      <button onClick={() => goTo(active + 1)} aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-10 z-20 bg-[#1c244b]/8 hover:bg-[#ff8000]/80 transition-colors rounded-full p-2 -mr-1">
        <FiChevronRight className="w-4 h-4 text-[#1a2744]" />
      </button>

      {/* track */}
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={e => onDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={e => onDragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={onDragEnd}
        onMouseDown={e => onDragStart(e.clientX, e.clientY)}
        onMouseMove={e => dragging && onDragMove(e.clientX, e.clientY)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <div style={{
          display: 'flex', gap: `${GAP}px`,
          transform: `translateX(${translateX+50}px)`,
          transition: dragging ? 'none' : 'transform 0.42s cubic-bezier(0.35,0,0.1,1)',
          willChange: 'transform',
        }}>
          {items.map(({ title, Icon, desc }, i) => {
            const dist = Math.abs(i - active);
            return (
              <div key={title} style={{
                minWidth: `calc(100% - ${PEEK*2 + GAP*2 }px)`,
                opacity: dist === 0 ? 1 : 1,
                transform: `scale(${dist === 0 ? 1 : 0.7})`,
                transition: 'opacity 0.42s ease, transform 0.42s ease',
                pointerEvents: dist === 0 ? 'auto' : 'none',
              }}>
                <div className="p-5 rounded-2xl border shadow-sm bg-[#1c244b] h-full">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1a2744] mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-body font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="font-body text-gray-200 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-5">
        {items.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === active ? 20 : 8, height: 8,
              borderRadius: 9999, border: 'none', cursor: 'pointer', padding: 0,
              background: i === active ? '#ff8000' : 'rgba(26,39,68,0.18)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }} />
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function DashboardPreviewSection() {
  const [ref, inView] = useInView();

  return (
    <section className="py-10 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* header */}
        <div className={`max-w-2xl mb-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-body text-[#ff8000] font-semibold text-xs tracking-widest uppercase mb-3">Coming Soon</p>
          <h2 className="font-body text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">
            A Living Labour-Market Intelligence Platform
          </h2>
          <p className="font-body text-gray-500 text-base leading-relaxed">
            The most effective version of Spark is not a brochure — it is a <strong className="text-[#1a2744]">regional talent ecosystem dashboard</strong> that updates itself, reveals bottlenecks, and demonstrates Spark's unique role as an orchestrator of talent mobility across Päijät-Häme.
          </p>
        </div>

        {/* strategic callout */}
        <div className={`bg-[#1c244b] rounded-2xl p-4 mb-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff8000]/20 border border-[#ff8000]/30 flex items-center justify-center flex-shrink-0">
              <FaLightbulb className="w-6 h-6 text-[#ff8000]" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-body text-white text-base font-bold mb-1">Strategic Vision</p>
              <p className="font-body text-white/65 text-sm leading-relaxed">
                "The dashboard is not just a feature. It is the <em>value proposition made visible</em> — showing, in real time, what Spark does for the region: reduce friction, increase mobility, and create economic value."
              </p>
            </div>
          </div>
        </div>

        {/* desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {FEATURES.map(({ title, Icon, desc }, i) => (
            <div key={title}
              className={`p-5 bg-[#1c244b] rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1a2744]">
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-body font-bold text-white text-sm mb-2">{title}</h3>
              <p className="font-body text-gray-200 text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* mobile carousel */}
        <div className="sm:hidden">
          <MobileCarousel items={FEATURES} />
        </div>

        {/* audiences */}
        <div className={`mt-3 pt-3 border-t border-gray-100 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-body text-gray-400 text-[10px] text-center uppercase tracking-widest mb-3">Serving three audiences simultaneously</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Jobseekers', 'Employers', 'Municipalities & Regional Stakeholders'].map(a => (
              <span key={a} className="inline-flex items-center gap-2 bg-[#1c244b]/5 text-[#1a2744] text-xs font-semibold px-4 py-2 rounded-full font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff8000]" />{a}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
