import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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

/* ── Shared arrow pill component ── */
function ArrowPill({ label, orange = false }) {
  return (
    <Link
      to="/register"
      className={`inline-flex items-center font-body font-bold text-sm text-center px-10 py-4 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0
        ${orange ? 'bg-[#ff8000] text-white' : 'bg-[#F2F2F2] text-[#1A224F]'}`}
      style={{ clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%)' }}
    >
      {label}
    </Link>
  );
}

const PROGRAMS = [
  {
    title: 'Internship', Icon: FiBookOpen, tag: 'Young Student', featured: false,
    points: ['During studies','Gain general work experience','Usually part of study program','Sometimes unpaid or minimally paid','Assisting existing operations','Part of curriculum (credited)'],
    arrows: (
      <div className="flex justify-center">
        <ArrowPill label="Young Student" orange={false} />
      </div>
    ),
  },
  {
    title: 'Thesis Work', Icon: FiAward, tag: 'Graduate', featured: false,
    points: ['Final three years of study','Complete academic degree with a real case','Mid-degree (usually one semester)','Often compensated by company','Research in a business context','Integral part of degree'],
    arrows: (
      <div className="flex justify-center">
        <ArrowPill label="Graduate" orange={false} />
      </div>
    ),
  },
  {
    title: 'Traineeship', Icon: FiZap, tag: 'Young Professional', featured: true,
    points: ['After graduation','Develop professional skills with clear goals','Long-term (12–24 months)','Usually paid','Independent work, like a junior employee','Not part of studies — professional'],
    arrows: (
      <div className="flex flex-col items-center gap-2">
        <ArrowPill label="Young Professional" orange={true} />
        <ArrowPill label="New to Finland" orange={true} />
      </div>
    ),
  },
];

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
        className="absolute left-1 top-1/2 -translate-y-8 z-20 bg-white/10 hover:bg-[#ff8000]/80 disabled:opacity-20 transition-colors rounded-full p-2"
      >
        <FiChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={() => { goTo(active + 1); resetAuto(); }}
        disabled={active === PROGRAMS.length - 1}
        aria-label="Next"
        className="absolute right-1 top-1/2 -translate-y-8 z-20 bg-white/10 hover:bg-[#ff8000]/80 disabled:opacity-20 transition-colors rounded-full p-2"
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
                      ? 'border-[#ff8000]/60 shadow-[0_0_32px_rgba(232,93,38,0.18)]'
                      : 'border-white/10'}`}
                  style={{ background: p.featured ? 'rgba(232,93,38,0.07)' : 'rgba(255,255,255,0.04)' }}
                >
                  {p.featured && (
                    <span className="absolute top-4 right-4 bg-[#ff8000] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide font-body">
                      Spark's Focus
                    </span>
                  )}
                  <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon
                        className={`w-8 h-8 flex-shrink-0 ${p.featured ? 'text-[#ff8000]' : 'text-white/50'}`}
                        strokeWidth={1.8}
                      />
                      <div>
                        <h3 className="font-body text-lg font-bold text-white">{p.title}</h3>
                        <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 font-body
                          ${p.featured ? 'bg-[#ff8000] text-white' : 'bg-white/10 text-white/55'}`}>
                          {p.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-px mx-6 bg-white/10" />
                  <ul className="px-6 py-5 space-y-2.5">
                    {p.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.featured ? 'text-[#ff8000]' : 'text-white/25'}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className={`font-body text-sm leading-snug ${p.featured ? 'text-white/90' : 'text-white/55'}`}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pb-6 px-6">{p.arrows}</div>
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
              background: i === active ? '#ff8000' : 'rgba(255,255,255,0.25)',
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
    <section className="py-10 bg-[#1c244b]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-5 md:mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-body text-3xl sm:text-4xl font-bold text-white mb-4">
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
                    ? 'border-[#ff8000]/60 shadow-[0_0_32px_rgba(232,93,38,0.18)]'
                    : 'border-white/10 hover:border-white/20'}`}
                style={{
                  background: p.featured ? 'rgba(232,93,38,0.07)' : 'rgba(255,255,255,0.04)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {p.featured && (
                  <span className="absolute top-4 right-4 bg-[#ff8000] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide font-body">
                    Spark's Focus
                  </span>
                )}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      className={`w-8 h-8 flex-shrink-0 ${p.featured ? 'text-[#ff8000]' : 'text-white/50'}`}
                      strokeWidth={1.8}
                    />
                    <div>
                      <h3 className="font-body text-lg font-bold text-white">{p.title}</h3>
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 font-body
                        ${p.featured ? 'bg-[#ff8000] text-white' : 'bg-white/10 text-white/55'}`}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-px mx-6 bg-white/10" />
                <ul className="px-6 py-5 space-y-2.5">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.featured ? 'text-[#ff8000]' : 'text-white/25'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                      </svg>
                      <span className={`font-body text-sm leading-snug ${p.featured ? 'text-white/90' : 'text-white/55'}`}>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="pb-6 px-6">{p.arrows}</div>
              </div>
            );
          })}
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden mb-10 -mx-4">
          <MobileCarousel />
        </div>

        {/* Footer note */}
        <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-body text-white/45 text-sm text-center mt-3">
            Spark specialises in the{' '}
            <span className="text-[#ff8000] font-semibold">Young (or New to Finland) Professional</span>{' '}
            stage — long-term, paid traineeships that build real careers.
          </p>
        </div>
      </div>
    </section>
  );
}
