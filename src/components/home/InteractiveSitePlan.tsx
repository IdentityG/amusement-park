'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Eye,
  Navigation,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Enhanced park zones data
const parkZones = [
  {
    id: 1,
    name: "Grand Entrance Plaza",
    status: "under-construction",
    description: "Welcome pavilion with digital displays, ticketing kiosks, and visitor information center",
    position: { x: 50, y: 15 },
    icon: Info,
    progress: 75,
    expectedCompletion: "Q2 2025"
  },
  {
    id: 2,
    name: "Adrenaline Heights",
    status: "future",
    description: "Extreme thrill rides including the Sky Rocket coaster and Zero-G spinner",
    position: { x: 25, y: 40 },
    icon: Rocket,
    progress: 0,
    expectedCompletion: "Q4 2025"
  },
  {
    id: 3,
    name: "Splash Kingdom",
    status: "future",
    description: "Water wonderland with wave pools, lazy river, and high-speed slides",
    position: { x: 75, y: 45 },
    icon: Waves,
    progress: 0,
    expectedCompletion: "Q1 2026"
  },
  {
    id: 4,
    name: "Wonder Valley",
    status: "future",
    description: "Family-friendly attractions with gentle rides and interactive experiences",
    position: { x: 60, y: 30 },
    icon: FerrisWheel,
    progress: 0,
    expectedCompletion: "Q3 2025"
  },
  {
    id: 5,
    name: "Flavors Boulevard",
    status: "future",
    description: "Global food court with themed restaurants and outdoor dining areas",
    position: { x: 40, y: 70 },
    icon: Utensils,
    progress: 0,
    expectedCompletion: "Q2 2026"
  },
  {
    id: 6,
    name: "Treasure Marketplace",
    status: "future",
    description: "Shopping district with themed boutiques and souvenir collections",
    position: { x: 65, y: 75 },
    icon: ShoppingBag,
    progress: 0,
    expectedCompletion: "Q2 2026"
  },
  {
    id: 7,
    name: "Digital Arena",
    status: "future",
    description: "Indoor gaming complex with VR experiences and digital attractions",
    position: { x: 30, y: 60 },
    icon: Gamepad2,
    progress: 0,
    expectedCompletion: "Q4 2025"
  },
  {
    id: 8,
    name: "Command Center",
    status: "active",
    description: "Construction headquarters with visitor viewing deck and progress displays",
    position: { x: 50, y: 50 },
    icon: Construction,
    progress: 100,
    expectedCompletion: "Active"
  },
];

const InteractiveSitePlan = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeZone, setActiveZone] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'overview'>('interactive');
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;

    if (!section || !map) return;

    // Main container animation (GSAP)
    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Map container reveal (GSAP)
    gsap.fromTo(
      map,
      { 
        opacity: 0, 
        scale: 0.95,
        rotateX: -15
      },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setScale(1);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: '#10B981',
          label: 'Active Zone',
          bgColor: 'rgba(16, 185, 129, 0.1)',
          pulse: true
        };
      case 'under-construction':
        return {
          color: '#F59E0B',
          label: 'Under Construction',
          bgColor: 'rgba(245, 158, 11, 0.1)',
          pulse: false
        };
      case 'future':
        return {
          color: '#8B5CF6',
          label: 'Coming Soon',
          bgColor: 'rgba(139, 92, 246, 0.1)',
          pulse: false
        };
      default:
        return {
          color: '#6B7280',
          label: 'Planned',
          bgColor: 'rgba(107, 114, 128, 0.1)',
          pulse: false
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const pinVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      rotateY: -90
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: { 
      scale: 1.15,
      z: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`py-16 lg:py-24 relative overflow-hidden transition-all duration-500 ${
        isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : ''
      }`}
      style={{
        background: isFullscreen 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f1f5f9 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5 animate-pulse"
             style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-5 animate-pulse delay-1000"
             style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full opacity-5 animate-pulse delay-2000"
             style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ 
              background: 'rgba(139, 92, 246, 0.1)',
              color: '#8B5CF6',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Navigation size={16} />
            <span className="text-sm font-semibold">Interactive Experience</span>
          </motion.div>
          
          <h2 
            className="font-display font-bold mb-4 text-4xl lg:text-5xl"
            style={{ 
              background: 'linear-gradient(135deg, #8B5CF6, #10B981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Explore Our Vision
          </h2>
          <p 
            className="max-w-2xl mx-auto text-lg opacity-80"
            style={{ color: isFullscreen ? '#e2e8f0' : '#64748b' }}
          >
            Navigate through our interactive site plan to discover the exciting zones and attractions coming to life.
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
            <motion.button 
              onClick={handleZoomIn}
              className="p-2 rounded-full transition-all duration-300"
              style={{ 
                background: scale >= 2 ? '#e2e8f0' : '#8B5CF6',
                color: scale >= 2 ? '#64748b' : 'white'
              }}
              whileHover={{ scale: scale < 2 ? 1.1 : 1 }}
              whileTap={{ scale: scale < 2 ? 0.95 : 1 }}
              disabled={scale >= 2}
            >
              <ZoomIn size={18} />
            </motion.button>
            
            <motion.button 
              onClick={handleZoomOut}
              className="p-2 rounded-full transition-all duration-300"
              style={{ 
                background: scale <= 0.6 ? '#e2e8f0' : '#8B5CF6',
                color: scale <= 0.6 ? '#64748b' : 'white'
              }}
              whileHover={{ scale: scale > 0.6 ? 1.1 : 1 }}
              whileTap={{ scale: scale > 0.6 ? 0.95 : 1 }}
              disabled={scale <= 0.6}
            >
              <ZoomOut size={18} />
            </motion.button>
            
            <motion.button 
              onClick={handleResetZoom}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={18} color="#64748b" />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
            <motion.button 
              onClick={() => setViewMode(viewMode === 'interactive' ? 'overview' : 'interactive')}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ 
                background: viewMode === 'interactive' ? '#10B981' : '#e2e8f0',
                color: viewMode === 'interactive' ? 'white' : '#64748b'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={16} className="mr-2 inline" />
              {viewMode === 'interactive' ? 'Interactive' : 'Overview'}
            </motion.button>
            
            <motion.button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFullscreen ? <Minimize2 size={18} color="#64748b" /> : <Maximize2 size={18} color="#64748b" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Interactive Map Container */}
        <div className="flex-1 relative max-w-7xl mx-auto w-full">
          <motion.div 
            ref={mapRef}
            className="relative aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              transform: `scale(${scale})`,
              transformOrigin: 'center center'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, #8B5CF6 0%, transparent 50%),
                  radial-gradient(circle at 75% 25%, #10B981 0%, transparent 50%),
                  radial-gradient(circle at 25% 75%, #F59E0B 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, #EF4444 0%, transparent 50%)
                `,
                backgroundSize: '50% 50%',
                backgroundPosition: '0% 0%, 100% 0%, 0% 100%, 100% 100%',
                backgroundRepeat: 'no-repeat'
              }}></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Zone Pins */}
            <motion.div
              className="absolute inset-0"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {parkZones.map((zone) => {
                const config = getStatusConfig(zone.status);
                return (
                  <motion.div
                    key={zone.id}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${zone.position.x}%`,
                      top: `${zone.position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: activeZone === zone.id ? 30 : 20
                    }}
                    variants={pinVariants}
                    whileHover="hover"
                    onHoverStart={() => setActiveZone(zone.id)}
                    onHoverEnd={() => setActiveZone(null)}
                  >
                    {/* Pin Container */}
                    <div className="relative">
                      {/* Pulse Effect for Active Zones */}
                      {config.pulse && (
                        <div 
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{ 
                            background: config.color,
                            opacity: 0.3,
                            transform: 'scale(1.5)'
                          }}
                        />
                      )}

                      {/* Main Pin */}
                      <motion.div 
                        className="relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                        style={{ 
                          background: `${config.bgColor}`,
                          border: `3px solid ${config.color}`,
                          boxShadow: `
                            0 0 0 4px ${config.color}20,
                            0 8px 25px rgba(0, 0, 0, 0.3),
                            inset 0 1px 0 rgba(255, 255, 255, 0.2)
                          `
                        }}
                        whileHover={{ 
                          boxShadow: `
                            0 0 0 8px ${config.color}30,
                            0 12px 35px rgba(0, 0, 0, 0.4),
                            inset 0 1px 0 rgba(255, 255, 255, 0.3)
                          `
                        }}
                      >
                        <zone.icon size={20} color={config.color} />
                      </motion.div>

                      {/* Zone Label */}
                      <motion.div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                        style={{ 
                          background: 'rgba(0, 0, 0, 0.8)',
                          color: 'white',
                          backdropFilter: 'blur(8px)'
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {zone.name}
                      </motion.div>
                    </div>

                    {/* Enhanced Tooltip */}
                    <AnimatePresence>
                      {activeZone === zone.id && (
                        <motion.div 
                          className="absolute w-72 p-4 rounded-xl shadow-2xl z-40"
                          style={{ 
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            marginTop: '20px'
                          }}
                          variants={tooltipVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {/* Arrow */}
                          <div 
                            className="absolute w-4 h-4 transform rotate-45"
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.95)',
                              top: '-8px',
                              left: '50%',
                              marginLeft: '-8px',
                              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                              borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                          />
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-gray-900">{zone.name}</h4>
                              <div 
                                className="px-2 py-1 rounded-full text-xs font-semibold"
                                style={{ 
                                  background: config.bgColor,
                                  color: config.color
                                }}
                              >
                                {config.label}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {zone.description}
                            </p>
                            
                            {zone.status !== 'active' && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-500">Progress</span>
                                  <span className="font-semibold text-gray-700">{zone.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div 
                                    className="h-2 rounded-full"
                                    style={{ background: config.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${zone.progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                                <div className="text-xs text-gray-500">
                                  Expected: {zone.expectedCompletion}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Compass & Info Panel */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              <motion.div 
                className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <Compass size={20} color="#e2e8f0" />
              </motion.div>
              
              <motion.div 
                className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                Scale: {Math.round(scale * 100)}%
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Legend */}
        <motion.div 
          className="mt-8 p-6 rounded-2xl backdrop-blur-sm"
          style={{ 
            background: isFullscreen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 
            className="font-bold text-lg mb-4 text-center"
            style={{ color: isFullscreen ? '#e2e8f0' : '#1f2937' }}
          >
            Zone Status Legend
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { status: 'active', label: 'Active Zone', count: 1 },
              { status: 'under-construction', label: 'Under Construction', count: 1 },
              { status: 'future', label: 'Coming Soon', count: 6 }
            ].map((item, index) => {
              const config = getStatusConfig(item.status);
              return (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm"
                  style={{ 
                    background: config.bgColor,
                    border: `1px solid ${config.color}30`
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ 
                        background: config.color,
                        boxShadow: `0 0 0 3px ${config.color}20`
                      }}
                    >
                      {config.pulse && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: isFullscreen ? '#e2e8f0' : '#374151' }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span 
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ 
                      background: config.color,
                      color: 'white'
                    }}
                  >
                    {item.count}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSitePlan;