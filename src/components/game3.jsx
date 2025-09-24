import React, { useState, useEffect } from 'react';
import { Leaf, Droplet, Zap, Home, RotateCcw, Trophy, CheckCircle, XCircle, Star, Sparkles } from 'lucide-react';

// CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes wave {
    0% { transform: translateX(0); }
    50% { transform: translateX(-25px); }
    100% { transform: translateX(0); }
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes bounceIn {
    0% { opacity: 0; transform: scale(0.3) translateY(-50px); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { transform: scale(1) translateY(0); }
  }
  
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-float { animation: float 15s ease-in-out infinite; }
  .animate-gradient { 
    background-size: 200% 200%; 
    animation: gradient 3s ease infinite; 
  }
  .animate-wave { animation: wave 3s ease-in-out infinite; }
  .animate-slideDown { animation: slideDown 0.8s ease-out; }
  .animate-slideLeft { animation: slideLeft 0.8s ease-out; }
  .animate-slideRight { animation: slideRight 0.8s ease-out; }
  .animate-slideUp { animation: slideUp 0.8s ease-out; }
  .animate-fadeIn { animation: fadeIn 1s ease-in; }
  .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
  .animate-bounceIn { animation: bounceIn 0.8s ease-out; }
  .animate-spin-slow { animation: spinSlow 8s linear infinite; }
`;

// Game data
const puzzleData = {
  waste: {
    title: "Waste Management Crisis",
    description: "Click items, then click the correct bin to sort them!",
    items: [
      { id: 1, name: "Plastic Bottle", type: "recycle", emoji: "🍶" },
      { id: 2, name: "Banana Peel", type: "compost", emoji: "🍌" },
      { id: 3, name: "Glass Jar", type: "recycle", emoji: "🫙" },
      { id: 4, name: "Battery", type: "hazardous", emoji: "🔋" },
      { id: 5, name: "Paper", type: "recycle", emoji: "📄" },
      { id: 6, name: "Food Waste", type: "compost", emoji: "🥬" }
    ],
    bins: [
      { id: "recycle", name: "Recycle Bin", emoji: "♻️", color: "bg-blue-500" },
      { id: "compost", name: "Compost Bin", emoji: "🌱", color: "bg-green-500" },
      { id: "hazardous", name: "Hazardous Bin", emoji: "⚠️", color: "bg-red-500" }
    ]
  },
  water: {
    title: "Water Conservation Emergency",
    description: "Choose the correct solution for each water problem!",
    problems: [
      { id: 1, issue: "Leaking Tap", solution: "Replace Washer", emoji: "🚰", options: ["Ignore", "Replace Washer", "Buy New Tap"] },
      { id: 2, issue: "Running Toilet", solution: "Fix Flapper", emoji: "🚽", options: ["Fix Flapper", "Use More Water", "Call Plumber"] },
      { id: 3, issue: "Long Shower", solution: "Install Timer", emoji: "🚿", options: ["Shower Longer", "Install Timer", "Use Hot Water"] },
      { id: 4, issue: "Watering Garden", solution: "Use Greywater", emoji: "🌱", options: ["Use Tap Water", "Use Greywater", "Don't Water"] }
    ]
  },
  energy: {
    title: "Energy Efficiency Crisis",
    description: "Turn OFF wasteful appliances, keep efficient ones ON!",
    appliances: [
      { id: 1, name: "Old TV", status: "on", efficient: false, emoji: "📺" },
      { id: 2, name: "LED Light", status: "on", efficient: true, emoji: "💡" },
      { id: 3, name: "AC Running Empty Room", status: "on", efficient: false, emoji: "❄️" },
      { id: 4, name: "Laptop Charging", status: "on", efficient: true, emoji: "💻" },
      { id: 5, name: "Old Refrigerator", status: "on", efficient: false, emoji: "🧊" },
      { id: 6, name: "Phone Charger", status: "on", efficient: true, emoji: "🔌" }
    ]
  }
};

// Floating particles component
const FloatingParticles = ({ color = "rgba(255,255,255,0.1)" }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: color,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 10}s`
        }}
      />
    ))}
  </div>
);

// Components
const HomeScreen = ({ onStartGame, leaderboard }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <style>{styles}</style>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-green-300/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-green-100/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-200/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <FloatingParticles color="rgba(34,197,94,0.1)" />
      
      {/* Clean city silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-green-200/30 to-transparent">
        <div className="absolute bottom-0 w-full h-20 bg-green-300/20 transform skew-y-1" />
      </div>
      
      {/* Main content - full screen layout */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* Header section */}
        <div className="text-center mb-12 animate-slideDown">
          <div className="relative mb-6">
            <h1 className="text-6xl sm:text-8xl font-bold mb-4 animate-bounce">🌱</h1>
            <div className="absolute -top-2 -right-2 animate-spin-slow">
              <Sparkles className="text-green-500" size={32} />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 mb-6 animate-gradient">
            ECO ESCAPE
          </h2>
          
          <p className="text-gray-600 text-lg sm:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto">
            You're trapped in a <span className="text-red-500 font-bold animate-pulse">polluted city</span>! 
            <br className="hidden sm:block" />
            Solve environmental puzzles to clean the air and escape to a <span className="text-green-600 font-bold">greener future</span>.
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="mb-12 animate-bounceIn">
          <button
            onClick={onStartGame}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 hover:from-green-500 hover:via-emerald-400 hover:to-green-400 text-white font-bold py-6 px-12 rounded-full text-xl sm:text-2xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-500/50 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center justify-center">
              <span className={`mr-3 transition-transform duration-300 text-2xl ${isHovered ? 'rotate-12 scale-110' : ''}`}>🚪</span>
              START YOUR ECO JOURNEY
            </span>
          </button>
        </div>
        
        {/* Features showcase */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12 max-w-4xl animate-fadeInUp">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200/50">
            <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '0.2s' }}>🗑️</div>
            <h3 className="text-green-700 font-bold text-lg mb-2">Waste Management</h3>
            <p className="text-gray-600 text-sm">Sort items correctly to reduce pollution</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200/50">
            <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '0.4s' }}>💧</div>
            <h3 className="text-blue-600 font-bold text-lg mb-2">Water Conservation</h3>
            <p className="text-gray-600 text-sm">Fix water problems and save resources</p>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200/50">
            <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '0.6s' }}>⚡</div>
            <h3 className="text-yellow-600 font-bold text-lg mb-2">Energy Efficiency</h3>
            <p className="text-gray-600 text-sm">Optimize appliances to save energy</p>
          </div>
        </div>
        
        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="p-6 bg-white/70 backdrop-blur-lg rounded-2xl border border-green-200/50 shadow-xl max-w-md w-full animate-slideUp">
            <h3 className="text-gray-700 font-bold text-xl mb-4 flex items-center justify-center">
              <Trophy className="mr-2 text-yellow-500 animate-pulse" size={24} />
              <span className="bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">Top Eco Heroes</span>
            </h3>
            <div className="space-y-3">
              {leaderboard.slice(0, 3).map((score, index) => (
                <div key={index} className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4 py-3 transform hover:scale-105 transition-all duration-200 border border-green-100">
                  <span className="flex items-center">
                    <span className="text-green-600 font-bold mr-3">#{index + 1}</span>
                    {index === 0 && <span className="text-yellow-500 mr-2 animate-bounce text-lg">👑</span>}
                    {index === 1 && <span className="text-gray-400 mr-2">🥈</span>}
                    {index === 2 && <span className="text-orange-400 mr-2">🥉</span>}
                  </span>
                  <span className="font-bold text-gray-700">{score} points</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

const WastePuzzle = ({ onComplete, onWrongAnswer }) => {
  const [items, setItems] = useState(puzzleData.waste.items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedItems, setSortedItems] = useState({
    recycle: [],
    compost: [],
    hazardous: []
  });
  const [completingAnimation, setCompletingAnimation] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBinClick = (binType) => {
    if (!selectedItem) return;
    
    if (selectedItem.type === binType) {
      setSortedItems(prev => ({
        ...prev,
        [binType]: [...prev[binType], selectedItem]
      }));
      setItems(prev => prev.filter(item => item.id !== selectedItem.id));
      setSelectedItem(null);
    } else {
      onWrongAnswer(`${selectedItem.name} doesn't belong in ${binType} bin!`);
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      setCompletingAnimation(true);
      setTimeout(() => onComplete(), 2000);
    }
  }, [items, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <style>{styles}</style>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-green-300/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-green-100/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-200/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <FloatingParticles color="rgba(34,197,94,0.1)" />
      
      <div className="relative z-10 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 animate-slideDown">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-700 mb-4 flex items-center justify-center flex-wrap">
              <div className="animate-spin-slow mr-3">
                <Leaf className="text-green-500" size={40} />
              </div>
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                {puzzleData.waste.title}
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-xl animate-fadeIn">{puzzleData.waste.description}</p>
            
            {selectedItem && (
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-100/80 to-orange-100/80 rounded-2xl border-2 border-yellow-400/50 backdrop-blur-sm animate-bounceIn">
                <p className="text-orange-700 font-bold flex items-center justify-center">
                  <span className="animate-pulse mr-2">✨</span>
                  Selected: {selectedItem.emoji} {selectedItem.name} - Now click a bin!
                  <span className="animate-pulse ml-2">✨</span>
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Items to sort */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-4 sm:p-6 border border-green-200/50 shadow-xl animate-slideLeft">
              <h3 className="text-gray-700 font-bold text-lg sm:text-xl mb-4 flex items-center">
                <span className="animate-bounce mr-2">📦</span>
                Items to Sort ({items.length} left)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className={`p-3 sm:p-4 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 text-center animate-fadeInUp shadow-lg hover:shadow-xl border ${
                      selectedItem?.id === item.id 
                        ? 'bg-gradient-to-br from-yellow-200/80 to-orange-200/80 border-2 border-yellow-400 shadow-yellow-500/25 animate-pulse scale-105' 
                        : 'bg-white/60 hover:bg-white/80 border-green-200/50 hover:border-green-300/70'
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                      {item.emoji}
                    </div>
                    <div className="text-gray-700 text-xs sm:text-sm font-medium">{item.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bins */}
            <div className="space-y-4 animate-slideRight">
              <h3 className="text-gray-700 font-bold text-lg sm:text-xl flex items-center">
                <span className="animate-bounce mr-2">🗑️</span>
                Click bin to sort selected item:
              </h3>
              {puzzleData.waste.bins.map((bin, index) => (
                <button
                  key={bin.id}
                  onClick={() => handleBinClick(bin.id)}
                  disabled={!selectedItem}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  className={`w-full p-4 sm:p-6 rounded-3xl border-2 border-dashed transition-all duration-500 text-left transform hover:scale-105 animate-slideUp shadow-lg ${
                    selectedItem 
                      ? `${bin.color}/20 border-opacity-60 hover:bg-opacity-30 shadow-lg hover:shadow-xl backdrop-blur-sm bg-white/40` 
                      : 'bg-gray-200/30 border-gray-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-2xl sm:text-3xl mr-3 animate-bounce" style={{ animationDelay: `${index * 0.3}s` }}>
                      {bin.emoji}
                    </span>
                    <h4 className="text-gray-700 font-bold text-base sm:text-lg">{bin.name}</h4>
                  </div>
                  
                  {sortedItems[bin.id].length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {sortedItems[bin.id].map((item, itemIndex) => (
                        <span 
                          key={item.id} 
                          className="bg-green-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm flex items-center shadow-lg animate-bounceIn"
                          style={{ animationDelay: `${itemIndex * 0.1}s` }}
                        >
                          <span className="mr-1">{item.emoji}</span>
                          {item.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {sortedItems[bin.id].length === 0 && (
                    <p className="text-gray-500 text-sm">Click to sort selected item here</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {completingAnimation && (
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-green-100/80 to-emerald-100/80 rounded-3xl backdrop-blur-lg border border-green-400/30 animate-bounceIn">
              <CheckCircle className="mx-auto mb-4 text-green-500 animate-spin" size={48} />
              <h3 className="text-2xl font-bold text-green-600 mb-2 animate-pulse">Level Complete! 🎉</h3>
              <p className="text-green-700 animate-fadeIn">Moving to Water Conservation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WaterPuzzle = ({ onComplete, onWrongAnswer }) => {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [completingAnimation, setCompletingAnimation] = useState(false);
  
  const handleSolution = (problemId, selectedSolution, correctSolution) => {
    if (selectedSolution === correctSolution) {
      setSolvedProblems(prev => [...prev, problemId]);
    } else {
      onWrongAnswer(`"${selectedSolution}" won't help with water conservation!`);
    }
  };

  useEffect(() => {
    if (solvedProblems.length === puzzleData.water.problems.length) {
      setCompletingAnimation(true);
      setTimeout(() => onComplete(), 2000);
    }
  }, [solvedProblems, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <style>{styles}</style>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-cyan-300/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-blue-100/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-cyan-200/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <FloatingParticles color="rgba(34,211,238,0.1)" />
      
      {/* Animated water waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-32 animate-wave opacity-20" viewBox="0 0 1440 320" fill="none">
          <path fill="rgba(34,211,238,0.3)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </svg>
      </div>
      
      <div className="relative z-10 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 animate-slideDown">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-700 mb-4 flex items-center justify-center flex-wrap">
              <div className="animate-bounce mr-3">
                <Droplet className="text-blue-500" size={40} />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {puzzleData.water.title}
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-xl animate-fadeIn">{puzzleData.water.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {puzzleData.water.problems.map((problem, index) => (
              <div 
                key={problem.id} 
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-4 sm:p-6 border border-blue-200/50 shadow-xl transform hover:scale-105 transition-all duration-500 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl sm:text-6xl mb-3 animate-bounce" style={{ animationDelay: `${index * 0.3}s` }}>
                    {problem.emoji}
                  </div>
                  <h3 className="text-gray-700 font-bold text-base sm:text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {problem.issue}
                  </h3>
                </div>
                
                {solvedProblems.includes(problem.id) ? (
                  <div className="text-center text-green-600 font-bold flex items-center justify-center p-4 bg-gradient-to-r from-green-100/80 to-emerald-100/80 rounded-2xl backdrop-blur-sm animate-bounceIn border border-green-400/30">
                    <CheckCircle className="mr-2 animate-spin" size={20} />
                    <span className="text-lg">SOLVED! 🎉</span>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {problem.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleSolution(problem.id, option, problem.solution)}
                        className="w-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 text-sm sm:text-base backdrop-blur-sm border border-blue-300/30 shadow-lg hover:shadow-xl"
                        style={{ animationDelay: `${(index * 3 + optionIndex) * 0.1}s` }}
                      >
                        <span className="flex items-center justify-center font-medium">
                          <span className="mr-2">🔧</span>
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {completingAnimation && (
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-100/80 to-cyan-100/80 rounded-3xl backdrop-blur-lg border border-blue-400/30 animate-bounceIn">
              <CheckCircle className="mx-auto mb-4 text-blue-500 animate-spin" size={48} />
              <h3 className="text-2xl font-bold text-blue-600 mb-2 animate-pulse">Water Crisis Solved! 💧</h3>
              <p className="text-blue-700 animate-fadeIn">Moving to Energy Efficiency...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EnergyPuzzle = ({ onComplete, onWrongAnswer }) => {
  const [appliances, setAppliances] = useState(puzzleData.energy.appliances);
  const [completingAnimation, setCompletingAnimation] = useState(false);
  
  const handleApplianceClick = (id) => {
    setAppliances(prev => prev.map(app => {
      if (app.id === id) {
        const newStatus = app.status === 'on' ? 'off' : 'on';
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  const checkSolution = () => {
    const incorrectAppliances = appliances.filter(app => 
      (app.efficient && app.status === 'off') || (!app.efficient && app.status === 'on')
    );
    
    if (incorrectAppliances.length > 0) {
      const incorrectApp = incorrectAppliances[0];
      if (incorrectApp.efficient && incorrectApp.status === 'off') {
        onWrongAnswer(`${incorrectApp.name} is GOOD for environment - Keep it ON! 👍`);
      } else {
        onWrongAnswer(`${incorrectApp.name} is BAD for environment - Turn it OFF! 👎`);
      }
    }
  };

  useEffect(() => {
    const correctState = appliances.every(app => 
      (app.efficient && app.status === 'on') || (!app.efficient && app.status === 'off')
    );
    if (correctState) {
      setCompletingAnimation(true);
      setTimeout(() => onComplete(), 2000);
    }
  }, [appliances, onComplete]);

  const correctCount = appliances.filter(app => 
    (app.efficient && app.status === 'on') || (!app.efficient && app.status === 'off')
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <style>{styles}</style>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-orange-300/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-yellow-100/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-orange-200/25 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <FloatingParticles color="rgba(251,191,36,0.1)" />
      
      {/* Electric sparks animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-500 animate-ping opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: '12px'
            }}
          >
            ⚡
          </div>
        ))}
      </div>
      
      <div className="relative z-10 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 animate-slideDown">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-700 mb-4 flex items-center justify-center flex-wrap">
              <div className="animate-pulse mr-3">
                <Zap className="text-yellow-500" size={40} />
              </div>
              <span className="bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">
                Save Energy Crisis
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-xl mb-2 animate-fadeIn">Click appliances to turn ON/OFF and save energy!</p>
            
            <div className="bg-gradient-to-r from-yellow-100/80 to-orange-100/80 backdrop-blur-lg p-4 rounded-3xl mb-4 border border-yellow-400/30 animate-bounceIn">
              <p className="text-orange-700 text-sm sm:text-base font-bold mb-2">🎯 SIMPLE RULE:</p>
              <div className="text-left max-w-md mx-auto space-y-1">
                <p className="text-orange-600 text-xs sm:text-sm flex items-center justify-center">
                  <span className="animate-bounce mr-2">✅</span>
                  GREEN items = Good for environment - Keep ON
                </p>
                <p className="text-orange-600 text-xs sm:text-sm flex items-center justify-center">
                  <span className="animate-bounce mr-2">❌</span>
                  RED items = Bad for environment - Turn OFF
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-green-200/50 shadow-lg">
              <p className="text-gray-700 font-bold flex items-center justify-center">
                <span className="animate-pulse mr-2">⚡</span>
                Progress: {correctCount}/{appliances.length} correct
                <span className="animate-pulse ml-2">⚡</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
            {appliances.map((appliance, index) => (
              <button
                key={appliance.id}
                onClick={() => handleApplianceClick(appliance.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={`p-3 sm:p-6 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 backdrop-blur-sm border-2 shadow-xl animate-fadeInUp ${
                  appliance.status === 'on' 
                    ? appliance.efficient 
                      ? 'bg-white/80 border-green-400 shadow-green-500/25' 
                      : 'bg-red-100/80 border-red-400 shadow-red-500/25 animate-pulse'
                    : 'bg-gray-100/80 border-gray-400 shadow-gray-500/25'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl sm:text-6xl mb-2 sm:mb-3 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                    {appliance.emoji}
                  </div>
                  <h3 className="text-gray-700 font-bold text-xs sm:text-lg mb-2 leading-tight">{appliance.name}</h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      appliance.status === 'on' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                    }`}>
                      {appliance.status === 'on' ? 'ON ⚡' : 'OFF 💤'}
                    </span>
                    {appliance.efficient ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">GOOD 👍</span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">BAD 👎</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs font-medium">
                    {appliance.efficient ? "Keep this ON!" : "Turn this OFF!"}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={checkSolution}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🔍</span>
                Check My Solution
              </span>
            </button>
          </div>

          {completingAnimation && (
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-yellow-100/80 to-orange-100/80 rounded-3xl backdrop-blur-lg border border-yellow-400/30 animate-bounceIn">
              <CheckCircle className="mx-auto mb-4 text-yellow-600 animate-spin" size={48} />
              <h3 className="text-2xl font-bold text-yellow-700 mb-2 animate-pulse">Energy Crisis Solved! ⚡</h3>
              <p className="text-orange-700 animate-fadeIn">All appliances are optimized!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GameComplete = ({ score, onRestart, onHome }) => {
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFireworks(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden px-4">
      <style>{styles}</style>
      
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 20}px`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center z-10 p-6 sm:p-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-sm sm:max-w-md mx-auto w-full transform hover:scale-105 transition-all duration-500">
        <div className="relative">
          <h1 className="text-4xl sm:text-6xl font-bold text-green-600 mb-4 animate-bounce">🌱</h1>
          <div className="absolute -top-2 -right-2 animate-spin-slow">
            <Sparkles className="text-green-500" size={24} />
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-purple-600 mb-6 animate-gradient">
          CITY SAVED!
        </h2>
        
        <p className="text-gray-600 text-base sm:text-lg mb-4 leading-relaxed">
          Congratulations! You've cleaned the polluted city and escaped to a greener future!
        </p>
        
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl mb-6 transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">Final Score: {score}</h3>
          <div className="flex justify-center mt-3">
            {[...Array(Math.min(5, Math.floor(score/10)))].map((_, i) => (
              <Star key={i} className="text-yellow-500 fill-current animate-pulse mx-1" size={24} style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-green-500/25"
          >
            <RotateCcw className="mr-2" size={20} />
            Play Again
          </button>
          
          <button
            onClick={onHome}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-blue-500/25"
          >
            <Home className="mr-2" size={20} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [gameState, setGameState] = useState('home');
  const [currentLevel, setCurrentLevel] = useState('waste');
  const [score, setScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setLeaderboard([95, 87, 72, 65, 58, 42, 38, 25]);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel('waste');
    setScore(0);
    setCompletedLevels([]);
    setFeedback('');
  };

  const completeLevel = () => {
    const newScore = score + 10;
    setScore(newScore);
    setCompletedLevels(prev => [...prev, currentLevel]);
    
    if (currentLevel === 'waste') {
      setCurrentLevel('water');
    } else if (currentLevel === 'water') {
      setCurrentLevel('energy');
    } else {
      setGameState('complete');
      const newLeaderboard = [...leaderboard, newScore].sort((a, b) => b - a).slice(0, 10);
      setLeaderboard(newLeaderboard);
    }
    
    setFeedback('');
  };

  const handleWrongAnswer = (message) => {
    setScore(Math.max(0, score - 2));
    setFeedback(message);
    setTimeout(() => setFeedback(''), 4000);
  };

  const resetGame = () => {
    setGameState('home');
    setCurrentLevel('waste');
    setScore(0);
    setCompletedLevels([]);
    setFeedback('');
  };

  if (gameState === 'home') {
    return <HomeScreen onStartGame={startGame} leaderboard={leaderboard} />;
  }

  if (gameState === 'complete') {
    return <GameComplete score={score} onRestart={startGame} onHome={resetGame} />;
  }

  return (
    <div className="relative">
      <style>{styles}</style>
      
      {/* Game Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg p-3 sm:p-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-white">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              ECO ESCAPE
            </h1>
            <div className="text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full shadow-lg">
              Score: {score}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex space-x-1 sm:space-x-2">
              {['waste', 'water', 'energy'].map(level => (
                <div
                  key={level}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    completedLevels.includes(level) 
                      ? 'bg-green-400 animate-pulse' 
                      : level === currentLevel 
                        ? 'bg-yellow-400 animate-bounce' 
                        : 'bg-gray-600'
                  }`}
                  title={level}
                />
              ))}
            </div>
            
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center text-sm sm:text-base shadow-lg"
            >
              <Home className="mr-1 sm:mr-2" size={14} />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="fixed top-16 sm:top-20 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center mx-auto max-w-md backdrop-blur-lg border border-red-400/30 animate-bounceIn">
          <XCircle className="mr-2 flex-shrink-0 animate-pulse" size={20} />
          <span className="text-sm sm:text-base font-medium">{feedback}</span>
        </div>
      )}

      {/* Game Content */}
      <div className="pt-16 sm:pt-20">
        {currentLevel === 'waste' && (
          <WastePuzzle onComplete={completeLevel} onWrongAnswer={handleWrongAnswer} />
        )}
        {currentLevel === 'water' && (
          <WaterPuzzle onComplete={completeLevel} onWrongAnswer={handleWrongAnswer} />
        )}
        {currentLevel === 'energy' && (
          <EnergyPuzzle onComplete={completeLevel} onWrongAnswer={handleWrongAnswer} />
        )}
      </div>
    </div>
  );
};

export default App;