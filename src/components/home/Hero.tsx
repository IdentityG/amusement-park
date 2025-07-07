'use client';
import { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen w-fuject color theme to make it beautifulll overflow-hidden">
      {/* Fullscreen video background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Replace with your video path
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          The Future of Fun is <span className="gradient-text">Under Construction</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="mt-4 text-lg md:text-xl max-w-2xl"
        >
          Witness the birth of a new era of excitement. Follow our journey as we build the ultimate theme park experience.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: 'backOut' }}
          className="mt-8 flex gap-4"
        >
          <Link href="/construction-updates">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-white font-semibold rounded-full transition-colors duration-300"
              style={{ backgroundColor: 'var(--primary-500)' }}
            >
              See Our Progress
            </motion.button>
          </Link>
          <Link href="/subscribe">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'var(--secondary-500)', color: 'var(--text-heading-dark)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 font-semibold rounded-full transition-colors duration-300"
              style={{ backgroundColor: 'transparent', border: '2px solid var(--secondary-500)', color: 'var(--secondary-500)' }}
            >
              Get Updates
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;