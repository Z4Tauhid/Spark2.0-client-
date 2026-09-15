import { useTraineeDashboard } from '../TraineeDashboardContext';
import { computeMatchPct } from '../utils/match';
import MatchScoreRing from '../components/MatchScoreRing';

function OpportunityCard({ opportunity, pct, isExpressed, onExpress }) {
  return (
    <div className="bg-[#131319] border border-white/8 rounded-2xl p-6 sm:p-7">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="inline-block font-body text-[10px] font-semibold tracking-widest uppercase text-white/40 border border-white/15 rounded px-2 py-1 mb-3">
            {opportunity.sector} &middot; {opportunity.duration} &middot; {opportunity.location}
          </p>
          <h3 className="font-body text-xl font-bold text-white mb-1">{opportunity.title}</h3>
          <p className="font-body text-[#ff8000] text-sm font-semibold mb-3">{opportunity.company}</p>
          <p className="font-body text-white/55 text-sm leading-relaxed">{opportunity.description}</p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <MatchScoreRing score={pct} size={64} strokeWidth={6} labelClassName="font-body text-lg font-bold text-white" />
          <span className="font-body text-[9px] font-semibold text-white/30 uppercase tracking-wide">Match</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 pt-5 border-t border-white/8">
        <div className="flex items-center gap-3">
          <button
            onClick={onExpress}
            disabled={isExpressed}
            className="btn-primary !py-2.5 !px-5 text-sm disabled:opacity-50 disabled:cursor-default"
          >
            {isExpressed ? 'Interest Expressed ✓' : 'Express interest'}
          </button>
          <button className="btn-outline-white !py-2.5 !px-5 text-sm">Learn more</button>
        </div>
        <p className="font-body text-white/30 text-xs">Posted {opportunity.postedDate}</p>
      </div>
    </div>
  );
}

export default function OpportunitiesTab() {
  const { vector, opportunities, expressInterest, expressedOpportunity } = useTraineeDashboard();

  const ranked = [...opportunities]
    .map(o => ({ ...o, pct: computeMatchPct(vector, o.requirement) }))
    .sort((a, b) => b.pct - a.pct);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-body text-2xl sm:text-3xl font-bold text-white mb-2">Open Opportunities</h1>
      <p className="font-body text-white/50 text-sm mb-8">Roles curated for your Match Vector — ranked by fit, not just recency.</p>

      <div className="space-y-5">
        {ranked.map(o => (
          <OpportunityCard
            key={o.id} opportunity={o} pct={o.pct}
            isExpressed={o.id === expressedOpportunity?.id}
            onExpress={() => expressInterest(o.id)}
          />
        ))}
      </div>
    </div>
  );
}
