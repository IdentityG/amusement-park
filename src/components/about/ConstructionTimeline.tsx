"use client"
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Settings, Hammer, Wrench, Play } from 'lucide-react';

const ConstructionTimeline = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const timelineRef = useRef(null);

  const milestones = [
    {
      id: 1,
      title: "Design Finalization",
      description: "Architectural plans approved and permits secured",
      status: "completed",
      icon: <CheckCircle className="w-6 h-6" />,
      date: "Q4 2023",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      id: 2,
      title: "Groundbreaking",
      description: "Site preparation and foundation work commenced",
      status: "completed",
      icon: <div className="w-6 h-6 text-orange-500">🚧</div>,
      date: "Q1 2024",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    {
      id: 3,
      title: "Vertical Construction",
      description: "Main structures and building frameworks rising",
      status: "active",
      icon: <Hammer className="w-6 h-6" />,
      date: "Q2-Q3 2024",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      id: 4,
      title: "Attractions Installation",
      description: "Rides and entertainment systems being installed",
      status: "upcoming",
      icon: <div className="w-6 h-6 text-purple-500">🎢</div>,
      date: "Q4 2024",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      id: 5,
      title: "Testing & Opening",
      description: "Safety testing, staff training, and grand opening",
      status: "upcoming",
      icon: <div className="w-6 h-6 text-green-500">🟢</div>,
      date: "Q1 2025",
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      borderColor: "border-teal-200 dark:border-teal-800"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('[data-index]');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'active':
        return <div className="w-5 h-5 rounded-full bg-blue-500 animate-pulse" />;
      case 'upcoming':
        return <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600" />;
      default:
        return null;
    }
  };

  const getProgressPercentage = () => {
    const completedCount = milestones.filter(m => m.status === 'completed').length;
    const activeCount = milestones.filter(m => m.status === 'active').length;
    return ((completedCount + activeCount * 0.5) / milestones.length) * 100;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Construction Timeline
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Track the progress of our ambitious amusement park project from conception to grand opening
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Overall Progress
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full">
            {/* Progress Line */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 rounded-full transition-all duration-2000 ease-out"
              style={{ height: `${getProgressPercentage()}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                data-index={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } transition-all duration-700 ease-out ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full ${milestone.bgColor} ${milestone.borderColor} border-4 flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white`}>
                      {milestone.icon}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <div className={`group relative overflow-hidden rounded-2xl ${milestone.bgColor} ${milestone.borderColor} border-2 p-8 transition-all duration-500 hover:shadow-2xl hover:scale-105`}>
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      {getStatusIcon(milestone.status)}
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        milestone.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : milestone.status === 'active'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300'
                      }`}>
                        {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {milestone.description}
                    </p>
                    
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                      {milestone.date}
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Play className="w-6 h-6" />
            Stay tuned for exciting updates!
          </div>
        </div>

        {/* Mobile Timeline (Vertical Stack) */}
        <div className="md:hidden mt-12">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={`mobile-${milestone.id}`}
                className={`relative pl-12 transition-all duration-700 ease-out ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-4'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Mobile Timeline Line */}
                <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-1000"
                    style={{ height: milestone.status === 'completed' ? '100%' : milestone.status === 'active' ? '50%' : '0%' }}
                  />
                </div>
                
                {/* Mobile Node */}
                <div className="absolute left-0 top-4 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${milestone.color}`} />
                </div>
                
                {/* Mobile Content */}
                <div className={`${milestone.bgColor} ${milestone.borderColor} border rounded-xl p-6`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(milestone.status)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {milestone.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionTimeline;