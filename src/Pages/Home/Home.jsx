import HeroSection           from './sections/HeroSection';
// import StatsSection          from './sections/StatsSection';
// import AboutSection          from './sections/AboutSection';
import ProgramTypesSection   from './sections/ProgramTypesSection';
// import ApproachSection       from './sections/ApproachSection';
import LeadershipSection     from './sections/LeadershipSection';
// import DashboardPreviewSection from './sections/DashboardPreviewSection';
import CTASection            from './sections/CTASection';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ProgramTypesSection />
      {/* <StatsSection /> */}
      {/* <AboutSection /> */}
      
      {/* <ApproachSection /> */}
      <LeadershipSection />
      {/* <DashboardPreviewSection /> */}
      <CTASection />
    </div>
  );
}
