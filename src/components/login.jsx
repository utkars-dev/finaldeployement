import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Menu, X, Home, User, BarChart3, Gamepad2, HelpCircle, Info, Leaf, TreePine, Sprout, Sun, Moon } from 'lucide-react';

const App = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [showJoin, setShowJoin] = useState(false);
  const [joinRole, setJoinRole] = useState('student');
  const [join, setJoin] = useState({
    name: '',
    class: '',
    fatherNumber: '',
    motherNumber: '',
    phone: '',
    email: '',
    age: ''
  });
  const [joinSubmitting, setJoinSubmitting] = useState(false);
  const [joinMsg, setJoinMsg] = useState('');

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

  const translations = useMemo(() => ({
    en: {
      nav: { home: 'Home', login: 'Login', dashboard: 'Dashboard', game: 'Game', quizzes: 'Quizzes', about: 'About Us' },
      appName: 'EcoMitra',
      tagline: 'Your Green Learning Companion',
      about: 'Learn, Play, and Save Our Planet Together!',
      aboutDesc: 'Join thousands of eco-warriors on a fun adventure!',
      loginTitle: 'Welcome Back, Eco Hero!',
      userType: 'Who are you?',
      student: 'Student',
      teacher: 'Teacher',
      email: 'Email Address',
      password: 'Password',
      login: 'Start Adventure',
      noAccount: 'New Explorer?',
      signup: 'Join Us!',
      forgotPassword: 'Forgot Password?',
      featuresTitle: 'Fun Activities Await!',
      point1: 'Play Eco Games',
      point2: 'Earn Cool Badges',
      point3: 'Save Real Trees',
      point4: 'Make New Friends',
      joinUsTitle: 'Join Us',
      joinUsSubtitle: 'Be part of our planet-saving adventure!',
      whyJoinTitle: 'Why Join EcoMitra?',
      why1: 'Learn sustainability with fun games',
      why2: 'Earn badges and plant real trees',
      why3: 'Compete in eco-challenges with friends',
      stepsTitle: 'How to Start',
      step1: 'Create your account',
      step2: 'Pick Student or Teacher',
      step3: 'Start learning and playing',
      contactTitle: 'Contact Us',
      contactDesc: 'Schools and NGOs can partner with us.',
      contactEmail: 'Email',
      contactMessage: 'Message',
      contactSend: 'Send Message',
    },
    hi: {
      nav: { home: 'होम', login: 'लॉगिन', dashboard: 'डैशबोर्ड', game: 'गेम', quizzes: 'क्विज़', about: 'हमारे बारे में' },
      appName: 'इकोमित्र',
      tagline: 'आपका हरित शिक्षा साथी',
      about: 'सीखें, खेलें, और हमारे ग्रह को बचाएं!',
      aboutDesc: 'हजारों इको-योद्धाओं के साथ मज़ेदार यात्रा में शामिल हों!',
      loginTitle: 'वापस आपका स्वागत है, इको हीरो!',
      userType: 'आप कौन हैं?',
      student: 'छात्र',
      teacher: 'शिक्षक',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      login: 'यात्रा शुरू करें',
      noAccount: 'नए खोजकर्ता?',
      signup: 'हमसे जुड़ें!',
      forgotPassword: 'पासवर्ड भूल गए?',
      featuresTitle: 'मज़ेदार गतिविधियां आपका इंतज़ार कर रही हैं!',
      point1: 'इको गेम्स खेलें',
      point2: 'कूल बैजेस कमाएं',
      point3: 'असली पेड़ बचाएं',
      point4: 'नए दोस्त बनाएं',
      joinUsTitle: 'हमसे जुड़ें',
      joinUsSubtitle: 'हमारे ग्रह बचाने वाले अभियान का हिस्सा बनें!',
      whyJoinTitle: 'इकोमित्र क्यों चुनें?',
      why1: 'मज़ेदार गेम्स के साथ स्थिरता सीखें',
      why2: 'बैजेस कमाएं और असली पेड़ लगाएं',
      why3: 'दोस्तों के साथ इको-चुनौतियों में भाग लें',
      stepsTitle: 'कैसे शुरू करें',
      step1: 'अपना खाता बनाएं',
      step2: 'छात्र या शिक्षक चुनें',
      step3: 'सीखना और खेलना शुरू करें',
      contactTitle: 'संपर्क करें',
      contactDesc: 'स्कूल और NGOs हमारे साथ साझेदारी कर सकते हैं।',
      contactEmail: 'ईमेल',
      contactMessage: 'संदेश',
      contactSend: 'संदेश भेजें',
    }
  }), []);

  const t = translations[language];

  const toggleMenu = useCallback(() => setIsMenuOpen(!isMenuOpen), [isMenuOpen]);
  const toggleLanguage = useCallback(() => setLanguage(language === 'en' ? 'hi' : 'en'), [language]);
  const toggleDarkMode = useCallback(() => setIsDarkMode(!isDarkMode), [isDarkMode]);

  const navItems = useMemo(() => [
    { key: 'home', icon: Home, text: t.nav.home, href: '/' },
    { key: 'login', icon: User, text: t.nav.login, href: '#' },
    { key: 'dashboard', icon: BarChart3, text: t.nav.dashboard, href: '/dashboard' },
    { key: 'game', icon: Gamepad2, text: t.nav.game, href: '/waste' },
    { key: 'quizzes', icon: HelpCircle, text: t.nav.quizzes, href: '/quiz' },
    { key: 'about', icon: Info, text: t.nav.about, href: '#' }
  ], [t]);

  const handleInputChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const isEmailValid = useMemo(() => {
    if (!formData.email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  }, [formData.email]);

  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      // Navigate to dashboard
      window.location.href = '/dashboard';
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateJoin = (e) => {
    setJoin((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const validateJoin = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(join.email);
    const ageOk = /^\d{1,2}$/.test(join.age);
    const phoneOk = (n) => (!n ? true : /^\d{10}$/.test(n));
    if (!join.name) return 'Please enter name';
    if (!emailOk) return 'Please enter a valid email';
    if (!ageOk) return 'Please enter a valid age (0-99)';
    if (joinRole === 'student') {
      if (!join.class) return 'Please enter class';
      if (!phoneOk(join.fatherNumber)) return 'Enter 10-digit father number';
      if (!phoneOk(join.motherNumber)) return 'Enter 10-digit mother number';
    } else {
      if (!phoneOk(join.phone)) return 'Enter 10-digit phone number';
    }
    return '';
  };

  const submitJoin = async (e) => {
    e.preventDefault();
    setJoinMsg('');
    const err = validateJoin();
    if (err) {
      setJoinMsg(err);
      return;
    }
    setJoinSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setJoinMsg('Thanks! We will contact you soon.');
      setJoin({
        name: '',
        class: '',
        fatherNumber: '',
        motherNumber: '',
        phone: '',
        email: '',
        age: ''
      });
      // Close join modal and return to main login
      setTimeout(() => {
        setShowJoin(false);
        setJoinMsg('');
      }, 2000);
    } finally {
      setJoinSubmitting(false);
    }
  };

  const IconCard = ({ emoji, label, className = '' }) => (
    <div className={`rounded-3xl p-5 text-center bg-white border border-emerald-200 shadow-sm hover:translate-y-[-3px] transition-transform ${className}`}>
      <div className="text-4xl mb-2">{emoji}</div>
      <p className="text-emerald-900 font-extrabold text-sm sm:text-base">{label}</p>
    </div>
  );

  const BigBadge = ({ emoji, title, color }) => (
    <div className={`rounded-3xl p-6 sm:p-7 text-center border shadow-sm ${color}`}>
      <div className="text-5xl mb-2">{emoji}</div>
      <div className="text-lg font-extrabold text-emerald-900">{title}</div>
    </div>
  );

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

      {/* Enhanced Navigation */}
      <nav className={`${themeClasses.nav} sticky top-0 z-50 transition-all duration-500 ease-in-out ${scrollY > 50 ? 'py-2' : 'py-4'}`}>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group cursor-pointer" onClick={() => window.location.href = '/'}>
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
                <a href="/" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  {t.nav.home}
                </a>
                <a href="#" className="text-green-800 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
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

      {/* Main content */}
      <div className="relative z-10 w-full min-h-[calc(100vh-120px)] flex items-stretch justify-stretch px-4 pb-4 pt-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
          {/* Left: Info with badges */}
          <section className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 shadow-sm flex flex-col">
            <h2 className="text-2xl font-extrabold text-emerald-900 mb-1">{t.about}</h2>
            <p className="text-emerald-800 text-sm mb-3">{t.aboutDesc}</p>

            <div className="grid grid-cols-4 gap-2 mb-3">
              <IconCard emoji="🎮" label={t.point1} className="wiggle" />
              <IconCard emoji="🏆" label={t.point2} className="wiggle" />
              <IconCard emoji="🌱" label={t.point3} className="wiggle" />
              <IconCard emoji="👫" label={t.point4} className="wiggle" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 mt-auto">
              <BigBadge emoji="🌟" title="Super Star" color="bg-yellow-100 border-yellow-200" />
              <BigBadge emoji="🌳" title="Tree Saver" color="bg-emerald-100 border-emerald-200" />
              <BigBadge emoji="🦋" title="Nature Buddy" color="bg-sky-100 border-sky-200" />
              <BigBadge emoji="📚" title="Study Champ" color="bg-purple-100 border-purple-200" />
              <BigBadge emoji="🚲" title="Fit Hero" color="bg-amber-100 border-amber-200" />
              <BigBadge emoji="🌈" title="Color Wizard" color="bg-pink-100 border-pink-200" />
            </div>
          </section>

          {/* Right: Login */}
          <section className="rounded-2xl p-0 overflow-hidden border border-yellow-300 shadow-sm bg-white flex">
            <form onSubmit={handleLogin} className="w-full p-5">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center border border-emerald-100">
                  <span className="text-3xl">🦸</span>
                </div>
                <h3 className="text-xl font-extrabold text-emerald-900 mt-2">{t.loginTitle}</h3>
              </div>

              <div className="mb-3">
                <label className="block text-emerald-900 font-extrabold mb-2 text-center text-sm">{t.userType}</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType('student')}
                    aria-pressed={userType === 'student'}
                    className={`flex-1 py-2 px-3 rounded-xl font-extrabold text-sm transition border ${
                      userType === 'student'
                        ? 'bg-gradient-to-r from-fuchsia-300 via-pink-300 to-orange-300 text-purple-900 border-transparent'
                        : 'bg-gradient-to-r from-fuchsia-200 via-pink-200 to-orange-200 text-purple-900 hover:brightness-105 border-transparent'
                    }`}
                  >
                    🎒 {t.student}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('teacher')}
                    aria-pressed={userType === 'teacher'}
                    className={`flex-1 py-2 px-3 rounded-xl font-extrabold text-sm transition border ${
                      userType === 'teacher'
                        ? 'bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 text-sky-900 border-transparent'
                        : 'bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200 text-sky-900 hover:brightness-105 border-transparent'
                    }`}
                  >
                    📚 {t.teacher}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-emerald-900 font-bold mb-1 text-sm">{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-4 text-sm font-semibold bg-emerald-50 text-slate-800 placeholder-slate-500 ${
                      isEmailValid ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200' : 'border-rose-300 focus:border-rose-400 focus:ring-rose-200'
                    }`}
                    placeholder="hero@ecomitra.com"
                    aria-invalid={!isEmailValid}
                  />
                </div>

                <div>
                  <label className="block text-emerald-900 font-bold mb-1 text-sm">{t.password}</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 pr-16 rounded-xl border focus:outline-none focus:ring-4 text-sm font-semibold bg-amber-50 text-slate-800 placeholder-slate-500 ${
                        isPasswordValid ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-200' : 'border-rose-300 focus:border-rose-400 focus:ring-rose-200'
                      }`}
                      placeholder="Enter 6+ characters"
                      aria-invalid={!isPasswordValid}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute inset-y-0 right-2 my-1 px-3 rounded-lg text-xs font-extrabold text-emerald-900 bg-emerald-100 border border-emerald-200 hover:bg-emerald-200"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 rounded-xl font-extrabold text-sm border transition ${
                    !isFormValid || isSubmitting
                      ? 'bg-slate-200 text-slate-700 cursor-not-allowed border-slate-200'
                      : 'bg-gradient-to-r from-rose-300 via-amber-300 to-yellow-300 text-emerald-900 hover:brightness-105 border-transparent'
                  }`}
                >
                  {isSubmitting ? 'Starting...' : t.login}
                </button>
              </div>

              <div className="text-center mt-3 space-y-2">
                <button type="button" className="text-sky-900 hover:text-sky-800 font-extrabold text-xs">
                  {t.forgotPassword}
                </button>
                <div className="text-emerald-900 font-semibold text-sm">
                  {t.noAccount}{' '}
                  <button
                    type="button"
                    onClick={() => setShowJoin(true)}
                    className="font-extrabold bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300 text-emerald-900 px-2 py-1 rounded-lg hover:brightness-105"
                  >
                    {t.signup}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

      <style>{`
        @keyframes wiggle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .wiggle { animation: wiggle 2.2s ease-in-out infinite; }
      `}</style>

      {/* FULL-SCREEN JOIN US */}
      {showJoin && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="w-full flex items-center justify-between px-4 py-3 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-300 to-emerald-300 flex items-center justify-center border border-emerald-100">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <div className="text-xl font-extrabold text-emerald-900 leading-none">{t.joinUsTitle}</div>
                <div className="text-emerald-800 text-xs font-semibold">{t.joinUsSubtitle}</div>
              </div>
            </div>
            <button
              onClick={() => setShowJoin(false)}
              className="px-3 py-2 rounded-xl font-extrabold text-sm border bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200 text-sky-900 hover:brightness-105 border-transparent"
            >
              Close
            </button>
          </div>

          <div className="w-full h-[calc(100vh-56px)] overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3">
              {/* Why Join Us */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                <h4 className="text-lg font-extrabold text-black mb-2">{t.whyJoinTitle}</h4>
                <ul className="space-y-2 text-sm text-black">
                  <li className="flex items-center gap-2"><span>🎨</span>{t.why1}</li>
                  <li className="flex items-center gap-2"><span>🌳</span>{t.why2}</li>
                  <li className="flex items-center gap-2"><span>🚴</span>{t.why3}</li>
                </ul>
                <h4 className="text-lg font-extrabold text-black mt-4 mb-2">{t.stepsTitle}</h4>
                <ol className="space-y-2 text-sm text-black">
                  <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-emerald-300 text-emerald-900 font-extrabold flex items-center justify-center">1</span>{t.step1}</li>
                  <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-amber-300 text-amber-900 font-extrabold flex items-center justify-center">2</span>{t.step2}</li>
                  <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-sky-300 text-sky-900 font-extrabold flex items-center justify-center">3</span>{t.step3}</li>
                </ol>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-emerald-200">
                <div className="flex items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setJoinRole('student')}
                    className={`px-3 py-2 rounded-xl font-extrabold text-sm border ${
                      joinRole === 'student'
                        ? 'bg-gradient-to-r from-fuchsia-300 via-pink-300 to-orange-300 text-purple-900 border-transparent'
                        : 'bg-gradient-to-r from-fuchsia-200 via-pink-200 to-orange-200 text-purple-900 hover:brightness-105 border-transparent'
                    }`}
                  >
                    🎒 Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setJoinRole('teacher')}
                    className={`px-3 py-2 rounded-xl font-extrabold text-sm border ${
                      joinRole === 'teacher'
                        ? 'bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 text-sky-900 border-transparent'
                        : 'bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200 text-sky-900 hover:brightness-105 border-transparent'
                    }`}
                  >
                    📚 Teacher
                  </button>
                </div>

                <form onSubmit={submitJoin} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-emerald-900 font-bold mb-1 text-sm">Name</label>
                    <input
                      name="name"
                      value={join.name}
                      onChange={updateJoin}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 text-sm"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {joinRole === 'student' && (
                    <div>
                      <label className="block text-emerald-900 font-bold mb-1 text-sm">Class</label>
                      <input
                        name="class"
                        value={join.class}
                        onChange={updateJoin}
                        className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 text-sm"
                        placeholder="e.g., 6, 7, 8, 9, 10, 11, 12"
                        required
                      />
                    </div>
                  )}

                  {joinRole === 'student' && (
                    <div>
                      <label className="block text-emerald-900 font-bold mb-1 text-sm">Father Number</label>
                      <input
                        name="fatherNumber"
                        value={join.fatherNumber}
                        onChange={updateJoin}
                        className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 text-sm"
                        placeholder="10-digit number"
                      />
                    </div>
                  )}

                  {joinRole === 'student' && (
                    <div>
                      <label className="block text-emerald-900 font-bold mb-1 text-sm">Mother Number</label>
                      <input
                        name="motherNumber"
                        value={join.motherNumber}
                        onChange={updateJoin}
                        className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 text-sm"
                        placeholder="10-digit number"
                      />
                    </div>
                  )}

                  {joinRole === 'teacher' && (
                    <div className="sm:col-span-2">
                      <label className="block text-emerald-900 font-bold mb-1 text-sm">Phone</label>
                      <input
                        name="phone"
                        value={join.phone}
                        onChange={updateJoin}
                        className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 text-sm"
                        placeholder="10-digit number"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-emerald-900 font-bold mb-1 text-sm">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={join.email}
                      onChange={updateJoin}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 text-sm"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-900 font-bold mb-1 text-sm">Age</label>
                    <input
                      name="age"
                      value={join.age}
                      onChange={updateJoin}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 text-sm"
                      placeholder="e.g., 12"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between">
                    <div className={`text-xs font-extrabold ${joinMsg.includes('Thanks') ? 'text-emerald-800' : 'text-rose-700'}`}>
                      {joinMsg}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowJoin(false)}
                        className="px-3 py-2 rounded-xl font-extrabold text-sm border bg-gradient-to-r from-amber-200 via-yellow-200 to-lime-200 text-amber-900 hover:brightness-105 border-transparent"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={joinSubmitting}
                        className={`px-4 py-2 rounded-xl font-extrabold text-sm border ${
                          joinSubmitting
                            ? 'bg-slate-200 text-slate-700 cursor-not-allowed border-slate-200'
                            : 'bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300 text-emerald-900 hover:brightness-105 border-transparent'
                        }`}
                      >
                        {joinSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;