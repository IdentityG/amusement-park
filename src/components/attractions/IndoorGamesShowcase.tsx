"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; // For the "Learn More" button

// Define the structure for an indoor game item
interface IndoorGame {
  title: string;
  description: string;
  imageSrc: string; // Path to the GIF/image in public folder
  gradient: string; // Tailwind gradient classes for card background/accent
  link: string; // Placeholder for a link to a detailed page
}

const IndoorGamesShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const indoorGames: IndoorGame[] = [
    {
      title: 'Bowling Alley',
      description: 'Strike down pins in our state-of-the-art bowling lanes with dynamic lighting.',
      imageSrc: '/images/bowling-lane.gif', // Replace with your GIF path
      gradient: 'from-primary-400 to-primary-600',
      link: '#bowling'
    },
    {
      title: 'Laser Tag Arena',
      description: 'Navigate a multi-level arena, strategize with your team, and outsmart opponents.',
      imageSrc: '/images/laser-tag.gif', // Replace with your GIF path
      gradient: 'from-secondary-400 to-secondary-600',
      link: '#lasertag'
    },
    {
      title: 'VR Immersion Rooms',
      description: 'Step into virtual worlds with cutting-edge VR technology and diverse experiences.',
      imageSrc: '/images/metaverse.gif', // Replace with your GIF path
      gradient: 'from-accent-teal to-accent-green',
      link: '#vr-rooms'
    },
    {
      title: 'Trampoline Park',
      description: 'Bounce, flip, and soar through the air in our expansive trampoline park.',
      imageSrc: '/images/trampoline.gif', // Replace with your GIF path
      gradient: 'from-accent-yellow to-accent-purple',
      link: '#trampoline'
    },
    {
      title: 'Arcade Zone',
      description: 'Relive classic arcade fun and challenge friends on modern gaming machines.',
      imageSrc: '/images/arcade.gif', // Example additional game
      gradient: 'from-purple-400 to-pink-600',
      link: '#arcade'
    },
    {
      title: 'Billiards & Darts',
      description: 'Enjoy a relaxed game of billiards or test your aim with a friendly darts match.',
      imageSrc: '/images/dartboard.gif', // Example additional game
      gradient: 'from-blue-400 to-cyan-600',
      link: '#billiards'
    },
  ];

  return (
    <section className="py-24 bg-[var(--background)] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}>
      {/* Background Animated Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 blur-3xl animate-spin-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-bl from-accent-green/20 to-accent-teal/20 blur-3xl animate-spin-slow animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-accent-yellow/20 to-accent-purple/20 blur-3xl animate-spin-slow"></div>
        {/* Additional smaller, faster elements for dynamism */}
        <div className="absolute top-1/10 left-1/10 w-32 h-32 rounded-full bg-white/5 blur-2xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute bottom-1/10 right-1/10 w-40 h-40 rounded-full bg-white/5 blur-2xl animate-pulse-slow animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 gradient-text mb-6">Unleash the Fun: Indoor Games</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Step into a world of excitement with our diverse range of indoor activities, perfect for all ages and skill levels.
          </p>
        </motion.div>

        {/* Indoor Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {indoorGames.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative transform-gpu"
            >
              <div className="relative p-6 rounded-3xl glassmorphism overflow-hidden
                          transition-all duration-500 hover:shadow-xl group-hover:scale-[1.02] 
                          group-hover:border-[var(--primary-500)] border border-white/20 flex flex-col
                            group lg:p-8 glassmorphism shadow-lg"
                style={{ background: 'var(--surface)' }}
                          >
                
                {/* Game GIF Container */}
                <div className={`w-full h-48 rounded-2xl mb-6 bg-gradient-to-br ${game.gradient} 
                                  flex items-center justify-center relative overflow-hidden`}>
                  <img 
                    src={game.imageSrc} 
                    alt={game.title} 
                    className="w-full h-full object-cover rounded-2xl 
                                opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                  />
                  {/* Subtle overlay for image effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[var(--text-heading)] group-hover:text-[var(--primary-500)] transition-colors mb-2">
                  {game.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-grow"> {/* flex-grow to push link to bottom */}
                  {game.description}
                </p>
                
                <a 
                  href={game.link} 
                  className="inline-flex items-center space-x-2 text-[var(--primary-500)] font-semibold 
                             group-hover:text-[var(--secondary-500)] transition-colors duration-300 mt-auto"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndoorGamesShowcase;