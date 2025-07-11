"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  Globe,
  ExternalLink
} from "lucide-react";

const PlanYourVisit: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
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

  const FloatingParticle = ({ delay, duration }: { delay: number; duration: number }) => (
    <div 
      className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--background)',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} duration={3 + i * 0.2} />
        ))}
        
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse-slow"
          style={{
            background: `linear-gradient(135deg, var(--primary-500), var(--secondary-500))`,
            opacity: '0.1'
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"
          style={{
            background: `linear-gradient(135deg, var(--accent-teal), var(--accent-purple))`,
            opacity: '0.1'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"
          style={{
            background: `linear-gradient(135deg, var(--accent-yellow), var(--accent-green))`,
            opacity: '0.05'
          }}
        />
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
            <h2 
              className="text-4xl lg:text-6xl font-bold gradient-text mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)'
              }}
            >
              Plan Your Visit
            </h2>
            <motion.div
              className="h-1 mx-auto rounded-full"
              style={{
                background: `linear-gradient(135deg, var(--primary-500), var(--secondary-500))`
              }}
              initial={{ width: 0 }}
              animate={isInView ? { width: isHovered ? "100%" : "60%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          
          <motion.p
            className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-normal)'
            }}
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
                <div 
                  className={`relative p-6 rounded-3xl glassmorphism shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-lg`}
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
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
                        <ChevronRight size={16} style={{ color: 'var(--text-heading)' }} />
                      </motion.div>
                    </div>
                    
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{
                        color: 'var(--text-heading)',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-h4)'
                      }}
                    >
                      {info.title}
                    </h3>
                    <p 
                      className="text-sm mb-3"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {info.subtitle}
                    </p>
                    
                    <div className="mb-4">
                      <span 
                        className="text-3xl font-bold"
                        style={{ 
                          color: 'var(--text-heading)',
                          fontFamily: 'var(--font-display)'
                        }}
                      >
                        {info.value}
                      </span>
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {info.description}
                      </p>
                    </div>
                    
                    {/* Expandable Details */}
                    <motion.div
                      className="space-y-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={activeCard === info.id ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
                          <Star size={12} className="mr-2" style={{ color: 'var(--accent-yellow)' }} />
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
            {/* Interactive Real Map */}
            <motion.div
              ref={mapContainerRef}
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-square relative">
                  {/* Real Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.629889441!2d38.7577841!3d9.0054038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c4a4b4f7e7%3A0x1e9b9b9b9b9b9b9b!2sCMC%20Roundabout%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1641234567890!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                  />
                  
                  {/* Map Overlay */}
                  <div className="absolute inset-0 bg-black/20 rounded-3xl pointer-events-none" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 left-4 animate-float">
                    <div 
                      className="glassmorphism rounded-lg px-3 py-2 flex items-center"
                      style={{
                        background: 'var(--surface)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Globe size={16} className="mr-2" style={{ color: 'var(--accent-teal)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-heading)' }}>Live Location</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 animate-float animation-delay-2000">
                    <div 
                      className="glassmorphism rounded-lg px-3 py-2 flex items-center"
                      style={{
                        background: 'var(--surface)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <Navigation size={16} className="mr-2" style={{ color: 'var(--accent-green)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-heading)' }}>GPS Ready</span>
                    </div>
                  </div>
                  
                  {/* Map Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div 
                      className="glassmorphism rounded-xl p-4 text-center"
                      style={{
                        background: 'var(--surface)',
                        backdropFilter: 'blur(20px)'
                      }}
                    >
                      <h3 
                        className="text-lg font-bold mb-1"
                        style={{ 
                          color: 'var(--text-heading)',
                          fontFamily: 'var(--font-display)'
                        }}
                      >
                        MagicPark
                      </h3>
                      <p 
                        className="text-sm mb-3"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        CMC Roundabout Area<br />Addis Ababa, Ethiopia
                      </p>
                      
                      <motion.a
                        href="https://maps.google.com/?q=CMC+Roundabout,+Addis+Ababa,+Ethiopia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all text-sm"
                        style={{
                          background: `linear-gradient(135deg, var(--primary-500), var(--secondary-500))`
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={14} className="mr-2" />
                        Get Directions
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transportation Options */}
            <motion.div
              className="glassmorphism rounded-3xl p-6"
              style={{
                background: 'var(--surface)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 
                className="text-xl font-bold mb-4 flex items-center"
                style={{
                  color: 'var(--text-heading)',
                  fontFamily: 'var(--font-display)'
                }}
              >
                <Car className="mr-2" size={20} />
                Transport Options
              </h4>
              
              <div className="space-y-3">
                {transportOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer hover:scale-105"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      ':hover': {
                        background: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <option.icon 
                        size={18} 
                        className="mr-3" 
                        style={{ color: 'var(--accent-teal)' }}
                      />
                      <div>
                        <span 
                          className="font-medium"
                          style={{ color: 'var(--text-heading)' }}
                        >
                          {option.label}
                        </span>
                        <p 
                          className="text-sm"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {option.time}
                        </p>
                      </div>
                    </div>
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--accent-green)' }}
                    >
                      {option.cost}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              className="glassmorphism rounded-3xl p-6"
              style={{
                background: 'var(--surface)',
                backdropFilter: 'blur(20px)',
                borderColor: 'var(--primary-500)',
                borderWidth: '1px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h4 
                className="text-xl font-bold mb-4"
                style={{
                  color: 'var(--text-heading)',
                  fontFamily: 'var(--font-display)'
                }}
              >
                Need Help?
              </h4>
              <div className="space-y-3">
                <motion.a
                  href="tel:+251111234567"
                  className="flex items-center p-3 rounded-xl transition-all cursor-pointer hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                  whileHover={{ x: 5 }}
                >
                  <Phone size={18} className="mr-3" style={{ color: 'var(--accent-teal)' }} />
                  <span style={{ color: 'var(--text-heading)' }}>+251 11 123 4567</span>
                </motion.a>
                <motion.a
                  href="mailto:visit@magicpark.et"
                  className="flex items-center p-3 rounded-xl transition-all cursor-pointer hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                  whileHover={{ x: 5 }}
                >
                  <Mail size={18} className="mr-3" style={{ color: 'var(--accent-green)' }} />
                  <span style={{ color: 'var(--text-heading)' }}>visit@magicpark.et</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisit;