import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/portfolio/HeroSection";
// ... other imports ...

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect("/proposals");
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Existing portfolio landing page content */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-blue-600">Pixel Platform</div>
          <div className="flex items-center gap-6">
            <Link href="/proposals" className="text-sm font-medium hover:text-blue-600 transition-all text-slate-600 dark:text-slate-400">Proposals</Link>
            <Link href="/login" className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Login</Link>
          </div>
        </div>
      </nav>
      <div className="pt-16">
        <HeroSection />
      </div>
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
