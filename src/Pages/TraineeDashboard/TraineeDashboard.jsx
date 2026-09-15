import { useState } from 'react';
import { TraineeDashboardProvider } from './TraineeDashboardContext';
import TopBar from './components/TopBar';
import MatchVectorTab from './tabs/MatchVectorTab';
import OpportunitiesTab from './tabs/OpportunitiesTab';
import GrowthPathTab from './tabs/GrowthPathTab';
import MySparkTab from './tabs/MySparkTab';

export default function TraineeDashboard() {
  const [activeTab, setActiveTab] = useState('match-vector');

  return (
    <TraineeDashboardProvider>
      <div className="min-h-screen bg-[#0a0a0f]">
        <TopBar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="py-8 sm:py-10">
          {activeTab === 'match-vector' && <MatchVectorTab />}
          {activeTab === 'opportunities' && <OpportunitiesTab />}
          {activeTab === 'growth-path' && <GrowthPathTab onGoToOpportunities={() => setActiveTab('opportunities')} />}
          {activeTab === 'my-spark' && <MySparkTab />}
        </main>
      </div>
    </TraineeDashboardProvider>
  );
}
