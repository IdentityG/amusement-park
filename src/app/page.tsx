import Hero from '../components/Hero';
import ParkTeaser from '../components/ParkTeaser';
import TopAttractions from '../components/TopAttractions';
import TicketsAndOffers from '../components/TicketsAndOffers';

export default function Home() {
  return (
    <div>
      <Hero />
      <ParkTeaser />
      <TopAttractions />
      <TicketsAndOffers />
      {/* Other sections */}
    </div>
  );
}