import { CallToAction } from "../blocks/CallToAction";
import { EducationStats } from "../blocks/EducationStats";
import { FeaturedColleges } from "../blocks/FeaturedColleges";
import { FeaturedModules } from "../blocks/FeaturedModules";
import { FeaturedProfessions } from "../blocks/FeaturedProfessions";
import { FeaturedTrainings } from "../blocks/FeaturedTrainings";
import { HeroSection } from "../blocks/HeroSection";

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <EducationStats />
      <FeaturedColleges />
      <FeaturedProfessions />
      <FeaturedTrainings />
      <FeaturedModules />
      <CallToAction />
    </div>
  );
}
