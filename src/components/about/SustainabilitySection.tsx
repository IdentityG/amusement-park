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
    <section className="py-24 bg-gradient-to-br from-bg-light via-surface-light-hover to-bg-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-accent-green to-accent-teal animate-spin-slow"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-spin-slow animation-delay-4000"></div>
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 bg-surface-light/60 backdrop-blur-sm rounded-2xl hover:bg-surface-light transition-all duration-500 hover:shadow-2xl hover:scale-105 border border-surface-light-hover/50">
                {/* Icon Container */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-text-heading-light group-hover:text-primary-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {feature.description}
                  </p>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.stats}
                  </div>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-full animate-gradient-xy"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-green to-accent-teal rounded-full text-white font-medium hover:shadow-lg transition-all duration-300 cursor-pointer">
            <Leaf className="w-5 h-5" />
            <span>Learn More About Our Green Initiatives</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilitySection;