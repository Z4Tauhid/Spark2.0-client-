import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCalendar, FiClock, FiTag, FiArrowRight,
  FiSearch, FiChevronRight,
  FiBookOpen, FiTrendingUp, FiUsers, FiMapPin,
  FiRss, FiMail, FiCheckCircle
} from 'react-icons/fi';
import {
  HiOutlineSpeakerphone,
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineGlobe
} from 'react-icons/hi';

/* ─────────────────────────── helpers ─────────────────────────── */
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

/* ─────────────────────────── page hero ─────────────────────────── */
function PageHero({ label, title, subtitle }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-[#1a2744] pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }}
      />
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

/* ─────────────────────────── data ─────────────────────────── */
const CATEGORIES = [
  { id: 'all',           label: 'All',              Icon: FiBookOpen },
  { id: 'announcement',  label: 'Announcements',    Icon: HiOutlineSpeakerphone },
  { id: 'insight',       label: 'Insights',         Icon: HiOutlineLightBulb },
  { id: 'market',        label: 'Labour Market',    Icon: HiOutlineChartBar },
  { id: 'regional',      label: 'Regional',         Icon: HiOutlineGlobe },
];

const ARTICLES = [
  {
    id: 1,
    category: 'announcement',
    categoryLabel: 'Announcement',
    featured: true,
    title: 'Spark Traineeships Launches New Pilot Program for Päijät-Häme Employers',
    excerpt: 'We are opening our expanded pilot program to a new cohort of organisations in the region. The program offers full placement support, EOR services through Vonk, and access to our growing pool of pre-screened young professionals — at zero administrative risk.',
    date: 'June 2, 2025',
    readTime: '4 min read',
    tag: 'Pilot Program',
    tagColor: 'bg-[#E85D26]/10 text-[#E85D26]',
  },
  {
    id: 2,
    category: 'market',
    categoryLabel: 'Labour Market',
    featured: false,
    title: 'Päijät-Häme Labour Market Report: 1,284 Open Roles and Growing',
    excerpt: 'Our latest data pull from DuuniExpo.fi and Työmarkkina.fi shows a 12% increase in open roles across Päijät-Häme compared to the same period last year. Demand is highest in technology, healthcare, and logistics — sectors where multilingual candidates have a clear advantage.',
    date: 'May 20, 2025',
    readTime: '6 min read',
    tag: 'Labour Market',
    tagColor: 'bg-blue-50 text-blue-600',
  },
  {
    id: 3,
    category: 'insight',
    categoryLabel: 'Insight',
    featured: false,
    title: 'Why Long-Term Traineeships Outperform Traditional Internships for Retention',
    excerpt: 'Data from our completed placements shows that trainees who complete a 12–24 month structured traineeship are 3x more likely to remain with the employer beyond the initial contract. We break down the reasons why — and what organisations can do to maximise retention.',
    date: 'May 8, 2025',
    readTime: '7 min read',
    tag: 'Insight',
    tagColor: 'bg-purple-50 text-purple-600',
  },
  {
    id: 4,
    category: 'regional',
    categoryLabel: 'Regional',
    featured: false,
    title: 'Spark Partners with Lahti Municipality to Address Skilled Workforce Shortages',
    excerpt: 'Spark Traineeships Oy has formalised a partnership with Lahti Municipality to support regional workforce development initiatives. The collaboration will expand access to traineeship opportunities for international talent and support employers with onboarding guidance.',
    date: 'April 25, 2025',
    readTime: '3 min read',
    tag: 'Regional',
    tagColor: 'bg-green-50 text-green-600',
  },
  {
    id: 5,
    category: 'insight',
    categoryLabel: 'Insight',
    featured: false,
    title: 'The Personal Leadership Program: What It Is and Why It Matters',
    excerpt: 'Every trainee placed through Spark participates in our Personal Leadership Program — a series of one-on-one coaching sessions built around self-awareness, resilience, and Finnish work culture readiness. Here is what participants say about the experience.',
    date: 'April 12, 2025',
    readTime: '5 min read',
    tag: 'Leadership',
    tagColor: 'bg-purple-50 text-purple-600',
  },
  {
    id: 6,
    category: 'market',
    categoryLabel: 'Labour Market',
    featured: false,
    title: '44 Employers in Päijät-Häme Now Actively Hiring Foreign-Language Speakers',
    excerpt: 'The number of region-based employers willing and equipped to hire non-Finnish speakers has grown by 28% over the past 18 months. We outline which sectors are leading the shift and what this means for international candidates looking for opportunities in Finland.',
    date: 'March 30, 2025',
    readTime: '5 min read',
    tag: 'Labour Market',
    tagColor: 'bg-blue-50 text-blue-600',
  },
  {
    id: 7,
    category: 'announcement',
    categoryLabel: 'Announcement',
    featured: false,
    title: 'Spark Traineeships and Vonk EOR: A Partnership That Removes Employer Risk',
    excerpt: 'We are excited to deepen our partnership with Vonk, Europe\'s leading Employer of Record provider. Through this collaboration, organisations that partner with Spark can now place trainees with zero administrative burden — Vonk handles contracts, payroll, and compliance.',
    date: 'March 15, 2025',
    readTime: '4 min read',
    tag: 'Partnership',
    tagColor: 'bg-[#E85D26]/10 text-[#E85D26]',
  },
  {
    id: 8,
    category: 'regional',
    categoryLabel: 'Regional',
    featured: false,
    title: 'Regional Collaboration Map: Spark\'s Growing Network of Partners',
    excerpt: 'From municipalities and educational institutions to NGOs and EOR partners — Spark\'s network has expanded significantly in the past year. We share an updated overview of who we work with and how each partnership strengthens the regional talent ecosystem.',
    date: 'March 2, 2025',
    readTime: '4 min read',
    tag: 'Regional',
    tagColor: 'bg-green-50 text-green-600',
  },
];

const STATS = [
  { value: '8',    label: 'Articles Published',   Icon: FiBookOpen },
  { value: '4',    label: 'Categories',            Icon: FiTag },
  { value: '1,284+', label: 'Open Roles Tracked', Icon: FiTrendingUp },
  { value: '14',   label: 'Municipalities Covered',Icon: FiMapPin },
];

/* ─────────────────────────── sub-components ─────────────────────────── */

/** Featured (large) article card */
function FeaturedCard({ article, inView }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {/* image placeholder */}
      <div className="aspect-[16/7] bg-gradient-to-br from-[#1a2744] to-[#243358] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="news.png" alt="" />
        </div>
        {/* featured pill */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-[#E85D26] text-white text-[10px] font-bold font-body px-3 py-1.5 rounded-full uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Featured
        </div>
      </div>
      <div className="p-6 sm:p-8">
        {/* meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold font-body px-2.5 py-1 rounded-full ${article.tagColor}`}>
            <FiTag className="w-3 h-3" />
            {article.tag}
          </span>
          <span className="flex items-center gap-1.5 font-body text-xs text-gray-400">
            <FiCalendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5 font-body text-xs text-gray-400">
            <FiClock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1a2744] leading-tight mb-3">
          {article.title}
        </h2>
        <p className="font-body text-gray-500 text-sm leading-relaxed mb-6">
          {article.excerpt}
        </p>
        <Link
          to={`/news/${article.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold font-body text-[#E85D26] hover:gap-3 transition-all duration-200"
        >
          Read article <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/** Regular article card */
function ArticleCard({ article, delay, inView }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* image placeholder */}
      <div className="aspect-[16/8] bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center overflow-hidden">
        <img src="news1.png" alt="" />
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold font-body px-2.5 py-1 rounded-full ${article.tagColor}`}>
          {article.categoryLabel}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* meta row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1.5 font-body text-xs text-gray-400">
            <FiCalendar className="w-3 h-3 flex-shrink-0" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5 font-body text-xs text-gray-400">
            <FiClock className="w-3 h-3 flex-shrink-0" />
            {article.readTime}
          </span>
        </div>

        <h3 className="font-display font-bold text-[#1a2744] text-base leading-snug mb-3 flex-1">
          {article.title}
        </h3>

        <p className="font-body text-gray-500 text-xs leading-relaxed mb-5 line-clamp-3">
          {article.excerpt}
        </p>

        <Link
          to={`/news/${article.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold font-body text-[#E85D26] hover:gap-2.5 transition-all duration-200 mt-auto"
        >
          Read more <FiChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────── newsletter ─────────────────────────── */
function NewsletterSection() {
  const [ref, inView] = useInView();
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1000));
    setStatus('done');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#1a2744] relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-14 h-14 rounded-2xl bg-[#E85D26]/15 border border-[#E85D26]/30 flex items-center justify-center mx-auto mb-6">
            <FiRss className="w-7 h-7 text-[#E85D26]" />
          </div>
          <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Stay Informed</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Get the Latest from Spark
          </h2>
          <p className="font-body text-white/55 text-base leading-relaxed mb-8">
            Labour market insights, regional updates, new opportunities and program news — delivered straight to your inbox. No spam, unsubscribe any time.
          </p>

          {status === 'done' ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-5 flex items-center justify-center gap-3">
              <FiCheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <p className="font-body text-white font-semibold text-sm">You're subscribed! Welcome to the Spark community.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white font-body text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E85D26]/40"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-6 py-3.5 bg-[#E85D26] text-white font-semibold font-body text-sm rounded-full hover:bg-[#c44d1c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 whitespace-nowrap flex items-center justify-center gap-2"
              >
                {status === 'sending'
                  ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Subscribing...</>
                  : <>Subscribe <FiArrowRight className="w-4 h-4" /></>
                }
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── main page ─────────────────────────── */
export default function News() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');

  
  const [statsRef,   statsInView]   = useInView();
  const [gridRef,    gridInView]    = useInView();

  /* filter articles */
  const filtered = ARTICLES.filter(a => {
    const matchCat   = activeCategory === 'all' || a.category === activeCategory;
    const matchSearch = searchQuery.trim() === ''
      || a.title.toLowerCase().includes(searchQuery.toLowerCase())
      || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured   = filtered.find(a => a.featured);
  const rest        = filtered.filter(a => !a.featured);

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <PageHero
        label="News & Insights"
        title="Stories, Data, and Ideas from Spark"
        subtitle="Labour market intelligence, regional updates, program news, and insights on the future of talent mobility in Päijät-Häme."
      />

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-gray-100 py-8" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-3 transition-all duration-500 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a2744]/5 flex items-center justify-center flex-shrink-0">
                  <s.Icon className="w-5 h-5 text-[#1a2744]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#1a2744] text-xl leading-none">{s.value}</p>
                  <p className="font-body text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="bg-gray-50 border-b border-gray-100 py-5 sticky top-[70px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

            {/* Category pills — horizontal scroll on mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold font-body whitespace-nowrap transition-all duration-200 flex-shrink-0
                    ${activeCategory === cat.id
                      ? 'bg-[#1a2744] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a2744]/30 hover:text-[#1a2744]'
                    }`}
                >
                  <cat.Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full sm:w-56 pl-9 pr-4 py-2.5 rounded-full border border-gray-200 bg-white font-body text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E85D26]/25 focus:border-[#E85D26] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="py-12 sm:py-16 bg-gray-50" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {filtered.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1a2744] mb-2">No articles found</h3>
              <p className="font-body text-gray-400 text-sm mb-6">Try a different search term or category.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a2744] text-white text-sm font-semibold font-body rounded-full hover:bg-[#243358] transition-all duration-200"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-10">

              {/* Featured article */}
              {featured && (
                <div className={`transition-all duration-700 ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <FeaturedCard article={featured} inView={gridInView} />
                </div>
              )}

              {/* Regular grid */}
              {rest.length > 0 && (
                <>
                  {/* section divider label */}
                  {featured && (
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="font-body text-xs text-gray-400 uppercase tracking-widest font-semibold whitespace-nowrap">More Articles</span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((article, i) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        delay={i * 70}
                        inView={gridInView}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Results count */}
              <div className="text-center pt-4">
                <p className="font-body text-gray-400 text-xs">
                  Showing {filtered.length} of {ARTICLES.length} articles
                  {activeCategory !== 'all' && ` in "${CATEGORIES.find(c => c.id === activeCategory)?.label}"`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Topics grid ── */}
      <TopicsSection />

      {/* ── Newsletter ── */}
      <NewsletterSection />

    </div>
  );
}

/* ─────────────────────────── topics section ─────────────────────────── */
function TopicsSection() {
  const [ref, inView] = useInView();

  const topics = [
    {
      Icon: HiOutlineChartBar,
      title: 'Labour Market Intelligence',
      desc: 'Data-driven reports on job availability, skills gaps, and hiring trends across Päijät-Häme — updated regularly.',
      accent: 'bg-blue-50 text-blue-600',
    },
    {
      Icon: FiUsers,
      title: 'Trainee Success Stories',
      desc: 'Real stories from young professionals who found their path through Spark — in their own words.',
      accent: 'bg-[#E85D26]/10 text-[#E85D26]',
    },
    {
      Icon: HiOutlineGlobe,
      title: 'Regional Development',
      desc: 'Updates on Spark\'s partnerships with municipalities, educational institutions, and regional stakeholders.',
      accent: 'bg-green-50 text-green-600',
    },
    {
      Icon: HiOutlineLightBulb,
      title: 'Leadership & Coaching',
      desc: 'Insights from our Personal Leadership Program — self-awareness, resilience, and Finnish work culture.',
      accent: 'bg-purple-50 text-purple-600',
    },
    {
      Icon: HiOutlineSpeakerphone,
      title: 'Program Announcements',
      desc: 'News about new pilots, partnerships, and platform features as Spark continues to grow.',
      accent: 'bg-[#1a2744]/8 text-[#1a2744]',
    },
    {
      Icon: FiTrendingUp,
      title: 'Platform Roadmap',
      desc: 'Previews of the upcoming regional intelligence dashboard — heatmaps, diagnostics, and impact tracking.',
      accent: 'bg-orange-50 text-orange-500',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">What We Cover</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2744] mb-3">Topics We Write About</h2>
          <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
            From raw labour market data to human success stories — Spark's newsroom covers the full picture of talent mobility in the region.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((t, i) => (
            <div
              key={t.title}
              className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${t.accent}`}>
                <t.Icon className="w-5 h-5" />
              </div>
              <h3 className="font-body font-bold text-[#1a2744] text-sm mb-2">{t.title}</h3>
              <p className="font-body text-gray-500 text-xs leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
