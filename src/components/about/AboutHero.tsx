"use client"
import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Html } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';

function AnimatedBubbles() {
  const bubbles = useRef([]);

  useFrame((state) => {
    bubbles.current.forEach((bubble, i) => {
      const time = state.clock.getElapsedTime();
      bubble.position.y = Math.sin(time + i * 0.5) * 2;
      bubble.position.x = Math.cos(time * 0.5 + i) * 1.5;
      bubble.scale.setScalar(1 + 0.2 * Math.sin(time * 2 + i));
    });
  });

  return (
    <>
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 10;
        const y = Math.random() * 4;
        const z = (Math.random() - 0.5) * 10;
        return (
          <mesh key={i} ref={(el) => (bubbles.current[i] = el)} position={[x, y, z]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={`hsl(${Math.random() * 360}, 100%, 70%)`} transparent opacity={0.8} />
          </mesh>
        );
      })}
    </>
  );
}

function DynamicGrid() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1);
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[50, 50, 20, 20]} />
      <meshStandardMaterial color="#00bcd4" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Environment preset="sunset" />
      <Stars radius={50} depth={50} count={5000} factor={4} fade />
      <DynamicGrid />
      <AnimatedBubbles />
    </>
  );
}

const AboutHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={<Html distanceFactor={10}><p>Loading 3D...</p></Html>}>
            <Scene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-300"
        >
          Welcome to AquaMek!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
        >
          The ultimate water and amusement park experience in the heart of adventure!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all"
        >
          Explore the Park
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
        </div>
      </motion.div>
    </main>
  );
}
export default AboutHero;