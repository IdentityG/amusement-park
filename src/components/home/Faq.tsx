"use client"
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Lightbulb,
  MessageCircle,
  Clock,
  Star,
  Sparkles,
  Filter,
  X,
  CheckCircle,
  Info,
  Zap
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
      question: "What services do you offer?",
      answer: "I offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, digital marketing, and technical consulting. Each service is tailored to meet your specific business needs and goals.",
      category: "services",
      icon: <Zap className="w-5 h-5" />,
      color: "text-blue-400",
      gradient: "from-blue-400 to-cyan-400",
      tags: ["web", "mobile", "design", "marketing"]
    },
    {
      id: 2,
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 2-6 months. I always provide detailed timelines during the initial consultation.",
      category: "timeline",
      icon: <Clock className="w-5 h-5" />,
      color: "text-green-400",
      gradient: "from-green-400 to-emerald-400",
      tags: ["timeline", "project", "development"]
    },
    {
      id: 3,
      question: "What is your pricing structure?",
      answer: "I offer flexible pricing options including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project complexity, timeline, and specific requirements. Contact me for a personalized quote.",
      category: "pricing",
      icon: <Star className="w-5 h-5" />,
      color: "text-yellow-400",
      gradient: "from-yellow-400 to-orange-400",
      tags: ["pricing", "cost", "budget"]
    },
    {
      id: 4,
      question: "Do you provide ongoing support?",
      answer: "Yes! I offer comprehensive post-launch support including bug fixes, updates, maintenance, and feature enhancements. Support packages are available on monthly or annual basis.",
      category: "support",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-purple-400",
      gradient: "from-purple-400 to-indigo-400",
      tags: ["support", "maintenance", "updates"]
    },
    {
      id: 5,
      question: "What technologies do you work with?",
      answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, Python, and various databases. I also work with cloud platforms like AWS, Vercel, and modern deployment strategies.",
      category: "technical",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "text-red-400",
      gradient: "from-red-400 to-pink-400",
      tags: ["react", "nodejs", "typescript", "aws"]
    },
    {
      id: 6,
      question: "How do we communicate during the project?",
      answer: "I believe in transparent communication. We'll have regular check-ins via video calls, use project management tools for tracking progress, and I'm always available via email or chat for quick questions.",
      category: "communication",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "text-teal-400",
      gradient: "from-teal-400 to-cyan-400",
      tags: ["communication", "updates", "meetings"]
    },
    {
      id: 7,
      question: "Can you help with existing projects?",
      answer: "Absolutely! I can help with code reviews, performance optimization, bug fixes, feature additions, and modernizing legacy systems. I'm experienced in taking over and improving existing codebases.",
      category: "services",
      icon: <Info className="w-5 h-5" />,
      color: "text-orange-400",
      gradient: "from-orange-400 to-red-400",
      tags: ["existing", "legacy", "optimization"]
    },
    {
      id: 8,
      question: "Do you work with international clients?",
      answer: "Yes, I work with clients worldwide! I'm flexible with time zones and have experience collaborating with teams across different countries and cultures.",
      category: "general",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "text-indigo-400",
      gradient: "from-indigo-400 to-purple-400",
      tags: ["international", "remote", "global"]
    }
  ];

  const categories: Category[] = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" />, color: 'text-white', count: faqData.length },
    { id: 'services', name: 'Services', icon: <Zap className="w-4 h-4" />, color: 'text-blue-400', count: faqData.filter(item => item.category === 'services').length },
    { id: 'timeline', name: 'Timeline', icon: <Clock className="w-4 h-4" />, color: 'text-green-400', count: faqData.filter(item => item.category === 'timeline').length },
    { id: 'pricing', name: 'Pricing', icon: <Star className="w-4 h-4" />, color: 'text-yellow-400', count: faqData.filter(item => item.category === 'pricing').length },
    { id: 'support', name: 'Support', icon: <CheckCircle className="w-4 h-4" />, color: 'text-purple-400', count: faqData.filter(item => item.category === 'support').length },
    { id: 'technical', name: 'Technical', icon: <Lightbulb className="w-4 h-4" />, color: 'text-red-400', count: faqData.filter(item => item.category === 'technical').length },
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Find answers to commonly asked questions about my services, process, and approach.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
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
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFAQs.map((item, index) => (
              <div
                key={item.id}
                className={`group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Question Header */}
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full flex items-center justify-between text-left group-hover:text-white transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                        <div className="text-white">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white pr-4">
                        {item.question}
                      </h3>
                    </div>
                    
                    <ChevronDown 
                      className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        expandedItem === item.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Answer Section - Fixed with proper animation */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedItem === item.id 
                        ? 'max-h-96 opacity-100 mt-6' 
                        : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <div className="pl-16 pr-8">
                      <div className="border-l-2 border-purple-400/30 pl-6">
                        <p className="text-gray-300 leading-relaxed mb-4">
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

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
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