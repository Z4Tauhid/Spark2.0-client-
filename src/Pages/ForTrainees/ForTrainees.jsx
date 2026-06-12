import { useRef, useState, useEffect } from 'react';
import { BiWorld } from 'react-icons/bi';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { FaCompass, FaGraduationCap } from 'react-icons/fa6';
import { FcOrganization } from 'react-icons/fc';
import { ImBooks } from 'react-icons/im';
import { TbTargetArrow } from 'react-icons/tb';
import { VscGraphLine } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

/* ─── shared helpers ─── */
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

function HexBadge({ label, featured }) {
  return (
    <div className="flex justify-center mt-5">
      <div
        className={`font-bold text-center px-12 py-4 inline-block
          ${featured ? 'bg-[#E85D26] text-[#1A224F]' : 'bg-gray-300 text-[#1A224F]'}`}
        style={{
          clipPath:
            'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

// function useCountUp(target, duration, active) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     if (!active) return;
//     let start = null;
//     const raf = (ts) => {
//       if (!start) start = ts;
//       const p = Math.min((ts - start) / duration, 1);
//       setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
//       if (p < 1) requestAnimationFrame(raf);
//     };
//     requestAnimationFrame(raf);
//   }, [target, duration, active]);
//   return count;
// }

/* ─── Page Hero ─── */
function PageHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className="relative bg-[#1a2744] pt-28 pb-20 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#E85D26] opacity-[0.07] blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full bg-blue-500 opacity-[0.05] blur-[80px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* copy */}
          <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E85D26] animate-pulse" />
              <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">For Trainees</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Your Career Starts Here.<br />
              <span className="text-[#E85D26]">We'll Guide Every Step.</span>
            </h1>
            <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Spark matches skilled young professionals with Finnish employers who are ready to invest in long-term talent. Free support, real roles, and a personal leadership program — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E85D26] text-white text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Register — It's Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white text-sm font-semibold font-body rounded-full border border-white/25 hover:bg-white/20 transition-all duration-200">
                Ask a Question
              </Link>
            </div>
          </div>

          {/* floating stat cards */}
          <div className={`transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '1,284+', label: 'Open Roles',            sub: 'In Päijät-Häme',               bg: 'bg-white',           text: 'text-[#1a2744]' },
                { value: '312+',   label: 'Trainee Positions',     sub: 'Right for your level',          bg: 'bg-[#E85D26]',      text: 'text-white' },
                { value: '4 days', label: 'Avg. Time to Match',    sub: 'From sign-up to offer',         bg: 'bg-white/10 border border-white/20', text: 'text-white' },
                { value: '100%',   label: 'Free for Trainees',     sub: 'No hidden fees, ever',          bg: 'bg-white/10 border border-white/20', text: 'text-white' },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-2xl p-5`}>
                  <p className={`font-display text-2xl sm:text-3xl font-bold ${s.text} leading-none mb-1`}>{s.value}</p>
                  <p className={`font-body font-semibold text-sm ${s.text} mb-0.5`}>{s.label}</p>
                  <p className={`font-body text-xs ${s.text === 'text-white' ? 'text-white/50' : 'text-gray-400'}`}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works step ─── */
function Step({ n, title, desc, delay, inView }) {
  return (
    <div className={`flex gap-4 sm:gap-5 transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-[#E85D26] flex items-center justify-center">
          <span className="font-display text-sm font-bold text-white">{n}</span>
        </div>
        {n < 5 && <div className="w-px flex-1 bg-gray-200 mt-2 min-h-[32px]" />}
      </div>
      <div className="pb-6 sm:pb-8 flex-1 min-w-0">
        <h3 className="font-display text-lg font-bold text-[#1a2744] mb-1.5">{title}</h3>
        <p className="font-body text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Benefit card ─── */
function BenefitCard({ emoji, title, desc, delay, inView }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-3xl mb-4">{emoji}</div>
      <h3 className="font-display text-base font-bold text-[#1a2744] mb-2">{title}</h3>
      <p className="font-body text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Role type card ─── */
function RoleCard({
  emoji,
  title,
  duration,
  pay,
  level,
  tag,
  featured,
  hexLabel,
}) {
  return (
    <div
      className={`relative rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1
      ${
        featured
          ? 'border-[#E85D26]/50 bg-[#E85D26]/5 shadow-[0_0_24px_rgba(232,93,38,0.12)]'
          : 'border-gray-100 bg-white shadow-sm hover:shadow-md'
      }`}
    >
      {featured && (
        <span className="absolute top-4 right-4 bg-[#E85D26] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide font-body">
          Best Fit
        </span>
      )}

      <div className="text-3xl mb-4">{emoji}</div>

      <h3 className="font-display text-lg font-bold text-[#1a2744] mb-3">
        {title}
      </h3>

      <div className="space-y-2 mb-4">
        {[
          { label: 'Duration', value: duration },
          { label: 'Compensation', value: pay },
          { label: 'Level', value: level },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-2"
          >
            <span className="font-body text-xs text-gray-400">
              {row.label}
            </span>

            <span className="font-body text-xs font-semibold text-[#1a2744]">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <span
        className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full font-body
        ${
          featured
            ? 'bg-[#E85D26] text-white'
            : 'bg-[#1a2744]/8 text-[#1a2744]'
        }`}
      >
        {tag}
      </span>

      <HexBadge
        label={hexLabel}
        featured={featured}
      />
    </div>
  );
}

/* ─── Language badge ─── */
function LangBadge({ flag, lang }) {
  return (
    <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
      <span className="text-xl">{flag}</span>
      <span className="font-body text-sm font-semibold text-[#1a2744]">{lang}</span>
    </div>
  );
}

/* ─── Testimonial card ─── */
function TestimonialCard({ quote, name, role, emoji, delay, inView }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-2xl mb-4">❝</div>
      <p className="font-body text-gray-600 text-sm leading-relaxed mb-5 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1a2744]/8 flex items-center justify-center text-xl flex-shrink-0">{emoji}</div>
        <div>
          <p className="font-body font-semibold text-[#1a2744] text-sm">{name}</p>
          <p className="font-body text-gray-400 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── DATA ─── */
const STEPS = [
  { n: 1, title: 'Register for Free',          desc: 'Create your Spark profile in minutes. Tell us about your skills, languages, and what kind of role you\'re looking for. No CV required to get started.' },
  { n: 2, title: 'Profile Review by Spark',    desc: 'Our team reviews your profile and gets in touch — usually within 24 hours. We take time to understand your ambitions before making any suggestions.' },
  { n: 3, title: 'Smart Matching',             desc: 'We match you based on skills, personality, work style, and Finnish work culture readiness — not just job titles. Quality over quantity, always.' },
  { n: 4, title: 'Placement & Onboarding',     desc: 'We handle introductions, coordinate the practicalities, and stay actively involved throughout your traineeship to make sure things go well for both sides.' },
  { n: 5, title: 'Leadership Program Begins',  desc: 'From day one, you\'ll attend personal one-on-one coaching sessions focused on self-awareness, resilience, and long-term career clarity.' },
];

const BENEFITS = [
  { emoji: (<FaMoneyCheckAlt />), title: 'Completely Free',          desc: 'Spark is 100% free for trainees. We are compensated by the organisations we partner with — never by candidates.' },
  { emoji: (<FaCompass />), title: 'Personal Guidance',        desc: 'You get a dedicated Spark contact who knows your background, follows your progress, and advocates for you throughout the process.' },
  { emoji: (<FcOrganization />), title: 'Vetted Employers',         desc: 'We only work with organisations that are genuinely ready to invest in trainee talent — not just filling a role cheaply.' },
  { emoji: (<TbTargetArrow />), title: 'Aligned Matches Only',     desc: 'We won\'t send you to a role that doesn\'t fit. If the right match doesn\'t exist yet, we\'ll tell you honestly and keep looking.' },
  { emoji: (<VscGraphLine />), title: 'Leadership Development',   desc: 'Every placement includes the Personal Leadership Program — 1:1 sessions focused on who you are, what you want, and what you\'re capable of.' },
  { emoji: (<BiWorld />), title: 'Multilingual Welcome',     desc: 'You don\'t need to be fluent in Finnish to apply. We actively place foreign-language speakers in workplaces that are ready for them.' },
];

const ROLE_TYPES = [
  {
    emoji: <FaGraduationCap />,
    title: 'Internship',
    duration: 'A few weeks–months',
    pay: 'Sometimes unpaid',
    level: 'During studies',
    tag: 'Young Student',
    hexLabel: 'Young Student',
    featured: false,
  },
  {
    emoji: <ImBooks />,
    title: 'Thesis Work',
    duration: '1 semester',
    pay: 'Often compensated',
    level: 'Near graduation',
    tag: 'Graduate',
    hexLabel: 'Graduate',
    featured: false,
  },
  {
    emoji: <BsFillRocketTakeoffFill className="text-[#E85D26]" />,
    title: 'Traineeship',
    duration: '12 to 24 months',
    pay: 'Usually paid',
    level: 'After graduation',
    tag: 'Young Professional',
    hexLabel: 'Young Professional',
    featured: true,
  },
];

const LANGUAGES = [
  { flag: '🇬🇧', lang: 'English' },
  { flag: '🇫🇮', lang: 'Finnish' },
  { flag: '🇸🇦', lang: 'Arabic' },
  { flag: '🇷🇺', lang: 'Russian' },
  { flag: '🇪🇸', lang: 'Spanish' },
  { flag: '🇫🇷', lang: 'French' },
  { flag: '🇩🇪', lang: 'German' },
  { flag: '🇨🇳', lang: 'Mandarin' },
];

const TESTIMONIALS = [
  { emoji: '👩', quote: 'I had been looking for work in Finland for months with no results. Spark matched me within a week and the leadership coaching changed how I see my own career.', name: 'Maria S.', role: 'Trainee → Marketing Coordinator, Lahti' },
  { emoji: '👨', quote: 'The process was nothing like applying to jobs online. They actually listened to what I wanted. The employer was a perfect fit from day one.', name: 'Ahmed K.', role: 'Trainee → Junior Developer, Päijät-Häme' },
  { emoji: '👩‍💼', quote: 'What surprised me most was the leadership program. I came for the job but I stayed for the growth. I\'m a different professional than I was a year ago.', name: 'Yuki T.', role: 'Trainee → Operations Analyst, Heinola' },
];

const ELIGIBILITY = [
  'Graduated or about to graduate from a university, UAS, or vocational institution',
  'Motivated to build a long-term career in Finland',
  'Open to roles across the Päijät-Häme region',
  'Available for at least 12 months of full-time work',
  'Language skills in English, Finnish, or another supported language',
  'No prior Finnish work experience required',
];

/* ─── PAGE ─── */
export default function ForTrainees() {
  const [stepsRef,   stepsInView]   = useInView(0.08);
  const [benefitsRef, benefitsInView] = useInView();
  const [rolesRef,   rolesInView]   = useInView();
  const [langRef,    langInView]    = useInView();
  const [testRef,    testInView]    = useInView();
  const [eligRef,    eligInView]    = useInView();
  const [ctaRef,     ctaInView]     = useInView();

  return (
    <div className="overflow-x-hidden">
      <PageHero />

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 bg-white" ref={stepsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* sticky label */}
            <div className={`transition-all duration-700 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">The Process</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] leading-tight mb-5">
                How Spark Works for Trainees
              </h2>
              <p className="font-body text-gray-500 text-base leading-relaxed mb-8">
                From your first registration to a successful long-term placement — here's exactly what happens and when.
              </p>
              {/* mini trust strip */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <p className="font-body font-semibold text-[#1a2744] text-sm mb-3">What makes Spark different</p>
                <div className="space-y-2">
                  {['Human review — not an algorithm', 'Avg. 4-day time to match', 'Free leadership coaching included', 'Active support during the whole placement'].map(t => (
                    <div key={t} className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#E85D26] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-body text-sm text-gray-600">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* steps */}
            <div className="pt-1">
              {STEPS.map((s, i) => <Step key={s.n} {...s} delay={i * 100} inView={stepsInView} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={benefitsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Why Choose Spark</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">What You Get</h2>
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Beyond just a job — a complete package of support, development, and genuine opportunity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => <BenefitCard key={b.title} {...b} delay={i * 70} inView={benefitsInView} />)}
          </div>
        </div>
      </section>

      {/* ── Role Types ── */}
      <section className="py-16 sm:py-24 bg-[#1a2744]" ref={rolesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${rolesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Program Types</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Which Path Is Right for You?
            </h2>
            <p className="font-body text-white/55 text-base max-w-xl mx-auto">
              Spark specialises in Traineeships — but we help you understand all three paths so you make the right choice.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ROLE_TYPES.map((r, i) => (
              <div key={r.title}
                className={`transition-all duration-500 ${rolesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <RoleCard {...r} />
              </div>
            ))}
          </div>
          {/* journey strip */}
          {/* <div className={`mt-12 transition-all duration-700 delay-300 ${rolesInView ? 'opacity-100' : 'opacity-0'}`}>
            <p className="font-body text-white/30 text-[10px] text-center uppercase tracking-widest mb-5">Career journey</p>
            <div className="flex justify-center overflow-x-auto pb-1">
              <div className="flex items-stretch">
                {['Young Student', 'Graduate', 'Young Professional'].map((step, i) => {
                  const active = i === 2;
                  return (
                    <div key={step} className="flex items-center">
                      <div className={`relative px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold font-body
                        ${i === 0 ? 'rounded-l-full pl-6 sm:pl-8' : ''}
                        ${i === 2 ? 'rounded-r-full pr-6 sm:pr-8' : ''}
                        ${active ? 'bg-[#E85D26] text-white' : 'bg-white/10 text-white/50'}`}>
                        {active && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#E85D26] text-xs leading-none">▼</span>}
                        {step}
                      </div>
                      {i < 2 && (
                        <div className={`w-0 h-0 border-t-[18px] border-b-[18px] border-l-[12px] border-transparent -ml-px
                          ${active ? 'border-l-[#E85D26]' : 'border-l-white/10'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* ── Languages ── */}
      <section className="py-16 sm:py-20 bg-white" ref={langRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className={`transition-all duration-700 ${langInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Multilingual</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] leading-tight mb-5">
                You Don't Need to Speak Finnish Fluently
              </h2>
              <p className="font-body text-gray-500 text-base leading-relaxed mb-4">
                We work with young professionals from across the world and have a growing network of Finnish employers who are ready to welcome international talent.
              </p>
              <p className="font-body text-gray-500 text-base leading-relaxed mb-6">
                Whether your strongest language is English, Arabic, Russian, or something else — Spark will find the right fit for you.
              </p>
              <div className="flex items-center gap-2.5 bg-[#1a2744]/5 rounded-xl px-4 py-3 border border-[#1a2744]/10 w-fit">
                <span className="text-lg">🌍</span>
                <span className="font-body text-sm font-semibold text-[#1a2744]">44+ multilingual employers actively hiring</span>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${langInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                {LANGUAGES.map(l => <LangBadge key={l.lang} {...l} />)}
              </div>
              <p className="font-body text-gray-400 text-xs mt-4 text-center">+ many more languages supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={testRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${testInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Trainee Stories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">Voices From Our Community</h2>
            <p className="font-body text-gray-500 text-base max-w-lg mx-auto">
              Real experiences from trainees who found their path through Spark. Replace these with actual testimonials.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={t.name} {...t} delay={i * 90} inView={testInView} />)}
          </div>
        </div>
      </section>

      {/* ── Eligibility ── */}
      <section className="py-16 sm:py-20 bg-white" ref={eligRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${eligInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="bg-[#1a2744] rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Before You Apply</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">Am I Eligible?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ELIGIBILITY.map((item, i) => (
                    <div key={i}
                      className={`flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10 transition-all duration-400 ${eligInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: `${i * 70}ms` }}>
                      <svg className="w-4 h-4 text-[#E85D26] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <p className="font-body text-white/75 text-sm leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="font-body text-white/40 text-xs mt-5">
                  Not sure if you qualify? <Link to="/contact" className="text-[#E85D26] hover:underline font-semibold">Send us a message</Link> — we'll tell you honestly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-[#E85D26] relative overflow-hidden" ref={ctaRef}>
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-14 -left-14 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-white/65 font-semibold text-xs tracking-widest uppercase mb-4">Take the First Step</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Ready to Find Your Place in Finland?
            </h2>
            <p className="font-body text-white/75 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Registration takes 5 minutes. Our team will reach out within 24 hours. No commitment, no cost — just a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#E85D26] text-sm font-bold font-body rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Register — It's Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white text-sm font-bold font-body rounded-full border-2 border-white/40 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200">
                Ask a Question First
              </Link>
            </div>
            <p className="font-body text-white/40 text-xs mt-6">Free for trainees · No CV required to start · Respond within 24h</p>
          </div>
        </div>
      </section>
    </div>
  );
}
