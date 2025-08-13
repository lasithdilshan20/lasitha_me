import Hero from "@/components/Hero";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import GitHubSection from "@/components/sections/GitHubSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

const Page = () => {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-7xl px-4 space-y-20 md:space-y-32">
        <AboutSection />
        <SkillsSection />
        <GitHubSection />
        <ProjectsSection />
        <BlogSection />
        <AchievementsSection />
        <ExperienceSection />
      </div>
    </>
  );
};

export default Page;
