import { useState } from 'react';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import { useTraineeDashboard } from '../TraineeDashboardContext';
import { AXES, averageVector } from '../data/axes';
import { computeMatchPct } from '../utils/match';
import RadarChart from '../components/RadarChart';
import MatchScoreRing from '../components/MatchScoreRing';
import AxisBar from '../components/AxisBar';
import RangeSliderRow from '../components/RangeSliderRow';

function defaultAxesState(vector) {
  const obj = {};
  AXES.forEach(a => { obj[a.key] = vector?.[a.key] ?? 50; });
  return obj;
}

function Card({ children, className = '' }) {
  return <div className={`bg-[#131319] border border-white/8 rounded-2xl p-5 ${className}`}>{children}</div>;
}

function ProfileCard({ user }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#ff8000] flex items-center justify-center text-white font-body font-bold text-xl mb-3">
        {user?.firstName?.[0]}{user?.lastName?.[0]}
      </div>
      <p className="font-body font-bold text-white text-base">{user?.firstName} {user?.lastName}</p>
      <p className="font-body text-white/40 text-xs mt-0.5">Trainee</p>
    </Card>
  );
}

function ScoreCard({ score }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-3">Overall Match Score</p>
      <MatchScoreRing score={score} size={120} strokeWidth={10} />
    </Card>
  );
}

function StatusCard() {
  return (
    <Card>
      <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-3">Status</p>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="font-body text-sm font-semibold text-green-400">Available</span>
      </div>
      <p className="font-body text-white/40 text-xs">Ready to start within 2 weeks</p>
    </Card>
  );
}

function LanguagesCard({ languages }) {
  return (
    <Card>
      <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-3">Languages</p>
      {languages?.length ? (
        <div className="flex flex-wrap gap-2">
          {languages.map(l => (
            <span key={l} className="font-body text-xs text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1">{l}</span>
          ))}
        </div>
      ) : (
        <p className="font-body text-white/35 text-xs leading-relaxed">Add your spoken languages in your profile to show them here.</p>
      )}
    </Card>
  );
}

const RECENT_PROGRESS = [
  { label: 'Dutch B2 verified', time: '3 days ago', delta: '+8', color: '#10b981' },
  { label: 'SQL Advanced certificate', time: '2 weeks ago', delta: '+5', color: '#06b6d4' },
  { label: 'Project leadership recognised', time: '1 month ago', delta: '+4', color: '#8b5cf6' },
];

function RecentProgressCard() {
  return (
    <Card>
      <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">Recent Progress</p>
      <div className="space-y-3.5">
        {RECENT_PROGRESS.map(item => (
          <div key={item.label} className="flex items-start gap-2.5">
            <span
              className="font-body text-[11px] font-bold rounded-md px-1.5 py-0.5 flex-shrink-0"
              style={{ color: item.color, backgroundColor: `${item.color}22` }}
            >
              {item.delta}
            </span>
            <div className="min-w-0">
              <p className="font-body text-sm text-white/85 leading-snug">{item.label}</p>
              <p className="font-body text-[11px] text-white/35 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SparkContactCard() {
  return (
    <Card>
      <p className="font-body text-[#ff8000] text-[11px] font-semibold tracking-widest uppercase mb-3">Your Spark Contact</p>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#ff8000] to-[#c44d1c] flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0">AK</div>
        <div className="min-w-0">
          <p className="font-body text-sm font-semibold text-white truncate">Ada Korhonen</p>
          <p className="font-body text-[11px] text-white/40 truncate">Talent Success Manager</p>
        </div>
      </div>
      <button className="btn-primary w-full justify-center !py-2.5 text-xs">Book a call &rarr;</button>
    </Card>
  );
}

function TopMatchCard({ opportunity, pct, onExpress, isExpressed }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <p className="font-body font-bold text-white text-sm leading-snug">{opportunity.title}</p>
          <p className="font-body text-white/40 text-xs mt-0.5 truncate">{opportunity.company} &middot; {opportunity.location}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <span className="font-body text-[#ff8000] font-bold text-sm block">{pct}%</span>
          <span className="font-body text-[9px] font-semibold text-white/30">match</span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
        <div className="h-full bg-[#ff8000] rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
      </div>
      <p className="font-body text-white/40 text-[10px] uppercase tracking-wide mb-1">{opportunity.sector} &middot; {opportunity.duration}</p>
      <p className="font-body text-white/60 text-xs leading-relaxed mb-3">{opportunity.description}</p>
      <button
        onClick={onExpress}
        disabled={isExpressed}
        className="w-full text-center font-body text-xs font-semibold text-[#ff8000] hover:text-white disabled:text-white/30 disabled:cursor-default transition-colors"
      >
        {isExpressed ? 'Interest Expressed ✓' : 'Express interest →'}
      </button>
    </div>
  );
}

export default function MatchVectorTab() {
  const { user } = useAuth();
  const { vector, loading, saveVector, opportunities, expressInterest, expressedOpportunity } = useTraineeDashboard();
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(() => defaultAxesState(vector));
  const [formAxes, setFormAxes] = useState(() => defaultAxesState(null));
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[#ff8000] rounded-full animate-spin" />
      </div>
    );
  }

  if (!vector) {
    const handleSave = async () => {
      setSaving(true);
      try {
        await saveVector(formAxes);
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-body text-2xl sm:text-3xl font-bold text-white mb-2">
          Build <span className="text-[#ff8000]">Your Match Vector</span>
        </h1>
        <p className="font-body text-white/50 text-sm mb-8">
          Rate yourself on each axis (0-100) to generate your personal Match Vector. You can edit this any time.
        </p>
        <div className="bg-[#131319] border border-white/8 rounded-2xl p-6 sm:p-8">
          <RadarChart datasets={[{ key: 'me', values: formAxes, color: '#ff8000', fillOpacity: 0.22 }]} />
          <div className="mt-8 space-y-6">
            {AXES.map(a => (
              <RangeSliderRow
                key={a.key} label={a.label} value={formAxes[a.key]} color={a.color}
                onChange={v => setFormAxes(prev => ({ ...prev, [a.key]: v }))}
              />
            ))}
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary w-full justify-center mt-8 disabled:opacity-60">
            {saving ? 'Saving…' : 'Save My Match Vector'}
          </button>
        </div>
      </div>
    );
  }

  const score = averageVector(vector);
  const ranked = opportunities
    .map(o => ({ ...o, pct: computeMatchPct(vector, o.requirement) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      await saveVector(draft);
      setEditMode(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setDraft(defaultAxesState(vector));
    setEditMode(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6">
        <div className="space-y-4 order-1">
          <ProfileCard user={user} />
          <ScoreCard score={score} />
          <StatusCard />
          <LanguagesCard languages={user?.profile?.languages} />
          <RecentProgressCard />
          <SparkContactCard />
        </div>

        <div className="order-3 lg:order-2">
          <div className="mb-6">
            <h1 className="font-body text-2xl sm:text-3xl font-bold text-white">
              Your <span className="text-[#ff8000]">Match Vector</span>
            </h1>
            <p className="font-body text-white/50 text-sm mt-1">
              Seven axes that define how you match with roles and organisations.
            </p>
          </div>

          <div className="bg-[#131319] border border-white/8 rounded-2xl p-5 sm:p-8">
            <RadarChart datasets={[{ key: 'me', values: editMode ? draft : vector, color: '#ff8000', fillOpacity: 0.22 }]} />
          </div>

          <div className="bg-[#131319] border border-white/8 rounded-2xl p-5 sm:p-8 mt-6">
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase">Axis Breakdown</p>
              {!editMode ? (
                <button
                  onClick={() => { setDraft(defaultAxesState(vector)); setEditMode(true); }}
                  className="flex items-center gap-1.5 font-body text-xs font-semibold text-[#ff8000] hover:text-white transition-colors"
                >
                  <FiEdit2 className="w-3.5 h-3.5" /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button onClick={handleCancelEdit} className="flex items-center gap-1 font-body text-xs font-semibold text-white/50 hover:text-white transition-colors">
                    <FiX className="w-3.5 h-3.5" /> Cancel
                  </button>
                  <button onClick={handleSaveEdit} disabled={saving} className="flex items-center gap-1 font-body text-xs font-semibold text-[#ff8000] hover:text-white transition-colors disabled:opacity-50">
                    <FiCheck className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-6">
              {AXES.map(a => (
                editMode ? (
                  <RangeSliderRow
                    key={a.key} label={a.label} value={draft[a.key]} color={a.color}
                    onChange={v => setDraft(prev => ({ ...prev, [a.key]: v }))}
                  />
                ) : (
                  <AxisBar key={a.key} label={a.label} value={vector[a.key]} color={a.color} />
                )
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 order-2 lg:order-3">
          <div className="bg-[#131319] border border-white/8 rounded-2xl p-5">
            <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">Top Matches for You</p>
            <div className="space-y-3">
              {ranked.map(o => (
                <TopMatchCard
                  key={o.id} opportunity={o} pct={o.pct}
                  isExpressed={o.id === expressedOpportunity?.id}
                  onExpress={() => expressInterest(o.id)}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#131319] border border-white/8 rounded-2xl p-5">
            <p className="font-body text-purple-400 text-[11px] font-semibold tracking-widest uppercase mb-2">GDPR Note</p>
            <p className="font-body text-white/40 text-xs leading-relaxed">
              Your Match Vector data is only shared with client organisations after your explicit consent to each introduction. You control your visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
