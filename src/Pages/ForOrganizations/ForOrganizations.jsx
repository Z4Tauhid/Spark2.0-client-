import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaClock,
  FaBriefcase,
  FaClipboardList,
  FaHandshake,
  FaChartLine,
  FaGlobeEurope,
  FaIndustry,
  FaLaptopCode,
  FaHospital,
  FaLeaf,
  // FaHardHat,
  FaUniversity,
  FaGraduationCap,
  FaShoppingCart,
  FaUserTie,
  FaBuilding,
  FaUserGraduate,
} from 'react-icons/fa';

import { MdOutlineEngineering } from 'react-icons/md';

/* ─── shared hook ─── */
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
              <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">For Organizations</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Build the Team You Need.<br />
              <span className="text-[#E85D26]">Without the Friction.</span>
            </h1>
            <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Spark connects Finnish organisations with pre-vetted, motivated young professionals — reducing hiring costs, administrative burden, and time-to-productivity. We handle the matching. You focus on the work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E85D26] text-white text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Join Our Pilot Program
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white text-sm font-semibold font-body rounded-full border border-white/25 hover:bg-white/20 transition-all duration-200">
                Talk to an Advisor
              </Link>
            </div>
          </div>

          {/* metric cards */}
          <div className={`transition-all duration-700 delay-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '4 days',  label: 'Avg. Time to Match',      sub: 'vs. 6–8 weeks traditional', bg: 'bg-[#E85D26]',              text: 'text-white' },
                { value: '60%',     label: 'Admin Burden Reduced',     sub: 'We handle the paperwork',   bg: 'bg-white',                  text: 'text-[#1a2744]' },
                { value: '78%',     label: 'Trainee Retention Rate',   sub: 'Remain after traineeship',  bg: 'bg-white/10 border border-white/20', text: 'text-white' },
                { value: '0 fees',  label: 'Until Successful Match',   sub: 'Risk-free pilot terms',     bg: 'bg-white/10 border border-white/20', text: 'text-white' },
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

/* ─── Cost Calculator ─── */
function CostCalculator() {
  const [ref, inView] = useInView(0.1);
  const [employees, setEmployees] = useState(2);

  const traditional = employees * 8500;
  const spark       = employees * 3200;
  const savings     = traditional - spark;
  const pct         = Math.round((savings / traditional) * 100);

  return (
    <section className="py-16 sm:py-24 bg-gray-50" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Cost Savings Calculator</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">See What You Save</h2>
          <p className="font-body text-gray-500 text-base max-w-lg mx-auto">
            Compare the real cost of traditional hiring vs Spark Traineeships. Drag the slider to adjust your team size.
          </p>
        </div>

        <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Slider row */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <label className="font-body font-semibold text-[#1a2744] text-sm">
                Trainees you want to hire
              </label>
              <span className="font-display text-2xl font-bold text-[#E85D26]">{employees}</span>
            </div>
            <input
              type="range" min={1} max={10} value={employees}
              onChange={e => setEmployees(Number(e.target.value))}
              className="w-full h-2 appearance-none rounded-full outline-none cursor-pointer"
              style={{ background: `linear-gradient(to right, #E85D26 ${(employees - 1) / 9 * 100}%, #e5e7eb ${(employees - 1) / 9 * 100}%)` }}
            />
            <div className="flex justify-between mt-1">
              <span className="font-body text-xs text-gray-400">1</span>
              <span className="font-body text-xs text-gray-400">10</span>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { label: 'Traditional Hiring', value: `€${traditional.toLocaleString()}`, sub: 'Per year, per hire (est.)', color: 'text-gray-700', bg: '' },
              { label: 'Spark Traineeships', value: `€${spark.toLocaleString()}`,       sub: 'Per year, per trainee',      color: 'text-[#1a2744]', bg: '' },
              { label: 'Your Annual Saving', value: `€${savings.toLocaleString()}`,     sub: `${pct}% cost reduction`,     color: 'text-[#E85D26]', bg: 'bg-orange-50/60' },
            ].map(col => (
              <div key={col.label} className={`p-6 sm:p-8 text-center ${col.bg}`}>
                <p className="font-body text-gray-400 text-xs uppercase tracking-wide mb-2">{col.label}</p>
                <p className={`font-display text-3xl sm:text-4xl font-bold ${col.color} mb-1`}>{col.value}</p>
                <p className="font-body text-gray-400 text-xs">{col.sub}</p>
              </div>
            ))}
          </div>

          <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="font-body text-gray-400 text-xs text-center">
              * Estimates based on Finnish labour market averages. Includes recruitment fees, onboarding, HR overhead, and early attrition risk. Actual savings vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Process step ─── */
function OrgStep({ n, title, desc, delay, inView }) {
  return (
    <div className={`flex gap-4 sm:gap-5 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-[#E85D26] flex items-center justify-center">
          <span className="font-display text-sm font-bold text-white">{n}</span>
        </div>
        {n < 5 && <div className="w-px flex-1 bg-white/20 mt-2 min-h-[32px]" />}
      </div>
      <div className="pb-6 sm:pb-8 flex-1 min-w-0">
        <h3 className="font-display text-lg font-bold text-white mb-1.5">{title}</h3>
        <p className="font-body text-white/55 text-sm leading-relaxed">{desc}</p>
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

/* ─── Readiness score item ─── */
function ScoreRow({ label, score, color, delay, inView }) {
  return (
    <div className={`transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-body text-sm font-semibold text-white">{label}</span>
        <span className="font-body text-sm font-bold text-white">{score}/100</span>
      </div>
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000`}
          style={{ width: inView ? `${score}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/* ─── Testimonial ─── */
function OrgTestimonial({ quote, name, role, emoji, delay, inView }) {
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
const ORG_STEPS = [
  { n: 1, title: 'Initial Consultation',       desc: 'We start with a free call to understand your organisation — your culture, your needs, and what kind of trainee would genuinely thrive with your team.' },
  { n: 2, title: 'Readiness Assessment',       desc: 'Spark evaluates your talent readiness, inclusion maturity, and onboarding capacity. You receive a score and tailored recommendations before any commitment.' },
  { n: 3, title: 'Role Definition',            desc: 'Together we define a clear traineeship role with goals, duration, compensation, and growth pathways. Good definition leads to better matching.' },
  { n: 4, title: 'Candidate Presentation',     desc: 'We present 2–3 pre-vetted, matched candidates. You interview only people who genuinely fit. No sifting through hundreds of CVs.' },
  { n: 5, title: 'Placement & Ongoing Support', desc: 'Once matched, we coordinate onboarding, monitor progress, and stay involved throughout. If something isn\'t working, we step in before problems grow.' },
];

const ORG_BENEFITS = [
  {
    emoji: <FaClock className="text-[#E85D26]" />,
    title: 'Dramatically Faster Hiring',
    desc: 'Average time-to-match is 4 days. Traditional recruitment takes 6 to 8 weeks. Spark gets the right person through your door faster.'
  },
  {
    emoji: <FaBriefcase className="text-[#E85D26]" />,
    title: 'Pre-Vetted Candidates',
    desc: 'Every trainee we present has been reviewed by our team for skills, motivation, and cultural fit — not just filtered by keyword.'
  },
  {
    emoji: <FaClipboardList className="text-[#E85D26]" />,
    title: 'Admin Burden Removed',
    desc: 'We handle the matching, coordination, and ongoing monitoring. You focus on the work, not the paperwork.'
  },
  {
    emoji: <FaHandshake className="text-[#E85D26]" />,
    title: 'EOR Partnership Option',
    desc: 'Through our Vonk EOR partnership, we can handle employer-of-record services — reducing your legal and HR risk even further.'
  },
  {
    emoji: <FaChartLine className="text-[#E85D26]" />,
    title: 'Long-Term Retention',
    desc: '78% of our placed trainees remain in the region after their assignment. We focus on lasting fit, not quick placements.'
  },
  {
    emoji: <FaGlobeEurope className="text-[#E85D26]" />,
    title: 'Access to International Talent',
    desc: 'Our trainee network includes multilingual professionals from across the world — giving you access to talent the traditional job market misses.'
  },
];

const SCORES = [
  { label: 'Talent Readiness',       score: 75, color: 'bg-[#E85D26]' },
  { label: 'Inclusion Maturity',     score: 62, color: 'bg-blue-500' },
  { label: 'Onboarding Capacity',    score: 80, color: 'bg-green-500' },
  { label: 'Risk Exposure',          score: 88, color: 'bg-purple-500' },
];

const WHO_ITS_FOR = [
  {
    emoji: <FaIndustry className="text-[#E85D26]" />,
    label: 'Manufacturing & Logistics'
  },
  {
    emoji: <FaLaptopCode className="text-[#E85D26]" />,
    label: 'Tech & Digital'
  },
  {
    emoji: <FaHospital className="text-[#E85D26]" />,
    label: 'Healthcare & Social Services'
  },
  {
    emoji: <FaLeaf className="text-[#E85D26]" />,
    label: 'Agriculture & Green Transition'
  },
  {
    emoji: <MdOutlineEngineering className="text-[#E85D26]" />,
    label: 'Construction & Engineering'
  },
  {
    emoji: <FaUniversity className="text-[#E85D26]" />,
    label: 'Public Sector & Municipalities'
  },
  {
    emoji: <FaGraduationCap className="text-[#E85D26]" />,
    label: 'Education & Research'
  },
  {
    emoji: <FaShoppingCart className="text-[#E85D26]" />,
    label: 'Retail & Customer Service'
  },
];

const ORG_TESTIMONIALS = [
  {
    emoji: <FaUserTie className="text-[#E85D26]" />,
    quote:
      'We had a role open for three months with no suitable candidates from traditional channels. Spark found us the right person in 5 days. The match was almost uncanny.',
    name: 'HR Director',
    role: 'Manufacturing company, Lahti',
  },
  {
    emoji: <FaBuilding className="text-[#E85D26]" />,
    quote:
      "The readiness assessment alone was worth the conversation. It helped us see gaps in our own onboarding that we hadn't noticed. Spark added value before we even made a hire.",
    name: 'Operations Manager',
    role: 'Logistics firm, Päijät-Häme',
  },
  {
    emoji: <FaUserGraduate className="text-[#E85D26]" />,
    quote:
      'As a public organisation we were hesitant about trainee programmes. Spark handled everything — and our trainee is now a permanent employee.',
    name: 'Director',
    role: 'Public sector organisation, Heinola',
  },
];

const PILOT_TERMS = [
  'No upfront fees — you pay only after a successful match',
  'Full readiness assessment included at no cost',
  'Dedicated Spark advisor throughout the process',
  '30-day satisfaction guarantee on every placement',
  'Access to our entire multilingual trainee pool',
  'Ongoing monitoring and support for the full traineeship duration',
];

/* ─── PAGE ─── */
export default function ForOrganizations() {
  const [benefitsRef, benefitsInView] = useInView();
  const [stepsRef,    stepsInView]    = useInView(0.08);
  // const [scoreRef,    scoreInView]    = useInView();
  const [whoRef,      whoInView]      = useInView();
  const [testRef,     testInView]     = useInView();
  const [pilotRef,    pilotInView]    = useInView();
  const [ctaRef,      ctaInView]      = useInView();

  return (
    <div className="overflow-x-hidden">
      <PageHero />

      {/* ── Benefits ── */}
      <section className="py-16 sm:py-24 bg-white" ref={benefitsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Why Spark</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">What You Get as a Partner</h2>
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              More than a recruitment service — a long-term talent partnership that reduces cost, risk, and administrative burden.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ORG_BENEFITS.map((b, i) => <BenefitCard key={b.title} {...b} delay={i * 70} inView={benefitsInView} />)}
          </div>
        </div>
      </section>

      {/* ── Cost Calculator ── */}
      <CostCalculator />

      {/* ── Process (dark) ── */}
      <section className="py-16 sm:py-24 bg-[#1a2744]" ref={stepsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <div className={`transition-all duration-700 ${stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Our Process</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
                How We Work With You
              </h2>
              <p className="font-body text-white/55 text-base leading-relaxed mb-8">
                From the first conversation to a placed and retained trainee — here's our step-by-step process designed to minimise your effort and maximise fit.
              </p>
              {/* Readiness diagnostic preview */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="font-body text-white/60 text-xs uppercase tracking-widest mb-4">Sample readiness profile</p>
                <div className="space-y-4">
                  {SCORES.map((s, i) => <ScoreRow key={s.label} {...s} delay={i * 100} inView={stepsInView} />)}
                </div>
                <p className="font-body text-white/30 text-xs mt-4">Your actual scores will vary. Diagnostic is free and included with every consultation.</p>
              </div>
            </div>

            <div className="pt-1">
              {ORG_STEPS.map((s, i) => <OrgStep key={s.n} {...s} delay={i * 90} inView={stepsInView} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="py-16 sm:py-20 bg-white" ref={whoRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className={`transition-all duration-700 ${whoInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Industries We Serve</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] leading-tight mb-5">
                We Work Across Every Sector
              </h2>
              <p className="font-body text-gray-500 text-base leading-relaxed mb-4">
                Spark places trainees across the full range of Finnish industries. Whether you're a small SME or a large public organisation, we adapt our approach to your needs.
              </p>
              <p className="font-body text-gray-500 text-base leading-relaxed mb-6">
                We have a particular focus on sectors facing talent shortages in Päijät-Häme — manufacturing, logistics, tech, and the green transition — but we serve all industries.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a2744] text-white text-sm font-semibold font-body rounded-full hover:bg-[#243358] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                Discuss Your Industry
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
            <div className={`transition-all duration-700 delay-200 ${whoInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
              <div className="grid grid-cols-2 gap-3">
                {WHO_ITS_FOR.map((w, i) => (
                  <div key={w.label}
                    className={`flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100 transition-all duration-400 ${whoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${i * 60}ms` }}>
                    <span className="text-xl flex-shrink-0">{w.emoji}</span>
                    <span className="font-body text-sm font-semibold text-[#1a2744] leading-tight">{w.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={testRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${testInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Partner Stories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">What Our Partners Say</h2>
            <p className="font-body text-gray-500 text-base max-w-lg mx-auto">
              Placeholder testimonials — replace with real quotes from your partner organisations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ORG_TESTIMONIALS.map((t, i) => <OrgTestimonial key={t.name + i} {...t} delay={i * 90} inView={testInView} />)}
          </div>
        </div>
      </section>

      {/* ── Pilot Program Terms ── */}
      <section className="py-16 sm:py-20 bg-white" ref={pilotRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${pilotInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="bg-[#1a2744] rounded-2xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#E85D26]/20 border border-[#E85D26]/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#E85D26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-1">Pilot Program</p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                      What's Included in the Pilot
                    </h2>
                    <p className="font-body text-white/55 text-sm mt-2 leading-relaxed">
                      We're currently onboarding organisations into our pilot cohort. Here's exactly what you get — with no commitment required to start.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PILOT_TERMS.map((term, i) => (
                    <div key={i}
                      className={`flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10 transition-all duration-400 ${pilotInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: `${i * 70}ms` }}>
                      <svg className="w-4 h-4 text-[#E85D26] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <p className="font-body text-white/75 text-sm leading-snug">{term}</p>
                    </div>
                  ))}
                </div>
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
            <p className="font-body text-white/65 font-semibold text-xs tracking-widest uppercase mb-4">Ready to Partner?</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Start With a Free Consultation
            </h2>
            <p className="font-body text-white/75 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              No commitment. No upfront fees. Just a 30-minute call to see if Spark is the right fit for your organisation — and a free readiness assessment if it is.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#E85D26] text-sm font-bold font-body rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Book a Free Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <Link to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white text-sm font-bold font-body rounded-full border-2 border-white/40 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-200">
                Create an Account
              </Link>
            </div>
            <p className="font-body text-white/40 text-xs mt-6">No fees until a successful match · Free readiness diagnostic · Dedicated advisor assigned</p>
          </div>
        </div>
      </section>
    </div>
  );
}
