"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "render" | "sketch" | "lifestyle";
  title: string;
}

const ConceptGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const galleryItems: GalleryItem[] = [
    { id: 1, src: "/images/1.jpg", alt: "Park Overview Render", category: "render", title: "Main Entrance Vision" },
    { id: 2, src: "/images/2.jpg", alt: "Water Park Concept", category: "render", title: "Aqua Adventure Zone" },
    { id: 3, src: "/images/3.jpg", alt: "Roller Coaster Design", category: "sketch", title: "Thrill Ride Concepts" },
    { id: 4, src: "/images/4.jpg", alt: "Family Fun Area", category: "lifestyle", title: "Family Experience" },
    { id: 5, src: "/images/5.jpg", alt: "Night View Render", category: "render", title: "Evening Atmosphere" },
    { id: 6, src: "/images/6.jpg", alt: "Architectural Sketch", category: "sketch", title: "Structural Design" },
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    
    if (!section || !grid) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(grid.children,
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6, 
        ease: "power3.out",
        stagger: 0.1
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredItems]);

  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-light) 0%, var(--surface-light-hover) 100%)'
      }}>
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-secondary-500/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 gradient-text mb-6 font-bold">Concept Gallery</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Explore our vision through stunning renders, architectural sketches, and lifestyle concepts.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["all", "render", "sketch", "lifestyle"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-[#FF5A5F] to-[#3D5AFE] text-white shadow-lg shadow-primary-500/20"
                    : "bg-surface-dark-hover text-muted hover:text-white hover:bg-surface-dark border border-surface-dark-hover"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              className={`break-inside-avoid cursor-pointer group ${
                index % 3 === 0 ? "mb-6" : index % 3 === 1 ? "mb-4" : "mb-8"
              }`}
              onClick={() => openModal(item)}
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                    <span className="text-primary-400 text-sm capitalize">{item.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Navigation */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold text-xl mb-1">{selectedImage.title}</h3>
                <span className="text-primary-400 capitalize">{selectedImage.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ConceptGallery;