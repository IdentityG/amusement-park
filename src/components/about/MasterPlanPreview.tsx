"use client"
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MapPin, 
  Building, 
  Gamepad2, 
  UtensilsCrossed, 
  Car,
  Download, // Added for PDF download icon
  ArrowRight
} from 'lucide-react';


const MasterPlanPreview = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  // Placeholder for your PDF URL
  const masterPlanPdfUrl = '/path/to/your/master_plan.pdf'; 

  const zones = [
    {
      id: 'resort',
      name: 'Resort Zone',
      description: 'Luxury accommodations with stunning views',
      position: { x: 25, y: 35 },
      icon: Building,
      color: 'from-primary-400 to-primary-600'
    },
    {
      id: 'indoor-games',
      name: 'Indoor Games',
      description: 'Climate-controlled entertainment complex',
      position: { x: 60, y: 45 },
      icon: Gamepad2,
      color: 'from-secondary-400 to-secondary-600'
    },
    {
      id: 'dining',
      name: 'Dining District',
      description: 'Diverse culinary experiences',
      position: { x: 75, y: 25 },
      icon: UtensilsCrossed,
      color: 'from-accent-yellow to-accent-green'
    },
    {
      id: 'parking',
      name: 'Smart Parking',
      description: 'Automated parking with EV charging',
      position: { x: 15, y: 70 },
      icon: Car,
      color: 'from-accent-purple to-accent-teal'
    }
  ];

  const handleZoneHover = (zoneId: string) => {
    setActiveZone(zoneId);
  };

  const handleZoneLeave = () => {
    setActiveZone(null);
  };

  return (
    <section className="py-24 bg-[var(--background)] relative overflow-hidden">
      {/* Background Animation - More complex and blurred */}
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
          <h2 className="text-h2 gradient-text mb-6">Master Plan Overview</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Explore our comprehensive site design featuring strategic zones for maximum guest experience and operational efficiency.
          </p>
        </motion.div>

        {/* Main Plan Container */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative transform-gpu"
          >
            {/* Map Container - now glassmorphism */}
            <div 
              className={`relative glassmorphism rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ease-in-out`}
              style={{ aspectRatio: '16/10' }}
            >
              {/* Site Illustration Background - Abstract shapes */}
              <div className="absolute inset-0 opacity-70">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-primary-500/10 blur-3xl animate-float"></div>
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-secondary-500/10 blur-3xl animate-float animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-accent-green/10 blur-3xl animate-float animation-delay-2000"></div>
                <div className="absolute top-1/10 left-1/10 w-32 h-32 rounded-full bg-accent-yellow/10 blur-3xl animate-float animation-delay-500"></div>
              </div>

              {/* Zone Hotspots */}
              {zones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="absolute z-10 cursor-pointer"
                  style={{
                    left: `${zone.position.x}%`,
                    top: `${zone.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => handleZoneHover(zone.id)}
                  onMouseLeave={handleZoneLeave}
                >
                  {/* Zone Marker - now glassmorphism with better hover */}
                  <div className={`relative p-3 rounded-full glassmorphism border border-white/20 
                                  shadow-lg transform transition-all duration-300 
                                  ${activeZone === zone.id ? 'scale-125 shadow-2xl border-[var(--primary-500)]' : 'hover:scale-110'}`}>
                    <div className={`p-1 rounded-full bg-gradient-to-r ${zone.color} relative z-10`}>
                      <zone.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${zone.color} opacity-50 animate-ping`}></div>
                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${zone.color} opacity-0 blur-md 
                                  group-hover:opacity-80 transition-opacity duration-300`}></div>
                  </div>

                  {/* Tooltip - now glassmorphism */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: activeZone === zone.id ? 1 : 0,
                      y: activeZone === zone.id ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-3 glassmorphism rounded-xl shadow-xl border border-white/20 min-w-64 pointer-events-none"
                  >
                    <div className="text-center">
                      <h4 className="font-bold text-[var(--text-heading)] mb-1">{zone.name}</h4>
                      <p className="text-sm text-muted">{zone.description}</p>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-white/50"></div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--secondary-400)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--primary-400)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                {zones.map((zone, index) => (
                  zones.slice(index + 1).map((nextZone, nextIndex) => (
                    <motion.line
                      key={`${zone.id}-${nextZone.id}`}
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: 1 + index * 0.2 }}
                      x1={`${zone.position.x}%`}
                      y1={`${zone.position.y}%`}
                      x2={`${nextZone.position.x}%`}
                      y2={`${nextZone.position.y}%`}
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      strokeDasharray="8,8" /* Slightly larger dash */
                      className="animate-pulse-slow"
                    />
                  ))
                ))}
              </svg>
            </div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {zones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}

                  className="flex items-center space-x-3 p-4 glassmorphism rounded-xl border border-white/20 
                             hover:border-[var(--primary-500)] transition-all duration-300 cursor-pointer group"
                  onMouseEnter={() => handleZoneHover(zone.id)}
                  onMouseLeave={handleZoneLeave}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${zone.color} 
                                  group-hover:scale-110 transition-transform duration-300`}>
                    <zone.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-heading)] text-sm 
                                  group-hover:text-[var(--primary-500)] transition-colors">{zone.name}</h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* PDF Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center mt-16"
            >
              <a 
                href={masterPlanPdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--foreground)' }}
                className="inline-flex items-center space-x-3 px-8 py-4 
                           bg-gradient-to-r from-primary-500 to-secondary-500 
                           rounded-full text-white font-semibold text-lg 
                           shadow-lg hover:shadow-xl transition-all duration-300 
                           transform hover:-translate-y-1 animate-float animation-delay-1000
                           relative overflow-hidden group"
              >
                <Download className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
                <span>Download Full Master Plan PDF</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                {/* Hover glow effect for the button */}
                <span className="absolute inset-0 rounded-full bg-white opacity-0 blur-md 
                                 group-hover:opacity-20 transition-opacity duration-300"></span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MasterPlanPreview;