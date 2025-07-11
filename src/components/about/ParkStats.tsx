'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Construction,
  Magnet,
  Waves,
  ShoppingBag,
  Hotel,
  Gamepad2,
  Star,
  Clock,
  Users,
  LucideIcon,
} from 'lucide-react';

// Props for CountUp component
interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

// CountUp animation component with improved animation
const CountUp: React.FC<CountUpProps> = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.3 });

  useEffect(() => {
    let startTime: number | undefined;
    let animationFrame: number | undefined;

    if (isInView) {
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);

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

  return <span ref={nodeRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Props for StatCard component
interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  gradient?: boolean;
}

// Enhanced stat card component with glassmorphism effect
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, suffix = '', prefix = '', delay = 0, gradient = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.set(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      duration: 0.3,
      rotateX: rotateX,
      rotateY: rotateY,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      duration: 0.5,
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative group cursor-pointer transform-gpu
        ${gradient ? 
          'bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] text-white' : 
          'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-600 shadow-lg dark:shadow-gray-900/50'
        }
        rounded-2xl p-8 hover:shadow-2xl 
        transition-all duration-500 hover:-translate-y-2
        overflow-hidden
      `}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-500)]/10 to-[var(--secondary-500)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[var(--primary-500)]/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div
            className={`
              w-16 h-16 rounded-2xl flex items-center justify-center
              ${gradient ? 
                'bg-white/20 backdrop-blur-sm' : 
                'bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)]'
              }
              shadow-lg transform group-hover:scale-110 transition-transform duration-300
            `}
          >
            <Icon size={28} className={gradient ? 'text-white' : 'text-white'} />
          </div>
          <div className="ml-4">
            <h3
              className={`
                text-xl font-bold
                ${gradient ? 'text-white' : 'text-white dark:text-white'}
              `}
            >
              {title}
            </h3>
          </div>
        </div>

        <div
          className={`
            text-4xl md:text-5xl font-black mb-2
            ${gradient ? 'text-white' : 'gradient-text'}
            transition-all duration-300 group-hover:scale-105
          `}
        >
          <CountUp end={value} suffix={suffix} prefix={prefix} />
        </div>

        <div
          className={`
            w-full h-1 rounded-full overflow-hidden
            ${gradient ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'}
          `}
        >
          <div
            className={`
              h-full rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000
              ${gradient ? 'bg-white/40' : 'bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)]'}
            `}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Props for FloatingElement component
interface FloatingElementProps {
  className: string;
  delay?: number;
}

// Floating element component for background decoration
const FloatingElement: React.FC<FloatingElementProps> = ({ className, delay = 0 }) => (
  <div
    className={`absolute w-4 h-4 rounded-full opacity-20 animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  />
);

// Main component
const ParkStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onEnter: () => setIsVisible(true),
        onLeave: () => setIsVisible(false),
        onEnterBack: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      },
    });

    tl.to('.stats-bg-gradient', {
      backgroundPosition: '100% 100%',
      duration: 1,
    }).to(
      '.floating-shapes',
      {
        y: -50,
        rotation: 360,
        duration: 1,
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const statsData = [
    {
      icon: MapPin,
      title: 'Site Size',
      value: 145000,
      suffix: ' m²',
      delay: 0.1,
    },
    {
      icon: Construction,
      title: 'Construction Started',
      value: 2025,
      suffix: '',
      delay: 0.2,
    },
    {
      icon: Magnet,
      title: 'Attractions',
      value: 20,
      suffix: '+ zones',
      delay: 0.3,
    },
    {
      icon: Waves,
      title: 'Water Park Area',
      value: 15000,
      suffix: ' m²',
      delay: 0.4,
    },
    {
      icon: Gamepad2,
      title: 'Indoor Games',
      value: 35,
      suffix: '+',
      delay: 0.5,
    },
    {
      icon: ShoppingBag,
      title: 'Shopping & Dining',
      value: 40,
      suffix: '+ outlets',
      delay: 0.6,
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div
        className="stats-bg-gradient absolute inset-0 bg-gradient-to-br from-[var(--bg-light)] via-[var(--surface-light)] to-[var(--surface-light-hover)] dark:from-[var(--bg-dark)] dark:via-[var(--surface-dark)] dark:to-[var(--surface-dark-hover)] bg-[length:200%_200%] bg-[position:0%_0%]"
        style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}
      />

      <div className="floating-shapes absolute inset-0 pointer-events-none">
        <FloatingElement className="bg-[var(--primary-500)] top-1/4 left-1/4" delay={0} />
        <FloatingElement className="bg-[var(--secondary-500)] top-1/3 right-1/4" delay={1} />
        <FloatingElement className="bg-[var(--accent-yellow)] top-2/3 left-1/3" delay={2} />
        <FloatingElement className="bg-[var(--accent-purple)] top-1/2 right-1/3" delay={3} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white text-sm font-bold rounded-full shadow-lg">
              PARK OVERVIEW
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black mb-8 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mekiya by the Numbers
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl max-w-4xl mx-auto text-[var(--text-body-light)] dark:text-[var(--text-body-dark)] leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: 'var(--foreground)' }}
          >
            A world-class entertainment destination taking shape in the heart of Addis Ababa, designed to create unforgettable
            experiences for visitors of all ages.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-[var(--primary-600)] via-[var(--secondary-600)] to-[var(--accent-purple)] rounded-3xl p-8 md:p-16 text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center">
            <div className="mb-8 lg:mb-0 lg:mr-12">
              <div className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <Star size={64} className="text-[var(--accent-yellow)]" />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-black mb-4">Flagship: Iconic Roller Coaster</h3>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
                Experience the thrill of Ethiopia's tallest and fastest roller coaster, featuring a 90-meter drop and speeds of up to
                120 km/h. A landmark attraction that will define the Mekiya skyline.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-[var(--accent-yellow)]">90m</div>
                  <div className="text-sm text-white/80">Drop Height</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-[var(--accent-yellow)]">120</div>
                  <div className="text-sm text-white/80">km/h Speed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold text-[var(--accent-yellow)]">#1</div>
                  <div className="text-sm text-white/80">in Ethiopia</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParkStats;