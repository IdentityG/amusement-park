'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  SparklesIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';

// Event data structure
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  badge?: string;
  category: string;
  featured?: boolean;
}

// Sample events data
const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "The Grand Opening",
    date: "2024-06-15",
    time: "10:00 AM",
    description: "Join us for the magical grand opening ceremony with fireworks, parades, and special surprises!",
    image: "/images/1.jpg",
    badge: "GRAND EVENT",
    category: "Opening",
    featured: true
  },
  {
    id: 2,
    title: "Lights & Magic Parade",
    date: "2024-06-20",
    time: "8:00 PM",
    description: "Experience our enchanting evening parade featuring illuminated floats and magical characters.",
    image: "/images/2.jpg",
    badge: "NEW",
    category: "Entertainment"
  },
  {
    id: 3,
    title: "Summer Splash Festival",
    date: "2024-07-04",
    time: "12:00 PM",
    description: "Cool off with water rides, splash zones, and refreshing summer treats for the whole family.",
    image: "/images/3.jpg",
    badge: "FREE ENTRY",
    category: "Festival"
  },
  {
    id: 4,
    title: "Cosmic Night Experience",
    date: "2024-07-15",
    time: "9:00 PM",
    description: "After-dark thrills with special lighting effects and exclusive night-time attractions.",
    image: "/images/4.jpg",
    badge: "EXCLUSIVE",
    category: "Special Event"
  },
  {
    id: 5,
    title: "Family Fun Weekend",
    date: "2024-08-01",
    time: "10:00 AM",
    description: "Special family activities, character meet & greets, and kid-friendly entertainment all weekend.",
    image: "/images/5.jpg",
    category: "Family Event"
  }
];

const UpcomingEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Countdown to grand opening
  const targetDate = new Date('2024-06-15T10:00:00').getTime();
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(upcomingEvents.length / 3));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(upcomingEvents.length / 3)) % Math.ceil(upcomingEvents.length / 3));
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
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
    }
  };
  
  const countdownVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
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
             style={{ background: 'var(--accent-purple)' }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl" 
             style={{ background: 'var(--accent-teal)' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-2xl" 
             style={{ background: 'var(--accent-yellow)' }}></div>
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
        🎭
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
                   background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-teal))',
                   color: 'white'
                 }}>
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Upcoming Events & Shows</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6"
                style={{ color: 'var(--text-heading-light)' }}>
              Magic Awaits at Every
              <span className="block"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                Spectacular Event
              </span>
            </h2>
            
            <p className="text-lg max-w-2xl mx-auto"
               style={{ color: 'var(--text-body-light)' }}>
              Don't miss out on our incredible lineup of shows, parades, and special events. 
              Each one designed to create unforgettable memories for the whole family.
            </p>
          </motion.div>
          
          {/* Countdown Timer */}
          <motion.div 
            variants={itemVariants}
            className="mb-12 lg:mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4"
                  style={{ color: 'var(--text-heading-light)' }}>
                Grand Opening Countdown
              </h3>
              <div className="flex justify-center items-center space-x-4 lg:space-x-8">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    variants={countdownVariants}
                    initial="initial"
                    animate="animate"
                    className="text-center p-4 lg:p-6 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-500), var(--primary-400))',
                      boxShadow: '0 10px 30px rgba(255, 90, 95, 0.3)'
                    }}
                  >
                    <div className="text-2xl lg:text-4xl font-bold text-white mb-1">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs lg:text-sm text-white/80 uppercase tracking-wider">
                      {unit}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Events Carousel */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, var(--surface-light), var(--surface-light-hover))',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}
              >
                <ChevronLeftIcon className="w-6 h-6" style={{ color: 'var(--text-heading-light)' }} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, var(--surface-light), var(--surface-light-hover))',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}
              >
                <ChevronRightIcon className="w-6 h-6" style={{ color: 'var(--text-heading-light)' }} />
              </button>
              
              {/* Events Grid */}
              <div className="overflow-hidden mx-12">
                <motion.div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(upcomingEvents.length / 3) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingEvents
                          .slice(slideIndex * 3, slideIndex * 3 + 3)
                          .map((event, index) => (
                            <motion.div
                              key={event.id}
                              variants={cardVariants}
                              whileHover={{ 
                                y: -10,
                                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                              }}
                              className="group relative rounded-2xl overflow-hidden cursor-pointer"
                              style={{
                                background: 'var(--surface-light)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                              }}
                            >
                              {/* Event Image */}
                              <div className="relative h-48 overflow-hidden">
                                <Image
                                  src={event.image}
                                  alt={event.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                
                                {/* Badge */}
                                {event.badge && (
                                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                                       style={{
                                         background: event.featured 
                                           ? 'linear-gradient(135deg, var(--primary-500), var(--primary-400))'
                                           : 'linear-gradient(135deg, var(--accent-purple), var(--accent-teal))'
                                       }}>
                                    {event.badge}
                                  </div>
                                )}
                                
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                    <PlayIcon className="w-8 h-8 text-white" />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Event Content */}
                              <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm font-semibold px-3 py-1 rounded-full"
                                        style={{
                                          background: 'var(--surface-light-hover)',
                                          color: 'var(--text-body-light)'
                                        }}>
                                    {event.category}
                                  </span>
                                  <div className="flex items-center text-sm"
                                       style={{ color: 'var(--text-muted-light)' }}>
                                    <ClockIcon className="w-4 h-4 mr-1" />
                                    {event.time}
                                  </div>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 group-hover:text-opacity-80 transition-colors"
                                    style={{ color: 'var(--text-heading-light)' }}>
                                  {event.title}
                                </h3>
                                
                                <p className="text-sm mb-4 line-clamp-2"
                                   style={{ color: 'var(--text-body-light)' }}>
                                  {event.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center"
                                       style={{ color: 'var(--text-muted-light)' }}>
                                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                                    <span className="text-sm">
                                      {new Date(event.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </span>
                                  </div>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                                    style={{
                                      background: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-400))'
                                    }}
                                  >
                                    Learn More
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto p-8 rounded-3xl"
                 style={{
                   background: 'linear-gradient(135deg, var(--surface-light), var(--surface-light-hover))',
                   boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                 }}>
              <div className="mb-6">
                <BellIcon className="w-12 h-12 mx-auto mb-4"
                         style={{ color: 'var(--accent-yellow)' }} />
                <h3 className="text-2xl font-bold mb-2"
                    style={{ color: 'var(--text-heading-light)' }}>
                  Never Miss the Magic
                </h3>
                <p className="text-lg"
                   style={{ color: 'var(--text-body-light)' }}>
                  Get notified about new events, exclusive shows, and special offers
                </p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-transparent focus:border-opacity-50 transition-all duration-300"
                  style={{
                    background: 'var(--bg-light)',
                    color: 'var(--text-body-light)',
                    borderColor: 'var(--primary-500)'
                  }}
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(255, 90, 95, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-500), var(--primary-400))'
                  }}
                >
                  Get Notified
                </motion.button>
              </form>
              
              <div className="mt-6 flex justify-center space-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    background: 'var(--surface-light-hover)',
                    color: 'var(--text-heading-light)'
                  }}
                >
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  Full Schedule
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;