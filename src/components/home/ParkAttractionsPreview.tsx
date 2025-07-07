'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

// Import Lucide icons
import { 
  Rocket, 
  Waves, 
  Gamepad2, 
  Glasses, 
  Car, 
  RollerCoaster, 
  FerrisWheel,
  ArrowDownToLine,
} from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Attraction data
const attractions = [
  {
    id: 1,
    name: "Roller Coaster",
    icon: Rocket,
    description: "Experience the ultimate thrill with our signature high-speed coaster",
    color: "var(--accent-purple)"
  },
  {
    id: 2,
    name: "Ferris Wheels",
    icon: FerrisWheel,
    description: "Take in breathtaking panoramic views from our giant observation wheel",
    color: "var(--accent-teal)"
  },
  {
    id: 3,
    name: "Water Park",
    icon: Waves,
    description: "Splash, slide and swim in our expansive water adventure zone",
    color: "var(--accent-blue)"
  },
  {
    id: 4,
    name: "Indoor Games",
    icon: Gamepad2,
    description: "Enjoy our collection of arcade classics and modern gaming experiences",
    color: "var(--accent-green)"
  },
  {
    id: 5,
    name: "VR Experience",
    icon: Glasses,
    description: "Step into immersive virtual worlds with cutting-edge VR technology",
    color: "var(--primary-500)"
  },
  {
    id: 6,
    name: "Go-Kart",
    icon: Car,
    description: "Race against friends on our professionally designed track",
    color: "var(--accent-yellow)"
  },
  {
    id: 7,
    name: "Bowling",
    icon: RollerCoaster,
    description: "Strike it lucky at our state-of-the-art bowling alley",
    color: "var(--secondary-500)"
  },
  {
    id: 8,
    name: "Drop Tower",
    icon: ArrowDownToLine,
    description: "Feel your heart race on our extreme free-fall tower",
    color: "var(--accent-red)"
  },
];

const ParkAttractionsPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    // GSAP animation for staggered card reveal
    gsap.fromTo(
      cards.children,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8,
        rotateY: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 10, 
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  };

  const labelVariants = {
    initial: { opacity: 0.7, scale: 1 },
    hover: { 
      opacity: 1, 
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" } 
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light) 100%)'
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-purple)' }}></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-teal)' }}></div>
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
            Park Attractions Preview
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--text-body-light)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            Get a glimpse of the thrilling experiences waiting for you when our park opens.
            Each attraction is designed to create unforgettable memories.
          </p>
        </motion.div>

        {/* Attractions Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {attractions.map((attraction) => (
            <motion.div
              key={attraction.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
              variants={cardVariants}
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Content */}
              <div className="p-6 flex flex-col items-center text-center h-full">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `${attraction.color}15` }}
                  variants={iconVariants}
                >
                  <attraction.icon 
                    size={32} 
                    style={{ color: attraction.color }} 
                  />
                </motion.div>
                
                {/* Name */}
                <h3 
                  className="font-display font-bold mb-2"
                  style={{ 
                    fontSize: 'var(--text-h4)',
                    color: 'var(--text-heading-light)'
                  }}
                >
                  {attraction.name}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-sm leading-relaxed mb-4 flex-grow"
                  style={{ color: 'var(--text-muted-light)' }}
                >
                  {attraction.description}
                </p>
                
                {/* Coming Soon Label */}
                <motion.div
                  className="mt-auto px-4 py-2 rounded-full text-xs font-semibold"
                  style={{
                    background: `${attraction.color}15`,
                    color: attraction.color
                  }}
                  variants={labelVariants}
                >
                  Coming 2026
                </motion.div>
              </div>
              
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 30px ${attraction.color}50`
                }} 
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/attractions"
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--primary-500), var(--primary-400))',
              fontSize: 'var(--text-base)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span>Explore Future Attractions</span>
            <svg 
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ParkAttractionsPreview;