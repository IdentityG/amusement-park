"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type StepStatus = "completed" | "in-progress" | "upcoming";

const ConstructionTeaser: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(3);
  const progressRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const constructionSteps = [
    { 
      id: 1, 
      name: "Site Planning", 
      status: "completed" as StepStatus, 
      date: "Jan 2025",
      description: "Initial site surveys and architectural planning",
      progress: 100
    },
    { 
      id: 2, 
      name: "Groundwork", 
      status: "completed" as StepStatus, 
      date: "Apr 2025",
      description: "Land clearing and soil preparation",
      progress: 100
    },
    { 
      id: 3, 
      name: "Foundation", 
      status: "in-progress" as StepStatus, 
      date: "Jul 2025",
      description: "Concrete foundations and utilities",
      progress: 65
    },
    { 
      id: 4, 
      name: "Steel Framework", 
      status: "upcoming" as StepStatus, 
      date: "Oct 2025",
      description: "Ride structures and building frames",
      progress: 0
    },
    { 
      id: 5, 
      name: "Attractions", 
      status: "upcoming" as StepStatus, 
      date: "Jan 2026",
      description: "Ride installation and water features",
      progress: 0
    },
    { 
      id: 6, 
      name: "Final Touches", 
      status: "upcoming" as StepStatus, 
      date: "Apr 2026",
      description: "Landscaping and safety systems",
      progress: 0
    },
  ];

  const stats = [
    { number: "50+", label: "Attractions", icon: "🎢" },
    { number: "25", label: "Rides", icon: "🎠" },
    { number: "15", label: "Water Slides", icon: "🏊" },
    { number: "2026", label: "Opening Year", icon: "🎉" },
  ];

  // GSAP scroll animations (only for specific elements)
  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--surface-dark)] to-[var(--bg-dark)] text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--primary-500)] opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--secondary-500)] opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[var(--accent-yellow)] opacity-5 blur-2xl animate-pulse delay-2000"></div>
      </div>

      <motion.div
        className="container mx-auto max-w-7xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            Construction in Progress
          </motion.div>
          
          <h2 className="text-h2 gradient-text mb-6 font-bold">
            Building the Future of Fun
          </h2>
          
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Follow our journey as we construct East Africa's premier amusement destination, 
            featuring cutting-edge attractions and world-class water adventures.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--surface-dark-hover)] to-[var(--surface-dark)] border border-[var(--primary-500)]/20 backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div variants={itemVariants} className="mb-20">
          <h3 className="text-h3 text-center mb-12 gradient-text">Construction Timeline</h3>
          
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Progress Bar */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--surface-dark-hover)] rounded-full transform -translate-y-1/2"></div>
              <div
                ref={progressRef}
                className="absolute top-1/2 left-0 w-5/12 h-1 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] rounded-full transform -translate-y-1/2 origin-left"
              ></div>
              
              {/* Timeline Steps */}
              <div className="relative flex justify-between items-center py-8">
                {constructionSteps.map((step) => (
                  <motion.div
                    key={step.id}
                    className="flex flex-col items-center cursor-pointer"
                    style={{ width: `${100 / constructionSteps.length}%` }}
                    onClick={() => setActiveStep(step.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                        step.status === "completed"
                          ? "bg-[var(--accent-green)] border-[var(--accent-green)] text-white"
                          : step.status === "in-progress"
                          ? "bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] border-[var(--primary-500)] text-white shadow-lg shadow-[var(--primary-500)]/20"
                          : "bg-[var(--surface-dark-hover)] border-gray-600 text-gray-400"
                      }`}
                      animate={step.status === "in-progress" ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step.status === "completed" ? "✓" : step.id}
                    </motion.div>
                    <span className="mt-3 text-sm font-medium text-center">{step.name}</span>
                    <span className="text-xs text-muted mt-1">{step.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {constructionSteps.map((step) => (
              <motion.div
                key={step.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  step.status === "completed"
                    ? "bg-[var(--accent-green)]/10 border-[var(--accent-green)]/30"
                    : step.status === "in-progress"
                    ? "bg-gradient-to-r from-[var(--primary-500)]/10 to-[var(--secondary-500)]/10 border-[var(--primary-500)]/30"
                    : "bg-[var(--surface-dark-hover)] border-gray-600/30"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      step.status === "completed"
                        ? "bg-[var(--accent-green)] text-white"
                        : step.status === "in-progress"
                        ? "bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white"
                        : "bg-[var(--surface-dark-hover)] text-gray-400"
                    }`}
                  >
                    {step.status === "completed" ? "✓" : step.id}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{step.name}</h4>
                    <p className="text-sm text-muted">{step.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Step Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-20 p-8 rounded-2xl bg-gradient-to-br from-[var(--surface-dark-hover)] to-[var(--surface-dark)] border border-[var(--primary-500)]/20"
          >
            <div className="text-center">
              <h4 className="text-h4 gradient-text mb-4">
                {constructionSteps[activeStep - 1]?.name}
              </h4>
              <p className="text-muted mb-6">
                {constructionSteps[activeStep - 1]?.description}
              </p>
              {constructionSteps[activeStep - 1]?.status === "in-progress" && (
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{constructionSteps[activeStep - 1]?.progress}%</span>
                  </div>
                  <div className="w-full bg-[var(--surface-dark-hover)] rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${constructionSteps[activeStep - 1]?.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Construction Gallery */}
        <motion.div variants={itemVariants} className="mb-20">
          <h3 className="text-h3 text-center mb-12 gradient-text">Construction Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="group relative rounded-2xl overflow-hidden bg-[var(--surface-dark-hover)] aspect-video"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-500)]/20 to-[var(--secondary-500)]/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏗️</div>
                    <p className="text-sm text-muted">Construction Photo {item}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-[var(--surface-dark-hover)] to-[var(--surface-dark)] border border-[var(--secondary-500)]/20">
            <h3 className="text-h3 gradient-text mb-4">Stay in the Loop</h3>
            <p className="text-muted mb-8">
              Get exclusive construction updates, behind-the-scenes content, and be the first to know about our grand opening!
            </p>
            
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-[var(--bg-dark)] px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] text-white placeholder-gray-400 border border-[var(--surface-dark-hover)]"
                  />
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-[var(--primary-500)]/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-[var(--accent-green)] font-medium text-lg">
                    Thank you for subscribing!
                  </p>
                  <p className="text-muted text-sm mt-2">
                    You'll receive construction updates and opening announcements in your inbox.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ConstructionTeaser;