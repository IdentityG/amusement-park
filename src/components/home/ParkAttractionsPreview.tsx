'use client';

import { useRef, useEffect, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, MeshWobbleMaterial, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

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
  HardHat,
  Wrench,
  Cone,
} from 'lucide-react';

// Attraction data
const attractions = [
  {
    id: 1,
    name: "Rocket Coaster",
    icon: Rocket,
    description: "Experience zero-gravity thrills on our space-age roller coaster",
    color: "var(--accent-purple)",
    position: { x: 0, y: 0, z: 0 }
  },
  {
    id: 2,
    name: "Sky Wheel",
    icon: FerrisWheel,
    description: "Touch the clouds in our 200-foot giant observation wheel",
    color: "var(--accent-teal)",
    position: { x: 2, y: 1, z: -1 }
  },
  {
    id: 3,
    name: "Aqua World",
    icon: Waves,
    description: "Dive into our massive water adventure wonderland",
    color: "var(--accent-blue)",
    position: { x: -2, y: -1, z: 1 }
  },
  {
    id: 4,
    name: "Game Galaxy",
    icon: Gamepad2,
    description: "Step into our futuristic arcade and gaming universe",
    color: "var(--accent-green)",
    position: { x: 1, y: -1, z: 0 }
  },
  {
    id: 5,
    name: "Virtual Reality",
    icon: Glasses,
    description: "Enter alternate dimensions with cutting-edge VR technology",
    color: "var(--primary-500)",
    position: { x: -1, y: 1, z: -1 }
  },
  {
    id: 6,
    name: "Speed Circuit",
    icon: Car,
    description: "Race at lightning speed on our professional go-kart track",
    color: "var(--accent-yellow)",
    position: { x: 0, y: 2, z: 1 }
  },
  {
    id: 7,
    name: "Strike Zone",
    icon: RollerCoaster,
    description: "Perfect your aim in our cosmic bowling alley",
    color: "var(--secondary-500)",
    position: { x: 2, y: 0, z: 0 }
  },
  {
    id: 8,
    name: "Free Fall Tower",
    icon: ArrowDownToLine,
    description: "Experience pure adrenaline on our 300-foot drop tower",
    color: "var(--accent-red)",
    position: { x: -2, y: 0, z: -1 }
  },
];

// 3D Floating Elements Component
const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Construction Cones */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Cylinder position={[3, -2, -2]} args={[0.1, 0.2, 0.5]} rotation={[0, 0, 0.2]}>
          <meshStandardMaterial color="#ff6b35" />
        </Cylinder>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Cylinder position={[-3, 1, -3]} args={[0.1, 0.2, 0.5]} rotation={[0, 0, -0.1]}>
          <meshStandardMaterial color="#ff6b35" />
        </Cylinder>
      </Float>

      {/* Floating Spheres */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere position={[4, 2, -1]} args={[0.3]}>
          <MeshWobbleMaterial color="#6366f1" factor={0.5} speed={1} />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <Sphere position={[-4, -1, 2]} args={[0.25]}>
          <MeshWobbleMaterial color="#06b6d4" factor={0.7} speed={1.5} />
        </Sphere>
      </Float>

      {/* Construction Blocks */}
      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.9}>
        <Box position={[2, 3, -2]} args={[0.3, 0.3, 0.3]} rotation={[0.2, 0.3, 0.1]}>
          <meshStandardMaterial color="#f59e0b" />
        </Box>
      </Float>

      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.7}>
        <Box position={[-2, -2, 1]} args={[0.2, 0.4, 0.2]} rotation={[0.1, -0.2, 0.15]}>
          <meshStandardMaterial color="#10b981" />
        </Box>
      </Float>
    </group>
  );
};

// 3D Scene Component
const Scene3D = () => {
  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Suspense fallback={null}>
        <FloatingElements />
      </Suspense>
    </Canvas>
  );
};

const ParkAttractionsPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotateX: -15,
      scale: 0.8 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -20,
      rotateX: 5,
      rotateY: 5,
      scale: 1.05,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -10, 10, 0], 
      scale: 1.2,
      transition: { 
        duration: 0.6, 
        ease: "easeInOut",
        times: [0, 0.3, 0.7, 1]
      } 
    }
  };

  const constructionBadgeVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.1, 1], 
      rotate: [0, 5, -5, 0],
      transition: { 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      } 
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden min-h-screen"
      style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Scene3D />
      </div>

      {/* Construction Theme Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rotate-45" 
             style={{ background: 'var(--accent-yellow)' }}></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full" 
             style={{ background: 'var(--accent-purple)' }}></div>
        <div className="absolute bottom-20 left-32 w-24 h-12 rotate-12" 
             style={{ background: 'var(--accent-teal)' }}></div>
        <div className="absolute bottom-40 right-16 w-14 h-14 rounded-full" 
             style={{ background: 'var(--accent-red)' }}></div>
      </div>

      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(var(--primary-500) 1px, transparent 1px),
                           linear-gradient(90deg, var(--primary-500) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Construction Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, var(--accent-yellow)20, var(--accent-red)20)',
              border: '2px solid var(--accent-yellow)',
              backdropFilter: 'blur(10px)'
            }}
            variants={constructionBadgeVariants}
            initial="initial"
            animate="animate"
          >
            <HardHat size={20} style={{ color: 'var(--accent-yellow)' }} />
            <span 
              className="font-bold text-sm"
              style={{ color: 'var(--accent-yellow)' }}
            >
              UNDER CONSTRUCTION
            </span>
            <Wrench size={16} style={{ color: 'var(--accent-yellow)' }} />
          </motion.div>

          <h2 
            className="font-display font-bold mb-6 text-4xl lg:text-6xl"
            style={{ 
              color: 'var(--text-heading-light)',
              background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            Future Attractions
          </h2>
          
          <motion.p 
            className="max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed"
            style={{ color: 'var(--foreground)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Get ready for an extraordinary adventure! Our world-class attractions are being crafted 
            to deliver unforgettable experiences when we open in 2026.
          </motion.p>
        </motion.div>

        {/* Attractions Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 perspective-1000"
        >
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                background: 'var(--surface)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              custom={index}
            >
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${attraction.color}40, ${attraction.color}10)`
                }}
              />
              
              {/* Card Content */}
              <div className="relative p-6 lg:p-8 flex flex-col items-center text-center h-full min-h-[280px]">
                {/* Floating Icon Container */}
                <motion.div
                  className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mb-6 group-hover:shadow-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${attraction.color}15, ${attraction.color}05)`,
                    border: `2px solid ${attraction.color}30`
                  }}
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <attraction.icon 
                    size={32} 
                    className="lg:w-10 lg:h-10"
                    style={{ color: attraction.color }} 
                  />
                  
                  {/* Pulsing Ring */}
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse opacity-30"
                    style={{ 
                      background: `conic-gradient(from 0deg, ${attraction.color}50, transparent, ${attraction.color}50)`,
                      animation: 'spin 3s linear infinite'
                    }}
                  />
                </motion.div>
                
                {/* Name */}
                <h3 
                  className="font-display font-bold mb-4 text-xl lg:text-2xl"
                  style={{ color: 'var(--foreground)' }}
                >
                  {attraction.name}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-sm lg:text-base leading-relaxed mb-6 flex-grow"
                  style={{ color: 'var(--foreground)' }}
                >
                  {attraction.description}
                </p>
                
                {/* Coming Soon Badge */}
                <motion.div
                  className="mt-auto relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="px-6 py-3 rounded-full text-sm font-bold relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${attraction.color}20, ${attraction.color}10)`,
                      color: attraction.color,
                      border: `2px solid ${attraction.color}30`
                    }}
                  >
                    Opening 2026
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div 
                    className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"
                    style={{ animation: 'shimmer 2s infinite' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/attractions"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white text-lg transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <span className="relative z-10">Explore All Future Attractions</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
              
              {/* Hover Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default ParkAttractionsPreview;