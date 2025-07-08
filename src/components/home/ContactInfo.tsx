'use client'
import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Clock, 
  Send,
  MessageCircle,
  Calendar,
  Star,
  Sparkles
} from 'lucide-react';

interface ContactItem {
  id: number;
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  color: string;
  gradient: string;
}

const ContactInfo: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactItems: ContactItem[] = [
    {
      id: 1,
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "egnuma.gelana@gmail.com",
      href: "mailto:egnuma.gelana@gmail.com",
      color: "text-blue-400",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      id: 2,
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      color: "text-green-400",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      id: 3,
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "New York, NY",
      href: "#",
      color: "text-red-400",
      gradient: "from-red-400 to-pink-400"
    },
    {
      id: 4,
      icon: <Globe className="w-5 h-5" />,
      label: "Website",
      value: "egnuma-gelana.com",
      href: "https://egnuma-gelana.com",
      color: "text-purple-400",
      gradient: "from-purple-400 to-indigo-400"
    },
    {
      id: 5,
      icon: <Clock className="w-5 h-5" />,
      label: "Availability",
      value: "Mon - Fri, 9AM - 6PM EST",
      color: "text-orange-400",
      gradient: "from-orange-400 to-yellow-400"
    },
    {
      id: 6,
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Response Time",
      value: "Within 24 hours",
      color: "text-teal-400",
      gradient: "from-teal-400 to-cyan-400"
    }
  ];

  const FloatingParticle = ({ delay, duration }: { delay: number; duration: number }) => (
    <div 
      className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} duration={3 + i * 0.2} />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse animation-delay-500" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Let's connect and explore opportunities together. I'm always excited to discuss new projects and collaborations.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Glassmorphism Card */}
              <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${item.gradient}`} />
                
                {/* Floating Icon */}
                <div className={`relative mb-6 transform transition-all duration-500 ${hoveredItem === item.id ? 'scale-110 rotate-12' : ''}`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg shadow-purple-500/25`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Animated Ring */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                    {item.label}
                  </h3>
                  
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`text-gray-300 hover:text-white transition-colors duration-300 block ${item.color} group-hover:underline`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.value}
                    </p>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            <button className="relative px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Start a Conversation</span>
              </div>
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>Available for freelance projects</span>
            <Star className="w-4 h-4 text-yellow-400 animate-pulse animation-delay-500" />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-500/30 rounded-full animate-spin-slow" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-blue-500/30 rounded-full animate-spin-slow animation-delay-1000" />
        <div className="absolute top-1/3 right-20 w-12 h-12 border-2 border-cyan-500/30 rounded-full animate-spin-slow animation-delay-2000" />
      </div>
    </div>
  );
};

export default ContactInfo;