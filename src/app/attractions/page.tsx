"use client"
import { useState } from 'react';
import AttractionsGrid from '@/components/attractions/AttractionGrid';
import AttractionsFilterBar from '@/components/attractions/AttractionsFilterBar'
import AttractionsHero from '@/components/attractions/AttractionsHero'
import React from 'react'

const page = () => {
    const [activeFilter, setActiveFilter] = useState('all');

  // Sample attractions data
  const attractions = [
    {
      id: 1,
      title: "Drop Tower",
      description: "Experience the ultimate thrill as you plummet from 200 feet in the air. Feel the rush of adrenaline as you free-fall at incredible speeds.",
      icon: "🎢",
      gradient: "from-red-500 to-orange-500",
      badge: "Thrill Ride",
      rating: 4.8,
      duration: "2 min",
      capacity: "8 people",
      features: ["Height Req: 48\"", "Fast Pass", "Photo Op"],
      category: "thrill"
    },
    {
      id: 2,
      title: "Splash Mountain",
      description: "Cool off with our exciting water ride featuring cascading waterfalls, rapids, and surprise splash zones perfect for hot summer days.",
      icon: "🌊",
      gradient: "from-blue-500 to-cyan-500",
      badge: "Water Park",
      rating: 4.6,
      duration: "5 min",
      capacity: "12 people",
      features: ["All Ages", "Get Wet", "Scenic Route"],
      category: "water"
    },
    {
      id: 3,
      title: "VR Adventure",
      description: "Immerse yourself in virtual worlds with our cutting-edge VR experience. Battle dragons, explore alien planets, or solve mysteries.",
      icon: "🥽",
      gradient: "from-purple-500 to-pink-500",
      badge: "Coming Soon",
      rating: 4.9,
      duration: "15 min",
      capacity: "6 people",
      features: ["Latest Tech", "Multiple Experiences", "Age 12+"],
      category: "virtual"
    },
    {
      id: 4,
      title: "Family Coaster",
      description: "A gentle roller coaster perfect for the whole family. Enjoy scenic views and mild thrills that everyone can enjoy together.",
      icon: "🎠",
      gradient: "from-green-500 to-teal-500",
      badge: "Family Fun",
      rating: 4.7,
      duration: "3 min",
      capacity: "16 people",
      features: ["All Ages", "Scenic Views", "Family Friendly"],
      category: "family"
    },
    {
      id: 5,
      title: "Arcade Zone",
      description: "Classic and modern arcade games in a vibrant indoor setting. From retro pinball to the latest interactive games.",
      icon: "🎮",
      gradient: "from-yellow-500 to-orange-500",
      badge: "Indoor",
      rating: 4.5,
      duration: "Unlimited",
      capacity: "50 people",
      features: ["Climate Controlled", "Prize Counter", "All Day Access"],
      category: "indoor"
    },
    {
      id: 6,
      title: "Magic Show",
      description: "Be amazed by our world-class magicians performing incredible illusions and interactive entertainment for all ages.",
      icon: "🎭",
      gradient: "from-indigo-500 to-purple-500",
      badge: "Live Show",
      rating: 4.8,
      duration: "45 min",
      capacity: "200 people",
      features: ["Live Performance", "Interactive", "Multiple Shows"],
      category: "entertainment"
    }
  ];

  // Filter attractions based on active filter
  const filteredAttractions = activeFilter === 'all' 
    ? attractions 
    : attractions.filter(attraction => attraction.category === activeFilter);
  return (
    <div>
        <AttractionsHero />
        <AttractionsFilterBar 
         activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
        />
        <AttractionsGrid  attractions={filteredAttractions} />
    </div>
  )
}

export default page