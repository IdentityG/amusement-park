"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Navigation, 
  Star, 
  Car, 
  Bus, 
  Plane,
  ChevronRight,
  Phone,
  Mail,
  Globe
} from "lucide-react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PlanYourVisit: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    const cards = cardsRef.current;
    const mapContainer = mapContainerRef.current;
    
    if (!section || !hero || !cards || !mapContainer) return;
    
    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate hero section
    tl.fromTo(hero,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      0
    );
    
    // Animate cards with stagger
    tl.fromTo(cards.children,
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      },
      0.3
    );
    
    // Animate map container
    tl.fromTo(mapContainer,
      { opacity: 0, rotateY: 20 },
      { opacity: 1, rotateY: 0, duration: 1, ease: "power3.out" },
      0.6
    );
    
    // Floating animation for map elements
    gsap.to(".floating-element", {
      y: -10,
      rotation: 5,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const visitInfo = [
    {
      id: 1,
      icon: Calendar,
      title: "Grand Opening",
      subtitle: "Coming Soon",
      value: "2026",
      description: "The adventure begins soon!",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-500/10 to-rose-500/10",
      details: ["Opening ceremonies", "Special events", "Early bird tickets"]
    },
    {
      id: 2,
      icon: MapPin,
      title: "Prime Location",
      subtitle: "Heart of the City",
      value: "CMC Area",
      description: "Addis Ababa, Ethiopia",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/10 to-cyan-500/10",
      details: ["Central location", "Easy access", "Major landmarks nearby"]
    },
    {
      id: 3,
      icon: Navigation,
      title: "Easy Access",
      subtitle: "Multiple Routes",
      value: "15 min",
      description: "From city center",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      details: ["Public transport", "Free parking", "Taxi services"]
    },
    {
      id: 4,
      icon: Clock,
      title: "Operating Hours",
      subtitle: "Coming Soon",
      value: "9AM-10PM",
      description: "Daily adventures",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-500/10 to-violet-500/10",
      details: ["Extended hours", "Special events", "Group bookings"]
    }
  ];

  const transportOptions = [
    { icon: Car, label: "Private Car", time: "15 min", cost: "Free Parking" },
    { icon: Bus, label: "Public Bus", time: "20 min", cost: "5 ETB" },
    { icon: Plane, label: "From Airport", time: "45 min", cost: "Airport Shuttle" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, var(--surface-dark) 0%, var(--bg-dark) 70%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-accent-yellow/10 to-accent-green/10 blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-teal-400 bg-clip-text text-transparent mb-4">
              Plan Your Visit
            </h2>
            <motion.div
              className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: isHovered ? "100%" : "60%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.p
            className="text-xl lg:text-2xl text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get ready for an extraordinary adventure. Here's everything you need to know about visiting MagicPark.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Info Cards */}
          <div ref={cardsRef} className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {visitInfo.map((info, index) => (
              <motion.div
                key={info.id}
                className={`relative group cursor-pointer`}
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setActiveCard(info.id)}
                onHoverEnd={() => setActiveCard(null)}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`relative p-6 rounded-3xl bg-gradient-to-br ${info.bgColor} backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden`}>
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg`}>
                        <info.icon size={24} className="text-white" />
                      </div>
                      <motion.div
                        className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                        animate={activeCard === info.id ? { rotate: 90 } : { rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight size={16} className="text-white" />
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                    <p className="text-muted text-sm mb-3">{info.subtitle}</p>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-white">{info.value}</span>
                      <p className="text-muted text-sm">{info.description}</p>
                    </div>
                    
                    {/* Expandable Details */}
                    <motion.div
                      className="space-y-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={activeCard === info.id ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted">
                          <Star size={12} className="text-accent-yellow mr-2" />
                          {detail}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map and Contact Section */}
          <div className="space-y-6">
            {/* Interactive Map */}
            <motion.div
              ref={mapContainerRef}
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-surface-dark to-bg-dark p-8 relative overflow-hidden">
                  {/* Animated Background Grid */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="border border-white/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Map Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <motion.div
                      className="floating-element w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <MapPin size={32} className="text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">MagicPark</h3>
                    <p className="text-muted text-center mb-6">CMC Roundabout Area<br />Addis Ababa, Ethiopia</p>
                    
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Directions
                    </motion.button>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 left-4 floating-element">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
                      <Globe size={16} className="text-accent-teal mr-2" />
                      <span className="text-sm text-white">Live Location</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 floating-element">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center">
                      <Navigation size={16} className="text-accent-green mr-2" />
                      <span className="text-sm text-white">GPS Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transportation Options */}
            <motion.div
              className="bg-gradient-to-br from-surface-dark to-bg-dark rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <Car className="mr-2" size={20} />
                Transport Options
              </h4>
              
              <div className="space-y-3">
                {transportOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <option.icon size={18} className="text-accent-teal mr-3" />
                      <div>
                        <span className="text-white font-medium">{option.label}</span>
                        <p className="text-muted text-sm">{option.time}</p>
                      </div>
                    </div>
                    <span className="text-accent-green text-sm">{option.cost}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-3xl p-6 border border-primary-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h4 className="text-xl font-bold text-white mb-4">Need Help?</h4>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <Phone size={18} className="text-accent-teal mr-3" />
                  <span className="text-white">+251 11 123 4567</span>
                </motion.div>
                <motion.div
                  className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <Mail size={18} className="text-accent-green mr-3" />
                  <span className="text-white">visit@magicpark.et</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisit;