import { HeroSection } from "@/components/portfolio/HeroSection";
import { ImpactCounters } from "@/components/portfolio/ImpactCounters";
import { ValuesGrid } from "@/components/portfolio/ValuesGrid";
import { CommunityPulse } from "@/components/portfolio/CommunityPulse";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { VisionParallax } from "@/components/portfolio/VisionParallax";
import { MemberSpotlight } from "@/components/portfolio/MemberSpotlight";
import { PhilosophyTimeline } from "@/components/portfolio/PhilosophyTimeline";
import { InnovationBadge } from "@/components/portfolio/InnovationBadge";
import { OpenSourceManifesto } from "@/components/portfolio/OpenSourceManifesto";
import { SkillMosaic } from "@/components/portfolio/SkillMosaic";
import { GlobalReachMap } from "@/components/portfolio/GlobalReachMap";
import { CultureGallery } from "@/components/portfolio/CultureGallery";
import { TestimonialCarousel } from "@/components/portfolio/TestimonialCarousel";
import { FutureRoadmap } from "@/components/portfolio/FutureRoadmap";
import { EngagementCTA } from "@/components/portfolio/EngagementCTA";
import { IdeologyFooter } from "@/components/portfolio/IdeologyFooter";
import { IdeologyCloud } from "@/components/portfolio/IdeologyCloud";
import { DiversitySection } from "@/components/portfolio/DiversitySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <HeroSection />
      <ImpactCounters />
      <IdeologyCloud />
      <ValuesGrid />
      <CommunityPulse />
      <ProjectShowcase />
      <VisionParallax />
      <MemberSpotlight />
      <PhilosophyTimeline />
      <InnovationBadge />
      <OpenSourceManifesto />
      <SkillMosaic />
      <GlobalReachMap />
      <CultureGallery />
      <DiversitySection />
      <TestimonialCarousel />
      <FutureRoadmap />
      <EngagementCTA />
      <IdeologyFooter />
    </main>
  );
}
