import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronRight, Award, Leaf, Zap, Users, Trophy, CheckCircle, XCircle, Star, Lock, Unlock, Sun, Moon, Home, Play, RotateCcw, ArrowRight, ArrowLeft, Menu, X, User, BarChart3, Gamepad2, HelpCircle, Info, TreePine, Sprout, Sparkles } from 'lucide-react';

const EcoQuizApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(1250);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState(['eco-starter']);
  const [particles, setParticles] = useState([]);
  const [screenTransition, setScreenTransition] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [leaderboard, setLeaderboard] = useState([
    { name: 'EcoWarrior', points: 2150, badge: 'climate-hero' },
    { name: 'GreenThumb', points: 1890, badge: 'water-saver' },
    { name: 'You', points: 1250, badge: 'eco-starter' },
    { name: 'NatureLover', points: 980, badge: 'waste-reducer' },
    { name: 'PlanetGuard', points: 750, badge: 'energy-efficient' }
  ]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.2,
      color: isDarkMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.6)'
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed * 0.05) % 100,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeClasses = useMemo(() => ({
    bg: 'bg-gradient-to-br from-white via-emerald-50 to-green-50',
    nav: 'bg-white/95 backdrop-blur-xl border-b border-emerald-300 shadow-xl',
    text: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    card: 'bg-white/85 backdrop-blur-md border border-emerald-300 shadow-xl',
    accent: 'from-emerald-600 to-green-600',
    link: 'text-emerald-700 hover:text-emerald-800 transition-all duration-300',
    button: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-xl hover:shadow-emerald-500/30',
    buttonSecondary: 'bg-white/90 border-2 border-emerald-500/70 hover:border-emerald-600 text-emerald-700 hover:bg-emerald-50 backdrop-blur-md',
    navButton: 'bg-emerald-100/90 hover:bg-emerald-200/90 text-emerald-800 hover:text-emerald-900 border border-emerald-400 backdrop-blur-sm',
    overlay: 'bg-white/60',
    sectionOverlay: 'bg-white/75',
  }), []);

  const translations = useMemo(() => ({
    en: {
        nav: { home: 'Home', login: 'Login', dashboard: 'Dashboard', game: 'Game', quizzes: 'Quizzes', about: 'About Us' },
    },
    hi: {
        nav: { home: 'होम', login: 'लॉगिन', dashboard: 'डैशबोर्ड', game: 'गेम', quizzes: 'क्विज़', about: 'हमारे बारे में' },
    }
  }), []);

  const t = translations[language];

  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);
  const toggleLanguage = useCallback(() => setLanguage(language === 'en' ? 'hi' : 'en'), [language]);
  const toggleDarkMode = useCallback(() => setIsDarkMode(!isDarkMode), [isDarkMode]);

  const navItems = useMemo(() => [
    { key: 'home', icon: Home, text: t.nav.home, href: '#' },
    { key: 'login', icon: User, text: t.nav.login, href: '/login' },
    { key: 'dashboard', icon: BarChart3, text: t.nav.dashboard, href: '/dashboard' },
    { key: 'game', icon: Gamepad2, text: t.nav.game, href: '/waste' },
    { key: 'quizzes', icon: HelpCircle, text: t.nav.quizzes, href: '/quiz' },
    { key: 'about', icon: Info, text: t.nav.about, href: '#' }
  ], [t]);

  const quizzes = [
    {
      id: 'waste',
      title: 'Waste Management',
      icon: '♻️',
      difficulty: 'Beginner',
      points: 50,
      unlocked: true,
      color: 'from-green-500 to-emerald-600',
      questions: [
        {
          question: "What percentage of plastic waste is recycled globally?",
          options: ["Less than 10%", "Around 25%", "About 50%", "Over 75%"],
          correct: 0,
          explanation: "Less than 10% of all plastic ever produced has been recycled. Most ends up in landfills or the environment, highlighting the urgent need for better waste management systems."
        },
        {
          question: "Which item takes the longest to decompose in a landfill?",
          options: ["Banana peel", "Plastic bottle", "Glass bottle", "Paper"],
          correct: 2,
          explanation: "Glass bottles can take up to 1 million years to decompose, while plastic bottles take 450+ years. However, glass is 100% recyclable indefinitely."
        },
        {
          question: "What is the most effective waste management strategy?",
          options: ["Recycle more", "Buy in bulk", "Reduce consumption", "Compost everything"],
          correct: 2,
          explanation: "The waste hierarchy prioritizes: Reduce first, then Reuse, then Recycle. Reducing consumption is the most impactful approach."
        },
        {
          question: "What percentage of food waste could be composted?",
          options: ["20%", "40%", "60%", "80%"],
          correct: 3,
          explanation: "About 80% of food waste is compostable. Composting reduces methane emissions from landfills and creates nutrient-rich soil."
        },
        {
          question: "Which country produces the most plastic waste per capita?",
          options: ["China", "United States", "India", "Germany"],
          correct: 1,
          explanation: "The United States produces the most plastic waste per capita, generating over 130kg per person annually."
        }
      ]
    },
    {
      id: 'climate',
      title: 'Climate Change',
      icon: '🌡️',
      difficulty: 'Intermediate',
      points: 75,
      unlocked: true,
      color: 'from-red-500 to-orange-600',
      questions: [
        {
          question: "What is the main greenhouse gas responsible for global warming?",
          options: ["Methane", "Carbon Dioxide", "Nitrous Oxide", "Water Vapor"],
          correct: 1,
          explanation: "While water vapor is more abundant, CO2 is the primary driver of human-caused climate change, responsible for about 76% of greenhouse gas emissions."
        },
        {
          question: "How much has global temperature risen since pre-industrial times?",
          options: ["0.5°C", "1.1°C", "2.0°C", "3.5°C"],
          correct: 1,
          explanation: "Global temperatures have risen approximately 1.1°C since the late 1800s. The Paris Agreement aims to limit warming to well below 2°C."
        },
        {
          question: "Which sector contributes most to global CO2 emissions?",
          options: ["Transportation", "Agriculture", "Energy production", "Industry"],
          correct: 2,
          explanation: "Energy production (electricity, heat, and fuel) accounts for about 73% of global greenhouse gas emissions."
        },
        {
          question: "What is the carbon footprint of the average person globally?",
          options: ["2 tons CO2/year", "4 tons CO2/year", "6 tons CO2/year", "8 tons CO2/year"],
          correct: 1,
          explanation: "The global average carbon footprint is about 4 tons CO2 per person per year, but this varies greatly between countries and lifestyles."
        },
        {
          question: "Which renewable energy source has grown fastest globally?",
          options: ["Wind", "Solar", "Hydroelectric", "Geothermal"],
          correct: 1,
          explanation: "Solar energy has seen the fastest growth, with capacity increasing by over 20% annually in recent years due to falling costs and improved technology."
        }
      ]
    },
    {
      id: 'water',
      title: 'Water Conservation',
      icon: '💧',
      difficulty: 'Beginner',
      points: 60,
      unlocked: ecoPoints >= 1200,
      color: 'from-blue-500 to-cyan-600',
      questions: [
        {
          question: "What percentage of Earth's water is freshwater?",
          options: ["2.5%", "10%", "25%", "50%"],
          correct: 0,
          explanation: "Only 2.5% of Earth's water is freshwater, and most of that is frozen in glaciers and ice caps. Less than 1% is accessible for human use."
        },
        {
          question: "Which activity uses the most household water?",
          options: ["Showering", "Toilet flushing", "Washing clothes", "Drinking/cooking"],
          correct: 1,
          explanation: "Toilet flushing typically accounts for 24-30% of household water use. Modern low-flow toilets can reduce this significantly."
        },
        {
          question: "How much water does it take to produce 1kg of beef?",
          options: ["500 liters", "1,500 liters", "5,000 liters", "15,000 liters"],
          correct: 3,
          explanation: "It takes approximately 15,000 liters of water to produce 1kg of beef, considering feed production, processing, and drinking water."
        },
        {
          question: "Which region faces the greatest water scarcity?",
          options: ["Sub-Saharan Africa", "Middle East", "Central Asia", "All of the above"],
          correct: 3,
          explanation: "All these regions face severe water scarcity, affecting over 2 billion people globally. Climate change is expected to worsen the situation."
        },
        {
          question: "What's the most effective way to conserve water at home?",
          options: ["Shorter showers", "Fix leaks", "Install efficient fixtures", "All of the above"],
          correct: 3,
          explanation: "A comprehensive approach works best: fix leaks (can save 10% of water bill), install efficient fixtures, and change daily habits like shorter showers."
        }
      ]
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      icon: '🔋',
      difficulty: 'Advanced',
      points: 100,
      unlocked: ecoPoints >= 1400,
      color: 'from-yellow-500 to-amber-600',
      questions: [
        {
          question: "Which renewable energy source has the highest capacity factor?",
          options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
          correct: 2,
          explanation: "Hydroelectric power typically has the highest capacity factor (40-60%), meaning it produces electricity most consistently throughout the year."
        },
        {
          question: "What percentage of global electricity comes from renewables?",
          options: ["15%", "28%", "45%", "60%"],
          correct: 1,
          explanation: "As of 2023, renewables account for about 28% of global electricity generation, with hydropower being the largest contributor."
        },
        {
          question: "Which country leads in solar energy capacity?",
          options: ["Germany", "United States", "China", "Japan"],
          correct: 2,
          explanation: "China leads with over 260 GW of solar capacity, more than the next four countries combined, representing about 35% of global capacity."
        },
        {
          question: "What is the main challenge with renewable energy?",
          options: ["High costs", "Intermittency", "Land use", "Technology limitations"],
          correct: 1,
          explanation: "Intermittency is the main challenge - the sun doesn't always shine and wind doesn't always blow. Energy storage solutions are crucial for addressing this."
        },
        {
          question: "Which renewable technology has seen the steepest cost decline?",
          options: ["Wind turbines", "Solar panels", "Hydroelectric", "Biomass"],
          correct: 1,
          explanation: "Solar panel costs have fallen by over 85% in the past decade, making solar the cheapest electricity source in many regions."
        }
      ]
    },
    {
      id: 'wildlife',
      title: 'Wildlife Protection',
      icon: '🦎',
      difficulty: 'Intermediate',
      points: 85,
      unlocked: ecoPoints >= 1600,
      color: 'from-purple-500 to-indigo-600',
      questions: [
        {
          question: "How many species go extinct each day?",
          options: ["10-50", "100-150", "150-200", "200-300"],
          correct: 2,
          explanation: "Scientists estimate that 150-200 species go extinct every day, primarily due to habitat loss, climate change, and human activities."
        },
        {
          question: "What percentage of wildlife has been lost since 1970?",
          options: ["30%", "50%", "68%", "80%"],
          correct: 2,
          explanation: "The Living Planet Report shows a 68% decline in wildlife populations since 1970, highlighting the urgent need for conservation action."
        },
        {
          question: "Which is the most endangered big cat species?",
          options: ["Tiger", "Lion", "Leopard", "Amur Leopard"],
          correct: 3,
          explanation: "The Amur Leopard is critically endangered with fewer than 130 individuals left in the wild, making it the world's rarest big cat."
        },
        {
          question: "What is the main threat to marine biodiversity?",
          options: ["Overfishing", "Plastic pollution", "Ocean acidification", "All of the above"],
          correct: 3,
          explanation: "Marine ecosystems face multiple threats: overfishing depletes species, plastic pollution harms wildlife, and ocean acidification affects shell-forming organisms."
        },
        {
          question: "Which conservation approach is most effective?",
          options: ["Protected areas", "Species-specific programs", "Community-based conservation", "Ecosystem approach"],
          correct: 3,
          explanation: "An ecosystem approach that protects entire habitats while involving local communities tends to be most effective for long-term conservation success."
        }
      ]
    }
  ];

  const badges = {
    'eco-starter': { name: 'Eco Starter', icon: '🌱', color: 'text-green-500' },
    'waste-reducer': { name: 'Waste Reducer', icon: '♻️', color: 'text-emerald-500' },
    'climate-hero': { name: 'Climate Hero', icon: '🌡️', color: 'text-red-500' },
    'water-saver': { name: 'Water Saver', icon: '💧', color: 'text-blue-500' },
    'energy-efficient': { name: 'Energy Expert', icon: '🔋', color: 'text-yellow-500' },
    'wildlife-guardian': { name: 'Wildlife Guardian', icon: '🦎', color: 'text-purple-500' }
  };

  const handleScreenChange = (newScreen) => {
    setScreenTransition('fade-out');
    setTimeout(() => {
      setCurrentScreen(newScreen);
      setScreenTransition('fade-in');
      setTimeout(() => setScreenTransition(''), 300);
    }, 150);
  };

  const startQuiz = (quiz) => {
    if (!quiz.unlocked) return;
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswer(null);
    setShowFeedback(false);
    setQuizCompleted(false);
    handleScreenChange('quiz');
  };

  const handleAnswer = (answerIndex) => {
    if (showFeedback) return;
    setUserAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === currentQuiz.questions[currentQuestion].correct) {
      setScore(score + 1);
      const pointsEarned = Math.floor(currentQuiz.points / currentQuiz.questions.length);
      setEcoPoints(prev => prev + pointsEarned);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      
      // Award badges based on performance
      const percentage = (score / currentQuiz.questions.length) * 100;
      if (percentage >= 80) {
        const badgeMap = {
          'waste': 'waste-reducer',
          'climate': 'climate-hero',
          'water': 'water-saver',
          'energy': 'energy-efficient',
          'wildlife': 'wildlife-guardian'
        };
        const newBadge = badgeMap[currentQuiz.id];
        if (newBadge && !unlockedBadges.includes(newBadge)) {
          setUnlockedBadges([...unlockedBadges, newBadge]);
        }
      }
      
      // Update leaderboard
      setLeaderboard(prev => prev.map(player => 
        player.name === 'You' 
          ? { ...player, points: ecoPoints + Math.floor(currentQuiz.points * (score / currentQuiz.questions.length)) }
          : player
      ).sort((a, b) => b.points - a.points));
    }
  };

  const resetQuiz = () => {
    handleScreenChange('quizzes');
  };

  const cardClasses = isDarkMode
    ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm'
    : 'bg-white/70 border-gray-200/50 backdrop-blur-sm';

  return (
    <div className={`min-h-screen w-full ${themeClasses.bg} overflow-x-hidden transition-all duration-700 ease-in-out`}>
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-96 h-96 bg-gradient-to-r ${isDarkMode ? 'from-emerald-500/10 to-green-500/10' : 'from-emerald-300/20 to-green-300/20'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute top-60 right-20 w-80 h-80 bg-gradient-to-r ${isDarkMode ? 'from-green-500/10 to-emerald-500/10' : 'from-green-300/20 to-emerald-300/20'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-to-r ${isDarkMode ? 'from-emerald-400/10 to-teal-500/10' : 'from-emerald-200/30 to-teal-300/30'} rounded-full blur-3xl animate-pulse delay-2000`}></div>
        <div className="absolute top-32 left-20 animate-bounce delay-500">
          <TreePine className={`h-8 w-8 ${isDarkMode ? 'text-emerald-400/30' : 'text-emerald-500/50'} transition-colors duration-700`} />
        </div>
        <div className="absolute top-96 right-32 animate-bounce delay-1000">
          <Sprout className={`h-6 w-6 ${isDarkMode ? 'text-green-400/30' : 'text-green-500/50'} transition-colors duration-700`} />
        </div>
        <div className="absolute bottom-60 right-16 animate-bounce delay-1500">
          <Leaf className={`h-10 w-10 ${isDarkMode ? 'text-emerald-400/30' : 'text-emerald-500/50'} transition-colors duration-700`} />
        </div>
      </div>

      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: `scale(${Math.sin(Date.now() * 0.001 + particle.id) * 0.5 + 1})`
            }}
          />
        ))}
      </div>

      {/* Enhanced Navigation with Fixed Theme Integration */}
      <nav className={`${themeClasses.nav} sticky top-0 z-50 transition-all duration-500 ease-in-out ${scrollY > 50 ? 'py-2' : 'py-4'}`}>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <Leaf className={`h-10 w-10 text-emerald-500 group-hover:text-emerald-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`} />
                <div className={`absolute inset-0 bg-emerald-400/20 rounded-full blur-lg group-hover:bg-emerald-300/30 transition-all duration-300 group-hover:scale-150`}></div>
              </div>
              <span className={`ml-3 text-2xl font-bold bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                EcoMitra
              </span>
              <div className="ml-3 flex space-x-1">
                <div className={`w-2 h-2 bg-emerald-400 rounded-full animate-ping`}></div>
                <div className={`w-2 h-2 bg-green-400 rounded-full animate-ping delay-100`}></div>
                <div className={`w-2 h-2 bg-emerald-500 rounded-full animate-ping delay-200`}></div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-green-800 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  {t.nav.home}
                </a>
                <a href="/login" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {t.nav.login}
                </a>
                <a href="/dashboard" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {t.nav.dashboard}
                </a>
                <a href="/waste" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <Gamepad2 className="h-4 w-4 mr-1" />
                  {t.nav.game}
                </a>
                <a href="/quiz" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {t.nav.quizzes}
                </a>
                <a href="#" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  {t.nav.about}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg text-sm sm:text-base">
                <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-semibold">{ecoPoints.toLocaleString()} EcoPoints</span>
              </div>

              <button 
                onClick={toggleDarkMode} 
                className={`p-3 rounded-full transition-all duration-500 transform hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-amber-400/25 text-amber-400 hover:bg-amber-400/35 shadow-lg shadow-amber-400/25' 
                    : 'bg-purple-500/25 text-purple-600 hover:bg-purple-500/35 shadow-lg shadow-purple-500/25'
                } ${themeClasses.navButton}`}
                aria-label="Toggle dark mode"
              >
                <div className="relative">
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 animate-spin-slow" />
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
          <div className={`md:hidden ${themeClasses.nav} backdrop-blur-xl border-t ${isDarkMode ? 'border-emerald-500/30' : 'border-emerald-300'} animate-slide-down`}>
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.key} 
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 ${themeClasses.textSecondary} hover:bg-emerald-400/10`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Navigation */}
      {currentScreen !== 'home' && (
        <nav className="relative z-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                onClick={() => handleScreenChange('home')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg ${cardClasses} border hover:scale-105 transition-all duration-300 text-sm sm:text-base`}
              >
                <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleScreenChange('quizzes')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg ${cardClasses} border hover:scale-105 transition-all duration-300 text-sm sm:text-base`}
              >
                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Quizzes</span>
              </button>
              <button
                onClick={() => handleScreenChange('leaderboard')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg ${cardClasses} border hover:scale-105 transition-all duration-300 text-sm sm:text-base`}
              >
                <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Leaderboard</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={`relative z-10 p-4 sm:p-6 flex-grow ${screenTransition === 'fade-out' ? 'opacity-0' : screenTransition === 'fade-in' ? 'opacity-100' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Home Screen */}
          {currentScreen === 'home' && (
            <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Test Your Environmental Knowledge
                </h2>
                <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto px-4">
                  Challenge yourself with interactive quizzes on climate change, sustainability, and environmental protection. 
                  Earn EcoPoints, unlock badges, and climb the leaderboard!
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div className={`${cardClasses} border-2 p-6 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-500 cursor-pointer group`}
                     onClick={() => handleScreenChange('quizzes')}>
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:animate-bounce">🧠</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">5 Quiz Categories</h3>
                  <p className="opacity-70 text-sm sm:text-base">From waste management to wildlife protection</p>
                </div>

                <div className={`${cardClasses} border-2 p-6 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-500 cursor-pointer group`}
                     onClick={() => handleScreenChange('leaderboard')}>
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:animate-spin">🏆</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Global Leaderboard</h3>
                  <p className="opacity-70 text-sm sm:text-base">Compete with eco-warriors worldwide</p>
                </div>

                <div className={`${cardClasses} border-2 p-6 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-500 group sm:col-span-2 lg:col-span-1`}>
                  <div className="text-4xl sm:text-5xl mb-4 group-hover:animate-pulse">🎖️</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Unlock Badges</h3>
                  <p className="opacity-70 text-sm sm:text-base">Earn recognition for your achievements</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-8 sm:mt-12">
                <button
                  onClick={() => handleScreenChange('quizzes')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-110 transition-all duration-300 shadow-2xl flex items-center space-x-2"
                >
                  <span>Start Learning</span>
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Badges Preview */}
              <div className="mt-12 sm:mt-16">
                <h3 className="text-xl sm:text-2xl font-bold mb-6">Your Badges</h3>
                <div className="flex justify-center flex-wrap gap-3 sm:gap-4">
                  {Object.entries(badges).map(([key, badge]) => (
                    <div key={key} className={`${unlockedBadges.includes(key) ? cardClasses : 'bg-gray-600/30'} border rounded-lg p-3 sm:p-4 ${unlockedBadges.includes(key) ? 'hover:scale-110' : ''} transition-all duration-300`}>
                      <div className="text-xl sm:text-2xl mb-2">{badge.icon}</div>
                      <div className={`text-xs sm:text-sm font-semibold ${unlockedBadges.includes(key) ? badge.color : 'text-gray-500'}`}>
                        {badge.name}
                      </div>
                      {!unlockedBadges.includes(key) && <Lock className="h-3 w-3 sm:h-4 sm:w-4 mx-auto mt-2 text-gray-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quizzes Screen */}
          {currentScreen === 'quizzes' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your Challenge</h2>
                <p className="text-lg sm:text-xl opacity-80">Select a quiz to test your environmental knowledge</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={`${cardClasses} border-2 p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 ${quiz.unlocked ? 'hover:shadow-2xl' : 'opacity-50 cursor-not-allowed'} group relative overflow-hidden`}
                    onClick={() => startQuiz(quiz)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${quiz.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl sm:text-4xl group-hover:animate-bounce">{quiz.icon}</div>
                        {quiz.unlocked ? <Unlock className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" /> : <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{quiz.title}</h3>
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {quiz.difficulty}
                        </span>
                        <div className="flex items-center space-x-1 text-xs sm:text-sm text-amber-500">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{quiz.points} pts</span>
                        </div>
                      </div>
                      
                      <div className="text-xs sm:text-sm opacity-70 mb-4">
                        {quiz.questions.length} Questions
                      </div>
                      
                      {!quiz.unlocked && (
                        <div className="text-xs sm:text-sm text-amber-500 font-medium">
                          Requires {quiz.id === 'water' ? '1,200' : quiz.id === 'energy' ? '1,400' : '1,600'} EcoPoints
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Screen */}
          {currentScreen === 'quiz' && currentQuiz && !quizCompleted && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <button
                  onClick={resetQuiz}
                  className={`${cardClasses} border p-2 sm:p-3 rounded-lg hover:scale-105 transition-all duration-300`}
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                
                <div className="text-center flex-grow">
                  <h2 className="text-xl sm:text-2xl font-bold">{currentQuiz.title}</h2>
                  <p className="opacity-70 text-sm sm:text-base">Question {currentQuestion + 1} of {currentQuiz.questions.length}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-amber-500">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="font-semibold text-sm sm:text-base">Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + (showFeedback ? 1 : 0)) / currentQuiz.questions.length) * 100}%` }}
                ></div>
              </div>

              <div className={`${cardClasses} border-2 p-4 sm:p-6 md:p-8 rounded-2xl space-y-4 sm:space-y-6`}>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed">
                  {currentQuiz.questions[currentQuestion].question}
                </h3>

                <div className="grid gap-3 sm:gap-4">
                  {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showFeedback}
                      className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                        showFeedback
                          ? index === currentQuiz.questions[currentQuestion].correct
                            ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-400 dark:text-green-200'
                            : index === userAnswer
                            ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-400 dark:text-red-200'
                            : `${cardClasses} border-gray-300 dark:border-gray-600`
                          : `${cardClasses} border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-[1.02]`
                      } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${
                          showFeedback && index === currentQuiz.questions[currentQuestion].correct
                            ? 'bg-green-500 border-green-500'
                            : showFeedback && index === userAnswer && index !== currentQuiz.questions[currentQuestion].correct
                            ? 'bg-red-500 border-red-500'
                            : 'border-gray-400'
                        }`}>
                          {showFeedback && index === currentQuiz.questions[currentQuestion].correct && (
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          )}
                          {showFeedback && index === userAnswer && index !== currentQuiz.questions[currentQuestion].correct && (
                            <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          )}
                          {!showFeedback && <span className="text-xs sm:text-sm font-semibold">{String.fromCharCode(65 + index)}</span>}
                        </div>
                        <span className="flex-1 text-sm sm:text-base">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 animate-fade-in">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">Explanation:</h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-base">
                      {currentQuiz.questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {showFeedback && (
                  <div className="flex justify-end">
                    <button
                      onClick={nextQuestion}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <span>{currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quiz Completed Screen */}
          {currentScreen === 'quiz' && quizCompleted && (
            <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
              <div className="animate-bounce">
                <div className="text-6xl sm:text-8xl mb-4">🎉</div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Quiz Completed!
                </h2>
              </div>

              <div className={`${cardClasses} border-2 p-6 sm:p-8 rounded-2xl space-y-6`}>
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-500">{score}</div>
                    <div className="text-xs sm:text-sm opacity-70">Correct Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-500">{Math.round((score / currentQuiz.questions.length) * 100)}%</div>
                    <div className="text-xs sm:text-sm opacity-70">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-amber-500">+{Math.floor(currentQuiz.points * (score / currentQuiz.questions.length))}</div>
                    <div className="text-xs sm:text-sm opacity-70">EcoPoints Earned</div>
                  </div>
                </div>

                {score / currentQuiz.questions.length >= 0.8 && (
                  <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 p-4 rounded-xl border border-yellow-300 dark:border-yellow-700">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                      <span className="font-bold text-amber-700 dark:text-amber-300 text-sm sm:text-base">Badge Unlocked!</span>
                    </div>
                    <div className="text-amber-600 dark:text-amber-400 text-sm sm:text-base">
                      You've earned the {badges[{
                        'waste': 'waste-reducer',
                        'climate': 'climate-hero',
                        'water': 'water-saver',
                        'energy': 'energy-efficient',
                        'wildlife': 'wildlife-guardian'
                      }[currentQuiz.id]]?.name} badge!
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={resetQuiz}
                    className={`${cardClasses} border-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base`}
                  >
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Try Another Quiz</span>
                  </button>
                  <button
                    onClick={() => handleScreenChange('leaderboard')}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>View Leaderboard</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Screen */}
          {currentScreen === 'leaderboard' && (
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">🏆 Global Leaderboard</h2>
                <p className="text-lg sm:text-xl opacity-80">See how you rank among eco-warriors worldwide</p>
              </div>

              <div className={`${cardClasses} border-2 rounded-2xl overflow-hidden`}>
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-4 sm:p-6 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Top Environmental Champions</h3>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                  {leaderboard.map((player, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                        player.name === 'You' 
                          ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-600' 
                          : `${cardClasses} border hover:scale-[1.02]`
                      }`}
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-600 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-semibold text-base sm:text-lg truncate">{player.name}</span>
                          {player.name === 'You' && <span className="text-xs sm:text-sm bg-blue-500 text-white px-2 py-1 rounded-full whitespace-nowrap">You</span>}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg sm:text-2xl">{badges[player.badge]?.icon}</span>
                          <span className={`text-xs sm:text-sm ${badges[player.badge]?.color} truncate`}>
                            {badges[player.badge]?.name}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg sm:text-2xl font-bold text-green-500">
                          {player.points.toLocaleString()}
                        </div>
                        <div className="text-xs sm:text-sm opacity-70 whitespace-nowrap">EcoPoints</div>
                      </div>

                      {index < 3 && (
                        <div className="text-2xl sm:text-3xl animate-pulse">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => handleScreenChange('quizzes')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-110 transition-all duration-300 shadow-2xl flex items-center space-x-2 mx-auto"
                >
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>Earn More Points</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 sm:mt-16 p-4 sm:p-6 text-center opacity-70">
        <p className="text-xs sm:text-sm">&copy; 2025 EcoQuiz Pro - Making environmental education engaging and fun</p>
      </footer>
    </div>
    );
};

export default EcoQuizApp;