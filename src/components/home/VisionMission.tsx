'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Target, Eye, Heart, Leaf, Users, Award, Globe } from 'lucide-react';

const VisionMission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'values'>('vision');
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const tabs = [
    { id: 'vision', label: 'Vision', icon: Eye },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'values', label: 'Values', icon: Heart }
  ];

  const values = [
    { icon: Sparkles, title: "Innovation", description: "Constantly pushing boundaries in entertainment technology" },
    { icon: Award, title: "Excellence", description: "Delivering the highest quality in every aspect of our service" },
    { icon: Users, title: "Inclusivity", description: "Creating experiences for people of all ages and backgrounds" },
    { icon: Leaf, title: "Sustainability", description: "Minimizing environmental impact while maximizing joy" },
    { icon: Globe, title: "Community", description: "Contributing positively to our local and global community" }
  ];

  const galleryImages = [
    { src: "/images/1.jpg", caption: "Main Entrance Vision", category: "architecture" },
    { src: "/images/2.jpg", caption: "Water Park Concept", category: "attractions" },
    { src: "/images/3.jpg", caption: "Thrill Rides Zone", category: "attractions" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light) 50%, var(--bg-light) 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'var(--primary-500)' }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20"
          style={{ background: 'var(--secondary-500)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="text-center pt-16 lg:pt-24 pb-16"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center px-6 py-3 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, var(--primary-500)20, var(--secondary-500)20)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--primary-500)30'
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" style={{ color: 'var(--primary-500)' }} />
            <span
              className="font-semibold"
              style={{ color: 'var(--primary-600)', fontSize: 'var(--text-sm)' }}
            >
              Building Tomorrow's Entertainment
            </span>
          </motion.div>

          <motion.h1
            className="font-display font-bold mb-6 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Vision & Mission
          </motion.h1>

          <motion.p
            className="max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed"
            style={{ color: 'var(--text-body-light)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We're not just building an amusement park; we're creating a world where joy, wonder, 
            and imagination come together to form unforgettable memories for East Africa and beyond.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div
            className="flex rounded-2xl p-2"
            style={{
              background: 'var(--surface-light)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid var(--border-light)'
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id ? 'shadow-lg' : 'hover:bg-opacity-50'
                }`}
                style={{
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))'
                    : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--text-body-light)'
                }}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <div
              className="p-8 lg:p-10 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, var(--surface-light) 0%, var(--surface-light-hover) 100%)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid var(--border-light)'
              }}
            >
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === 'vision' && (
                  <div className="space-y-6">
                    <div className="flex items-center mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4"
                        style={{ background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))' }}
                      >
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3
                        className="font-display font-bold text-2xl lg:text-3xl"
                        style={{ color: 'var(--text-heading-light)' }}
                      >
                        Our Vision
                      </h3>
                    </div>
                    <p
                      className="text-lg leading-relaxed"
                      style={{ color: 'var(--text-body-light)' }}
                    >
                      To create East Africa's largest and most innovative amusement and water park 
                      that becomes a landmark destination, drawing visitors from across the continent 
                      and beyond. We envision a place where cutting-edge technology meets timeless 
                      entertainment, setting new standards for family fun and creating lasting memories.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="text-center p-4 rounded-xl" style={{ background: 'var(--primary-500)10' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--primary-500)' }}>50+</div>
                        <div className="text-sm" style={{ color: 'var(--text-muted-light)' }}>Attractions</div>
                      </div>
                      <div className="text-center p-4 rounded-xl" style={{ background: 'var(--secondary-500)10' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--secondary-500)' }}>1M+</div>
                        <div className="text-sm" style={{ color: 'var(--text-muted-light)' }}>Annual Visitors</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'mission' && (
                  <div className="space-y-6">
                    <div className="flex items-center mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4"
                        style={{ background: 'linear-gradient(135deg, var(--secondary-500), var(--accent-purple))' }}
                      >
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3
                        className="font-display font-bold text-2xl lg:text-3xl"
                        style={{ color: 'var(--text-heading-light)' }}
                      >
                        Our Mission
                      </h3>
                    </div>
                    <p
                      className="text-lg leading-relaxed"
                      style={{ color: 'var(--text-body-light)' }}
                    >
                      To deliver extraordinary experiences through world-class attractions, exceptional 
                      service, and unwavering commitment to safety and sustainability. We aim to celebrate 
                      local culture while bringing global entertainment standards to East Africa, creating 
                      economic opportunities and fostering community pride.
                    </p>
                    <div className="space-y-4 mt-8">
                      {['Safety First', 'Cultural Celebration', 'Economic Impact', 'Environmental Care'].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-3"
                            style={{ background: 'var(--secondary-500)' }}
                          />
                          <span style={{ color: 'var(--text-body-light)' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'values' && (
                  <div className="space-y-6">
                    <div className="flex items-center mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4"
                        style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-teal))' }}
                      >
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h3
                        className="font-display font-bold text-2xl lg:text-3xl"
                        style={{ color: 'var(--text-heading-light)' }}
                      >
                        Our Values
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {values.map((value, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start p-4 rounded-xl transition-all duration-300 hover:scale-105"
                          style={{ background: 'var(--bg-light)' }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
                            style={{ background: 'var(--primary-500)20' }}
                          >
                            <value.icon className="w-5 h-5" style={{ color: 'var(--primary-500)' }} />
                          </div>
                          <div>
                            <h4
                              className="font-semibold mb-1"
                              style={{ color: 'var(--text-heading-light)' }}
                            >
                              {value.title}
                            </h4>
                            <p
                              className="text-sm"
                              style={{ color: 'var(--text-body-light)' }}
                            >
                              {value.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Featured Image */}
            <motion.div
              className="relative h-80 lg:h-96 rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/1.jpg"
                alt="Park concept visualization"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white font-display font-bold text-xl mb-2">
                  East Africa's Premier Destination
                </h4>
                <p className="text-white/90 text-sm">
                  A world-class entertainment experience coming to life
                </p>
              </div>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  className="relative h-40 rounded-2xl overflow-hidden cursor-pointer"
                  style={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-white font-semibold text-sm">{image.caption}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/vision"
            className="group inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--secondary-500), var(--accent-purple))',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
            }}
          >
            <span>Explore Our Complete Vision</span>
            <motion.svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;