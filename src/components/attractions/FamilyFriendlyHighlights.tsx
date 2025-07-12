import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FerrisWheel, Zap, Gamepad2, Heart, Star, Sparkles } from 'lucide-react';

const FamilyFriendlyHighlights = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const attractions = [
    {
      id: 1,
      title: "Ferris Wheel",
      subtitle: "Sky High Adventure",
      description: "Take in breathtaking views of the entire park from our giant Ferris wheel. Perfect for all ages!",
      icon: FerrisWheel,
      gradient: "linear-gradient(135deg, #FF5A5F, #FF7A7F)",
      hoverGradient: "linear-gradient(135deg, #E04046, #FF5A5F)",
      features: ["360° Views", "Photo Perfect", "All Ages"]
    },
    {
      id: 2,
      title: "Indoor Maze",
      subtitle: "Mystery & Adventure",
      description: "Navigate through our exciting indoor maze filled with surprises, puzzles, and hidden treasures!",
      icon: Zap,
      gradient: "linear-gradient(135deg, #9C27B0, #3D5AFE)",
      hoverGradient: "linear-gradient(135deg, #7B1FA2, #9C27B0)",
      features: ["Brain Teasers", "Hidden Treasures", "Team Fun"]
    },
    {
      id: 3,
      title: "VR Games",
      subtitle: "Virtual Reality Fun",
      description: "Immerse yourself in amazing virtual worlds with our state-of-the-art VR gaming experience!",
      icon: Gamepad2,
      gradient: "linear-gradient(135deg, #3D5AFE, #00BCD4)",
      hoverGradient: "linear-gradient(135deg, #2A3EB1, #3D5AFE)",
      features: ["Cutting Edge", "Multiple Worlds", "Safe & Fun"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const iconVariants = {
    idle: { 
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.1,
      rotate: 10,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 200
      }
    },
    bounce: {
      scale: [1, 1.2, 1],
      rotate: [0, 15, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden"style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full blur-xl opacity-30"
          style={{ background: 'var(--accent-yellow)' }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full blur-xl opacity-30"
          style={{ background: 'var(--primary-500)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full blur-lg opacity-30"
          style={{ background: 'var(--accent-teal)' }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Heart className="w-8 h-8" style={{ color: 'var(--primary-500)' }} />
            <Sparkles className="w-6 h-6" style={{ color: 'var(--accent-yellow)' }} />
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text">
              Family Fun Zone
            </h2>
            <Sparkles className="w-6 h-6" style={{ color: 'var(--accent-yellow)' }} />
            <Heart className="w-8 h-8" style={{ color: 'var(--primary-500)' }} />
          </motion.div>
          <motion.p
            className="text-lg lg:text-xl max-w-2xl mx-auto text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Create magical memories with attractions designed for the whole family to enjoy together!
          </motion.p>
        </motion.div>

        {/* Attractions Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {attractions.map((attraction, index) => {
            const Icon = attraction.icon;
            return (
              <motion.div
                key={attraction.id}
                className="relative group rounded-2xl p-6 lg:p-8 glassmorphism shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ background: 'var(--surface)' }}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(attraction.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient Background Overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl transition-opacity duration-300"
                  style={{ 
                    background: hoveredCard === attraction.id ? attraction.hoverGradient : 'transparent',
                    opacity: hoveredCard === attraction.id ? 0.1 : 0
                  }}
                  animate={{ 
                    opacity: hoveredCard === attraction.id ? 0.1 : 0 
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 mb-6"
                  variants={iconVariants}
                  animate={hoveredCard === attraction.id ? "hover" : "bounce"}
                >
                  <div 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl p-4 lg:p-5 shadow-lg mx-auto"
                    style={{ background: attraction.gradient }}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.h3
                    className="text-xl lg:text-2xl font-bold mb-2"
                    style={{ color: 'var(--text-heading)' }}
                    animate={{
                      scale: hoveredCard === attraction.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {attraction.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-sm font-medium mb-3 text-muted"
                    animate={{
                      opacity: hoveredCard === attraction.id ? 1 : 0.7
                    }}
                  >
                    {attraction.subtitle}
                  </motion.p>

                  <motion.p
                    className="mb-4 text-sm lg:text-base leading-relaxed"
                    style={{ color: 'var(--foreground)' }}
                    animate={{
                      opacity: hoveredCard === attraction.id ? 1 : 0.8
                    }}
                  >
                    {attraction.description}
                  </motion.p>

                  {/* Features */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredCard === attraction.id ? 1 : 0.6,
                      y: hoveredCard === attraction.id ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {attraction.features.map((feature, featureIndex) => (
                      <motion.span
                        key={featureIndex}
                        className="px-3 py-1 rounded-full text-xs font-medium glassmorphism"
                        style={{ 
                          color: 'var(--text-heading)',
                          borderColor: 'var(--primary-500)'
                        }}
                        whileHover={{ scale: 1.05 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: 0.6 + featureIndex * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{
                    rotate: hoveredCard === attraction.id ? 360 : 0,
                    scale: hoveredCard === attraction.id ? 1.2 : 1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Star className="w-5 h-5 opacity-60" style={{ color: 'var(--accent-yellow)' }} />
                </motion.div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 blur-xl -z-10"
                  style={{ background: attraction.gradient }}
                  animate={{
                    opacity: hoveredCard === attraction.id ? 0.3 : 0,
                    scale: hoveredCard === attraction.id ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            style={{ 
              background: `linear-gradient(45deg, var(--primary-500), var(--secondary-500))` 
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 90, 95, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Family Attractions
          </motion.button>
        </motion.div>
      </div>

      {/* Dark mode styles */}
      <style jsx>{`
        .dark section {
          background: var(--bg-dark) !important;
        }
      `}</style>
    </section>
  );
};

export default FamilyFriendlyHighlights;