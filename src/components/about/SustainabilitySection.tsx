"use client"
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Zap,
  Accessibility,
  Leaf,
  Brain,
  Shield,
  Wifi,
  Battery,
  TreePine
} from 'lucide-react';


const SustainabilitySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const sustainabilityFeatures = [
    {
      icon: Zap,
      title: 'EV Charging Stations',
      description: 'High-speed charging infrastructure throughout the park',
      color: 'from-accent-yellow to-accent-green',
      stats: '50+ Stations'
    },
    {
      icon: Accessibility,
      title: 'ADA Accessibility',
      description: 'Universal design ensuring access for all guests',
      color: 'from-primary-400 to-primary-600',
      stats: '100% Compliant'
    },
    {
      icon: Leaf,
      title: 'Green Energy Usage',
      description: 'Solar panels and wind energy powering operations',
      color: 'from-accent-green to-accent-teal',
      stats: '80% Renewable'
    },
    {
      icon: Brain,
      title: 'Smart Infrastructure',
      description: 'IoT-enabled systems for optimal resource management',
      color: 'from-secondary-400 to-secondary-600',
      stats: 'AI-Powered'
    },
    {
      icon: Shield,
      title: 'Safety Systems',
      description: 'Advanced monitoring and emergency response protocols',
      color: 'from-accent-purple to-primary-500',
      stats: '24/7 Monitoring'
    },
    {
      icon: Wifi,
      title: 'Connected Experience',
      description: 'High-speed WiFi and digital integration throughout',
      color: 'from-accent-teal to-secondary-500',
      stats: '5G Ready'
    },
    {
      icon: Battery,
      title: 'Energy Storage',
      description: 'Advanced battery systems for grid independence',
      color: 'from-accent-yellow to-accent-purple',
      stats: '10MW Capacity'
    },
    {
      icon: TreePine,
      title: 'Carbon Neutral',
      description: 'Commitment to net-zero emissions by 2025',
      color: 'from-accent-green to-primary-400',
      stats: 'Zero Emissions'
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)] relative overflow-hidden">
      {/* Background Elements: Abstract, blurred, and animated shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-primary-400/30 to-secondary-400/30 blur-3xl animate-spin-slow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-bl from-accent-green/30 to-accent-teal/30 blur-3xl animate-spin-slow animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-accent-yellow/30 to-accent-purple/30 blur-3xl animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 gradient-text mb-6">Sustainability & Smart Design</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Leading the industry with eco-friendly innovations and intelligent infrastructure that creates a better future for entertainment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sustainabilityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative transform-gpu"
            >
              <div className="relative p-8 rounded-2xl glassmorphism overflow-hidden
                          transition-all duration-500 hover:shadow-xl group-hover:scale-[1.02] 
                          group-hover:rotate-1 group-hover:border-[var(--primary-500)]"> {/* Glassmorphism and new hover effects */}
                
                {/* Icon Container with subtle glow */}
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6 
                                  group-hover:scale-110 transition-transform duration-300 relative z-10
                                  before:content-[''] before:absolute before:inset-0 before:rounded-full 
                                  before:bg-gradient-to-r ${feature.color} before:blur-md before:opacity-50 
                                  before:transition-opacity before:duration-300 group-hover:before:opacity-80`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-text-heading group-hover:text-[var(--primary-500)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm"> {/* Smaller description text */}
                    {feature.description}
                  </p>
                  {/* Stats */}
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium 
                                  bg-gradient-to-r ${feature.color} text-white
                                  transform group-hover:scale-105 transition-transform duration-300`}>
                    {feature.stats}
                  </div>
                </div>

                {/* Subtle overlay for hover effect (optional, can be removed if not desired with glassmorphism) */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA - More dynamic and engaging */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a href="#" className="inline-flex items-center space-x-3 px-8 py-4 
                                bg-gradient-to-r from-accent-green to-accent-teal 
                                rounded-full text-white font-semibold text-lg 
                                shadow-lg hover:shadow-xl transition-all duration-300 
                                transform hover:-translate-y-1 animate-float animation-delay-1000
                                relative overflow-hidden group">
            <Leaf className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>Learn More About Our Green Initiatives</span>
            {/* Hover glow effect for the button */}
            <span className="absolute inset-0 rounded-full bg-white opacity-0 blur-md 
                             group-hover:opacity-20 transition-opacity duration-300"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilitySection;