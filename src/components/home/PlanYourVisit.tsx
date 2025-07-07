"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, Clock, Navigation } from "lucide-react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PlanYourVisit: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;
    const info = infoRef.current;
    
    if (!section || !map || !info) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(map,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      0
    )
    .fromTo(info,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      0.2
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef}className="relative py-16 lg:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light-hover) 100%)'
      }}>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-teal/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent-purple/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 gradient-text mb-6 font-bold">Plan Your Visit</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Get ready for the ultimate adventure. Here's everything you need to know about our location and opening.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Section */}
          <div ref={mapRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/10">
              {/* Custom Map Graphic */}
              <div className="aspect-video bg-gradient-to-br from-surface-dark-hover to-bg-dark p-8 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
                
                {/* Map Content */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                      <MapPin size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">MagicPark Location</h3>
                    <p className="text-muted">Interactive map coming soon</p>
                  </div>
                </div>
                
                {/* Map Overlay Elements */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="text-sm text-white">📍 Addis Ababa</span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="text-sm text-white">🗺️ Satellite View</span>
                </div>
              </div>
              
              {/* Google Maps Embed Alternative */}
              {/* Uncomment when you have the actual location */}
              {/* 
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6!2d38.7!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDM4wrA0MicwMC4wIkU!5e0!3m2!1sen!2set!4v1234567890"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
              */}
            </div>
          </div>

          {/* Info Section */}
          <div ref={infoRef} className="space-y-8">
            {/* Opening Year */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-[#FF5A5F] to-[#3D5AFE] backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6 shadow-lg shadow-primary-500/10"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00BCD4] to-[#9C27B0] rounded-full flex items-center justify-center mr-4">
                  <Calendar size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold gradient-text">Grand Opening</h3>
                  <p className="text-muted">Mark your calendars</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">2026</div>
              <p className="text-muted">The wait will be worth it!</p>
            </motion.div>

            {/* Location Details */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-[#00BCD4] to-[#9C27B0] backdrop-blur-sm border border-accent-teal/20 rounded-2xl p-6 shadow-lg shadow-accent-teal/10"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00BCD4] to-[#9C27B0] rounded-full flex items-center justify-center mr-4">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Prime Location</h3>
                  <p className="text-muted">Easy to find, easy to reach</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white font-medium">Near CMC Roundabout</p>
                <p className="text-white font-medium">Addis Ababa, Ethiopia</p>
                <p className="text-muted text-sm">Accessible by public transport and major highways</p>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-[#FFD600] to-[#4CAF50] backdrop-blur-sm border border-accent-yellow/20 rounded-2xl p-6 shadow-lg shadow-accent-yellow/10"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FFD600] to-[#4CAF50] rounded-full flex items-center justify-center mr-4">
                  <Navigation size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Getting There</h3>
                  <p className="text-muted">Multiple transport options</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock size={16} className="text-[#4CAF50] mr-2" />
                  <span className="text-white">15 min from city center</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="text-[#4CAF50] mr-2" />
                  <span className="text-white">Free parking available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisit;