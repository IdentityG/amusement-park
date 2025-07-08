import Hero from '../components/home/Hero';
import ConstructionTeaser from '@/components/home/ConstructionTeaser';
import ParkAttractionsPreview from '@/components/home/ParkAttractionsPreview';
import VisionMission from '@/components/home/VisionMission';
import InteractiveSitePlan from '@/components/home/InteractiveSitePlan';
import ConceptGallery from '@/components/home/ConceptGallery';
import PlanYourVisit from '@/components/home/PlanYourVisit';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import FeaturedAttractions from '@/components/home/FeaturedAttractions';
import AccessibilityInfo from '@/components/home/AccessibilityInfo';
import ContactInfo from '@/components/home/ContactInfo';
import FAQ from '@/components/home/Faq';

export default function Home() {
  return (
    <div>
      <Hero />
      <VisionMission />
      <ConstructionTeaser />
      <ParkAttractionsPreview />
      <ConceptGallery />
      <InteractiveSitePlan />
      <FeaturedAttractions />
      <AccessibilityInfo />
      <FAQ />
      <ContactInfo />
      <PlanYourVisit />
      {/* Other sections */}
    </div>
  );
}