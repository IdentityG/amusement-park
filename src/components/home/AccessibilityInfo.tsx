'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Accessibility,
  Eye,
  Ear,
  Heart,
  Phone,
  MapPin,
  Users,
  Shield,
  Headphones,
  Navigation,
  Car,
  Baby,
  CircleCheck,
  Info,
  Download,
  Mail,
  Clock,
  Star
} from 'lucide-react'

const AccessibilityInfo = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const accessibilityFeatures = [
    {
      id: 1,
      title: "Wheelchair & Mobility",
      description: "Full wheelchair accessibility throughout the park with ramps, elevators, and accessible restrooms.",
      icon: Accessibility,
      color: "from-blue-500 to-cyan-500",
      features: [
        "100% wheelchair accessible pathways",
        "Accessible ride boarding areas",
        "Wheelchair rental service",
        "Accessible parking spaces",
        "Elevator access to all levels"
      ]
    },
    {
      id: 2,
      title: "Vision Assistance",
      description: "Comprehensive support for guests with visual impairments including audio guides and braille materials.",
      icon: Eye,
      color: "from-purple-500 to-pink-500",
      features: [
        "Audio description devices",
        "Braille park maps available",
        "Guide dog friendly areas",
        "Tactile pathway markers",
        "Staff assistance available"
      ]
    },
    {
      id: 3,
      title: "Hearing Support",
      description: "Advanced hearing assistance technology and sign language interpretation services.",
      icon: Ear,
      color: "from-green-500 to-teal-500",
      features: [
        "Hearing loop systems",
        "Sign language interpreters",
        "Visual alert systems",
        "Closed captioning shows",
        "Assistive listening devices"
      ]
    },
    {
      id: 4,
      title: "Sensory Accommodations",
      description: "Quiet zones and sensory-friendly experiences for guests with autism and sensory sensitivities.",
      icon: Heart,
      color: "from-orange-500 to-red-500",
      features: [
        "Sensory-friendly hours",
        "Quiet retreat areas",
        "Noise-canceling headphones",
        "Sensory maps available",
        "Trained sensory support staff"
      ]
    }
  ]

  const services = [
    {
      icon: Phone,
      title: "24/7 Accessibility Hotline",
      description: "Call us anytime for assistance",
      contact: "(555) 123-ACCESS"
    },
    {
      icon: Mail,
      title: "Accessibility Coordinator",
      description: "Email us for special accommodations",
      contact: "access@mekiyapark.com"
    },
    {
      icon: MapPin,
      title: "Guest Services",
      description: "Visit our accessibility desk",
      contact: "Main Entrance - Left Side"
    },
    {
      icon: Download,
      title: "Accessibility Guide",
      description: "Download our complete guide",
      contact: "PDF & Audio versions available"
    }
  ]

  const facilities = [
    { icon: Car, title: "Accessible Parking", count: "200+ spaces" },
    { icon: Users, title: "Family Restrooms", count: "15 locations" },
    { icon: Baby, title: "Nursing Stations", count: "8 private rooms" },
    { icon: Navigation, title: "Accessible Routes", count: "100% coverage" },
    { icon: Shield, title: "Emergency Assistance", count: "24/7 support" },
    { icon: Headphones, title: "Audio Devices", count: "500+ available" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-light)] via-[var(--surface-light)] to-[var(--bg-light)] dark:from-[var(--bg-dark)] dark:via-[var(--surface-dark)] dark:to-[var(--bg-dark)]" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--primary-500)]/5 to-[var(--accent-teal)]/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-[var(--secondary-500)]/5 to-[var(--accent-purple)]/5 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.95, 1],
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
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="px-6 py-3 bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] text-white text-sm font-semibold rounded-full shadow-lg">
              ♿ Accessibility & Inclusion
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Everyone Belongs at Mekiya
          </h2>
          
          <p className="text-xl text-muted max-w-4xl mx-auto leading-relaxed">
            We're committed to creating magical experiences for all our guests. Discover our comprehensive 
            accessibility features and services designed to ensure everyone can enjoy our park to the fullest.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {accessibilityFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="group relative"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <motion.div
                  className="relative h-80 rounded-3xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-white dark:bg-[var(--surface-dark)] shadow-lg" />
                  
                  {/* Gradient Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Icon */}
                    <motion.div
                      className="mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                        <IconComponent size={28} className="text-white" />
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-[var(--primary-500)] transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">
                      {feature.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2">
                      {feature.features.slice(0, 3).map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center text-xs text-muted"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CircleCheck size={14} className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="leading-tight">{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* More indicator */}
                    <motion.div
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredFeature === feature.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xs text-[var(--primary-500)] font-medium">
                        +{feature.features.length - 3} more features
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 gradient-text">
              Accessibility Services
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Our dedicated team is here to help ensure your visit is comfortable and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="bg-white dark:bg-[var(--surface-dark)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] rounded-xl flex items-center justify-center mr-4">
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-foreground">{service.title}</h4>
                    </div>
                    <p className="text-muted text-sm mb-3">{service.description}</p>
                    <p className="text-[var(--primary-500)] font-medium text-sm">{service.contact}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Facilities Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 gradient-text">
              Accessibility by the Numbers
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              Our commitment to accessibility is reflected in our comprehensive facilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[var(--accent-teal)] to-[var(--accent-purple)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent size={28} className="text-white" />
                  </motion.div>
                  <h4 className="font-bold text-xl text-[var(--primary-500)] mb-1">{facility.count}</h4>
                  <p className="text-sm text-muted">{facility.title}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Need Special Accommodations?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contact our accessibility team at least 48 hours before your visit to arrange 
              personalized assistance and accommodations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="inline-flex items-center px-8 py-4 bg-white text-[var(--primary-500)] font-semibold rounded-xl shadow-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </motion.button>
              
              <motion.button
                className="inline-flex items-center px-8 py-4 bg-white/20 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="mr-2" size={20} />
                Email Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AccessibilityInfo