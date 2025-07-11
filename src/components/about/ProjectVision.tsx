'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Quote, Sparkles, Globe, Heart, Target, Lightbulb } from 'lucide-react';

const ProjectVision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / 20);
        mouseY.set((e.clientY - centerY) / 20);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 px-4 relative overflow-hidden bg-gradient-to-br from-[var(--bg-light)] via-[var(--surface-light)] to-[var(--bg-light)]"
      style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}
     >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] opacity-10 blur-xl"
          variants={glowVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-gradient-to-l from-[var(--accent-purple)] to-[var(--accent-teal)] opacity-10 blur-xl"
          variants={glowVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[var(--accent-yellow)] to-[var(--accent-green)] opacity-20 blur-lg"
          variants={glowVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
        />
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-6 h-6 border-2 border-[var(--primary-500)] opacity-30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-[var(--secondary-500)] opacity-40 rounded-full"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Interactive cursor glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 90, 95, 0.05), transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column - Vision Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Header with animated icons */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-4 mb-8"
            >
              <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="w-8 h-8 text-[var(--primary-500)]" />
                <Target className="w-8 h-8 text-[var(--secondary-500)]" />
                <Lightbulb className="w-8 h-8 text-[var(--accent-yellow)]" />
              </motion.div>
              <div className="h-px bg-gradient-to-r from-[var(--primary-500)] to-transparent flex-1" />
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block text-[var(--text-heading)]">Our</span>
              <span className="block bg-gradient-to-r from-[var(--primary-500)] via-[var(--secondary-500)] to-[var(--accent-purple)] text-transparent bg-clip-text bg-[length:200%_200%] animate-gradient-xy">
                Vision
              </span>
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--text-body)] font-medium">
                The Mekiya Project aims to create Ethiopia's premier entertainment destination, 
                combining world-class attractions with cultural experiences that celebrate the rich 
                heritage of Addis Ababa and beyond.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-[var(--text-muted)]">
                We envision a place where families create lasting memories, where innovation meets 
                tradition, and where the spirit of Ethiopia comes alive through immersive experiences.
              </p>
            </motion.div>

            {/* Vision pillars */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
            >
              {[
                { icon: Heart, title: "Heritage", color: "primary" },
                { icon: Globe, title: "Innovation", color: "secondary" },
                { icon: Sparkles, title: "Experience", color: "accent" }
              ].map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="flex items-center space-x-3 p-4 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-light-hover)] dark:hover:bg-[var(--surface-dark-hover)] transition-all duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                  background: 'var(--surface)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    pillar.color === 'primary' ? 'bg-[var(--primary-500)]/20 text-[var(--primary-500)]' :
                    pillar.color === 'secondary' ? 'bg-[var(--secondary-500)]/20 text-[var(--secondary-500)]' :
                    'bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon size={20} />
                  </div>
                  <span className="font-semibold text-[var(--text-heading)]">{pillar.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Column - Quote Block */}
          <motion.div 
            className="relative"
            style={{ x, y }}
          >
            {/* Floating quote icon */}
            <motion.div 
              className="absolute -top-16 -left-16 text-[var(--primary-500)] opacity-20 z-0"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Quote size={160} />
            </motion.div>
            
            {/* Main quote card */}
            <motion.div 
              className="relative z-10 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-light-hover)] dark:to-[var(--surface-dark-hover)] p-8 md:p-12 rounded-3xl shadow-2xl border border-[var(--primary-500)]/20"
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 50, rotateY: 15 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--primary-500)]/10 to-[var(--secondary-500)]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--accent-teal)]/10 to-[var(--accent-purple)]/10 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <motion.p 
                  className="text-xl md:text-2xl italic font-medium mb-8 text-[var(--text-heading)] leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  "We're not just building an amusement park; we're creating a landmark that will 
                  redefine entertainment in East Africa and put Ethiopia on the global map of 
                  must-visit destinations."
                </motion.p>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    M
                  </motion.div>
                  <div className="ml-6">
                    <p className="font-bold text-lg text-[var(--text-heading)]">Mekiya Foundation</p>
                    <p className="text-[var(--text-muted)] text-sm">Project Visionaries</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectVision;