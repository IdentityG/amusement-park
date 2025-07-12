"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight // Still useful for the "Discover More" button
} from 'lucide-react'; // Only import what's still needed

// Define the structure for a water park feature
interface WaterParkFeature {
  title: string;
  description: string;
  imageSrc: string; // Changed from icon to imageSrc
  gradient: string; // Tailwind gradient classes for background/icon
  link: string; // Placeholder for a link
}

const WaterParkPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const waterParkFeatures: WaterParkFeature[] = [
    {
      title: 'Thrilling Water Slides',
      description: 'Experience exhilarating drops and twists on our state-of-the-art slides.',
      imageSrc: '/images/water-slide.gif', // Path to your GIF
      gradient: 'from-primary-400 to-primary-600',
      link: '#slides'
    },
    {
      title: 'The Grand Wave Pool',
      description: 'Ride the crest of simulated ocean waves in our expansive wave pool.',
      imageSrc: '/images/wave.gif', // Path to your GIF
      gradient: 'from-secondary-400 to-secondary-600',
      link: '#wave-pool'
    },
    {
      title: 'Relaxing Lazy River',
      description: 'Drift along the gentle currents of our serene lazy river, perfect for unwinding.',
      imageSrc: '/images/river.gif', // Path to your GIF
      gradient: 'from-accent-teal to-accent-green',
      link: '#lazy-river'
    },
    {
      title: 'Kids Splash Zones',
      description: 'Safe and fun interactive water play areas designed for our youngest guests.',
      imageSrc: '/images/puddle.gif', // Path to your GIF
      gradient: 'from-accent-yellow to-accent-purple',
      link: '#kids-zone'
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}>
      {/* Background Water Animation (remains the same) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-primary-400/30 to-secondary-400/30 blur-3xl animate-wave-float animation-delay-2000"></div>
        <div className="absolute top-1/2 -left-1/4 w-80 h-80 rounded-full bg-gradient-to-bl from-accent-green/30 to-accent-teal/30 blur-3xl animate-wave-float animation-delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-accent-yellow/30 to-accent-purple/30 blur-3xl animate-wave-float"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tl from-secondary-500/20 to-primary-500/20 blur-3xl animate-wave-float animation-delay-1000"></div>
        
        {/* Additional ripples/pulses */}
        <div className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-white/5 blur-3xl animate-ripple-expand animation-delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 rounded-full bg-white/5 blur-3xl animate-ripple-expand animation-delay-1500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Header (remains the same) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 gradient-text mb-6">Dive Into Our Water Park</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Get ready for an unforgettable aquatic adventure with thrilling rides, relaxing rivers, and splash zones for all ages.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {waterParkFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative transform-gpu"
            >
              <div className="relative p-6 rounded-3xl glassmorphism overflow-hidden
                          transition-all duration-500 hover:shadow-xl group-hover:scale-[1.02] 
                          group-hover:border-[var(--primary-500)] border border-white/20
                           group lg:p-8 glassmorphism shadow-lg"
                  style={{ background: 'var(--surface)' }}                          
                          >
                
                {/* Feature Image/GIF Container */}
                <div className={`w-full h-32 rounded-2xl mb-6 bg-gradient-to-br ${feature.gradient} 
                                  flex items-center justify-center relative overflow-hidden`}>
                  <img 
                    src={feature.imageSrc} 
                    alt={feature.title} 
                    className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                  {/* Subtle overlay for image effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--text-heading)] group-hover:text-[var(--primary-500)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  
                  <a 
                    href={feature.link} 
                    className="inline-flex items-center space-x-2 text-[var(--primary-500)] font-semibold 
                               group-hover:text-[var(--secondary-500)] transition-colors duration-300"
                  >
                    <span>Discover More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaterParkPreview