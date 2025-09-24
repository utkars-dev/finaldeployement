import React, { useState, useEffect } from 'react';

const EcoMitraAbout = () => {
  const [activeValue, setActiveValue] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Promoting sustainable practices for a greener future",
      details: "We focus on renewable energy, waste reduction, and sustainable living practices that can be implemented in daily life.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: "📚",
      title: "Education",
      description: "Empowering minds through environmental knowledge",
      details: "Our comprehensive curriculum covers climate science, biodiversity, and practical environmental solutions.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: "🌍",
      title: "Community",
      description: "Building a global network of eco-conscious individuals",
      details: "Connect with like-minded people, share experiences, and collaborate on environmental projects worldwide.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Fostering creative solutions for environmental challenges",
      details: "Supporting breakthrough technologies and innovative approaches to solve environmental problems.",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const teamMembers = [
    { name: "Environmental Science", role: "Core Curriculum", emoji: "🔬" },
    { name: "Climate Action", role: "Practical Solutions", emoji: "🌡️" },
    { name: "Biodiversity", role: "Conservation Focus", emoji: "🦋" },
    { name: "Renewable Energy", role: "Future Technology", emoji: "⚡" }
  ];

  const stats = [
    { number: "10,000+", label: "Students Educated", icon: "👩‍🎓" },
    { number: "50+", label: "Environmental Topics", icon: "📖" },
    { number: "25", label: "Countries Reached", icon: "🌐" },
    { number: "95%", label: "Student Satisfaction", icon: "⭐" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 right-20 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: '1s', transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200/25 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s', transform: `translateY(${scrollY * 0.08}px)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto p-4 relative z-10">
        {/* Animated Header */}
        <div className="text-center mb-16 p-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500 group">
          <div className="relative">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
              EcoMitra
            </h1>
            <div className="absolute -top-2 -right-2 text-2xl animate-spin-slow group-hover:animate-bounce">🌟</div>
          </div>
          <p className="text-2xl text-gray-600 italic transform group-hover:scale-105 transition-transform duration-300">
            Your Interactive Partner in Environmental Education
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            {['🌿', '🌊', '🌤️', '🔋'].map((emoji, idx) => (
              <div 
                key={idx}
                className="text-3xl animate-bounce hover:scale-150 cursor-pointer transition-transform duration-300"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 text-center group cursor-pointer transform hover:scale-110 hover:rotate-2 transition-all duration-300"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce">{stat.icon}</div>
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:text-blue-600 transition-colors">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content with Parallax Effect */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* About Text with Hover Effects */}
          <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-xl border-l-8 border-green-500 group hover:shadow-2xl transition-all duration-500 hover:border-blue-500">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent mb-8 group-hover:scale-105 transition-transform">
              About EcoMitra ✨
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed hover:text-green-700 transition-colors duration-300 cursor-default">
                🌍 EcoMitra is dedicated to fostering environmental awareness through 
                <span className="font-semibold text-green-600 hover:text-blue-600 transition-colors"> comprehensive educational programs</span>. 
                We believe knowledge is the key to creating a sustainable world.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed hover:text-blue-700 transition-colors duration-300 cursor-default">
                🚀 Our mission is to make environmental education 
                <span className="font-semibold text-blue-600 hover:text-purple-600 transition-colors"> accessible, engaging, and actionable</span> 
                for learners of all ages through innovative teaching methods.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed hover:text-purple-700 transition-colors duration-300 cursor-default">
                🤝 Join us in creating a 
                <span className="font-semibold text-purple-600 hover:text-green-600 transition-colors"> greener, sustainable future</span> 
                where education meets action and every individual makes a difference.
              </p>
            </div>
          </div>

          {/* Mission & Vision with Interactive Elements */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-l-8 border-blue-500 group hover:shadow-2xl transition-all duration-500 hover:border-green-500">
              <h3 className="text-3xl font-bold text-blue-800 mb-6 flex items-center group-hover:text-green-800 transition-colors">
                <span className="mr-4 text-3xl animate-pulse group-hover:animate-spin">🎯</span>
                Our Mission
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed group-hover:text-blue-700 transition-colors">
                To provide high-quality environmental education that inspires sustainable 
                practices and empowers individuals to protect our planet through informed action.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-l-8 border-purple-500 group hover:shadow-2xl transition-all duration-500 hover:border-yellow-500">
              <h3 className="text-3xl font-bold text-purple-800 mb-6 flex items-center group-hover:text-yellow-800 transition-colors">
                <span className="mr-4 text-3xl animate-pulse group-hover:animate-bounce">🔮</span>
                Our Vision
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed group-hover:text-purple-700 transition-colors">
                A world where every person has the knowledge and motivation to contribute 
                to environmental conservation, creating a sustainable future for all.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Values Section */}
        <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/30 mb-16">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-12">
            Our Interactive Core Values 🌈
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl cursor-pointer transform transition-all duration-500 border-4 ${
                  activeValue === index 
                    ? 'scale-110 shadow-2xl border-white rotate-2' 
                    : 'hover:scale-105 border-transparent hover:shadow-xl hover:-rotate-1'
                }`}
                style={{
                  background: activeValue === index 
                    ? `linear-gradient(135deg, ${value.color.replace('from-', '').replace(' to-', ', ')})` 
                    : 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                }}
                onMouseEnter={() => setActiveValue(index)}
                onMouseLeave={() => setActiveValue(null)}
              >
                <div className="text-center">
                  <div 
                    className={`text-6xl mb-4 transition-all duration-300 ${
                      activeValue === index ? 'animate-bounce scale-125' : 'hover:scale-110'
                    }`}
                  >
                    {value.icon}
                  </div>
                  <h4 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                    activeValue === index ? 'text-white' : 'text-gray-800'
                  }`}>
                    {value.title}
                  </h4>
                  <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                    activeValue === index ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {value.description}
                  </p>
                  {activeValue === index && (
                    <p className="text-white/80 text-xs leading-relaxed animate-fadeIn">
                      {value.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Team/Focus Areas */}
        <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/30 mb-16">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-12">
            Our Focus Areas 🎯
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-300 text-center group cursor-pointer transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-5xl mb-4 group-hover:animate-spin">{member.emoji}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h4>
                <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Call to Action */}
        <div className="text-center p-12 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 group relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-6 group-hover:animate-bounce">
              Ready to Make a Difference? 🚀
            </h3>
            <p className="text-blue-100 text-xl mb-8 group-hover:text-white transition-colors">
              Join thousands of learners making positive environmental changes!
            </p>
            <button className="bg-white text-purple-700 px-12 py-4 rounded-full font-bold text-xl hover:bg-yellow-300 hover:text-purple-800 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:rotate-2 group-hover:animate-pulse">
              🌟 Start Learning Today 🌟
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EcoMitraAbout;