'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

// Ferris Wheel Component
const FerrisWheel = () => {
  const wheelRef = useRef<THREE.Group>(null);
  const cabinsRef = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    if (wheelRef.current) {
      // Rotate the main wheel slowly
      wheelRef.current.rotation.z += 0.005;
    }
    
    // Keep cabins upright
    cabinsRef.current.forEach((cabin, index) => {
      if (cabin) {
        cabin.rotation.z = -wheelRef.current!.rotation.z;
      }
    });
  });

  // Create wheel structure
  const wheelRadius = 3;
  const cabinCount = 8;
  const cabins = [];

  for (let i = 0; i < cabinCount; i++) {
    const angle = (i / cabinCount) * Math.PI * 2;
    const x = Math.cos(angle) * wheelRadius;
    const y = Math.sin(angle) * wheelRadius;
    
    cabins.push(
      <group
        key={i}
        position={[x, y, 0]}
        ref={(el) => {
          if (el) cabinsRef.current[i] = el;
        }}
      >
        {/* Cabin */}
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.3]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        {/* Cabin windows */}
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#87ceeb" transparent opacity={0.7} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={wheelRef}>
      {/* Main wheel structure */}
      <mesh>
        <torusGeometry args={[wheelRadius, 0.1, 8, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      {/* Spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * (wheelRadius / 2),
              Math.sin(angle) * (wheelRadius / 2),
              0
            ]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[wheelRadius, 0.05, 0.05]} />
            <meshStandardMaterial color="#45b7d1" />
          </mesh>
        );
      })}
      
      {/* Center hub */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#96ceb4" />
      </mesh>
      
      {/* Cabins */}
      {cabins}
    </group>
  );
};

// Support structure for the Ferris wheel
const FerrisWheelSupport = () => {
  return (
    <group>
      {/* Left support */}
      <mesh position={[-2, -2, 0]}>
        <boxGeometry args={[0.2, 4, 0.2]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      
      {/* Right support */}
      <mesh position={[2, -2, 0]}>
        <boxGeometry args={[0.2, 4, 0.2]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[5, 0.3, 1]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      
      {/* Cross beams */}
      <mesh position={[-1, -1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.8, 0.1, 0.1]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      <mesh position={[1, -1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[2.8, 0.1, 0.1]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
    </group>
  );
};

// Three.js Scene Component
const ThreeScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6b6b" />
      
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[8, 2, 8]} fov={60} />
      
      {/* Ferris Wheel */}
      <FerrisWheel />
      <FerrisWheelSupport />
      
      {/* Ground */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2ecc71" />
      </mesh>
      
      {/* Background elements */}
      <mesh position={[-8, 2, -5]}>
        <coneGeometry args={[1, 3, 8]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      <mesh position={[8, 1, -3]}>
        <coneGeometry args={[0.8, 2.5, 8]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      
      {/* Controls (hidden but functional) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Fallback component
const FallbackBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/50 text-center">
          <div className="text-6xl mb-4">🎡</div>
          <p className="text-sm">3D Scene Loading...</p>
        </div>
      </div>
    </div>
  );
};

// Loading component
const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="text-white text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl mb-4"
        >
          🎡
        </motion.div>
        <p className="text-lg font-medium">Loading magical experience...</p>
      </div>
    </div>
  );
};

// Main Hero Component
const Hero = () => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Three.js Background */}
      {webglSupported ? (
        <div className="absolute inset-0">
          <Canvas
            shadows
            className="w-full h-full"
            onCreated={({ gl }) => {
              gl.setClearColor('#87CEEB');
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            <Suspense fallback={null}>
              <ThreeScene />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <FallbackBackground />
      )}

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Adventure Awaits at{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              MagicPark
            </span>
            !
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Opening Soon – Where Imagination Comes Alive
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/attractions"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] justify-center"
              >
                🎢 Explore Attractions
              </Link>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/tickets"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] justify-center"
              >
                🎫 Buy Tickets
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-white/80"
          >
            <p className="text-sm sm:text-base">
              🌟 Grand Opening: Summer 2024 🌟
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;