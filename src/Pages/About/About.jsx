import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuHandshake } from "react-icons/lu";
import { FaEarthAmericas, FaLightbulb } from 'react-icons/fa6';
import { GiCheckedShield, GiCycle } from 'react-icons/gi';
import { IoStatsChartSharp } from 'react-icons/io5';

/* ── tiny reusable hook ── */
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

/* ── page-hero shared banner ── */
function PageHero({ label, title, subtitle }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);
  return (
    <section className="relative bg-[#1a2744] pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#E85D26] opacity-[0.07] blur-[90px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#E85D26]" />
            <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">{label}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">{title}</h1>
          <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

/* ── value card ── */
function ValueCard({ emoji, title, desc, delay, inView }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl mb-4">{emoji}</div>
      <h3 className="font-display text-lg font-bold text-[#1a2744] mb-2">{title}</h3>
      <p className="font-body text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ── team card ── */
function TeamCard({ name, role, emoji, delay, inView }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-48 h-48 rounded-2xl bg-[#1a2744]/5 flex items-center justify-center text-3xl mx-auto mb-4">{emoji}</div>
      <p className="font-display font-bold text-[#1a2744] text-base mb-1">{name}</p>
      <p className="font-body text-gray-400 text-xs">{role}</p>
    </div>
  );
}

const VALUES = [
  { emoji: (<LuHandshake />), title: 'Genuine Matching',    desc: 'We take time to understand both sides — the trainees ambitions and the organizations culture — before making a single connection.' },
  { emoji: (<FaEarthAmericas />), title: 'Regional Impact',      desc: 'We believe talent should stay in the region. Our placements are designed for long-term retention and community growth in Päijät-Häme.' },
  { emoji: (<FaLightbulb />), title: 'Leadership First',     desc: 'Every traineeship includes personal leadership development. We build not just employees, but resilient, self-aware future leaders.' },
  { emoji: (<GiCheckedShield />), title: 'Trust & Transparency', desc: 'No hidden fees, no false promises. We operate with full transparency toward trainees, organizations, and our regional partners.' },
  { emoji: (<GiCycle />), title: 'Continuous Support',   desc: 'We dont disappear after placement. We monitor, support, and adjust throughout the entire traineeship to ensure success for both parties.' },
  { emoji: (<IoStatsChartSharp />), title: 'Data-Driven',          desc: 'We are building toward a fully data-driven regional intelligence system — so every decision is backed by real labour market evidence.' },
];

const TEAM = [
  { emoji: (<img className='rounded-lg' src="https://sparktraineeships.com/wp-content/uploads/2026/02/1769503160599-e1775636980715.jpeg" alt="" />), name: 'Founder & CEO',         role: 'Spark Traineeships Oy' },
  { emoji: (<img className='rounded-lg' src="https://sparktraineeships.com/wp-content/uploads/2026/04/1769503160599-e1775631270237.jpeg" alt="" />), name: 'Head of Partnerships',  role: 'Employer Relations' },
  { emoji: (<img className='rounded-lg' src="https://sparktraineeships.com/wp-content/uploads/2026/04/1769503160599-1-e1775631406300.jpeg" alt="" />), name: 'Leadership Coach',       role: 'Personal Development' },
  
];

const MILESTONES = [
  { year: '2019', text: 'Spark Traineeships Oy founded in Lahti, Finland with a vision to solve regional talent shortages.' },
  { year: '2020', text: 'First cohort of trainees placed with Päijät-Häme employers. Personal leadership program launched.' },
  { year: '2022', text: 'Expanded multilingual employer network. First foreign-language speakers placed in Finnish workplaces.' },
  { year: '2023', text: 'EOR partnership with Vonk launched, reducing employer administrative burden significantly.' },
  { year: '2024', text: 'Pilot program opened to new organisations. Regional intelligence dashboard development begins.' },
  { year: '2025+', text: 'Scaling across Finland — building the living labour-market platform that serves jobseekers, employers, and municipalities.' },
];

export default function About() {
  const [valuesRef, valuesInView]       = useInView();
  const [missionRef, missionInView]     = useInView();
  const [timelineRef, timelineInView]   = useInView();
  const [teamRef, teamInView]           = useInView();
  const [ctaRef, ctaInView]             = useInView();

  return (
    <div className="overflow-x-hidden">
      <PageHero
        label="About Spark"
        title="We Bridge Talent and Opportunity Across Finland"
        subtitle="A Finnish company on a mission to reduce friction, increase talent mobility, and create lasting economic value for the Päijät-Häme region and beyond."
      />

      {/* ── Mission ── */}
      <section className="py-16 sm:py-24 bg-white" ref={missionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* image placeholder */}
            <div className={`relative transition-all duration-700 ease-out ${missionInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center gap-2">
               
                <img className='object-fill' src="/mission.png" alt="" />
              </div>
              {/* accent badge */}
              <div className="absolute -bottom-5 -right-3 w-[80px] h-[80px] rounded-2xl bg-[#E85D26] flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <p className="font-display text-xl font-bold text-white leading-none">5+</p>
                  <p className="font-body text-white/70 text-[10px] mt-0.5">Years</p>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 bg-white rounded-xl px-3.5 py-2.5 shadow-lg border border-gray-100 flex items-center gap-2">
                <span className="text-base">🇫🇮</span>
                <span className="font-body text-xs font-semibold text-[#1a2744]">Finnish Company</span>
              </div>
            </div>

            {/* copy */}
            <div className={`transition-all duration-700 delay-200 ease-out ${missionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Our Mission</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] leading-tight mb-5">
                More Than a Traineeship Provider
              </h2>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                <strong className="text-[#1a2744]">Spark Traineeships Oy</strong> was founded with a single belief: that talented young professionals and forward-thinking organisations in non-metropolitan Finland deserve better connections.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                We specialise in long-term, paid traineeships combined with a <strong className="text-[#1a2744]">Personal Leadership Program</strong> — because we believe that lasting employment requires more than just matching skills to job descriptions.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Our model is designed to bring new energy to communities facing workforce challenges, while guiding employers to build inclusive, engaging workplaces that attract and retain the next generation of talent.
              </p>

              {/* stat pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { value: '1,284+', label: 'Open Roles' },
                  { value: '4 days', label: 'Avg. match time' },
                  { value: '44+',    label: 'Multilingual employers' },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <p className="font-display text-xl font-bold text-[#1a2744] leading-none">{s.value}</p>
                    <p className="font-body text-gray-400 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={valuesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">What We Stand For</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744]">Our Values</h2>
            <p className="font-body text-gray-500 text-base mt-3 max-w-xl mx-auto">
              Six principles that guide every decision we make — from a first conversation to a successful long-term placement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} {...v} delay={i * 80} inView={valuesInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 sm:py-24 bg-white" ref={timelineRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Our Journey</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744]">How We Got Here</h2>
          </div>
          <div className="relative">
            {/* vertical line — hidden on mobile, visible sm+ */}
            <div className="hidden sm:block absolute left-[88px] top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex gap-5 sm:gap-8 transition-all duration-500 ${timelineInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* year badge */}
                  <div className="flex-shrink-0 w-[72px] sm:w-[88px] flex flex-col items-end sm:items-center pt-1">
                    <span className={`font-display font-bold text-sm ${i === MILESTONES.length - 1 ? 'text-[#E85D26]' : 'text-[#1a2744]'}`}>
                      {m.year}
                    </span>
                    {/* dot on the line */}
                    <div className={`hidden sm:flex mt-1.5 w-3 h-3 rounded-full border-2 flex-shrink-0 ${i === MILESTONES.length - 1 ? 'border-[#E85D26] bg-[#E85D26]' : 'border-[#1a2744] bg-white'}`} />
                  </div>
                  {/* content */}
                  <div className="flex-1 bg-gray-50 rounded-2xl p-4 sm:p-5 border border-gray-100">
                    <p className="font-body text-gray-600 text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 sm:py-24 bg-gray-50" ref={teamRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${teamInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">The People</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">Meet the Team</h2>
            <p className="font-body text-gray-500 text-base max-w-lg mx-auto">
              A small, dedicated team combining expertise in HR, regional development, leadership coaching, and labour market intelligence.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-5">
            {TEAM.map((t, i) => (
              <TeamCard key={t.name} {...t} delay={i * 80} inView={teamInView} />
            ))}
          </div>
          <p className={`text-center font-body text-sm text-gray-400 mt-8 transition-all duration-700 delay-400 ${teamInView ? 'opacity-100' : 'opacity-0'}`}>
            Replace the placeholders above with real names, photos, and roles.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-[#1a2744] relative overflow-hidden" ref={ctaRef}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-4">Work With Us</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Ready to Make a Difference?
            </h2>
            <p className="font-body text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Whether you're a trainee looking for your next opportunity or an organisation ready to strengthen your team — Spark is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#E85D26] text-white text-sm font-semibold font-body rounded-full hover:bg-[#c44d1c] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                Get Started — It's Free
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white text-sm font-semibold font-body rounded-full border border-white/25 hover:bg-white/20 transition-all duration-200">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
