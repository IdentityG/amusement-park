'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

// Dummy attraction data
const attractions = [
  {
    id: 1,
    name: "Cosmic Thunder",
    category: "Thrill Ride",
    image: "/images/1.jpg",
    rating: 4.8,
    badge: "NEW",
    description: "Experience zero gravity in our space-themed roller coaster"
  },
  {
    id: 2,
    name: "Mystic Rapids",
    category: "Water Adventure",
    image: "/images/2.jpg",
    rating: 4.6,
    badge: "Fan Favorite",
    description: "Navigate through enchanted waterfalls and magical caves"
  },
  {
    id: 3,
    name: "Sky Dancer",
    category: "Family Fun",
    image: "/images/3.jpg",
    rating: 4.7,
    badge: null,
    description: "Soar through the clouds on our gentle flying ride"
  },
  {
    id: 4,
    name: "Dragon's Lair",
    category: "Thrill Ride",
    image: "/images/4.jpg",
    rating: 4.9,
    badge: "Extreme",
    description: "Face the ultimate challenge in our most intense coaster"
  },
  {
    id: 5,
    name: "Fairy Tale Forest",
    category: "Kids Zone",
    image: "/images/5.jpg",
    rating: 4.5,
    badge: null,
    description: "A magical journey through an enchanted woodland"
  },
  {
    id: 6,
    name: "Neon Rush",
    category: "Thrill Ride",
    image: "/images/6.jpg",
    rating: 4.8,
    badge: "NEW",
    description: "Race through a futuristic cityscape at lightning speed"
  },
  
];

const TopAttractions = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(attractions.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(attractions.length / 3)) % Math.ceil(attractions.length / 3));
  };

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const spotlightVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(255, 90, 95, 0.3)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light) 100%)'
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-purple)' }}></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-teal)' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
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
            Top Attractions
          </h2>
          <p 
            className="max-w-2xl mx-auto"
            style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--text-body-light)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            Discover our most thrilling rides and magical experiences that will create memories to last a lifetime.
          </p>
        </motion.div>

        {/* Desktop Carousel / Mobile Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Desktop Carousel Controls */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(attractions.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'scale-125' 
                      : 'opacity-50 hover:opacity-75'
                  }`}
                  style={{
                    background: currentSlide === index 
                      ? 'var(--primary-500)' 
                      : 'var(--text-muted-light)'
                  }}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ 
                  background: 'var(--surface-light)',
                  color: 'var(--primary-500)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{ 
                  background: 'var(--surface-light)',
                  color: 'var(--primary-500)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Attractions Grid/Carousel */}
          <div className="overflow-hidden">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative"
                >
                  <motion.div
                    variants={hoverVariants}
                    className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Spotlight effect */}
                    <motion.div
                      variants={spotlightVariants}
                      initial="initial"
                      whileHover="hover"
                      className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent pointer-events-none z-10"
                    />

                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={attraction.image}
                        alt={attraction.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Badge */}
                      {attraction.badge && (
                        <div 
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{
                            background: attraction.badge === 'NEW' 
                              ? 'var(--accent-green)' 
                              : attraction.badge === 'Extreme'
                              ? 'var(--primary-500)'
                              : 'var(--accent-purple)'
                          }}
                        >
                          {attraction.badge}
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 
                            className="font-display font-bold mb-1"
                            style={{ 
                              fontSize: 'var(--text-h4)',
                              color: 'var(--text-heading-light)'
                            }}
                          >
                            {attraction.name}
                          </h3>
                          <p 
                            className="text-sm font-medium"
                            style={{ color: 'var(--primary-500)' }}
                          >
                            {attraction.category}
                          </p>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          <StarIcon className="w-4 h-4" style={{ color: 'var(--accent-yellow)' }} />
                          <span 
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-body-light)' }}
                          >
                            {attraction.rating}
                          </span>
                        </div>
                      </div>
                      
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-muted-light)' }}
                      >
                        {attraction.description}
                      </p>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                         style={{
                           boxShadow: '0 0 30px rgba(255, 90, 95, 0.3)'
                         }} />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/attractions"
              className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--primary-500), var(--primary-400))',
                fontSize: 'var(--text-base)'
              }}
            >
              <span>View All Attractions</span>
              <motion.svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopAttractions;