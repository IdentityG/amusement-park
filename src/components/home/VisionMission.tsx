'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VisionMission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const textBlocksRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const textBlocks = textBlocksRef.current;
    const images = imagesRef.current;

    if (!section || !quote || !textBlocks || !images) return;

    // Quote animation
    gsap.fromTo(
      quote,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Text blocks staggered animation
    gsap.fromTo(
      textBlocks.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textBlocks,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Images animation
    gsap.fromTo(
      images.children,
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: images,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--surface-light) 0%, var(--bg-light) 100%)'
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-teal)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-purple)' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 
            className="font-display font-bold mb-4"
            style={{ 
              fontSize: 'var(--text-h2)',
              color: 'var(--text-heading-light)',
              background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Our Vision & Mission
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--text-body-light)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            Building East Africa's premier entertainment destination with a commitment to
            creating magical experiences for visitors of all ages.
          </p>
        </motion.div>

        {/* Quote Block */}
        <div 
          ref={quoteRef}
          className="relative max-w-4xl mx-auto mb-16 px-8 py-10 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--primary-500)10, var(--primary-400)10)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="absolute -top-5 -left-2 text-8xl opacity-20" style={{ color: 'var(--primary-500)' }}>"
          </div>
          <div className="absolute -bottom-5 -right-2 text-8xl opacity-20" style={{ color: 'var(--primary-500)' }}>"
          </div>
          <p 
            className="text-center font-display italic text-2xl md:text-3xl font-medium"
            style={{ color: 'var(--primary-600)', lineHeight: 1.4 }}
          >
            We're not just building an amusement park; we're creating a world where joy, wonder, and imagination come together to form unforgettable memories.
          </p>
        </div>

        {/* Vision & Mission Content */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Text Content */}
          <div ref={textBlocksRef} className="space-y-8">
            <div className="space-y-4">
              <h3 
                className="font-display font-bold"
                style={{ 
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text-heading-light)'
                }}
              >
                Our Vision
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-body-light)'
                }}
              >
                To create East Africa's largest and most innovative amusement and water park that becomes a landmark destination, drawing visitors from across the continent and beyond. We envision a place where cutting-edge technology meets timeless entertainment, setting new standards for family fun.
              </p>
            </div>

            <div className="space-y-4">
              <h3 
                className="font-display font-bold"
                style={{ 
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text-heading-light)'
                }}
              >
                Our Mission
              </h3>
              <p 
                className="leading-relaxed"
                style={{ 
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-body-light)'
                }}
              >
                To deliver extraordinary experiences through world-class attractions, exceptional service, and a commitment to safety and sustainability. We aim to celebrate local culture while bringing global entertainment standards to East Africa, creating economic opportunities and fostering community pride.
              </p>
            </div>

            <div className="space-y-4">
              <h3 
                className="font-display font-bold"
                style={{ 
                  fontSize: 'var(--text-h3)',
                  color: 'var(--text-heading-light)'
                }}
              >
                Our Values
              </h3>
              <ul className="space-y-2">
                {[
                  "Innovation: Constantly pushing boundaries in entertainment",
                  "Excellence: Delivering the highest quality in every aspect",
                  "Inclusivity: Creating experiences for people of all ages and backgrounds",
                  "Sustainability: Minimizing environmental impact while maximizing joy",
                  "Community: Contributing positively to our local region"
                ].map((value, index) => (
                  <li 
                    key={index}
                    className="flex items-start"
                  >
                    <span 
                      className="inline-block w-2 h-2 mt-2 mr-2 rounded-full"
                      style={{ background: 'var(--primary-500)' }}
                    />
                    <span
                      style={{ 
                        fontSize: 'var(--text-base)',
                        color: 'var(--text-body-light)'
                      }}
                    >
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Images */}
          <div ref={imagesRef} className="space-y-6">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/1.jpg"
                alt="Concept art of the amusement park entrance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <span className="text-white font-semibold text-lg">Main Entrance Concept</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/2.jpg"
                  alt="Concept art of the water park area"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Water Park Zone</span>
                </div>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/3.jpg"
                  alt="Concept art of the roller coaster"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Thrill Rides Area</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/vision"
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-400))',
              fontSize: 'var(--text-base)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span>Learn More About Our Vision</span>
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
    </section>
  );
};

export default VisionMission;