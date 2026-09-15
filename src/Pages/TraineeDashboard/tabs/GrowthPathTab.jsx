import { useTraineeDashboard } from '../TraineeDashboardContext';
import { AXES } from '../data/axes';
import { computeGap, biggestGapAxis } from '../utils/match';
import RadarChart from '../components/RadarChart';
import AxisBar from '../components/AxisBar';

const ROLE_COLOR = '#8b5cf6';

const RECOMMENDED_ACTIONS = [
  { title: 'Sector Fundamentals Course', meta: 'Course · Coursera · 4 hours', delta: '+8', axisKey: 'domain' },
  { title: 'Advanced Analytics Workshop', meta: 'Workshop · Microsoft Learn · 6 hours', delta: '+5', axisKey: 'hardSkills' },
  { title: 'Lead a Cross-Team Project', meta: 'On-the-job · Spark Challenge · Ongoing', delta: '+4', axisKey: 'softSkills' },
];

function GapRow({ axis, vector, requirement }) {
  const gap = computeGap(vector, requirement, axis.key);
  const met = gap <= 0;
  return (
    <AxisBar
      label={axis.label}
      value={vector[axis.key]}
      color={axis.color}
      target={requirement[axis.key]}
      rightLabel={met ? '✓ met' : `Gap ${gap}`}
    />
  );
}

function RecommendedActionRow({ action }) {
  const axis = AXES.find(a => a.key === action.axisKey);
  return (
    <div className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="font-body text-xs font-bold rounded-md px-2 py-1 flex-shrink-0"
          style={{ color: axis.color, backgroundColor: `${axis.color}22` }}
        >
          {action.delta}
        </span>
        <div className="min-w-0">
          <p className="font-body text-sm font-semibold text-white truncate">{action.title}</p>
          <p className="font-body text-xs text-white/40 truncate">{action.meta}</p>
        </div>
      </div>
      <span className="font-body text-xs font-semibold text-[#ff8000] flex-shrink-0">Start &rarr;</span>
    </div>
  );
}

function EmptyState({ onGoToOpportunities }) {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 text-center py-24">
      <h1 className="font-body text-2xl sm:text-3xl font-bold text-white mb-3">Your Growth Path</h1>
      <p className="font-body text-white/50 text-sm mb-8 leading-relaxed">
        You haven't expressed interest in a role yet. Visit Opportunities to pick a target role and see the gap between it and your Match Vector.
      </p>
      <button onClick={onGoToOpportunities} className="btn-primary">Browse Opportunities</button>
    </div>
  );
}

export default function GrowthPathTab({ onGoToOpportunities }) {
  const { vector, expressedOpportunity } = useTraineeDashboard();

  if (!expressedOpportunity) {
    return <EmptyState onGoToOpportunities={onGoToOpportunities} />;
  }

  const { requirement } = expressedOpportunity;
  const worst = biggestGapAxis(vector, requirement, AXES);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <h1 className="font-body text-2xl sm:text-3xl font-bold text-white mb-2">
        Your <span className="text-[#ff8000]">Growth Path</span>
      </h1>
      <p className="font-body text-white/50 text-sm mb-8">
        Gaps between your current vector and the{' '}
        <span className="font-semibold text-white">{expressedOpportunity.title} at {expressedOpportunity.company}</span>{' '}
        you expressed interest in.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        <div>
          <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">Gap Analysis</p>
          <div className="bg-[#131319] border border-white/8 rounded-2xl p-5 sm:p-7 space-y-6">
            {AXES.map(axis => (
              <GapRow key={axis.key} axis={axis} vector={vector} requirement={requirement} />
            ))}
          </div>

          <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4 mt-8">Recommended Actions</p>
          <div className="space-y-3">
            {RECOMMENDED_ACTIONS.map(action => (
              <RecommendedActionRow key={action.title} action={action} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#131319] border border-white/8 rounded-2xl p-5 sm:p-7">
            <p className="font-body text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-4">Overlay: You vs. Role</p>
            <RadarChart
              size={300}
              datasets={[
                { key: 'candidate', values: vector, color: '#ff8000', fillOpacity: 0.2, label: 'Candidate' },
                { key: 'role', values: requirement, color: ROLE_COLOR, fillOpacity: 0.06, dashed: true, label: 'Role Requirement' },
              ]}
              showLegend
            />
          </div>

          <div className="bg-[#131319] border border-white/8 rounded-2xl p-5 sm:p-7">
            <p className="font-body text-[#ff8000] text-[11px] font-semibold tracking-widest uppercase mb-3">Spark Says</p>
            <p className="font-body text-white/70 text-sm italic leading-relaxed mb-4">
              "Focus on {worst.label} first — that's your biggest opportunity to close the gap with this role."
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff8000] to-[#c44d1c] flex items-center justify-center text-white font-body font-bold text-xs flex-shrink-0">AK</div>
              <span className="font-body text-xs font-semibold text-white/60">Ada Korhonen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
