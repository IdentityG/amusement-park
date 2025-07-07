"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define status types for timeline steps
type StepStatus = "completed" | "in-progress" | "upcoming";

const ConstructionTeaser: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Construction timeline steps
  const constructionSteps = [
    { id: 1, name: "Planning", status: "completed" as StepStatus, date: "Jan 2025" },
    { id: 2, name: "Groundwork", status: "completed" as StepStatus, date: "Apr 2025" },
    { id: 3, name: "Foundations", status: "in-progress" as StepStatus, date: "Jul 2025" },
    { id: 4, name: "Structures", status: "upcoming" as StepStatus, date: "Oct 2025" },
    { id: 5, name: "Attractions", status: "upcoming" as StepStatus, date: "Jan 2026" },
    { id: 6, name: "Finishing", status: "upcoming" as StepStatus, date: "Apr 2026" },
  ];

  // GSAP animations with staggered timing to prevent conflicts
  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const media = mediaRef.current;
    const form = formRef.current;
    
    if (!section || !timeline || !media || !form) return;
    
    // Create a timeline for sequenced animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Add animations to timeline with proper sequencing
    tl.fromTo(timeline,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0
    )
    .fromTo(media,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.3 // Slight delay after timeline animation
    )
    .fromTo(form,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.5 // Slight delay after media animation
    );
    
    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-6 bg-gradient-to-br from-surface-dark via-surface-dark to-bg-dark text-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-70"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary-500/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Title */}
        <h2 className="text-h2 text-center gradient-text mb-6 font-bold">
          Construction Progress
        </h2>

        {/* Description Text */}
        <p className="text-lg text-center text-muted max-w-2xl mx-auto mb-12">
          Follow our journey as we build East Africa's most exciting amusement and water park.
        </p>

        {/* Construction Started Label */}
        <div className="bg-gradient-to-r from-primary-500/30 to-secondary-500/30 backdrop-blur-sm border border-primary-500/20 rounded-full px-6 py-2 text-white font-medium text-center max-w-xs mx-auto mb-16 shadow-lg shadow-primary-500/10">
          Construction Started – July 2025
        </div>

        {/* Timeline */}
        <div 
          ref={timelineRef}
          className="relative mb-20"
        >
          {/* Timeline Track */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-dark-hover transform -translate-y-1/2 rounded-full"></div>
          
          {/* Timeline Progress */}
          <div 
            className="absolute top-1/2 left-0 w-2/5 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2 rounded-full origin-left"
          ></div>
          
          {/* Timeline Steps */}
          <div className="relative flex justify-between items-center py-10">
            {constructionSteps.map((step) => (
              <TimelineStep 
                key={step.id} 
                step={step} 
                totalSteps={constructionSteps.length} 
              />
            ))}
          </div>
        </div>

        {/* Construction Photos/Videos Grid */}
        <div
          ref={mediaRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {/* Replace with your actual images */}
          <ConstructionMedia 
            src="/images/1.jpg" 
            alt="Aerial view of construction site" 
            type="image" 
          />
          <ConstructionMedia 
            src="/images/2.jpg" 
            alt="Foundation work in progress" 
            type="image" 
          />
          <ConstructionMedia 
            src="/images/3.jpg" 
            alt="Construction equipment on site" 
            type="video" 
            duration="0:15" 
          />
        </div>

        {/* Newsletter Signup */}
        <div
          ref={formRef}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-surface-dark-hover to-surface-dark border border-secondary-500/10 shadow-xl"
        >
          <h3 className="text-h3 gradient-text mb-4 font-bold">Stay Updated</h3>
          <p className="text-muted mb-8">Get construction updates and opening announcements</p>
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-bg-dark px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white w-full"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-primary-500/20 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="text-accent-green font-medium py-3">Thanks for subscribing! We'll keep you updated.</p>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper Components
interface TimelineStepProps {
  step: {
    id: number;
    name: string;
    status: StepStatus;
    date: string;
  };
  totalSteps: number;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, totalSteps }) => {
  const getStatusColor = (status: StepStatus): string => {
    switch (status) {
      case "completed":
        return "bg-accent-green text-white border-accent-green";
      case "in-progress":
        return "bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20";
      default:
        return "bg-surface-dark-hover text-gray-400 border-gray-700";
    }
  };

  return (
    <div
      className="flex flex-col items-center z-10"
      style={{ width: `${100 / totalSteps}%` }}
    >
      <div
        className={`w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${getStatusColor(step.status)} ${step.status === "in-progress" ? "animate-pulse" : ""}`}
      >
        {step.id}
      </div>
      <span className="mt-3 text-xs md:text-sm font-medium text-center">{step.name}</span>
      <span className="text-xs text-muted mt-1">{step.date}</span>
    </div>
  );
};

interface ConstructionMediaProps {
  src: string;
  alt: string;
  type: "image" | "video";
  duration?: string;
}

const ConstructionMedia: React.FC<ConstructionMediaProps> = ({ src, alt, type, duration }) => {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-xl group transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-primary-500/20"
    >
      {type === "image" ? (
        <img src={src} alt={alt} className="w-full aspect-video object-cover" />
      ) : (
        <div className="relative">
          <img src={src} alt={alt} className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {duration && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {duration}
            </div>
          )}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
    </div>
  );
};

export default ConstructionTeaser;