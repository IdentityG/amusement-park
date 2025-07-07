'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ParkTeaser = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textBlock = textRef.current;
    const videoBlock = videoRef.current;

    if (!section || !textBlock || !videoBlock) return;

    // Set initial states
    gsap.set(textBlock, { x: -100, opacity: 0 });
    gsap.set(videoBlock, { scale: 0.8, opacity: 0 });

    // Create timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(textBlock, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    })
    .to(videoBlock, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');

    // Video hover animation
    const videoElement = videoElementRef.current;
    if (videoElement) {
      const handleMouseEnter = () => {
        gsap.to(videoElement, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(videoElement, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      videoElement.addEventListener('mouseenter', handleMouseEnter);
      videoElement.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        videoElement.removeEventListener('mouseenter', handleMouseEnter);
        videoElement.removeEventListener('mouseleave', handleMouseLeave);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light-hover) 100%)'
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full" 
             style={{ background: 'var(--accent-purple)' }}></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full" 
             style={{ background: 'var(--accent-teal)' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full" 
             style={{ background: 'var(--accent-yellow)' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div ref={textRef} className="space-y-6">
            <div className="space-y-4">
              <h2 
                className="font-display font-bold leading-tight"
                style={{ 
                  fontSize: 'var(--text-h2)',
                  color: 'var(--text-heading-light)',
                  background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Welcome to MagicPark
              </h2>
              
              <p 
                className="leading-relaxed max-w-lg"
                style={{ 
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-body-light)',
                  lineHeight: 'var(--leading-normal)'
                }}
              >
                From dizzying heights to magical lights, MagicPark is your gateway to wonder. 
                Experience thrilling adventures, enchanting shows, and unforgettable moments 
                where dreams come alive and magic never ends.
              </p>
            </div>

            {/* Learn More Button */}
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/attractions"
                className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-500), var(--primary-400))',
                  fontSize: 'var(--text-base)'
                }}
              >
                <span>Discover the Magic</span>
                <svg 
                  className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right side - Video content */}
          <div ref={videoRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Video element */}
              <video
                ref={videoElementRef}
                className="w-full h-auto aspect-video object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/api/placeholder/800/450"
              >
                <source src="/videos/park-promo.mp4" type="video/mp4" />
                <source src="/videos/park-promo.webm" type="video/webm" />
                {/* Fallback image */}
                <img 
                  src="/api/placeholder/800/450" 
                  alt="MagicPark promotional preview showing thrilling rides and magical attractions"
                  className="w-full h-auto"
                />
              </video>
              
              {/* Video overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Play indicator (for paused state) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full animate-pulse" 
                 style={{ background: 'var(--accent-yellow)' }}></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full animate-pulse delay-1000" 
                 style={{ background: 'var(--accent-teal)' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ParkTeaser;