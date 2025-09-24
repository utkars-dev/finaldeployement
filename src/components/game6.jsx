import React, { useState, useEffect, useCallback } from 'react';
import { Waves, Heart } from 'lucide-react';

const OceanRescueGame = () => {
  const [currentScreen, setCurrentScreen] = useState('landing'); // landing, game, results
  const [gameState, setGameState] = useState({
    score: 0,
    lives: 3,
    timeLeft: 45,
    level: 1,
    trashCollected: 0,
    fishSaved: 0,
    gameStatus: 'playing', // playing, won, lost
    oceanItems: []
  });

  // Ocean creatures and trash items
  const oceanCreatures = [
    { type: 'fish', emoji: '🐠', points: 10, speed: 2 },
    { type: 'turtle', emoji: '🐢', points: 20, speed: 1 },
    { type: 'dolphin', emoji: '🐬', points: 30, speed: 3 },
    { type: 'whale', emoji: '🐋', points: 50, speed: 1 },
    { type: 'octopus', emoji: '🐙', points: 15, speed: 2 },
    { type: 'seahorse', emoji: '🦄', points: 25, speed: 2 }
  ];

  const trashItems = [
    { type: 'plastic', emoji: '🥤', damage: 10, points: 15 },
    { type: 'bottle', emoji: '🍾', damage: 15, points: 20 },
    { type: 'bag', emoji: '🛍️', damage: 20, points: 25 },
    { type: 'can', emoji: '🥫', damage: 12, points: 18 },
    { type: 'net', emoji: '🕸️', damage: 25, points: 30 },
    { type: 'tire', emoji: '🛞', damage: 30, points: 35 }
  ];

  const generateOceanItem = useCallback(() => {
    const isTrash = Math.random() < 0.6; // 60% trash, 40% sea creatures
    const items = isTrash ? trashItems : oceanCreatures;
    const item = items[Math.floor(Math.random() * items.length)];

    return {
      id: Math.random(),
      ...item,
      x: Math.random() * 80 + 10, // 10% to 90% width
      y: Math.random() * 60 + 20, // 20% to 80% height
      isTrash,
      collected: false,
    };
  }, []); // Dependencies removed as they are constant

  // Initialize game
  const startGame = () => {
    const initialItems = Array.from({ length: 8 }, generateOceanItem);
    setGameState({
      score: 0,
      lives: 3,
      timeLeft: 45,
      level: 1,
      trashCollected: 0,
      fishSaved: 0, // This can be deprecated if we only count trash
      gameStatus: 'playing',
      oceanItems: initialItems
    });
    setCurrentScreen('game');
  };

  // Game timer and win/lose conditions
  useEffect(() => {
    if (currentScreen !== 'game' || gameState.gameStatus !== 'playing') {
      return;
    }

    if (gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Time is up, end the game
      endGame();
    }
  }, [gameState.timeLeft, gameState.gameStatus, currentScreen]);

  // Spawn new items periodically
  useEffect(() => {
    if (currentScreen === 'game' && gameState.gameStatus === 'playing') {
      const spawner = setInterval(() => {
        if (gameState.oceanItems.length < 12) {
          setGameState(prev => ({
            ...prev,
            oceanItems: [...prev.oceanItems, generateOceanItem()]
          }));
        }
      }, 2000);
      return () => clearInterval(spawner);
    }
  }, [currentScreen, gameState.gameStatus, gameState.oceanItems.length, generateOceanItem]);


  const collectItem = (itemId) => {
    // Prevent actions if the game is not in a 'playing' state
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => {
        const item = prev.oceanItems.find(i => i.id === itemId);
        if (!item) return prev;

        const newItems = prev.oceanItems.filter(i => i.id !== itemId);
        let newScore = prev.score;
        let newLives = prev.lives;
        let newTrashCollected = prev.trashCollected;
        let newGameStatus = prev.gameStatus;

        if (item.isTrash) {
            // Collecting trash is good!
            newScore += item.points;
            newTrashCollected += 1;
        } else {
            // *** CORRECTED LOGIC ***
            // Clicking sea creatures hurts them and costs a life.
            newLives -= 1;
            newScore = Math.max(0, newScore - 20); // Penalty
            
            // The game only ends if lives drop to 0.
            if (newLives <= 0) {
                newGameStatus = 'lost';
            }
        }
        
        const newState = {
            ...prev,
            oceanItems: newItems,
            score: newScore,
            lives: newLives,
            trashCollected: newTrashCollected,
            gameStatus: newGameStatus
        };

        // If the game status changed to lost, trigger the end game sequence immediately.
        if (newGameStatus === 'lost') {
            // We use a timeout to allow the UI to update and show 0 lives before transitioning.
            setTimeout(() => endGame(newState), 100);
        }
        
        return newState;
    });
  };

  // The `endGame` function can optionally receive the final state to avoid async issues
  const endGame = (finalState) => {
    const stateToEnd = finalState || gameState;

    const finalScore = stateToEnd.score + (stateToEnd.trashCollected * 5);
    
    // Determine final game status if it wasn't already set (e.g., by losing all lives)
    let finalStatus = stateToEnd.gameStatus;
    if (finalStatus === 'playing') {
      // If time ran out, the outcome is based on trash collected.
      finalStatus = stateToEnd.trashCollected >= 5 ? 'won' : 'lost'; 
    }
    
    setGameState(prev => ({
      ...prev,
      ...stateToEnd, // Apply the final state
      score: finalScore,
      gameStatus: finalStatus
    }));

    setCurrentScreen('results');
  };

  const resetGame = () => {
    setCurrentScreen('landing');
  };

  // Landing Page
  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-200 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30">🐠</div>
          <div className="absolute top-20 right-20 text-5xl animate-pulse opacity-40">🐢</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-pulse opacity-25">🐋</div>
          <div className="absolute top-1/3 right-1/3 text-4xl animate-bounce opacity-35">🐙</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-pulse opacity-30">🦄</div>
        </div>

        {/* Floating Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" className="w-full h-32">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-blue-400 animate-pulse"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-blue-300 animate-pulse"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-blue-200"
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Title */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-full shadow-2xl">
                  <Waves className="text-white" size={48} />
                </div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
                  Ocean Rescue Rangers
                </h1>
              </div>
              <p className="text-xl text-blue-700 font-medium mb-2">🌊 Dive into Marine Conservation! 🐠</p>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Join the mission to save our oceans! Clean up marine pollution, protect sea creatures,
                and learn about ocean conservation in this exciting underwater adventure.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🗑️</div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">Clean the Ocean</h3>
                <p className="text-gray-600">Remove plastic waste, bottles, and debris from the ocean to protect marine life!</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🐟</div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Save Sea Creatures</h3>
                <p className="text-gray-600">Protect dolphins, turtles, fish and other marine animals from pollution!</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">Learn & Earn Points</h3>
                <p className="text-gray-600">Discover ocean facts while earning points and becoming an eco-hero!</p>
              </div>
            </div>

            {/* Game Instructions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 How to Play</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">✅ DO THIS:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>🗑️ Click on trash items to clean the ocean</li>
                    <li>♻️ Collect plastic bottles, bags, and debris</li>
                    <li>🏆 Earn points for every piece of trash removed</li>
                    <li>⏰ Clean as much as possible before time runs out</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-2">❌ AVOID THIS:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>🐠 Don't click on sea creatures - they're friends!</li>
                    <li>💔 Clicking sea animals hurts them and costs lives</li>
                    <li>⚠️ You only have 3 lives - be careful!</li>
                    <li>🎯 Focus on cleaning, not disturbing wildlife</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transform transition-all duration-300 animate-pulse"
            >
              🌊 Dive In & Start Cleaning! 🐠
            </button>

            <p className="text-sm text-gray-600 mt-4">
              Join thousands of students learning about ocean conservation! 🌍
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentScreen === 'results') {
    const getResultMessage = () => {
      if (gameState.gameStatus === 'lost') {
        if (gameState.lives <= 0) {
          return {
            title: "💔 Ocean Creatures Hurt!",
            message: "Remember: Sea creatures are friends, not targets! Try again and focus on cleaning trash only.",
            color: "from-red-400 to-pink-500",
            icon: "😢"
          };
        } else {
          return {
            title: "⏰ Time's Up!",
            message: "The ocean still needs more cleaning! Try to collect more trash next time to become an Ocean Hero.",
            color: "from-orange-400 to-yellow-500",
            icon: "⏱️"
          };
        }
      } else { // Won the game
        if (gameState.score >= 200) {
          return {
            title: "🏆 Ocean Hero Champion!",
            message: "Amazing! You cleaned the ocean perfectly and became a true champion for marine life!",
            color: "from-yellow-400 to-orange-500",
            icon: "🏆"
          };
        } else {
          return {
            title: "🌟 Ocean Defender!",
            message: "Great job! You made a real difference by cleaning the ocean. Keep up the great work!",
            color: "from-green-400 to-blue-500",
            icon: "🌟"
          };
        }
      }
    };

    const result = getResultMessage();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center max-w-lg shadow-2xl">
          <div className={`bg-gradient-to-r ${result.color} p-4 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center text-4xl`}>
            {result.icon}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{result.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{result.message}</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 rounded-2xl p-4">
              <h3 className="font-bold text-blue-600">Your Impact Summary</h3>
              <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{gameState.trashCollected}</div>
                  <div className="text-gray-600">🗑️ Trash Cleaned</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{3 - Math.max(0, gameState.lives)}</div>
                    <div className="text-gray-600">💔 Mistakes Made</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-4">
              <h3 className="font-bold">Final Score</h3>
              <div className="text-3xl font-bold">{gameState.score}</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl hover:scale-105 transform transition-all duration-200 font-bold"
            >
              🎮 Play Again
            </button>
            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-3 rounded-2xl hover:scale-105 transform transition-all duration-200"
            >
              🏠 Back to Home
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
            <h4 className="font-bold text-blue-700 mb-2">🌊 Learning Moment</h4>
            <p className="text-sm text-blue-600">
              {gameState.gameStatus === 'lost' && gameState.lives <= 0
                ? "Sea creatures are vital to ocean ecosystems! Protecting them is just as important as cleaning pollution. Marine animals help maintain the ocean's balance and biodiversity."
                : "Every piece of trash removed from the ocean saves marine life! Plastic pollution affects over 700 marine species. Your conservation efforts make a real difference!"
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Game Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-cyan-200 to-teal-300 relative overflow-hidden">
      {/* Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 to-blue-600/50"></div>
      
      {/* Bubbles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-2 h-2 bg-white/30 rounded-full animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Game UI */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Waves className="text-blue-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-blue-600">Ocean Rescue Rangers</h1>
                <p className="text-sm text-gray-600">Clean the ocean & save marine life!</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{gameState.score}</div>
                <div className="text-xs text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{gameState.trashCollected}</div>
                <div className="text-xs text-gray-600">Trash Cleaned</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-500 flex items-center gap-1">
                  {Array.from({ length: Math.max(0, gameState.lives) }, (_, i) => (
                    <Heart key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <div className="text-xs text-gray-600">Lives</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">{gameState.timeLeft}s</div>
                <div className="text-xs text-gray-600">Time Left</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ocean Play Area */}
        <div className="relative bg-gradient-to-b from-cyan-200/50 to-blue-500/50 rounded-3xl min-h-[70vh] overflow-hidden shadow-2xl border-4 border-blue-300">
          {/* Ocean Items */}
          {gameState.oceanItems.map((item) => (
            <div
              key={item.id}
              className={`absolute cursor-pointer transform hover:scale-125 transition-transform duration-200 animate-float`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
              onClick={() => collectItem(item.id)}
            >
              <div className={`text-4xl drop-shadow-lg`}>
                {item.emoji}
              </div>
            </div>
          ))}

          {/* Game Instructions Overlay */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg max-w-xs">
            <h3 className="font-bold text-blue-600 mb-2">🎯 Quick Guide</h3>
            <p className="text-xs text-gray-700">
              <span className="text-green-600 font-semibold">Click trash</span> to clean ocean!
              <br />
              <span className="text-red-600 font-semibold">Avoid sea creatures</span> - they're friends!
            </p>
          </div>

          {/* Seaweed/Coral decoration */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-green-400/30 to-transparent"></div>
          <div className="absolute bottom-2 left-10 text-6xl opacity-30">🪸</div>
          <div className="absolute bottom-2 right-20 text-5xl opacity-30">🌿</div>
          <div className="absolute bottom-2 left-1/2 text-4xl opacity-30">🐚</div>
        </div>
      </div>
    </div>
  );
};

export default OceanRescueGame;
