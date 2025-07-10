'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

const ProjectVision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });
    
    tl.from(".vision-text", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    });
    
    // Parallax effect for the quote block
    if (quoteRef.current) {
      gsap.to(quoteRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-surface-light dark:bg-surface-dark relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-400 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary-400 blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left column - Vision text */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.h2 
                variants={itemVariants}
                className="vision-text text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text"
              >
                Our Vision
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="vision-text text-lg md:text-xl leading-relaxed"
              >
                The Mekiya Project aims to create Ethiopia's premier entertainment destination, 
                combining world-class attractions with cultural experiences that celebrate the rich 
                heritage of Addis Ababa and beyond.
              </motion.p>
              
              <motion.p 
                variants={itemVariants}
                className="vision-text text-lg md:text-xl leading-relaxed"
              >
                We envision a place where families create lasting memories, where innovation meets 
                tradition, and where the spirit of Ethiopia comes alive through immersive experiences.
              </motion.p>
            </motion.div>
          </div>
          
          {/* Right column - Quote block */}
          <div ref={quoteRef} className="relative">
            <div className="absolute -top-10 -left-10 text-primary-500 opacity-20">
              <Quote size={120} />
            </div>
            
            <motion.div 
              className="bg-surface-light-hover dark:bg-surface-dark-hover p-8 md:p-12 rounded-xl shadow-xl relative z-10 border-l-4 border-primary-500"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-xl md:text-2xl italic font-medium mb-6 text-text-heading-light dark:text-text-heading-dark">
                "We're not just building an amusement park; we're creating a landmark that will 
                redefine entertainment in East Africa and put Ethiopia on the global map of 
                must-visit destinations."
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <p className="font-bold">Mekiya Foundation</p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Project Visionaries</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectVision;