import Hero from '../components/home/Hero';
import ParkTeaser from '../components/home/ParkTeaser';
import TopAttractions from '../components/home/TopAttractions';
import TicketsAndOffers from '../components/home/TicketsAndOffers';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import ConstructionTeaser from '@/components/home/ConstructionTeaser';
import ParkAttractionsPreview from '@/components/home/ParkAttractionsPreview';
import VisionMission from '@/components/home/VisionMission';
import InteractiveSitePlan from '@/components/home/InteractiveSitePlan';
import ConceptGallery from '@/components/home/ConceptGallery';
import PlanYourVisit from '@/components/home/PlanYourVisit';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export default function Home() {
  return (
    <div>
      <Hero />
      <ConstructionTeaser />
      <VisionMission />
      <ParkAttractionsPreview />
      <InteractiveSitePlan />
      <ConceptGallery />
      <PlanYourVisit />
      <NewsletterSignup />
      {/* Other sections */}
    </div>
  );
}