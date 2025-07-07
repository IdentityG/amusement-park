'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Construction, 
  Hammer, 
  Rocket, 
  Waves, 
  Utensils, 
  ShoppingBag,
  FerrisWheel,
  Gamepad2,
  Info
} from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Park zones data
const parkZones = [
  {
    id: 1,
    name: "Main Entrance",
    status: "under-construction",
    description: "Grand welcome area with ticketing and information",
    position: { x: 50, y: 15 },
    icon: Info
  },
  {
    id: 2,
    name: "Thrill Zone",
    status: "future",
    description: "Home to our most extreme rides including the Rocket Coaster",
    position: { x: 25, y: 40 },
    icon: Rocket
  },
  {
    id: 3,
    name: "Water Park",
    status: "future",
    description: "Splash into fun with slides, pools, and water attractions",
    position: { x: 75, y: 45 },
    icon: Waves
  },
  {
    id: 4,
    name: "Family Fun Zone",
    status: "future",
    description: "Gentle rides and attractions perfect for all ages",
    position: { x: 60, y: 30 },
    icon: FerrisWheel
  },
  {
    id: 5,
    name: "Dining District",
    status: "future",
    description: "Variety of restaurants and food stalls offering global cuisine",
    position: { x: 40, y: 70 },
    icon: Utensils
  },
  {
    id: 6,
    name: "Shopping Village",
    status: "future",
    description: "Souvenirs, gifts, and park merchandise",
    position: { x: 65, y: 75 },
    icon: ShoppingBag
  },
  {
    id: 7,
    name: "Indoor Arcade",
    status: "future",
    description: "Climate-controlled gaming area with latest attractions",
    position: { x: 30, y: 60 },
    icon: Gamepad2
  },
  {
    id: 8,
    name: "Construction HQ",
    status: "active",
    description: "Current construction headquarters and viewing area",
    position: { x: 50, y: 50 },
    icon: Construction
  },
];

const InteractiveSitePlan = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;

    if (!section || !map) return;

    // Map reveal animation
    gsap.fromTo(
      map,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Pins staggered animation
    gsap.fromTo(
      map.querySelectorAll('.map-pin'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const zoomIn = () => {
    if (scale < 1.5) setScale(prev => prev + 0.1);
  };

  const zoomOut = () => {
    if (scale > 0.8) setScale(prev => prev - 0.1);
  };

  const resetZoom = () => {
    setScale(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--accent-green)';
      case 'under-construction':
        return 'var(--primary-500)';
      case 'future':
        return 'var(--secondary-500)';
      default:
        return 'var(--text-muted-light)';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active Zone';
      case 'under-construction':
        return 'Under Construction';
      case 'future':
        return 'Future Ride Area';
      default:
        return 'Planned';
    }
  };

  const pinVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    active: {
      scale: 1.3,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light-hover) 100%)'
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/3 w-40 h-40 rounded-full blur-3xl" 
             style={{ background: 'var(--secondary-500)' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full blur-3xl" 
             style={{ background: 'var(--primary-500)' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 
            className="font-display font-bold mb-4"
            style={{ 
              fontSize: 'var(--text-h2)',
              color: 'var(--text-heading-light)',
              background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Interactive Site Plan
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--text-body-light)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            Explore our park layout and discover the exciting zones we're building.
            Hover over the pins to learn more about each area.
          </p>
        </motion.div>

        {/* Map Controls */}
        <div className="flex justify-center mb-6 space-x-4">
          <button 
            onClick={zoomIn}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{ 
              background: 'var(--surface-light)',
              color: 'var(--primary-500)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button 
            onClick={zoomOut}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{ 
              background: 'var(--surface-light)',
              color: 'var(--primary-500)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button 
            onClick={resetZoom}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{ 
              background: 'var(--surface-light)',
              color: 'var(--primary-500)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/>
              <path d="M3 12h18"/>
            </svg>
          </button>
        </div>

        {/* Interactive Map */}
        <div className="relative max-w-7xl mx-auto">
          <div 
            ref={mapRef}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            style={{ 
              background: 'url("/images/map.png") center/cover no-repeat',
              transform: `scale(${scale})`,
              transition: 'transform 0.3s ease-out',
              transformOrigin: 'center center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Map overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/10 to-primary-500/10"></div>

            {/* Zone pins */}
            {parkZones.map((zone) => (
              <motion.div
                key={zone.id}
                className="map-pin absolute cursor-pointer"
                style={{
                  left: `${zone.position.x}%`,
                  top: `${zone.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: activeZone === zone.id ? 20 : 10
                }}
                onMouseEnter={() => setActiveZone(zone.id)}
                onMouseLeave={() => setActiveZone(null)}
                variants={pinVariants}
                initial="initial"
                whileHover="hover"
                animate={activeZone === zone.id ? "active" : "initial"}
              >
                {/* Pin icon */}
                <div 
                  className="relative w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `${getStatusColor(zone.status)}20`,
                    border: `2px solid ${getStatusColor(zone.status)}`,
                    boxShadow: `0 0 0 4px ${getStatusColor(zone.status)}30, 0 5px 15px rgba(0, 0, 0, 0.2)`
                  }}
                >
                  <zone.icon size={18} style={{ color: getStatusColor(zone.status) }} />
                  
                  {/* Pulse animation for active zones */}
                  {zone.status === 'active' && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                         style={{ background: getStatusColor(zone.status) }}></div>
                  )}
                </div>

                {/* Tooltip */}
                <div 
                  className={`absolute w-48 p-3 rounded-lg shadow-lg transition-opacity duration-200 ${activeZone === zone.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  style={{ 
                    background: 'var(--surface-light)',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '10px',
                    zIndex: 30
                  }}
                >
                  <div className="absolute w-3 h-3 rotate-45 bg-white" 
                       style={{ 
                         top: '-6px', 
                         left: '50%', 
                         marginLeft: '-6px',
                         background: 'var(--surface-light)'
                       }}></div>
                  <div className="text-center">
                    <h4 
                      className="font-display font-bold text-sm mb-1"
                      style={{ color: 'var(--text-heading-light)' }}
                    >
                      {zone.name}
                    </h4>
                    <div 
                      className="inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2"
                      style={{ 
                        background: `${getStatusColor(zone.status)}20`,
                        color: getStatusColor(zone.status)
                      }}
                    >
                      {getStatusLabel(zone.status)}
                    </div>
                    <p 
                      className="text-xs"
                      style={{ color: 'var(--text-muted-light)' }}
                    >
                      {zone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Compass */}
            <div 
              className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                background: 'var(--surface-light)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--text-muted-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.2398 7.76001L14.1198 14.12L7.75977 16.24L9.87977 9.88001L16.2398 7.76001Z" stroke="var(--primary-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Scale indicator */}
            <div 
              className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ 
                background: 'var(--surface-light)',
                color: 'var(--text-muted-light)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              Scale: {Math.round(scale * 100)}%
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="max-w-7xl mx-auto mt-8 p-6 rounded-xl" style={{ background: 'var(--surface-light)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}>
          <h4 
            className="font-display font-bold mb-4 text-center"
            style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--text-heading-light)'
            }}
          >
            Map Legend
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { status: 'active', label: 'Active Zone' },
              { status: 'under-construction', label: 'Under Construction' },
              { status: 'future', label: 'Future Ride Area' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `${getStatusColor(item.status)}20`,
                    border: `2px solid ${getStatusColor(item.status)}`
                  }}
                >
                  {item.status === 'active' && <Construction size={12} style={{ color: getStatusColor(item.status) }} />}
                  {item.status === 'under-construction' && <Hammer size={12} style={{ color: getStatusColor(item.status) }} />}
                  {item.status === 'future' && <MapPin size={12} style={{ color: getStatusColor(item.status) }} />}
                </div>
                <span 
                  className="text-sm"
                  style={{ color: 'var(--text-body-light)' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSitePlan;