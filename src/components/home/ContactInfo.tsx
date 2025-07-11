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
    <div 
      className="relative min-h-screen overflow-hidden transition-all duration-300"
      style={{ 
        background: 'var(--background)',
        fontFamily: 'var(--font-sans)'
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} duration={3 + i * 0.2} />
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse-slow"
          style={{ 
            background: 'var(--primary-500)',
            opacity: '0.1'
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"
          style={{ 
            background: 'var(--secondary-500)',
            opacity: '0.1'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"
          style={{ 
            background: 'var(--accent-teal)',
            opacity: '0.05'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles 
              className="w-6 h-6 animate-pulse" 
              style={{ color: 'var(--accent-yellow)' }}
            />
            <h1 
              className="text-5xl md:text-7xl font-bold gradient-text"
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h1)'
              }}
            >
              Get In Touch
            </h1>
            <Sparkles 
              className="w-6 h-6 animate-pulse animation-delay-500" 
              style={{ color: 'var(--accent-yellow)' }}
            />
          </div>
          <p 
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ 
              color: 'var(--text-muted)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
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
              <div 
                className="relative p-8 rounded-3xl glassmorphism hover:scale-105 transition-all duration-500 transform-gpu"
                style={{
                  background: 'var(--surface)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: hoveredItem === item.id ? 
                    `0 25px 50px -12px ${item.color === 'text-blue-400' ? '#3B82F6' : 
                     item.color === 'text-green-400' ? '#10B981' : 
                     item.color === 'text-red-400' ? '#EF4444' : 
                     item.color === 'text-purple-400' ? '#8B5CF6' : 
                     item.color === 'text-orange-400' ? '#F59E0B' : '#14B8A6'}25` : 'none'
                }}
              >
                {/* Animated Background Gradient */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${item.gradient}`} 
                />
                
                {/* Floating Icon */}
                <div className={`relative mb-6 transform transition-all duration-500 ${hoveredItem === item.id ? 'scale-110 rotate-12' : ''}`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Animated Ring */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 
                    className="text-xl font-semibold mb-3 transition-colors"
                    style={{ 
                      color: 'var(--text-heading)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-h4)'
                    }}
                  >
                    {item.label}
                  </h3>
                  
                  {item.href ? (
                    <a
                      href={item.href}
                      className={`transition-colors duration-300 block group-hover:underline hover:opacity-80`}
                      style={{ 
                        color: 'var(--foreground)',
                        fontSize: 'var(--text-base)'
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p 
                      className="transition-colors duration-300"
                      style={{ 
                        color: 'var(--foreground)',
                        fontSize: 'var(--text-base)'
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <div 
              className="absolute inset-0 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
              style={{ 
                background: `linear-gradient(135deg, var(--primary-500), var(--secondary-500))`
              }}
            />
            <button 
              className="relative px-12 py-6 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              style={{ 
                background: `linear-gradient(135deg, var(--primary-500), var(--secondary-500))`,
                fontFamily: 'var(--font-display)'
              }}
            >
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Start a Conversation</span>
              </div>
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2">
            <Star 
              className="w-4 h-4 animate-pulse" 
              style={{ color: 'var(--accent-yellow)' }}
            />
            <span 
              style={{ 
                color: 'var(--text-muted)',
                fontSize: 'var(--text-sm)'
              }}
            >
              Available for freelance projects
            </span>
            <Star 
              className="w-4 h-4 animate-pulse animation-delay-500" 
              style={{ color: 'var(--accent-yellow)' }}
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div 
          className="absolute top-10 left-10 w-20 h-20 border-2 rounded-full animate-spin-slow"
          style={{ borderColor: 'var(--primary-500)' }}
        />
        <div 
          className="absolute bottom-10 right-10 w-16 h-16 border-2 rounded-full animate-spin-slow animation-delay-1000"
          style={{ borderColor: 'var(--secondary-500)' }}
        />
        <div 
          className="absolute top-1/3 right-20 w-12 h-12 border-2 rounded-full animate-spin-slow animation-delay-2000"
          style={{ borderColor: 'var(--accent-teal)' }}
        />
      </div>
    </div>
  );
};

export default ContactInfo;