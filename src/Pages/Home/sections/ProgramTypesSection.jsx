import { useRef, useState, useEffect, useCallback } from 'react';
import { FiBookOpen, FiAward, FiZap, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const PROGRAMS = [
  {
    title: 'Internship', Icon: FiBookOpen, tag: 'Young Student', featured: false,
    points: ['During studies','Gain general work experience','Usually part of study program','Sometimes unpaid or minimally paid','Assisting existing operations','Part of curriculum (credited)'],
    hex: (
      <div className="relative inline-flex items-center">
        <div className="bg-[#F2F2F2] text-[#1A224F] font-bold text-center px-14 py-5 inline-block"
          style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%)" }}>
          <p>Young Student</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Thesis Work', Icon: FiAward, tag: 'Graduate', featured: false,
    points: ['Final three years of study','Complete academic degree with a real case','Mid-degree (usually one semester)','Often compensated by company','Research in a business context','Integral part of degree'],
    hex: (
      <div className="relative inline-flex items-center">
        <div className="bg-[#F2F2F2] text-[#1A224F] font-bold text-center px-14 py-5 inline-block"
          style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%)" }}>
          <p>Graduate</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Traineeship', Icon: FiZap, tag: 'Young Professional', featured: true,
    points: ['After graduation','Develop professional skills with clear goals','Long-term (12–24 months)','Usually paid','Independent work, like a junior employee','Not part of studies — professional'],
    hex: (
      <div className="flex items-center">
        <div className="bg-[#E85D26] text-[#1A224F] font-bold text-center px-14 py-5 inline-block"
          style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%)" }}>
          <p>Young Professional</p>
        </div>
      </div>
    ),
  },
];

// const JOURNEY = ['Young Student', 'Graduate', 'Young Professional'];

/* ── Mobile Carousel ── */
function MobileCarousel() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const startX = useRef(null);
  const startY = useRef(null);
  const autoRef = useRef(null);
  const isScrolling = useRef(null);

  const PEEK = 32;
  const GAP = 12;

  const goTo = useCallback((idx) => {
    setActive(Math.max(0, Math.min(PROGRAMS.length - 1, idx)));
    setDragDelta(0);
  }, []);

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % PROGRAMS.length);
    }, 3500);
  }, []);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [resetAuto]);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isScrolling.current = null;
    setDragging(true);
    clearInterval(autoRef.current);
  };

  const onTouchMove = (e) => {
    if (startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (isScrolling.current === null) {
      isScrolling.current = Math.abs(dy) > Math.abs(dx);
    }
    if (isScrolling.current) return;
    e.preventDefault();
    setDragDelta(dx);
  };

  const onTouchEnd = () => {
    if (!isScrolling.current) {
      if (dragDelta < -50 && active < PROGRAMS.length - 1) goTo(active + 1);
      else if (dragDelta > 50 && active > 0) goTo(active - 1);
      else setDragDelta(0);
    }
    setDragging(false);
    isScrolling.current = null;
    resetAuto();
  };

  const onMouseDown = (e) => {
    startX.current = e.clientX;
    setDragging(true);
    clearInterval(autoRef.current);
  };
  const onMouseMove = (e) => {
    if (!dragging || startX.current === null) return;
    setDragDelta(e.clientX - startX.current);
  };
  const onMouseUp = () => {
    if (dragDelta < -50 && active < PROGRAMS.length - 1) goTo(active + 1);
    else if (dragDelta > 50 && active > 0) goTo(active - 1);
    else setDragDelta(0);
    setDragging(false);
    resetAuto();
  };

  return (
    <div className="relative select-none" style={{ touchAction: 'pan-y' }}>
      {/* Side arrows */}
      <button
        onClick={() => { goTo(active - 1); resetAuto(); }}
        disabled={active === 0}
        aria-label="Previous"
        className="absolute left-1 top-1/2 -translate-y-8 z-20 bg-white/10 hover:bg-[#E85D26]/80 disabled:opacity-20 transition-colors rounded-full p-2"
      >
        <FiChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={() => { goTo(active + 1); resetAuto(); }}
        disabled={active === PROGRAMS.length - 1}
        aria-label="Next"
        className="absolute right-1 top-1/2 -translate-y-8 z-20 bg-white/10 hover:bg-[#E85D26]/80 disabled:opacity-20 transition-colors rounded-full p-2"
      >
        <FiChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* Track */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            paddingLeft: `${PEEK}px`,
            paddingRight: `${PEEK}px`,
            transform: `translateX(calc(${-active} * (100vw - ${PEEK * 2 + GAP}px) - ${active * (GAP - PEEK)}px + ${dragDelta}px))`,
            transition: dragging ? 'none' : 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        >
          {PROGRAMS.map((p, i) => {
            const { Icon } = p;
            return (
              <div
                key={p.title}
                style={{
                  flex: `0 0 calc(100vw - ${PEEK * 2 + GAP * 2}px)`,
                  transition: 'opacity 0.35s ease',
                  opacity: i === active ? 1 : 0.5,
                }}
              >
                <div
                  className={`relative rounded-2xl border-2 h-full
                    ${p.featured
                      ? 'border-[#E85D26]/60 shadow-[0_0_32px_rgba(232,93,38,0.18)]'
                      : 'border-white/10'}`}
                  style={{ background: p.featured ? 'rgba(232,93,38,0.07)' : 'rgba(255,255,255,0.04)' }}
                >
                  {p.featured && (
                    <span className="absolute top-4 right-4 bg-[#E85D26] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide font-body">
                      Spark's Focus
                    </span>
                  )}
                  <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon
                        className={`w-8 h-8 flex-shrink-0 ${p.featured ? 'text-[#E85D26]' : 'text-white/50'}`}
                        strokeWidth={1.8}
                      />
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                        <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 font-body
                          ${p.featured ? 'bg-[#E85D26] text-white' : 'bg-white/10 text-white/55'}`}>
                          {p.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-px mx-6 bg-white/10" />
                  <ul className="px-6 py-5 space-y-2.5">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.featured ? 'text-[#E85D26]' : 'text-white/25'}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className={`font-body text-sm leading-snug ${p.featured ? 'text-white/90' : 'text-white/55'}`}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center mb-5">{p.hex}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5 px-4">
        {PROGRAMS.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetAuto(); }}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: i === active ? '24px' : '8px',
              height: '8px',
              background: i === active ? '#E85D26' : 'rgba(255,255,255,0.25)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProgramTypesSection() {
  const [ref, inView] = useInView();

  return (
    <section className="py-10 bg-[#1a2744]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-5 md:mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Program Types</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Difference Between Internship, Thesis Work &amp; Traineeship
          </h2>
          <p className="font-body text-white/55 text-base max-w-2xl mx-auto">
            Understanding which path fits your career stage ensures the best outcome — for both trainees and organisations.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 mb-14">
          {PROGRAMS.map((p, i) => {
            const { Icon } = p;
            return (
              <div key={p.title}
                className={`relative rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1
                  ${p.featured
                    ? 'border-[#E85D26]/60 shadow-[0_0_32px_rgba(232,93,38,0.18)]'
                    : 'border-white/10 hover:border-white/20'}`}
                style={{
                  background: p.featured ? 'rgba(232,93,38,0.07)' : 'rgba(255,255,255,0.04)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {p.featured && (
                  <span className="absolute top-4 right-4 bg-[#E85D26] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide font-body">
                    Spark's Focus
                  </span>
                )}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      className={`w-8 h-8 flex-shrink-0 ${p.featured ? 'text-[#E85D26]' : 'text-white/50'}`}
                      strokeWidth={1.8}
                    />
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 font-body
                        ${p.featured ? 'bg-[#E85D26] text-white' : 'bg-white/10 text-white/55'}`}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-px mx-6 bg-white/10" />
                <ul className="px-6 py-5 space-y-2.5">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.featured ? 'text-[#E85D26]' : 'text-white/25'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                      </svg>
                      <span className={`font-body text-sm leading-snug ${p.featured ? 'text-white/90' : 'text-white/55'}`}>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center mb-5">{p.hex}</div>
              </div>
            );
          })}
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden mb-10 -mx-4">
          <MobileCarousel />
        </div>

        {/* Journey indicator */}
        <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* <p className="font-body text-white/30 text-[10px] text-center uppercase tracking-widest mb-5">Career journey</p> */}
          {/* <div className="flex justify-center overflow-x-auto pb-1">
            <div className="flex items-stretch">
              {JOURNEY.map((step, i) => {
                const active = i === 2;
                return (
                  <div key={step} className="flex items-center">
                    <div className={`px-6 py-3 text-sm font-semibold font-body relative
                      ${i === 0 ? 'rounded-l-full pl-7' : ''}
                      ${i === JOURNEY.length - 1 ? 'rounded-r-full pr-7' : ''}
                      ${active ? 'bg-[#E85D26] text-white' : 'bg-white/10 text-white/55'}`}>
                      {active && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#E85D26] text-sm leading-none">▼</span>}
                      {step}
                    </div>
                    {i < JOURNEY.length - 1 && (
                      <div className={`w-0 h-0 border-t-[18px] border-b-[18px] border-l-[12px] border-transparent ${active ? 'border-l-[#E85D26]' : 'border-l-white/10'} -ml-px`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div> */}
          <p className="font-body text-white/45 text-sm text-center mt-3">
            Spark specialises in the{' '}
            <span className="text-[#E85D26] font-semibold">Young Professional</span>{' '}
            stage — long-term, paid traineeships that build real careers.
          </p>
        </div>
      </div>
    </section>
  );
}
