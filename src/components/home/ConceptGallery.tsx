"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight, Filter, Grid, List } from "lucide-react";
import * as THREE from "three";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: "render" | "sketch" | "lifestyle";
  title: string;
  description: string;
  date: string;
}

const ConceptGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  const galleryItems: GalleryItem[] = [
    { 
      id: 1, 
      src: "/images/1.jpg", 
      alt: "Park Overview Render", 
      category: "render", 
      title: "Main Entrance Vision",
      description: "Spectacular entrance design with modern architecture",
      date: "2024-01-15"
    },
    { 
      id: 2, 
      src: "/images/2.jpg", 
      alt: "Water Park Concept", 
      category: "render", 
      title: "Aqua Adventure Zone",
      description: "Thrilling water attractions with cutting-edge design",
      date: "2024-02-20"
    },
    { 
      id: 3, 
      src: "/images/3.jpg", 
      alt: "Roller Coaster Design", 
      category: "sketch", 
      title: "Thrill Ride Concepts",
      description: "Innovative roller coaster designs and layouts",
      date: "2024-03-10"
    },
    { 
      id: 4, 
      src: "/images/4.jpg", 
      alt: "Family Fun Area", 
      category: "lifestyle", 
      title: "Family Experience",
      description: "Creating memorable moments for all ages",
      date: "2024-04-05"
    },
    { 
      id: 5, 
      src: "/images/5.jpg", 
      alt: "Night View Render", 
      category: "render", 
      title: "Evening Atmosphere",
      description: "Magical nighttime ambiance with stunning lighting",
      date: "2024-05-12"
    },
    { 
      id: 6, 
      src: "/images/6.jpg", 
      alt: "Architectural Sketch", 
      category: "sketch", 
      title: "Structural Design",
      description: "Detailed architectural planning and concepts",
      date: "2024-06-08"
    },
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

  // Three.js Background Animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#3D5AFE',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.001;
        particlesRef.current.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // GSAP Animations
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
      { 
        opacity: 0, 
        y: 60, 
        rotationX: 15,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        scale: 1,
        duration: 0.8, 
        ease: "power3.out",
        stagger: 0.15
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredItems, viewMode]);

  const openModal = useCallback((item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredItems[newIndex]);
  }, [selectedImage, filteredItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          closeModal();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage, closeModal]);

  const categoryColors = {
    render: "from-blue-500 to-purple-600",
    sketch: "from-orange-500 to-red-600",
    lifestyle: "from-green-500 to-teal-600"
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-purple-900/80 backdrop-blur-sm"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Concept Gallery
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Step into the future of theme park design through our immersive gallery of renders, sketches, and lifestyle concepts.
          </motion.p>
          
          {/* Controls */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            {/* Filter Toggle */}
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={20} />
              Filter
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 backdrop-blur-md rounded-full border border-white/20 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  viewMode === "grid" 
                    ? "bg-white/20 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid size={18} />
                Grid
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  viewMode === "masonry" 
                    ? "bg-white/20 text-white" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List size={18} />
                Masonry
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
              >
                {["all", "render", "sketch", "lifestyle"].map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${
                      filter === category
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                        : "bg-white/10 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/20 border border-white/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Gallery Grid */}
        <div 
          ref={gridRef}
          className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          }
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              className={`group cursor-pointer ${viewMode === "masonry" ? "break-inside-avoid" : ""}`}
              onClick={() => openModal(item)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500">
                {/* 3D Card Effect */}
                <div className="relative transform-gpu transition-transform duration-500 group-hover:scale-105">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[item.category]} text-white`}>
                            {item.category}
                          </span>
                          <span className="text-gray-400 text-xs">{item.date}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '100ms' }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                {/* Navigation */}
                <motion.button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
                
                {/* Close Button */}
                <motion.button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
                
                {/* Enhanced Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="max-w-2xl">
                    <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.title}</h3>
                    <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${categoryColors[selectedImage.category]} text-white`}>
                        {selectedImage.category}
                      </span>
                      <span className="text-gray-400">{selectedImage.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ConceptGallery;