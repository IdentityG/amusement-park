"use client"
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MapPin, 
  ZoomIn, 
  Building, 
  Gamepad2, 
  UtensilsCrossed, 
  Car,
} from 'lucide-react';

// Master Plan Component
const MasterPlanPreview = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

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

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-bg-light to-surface-light-hover relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-accent-yellow to-accent-green animate-pulse-slow animation-delay-2000"></div>
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
            className="relative"
          >
            {/* Map Container */}
            <div 
              className={`relative bg-gradient-to-br from-surface-light via-surface-light-hover to-surface-light rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ease-in-out ${
                isZoomed ? 'scale-110' : 'scale-100'
              }`}
              style={{ aspectRatio: '16/10' }}
            >
              {/* Zoom Control */}
              <button
                onClick={toggleZoom}
                className="absolute top-6 right-6 z-20 p-3 bg-surface-light/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-surface-light transition-all duration-300 group"
              >
                <ZoomIn className="w-6 h-6 text-text-body-light group-hover:scale-110 transition-transform" />
              </button>

              {/* Site Illustration Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 via-secondary-500/10 to-primary-500/20">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-accent-green/40 to-accent-teal/40 animate-float"></div>
                  <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-primary-400/40 to-secondary-400/40 animate-float animation-delay-1000"></div>
                </div>
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
                  {/* Zone Marker */}
                  <div className={`relative p-4 rounded-full bg-gradient-to-r ${zone.color} shadow-lg transform transition-all duration-300 ${
                    activeZone === zone.id ? 'scale-125 shadow-2xl' : 'hover:scale-110'
                  }`}>
                    <zone.icon className="w-8 h-8 text-white" />
                    
                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${zone.color} opacity-50 animate-ping`}></div>
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: activeZone === zone.id ? 1 : 0,
                      y: activeZone === zone.id ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-3 bg-surface-light/95 backdrop-blur-sm rounded-xl shadow-xl border border-surface-light-hover min-w-64 pointer-events-none"
                  >
                    <div className="text-center">
                      <h4 className="font-bold text-text-heading-light mb-1">{zone.name}</h4>
                      <p className="text-sm text-muted">{zone.description}</p>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-surface-light/95"></div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--secondary-400)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--primary-400)" stopOpacity="0.3" />
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
                      strokeDasharray="5,5"
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
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {zones.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-surface-light/50 backdrop-blur-sm rounded-xl hover:bg-surface-light-hover transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => handleZoneHover(zone.id)}
                  onMouseLeave={handleZoneLeave}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${zone.color}`}>
                    <zone.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-heading-light text-sm">{zone.name}</h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MasterPlanPreview;