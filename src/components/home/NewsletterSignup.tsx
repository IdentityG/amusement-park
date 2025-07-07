"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Check, Sparkles, Gift, Bell } from "lucide-react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
      
      // Trigger confetti animation
      if (confettiRef.current) {
        gsap.fromTo(confettiRef.current.children,
          { opacity: 0, scale: 0, rotation: 0 },
          { 
            opacity: 1, 
            scale: 1, 
            rotation: 360,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: 0.1
          }
        );
      }
    }, 1500);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValid) setIsValid(true);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    
    if (!section || !form) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(form,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light-hover) 100%)'
      }}>
      {/* Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl"></div>
      
      {/* Confetti Elements */}
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 4 === 0 ? 'var(--primary-500)' : 
                              i % 4 === 1 ? 'var(--secondary-500)' :
                              i % 4 === 2 ? 'var(--accent-yellow)' : 'var(--accent-green)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={formRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 gradient-text mb-6 font-bold">Stay in the Loop</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Get Updates, Exclusive Offers & Grand Opening News
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-br from-surface-dark-hover to-surface-dark border border-primary-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary-500/10"
              >
                {/* Benefits */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-xl bg-[#FF5A5F]/80 border border-primary-500/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF5A5F] to-[#E04046] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Bell size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Early Updates</h3>
                    <p className="text-sm text-body">Be first to know about construction progress</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-xl bg-[#3D5AFE]/80 border border-secondary-500/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#3D5AFE] to-[#2A3EB1] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gift size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Exclusive Offers</h3>
                    <p className="text-sm text-body">Special discounts and early bird tickets</p>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-xl bg-[#9C27B0]/80 border border-accent-yellow/20"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#9C27B0] to-[#FFD600] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">VIP Access</h3>
                    <p className="text-sm text-body">Priority booking for grand opening</p>
                  </motion.div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: isValid ? 1 : [1, 1.02, 1],
                        borderColor: isValid ? 'rgba(255, 90, 95, 0.3)' : 'rgba(239, 68, 68, 0.5)'
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={`w-full pl-12 pr-4 py-4 bg-bg-dark border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-muted transition-all duration-300 ${
                          isValid ? 'border-primary-500/30' : 'border-red-500/50'
                        }`}
                      />
                    </motion.div>
                    
                    {!isValid && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 ml-2"
                      >
                        Please enter a valid email address
                      </motion.p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Subscribing...
                      </div>
                    ) : (
                      "Get Updates & Offers"
                    )}
                  </motion.button>
                </form>
                
                <p className="text-xs text-muted text-center mt-6">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-accent-green/20 to-accent-teal/20 border border-accent-green/30 rounded-3xl p-12 text-center shadow-2xl shadow-accent-green/10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-accent-green to-accent-teal rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={40} className="text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 gradient-text">Welcome Aboard!</h3>
                <p className="text-lg text-muted mb-6">
                  You're now part of our exclusive community. Get ready for amazing updates!
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary-500/20"
                >
                  Subscribe Another Email
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;