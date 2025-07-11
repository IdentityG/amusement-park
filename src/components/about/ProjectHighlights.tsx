"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mountain, Zap, Music, Building, Calendar, Play, Pause } from 'lucide-react';

const ProjectHighlights = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const highlights = [
    {
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop&crop=center",
      title: "Roller Coaster",
      description: "Experience heart-pounding thrills on our world-class roller coasters featuring multiple inversions, steep drops, and speeds up to 80 mph. Our signature coaster 'Thunder Phoenix' stands 200 feet tall and offers an unforgettable adrenaline rush.",
      accent: "var(--primary-500)",
      gradientFrom: "#FF5A5F",
      gradientTo: "#FFD600"
    },
    {
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop&crop=center",
      title: "Ferris Wheels",
      description: "Enjoy breathtaking 360-degree panoramic views from our giant Ferris wheel, standing 150 feet above the park. Each climate-controlled gondola offers comfortable seating for up to 8 guests, perfect for families and romantic moments.",
      accent: "var(--secondary-500)",
      gradientFrom: "#3D5AFE",
      gradientTo: "#00BCD4"
    },
    {
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop&crop=center",
      title: "Drop Tower",
      description: "Feel the ultimate rush of free-fall from 200 feet high on our state-of-the-art drop tower. Experience weightlessness as you plummet at speeds reaching 65 mph, with stunning views of the entire park before the exhilarating drop.",
      accent: "var(--accent-purple)",
      gradientFrom: "#9C27B0",
      gradientTo: "#FF5A5F"
    },
    {
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&crop=center",
      title: "Indoor VR & Games",
      description: "Step into the future with our cutting-edge virtual reality experiences and arcade games. Featuring over 50 VR stations, classic arcade games, and immersive simulators that transport you to different worlds and adventures.",
      accent: "var(--accent-green)",
      gradientFrom: "#4CAF50",
      gradientTo: "#00BCD4"
    },
    {
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
      title: "Amphitheater",
      description: "Experience world-class entertainment at our 5,000-seat amphitheater. From live concerts by international artists to theatrical performances and seasonal shows, enjoy premium acoustics and lighting in an unforgettable setting.",
      accent: "var(--accent-yellow)",
      gradientFrom: "#FFD600",
      gradientTo: "#FF5A5F"
    },
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center",
      title: "Resort Villas & Apartments",
      description: "Stay in luxury with our premium resort accommodations featuring park views, modern amenities, and exclusive access. Choose from spacious villas or elegant apartments, all designed for comfort and convenience during your magical stay.",
      accent: "var(--secondary-600)",
      gradientFrom: "#2A3EB1",
      gradientTo: "#9C27B0"
    },
    {
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop&crop=center",
      title: "Convention Center",
      description: "Host your next corporate event or conference in our state-of-the-art convention center. Featuring flexible meeting spaces, advanced AV technology, and catering services, perfect for business meetings, weddings, and special events.",
      accent: "var(--accent-teal)",
      gradientFrom: "#00BCD4",
      gradientTo: "#4CAF50"
    }
  ];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const totalSlides = Math.ceil(highlights.length / itemsToShow);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      className="py-20 px-4 transition-colors duration-300"
      style={{ 
        background: 'var(--background)',
        color: 'var(--foreground)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="gradient-text mb-6" style={{ fontSize: 'var(--text-h2)' }}>
            Park Highlights
          </h2>
          <p 
            className="max-w-3xl mx-auto transition-colors duration-300"
            style={{ 
              fontSize: 'var(--text-lg)',
              color: 'var(--text-muted)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            Discover the incredible attractions and amenities that make our amusement park a world-class destination
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glassmorphism hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft 
              className="w-6 h-6 transition-colors duration-300" 
              style={{ color: 'var(--foreground)' }}
            />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glassmorphism hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            aria-label="Next slide"
          >
            <ChevronRight 
              className="w-6 h-6 transition-colors duration-300" 
              style={{ color: 'var(--foreground)' }}
            />
          </button>

          {/* Slides Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
                    {highlights
                      .slice(slideIndex * itemsToShow, (slideIndex + 1) * itemsToShow)
                      .map((highlight, index) => (
                        <div
                          key={slideIndex * itemsToShow + index}
                          className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 border"
                          style={{
                            background: 'var(--surface)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            animationDelay: `${index * 0.1}s`
                          }}
                        >
                          {/* Gradient Overlay */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                            style={{
                              background: `linear-gradient(135deg, ${highlight.gradientFrom}, ${highlight.gradientTo})`
                            }}
                          />
                          
                          {/* Image */}
                          <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                            <img 
                              src={highlight.image} 
                              alt={highlight.title}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div 
                              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(to top, ${highlight.gradientFrom}, ${highlight.gradientTo})`
                              }}
                            />
                          </div>
                          
                          {/* Content */}
                          <h3 
                            className="mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                            style={{
                              fontSize: 'var(--text-h4)',
                              color: 'var(--text-heading)',
                              fontWeight: '700',
                              backgroundImage: `linear-gradient(90deg, ${highlight.gradientFrom}, ${highlight.gradientTo})`
                            }}
                          >
                            {highlight.title}
                          </h3>
                          
                          <p 
                            className="leading-relaxed transition-colors duration-300"
                            style={{ 
                              color: 'var(--text-muted)',
                              fontSize: 'var(--text-sm)',
                              lineHeight: 'var(--leading-normal)'
                            }}
                          >
                            {highlight.description}
                          </p>
                          
                          {/* Decorative Elements */}
                          <div 
                            className="absolute top-4 right-4 w-20 h-20 rounded-full blur-xl opacity-20"
                            style={{
                              background: `linear-gradient(135deg, ${highlight.gradientFrom}, transparent)`
                            }}
                          />
                          <div 
                            className="absolute bottom-4 left-4 w-16 h-16 rounded-full blur-lg opacity-10"
                            style={{
                              background: `linear-gradient(45deg, ${highlight.gradientTo}, transparent)`
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8' 
                    : 'w-3 opacity-50 hover:opacity-75'
                }`}
                style={{
                  background: index === currentSlide 
                    ? 'linear-gradient(90deg, var(--primary-500), var(--secondary-500))' 
                    : 'var(--text-muted)'
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
            style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)'
            }}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectHighlights;