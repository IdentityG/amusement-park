'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon, 
  TicketIcon, 
  ClockIcon, 
  StarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  BoltIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

// Ticket options data
const ticketOptions = {
  daily: {
    id: 'daily',
    title: 'Daily Pass',
    subtitle: 'One Day of Magic',
    price: 'Coming Soon',
    originalPrice: null,
    badge: 'Most Popular',
    icon: TicketIcon,
    benefits: [
      { text: 'Unlimited rides & attractions', icon: BoltIcon },
      { text: 'Access to all themed areas', icon: StarIcon },
      { text: 'Complimentary parking', icon: '🚗' },
      { text: 'Mobile fast-pass included', icon: ClockIcon },
      { text: 'Photo package discount', icon: '📸' }
    ],
    color: 'var(--primary-500)',
    gradient: 'linear-gradient(135deg, var(--primary-500), var(--primary-400))'
  },
  season: {
    id: 'season',
    title: 'Season Pass',
    subtitle: 'Unlimited Adventures',
    price: 'Coming Soon',
    originalPrice: null,
    badge: 'Best Value',
    icon: CalendarDaysIcon,
    benefits: [
      { text: 'Unlimited visits all season', icon: BoltIcon },
      { text: 'Exclusive member events', icon: StarIcon },
      { text: 'Free parking all year', icon: '🚗' },
      { text: 'Priority ride access', icon: ClockIcon },
      { text: '20% off food & merchandise', icon: GiftIcon },
      { text: 'Bring-a-friend discounts', icon: UserGroupIcon }
    ],
    color: 'var(--secondary-500)',
    gradient: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-400))'
  },
  family: {
    id: 'family',
    title: 'Family Bundle',
    subtitle: 'Fun for Everyone',
    price: 'Coming Soon',
    originalPrice: null,
    badge: 'Family Favorite',
    icon: UserGroupIcon,
    benefits: [
      { text: 'Tickets for up to 4 people', icon: UserGroupIcon },
      { text: 'Kids under 3 enter free', icon: '👶' },
      { text: 'Family photo package', icon: '📸' },
      { text: 'Reserved family seating', icon: StarIcon },
      { text: 'Meal vouchers included', icon: '🍕' }
    ],
    color: 'var(--accent-purple)',
    gradient: 'linear-gradient(135deg, var(--accent-purple), var(--accent-teal))'
  }
};

const TicketsAndOffers = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [email, setEmail] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentTicket = ticketOptions[activeTab as keyof typeof ticketOptions];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.3
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

  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light-hover) 100%)'
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-yellow)' }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-purple)' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-2xl" 
             style={{ background: 'var(--accent-teal)' }}></div>
      </div>

      {/* Floating sparkles */}
      <motion.div
        variants={sparkleVariants}
        animate="animate"
        className="absolute top-20 right-1/4 text-2xl"
      >
        ✨
      </motion.div>
      <motion.div
        variants={sparkleVariants}
        animate="animate"
        className="absolute bottom-32 left-1/3 text-xl"
        style={{ animationDelay: '1s' }}
      >
        🎫
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--accent-yellow), var(--accent-teal))',
                   color: 'white'
                 }}>
              <SparklesIcon className="w-5 h-5 mr-2" />
              <span className="font-semibold text-sm">Coming Spring 2024</span>
            </div>
            
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
              Ticket Options Coming Soon
            </h2>
            
            <p 
              className="max-w-2xl mx-auto leading-relaxed"
              style={{ 
                fontSize: 'var(--text-lg)',
                color: 'var(--text-body-light)',
                lineHeight: 'var(--leading-normal)'
              }}
            >
              Choose your adventure — from one-day thrills to season-long fun. 
              Get ready for magical experiences that will create memories to last a lifetime!
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex bg-white rounded-2xl p-2 shadow-lg">
              {Object.entries(ticketOptions).map(([key, option]) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`relative flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === key ? 'text-white' : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {activeTab === key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: option.gradient }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                    <IconComponent className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">{option.title}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Ticket Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-lg"
              >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                  {/* Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: currentTicket.color }}
                    >
                      {currentTicket.badge}
                    </div>
                  </div>

                  {/* Header */}
                  <div 
                    className="px-8 py-8 text-white relative overflow-hidden"
                    style={{ background: currentTicket.gradient }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <currentTicket.icon className="w-8 h-8 mr-3" />
                        <div>
                          <h3 className="text-2xl font-bold">{currentTicket.title}</h3>
                          <p className="text-white/80">{currentTicket.subtitle}</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">{currentTicket.price}</div>
                        <div className="text-white/80 text-sm">Pricing details available soon</div>
                      </div>
                    </div>
                    
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-white"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="px-8 py-8">
                    <h4 
                      className="font-bold mb-6 text-center"
                      style={{ 
                        fontSize: 'var(--text-h4)',
                        color: 'var(--text-heading-light)'
                      }}
                    >
                      What's Included
                    </h4>
                    
                    <div className="space-y-4">
                      {currentTicket.benefits.map((benefit, index) => {
                        const IconComponent = typeof benefit.icon === 'string' ? null : benefit.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="flex items-center"
                          >
                            {IconComponent ? (
                              <IconComponent 
                                className="w-5 h-5 mr-3 flex-shrink-0" 
                                style={{ color: currentTicket.color }}
                              />
                            ) : (
                              <span className="text-lg mr-3 flex-shrink-0">{benefit.icon as string}</span>
                            )}
                            <span 
                              className="text-sm"
                              style={{ color: 'var(--text-body-light)' }}
                            >
                              {benefit.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="px-8 pb-8">
                    <motion.button
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center"
                      style={{ background: currentTicket.gradient }}
                    >
                      <span>Notify Me When Available</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2"
                      >
                        ➡️
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Email Subscription */}
          <motion.div 
            variants={itemVariants} 
            className="text-center mt-12 lg:mt-16"
          >
            <h3 
              className="font-display font-bold mb-4"
              style={{ 
                fontSize: 'var(--text-h4)',
                color: 'var(--text-heading-light)'
              }}
            >
              Be the First to Know
            </h3>
            
            <p 
              className="mb-6 max-w-md mx-auto"
              style={{ 
                fontSize: 'var(--text-base)',
                color: 'var(--text-body-light)'
              }}
            >
              Get exclusive early access to tickets and special opening day offers!
            </p>
            
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  style={{ fontSize: 'var(--text-base)' }}
                  required
                />
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
                  style={{ background: 'var(--primary-500)' }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TicketsAndOffers;