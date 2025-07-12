'use client';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Points, 
  PointMaterial,
  Sphere,
  Float
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

// Particle Fountain Component
const ParticleFountain = ({ position = [0, 0, 0] as [number, number, number] }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;
  
  // Create particle positions
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 0.5;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = (Math.random() - 0.5) * 0.5;
    
    velocities[i3] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 1] = Math.random() * 0.1 + 0.05;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Apply gravity
        velocities[i3 + 1] -= 0.002;
        
        // Reset particles that fall below ground
        if (positions[i3 + 1] < -0.5) {
          positions[i3] = (Math.random() - 0.5) * 0.5;
          positions[i3 + 1] = 0;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.5;
          velocities[i3 + 1] = Math.random() * 0.1 + 0.05;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <PointMaterial
          size={0.02}
          color="#00BFFF"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </Points>
      
      {/* Fountain base */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 16]} />
        <meshStandardMaterial color="#4682B4" />
      </mesh>
    </group>
  );
};

// Advanced Ferris Wheel
const FerrisWheel = () => {
  const wheelRef = useRef<THREE.Group>(null);
  const cabinsRef = useRef<THREE.Group[]>([]);
  
  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += 0.004;
    }
    
    // Keep cabins upright
    cabinsRef.current.forEach((cabin) => {
      if (cabin && wheelRef.current) {
        cabin.rotation.z = -wheelRef.current.rotation.z;
      }
    });
  });

  const wheelRadius = 5;
  const cabinCount = 16;
  const cabins = [];

  for (let i = 0; i < cabinCount; i++) {
    const angle = (i / cabinCount) * Math.PI * 2;
    const x = Math.cos(angle) * wheelRadius;
    const y = Math.sin(angle) * wheelRadius;
    
    cabins.push(
      <Float key={i} speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <group
          position={[x, y, 0] as [number, number, number]}
          ref={(el) => {
            if (el) cabinsRef.current[i] = el;
          }}
        >
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.8, 0.6]} />
            <meshStandardMaterial 
              color={`hsl(${(i * 22.5) % 360}, 80%, 60%)`}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
          
          {/* Glass windows */}
          <mesh position={[0, 0, 0.31] as [number, number, number]}>
            <planeGeometry args={[0.4, 0.5]} />
            <meshPhysicalMaterial
              color="#87CEEB"
              transparent
              opacity={0.3}
              transmission={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      </Float>
    );
  }

  return (
    <group ref={wheelRef} position={[0, 2, 0] as [number, number, number]}>
      {/* Main wheel structure */}
      <mesh castShadow>
        <torusGeometry args={[wheelRadius, 0.2, 16, 64]} />
        <meshStandardMaterial 
          color="#FF6B6B" 
          metalness={0.7} 
          roughness={0.2}
        />
      </mesh>
      
      {/* LED lights around the wheel */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i / 32) * Math.PI * 2;
        const x = Math.cos(angle) * (wheelRadius + 0.3);
        const y = Math.sin(angle) * (wheelRadius + 0.3);
        return (
          <mesh key={`light-${i}`} position={[x, y, 0] as [number, number, number]}>
            <sphereGeometry args={[0.05]} />
            <meshBasicMaterial 
              color={`hsl(${(i * 11.25 + Date.now() * 0.01) % 360}, 100%, 70%)`}
            />
          </mesh>
        );
      })}
      
      {/* Spokes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * (wheelRadius / 2),
              Math.sin(angle) * (wheelRadius / 2),
              0
            ] as [number, number, number]}
            rotation={[0, 0, angle] as [number, number, number]}
            castShadow
          >
            <boxGeometry args={[wheelRadius, 0.1, 0.1]} />
            <meshStandardMaterial color="#4ECDC4" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}
      
      {/* Center hub */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {cabins}
    </group>
  );
};

// Roller Coaster with Curve Animation
const RollerCoaster = () => {
  const carRef = useRef<THREE.Group>(null);
  
  // Create a curve for the track
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-8, -2, -5),
    new THREE.Vector3(-4, 2, -3),
    new THREE.Vector3(0, 4, 0),
    new THREE.Vector3(4, 2, 3),
    new THREE.Vector3(8, -1, 5),
    new THREE.Vector3(6, -3, 2),
    new THREE.Vector3(2, -2, -2),
    new THREE.Vector3(-2, 0, -4),
    new THREE.Vector3(-8, -2, -5)
  ]);
  
  curve.closed = true;
  
  useFrame((state) => {
    if (carRef.current) {
      const time = state.clock.elapsedTime * 0.1;
      const position = curve.getPoint(time % 1);
      const tangent = curve.getTangent(time % 1);
      
      carRef.current.position.copy(position);
      carRef.current.lookAt(position.clone().add(tangent));
    }
  });
  
  // Generate track geometry
  const trackPoints = curve.getPoints(200);
  
  return (
    <group>
      {/* Track using mesh instead of line */}
      {trackPoints.map((point, i) => {
        if (i === trackPoints.length - 1) return null;
        const nextPoint = trackPoints[i + 1];
        const midPoint = point.clone().add(nextPoint).multiplyScalar(0.5);
        const direction = nextPoint.clone().sub(point);
        const length = direction.length();
        
        return (
          <mesh key={i} position={[midPoint.x, midPoint.y, midPoint.z] as [number, number, number]}>
            <boxGeometry args={[0.1, 0.1, length]} />
            <meshStandardMaterial color="#FF4500" />
          </mesh>
        );
      })}
      
      {/* Track supports */}
      {trackPoints.filter((_, i) => i % 20 === 0).map((point, i) => (
        <mesh key={i} position={[point.x, point.y - 2, point.z] as [number, number, number]} castShadow>
          <boxGeometry args={[0.2, 4, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}
      
      {/* Roller coaster car */}
      <group ref={carRef}>
        <mesh castShadow>
          <boxGeometry args={[1, 0.5, 0.8]} />
          <meshStandardMaterial color="#FF1744" metalness={0.5} roughness={0.3} />
        </mesh>
        
        {/* Car details */}
        <mesh position={[0, 0.3, 0] as [number, number, number]} castShadow>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#1976D2" />
        </mesh>
      </group>
    </group>
  );
};

// Enhanced Park Environment
const ParkEnvironment = () => {
  return (
    <group>
      {/* Animated trees */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={0.2} rotationIntensity={0.05} floatIntensity={0.2}>
            <group position={[x, -2, z] as [number, number, number]}>
              {/* Tree trunk */}
              <mesh castShadow>
                <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              
              {/* Tree foliage */}
              <mesh position={[0, 2.5, 0] as [number, number, number]} castShadow>
                <sphereGeometry args={[1.5, 8, 6]} />
                <meshStandardMaterial color="#228B22" />
              </mesh>
            </group>
          </Float>
        );
      })}
      
      {/* Decorative lamp posts */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <group key={i} position={[x, 0, z] as [number, number, number]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
              <meshStandardMaterial color="#2F4F4F" />
            </mesh>
            
            <mesh position={[0, 2.2, 0] as [number, number, number]}>
              <sphereGeometry args={[0.2]} />
              <meshStandardMaterial 
                color="#FFFF00" 
                emissive="#FFFF00" 
                emissiveIntensity={0.5}
              />
            </mesh>
            
            {/* Light glow effect */}
            <pointLight 
              position={[0, 2.2, 0] as [number, number, number]} 
              intensity={0.5} 
              distance={5} 
              color="#FFFF88"
            />
          </group>
        );
      })}
      
      {/* Food stands and attractions */}
      <group position={[10, -3, 8] as [number, number, number]}>
        <mesh castShadow>
          <boxGeometry args={[2, 2, 1.5]} />
          <meshStandardMaterial color="#FF6347" />
        </mesh>
        <mesh position={[0, 1.5, 0] as [number, number, number]} castShadow>
          <coneGeometry args={[1.2, 1, 8]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
      </group>
      
      {/* Carousel */}
      <Float speed={0.1} rotationIntensity={0.02} floatIntensity={0.1}>
        <group position={[-12, -3, -8] as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[3, 3, 0.5, 16]} />
            <meshStandardMaterial color="#FFB6C1" />
          </mesh>
          <mesh position={[0, 1.5, 0] as [number, number, number]} castShadow>
            <coneGeometry args={[3.5, 2, 8]} />
            <meshStandardMaterial color="#FF69B4" />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

// Main 3D Scene
const ThreeScene = () => {
  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset="sunset" background={false} />
      
      {/* Custom lighting setup */}
      <ambientLight intensity={0.3} color="#FFF8DC" />
      <directionalLight
        position={[20, 20, 15] as [number, number, number]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        color="#FFE4B5"
      />
      
      {/* Atmospheric lights */}
      <pointLight position={[0, 10, 10] as [number, number, number]} intensity={1} color="#FF69B4" distance={20} />
      <pointLight position={[-15, 5, -10] as [number, number, number]} intensity={0.8} color="#00CED1" distance={15} />
      <pointLight position={[15, 8, -5] as [number, number, number]} intensity={0.9} color="#FFD700" distance={12} />
      
      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#87CEEB', 30, 100]} />
      
      {/* Camera with smooth movement */}
      <PerspectiveCamera makeDefault position={[15, 8, 15] as [number, number, number]} fov={70} />
      
      {/* Main Attractions */}
      <FerrisWheel />
      <RollerCoaster />
      <ParticleFountain position={[8, -4, 5] as [number, number, number]} />
      <ParticleFountain position={[-8, -4, -5] as [number, number, number]} />
      <ParkEnvironment />
      
      {/* Ground */}
      <mesh position={[0, -5, 0] as [number, number, number]} rotation={[-Math.PI / 2, 0, 0] as [number, number, number]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial 
          color="#90EE90" 
          roughness={0.8}
        />
      </mesh>
      
      {/* Pathways */}
      <mesh position={[0, -4.95, 0] as [number, number, number]} rotation={[-Math.PI / 2, 0, 0] as [number, number, number]}>
        <planeGeometry args={[3, 60]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      <mesh position={[0, -4.95, 0] as [number, number, number]} rotation={[-Math.PI / 2, 0, Math.PI / 2] as [number, number, number]}>
        <planeGeometry args={[3, 60]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      
      {/* Sky elements */}
      <Sphere args={[3]} position={[0, 30, -30] as [number, number, number]}>
        <meshStandardMaterial 
          color="#FFFF00" 
          emissive="#FFFF00" 
          emissiveIntensity={0.4}
        />
      </Sphere>
      
      {/* Animated clouds */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={0.1} rotationIntensity={0.02} floatIntensity={0.3}>
          <mesh position={[
            i * 12 - 24, 
            20 + Math.random() * 5, 
            -20 - Math.random() * 15
          ] as [number, number, number]}>
            <sphereGeometry args={[
              2 + Math.random() * 2, 
              1 + Math.random(), 
              2 + Math.random()
            ]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
        </Float>
      ))}
      
      {/* Enhanced camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.2}
        maxDistance={35}
        minDistance={10}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 8}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  );
};

// Enhanced Loading Component
const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-white text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-8xl mb-6"
        >
          🎡
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-medium mb-2"
        >
          Loading Magical Experience...
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto max-w-xs"
        />
      </div>
    </div>
  );
};

// Fallback Component
const FallbackBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/70 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-9xl mb-6"
          >
            🎠
          </motion.div>
          <p className="text-lg">3D Experience Unavailable</p>
          <p className="text-sm opacity-75">Enjoying the magic in 2D</p>
        </div>
      </div>
    </div>
  );
};

// Main Hero Component
const AboutHero = () => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Enhanced WebGL detection
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
    
    // Realistic loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        mass: 1
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.08,
      y: -5,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      y: 0
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
      {/* Enhanced 3D Background */}
      {webglSupported ? (
        <div className="absolute inset-0">
          <Canvas
            shadows
            className="w-full h-full"
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance'
            }}
            onCreated={({ gl }) => {
              gl.setClearColor('#87CEEB');
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.2;
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

      {/* Enhanced overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20" />

      {/* Enhanced Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Enhanced Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
          >
            Adventure Awaits at{' '}
            <motion.span 
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              ThrillerPark
            </motion.span>
            !
          </motion.h1>

          {/* Enhanced Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            The ultimate destination for{' '}
            <span className="text-pink-300 font-semibold">thrill-seekers</span>{' '}
            and{' '}
            <span className="text-cyan-300 font-semibold">dreamers</span>
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/attractions"
                className="group inline-flex items-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 min-w-[250px] justify-center relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center">
                  🎢 Explore Attractions
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link
                href="/tickets"
                className="group inline-flex items-center px-10 py-5 text-xl font-bold text-purple-700 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 min-w-[250px] justify-center relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center">
                  🎫 Buy Tickets
                  <motion.span
                    className="ml-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-white/90"
          >
            <motion.p 
              className="text-lg sm:text-xl font-medium mb-4"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(255, 255, 255, 0.5)',
                  '0 0 20px rgba(255, 105, 180, 0.5)',
                  '0 0 10px rgba(255, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌟 Grand Opening: Summer 2024 🌟
            </motion.p>
            <p className="text-sm sm:text-base opacity-80">
              Experience the future of entertainment with cutting-edge attractions
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer hover:text-white transition-colors"
        >
          <span className="text-sm mb-3 font-medium">Scroll to explore more</span>
          <motion.svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutHero;