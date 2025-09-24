import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom hook for particle effects
const useParticles = () => {
  const [particles, setParticles] = useState([]);

  const createParticle = (x, y, type = 'success') => {
    const newParticle = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      type,
      emoji:
        type === 'success'
          ? ['✨', '🌟', '💚', '🌱'][Math.floor(Math.random() * 4)]
          : ['💔', '😢', '🚫'][Math.floor(Math.random() * 3)]
    };

    setParticles(prev => [...prev, newParticle]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  return { particles, createParticle };
};

const EcoClickingGame = () => {
  const [score, setScore] = useState(0);
  const [gameItems, setGameItems] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [currentTip, setCurrentTip] = useState(0);
  const [plantsGrown, setPlantsGrown] = useState(0);
  const { particles, createParticle } = useParticles();

  const items = [
    { name: 'Paper Bag', emoji: '🛍️', isEcoFriendly: true, color: 'text-[#00FF88]', points: 10 },
    { name: 'Glass Bottle', emoji: '🍾', isEcoFriendly: true, color: 'text-[#00FF88]', points: 15 },
    { name: 'Banana Peel', emoji: '🍌', isEcoFriendly: true, color: 'text-yellow-300', points: 8 },
    { name: 'Apple Core', emoji: '🍎', isEcoFriendly: true, color: 'text-red-400', points: 8 },
    { name: 'Metal Can', emoji: '♻️', isEcoFriendly: true, color: 'text-cyan-300', points: 12 },
    { name: 'Tree Sapling', emoji: '🌱', isEcoFriendly: true, color: 'text-[#00FF88]', points: 20 },
    { name: 'Cloth Bag', emoji: '👜', isEcoFriendly: true, color: 'text-emerald-300', points: 15 },
    { name: 'Bamboo Cup', emoji: '🥤', isEcoFriendly: true, color: 'text-green-300', points: 18 },
    { name: 'Solar Panel', emoji: '☀️', isEcoFriendly: true, color: 'text-yellow-300', points: 25 },
    { name: 'Wind Turbine', emoji: '💨', isEcoFriendly: true, color: 'text-sky-300', points: 25 },
    { name: 'Compost', emoji: '🍂', isEcoFriendly: true, color: 'text-amber-300', points: 12 },
    { name: 'Reusable Water Bottle', emoji: '💧', isEcoFriendly: true, color: 'text-blue-300', points: 20 },

    { name: 'Plastic Bottle', emoji: '🍼', isEcoFriendly: false, color: 'text-red-400', points: -10 },
    { name: 'Car Tire', emoji: '🛞', isEcoFriendly: false, color: 'text-gray-400', points: -15 },
    { name: 'Plastic Bag', emoji: '🛍️', isEcoFriendly: false, color: 'text-red-400', points: -8 },
    { name: 'Cigarette', emoji: '🚬', isEcoFriendly: false, color: 'text-gray-400', points: -12 },
    { name: 'Styrofoam Cup', emoji: '🥤', isEcoFriendly: false, color: 'text-red-400', points: -10 },
    { name: 'Battery', emoji: '🔋', isEcoFriendly: false, color: 'text-red-500', points: -18 },
    { name: 'Chemical Spray', emoji: '🧴', isEcoFriendly: false, color: 'text-purple-400', points: -15 }
  ];

  const ecoTips = [
    "🌱 Did you know? A single tree can absorb 48 pounds of CO2 per year!",
    "♻️ Recycling one aluminum can saves enough energy to power a TV for 3 hours!",
    "🌍 Plastic bags can take up to 1000 years to decompose in landfills!",
    "💧 Reusing a water bottle just 10 times can save significant plastic waste!",
    "🌿 Composting reduces methane emissions from landfills!",
    "☀️ Solar energy is now the cheapest source of power in many countries!",
    "🚲 Biking instead of driving saves about 1 pound of CO2 per mile!",
    "🌳 Forests produce 28% of the oxygen we breathe!"
  ];

  const achievementDefinitions = [
    { id: 'first_click', name: 'First Step', desc: 'Click your first eco-friendly item!', icon: '🌱', unlocked: false },
    { id: 'combo_5', name: 'Green Streak', desc: 'Get a 5-item combo!', icon: '🔥', unlocked: false },
    { id: 'score_100', name: 'Eco Warrior', desc: 'Reach 100 points!', icon: '⚡', unlocked: false },
    { id: 'plant_lover', name: 'Plant Parent', desc: 'Click 5 plants!', icon: '🌿', unlocked: false },
    { id: 'recycling_champion', name: 'Recycling Champion', desc: 'Perfect game with no mistakes!', icon: '♻️', unlocked: false }
  ];

  const generateRandomItem = useCallback(() => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    return {
      ...randomItem,
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 70 + 10,
      y: Math.random() * 60 + 20,
      scale: Math.random() * 0.3 + 0.8,
      rotation: Math.random() * 20 - 10
    };
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
    setCombo(0);
    setLevel(1);
    setPlantsGrown(0);
    setTimeLeft(45);
    setGameItems([]);
    setCurrentTip(0);
    setUnlockedAchievements([]);
  };

  const endGame = () => {
    setGameStarted(false);
    setGameEnded(true);
    setGameItems([]);
  };

  const handleItemClick = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (item.isEcoFriendly) {
      const basePoints = item.points || 10;
      const comboMultiplier = Math.floor(combo / 3) + 1;
      const points = basePoints * comboMultiplier;

      setScore(prev => prev + points);
      setCombo(prev => prev + 1);
      createParticle(x, y, 'success');

      if (item.emoji === '🌱' || item.emoji === '🌿') {
        setPlantsGrown(prev => prev + 1);
      }
    } else {
      setScore(prev => Math.max(0, prev + (item.points || -5)));
      setCombo(0);
      createParticle(x, y, 'failure');
    }

    setGameItems(prev => prev.filter(gameItem => gameItem.id !== item.id));
  };

  useEffect(() => {
    let interval;
    if (gameStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      const spawnRate = Math.max(800, 1800 - level * 200);
      interval = setInterval(() => {
        setGameItems(prev => {
          const filteredItems = prev.filter(item => Date.now() - item.spawnTime < 5000);
          const itemsToSpawn = Math.min(2, Math.floor(level / 2) + 1);

          const newItems = Array.from({ length: itemsToSpawn }, () => ({
            ...generateRandomItem(),
            spawnTime: Date.now()
          }));

          return [...filteredItems, ...newItems];
        });
      }, spawnRate);
    } else {
      setGameItems([]);
    }
    return () => clearInterval(interval);
  }, [gameStarted, generateRandomItem, level]);

  useEffect(() => {
    const newLevel = Math.floor(score / 50) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
  }, [score, level]);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % ecoTips.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    const checkAchievements = () => {
      const newAchievements = [];
      if (score > 0 && !unlockedAchievements.includes('first_click')) {
        newAchievements.push('first_click');
      }
      if (combo >= 5 && !unlockedAchievements.includes('combo_5')) {
        newAchievements.push('combo_5');
      }
      if (score >= 100 && !unlockedAchievements.includes('score_100')) {
        newAchievements.push('score_100');
      }
      if (plantsGrown >= 5 && !unlockedAchievements.includes('plant_lover')) {
        newAchievements.push('plant_lover');
      }
      if (newAchievements.length > 0) {
        setUnlockedAchievements(prev => [...prev, ...newAchievements]);
      }
    };

    if (gameStarted) {
      checkAchievements();
    }
  }, [score, combo, plantsGrown, unlockedAchievements, gameStarted]);

  const getEndMessage = () => {
    if (score >= 200) return { message: "🏆 Earth Champion! You're saving the planet!", color: "text-[#00FF88]", bgColor: "bg-[#0f1f3e]" };
    if (score >= 100) return { message: "🌟 Eco Warrior! Great environmental awareness!", color: "text-[#00FF88]", bgColor: "bg-[#0f1f3e]" };
    if (score >= 50) return { message: "🌱 Green Guardian! Keep up the good work!", color: "text-[#00FF88]", bgColor: "bg-[#0f1f3e]" };
    return { message: "🌍 Earth Friend! Every effort counts for our planet!", color: "text-cyan-300", bgColor: "bg-[#0f1f3e]" };
  };

  const getComboColor = () => {
    if (combo >= 10) return "text-purple-300 animate-pulse";
    if (combo >= 5) return "text-orange-300";
    if (combo >= 3) return "text-yellow-300";
    return "text-[#00FF88]";
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full rounded-none shadow-none overflow-hidden border-0 bg-[#0A192F] flex flex-col">
        {/* Header with EcoMitra theme */}
        <motion.div
          className="relative overflow-hidden text-white p-6"
          style={{ background: 'linear-gradient(90deg, #00B050 0%, #00FF88 100%)' }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Parallax glow particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: 'blur(1px)',
                  opacity: 0.25,
                  color: '#0A192F'
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.15, 0.35, 0.15]
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                <span className="text-2xl" style={{ color: '#0A192F' }}>✸</span>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-center mb-3"
              style={{ color: '#0A192F' }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌍 EcoClick: Save Our Planet!
            </motion.h1>
            <motion.p
              className="text-center text-sm md:text-base"
              style={{ color: 'rgba(10,25,47,0.85)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Click eco-friendly items and help our Earth flourish! 🌱
            </motion.p>
          </div>
        </motion.div>

        {/* Stats (dark theme) */}
        {gameStarted && (
          <motion.div
            className="px-6 py-4 border-b-2 border-[#00B050]/30 bg-white/5 backdrop-blur-md text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-wrap items-center space-x-4">
                <motion.div
                  className="px-6 py-2 rounded-full shadow-lg border border-[#00FF88]/40"
                  style={{
                    background:
                      'radial-gradient(100% 100% at 50% 0%, rgba(0,255,136,0.15) 0%, rgba(0,176,80,0.1) 100%)',
                    color: '#00FF88',
                    textShadow: '0 0 10px rgba(0,255,136,0.35)'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-bold text-lg">🏆 Score: {score}</span>
                </motion.div>

                <motion.div
                  className="px-6 py-2 rounded-full shadow-lg border border-cyan-300/40 text-cyan-300"
                  style={{
                    background:
                      'radial-gradient(100% 100% at 50% 0%, rgba(34,211,238,0.15) 0%, rgba(0,176,80,0.06) 100%)'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-bold text-lg">⏰ Time: {timeLeft}s</span>
                </motion.div>

                {combo > 0 && (
                  <motion.div
                    className={`px-4 py-2 rounded-full shadow-lg border border-yellow-300/40 ${getComboColor()}`}
                    style={{
                      background:
                        'radial-gradient(100% 100% at 50% 0%, rgba(250,204,21,0.15) 0%, rgba(0,176,80,0.06) 100%)'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="font-bold">🔥 Combo: {combo}x</span>
                  </motion.div>
                )}

                <motion.div
                  className="px-4 py-2 rounded-full shadow-lg border border-purple-300/40 text-purple-200"
                  style={{
                    background:
                      'radial-gradient(100% 100% at 50% 0%, rgba(216,180,254,0.12) 0%, rgba(0,176,80,0.06) 100%)'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-bold">🌟 Level: {level}</span>
                </motion.div>
              </div>

              <div className="text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="font-semibold text-[#00FF88]">✓ Eco: +Points</span> |
                <span className="font-semibold text-red-300 ml-2">✗ Harmful: -Points</span>
              </div>
            </div>

            {plantsGrown > 0 && (
              <motion.div
                className="mt-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="px-4 py-1 rounded-full text-sm font-semibold border border-[#00FF88]/40"
                  style={{ color: '#00FF88', backgroundColor: 'rgba(0,255,136,0.08)' }}>
                  🌱 Plants Grown: {plantsGrown}
                </span>
              </motion.div>
            )}

            {unlockedAchievements.length > 0 && (
              <motion.div
                className="mt-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="px-4 py-1 rounded-full text-sm font-semibold border border-yellow-300/40 text-yellow-200 bg-yellow-200/10">
                  🏅 Achievements: {unlockedAchievements.length}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Game Area - fullscreen, takes remaining height */}
        <div className="relative flex-1 min-h-0 overflow-hidden text-white"
             style={{ background: 'linear-gradient(180deg, #0A192F 0%, #09152A 60%, #0A192F 100%)' }}>
          {/* Parallax layers */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating aurora-like glows */}
            <motion.div
              className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
              style={{ background: '#00FF88' }}
              animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-10 right-0 w-72 h-72 rounded-full blur-3xl opacity-10"
              style={{ background: '#00B050' }}
              animate={{ x: [0, -15, 0], y: [0, -10, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />

            {/* Subtle stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.span
                key={`star-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: '#9FE8C8'
                }}
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              >
                ✦
              </motion.span>
            ))}
          </div>

          {/* Start Screen */}
          {!gameStarted && !gameEnded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="text-center rounded-3xl p-8 shadow-2xl mx-4 border-2"
                   style={{
                     background: 'rgba(255,255,255,0.06)',
                     backdropFilter: 'blur(10px)',
                     borderColor: 'rgba(0,255,136,0.3)'
                   }}>
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌍
                </motion.div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#00FF88' }}>
                  Ready to Save the Planet?
                </h2>
                <p className="mb-6 max-w-md mx-auto text-lg leading-relaxed text-white/80">
                  Help protect our environment by clicking on eco-friendly items!
                  Avoid harmful pollutants and watch your eco-score grow! 🌱
                </p>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: '0 0 25px rgba(0,255,136,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="text-white px-10 py-4 rounded-full font-bold text-xl shadow-xl transition-all duration-300 border"
                  style={{
                    background: 'linear-gradient(90deg, #00B050 0%, #00FF88 100%)',
                    borderColor: 'rgba(0,255,136,0.4)',
                    textShadow: '0 0 8px rgba(0,255,136,0.35)'
                  }}
                >
                  🚀 Start Eco Adventure!
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* End Screen */}
          {gameEnded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className={`text-center ${getEndMessage().bgColor} rounded-3xl p-8 shadow-2xl mx-4 border-2`}
                style={{
                  borderColor: 'rgba(0,255,136,0.25)',
                  background: 'rgba(0,255,136,0.06)',
                  backdropFilter: 'blur(10px)'
                }}
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {score >= 200 ? '🏆' : score >= 100 ? '🌟' : score >= 50 ? '🌱' : '🌍'}
                </motion.div>

                <h2 className="text-4xl font-bold mb-3 text-white">Mission Complete!</h2>

                <motion.div
                  className="text-5xl font-bold mb-4"
                  style={{ color: '#00FF88', textShadow: '0 0 12px rgba(0,255,136,0.45)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                >
                  Final Score: {score}
                </motion.div>

                <p className={`text-xl font-semibold mb-6 ${getEndMessage().color}`}>
                  {getEndMessage().message}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                  <div className="rounded-xl p-3 border border-white/10 bg-white/5">
                    <div className="text-2xl">🌱</div>
                    <div className="font-bold" style={{ color: '#00FF88' }}>{plantsGrown}</div>
                    <div className="text-white/70">Plants</div>
                  </div>
                  <div className="rounded-xl p-3 border border-white/10 bg-white/5">
                    <div className="text-2xl">🔥</div>
                    <div className="font-bold text-orange-300">{combo}</div>
                    <div className="text-white/70">Max Combo</div>
                  </div>
                  <div className="rounded-xl p-3 border border-white/10 bg-white/5">
                    <div className="text-2xl">⭐</div>
                    <div className="font-bold text-purple-300">{level}</div>
                    <div className="text-white/70">Level</div>
                  </div>
                  <div className="rounded-xl p-3 border border-white/10 bg-white/5">
                    <div className="text-2xl">🏅</div>
                    <div className="font-bold" style={{ color: '#00FF88' }}>{unlockedAchievements.length}</div>
                    <div className="text-white/70">Achievements</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,255,136,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="text-white px-10 py-4 rounded-full font-bold text-xl shadow-xl transition-all duration-300 border"
                  style={{
                    background: 'linear-gradient(90deg, #00B050 0%, #00FF88 100%)',
                    borderColor: 'rgba(0,255,136,0.4)'
                  }}
                >
                  🔄 Play Again & Save More!
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Game Items */}
          <AnimatePresence>
            {gameItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{
                  scale: item.scale || 1,
                  opacity: 1,
                  y: 0,
                  rotate: item.rotation || 0
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  y: -50,
                  rotate: 360
                }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200
                }}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`
                }}
                className="cursor-pointer transform transition-all duration-200"
                onClick={(e) => handleItemClick(item, e)}
                whileHover={{
                  scale: (item.scale || 1) * 1.2,
                  rotate: (item.rotation || 0) + 10,
                  z: 10
                }}
                whileTap={{ scale: (item.scale || 1) * 0.8 }}
              >
                <motion.div
                  className={`text-6xl md:text-7xl ${item.color}`}
                  animate={{
                    filter: item.isEcoFriendly
                      ? 'drop-shadow(0 0 10px rgba(0,255,136,0.6))'
                      : 'drop-shadow(0 0 8px rgba(248,113,113,0.6))'
                  }}
                >
                  {item.emoji}
                </motion.div>

                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg border"
                  style={{
                    borderColor: item.isEcoFriendly ? 'rgba(0,255,136,0.5)' : 'rgba(248,113,113,0.5)',
                    color: item.isEcoFriendly ? '#9FE8C8' : '#fecaca',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(6px)'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.name}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Particle Effects */}
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ scale: 0, opacity: 1, x: particle.x, y: particle.y }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                  y: particle.y - 80,
                  x: particle.x + (Math.random() - 0.5) * 100
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="fixed pointer-events-none text-3xl z-50"
                style={{ left: 0, top: 0, textShadow: '0 0 12px rgba(0,255,136,0.6)' }}
              >
                {particle.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Eco Tips */}
          {gameStarted && (
            <motion.div
              className="absolute top-4 left-4 right-4 rounded-2xl p-4 shadow-xl border"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(0,255,136,0.25)',
                backdropFilter: 'blur(10px)'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                key={currentTip}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-bold text-sm mb-1" style={{ color: '#00FF88' }}>💡 Eco Wisdom:</p>
                <p className="text-white/85 text-sm leading-relaxed">
                  {ecoTips[currentTip]}
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Instructions (dark theme) */}
        {!gameStarted && !gameEnded && (
          <motion.div
            className="p-6 border-t-4"
            style={{ borderColor: 'rgba(0,255,136,0.35)', background: 'linear-gradient(90deg, rgba(0,255,136,0.06), rgba(0,176,80,0.06))' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl p-4 shadow-lg border"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(0,255,136,0.25)' }}
              >
                <h3 className="text-lg font-bold mb-3 flex items-center" style={{ color: '#00FF88' }}>
                  ✅ <span className="ml-2">Click These (Eco-Friendly)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.filter(item => item.isEcoFriendly).map((item, idx) => (
                    <motion.span
                      key={idx}
                      className="px-3 py-2 rounded-full text-sm font-medium border"
                      style={{
                        backgroundColor: 'rgba(0,255,136,0.08)',
                        color: '#9FE8C8',
                        borderColor: 'rgba(0,255,136,0.3)'
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {item.emoji} {item.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl p-4 shadow-lg border"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(248,113,113,0.3)' }}
              >
                <h3 className="text-lg font-bold mb-3 flex items-center text-red-300">
                  ❌ <span className="ml-2">Avoid These (Harmful)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.filter(item => !item.isEcoFriendly).map((item, idx) => (
                    <motion.span
                      key={idx}
                      className="px-3 py-2 rounded-full text-sm font-medium border"
                      style={{
                        backgroundColor: 'rgba(248,113,113,0.08)',
                        color: '#fecaca',
                        borderColor: 'rgba(248,113,113,0.35)'
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {item.emoji} {item.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h4 className="text-lg font-bold mb-3 text-white/90">🎮 Game Features</h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-3 py-1 rounded-full border" style={{ color: '#E9D5FF', borderColor: 'rgba(216,180,254,0.35)', backgroundColor: 'rgba(216,180,254,0.1)' }}>🔥 Combo System</span>
                <span className="px-3 py-1 rounded-full border" style={{ color: '#FBBF24', borderColor: 'rgba(251,191,36,0.35)', backgroundColor: 'rgba(251,191,36,0.1)' }}>⭐ Level Progression</span>
                <span className="px-3 py-1 rounded-full border" style={{ color: '#7DD3FC', borderColor: 'rgba(125,211,252,0.35)', backgroundColor: 'rgba(125,211,252,0.1)' }}>💡 Eco Education</span>
                <span className="px-3 py-1 rounded-full border" style={{ color: '#86EFAC', borderColor: 'rgba(134,239,172,0.35)', backgroundColor: 'rgba(134,239,172,0.1)' }}>🌱 Plant Counter</span>
                <span className="px-3 py-1 rounded-full border" style={{ color: '#FDE68A', borderColor: 'rgba(253,230,138,0.35)', backgroundColor: 'rgba(253,230,138,0.1)' }}>🏅 Achievements</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcoClickingGame;