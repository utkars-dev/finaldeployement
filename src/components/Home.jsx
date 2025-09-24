import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Menu, X, Home, User, BarChart3, Gamepad2, HelpCircle, Info, Leaf, Users, Trophy, BookOpen, Target, Heart, Sparkles, Zap, Star, Sun, Moon, TreePine, Sprout, MessageCircle, Send } from 'lucide-react';

const EcomitraHomepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hi! I’m EcoBot 🌿 How can I help you today?' }
  ]);

  const handleSend = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setChatMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Thanks! I’ll get back with eco tips shortly. 💚' }]);
    }, 500);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeClasses = useMemo(() => isDarkMode 
    ? {
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
      }
    : {
       
      }, [isDarkMode]);

  const backgroundImages = useMemo(() => ({
    hero: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    features: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    why: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    cta: 'https://images.unsplash.com/photo-1569163139394-de44cb2c0b87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  }), []);

  const translations = useMemo(() => ({
    en: {
        nav: { home: 'Home', login: 'Login', dashboard: 'Dashboard', game: 'Game', quizzes: 'Quizzes', about: 'About Us' },
        hero: { title: 'EcoMitra – Together for a Greener Tomorrow', subtitle: 'An interactive, gamified platform for students to learn sustainability in a fun way.', loginBtn: 'Get Started', exploreBtn: 'Explore Games' },
        features: {
          title: 'Our Features',
          login: { title: 'Login / Sign Up', desc: 'Secure access with personalized dashboard tracking your progress and achievements.' },
          dashboard: { title: 'Dashboard', desc: 'Track eco-points, completed challenges, and compare progress with classmates.' },
          games: { title: 'Interactive Games', desc: 'Learn waste segregation and recycling through fun drag & drop games.' },
          quizzes: { title: 'Fun Quizzes', desc: 'Challenge yourself with questions about climate change and sustainability.' },
          about: { title: 'About Us', desc: 'Developed for Smart India Hackathon aligned with NEP 2020 and UN SDGs.' }
        },
        why: {
          title: 'Why Choose EcoMitra?',
          point1: 'Environmental education in India is mostly textbook-based',
          point2: 'Students need real-world applications and hands-on learning',
          point3: 'Experiential learning bridging theory and action',
          point4: 'Small steps leading to big impact on communities'
        },
        cta: { title: 'Join the Green Movement!', subtitle: 'Play, Learn, and Act for the planet with EcoMitra', description: 'Together, let\'s build a sustainable future — one game, one quiz, one habit at a time.', playBtn: 'Start Playing', learnBtn: 'Learn More' },
        footer: 'Made with ❤️ by Team teamhactrix (SIH 2025)'
    },
    hi: {
        nav: { home: 'होम', login: 'लॉगिन', dashboard: 'डैशबोर्ड', game: 'गेम', quizzes: 'क्विज़', about: 'हमारे बारे में' },
        hero: { title: 'इकोमित्र – हरित कल के लिए साथ', subtitle: 'छात्रों के लिए एक इंटरैक्टिव, गेमीफाइड प्लेटफॉर्म जो मज़ेदार तरीके से स्थिरता सिखाता है।', loginBtn: 'शुरू करें', exploreBtn: 'गेम्स देखें' },
        features: {
          title: 'हमारी सुविधाएं',
          login: { title: 'लॉगिन / साइन अप', desc: 'व्यक्तिगत डैशबोर्ड के साथ सुरक्षित पहुंच जो आपकी प्रगति को ट्रैक करता है।' },
          dashboard: { title: 'डैशबोर्ड', desc: 'इको-पॉइंट्स, पूरी चुनौतियों को ट्रैक करें और सहपाठियों से तुलना करें।' },
          games: { title: 'इंटरैक्टिव गेम्स', desc: 'मज़ेदार ड्रैग एंड ड्रॉप गेम्स के माध्यम से कचरा अलगाव और रीसाइक्लिंग सीखें।' },
          quizzes: { title: 'मज़ेदार क्विज़', desc: 'जलवायु परिवर्तन और स्थिरता के बारे में सवालों से खुद को चुनौती दें।' },
          about: { title: 'हमारे बारे में', desc: 'स्मार्ट इंडिया हैकथॉन के लिए विकसित, NEP 2020 और UN SDGs के अनुरूप।' }
        },
        why: {
          title: 'इकोमित्र क्यों चुनें?',
          point1: 'भारत में पर्यावरण शिक्षा ज्यादातर किताबी है',
          point2: 'छात्रों को वास्तविक दुनिया के अनुप्रयोग चाहिए',
          point3: 'सिद्धांत और कार्य के बीच सेतु का काम करने वाली शिक्षा',
          point4: 'छोटे कदम समुदायों पर बड़ा प्रभाव डालते हैं'
        },
        cta: { title: 'हरित आंदोलन में शामिल हों!', subtitle: 'इकोमित्र के साथ खेलें, सीखें और ग्रह के लिए कार्य करें', description: 'आइए मिलकर एक स्थायी भविष्य बनाएं — एक खेल, एक क्विज़, एक आदत के साथ।', playBtn: 'खेलना शुरू करें', learnBtn: 'और जानें' },
        footer: 'टीम teamhactrix (SIH 2025) द्वारा ❤️ के साथ बनाया गया'
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

  const heroTitle = t.hero.title;
  const lastSpaceIndex = heroTitle.lastIndexOf(' ', heroTitle.lastIndexOf(' ') - 1);
  const heroTitleLine1 = lastSpaceIndex !== -1 ? heroTitle.substring(0, lastSpaceIndex) : heroTitle;
  const heroTitleLine2 = lastSpaceIndex !== -1 ? heroTitle.substring(lastSpaceIndex + 1) : '';

  const featuresData = useMemo(() => [
    { icon: User, title: t.features.login.title, desc: t.features.login.desc, gradient: 'from-blue-500 to-emerald-600' },
    { icon: BarChart3, title: t.features.dashboard.title, desc: t.features.dashboard.desc, gradient: 'from-emerald-500 to-green-600' },
    { icon: Gamepad2, title: t.features.games.title, desc: t.features.games.desc, gradient: 'from-green-500 to-lime-600' },
    { icon: HelpCircle, title: t.features.quizzes.title, desc: t.features.quizzes.desc, gradient: 'from-teal-500 to-emerald-600' },
    { icon: Info, title: t.features.about.title, desc: t.features.about.desc, gradient: 'from-emerald-500 to-green-600' }
  ], [t]);

  const whyPointsData = useMemo(() => [
    { icon: BookOpen, text: t.why.point1, color: 'from-red-500 to-emerald-600' },
    { icon: Target, text: t.why.point2, color: 'from-blue-500 to-green-600' },
    { icon: Trophy, text: t.why.point3, color: 'from-emerald-500 to-teal-600' },
    { icon: Users, text: t.why.point4, color: 'from-green-500 to-lime-600' }
  ], [t]);

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
                <a href="/Aboutus" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
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

      <section className="relative flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[85vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('${backgroundImages.hero}')` }}
        >
          <div className={`absolute inset-0 ${themeClasses.sectionOverlay} backdrop-blur-[2px]`}></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-slate-900/60 via-transparent to-emerald-900/80' : 'from-white/40 via-transparent to-emerald-100/60'}`}></div>
        </div>
        
        <div className="relative max-w-full mx-auto text-center z-10 w-full">
          <div className="mb-8 flex justify-center animate-fade-in-up">
            <div className={`relative ${themeClasses.card} rounded-full px-8 py-4 flex items-center space-x-3 animate-bounce shadow-2xl`}>
              <Sparkles className="h-6 w-6 text-emerald-400 animate-spin-slow" />
              <span className="text-emerald-400 font-bold text-lg">🌱 Eco-Learning Made Fun!</span>
              <TreePine className="h-6 w-6 text-green-400 animate-pulse" />
            </div>
          </div>

          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight ${themeClasses.text} animate-fade-in-up delay-200 drop-shadow-2xl`}>
            <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-gradient block mb-2 filter drop-shadow-lg">
              {heroTitleLine1}
            </span>
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient filter drop-shadow-lg">
              {heroTitleLine2}
            </span>
          </h1>

          <p className={`text-xl md:text-2xl lg:text-3xl ${themeClasses.textSecondary} mb-12 max-w-full mx-auto leading-relaxed animate-fade-in-up delay-400 opacity-95 font-medium drop-shadow-lg`}>
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
            <button className={`group px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden ${themeClasses.button} shadow-2xl`}>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center justify-center">
                <Zap className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                {t.hero.loginBtn}
              </span>
            </button>
            <button className={`group px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden ${themeClasses.button} shadow-2xl`}>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                {t.hero.exploreBtn}
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-30"
          style={{ backgroundImage: `url('${backgroundImages.features}')` }}
        >
          <div className={`absolute inset-0 ${themeClasses.overlay} backdrop-blur-[1px]`}></div>
        </div>
        
        <div className="max-w-full mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-black mb-6 ${themeClasses.text} drop-shadow-lg`}>
              <span className={`bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent`}>
                {t.features.title}
              </span>
            </h2>
            <div className={`w-32 h-1.5 bg-gradient-to-r ${themeClasses.accent} mx-auto rounded-full shadow-lg`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuresData.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={`group ${themeClasses.card} rounded-3xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden transform hover:-translate-y-3 shadow-xl hover:shadow-2xl ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-white/8 to-transparent' : 'from-white/60 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className={`inline-flex p-5 rounded-3xl bg-gradient-to-r ${feature.gradient} mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3 shadow-xl`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${themeClasses.accent} group-hover:bg-clip-text transition-all duration-300`}>
                      {feature.title}
                    </h3>
                    <p className={`${themeClasses.textSecondary} text-lg leading-relaxed group-hover:text-emerald-400 transition-colors duration-300`}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`relative py-24 px-4 sm:px-6 lg:px-8`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('${backgroundImages.why}')` }}
        >
          <div className={`absolute inset-0 ${themeClasses.sectionOverlay} backdrop-blur-[2px]`}></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-emerald-900/60 via-transparent to-green-900/80' : 'from-emerald-100/60 via-transparent to-green-100/80'}`}></div>
        </div>
        
        <div className="max-w-full mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className={`text-5xl md:text-6xl font-black mb-6 ${themeClasses.text} drop-shadow-lg`}>
              <span className={`bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent`}>
                {t.why.title}
              </span>
            </h2>
            <div className={`w-32 h-1.5 bg-gradient-to-r ${themeClasses.accent} mx-auto rounded-full shadow-lg`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {whyPointsData.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <div key={index} className={`group flex items-start space-x-6 p-8 rounded-3xl ${themeClasses.card} hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 shadow-xl hover:shadow-2xl`}>
                  <div className={`flex-shrink-0 p-5 rounded-3xl bg-gradient-to-r ${point.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-xl`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <p className={`${themeClasses.textSecondary} text-xl leading-relaxed group-hover:text-emerald-400 transition-colors duration-300 flex-1 font-medium`}>
                    {point.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`relative py-24 px-4 sm:px-6 lg:px-8`}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('${backgroundImages.cta}')` }}
        >
          <div className={`absolute inset-0 ${themeClasses.sectionOverlay} backdrop-blur-[2px]`}></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-green-900/70 via-transparent to-emerald-900/90' : 'from-green-100/70 via-transparent to-emerald-100/90'}`}></div>
        </div>
        
        <div className="max-w-full mx-auto text-center relative z-10">
          <div className="mb-10">
            <div className={`inline-flex items-center space-x-3 ${themeClasses.card} rounded-full px-8 py-4 animate-bounce shadow-xl`}>
              <Star className="h-6 w-6 text-amber-400 animate-spin-slow" />
              <span className="text-emerald-400 font-bold text-lg">🌍 Join 10,000+ Green Champions</span>
              <TreePine className="h-6 w-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-black mb-8 ${themeClasses.text} drop-shadow-lg`}>
            <span className={`bg-gradient-to-r ${themeClasses.accent} bg-clip-text text-transparent`}>
              {t.cta.title}
            </span>
          </h2>
          
          <p className={`text-3xl ${isDarkMode ? 'text-emerald-200' : 'text-emerald-700'} mb-6 font-semibold drop-shadow-md`}>
            {t.cta.subtitle}
          </p>
          
          <p className={`text-xl ${themeClasses.textSecondary} mb-16 opacity-95 leading-relaxed max-w-full mx-auto font-medium drop-shadow-sm`}>
            {t.cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className={`group px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden ${themeClasses.button} shadow-2xl`}>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                <Zap className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                {t.cta.playBtn}
              </span>
            </button>
            <button className={`group px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden ${themeClasses.button} shadow-2xl`}>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                {t.cta.learnBtn}
              </span>
            </button>
          </div>
        </div>
      </section>

      <footer className={`relative ${themeClasses.nav} ${themeClasses.text} py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-full mx-auto text-center relative z-10">
          <div className={`flex items-center justify-center text-xl mb-6 ${themeClasses.textSecondary} font-medium`}>
            {t.footer}
          </div>
          <div className="flex justify-center space-x-8 text-base mb-8">
            <a href="#" className={`${themeClasses.link} transition-all duration-300 hover:scale-110 transform font-medium`}>
              Privacy Policy
            </a>
            <a href="#" className={`${themeClasses.link} transition-all duration-300 hover:scale-110 transform font-medium`}>
              Terms of Service
            </a>
            <a href="#" className={`${themeClasses.link} transition-all duration-300 hover:scale-110 transform font-medium`}>
              Contact Us
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            <div className={`w-4 h-4 bg-emerald-400 rounded-full animate-ping`}></div>
            <div className={`w-4 h-4 bg-green-400 rounded-full animate-ping delay-100`}></div>
            <div className={`w-4 h-4 bg-emerald-500 rounded-full animate-ping delay-200`}></div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot – fixed bottom-left, non-intrusive */}
      <div className="fixed bottom-4 left-4 z-[60]">
        <div
          className={`origin-bottom-left transition-all duration-300 ease-out ${
            isChatOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div
            className="w-80 md:w-96 rounded-2xl shadow-2xl border"
            style={{ backgroundColor: '#0A192F', borderColor: 'rgba(0,255,136,0.25)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#00FF88', boxShadow: '0 0 10px rgba(0,255,136,0.6)' }} />
                <span className="text-sm font-semibold text-white">EcoBot</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 rounded-full hover:scale-110 transition-transform"
                aria-label="Close chat"
                style={{ color: '#00FF88' }}
              >
                ✕
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto px-3 py-3 space-y-3">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-md text-white`}
                    style={
                      m.role === 'user'
                        ? {
                            background: 'linear-gradient(90deg, #00B050 0%, #00FF88 100%)',
                            boxShadow: '0 0 12px rgba(0,255,136,0.25)'
                          }
                        : {
                            backgroundColor: '#0A192F',
                            border: '1px solid rgba(0,255,136,0.25)',
                            boxShadow: '0 0 12px rgba(0,255,136,0.12)'
                          }
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 pb-3">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                className="flex-1 rounded-xl px-3 py-2 text-sm outline-none placeholder-white/60"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="Send"
                style={{
                  background: 'linear-gradient(90deg, #00B050 0%, #00FF88 100%)',
                  color: '#0A192F',
                  boxShadow: '0 0 18px rgba(0,255,136,0.45)'
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsChatOpen((v) => !v)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
          style={{
            backgroundColor: '#00FF88',
            color: '#0A192F',
            boxShadow: '0 0 25px rgba(0,255,136,0.5)'
          }}
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  );
};

export default EcomitraHomepage;