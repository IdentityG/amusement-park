'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Construction, Magnet, Waves, ShoppingBag, Hotel, Gamepad2 } from 'lucide-react';

// CountUp animation component
const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    if (isInView) {
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);
  
  return <span ref={nodeRef}>{count}{suffix}</span>;
};

// Stat card component
const StatCard = ({ icon: Icon, title, value, suffix = '', delay = 0 }) => {
  return (
    <motion.div 
      className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-surface-light-hover dark:border-surface-dark-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
          <Icon size={24} />
        </div>
        <h3 className="ml-4 text-xl font-semibold">{title}</h3>
      </div>
      
      <div className="text-3xl md:text-4xl font-bold text-secondary-500">
        <CountUp end={value} suffix={suffix} />
      </div>
    </motion.div>
  );
};

const ParkStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate the section background
    gsap.to(".stats-bg-gradient", {
      backgroundPosition: "100% 100%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="stats-bg-gradient absolute inset-0 bg-gradient-to-br from-bg-light to-surface-light dark:from-bg-dark dark:to-surface-dark bg-[length:200%_200%] bg-[position:0%_0%] z-0" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Park Overview
          </motion.h2>
          
          <motion.p 
            className="text-xl max-w-3xl mx-auto text-text-body-light dark:text-text-body-dark"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Mekiya by the numbers - a world-class entertainment destination taking shape in Addis Ababa
          </motion.p>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <StatCard 
            icon={MapPin} 
            title="Site Size" 
            value={145000} 
            suffix=" m²" 
            delay={0.1} 
          />
          
          <StatCard 
            icon={Construction} 
            title="Construction Started" 
            value={2025} 
            suffix="" 
            delay={0.2} 
          />
          
          <StatCard 
            icon={Magnet} 
            title="Attractions" 
            value={20} 
            suffix="+ zones" 
            delay={0.3} 
          />
          
          <StatCard 
            icon={Waves} 
            title="Water Park Area" 
            value={15000} 
            suffix=" m²" 
            delay={0.4} 
          />
          
          <StatCard 
            icon={Gamepad2} 
            title="Indoor Games" 
            value={35} 
            suffix="+" 
            delay={0.5} 
          />
          
          <StatCard 
            icon={ShoppingBag} 
            title="Shopping & Dining" 
            value={40} 
            suffix="+ outlets" 
            delay={0.6} 
          />
        </div>
        
        {/* Feature highlight */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 17h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z" />
                  <path d="M4 9v6" />
                  <path d="M20 9v6" />
                  <path d="M12 6V2" />
                  <path d="M12 22v-4" />
                </svg>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Flagship: Iconic Roller Coaster</h3>
              <p className="text-white/80 text-lg md:text-xl">
                Experience the thrill of Ethiopia's tallest and fastest roller coaster, featuring a 90-meter drop 
                and speeds of up to 120 km/h. A landmark attraction that will define the Mekiya skyline.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParkStats;