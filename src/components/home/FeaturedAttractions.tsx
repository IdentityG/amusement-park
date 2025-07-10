'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Zap, 
  Waves, 
  Sparkles, 
  Heart, 
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Star
} from 'lucide-react'

const FeaturedAttractions = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const attractions = [
    {
      id: 1,
      title: "Thunder Rapids",
      category: "Water Ride",
      description: "Experience the ultimate water adventure with twisting rapids and thrilling drops.",
      image: "/api/placeholder/600/400",
      icon: Waves,
      color: "var(--accent-teal)",
      gradientFrom: "from-cyan-500",
      gradientTo: "to-blue-600",
      thrill: "High",
      duration: "4 min",
      capacity: "24 riders",
      status: "Coming Soon"
    },
    {
      id: 2,
      title: "Sky Screamer",
      category: "Thrill Ride",
      description: "Soar 200 feet above the ground on our signature roller coaster experience.",
      image: "/api/placeholder/600/400",
      icon: Zap,
      color: "var(--primary-500)",
      gradientFrom: "from-red-500",
      gradientTo: "to-orange-600",
      thrill: "Extreme",
      duration: "3 min",
      capacity: "32 riders",
      status: "Coming Soon"
    },
    {
      id: 3,
      title: "Mystic Garden",
      category: "Family Fun",
      description: "A magical journey through enchanted gardens with interactive surprises.",
      image: "/api/placeholder/600/400",
      icon: Sparkles,
      color: "var(--accent-purple)",
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-600",
      thrill: "Mild",
      duration: "8 min",
      capacity: "6 riders",
      status: "Coming Soon"
    },
    {
      id: 4,
      title: "Splash Zone",
      category: "Water Park",
      description: "Cool off in our massive water playground with slides and splash features.",
      image: "/api/placeholder/600/400",
      icon: Heart,
      color: "var(--accent-green)",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      thrill: "Low",
      duration: "All day",
      capacity: "200+ guests",
      status: "Coming Soon"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-light)] via-[var(--surface-light)] to-[var(--bg-light)] dark:from-[var(--bg-dark)] dark:via-[var(--surface-dark)] dark:to-[var(--bg-dark)]" 
       style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}
      />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[var(--primary-500)]/10 to-[var(--secondary-500)]/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--accent-teal)]/10 to-[var(--accent-purple)]/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white text-sm font-medium rounded-full shadow-lg">
              ⚡ Featured Attractions
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Unforgettable Adventures Await
          </h2>
          
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed"
           style={{ color: 'var(--foreground)' }}
          >
            Get ready for heart-pounding thrills, refreshing water adventures, and magical moments 
            at Mekiya's most exciting attractions
          </p>
        </motion.div>

        {/* Attractions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {attractions.map((attraction, index) => {
            const IconComponent = attraction.icon
            
            return (
              <motion.div
                key={attraction.id}
                variants={cardVariants}
                className="group relative"
                onMouseEnter={() => setHoveredCard(attraction.id as unknown as null)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <motion.div
                  className={`relative h-[480px] rounded-3xl overflow-hidden cursor-pointer transform-gpu ${
                    index % 2 === 0 ? 'lg:translate-y-8' : 'lg:-translate-y-8'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    y: index % 2 === 0 ? -12 : 12
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900" />
                  
                  {/* Gradient Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${attraction.gradientFrom} ${attraction.gradientTo} opacity-80`}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-8 text-white">
                    {/* Top Section */}
                    <div>
                      {/* Status Badge */}
                      <motion.div
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 glassmorphism text-sm font-medium mb-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                        {attraction.status}
                      </motion.div>

                      {/* Icon */}
                      <motion.div
                        className="mb-6"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white/20 glassmorphism flex items-center justify-center">
                          <IconComponent size={32} className="text-white" />
                        </div>
                      </motion.div>

                      {/* Title & Category */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">{attraction.title}</h3>
                        <p className="text-white/80 text-sm uppercase tracking-wide font-medium">
                          {attraction.category}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-white/90 text-base leading-relaxed mb-6">
                        {attraction.description}
                      </p>
                    </div>

                    {/* Bottom Section */}
                    <div>
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Zap size={16} className="text-yellow-400 mr-1" />
                            <span className="text-xs text-white/70">Thrill</span>
                          </div>
                          <p className="text-sm font-semibold">{attraction.thrill}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Clock size={16} className="text-blue-400 mr-1" />
                            <span className="text-xs text-white/70">Duration</span>
                          </div>
                          <p className="text-sm font-semibold">{attraction.duration}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Users size={16} className="text-green-400 mr-1" />
                            <span className="text-xs text-white/70">Capacity</span>
                          </div>
                          <p className="text-sm font-semibold">{attraction.capacity}</p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        className="w-full bg-white/20 glassmorphism rounded-xl py-3 px-6 flex items-center justify-center space-x-2 hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-medium">Learn More</span>
                        <motion.div
                          animate={{ x: hoveredCard === attraction.id ? 5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight size={20} />
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Effect Particles */}
                  {hoveredCard === attraction.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          initial={{ 
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * 400,
                            y: Math.random() * 400
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [Math.random() * 400, Math.random() * 400 - 100]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="mr-2" size={20} />
            Get Notified When We Open
            <ChevronRight className="ml-2" size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedAttractions