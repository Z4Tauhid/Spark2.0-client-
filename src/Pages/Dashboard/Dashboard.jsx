import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/* ── reusable stat card ── */
function StatCard({ label, value, icon, color, sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
      </div>
      <div className="min-w-0">
        <p className="font-display text-2xl font-bold text-[#1a2744] leading-none">{value}</p>
        <p className="font-body font-semibold text-[#1a2744] text-xs mt-1">{label}</p>
        {sub && <p className="font-body text-gray-400 text-[11px] mt-0.5 leading-tight">{sub}</p>}
      </div>
    </div>
  );
}

/* ── action card ── */
function ActionCard({ title, desc, to, icon, accent }) {
  return (
    <Link to={to}
      className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex gap-4 items-start">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-[#1a2744] text-sm mb-1">{title}</p>
        <p className="font-body text-gray-400 text-xs leading-relaxed">{desc}</p>
      </div>
      <svg className="w-4 h-4 text-gray-300 group-hover:text-[#E85D26] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

/* ── activity row ── */
function ActivityRow({ icon, text, time, color }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-gray-700 leading-snug">{text}</p>
        <p className="font-body text-xs text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

const TRAINEE_STATS = [
  { label: 'Applications Sent',  value: '3',   sub: '1 under review',        color: 'bg-blue-50 text-blue-500',    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/> },
  { label: 'Profile Completion', value: '70%', sub: 'Add skills to reach 100%', color: 'bg-orange-50 text-[#E85D26]', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/> },
  { label: 'Saved Roles',        value: '5',   sub: '2 closing soon',          color: 'bg-purple-50 text-purple-500', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/> },
  { label: 'Leadership Sessions', value: '0',  sub: 'Program starts on match', color: 'bg-green-50 text-green-500',  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/> },
];

const ORG_STATS = [
  { label: 'Active Listings',    value: '2',   sub: '14 total applicants',     color: 'bg-blue-50 text-blue-500',    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
  { label: 'Candidates in Review', value: '6', sub: '3 shortlisted',           color: 'bg-orange-50 text-[#E85D26]', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/> },
  { label: 'Placements Made',    value: '1',   sub: 'This quarter',             color: 'bg-green-50 text-green-500',  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/> },
  { label: 'Readiness Score',    value: '78',  sub: 'Out of 100',               color: 'bg-purple-50 text-purple-500', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/> },
];

const TRAINEE_ACTIONS = [
  { title: 'Browse Open Roles',       desc: 'See all 1,284+ open trainee positions in the region.',          to: '/for-trainees',        accent: 'bg-[#1a2744]', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
  { title: 'Complete Your Profile',   desc: 'A complete profile gets matched faster. Add skills and bio.',   to: '/dashboard',           accent: 'bg-[#E85D26]', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/> },
  { title: 'Leadership Program',      desc: 'Learn what the Personal Leadership Program includes.',           to: '/leadership-training', accent: 'bg-purple-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/> },
  { title: 'Contact Spark',           desc: 'Have questions? Our team responds within one business day.',    to: '/contact',             accent: 'bg-green-600',  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
];

const ORG_ACTIONS = [
  { title: 'Post a Traineeship',     desc: 'Add a new traineeship role to the Spark platform.',              to: '/for-organizations',   accent: 'bg-[#E85D26]', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/> },
  { title: 'View Candidates',        desc: 'Review profiles of trainees actively looking for placements.',   to: '/for-organizations',   accent: 'bg-[#1a2744]', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/> },
  { title: 'Readiness Diagnostic',   desc: 'See your talent readiness, inclusion, and onboarding scores.',   to: '/for-organizations',   accent: 'bg-purple-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/> },
  { title: 'Contact Your Advisor',   desc: 'Speak to your dedicated Spark account manager.',                 to: '/contact',             accent: 'bg-green-600',  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> },
];

const TRAINEE_ACTIVITY = [
  { text: 'You applied to "Junior Developer Traineeship" at TechCorp Oy', time: '2 hours ago', color: 'bg-blue-50 text-blue-500', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/> },
  { text: 'Spark reviewed your profile — looking good!', time: 'Yesterday', color: 'bg-green-50 text-green-500', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/> },
  { text: '2 new roles matching your profile were posted', time: '3 days ago', color: 'bg-orange-50 text-[#E85D26]', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/> },
  { text: 'Welcome to Spark Traineeships! Complete your profile to get matched faster.', time: '1 week ago', color: 'bg-purple-50 text-purple-500', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/> },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isOrg = user?.role === 'organization';
  const isAdmin = user?.role === 'admin';

  const stats   = isOrg ? ORG_STATS    : TRAINEE_STATS;
  const actions = isOrg ? ORG_ACTIONS  : TRAINEE_ACTIONS;

  const handleLogout = () => { logout(); navigate('/'); };

  /* profile completion bar width */
  const completion = isOrg ? 65 : 70;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top banner ── */}
      <div className="bg-[#1a2744] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 inset-x-0 h-[3px] bg-[#E85D26]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-body text-white/70 text-[11px] font-semibold tracking-widest uppercase">
                  {isOrg ? 'Organization Dashboard' : isAdmin ? 'Admin Dashboard' : 'Trainee Dashboard'}
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="font-body text-white/55 text-sm mt-1">
                {isOrg
                  ? 'Manage your listings, review candidates, and track placements.'
                  : 'Track your applications, explore roles, and build your profile.'}
              </p>
            </div>
            <button onClick={handleLogout}
              className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white text-xs font-semibold font-body rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Middle: Profile + Actions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-5">Your Profile</p>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#1a2744] flex items-center justify-center flex-shrink-0">
                <span className="font-display text-xl font-bold text-white">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-[#1a2744] text-base leading-tight truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="font-body text-gray-400 text-xs mt-0.5 capitalize">{user?.role}</p>
                <p className="font-body text-gray-400 text-xs truncate">{user?.email}</p>
              </div>
            </div>

            {/* Completion bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-xs font-semibold text-[#1a2744]">Profile completion</span>
                <span className="font-body text-xs font-bold text-[#E85D26]">{completion}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#E85D26] rounded-full transition-all duration-1000"
                  style={{ width: `${completion}%` }} />
              </div>
              <p className="font-body text-gray-400 text-xs mt-2">
                {completion < 100 ? 'Add more details to improve your match rate.' : 'Profile complete!'}
              </p>
            </div>

            {/* Profile fields preview */}
            <div className="space-y-2.5 flex-1">
              {[
                { label: 'Name',     value: `${user?.firstName} ${user?.lastName}`, done: true },
                { label: 'Email',    value: user?.email,                             done: true },
                { label: 'Skills',   value: isOrg ? 'Industry & size' : 'Add Skills',              done: false },
                { label: 'Bio',      value: 'Add a short bio',                       done: false },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="font-body text-xs text-gray-400 flex-shrink-0">{f.label}</span>
                  <span className={`font-body text-xs font-medium truncate ${f.done ? 'text-[#1a2744]' : 'text-gray-300 italic'}`}>
                    {f.done ? f.value : f.value}
                  </span>
                  {f.done
                    ? <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    : <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                  }
                </div>
              ))}
            </div>

            <button className="mt-5 w-full py-2.5 border-2 border-[#1a2744] text-[#1a2744] font-body text-xs font-semibold rounded-full hover:bg-[#1a2744] hover:text-white transition-all duration-200">
              Edit Profile
            </button>
          </div>

          {/* Quick actions (2/3) */}
          <div className="lg:col-span-2">
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-4">Quick Actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {actions.map(a => <ActionCard key={a.title} {...a} />)}
            </div>
          </div>
        </div>

        {/* ── Bottom: Activity + Platform preview ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-5">Recent Activity</p>
            <div className="divide-y divide-gray-50">
              {TRAINEE_ACTIVITY.map((a, i) => <ActivityRow key={i} {...a} />)}
            </div>
          </div>

          {/* Intelligence platform teaser */}
          <div className="bg-[#1a2744] rounded-2xl p-6 relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative flex-1 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-[#E85D26]/20 border border-[#E85D26]/30 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#E85D26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <p className="font-body text-[#E85D26] font-semibold text-xs tracking-widest uppercase mb-3">Coming Soon</p>
              <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight">
                Regional Intelligence Dashboard
              </h3>
              <p className="font-body text-white/55 text-sm leading-relaxed mb-5 flex-1">
                Live heatmaps, job counters, skills gap indicators, cost calculators, and the talent mobility flow — all in one place.
              </p>
              <div className="space-y-2">
                {['Labour market heatmaps', 'Real-time job counters', 'Career diagnostic tool', 'Regional impact tracker'].map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D26] flex-shrink-0" />
                    <span className="font-body text-xs text-white/50">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E85D26] animate-pulse" />
                  <span className="font-body text-xs text-white/35">In development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
