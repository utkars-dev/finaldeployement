import React, { useState, useEffect } from 'react';
import { Play, Leaf, Droplets, Recycle, TreePine, Fish, Sun, Wind, Home, User, BarChart3, Gamepad2, HelpCircle, Info, Menu, X, Moon } from 'lucide-react';
import { Link } from "react-router-dom";
import { link } from 'framer-motion/client';
// import { link } from 'framer-motion/client';
// import { link } from 'framer-motion/client';


const ExploreGames = () => {
  const [hoveredGame, setHoveredGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');

  const themeClasses = {
    nav: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
    accent: isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600',
    button: isDarkMode ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-500 text-white hover:bg-emerald-600',
    navButton: isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    link: isDarkMode ? 'text-emerald-400' : 'text-green-600'
  };

  const t = {
    nav: {
      home: language === 'en' ? 'Home' : 'घर',
      login: language === 'en' ? 'Login' : 'लॉगिन',
      dashboard: language === 'en' ? 'Dashboard' : 'डैशबोर्ड',
      game: language === 'en' ? 'Games' : 'खेल',
      quizzes: language === 'en' ? 'Quizzes' : 'प्रश्नोत्तरी',
      about: language === 'en' ? 'About' : 'के बारे में'
    }
  };

  const navItems = [
    { key: 'home', href: '/', icon: Home, text: t.nav.home },
    { key: 'login', href: '/login', icon: User, text: t.nav.login },
    { key: 'dashboard', href: '/dashboard', icon: BarChart3, text: t.nav.dashboard },
    { key: 'game', href: '/games', icon: Gamepad2, text: t.nav.game },
    { key: 'quizzes', href: '/quiz', icon: HelpCircle, text: t.nav.quizzes },
    { key: 'about', href: '#', icon: Info, text: t.nav.about }
  ];

  const games = [
    {
      id: 1,
      title: "Tree Guardian",
      description: "Protect the forest from deforestation and help it thrive",
      icon: TreePine,
      category: "forest",
      difficulty: "Easy",
      players: "1.2k",
      color: "from-green-400 to-green-600",
      bgImage: "bg-gradient-to-br from-green-100 to-green-200",
      link: "/game1"
    },
    {
      id: 2,
      title: "Eco Run",
      description: "Navigate the lands of a endless plain and save yourself from plastic waste",
      icon: Fish,
      category: "ocean",
      difficulty: "Medium",
      players: "856",
      color: "from-blue-400 to-blue-600",
      bgImage: "bg-gradient-to-br from-blue-100 to-blue-200",
      link: "/game2"
    },
    {
      id: 3,
      title: "Eco Escape",
      description: "Sort the Waste into Different sections",
      icon: Sun,
      category: "energy",
      difficulty: "Hard",
      players: "2.1k",
      color: "from-yellow-400 to-orange-500",
      bgImage: "bg-gradient-to-br from-yellow-100 to-orange-200",
      link: "/game3"
    },
    {
      id: 4,
      title: "Recycling Hero",
      description: "Sort waste correctly and build a circular economy",
      icon: Recycle,
      category: "waste",
      difficulty: "Easy",
      players: "967",
      color: "from-emerald-400 to-teal-600",
      bgImage: "bg-gradient-to-br from-emerald-100 to-teal-200",
      link: "/game4"

    },
    {
      id: 5,
      title: "EcoMitra Waste Sorting",
      description: "Learn about waste sorting through a ineractive journey",
      icon: Droplets,
      category: "water",
      difficulty: "Medium",
      players: "1.5k",
      color: "from-cyan-400 to-blue-500",
      bgImage: "bg-gradient-to-br from-cyan-100 to-blue-200",
      link: "/game5"
    },
    {
      id: 6,
      title: "Ocean Rescue Rangers",
      description: "Rescue the fishes of the giant ocean by removing harmfull waste",
      icon: Wind,
      category: "energy",
      difficulty: "Hard",
      players: "743",
      color: "from-indigo-400 to-purple-500",
      bgImage: "bg-gradient-to-br from-indigo-100 to-purple-200",
      link: "/game6"
    },
    {
      id: 7,
      title: "Eco Village",
      description: "Build and manage a sustainable community",
      icon: Leaf,
      category: "community",
      difficulty: "Medium",
      players: "1.8k",
      color: "from-lime-400 to-green-500",
      bgImage: "bg-gradient-to-br from-lime-100 to-green-200"
    },
    {
      id: 8,
      title: "Climate Detective",
      description: "Investigate environmental mysteries and find solutions",
      icon: TreePine,
      category: "education",
      difficulty: "Easy",
      players: "1.3k",
      color: "from-teal-400 to-cyan-500",
      bgImage: "bg-gradient-to-br from-teal-100 to-cyan-200"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Games', icon: Play },
    { id: 'forest', name: 'Forest', icon: TreePine },
    { id: 'ocean', name: 'Ocean', icon: Fish },
    { id: 'energy', name: 'Energy', icon: Sun },
    { id: 'waste', name: 'Waste', icon: Recycle },
    { id: 'water', name: 'Water', icon: Droplets }
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50'}`}>
      {/* Navigation Header */}
      <nav className={`${themeClasses.nav} sticky top-0 z-50 transition-all duration-500 ease-in-out ${scrollY > 50 ? 'py-2' : 'py-4'}`}>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <Leaf className="h-10 w-10 text-emerald-500 group-hover:text-emerald-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg group-hover:bg-emerald-300/30 transition-all duration-300 group-hover:scale-150"></div>
              </div>
              <span className={`ml-3 text-2xl font-bold bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                EcoMitra
              </span>
              <div className="ml-3 flex space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping delay-100"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping delay-200"></div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className={`${themeClasses.textSecondary} hover:${themeClasses.link.split(' ')[0]} px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200`}>
                  <Home className="h-4 w-4 mr-1" />
                  {t.nav.home}
                </a>
                <a href="/login" className={`${themeClasses.textSecondary} hover:${themeClasses.link.split(' ')[0]} px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200`}>
                  <User className="h-4 w-4 mr-1" />
                  {t.nav.login}
                </a>
                <a href="/dashboard" className={`${themeClasses.textSecondary} hover:${themeClasses.link.split(' ')[0]} px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200`}>
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {t.nav.dashboard}
                </a>
                <a href="/game" className="text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center bg-green-50 border border-green-200">
                  <Gamepad2 className="h-4 w-4 mr-1" />
                  {t.nav.game}
                </a>
                <a href="/quiz" className={`${themeClasses.textSecondary} hover:${themeClasses.link.split(' ')[0]} px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200`}>
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {t.nav.quizzes}
                </a>
                <a href="#" className={`${themeClasses.textSecondary} hover:${themeClasses.link.split(' ')[0]} px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200`}>
                  <Info className="h-4 w-4 mr-1" />
                  {t.nav.about}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleDarkMode} 
                className={`p-3 rounded-full transition-all duration-500 transform hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-amber-400/25 text-amber-400 hover:bg-amber-400/35 shadow-lg shadow-amber-400/25' 
                    : 'bg-purple-500/25 text-purple-600 hover:bg-purple-500/35 shadow-lg shadow-purple-500/25'
                }`}
                aria-label="Toggle dark mode"
              >
                <div className="relative">
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 animate-spin" style={{animationDuration: '3s'}} />
                  ) : (
                    <Moon className="h-5 w-5 animate-pulse" />
                  )}
                </div>
              </button>

              <button 
                onClick={toggleLanguage} 
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${themeClasses.button}`}
              >
                {language === 'en' ? 'हिं' : 'EN'}
              </button>

              <div className="md:hidden">
                <button 
                  onClick={toggleMenu} 
                  className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${themeClasses.navButton}`}
                >
                  <div className="relative">
                    {isMenuOpen ? (
                      <X className="h-6 w-6 animate-spin" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden ${themeClasses.nav} backdrop-blur-xl border-t ${isDarkMode ? 'border-emerald-500/30' : 'border-emerald-300'}`}>
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.key} 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 ${themeClasses.textSecondary} hover:${themeClasses.link.split(' ')[0]} hover:bg-emerald-400/10`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className={`text-5xl font-bold bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent mb-4`}>
              {language === 'en' ? 'Explore EcoMitra Games' : 'EcoMitra गेम्स का अन्वेषण करें'}
            </h1>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              {language === 'en' 
                ? 'Learn, play, and save the planet! Discover interactive games that teach environmental conservation through fun challenges.'
                : 'सीखें, खेलें और पृथ्वी को बचाएं! मज़ेदार चुनौतियों के माध्यम से पर्यावरण संरक्षण सिखाने वाले इंटरैक्टिव गेम्स की खोज करें।'
              }
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${themeClasses.button.includes('emerald-600') ? 'from-green-500 to-blue-500' : 'from-emerald-500 to-green-500'} text-white shadow-lg scale-105`
                      : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50'} shadow-md hover:shadow-lg hover:scale-105`
                  }`}
                >
                  <IconComponent size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Games Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => {
              const IconComponent = game.icon;
              return (
                <div
                  key={game.id}
                  className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10 ${
                    hoveredGame === game.id ? 'scale-105 z-10' : ''
                  }`}
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  {/* Game Card */}
                  <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : game.bgImage + ' border-white/50'} rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border backdrop-blur-sm`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${game.color} shadow-lg`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Play size={14} />
                        <span className="text-sm font-semibold">{game.players}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100 group-hover:text-emerald-400' : 'text-gray-800 group-hover:text-green-700'} mb-2 transition-colors`}>
                        {game.title}
                      </h3>
                      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-4`}>
                        {game.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Link to={game.link}>
                        <button className={`px-4 py-2 bg-gradient-to-r ${game.color} text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2`}>
                        <Play size={14} />
                         Play Now
                       </button>
                       </Link>

                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${game.color}`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Section */}
          <div className="text-center mt-12">
            <button className={`px-8 py-4 bg-gradient-to-r ${themeClasses.button.includes('emerald-600') ? 'from-green-500 to-blue-500' : 'from-emerald-500 to-green-500'} text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
              {language === 'en' ? 'Load More Games' : 'और गेम्स लोड करें'}
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 right-10 opacity-20 pointer-events-none">
          <div className="animate-bounce">
            <Leaf className="text-green-400" size={40} />
          </div>
        </div>
        <div className="fixed bottom-20 left-10 opacity-20 pointer-events-none">
          <div className="animate-pulse">
            <Droplets className="text-blue-400" size={35} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreGames;