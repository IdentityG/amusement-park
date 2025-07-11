"use client"
import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Search,
  Lightbulb,
  MessageCircle,
  Clock,
  Sparkles,
  X,
  CheckCircle,
  Info,
  Zap,
  HelpCircle,
  MapPin,
  Ticket,
  Smile,
  UtensilsCrossed,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

const FAQ: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "When will Mekiya Amusement and Water Park open?",
      answer: "The park is currently under construction and expected to open in phases soon. Follow our social media and website for regular updates on our grand opening dates.",
      category: "general",
      icon: <Clock className="w-5 h-5" />,
      color: "text-blue-400",
      gradient: "from-blue-400 to-cyan-400",
      tags: ["opening", "timeline", "updates"]
    },
    {
      id: 2,
      question: "What attractions will the park include?",
      answer: "Mekiya will feature world-class water slides, amusement rides, wave pools, a lazy river, children's splash zones, themed zones, and immersive entertainment experiences designed for all age groups.",
      category: "attractions",
      icon: <Zap className="w-5 h-5" />,
      color: "text-green-400",
      gradient: "from-green-400 to-emerald-400",
      tags: ["rides", "waterpark", "family"]
    },
    {
      id: 3,
      question: "Where is the park located?",
      answer: "Mekiya Amusement and Water Park is located just outside Mekiya town, easily accessible via major roads and public transportation. Exact directions will be shared closer to the opening.",
      category: "location",
      icon: <MapPin className="w-5 h-5" />,
      color: "text-purple-400",
      gradient: "from-purple-400 to-indigo-400",
      tags: ["map", "address", "transport"]
    },
    {
      id: 4,
      question: "Will tickets be available online?",
      answer: "Yes! You will be able to purchase tickets and season passes directly from our website and app. We’ll also offer early-bird discounts and special packages online.",
      category: "tickets",
      icon: <Ticket className="w-5 h-5" />,
      color: "text-yellow-400",
      gradient: "from-yellow-400 to-orange-400",
      tags: ["tickets", "booking", "online"]
    },
    {
      id: 5,
      question: "Is Mekiya Park suitable for young children?",
      answer: "Absolutely! We have dedicated zones for toddlers and young children, including shallow splash pools, mini-rides, and plenty of shaded relaxation areas for families.",
      category: "families",
      icon: <Smile className="w-5 h-5" />,
      color: "text-teal-400",
      gradient: "from-teal-400 to-cyan-400",
      tags: ["children", "kids", "family"]
    },
    {
      id: 6,
      question: "Will there be restaurants and dining options?",
      answer: "Yes, the park will feature a wide range of food courts, themed cafes, and snack bars offering both local and international cuisine. You’ll never go hungry at Mekiya!",
      category: "food",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      color: "text-red-400",
      gradient: "from-red-400 to-pink-400",
      tags: ["food", "restaurant", "dining"]
    },
    {
      id: 7,
      question: "Are lockers and changing facilities available?",
      answer: "Yes, locker rentals, changing rooms, and shower areas will be available throughout the park to keep your belongings safe and ensure your comfort.",
      category: "facilities",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "text-indigo-400",
      gradient: "from-indigo-400 to-purple-400",
      tags: ["lockers", "safety", "changing"]
    },
    {
      id: 8,
      question: "Can I host events or birthdays at the park?",
      answer: "Yes! Mekiya Park will offer customizable birthday packages, event spaces, and VIP cabana rentals for unforgettable group experiences. Contact us to learn more once we launch.",
      category: "events",
      icon: <CalendarCheck className="w-5 h-5" />,
      color: "text-orange-400",
      gradient: "from-orange-400 to-red-400",
      tags: ["birthday", "event", "group"]
    }
  ];


  const categories: Category[] = [
    {
      id: 'all',
      name: 'All Questions',
      icon: <HelpCircle className="w-4 h-4" />,
      color: 'text-white',
      count: faqData.length
    },
    {
      id: 'general',
      name: 'General',
      icon: <Info className="w-4 h-4" />,
      color: 'text-indigo-400',
      count: faqData.filter(item => item.category === 'general').length
    },
    {
      id: 'attractions',
      name: 'Attractions',
      icon: <Zap className="w-4 h-4" />,
      color: 'text-green-400',
      count: faqData.filter(item => item.category === 'attractions').length
    },
    {
      id: 'location',
      name: 'Location',
      icon: <MapPin className="w-4 h-4" />,
      color: 'text-purple-400',
      count: faqData.filter(item => item.category === 'location').length
    },
    {
      id: 'tickets',
      name: 'Tickets',
      icon: <Ticket className="w-4 h-4" />,
      color: 'text-yellow-400',
      count: faqData.filter(item => item.category === 'tickets').length
    },
    {
      id: 'families',
      name: 'Family & Kids',
      icon: <Smile className="w-4 h-4" />,
      color: 'text-teal-400',
      count: faqData.filter(item => item.category === 'families').length
    },
    {
      id: 'food',
      name: 'Food & Dining',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      color: 'text-red-400',
      count: faqData.filter(item => item.category === 'food').length
    },
    {
      id: 'facilities',
      name: 'Facilities',
      icon: <ShieldCheck className="w-4 h-4" />,
      color: 'text-blue-400',
      count: faqData.filter(item => item.category === 'facilities').length
    },
    {
      id: 'events',
      name: 'Events & Birthdays',
      icon: <CalendarCheck className="w-4 h-4" />,
      color: 'text-orange-400',
      count: faqData.filter(item => item.category === 'events').length
    }
  ];


  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const FloatingParticle = ({ delay, duration }: { delay: number; duration: number }) => (
    <div
      className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} duration={2 + i * 0.1} />
        ))}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              FAQ
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--foreground)' }}
          >
            Find answers to commonly asked questions about my services, process, and approach.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                style={{
                  color: 'var(--text-muted)',
                  width: '1.25rem',
                  height: '1.25rem',
                }}
              />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none transition-all duration-300"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--foreground)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-medium`}
                style={{
                  background:
                    selectedCategory === category.id
                      ? 'var(--accent-purple)'
                      : 'var(--surface)',
                  color:
                    selectedCategory === category.id
                      ? 'white'
                      : 'var(--text-muted)',
                  boxShadow:
                    selectedCategory === category.id
                      ? '0 4px 20px rgba(156, 39, 176, 0.4)'
                      : 'none',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {category.icon}
                <span>{category.name}</span>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background:
                      selectedCategory === category.id
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                    color: selectedCategory === category.id ? 'white' : 'var(--text-muted)',
                  }}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: 'var(--text-muted)' }}
              />
              <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                No questions found matching your search.
              </p>
            </div>
          ) : (
            filteredFAQs.map((item, index) => (
              <div
                key={item.id}
                className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <div
                  className="relative p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'var(--surface)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full flex items-center justify-between text-left transition-colors duration-300"
                    style={{ color: 'var(--text-heading)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                        <div className="text-white">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold pr-4">
                        {item.question}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-300 flex-shrink-0 ${expandedItem === item.id ? 'transform rotate-180' : ''}`}
                      style={{ color: 'var(--text-muted)' }}
                    />
                  </button>

                  {/* Answer Section */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedItem === item.id ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
                      }`}
                  >
                    <div className="pl-16 pr-8">
                      <div
                        className="pl-6 border-l-2"
                        style={{ borderColor: 'rgba(156, 39, 176, 0.3)' /* purple-400/30 */ }}
                      >
                        <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
                          {item.answer}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${item.gradient} text-white opacity-90`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>


        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)] backdrop-blur-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white mb-6">
              Don't hesitate to reach out! I'm here to help and answer any specific questions you might have.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <MessageCircle className="w-5 h-5" />
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;