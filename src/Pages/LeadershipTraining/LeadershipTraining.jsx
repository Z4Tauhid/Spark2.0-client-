import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiCheck, FiChevronDown,
  FiUser, FiTarget, FiTrendingUp, FiShield,
  FiMessageCircle, FiStar, FiCalendar, FiClock
} from 'react-icons/fi';
import {
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiOutlineEye,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineHeart
} from 'react-icons/hi';
// import { MdOutlineSelfImprovement } from 'react-icons/md';

/* ─────────────────────────── useInView hook ─────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────── data ─────────────────────────── */
const PILLARS = [
  { Icon: FiUser,               label: 'Personal Coaching',    desc: 'One-on-one sessions tailored to your growth stage and personality.' },
  { Icon: HiOutlineEye,         label: 'Self-Awareness',       desc: 'Understand your patterns, triggers, and core strengths deeply.' },
  { Icon: HiOutlineLightBulb,   label: 'Critical Thinking',    desc: 'Build a structured approach to solving complex workplace problems.' },
  { Icon: FiShield,             label: 'Resilience Building',  desc: 'Develop the capacity to recover, adapt, and grow through adversity.' },
  { Icon: FiTarget,             label: 'Internal Clarity',     desc: 'Define what you truly want from your career and personal life.' },
  { Icon: FiTrendingUp,         label: 'Leadership Skills',    desc: 'Practical skills for influencing, communicating, and leading others.' },
  { Icon: HiOutlineRefresh,     label: 'Finnish Work Culture', desc: 'Navigate Finnish workplace norms, communication styles, and expectations.' },
  { Icon: HiOutlineHeart,       label: 'Emotional Intelligence', desc: 'Recognise and manage emotions — yours and those of the people around you.' },
];

const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Introduction Session',
    duration: 'Session 1',
    desc: 'A relaxed first meeting to understand your background, goals, and current challenges. We set the foundation for your personal development journey.',
  },
  {
    number: '02',
    title: 'Self-Discovery',
    duration: 'Sessions 2–4',
    desc: 'Deep-dive into who you are — your workstyle, values, strengths, and blind spots. Core questions: "Who am I? What do I want? What am I capable of?"',
  },
  {
    number: '03',
    title: 'Skills & Resilience',
    duration: 'Sessions 5–8',
    desc: 'Practical development of leadership skills, communication strategies, critical thinking frameworks, and resilience techniques for real workplace situations.',
  },
  {
    number: '04',
    title: 'Integration & Growth',
    duration: 'Sessions 9–12',
    desc: 'Apply everything you\'ve learned in your daily traineeship. We review progress, address challenges, and build a roadmap for continued growth beyond the program.',
  },
];

const FAQS = [
  {
    q: 'Who is the Personal Leadership Program for?',
    a: 'The program is designed for every trainee placed through Spark Traineeships. It runs alongside your traineeship and is fully included — no extra cost, no separate application.',
  },
  {
    q: 'How often do sessions take place?',
    a: 'Sessions are typically held every two to three weeks throughout your traineeship. The exact schedule is agreed with your coach at the start of the program.',
  },
  {
    q: 'Are sessions in English or Finnish?',
    a: 'Sessions are available in both English and Finnish. We match you with a coach based on your language preference and background.',
  },
  {
    q: 'Is the program in-person or remote?',
    a: 'Both options are available. Many trainees prefer a mix — in-person for early sessions to build rapport, then remote for ongoing meetings.',
  },
  {
    q: 'What makes this different from regular HR support?',
    a: 'This is not performance management or HR support. It is genuine personal development — a confidential space to explore your identity, ambitions, and challenges with an experienced coach.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-body font-semibold text-[#1a2744] text-sm leading-snug">{q}</span>
        <FiChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-[#E85D26]' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className="font-body text-gray-500 text-sm leading-relaxed px-5 pb-5">{a}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────── main component ─────────────────────────── */
export default function LeadershipTraining() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const [pillarsRef,  pillarsInView]  = useInView();
  const [journeyRef,  journeyInView]  = useInView();
  const [quoteRef,    quoteInView]    = useInView();
  const [faqRef,      faqInView]      = useInView();
  const [ctaRef,      ctaInView]      = useInView();

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#1a2744] pt-28 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* glow */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#E85D26] opacity-[0.07] blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full bg-blue-500 opacity-[0.04] blur-[80px] pointer-events-none" />
        {/* top bar */}
        <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — copy */}
            <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#E85D26]" />
                <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">
                  Personal Development
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Personal Leadership{' '}
                <span className="text-[#E85D26]">Program</span>
              </h1>

              <p className="font-body text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Every Spark traineeship comes with a dedicated personal leadership journey — a confidential coaching program built around three fundamental questions.
              </p>

              {/* Three core questions */}
              <div className="bg-white/8 border border-white/15 rounded-2xl p-5 mb-8 space-y-3">
                {[
                  '"Who am I?"',
                  '"What do I want?"',
                  '"What am I capable of?"',
                ].map((q) => (
                  <div key={q} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#E85D26]/20 border border-[#E85D26]/40 flex items-center justify-center flex-shrink-0">
                      <FiStar className="w-3 h-3 text-[#E85D26]" />
                    </div>
                    <p className="font-display text-white text-base italic">{q}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#E85D26] text-white text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Join the Program
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white text-sm font-semibold font-body rounded-full border border-white/25 hover:bg-white/20 transition-all duration-200"
                >
                  Ask a Question
                </Link>
              </div>
            </div>

            {/* Right — visual card */}
            <div className={`transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative">
                {/* main card */}
                <div className="rounded-2xl overflow-hidden aspect-[5/5] bg-gradient-to-br from-[#243358] to-[#111b33] border border-white/10 relative">
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  {/* placeholder */}
                 <div className="absolute inset-0">
                    <img src="/leader2.png" alt="" className="w-full h-full object-cover"/>
                  </div>
                  {/* quote card */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
                    <p className="font-display text-black text-sm italic leading-relaxed">
                      "Leadership is not a title. It starts with knowing who you are."
                    </p>
                    <p className="font-body text-black text-xs mt-2">— Spark Leadership Program</p>
                  </div>
                </div>

                {/* 1:1 badge */}
                <div className="absolute -top-4 -right-4 w-[76px] h-[76px] rounded-full bg-[#E85D26] shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display text-xl font-bold text-white leading-none">1:1</p>
                    <p className="font-body text-white/75 text-[9px] mt-0.5 tracking-wide">Coaching</p>
                  </div>
                </div>

                {/* included badge */}
                <div className="absolute -bottom-4 -left-3 bg-white rounded-xl px-4 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2">
                  <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="font-body text-xs font-semibold text-[#1a2744]">Included with every placement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT IS IT — overview strip
      ══════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                Icon: FiCalendar,
                title: '12 Sessions',
                desc: 'Spread across your traineeship period — roughly every two to three weeks.',
              },
              {
                Icon: FiClock,
                title: '60 min each',
                desc: 'One focused hour per session, in-person or remote — whatever suits you best.',
              },
              {
                Icon: FiMessageCircle,
                title: 'Fully confidential',
                desc: 'What you share with your coach stays with your coach. Always.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1a2744]/5 flex items-center justify-center flex-shrink-0">
                  <item.Icon className="w-5 h-5 text-[#1a2744]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#1a2744] text-lg leading-none mb-1">{item.title}</p>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLARS
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={pillarsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className={`text-center mb-12 transition-all duration-700 ${pillarsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">What We Focus On</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">
              Eight Pillars of Development
            </h2>
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Each pillar is woven into the coaching sessions — not as a checklist, but as a living, personalised journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.label}
                className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${pillarsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#1a2744]/5 flex items-center justify-center mb-4">
                  <pillar.Icon className="w-5 h-5 text-[#1a2744]" />
                </div>
                <h3 className="font-body font-bold text-[#1a2744] text-sm mb-2">{pillar.label}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          JOURNEY / PROGRAM STRUCTURE
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white" ref={journeyRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className={`text-center mb-14 transition-all duration-700 ${journeyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Program Structure</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">Your Coaching Journey</h2>
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Four phases across twelve sessions — each building on the last, at a pace that fits your life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {JOURNEY_STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`relative p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${journeyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* connector line desktop */}
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-5 h-px bg-gray-200 z-10" />
                )}
                {/* step number + duration */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#1a2744] flex items-center justify-center">
                    <HiOutlineAcademicCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-display text-4xl font-bold text-gray-100 leading-none">{step.number}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#E85D26]/10 text-[#E85D26] text-[10px] font-bold font-body px-2.5 py-1 rounded-full uppercase tracking-wide mb-3">
                  <FiCalendar className="w-3 h-3" />
                  {step.duration}
                </div>
                <h3 className="font-display text-lg font-bold text-[#1a2744] mb-2">{step.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PULL QUOTE
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#1a2744] relative overflow-hidden" ref={quoteRef}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${quoteInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <HiOutlineSparkles className="w-10 h-10 text-[#E85D26] mx-auto mb-6" />
            <blockquote className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-6 italic">
              "We don't just help young professionals find work. We support their development as resilient, self-aware future leaders."
            </blockquote>
            <p className="font-body text-white/45 text-sm">— Spark Traineeships Oy</p>

            {/* Included list */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { Icon: FiCheck, text: 'Included with every Spark traineeship — no extra cost' },
                { Icon: FiCheck, text: 'Available in English and Finnish' },
                { Icon: FiCheck, text: 'In-person, remote, or hybrid' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 bg-white/8 border border-white/10 rounded-xl px-4 py-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#E85D26]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.Icon className="w-3 h-3 text-[#E85D26]" />
                  </div>
                  <p className="font-body text-white/70 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={faqRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">Common Questions</h2>
            <p className="font-body text-gray-500 text-base">
              Still have a question?{' '}
              <Link to="/contact" className="text-[#E85D26] font-semibold hover:underline">Contact us.</Link>
            </p>
          </div>

          <div className={`space-y-3 transition-all duration-700 delay-100 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {FAQS.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#E85D26] relative overflow-hidden" ref={ctaRef}>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-14 -left-14 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-white/65 font-semibold text-xs tracking-widest uppercase mb-4">Start Your Journey</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Ready to Discover What You're Capable Of?
            </h2>
            <p className="font-body text-white/75 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              The Personal Leadership Program is included with every Spark traineeship placement. Register as a trainee today and your coaching journey begins with your first match.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#E85D26] text-sm font-bold font-body rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Register as a Trainee
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white text-sm font-bold font-body rounded-full border-2 border-white/40 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                Learn About Spark
              </Link>
            </div>
            <p className="font-body text-white/40 text-xs mt-8">
              Free for all trainees · No separate application required · Starts with your first match
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
