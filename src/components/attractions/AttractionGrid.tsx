"use client"
import React, { useState, useEffect } from 'react';
import { StarIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';

// AttractionCard Component
const AttractionCard = ({ attraction, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${attraction.gradient} transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
              {attraction.icon}
            </div>
          </div>
        </div>
        
        {/* Badge */}
        {attraction.badge && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
            {attraction.badge}
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2 text-white text-sm">
              <ClockIcon className="w-4 h-4" />
              <span>{attraction.duration}</span>
              <UsersIcon className="w-4 h-4 ml-2" />
              <span>{attraction.capacity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {attraction.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <StarIcon className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{attraction.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3"
         style={{ color: 'var(--foreground)' }}
        >
          {attraction.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {attraction.features.map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
          Learn More
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full"></div>
    </div>
  );
};

// AttractionsGrid Component
const AttractionsGrid = ({ attractions }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {attractions.map((attraction, index) => (
          <AttractionCard key={attraction.id} attraction={attraction} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AttractionsGrid;