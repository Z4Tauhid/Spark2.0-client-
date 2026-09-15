import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaIndustry,
  FaLaptopCode,
  FaHospital,
  FaLeaf,
  FaUniversity,
  FaGraduationCap,
  FaShoppingCart,
} from 'react-icons/fa';
import { MdOutlineEngineering } from 'react-icons/md';
import {
  FiChevronDown,
  FiArrowRight,
  FiArrowLeft,
  FiUsers,
  FiPercent,
  FiUserX,
  FiDollarSign,
  FiTrendingDown,
  FiMessageCircle,
  FiEyeOff,
} from 'react-icons/fi';

/* ─── data ─── */
const SECTORS = [
  { label: 'Manufacturing & Logistics', salary: 42000, Icon: FaIndustry },
  { label: 'Tech & Digital', salary: 58000, Icon: FaLaptopCode },
  { label: 'Healthcare & Social Services', salary: 38000, Icon: FaHospital },
  { label: 'Agriculture & Green Transition', salary: 34000, Icon: FaLeaf },
  { label: 'Construction & Engineering', salary: 44000, Icon: MdOutlineEngineering },
  { label: 'Public Sector & Municipalities', salary: 40000, Icon: FaUniversity },
  { label: 'Education & Research', salary: 41000, Icon: FaGraduationCap },
  { label: 'Retail & Customer Service', salary: 32000, Icon: FaShoppingCart },
];

const REPLACEMENT_MULTIPLIER = 1.5;
const MAX_SLIDER_EMPLOYEES = 10000;

const STEPS = [
  { key: 'scale', title: 'Organizational Scale' },
  { key: 'sector', title: 'Operating Sector' },
  { key: 'attrition', title: 'Annual Attrition Rate (%)' },
  { key: 'result', title: 'Missed Profits' },
  { key: 'breakdown', title: "What's Behind the Number?" },
];

const NEXT_LABELS = ['Next', 'Next', 'See My Result', 'See the Breakdown'];

/* ─── helpers ─── */
function employeesFromRaw(raw) {
  const n = (raw / 100) ** 2 * MAX_SLIDER_EMPLOYEES;
  if (n < 100) return Math.max(0, Math.round(n / 5) * 5);
  if (n < 1000) return Math.round(n / 25) * 25;
  return Math.round(n / 100) * 100;
}

function rawFromEmployees(employees) {
  return Math.round(Math.sqrt(employees / MAX_SLIDER_EMPLOYEES) * 100);
}

function calcResult({ employees, sectorSalary, attritionRate }) {
  const annualDepartures = employees * (attritionRate / 100);
  const costPerDeparture = sectorSalary * REPLACEMENT_MULTIPLIER;
  const totalAnnualCost = annualDepartures * costPerDeparture;
  const gaugePercent = Math.min(100, attritionRate * REPLACEMENT_MULTIPLIER);
  return { annualDepartures, costPerDeparture, totalAnnualCost, gaugePercent };
}

const eur = (n) => `€${Math.round(n).toLocaleString()}`;

const DISCLAIMER =
  "Estimates based on Finnish labour-market salary averages and commonly cited turnover-cost benchmarks (0.5–2× annual salary per departure; this calculator uses 1.5× as a conservative mid-point). Actual costs vary by role, seniority and market conditions.";

/* ─── shared hook ─── */
function useInView(threshold = 0.1) {
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

/* ─── hero ─── */
function RiskCalcHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className="relative bg-[#1c244b] pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#ff8000] opacity-[0.07] blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full bg-blue-500 opacity-[0.05] blur-[80px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#ff8000]" />

      <div className={`relative container-spark text-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#ff8000] animate-pulse" />
          <span className="font-body text-white/80 text-[11px] font-semibold tracking-widest uppercase">Risk Calculator</span>
        </div>
        <h1 className="font-body text-3xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl mx-auto">
          What Is Turnover Really <span className="text-[#ff8000]">Costing You?</span>
        </h1>
        <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Answer three quick questions and see how much attrition is quietly eating into your organization's profits.
        </p>
      </div>
    </section>
  );
}

/* ─── progress bar ─── */
function ProgressBar({ stepIndex, totalSteps }) {
  return (
    <div className="mb-8">
      <div className="flex gap-1.5 mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= stepIndex ? 'bg-[#ff8000]' : 'bg-white/15'}`} />
        ))}
      </div>
      <p className="font-body text-white/40 text-[11px] font-semibold uppercase tracking-widest">
        Step {stepIndex + 1} of {totalSteps}
      </p>
    </div>
  );
}

/* ─── gauge ─── */
function Gauge({ percent, size = 'md' }) {
  const height = size === 'lg' ? 'h-4' : 'h-2.5';
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div>
      <div className={`w-full ${height} bg-white/10 rounded-full overflow-hidden`}>
        <div className="h-full bg-[#ff8000] rounded-full transition-all duration-1000" style={{ width: `${clamped}%` }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-body text-[10px] text-white/30">0</span>
        <span className="font-body text-[10px] text-white/30">100</span>
      </div>
    </div>
  );
}

/* ─── wizard shell ─── */
function WizardShell({ stepIndex, totalSteps, title, onBack, onNext, nextLabel, showBack, rightSlot, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-10">
      <ProgressBar stepIndex={stepIndex} totalSteps={totalSteps} />
      <p className="font-body text-[#ff8000] text-xs font-semibold tracking-widest uppercase mb-2">Risk Calculation</p>
      <h2 className="font-body text-2xl sm:text-3xl font-bold text-white mb-6">{title}</h2>

      <div className="mb-8">{children}</div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-white/10">
        {showBack ? (
          <button onClick={onBack} className="btn-outline-white">
            <FiArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <span />}
        <div className="flex items-center gap-3 ml-auto">
          {rightSlot || (
            <button onClick={onNext} className="btn-primary">
              {nextLabel || 'Next'} <FiArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── step 1: organizational scale ─── */
function EmployeeScaleStep({ rawSlider, setRawSlider, employees }) {
  const display = employees >= MAX_SLIDER_EMPLOYEES ? '10,000+' : employees.toLocaleString();
  return (
    <div>
      <p className="font-body text-white/60 text-sm mb-6">How many people work at your organization?</p>
      <div className="flex items-baseline gap-2 mb-4">
        <FiUsers className="w-6 h-6 text-[#ff8000]" />
        <span className="font-body text-3xl sm:text-4xl font-bold text-white">{display}</span>
        <span className="font-body text-sm text-white/50">employees</span>
      </div>
      <input
        type="range" min={0} max={100} value={rawSlider}
        onChange={e => setRawSlider(Number(e.target.value))}
        className="range-slider w-full h-2 appearance-none rounded-full outline-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #ff8000 ${rawSlider}%, rgba(255,255,255,0.15) ${rawSlider}%)` }}
      />
      <div className="flex justify-between mt-1">
        <span className="font-body text-xs text-white/40">0</span>
        <span className="font-body text-xs text-white/40">10,000+</span>
      </div>
    </div>
  );
}

/* ─── step 2: operating sector ─── */
function SectorStep({ sector, setSector }) {
  const active = SECTORS.find(s => s.label === sector);
  return (
    <div>
      <p className="font-body text-white/60 text-sm mb-6">Which sector best describes your organization?</p>
      <div className="relative mb-4">
        <select
          value={sector}
          onChange={e => setSector(e.target.value)}
          className="w-full bg-[#111b33] text-white border border-white/20 rounded-xl px-4 py-3.5 font-body text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff8000] focus:border-[#ff8000]"
        >
          {SECTORS.map(s => (
            <option key={s.label} value={s.label} className="bg-[#111b33] text-white">{s.label}</option>
          ))}
        </select>
        <FiChevronDown className="w-4 h-4 text-white/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {active && (
        <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
          <active.Icon className="w-5 h-5 text-[#ff8000] flex-shrink-0" />
          <span className="font-body text-sm text-white/80">{active.label}</span>
        </div>
      )}
    </div>
  );
}

/* ─── step 3: annual attrition rate ─── */
function AttritionStep({ attritionRate, setAttritionRate }) {
  return (
    <div>
      <p className="font-body text-white/60 text-sm mb-6">What percentage of your workforce leaves each year?</p>
      <div className="flex items-baseline gap-2 mb-4">
        <FiPercent className="w-6 h-6 text-[#ff8000]" />
        <span className="font-body text-3xl sm:text-4xl font-bold text-white">{attritionRate}%</span>
      </div>
      <input
        type="range" min={0} max={100} value={attritionRate}
        onChange={e => setAttritionRate(Number(e.target.value))}
        className="range-slider w-full h-2 appearance-none rounded-full outline-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #ff8000 ${attritionRate}%, rgba(255,255,255,0.15) ${attritionRate}%)` }}
      />
      <div className="flex justify-between mt-1">
        <span className="font-body text-xs text-white/40">0%</span>
        <span className="font-body text-xs text-white/40">100%</span>
      </div>
    </div>
  );
}

/* ─── step 4: missed profits (result) ─── */
function ResultStep({ result }) {
  return (
    <div>
      <p className="font-body text-white/60 text-sm mb-2">Estimated annual missed profit from attrition</p>
      <p className="font-body text-4xl sm:text-5xl font-bold text-[#ff8000] mb-6">{eur(result.totalAnnualCost)}</p>
      <Gauge percent={result.gaugePercent} size="lg" />
      <p className="font-body text-white/50 text-xs mt-3">
        ≈{Math.round(result.gaugePercent)}% of total payroll value lost to turnover-driven replacement costs annually.
      </p>
      <p className="font-body text-white/30 text-[11px] leading-relaxed mt-6 pt-4 border-t border-white/10">{DISCLAIMER}</p>
    </div>
  );
}

/* ─── step 5: what's behind the number (breakdown) ─── */
function BreakdownRow({ icon: Icon, label, value, percent }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-body text-sm font-semibold text-white flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#ff8000]" /> {label}
        </span>
        <span className="font-body text-sm font-bold text-white">{value}</span>
      </div>
      <Gauge percent={percent} />
    </div>
  );
}

function BreakdownStep({ result, attritionRate }) {
  return (
    <div>
      <p className="font-body text-white/60 text-sm mb-6">Here's how we get to that number, based on what you told us.</p>
      <div className="space-y-6">
        <BreakdownRow icon={FiUserX} label="Employees lost per year" value={Math.round(result.annualDepartures)} percent={attritionRate} />
        <BreakdownRow icon={FiDollarSign} label="Average cost per departure" value={eur(result.costPerDeparture)} percent={75} />
        <BreakdownRow icon={FiTrendingDown} label="Share of payroll at risk" value={`${Math.round(result.gaugePercent)}%`} percent={result.gaugePercent} />
      </div>
      <p className="font-body text-white/30 text-[11px] leading-relaxed mt-6 pt-4 border-t border-white/10">{DISCLAIMER}</p>
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="font-body text-white font-bold text-base mb-1">Ready to stop the bleeding?</p>
        <p className="font-body text-white/50 text-xs">Spark's traineeship model reduces time-to-fill and strengthens onboarding — helping you reclaim value like this.</p>
      </div>
    </div>
  );
}

/* ─── final CTA buttons (replaces the Next button on the last step) ─── */
function FinalCTAButtons({ onRecalculate }) {
  return (
    <>
      <button onClick={onRecalculate} className="btn-outline-white">Recalculate</button>
      <Link to="/contact" className="btn-primary">
        Talk to Spark About This <FiArrowRight className="w-4 h-4" />
      </Link>
    </>
  );
}

/* ─── footer teaser: other Spark calculators ─── */
const TEASER_CARDS = [
  { Icon: FiUsers, title: 'Groupthink Cost Index', desc: 'See how much unchallenged consensus is quietly costing your decision-making.' },
  { Icon: FiMessageCircle, title: 'The Ghost-Client Multiplier', desc: 'Estimate the revenue at risk from client relationships nobody truly owns.' },
  { Icon: FiEyeOff, title: 'Cost of Unheard Ideas', desc: 'Put a number on the ideas your team never feels safe enough to raise.' },
];

function SparkCalculatorsTeaser() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="py-16 sm:py-24 bg-gray-50" ref={ref}>
      <div className="container-spark">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-body text-[#ff8000] font-semibold text-xs tracking-widest uppercase mb-3">More Tools</p>
          <h2 className="font-body text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">Spark Calculators</h2>
          <p className="font-body text-gray-500 text-base max-w-lg mx-auto">
            Know your numbers. Spark helps you reclaim your missed profits.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEASER_CARDS.map((c, i) => (
            <div
              key={c.title}
              className={`bg-[#1c244b] rounded-2xl p-6 border border-white/10 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <c.Icon className="w-5 h-5 text-[#ff8000]" />
              </div>
              <h3 className="font-body text-base font-bold text-white mb-2">{c.title}</h3>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-5">{c.desc}</p>
              <button
                disabled
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white/50 text-sm font-semibold font-body rounded-full cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── page ─── */
export default function RoiCal() {
  const [step, setStep] = useState(0);
  const [rawSlider, setRawSlider] = useState(rawFromEmployees(330));
  const [sector, setSector] = useState('Tech & Digital');
  const [attritionRate, setAttritionRate] = useState(14);

  const employees = useMemo(() => employeesFromRaw(rawSlider), [rawSlider]);
  const sectorSalary = useMemo(
    () => SECTORS.find(s => s.label === sector)?.salary ?? SECTORS[1].salary,
    [sector]
  );
  const result = useMemo(
    () => calcResult({ employees, sectorSalary, attritionRate }),
    [employees, sectorSalary, attritionRate]
  );

  const goNext = () => setStep(s => Math.min(STEPS.length - 1, s + 1));
  const goBack = () => setStep(s => Math.max(0, s - 1));
  const reset = () => setStep(0);

  let stepBody;
  let rightSlot = null;

  switch (STEPS[step].key) {
    case 'scale':
      stepBody = <EmployeeScaleStep rawSlider={rawSlider} setRawSlider={setRawSlider} employees={employees} />;
      break;
    case 'sector':
      stepBody = <SectorStep sector={sector} setSector={setSector} />;
      break;
    case 'attrition':
      stepBody = <AttritionStep attritionRate={attritionRate} setAttritionRate={setAttritionRate} />;
      break;
    case 'result':
      stepBody = <ResultStep result={result} />;
      break;
    case 'breakdown':
      stepBody = <BreakdownStep result={result} attritionRate={attritionRate} />;
      rightSlot = <FinalCTAButtons onRecalculate={reset} />;
      break;
    default:
      stepBody = null;
  }

  return (
    <>
      <RiskCalcHero />

      <section className="bg-[#1c244b] pb-20 sm:pb-28">
        <div className="container-spark max-w-2xl">
          <WizardShell
            stepIndex={step}
            totalSteps={STEPS.length}
            title={STEPS[step].title}
            onBack={goBack}
            onNext={goNext}
            nextLabel={NEXT_LABELS[step]}
            showBack={step > 0}
            rightSlot={rightSlot}
          >
            {stepBody}
          </WizardShell>
        </div>
      </section>

      <SparkCalculatorsTeaser />
    </>
  );
}
