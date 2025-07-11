"use client"
import React from 'react';

const AttractionsFilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All', icon: '🎪' },
    { id: 'thrill', label: 'Thrill Rides', icon: '🎢' },
    { id: 'family', label: 'Family Fun', icon: '👨‍👩‍👧‍👦' },
    { id: 'indoor', label: 'Indoor Games', icon: '🎮' },
    { id: 'water', label: 'Water Park', icon: '🌊' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { id: 'virtual', label: 'Virtual & Tech', icon: '🥽' }
  ];

  return (
    <div className="relative z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
    style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{filter.icon}</span>
                <span>{filter.label}</span>
              </span>
              
              {/* Active indicator */}
              {activeFilter === filter.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttractionsFilterBar;