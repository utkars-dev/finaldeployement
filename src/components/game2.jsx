import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Leaf, Droplets, Recycle, TreePine, Award, Star, Sparkles } from 'lucide-react';

// --- Main Game Component ---
const EcoRunGame = () => {
  // React state for UI rendering (score, game status, etc.)
  const [gameState, setGameState] = useState('start'); // start, playing, gameOver
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [badges, setBadges] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // useRef to hold all mutable game data that changes every frame.
  // This is the key to preventing re-renders and keeping the game smooth.
  const gameRef = useRef({
    playerY: 0,
    playerVy: 0, // Vertical velocity for jumping
    isJumping: false,
    jumpsLeft: 2, // Player can jump twice
    speed: 5,
    obstacles: [],
    collectibles: [],
    backgroundOffset: 0,
    particles: [],
    gameTime: 0,
  });

  // --- Game Configuration Constants ---
  const GROUND_Y = 680; // FIX: Adjusted to place player on the visual ground.
  const JUMP_FORCE = -22; // FIX: Increased jump force for a higher jump.
  const GRAVITY = 0.8;
  const PLAYER_X = 120;
  const PLAYER_WIDTH = 50;
  const PLAYER_HEIGHT = 60;
  const INITIAL_SPEED = 3;
  const MAX_SPEED = 8;

  // --- Game Asset Definitions ---
  const badgeTypes = {
    10: { name: "Earth Friend 🌱", icon: Leaf, color: "text-green-400" },
    25: { name: "Water Saver 💧", icon: Droplets, color: "text-blue-500" },
    50: { name: "Eco Rider 🚴", icon: Star, color: "text-yellow-500" },
    100: { name: "Tree Planter 🌳", icon: TreePine, color: "text-green-600" },
    200: { name: "Recycle Champ ♻️", icon: Recycle, color: "text-purple-500" },
    500: { name: "Planet Hero 🌍", icon: Sparkles, color: "text-pink-400" },
  };

  const collectibleTypes = [
    { type: 'leaf', icon: '🍃', points: 1, stars: 1 },
    { type: 'tree', icon: '🌳', points: 5, stars: 2 },
    { type: 'water', icon: '💧', points: 5, stars: 2 },
    { type: 'recycle', icon: '♻️', points: 10, stars: 3 },
  ];

  const obstacleTypes = [
    { type: 'trash', icon: '🗑️', width: 40, height: 45 },
    { type: 'plastic', icon: '🥤', width: 30, height: 35 },
    { type: 'oil', icon: '🛢️', width: 35, height: 40 },
  ];

  // --- Game Actions ---
  const startGame = () => {
    // Reset game state in the ref
    gameRef.current = {
      playerY: GROUND_Y,
      playerVy: 0,
      isJumping: false,
      jumpsLeft: 2, // Reset jumps
      speed: INITIAL_SPEED,
      obstacles: [],
      collectibles: [],
      backgroundOffset: 0,
      particles: [],
      gameTime: 0,
    };
    // Reset React state for the UI
    setScore(0);
    setStars(0);
    setBadges([]);
    setShowCelebration(false);
    setGameState('playing');
  };

  const jump = useCallback(() => {
    // FIX: Allow jumping if jumps are left (enables double jump)
    if (gameRef.current.jumpsLeft > 0 && gameState === 'playing') {
      gameRef.current.jumpsLeft--;
      gameRef.current.isJumping = true;
      gameRef.current.playerVy = JUMP_FORCE;
    }
  }, [gameState]);
  
  // --- Keyboard and Touch Controls ---
  useEffect(() => {
    const handleAction = (e) => {
      e.preventDefault();
      if (gameState === 'start' || gameState === 'gameOver') {
        startGame();
      } else {
        jump();
      }
    };
    
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        handleAction(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleAction);
    window.addEventListener('mousedown', handleAction);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleAction);
      window.removeEventListener('mousedown', handleAction);
    };
  }, [jump, gameState]);

  // --- Core Game Loop using requestAnimationFrame ---
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    const game = gameRef.current;

    // Update game time and speed
    game.gameTime++;
    game.speed = Math.min(MAX_SPEED, INITIAL_SPEED + Math.floor(game.gameTime / 500));
    
    // Update background
    game.backgroundOffset = (game.backgroundOffset + game.speed) % 800;
    
    // --- Player Physics (Jump and Gravity) ---
    game.playerVy += GRAVITY;
    game.playerY += game.playerVy;

    if (game.playerY >= GROUND_Y) {
      game.playerY = GROUND_Y;
      game.playerVy = 0;
      game.isJumping = false;
      game.jumpsLeft = 2; // FIX: Reset jumps when player lands on the ground
    }

    // --- Move and Spawn Objects ---
    // Move Obstacles
    game.obstacles = game.obstacles
      .map(obs => ({ ...obs, x: obs.x - game.speed }))
      .filter(obs => obs.x > -100);

    // Move Collectibles
    game.collectibles = game.collectibles
      .map(col => ({ ...col, x: col.x - game.speed }))
      .filter(col => col.x > -100);

    // Spawn Obstacles
    if (Math.random() < 0.015 && game.gameTime > 60) {
      const lastObstacle = game.obstacles[game.obstacles.length - 1];
      if (!lastObstacle || lastObstacle.x < 500) {
        const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        game.obstacles.push({ ...type, x: 800 + Math.random() * 200, id: Math.random() });
      }
    }
    
    // Spawn Collectibles
    if (Math.random() < 0.02) {
      const lastCollectible = game.collectibles[game.collectibles.length - 1];
      if(!lastCollectible || lastCollectible.x < 700) {
        const type = collectibleTypes[Math.floor(Math.random() * collectibleTypes.length)];
        game.collectibles.push({ ...type, x: 800 + Math.random() * 300, y: GROUND_Y - 80 - Math.random() * 120, id: Math.random() });
      }
    }

    // --- Collision Detection ---
    const playerRect = { x: PLAYER_X, y: game.playerY - PLAYER_HEIGHT, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };

    // Obstacle Collision
    for (const obs of game.obstacles) {
      const obsRect = { x: obs.x, y: GROUND_Y - obs.height, width: obs.width, height: obs.height };
      if (
        playerRect.x < obsRect.x + obsRect.width &&
        playerRect.x + playerRect.width > obsRect.x &&
        playerRect.y < obsRect.y + obsRect.height &&
        playerRect.y + playerRect.height > obsRect.y
      ) {
        setGameState('gameOver'); // END GAME
        return; // Stop the loop immediately
      }
    }

    // Collectible Collision
    game.collectibles = game.collectibles.filter(col => {
      const colRect = { x: col.x, y: col.y, width: 35, height: 35 };
      if (
        playerRect.x < colRect.x + colRect.width &&
        playerRect.x + playerRect.width > colRect.x &&
        playerRect.y < colRect.y + colRect.height &&
        playerRect.y + playerRect.height > colRect.y
      ) {
        setScore(s => s + col.points);
        setStars(s => s + col.stars);
        return false; // Remove collected item
      }
      return true;
    });
    
    // Passive Score
    setScore(s => s + 0.1);

    requestAnimationFrame(gameLoop);
  }, [gameState]);
  
  useEffect(() => {
    if (gameState === 'playing') {
      requestAnimationFrame(gameLoop);
    }
  }, [gameState, gameLoop]);
  
  // Badge unlock logic
  useEffect(() => {
    Object.keys(badgeTypes).forEach(threshold => {
      if (stars >= parseInt(threshold) && !badges.includes(threshold)) {
        setBadges(prev => [...prev, threshold]);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2500);
      }
    });
  }, [stars, badges]);


  // --- Render ---
  const { playerY, obstacles, collectibles, backgroundOffset } = gameRef.current;
  const playerRotation = gameRef.current.isJumping ? (gameRef.current.playerVy * 1.5) : 0;

  return (
    <div className="w-full h-screen bg-sky-200 relative overflow-hidden select-none cursor-pointer">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100"></div>
        <div className="absolute top-10 text-6xl opacity-20" style={{ left: `${100 - (backgroundOffset * 0.2) % 150}%` }}>☁️</div>
        <div className="absolute top-24 text-5xl opacity-30" style={{ left: `${120 - (backgroundOffset * 0.3) % 180}%` }}>☁️</div>
        <div 
          className="absolute bottom-0 left-0 w-[1600px] h-40 bg-repeat-x"
          style={{ 
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="160"><path d="M0 160 H 800 V 80 C 600 80, 500 20, 400 80 C 300 140, 200 80, 0 80 Z" fill="%2322c55e" /><path d="M0 160 H 800 V 90 C 650 90, 550 40, 400 90 C 250 140, 150 90, 0 90 Z" fill="%2316a34a" /></svg>')`,
            transform: `translateX(-${backgroundOffset}px)`,
            zIndex: 1
          }}
        />

      {/* Game World: Player, Obstacles, Collectibles */}
      <div className="absolute inset-0">
        {/* Player */}
        <div 
          className="absolute text-6xl"
          style={{ 
            left: `${PLAYER_X}px`, 
            top: `${playerY - PLAYER_HEIGHT}px`,
            width: `${PLAYER_WIDTH}px`,
            height: `${PLAYER_HEIGHT}px`,
            transform: `rotate(${playerRotation}deg) scaleX(-1)`,
            transition: 'transform 100ms linear',
            zIndex: 10
          }}
        >
          🚴
        </div>

        {/* Obstacles */}
        {obstacles.map(obs => (
          <div
            key={obs.id}
            className="absolute text-5xl"
            style={{ 
              left: `${obs.x}px`, 
              top: `${GROUND_Y - obs.height}px`,
              width: `${obs.width}px`,
              height: `${obs.height}px`,
              zIndex: 9
            }}
          >
            {obs.icon}
          </div>
        ))}
        
        {/* Collectibles */}
        {collectibles.map(col => (
          <div
            key={col.id}
            className="absolute text-4xl"
            style={{ left: `${col.x}px`, top: `${col.y}px`, zIndex: 11 }}
          >
            {col.icon}
          </div>
        ))}
      </div>

      {/* UI Elements */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        {/* Score & Stars */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
            <div className="text-xl font-bold text-gray-700">SCORE: {Math.floor(score).toLocaleString()}</div>
            <div className="text-xl font-bold text-yellow-600 flex items-center">
                <Star className="w-6 h-6 inline mr-1" /> {stars}
            </div>
        </div>
        {/* Badges */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-xs">
            <h3 className="font-bold text-gray-700 mb-2">Badges Unlocked:</h3>
            <div className="flex flex-wrap gap-2">
                {badges.length > 0 ? badges.map(b => {
                    const BadgeIcon = badgeTypes[b].icon;
                    return <BadgeIcon key={b} title={badgeTypes[b].name} className={`w-8 h-8 ${badgeTypes[b].color}`} />;
                }) : <span className="text-gray-500">None yet!</span>}
            </div>
        </div>
      </div>
      
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-30 text-white text-center p-4">
          <h1 className="text-6xl font-bold mb-4">Eco Run</h1>
          <p className="text-2xl mb-8">Help the cyclist clean the park! Jump over trash.</p>
          <button className="text-3xl font-bold bg-green-500 px-8 py-4 rounded-xl animate-pulse">
            Press Space or Tap to Start
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-30 text-white text-center p-4">
          <h1 className="text-6xl font-bold text-red-500 mb-4">Game Over!</h1>
          <p className="text-3xl mb-4">You hit the trash!</p>
          <div className="text-2xl mb-2">Final Score: {Math.floor(score).toLocaleString()}</div>
          <div className="text-2xl mb-8">Stars Collected: {stars}</div>
          <button className="text-3xl font-bold bg-green-500 px-8 py-4 rounded-xl animate-pulse">
            Press Space or Tap to Play Again
          </button>
        </div>
      )}
      
      {/* Badge Celebration */}
      {showCelebration && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300 p-8 rounded-2xl shadow-2xl z-40 text-center animate-bounce">
            <div className="text-3xl font-bold text-yellow-800">🎉 New Badge Unlocked! 🎉</div>
            <div className="text-2xl font-bold mt-2">{badgeTypes[badges[badges.length - 1]]?.name}</div>
        </div>
      )}
    </div>
  );
};

export default EcoRunGame;