import React, { useState, useEffect } from 'react';

const EcomitraWasteSortingGame = () => {
  const wasteItems = [
    { id: 1, name: 'Banana Peel', type: 'organic', emoji: '🍌', color: 'bg-yellow-100' },
    { id: 2, name: 'Plastic Bottle', type: 'plastic', emoji: '🧴', color: 'bg-blue-100' },
    { id: 3, name: 'Newspaper', type: 'paper', emoji: '📰', color: 'bg-gray-100' },
    { id: 4, name: 'Apple Core', type: 'organic', emoji: '🍎', color: 'bg-red-100' },
    { id: 5, name: 'Plastic Bag', type: 'plastic', emoji: '🛍️', color: 'bg-blue-100' },
    { id: 6, name: 'Cardboard Box', type: 'paper', emoji: '📦', color: 'bg-amber-100' },
    { id: 7, name: 'Orange Peel', type: 'organic', emoji: '🍊', color: 'bg-orange-100' },
    { id: 8, name: 'Milk Carton', type: 'paper', emoji: '🥛', color: 'bg-white' },
    { id: 9, name: 'Plastic Cup', type: 'plastic', emoji: '🥤', color: 'bg-blue-100' },
    { id: 10, name: 'Lettuce', type: 'organic', emoji: '🥬', color: 'bg-green-100' },
  ];

  const bins = [
    { id: 'organic', name: 'Organic Waste', color: 'bg-gradient-to-br from-emerald-500 to-green-600', emoji: '🌱', items: [] },
    { id: 'plastic', name: 'Plastic Waste', color: 'bg-gradient-to-br from-sky-500 to-blue-600', emoji: '♻️', items: [] },
    { id: 'paper', name: 'Paper Waste', color: 'bg-gradient-to-br from-amber-500 to-orange-500', emoji: '📄', items: [] },
  ];

  const [gameItems, setGameItems] = useState([]);
  const [sortedBins, setSortedBins] = useState(bins);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZone, setDropZone] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Shuffle and select 6 random items for better gameplay
    const shuffledItems = [...wasteItems].sort(() => Math.random() - 0.5).slice(0, 6);
    setGameItems(shuffledItems);
    setSortedBins(bins.map(bin => ({ ...bin, items: [] })));
    setScore(0);
    setGameComplete(false);
    setFeedback('');
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, binId) => {
    e.preventDefault();
    setDropZone(binId);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDropZone(null);
  };

  const handleDrop = (e, binId) => {
    e.preventDefault();
    setDropZone(null);

    if (!draggedItem) return;

    const isCorrect = draggedItem.type === binId;

    if (isCorrect) {
      // Correct drop
      setScore(prev => prev + 10);
      setFeedback('Great job! +10 points');
      
      // Remove item from game items
      setGameItems(prev => prev.filter(item => item.id !== draggedItem.id));
      
      // Add item to bin
      setSortedBins(prev => 
        prev.map(bin => 
          bin.id === binId 
            ? { ...bin, items: [...bin.items, draggedItem] }
            : bin
        )
      );
    } else {
      // Incorrect drop
      setScore(prev => Math.max(0, prev - 5));
      setFeedback('Oops! Try again. -5 points');
    }

    setDraggedItem(null);
    
    // Clear feedback after 2 seconds
    setTimeout(() => setFeedback(''), 2000);
  };

  // Check if game is complete
  useEffect(() => {
    if (gameItems.length === 0 && !gameComplete) {
      setGameComplete(true);
    }
  }, [gameItems, gameComplete]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl text-white">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🌍</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Ecomitra Waste Sorting</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-xl font-semibold text-cyan-100">Score: {score}</div>
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-white text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold shadow-lg"
          >
            New Game
          </button>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="text-center p-2">
          <div className={`inline-block px-4 py-2 rounded-lg text-white font-semibold ${
            feedback.includes('Great') ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-red-500 to-pink-500'
          }`}>
            {feedback}
          </div>
        </div>
      )}

      {/* Game Complete Modal */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-emerald-700 mb-2">Well Done!</h2>
            <p className="text-xl text-gray-600 mb-4">You've sorted all the waste correctly!</p>
            <div className="text-2xl font-bold text-teal-600 mb-6">Final Score: {score}</div>
            <button 
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 text-lg font-semibold shadow-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <div className="flex-1 p-4 flex flex-col md:flex-row gap-6">
        {/* Items to Sort */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Drag items to the correct bins! 👆
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full max-h-96 overflow-y-auto">
            {gameItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className={`${item.color} p-6 rounded-xl shadow-xl cursor-move hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-transparent hover:border-white flex flex-col items-center justify-center min-h-32`}
              >
                <div className="text-6xl mb-3">{item.emoji}</div>
                <div className="text-sm font-medium text-gray-700 text-center">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recycling Bins */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Recycling Bins
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full max-h-96">
            {sortedBins.map((bin) => (
              <div
                key={bin.id}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, bin.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, bin.id)}
                className={`${bin.color} rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col ${
                  dropZone === bin.id ? 'scale-110 ring-4 ring-white ring-opacity-60 shadow-2xl' : ''
                }`}
              >
                <div className="text-center text-white mb-4">
                  <div className="text-7xl mb-3">{bin.emoji}</div>
                  <div className="font-semibold">{bin.name}</div>
                  <div className="text-sm opacity-80">Items: {bin.items.length}</div>
                </div>
                <div className="flex-1 min-h-24 bg-white bg-opacity-30 rounded-xl p-3 flex flex-wrap gap-2 content-start backdrop-blur-sm">
                  {bin.items.map((item, index) => (
                    <div key={index} className="text-2xl">{item.emoji}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white bg-opacity-90 p-3 text-center">
        <p className="text-sm text-gray-600">
          🌱 Organic waste goes in the green bin | ♻️ Plastic waste goes in the blue bin | 📄 Paper waste goes in the yellow bin
        </p>
      </div>
    </div>
  );
};

export default EcomitraWasteSortingGame;