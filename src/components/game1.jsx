import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, Droplets } from 'lucide-react';

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Game state for each step
  const [gameState, setGameState] = useState({
    holeCreated: false,
    seedAppeared: false,
    seedPlanted: false,
    bucketAppeared: false,
    watered: false,
    saplingGrown: false,
    treeGrown: false
  });

  // Drag and drop states
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [bucketTilted, setBucketTilted] = useState(false);
  const [waterPouring, setWaterPouring] = useState(false);

  const gameAreaRef = useRef(null);
  const holeRef = useRef(null);

  const questions = [
    {
      level: 1,
      question: "What is the first step when planting a tree?",
      options: [
        "Water the ground immediately",
        "Dig a proper hole in the soil",
        "Place the seed on top",
        "Add fertilizer first"
      ],
      correct: 1,
      hint: "Think about preparing the ground first - you need space for the seed!"
    },
    {
      level: 2,
      question: "How deep should you plant a tree seed?",
      options: [
        "On the surface only",
        "2-3 times the seed's diameter deep",
        "As deep as possible",
        "Just cover with leaves"
      ],
      correct: 1,
      hint: "Seeds need the right depth - not too shallow, not too deep!"
    },
    {
      level: 3,
      question: "What is most important immediately after planting a seed?",
      options: [
        "Add heavy fertilizer",
        "Cover with plastic sheet",
        "Provide adequate water",
        "Expose to direct sunlight only"
      ],
      correct: 2,
      hint: "Seeds need moisture to germinate and start growing!"
    },
    {
      level: 4,
      question: "How often should you water a newly planted sapling?",
      options: [
        "Once a month only",
        "Only when it rains",
        "Regularly, daily or every other day",
        "Once a week maximum"
      ],
      correct: 2,
      hint: "Young plants need consistent moisture to establish their roots!"
    },
    {
      level: 5,
      question: "What helps a young tree grow strong and healthy?",
      options: [
        "Regular watering, sunlight, and proper care",
        "Keeping it covered always",
        "Adding only fertilizer",
        "Keeping it in complete darkness"
      ],
      correct: 0,
      hint: "Trees are living things - they need water, light, and care to thrive!"
    }
  ];

  const currentQuestion = questions[currentLevel - 1];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowResult(false);
    setShowHint(false);
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === currentQuestion.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setTimeout(() => {
        // Trigger the appropriate game state change based on level
        switch(currentLevel) {
          case 1:
            setGameState(prev => ({ ...prev, holeCreated: true }));
            break;
          case 2:
            setTimeout(() => {
              setGameState(prev => ({ ...prev, seedAppeared: true }));
            }, 500);
            break;
          case 3:
            setTimeout(() => {
              setGameState(prev => ({ ...prev, bucketAppeared: true }));
            }, 500);
            break;
          case 4:
            setTimeout(() => {
              setGameState(prev => ({ ...prev, saplingGrown: true }));
            }, 500);
            break;
          case 5:
            setTimeout(() => {
              setGameState(prev => ({ ...prev, treeGrown: true }));
              setGameComplete(true);
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 4000);
            }, 500);
            break;
        }
        
        // Move to next level if not the last one
        if (currentLevel < 5) {
          setTimeout(() => {
            setCurrentLevel(prev => prev + 1);
            setSelectedAnswer('');
            setShowResult(false);
          }, currentLevel === 1 ? 2000 : 1500);
        }
      }, 1000);
    } else {
      setTimeout(() => setShowHint(true), 1000);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer('');
    setShowResult(false);
    setShowHint(false);
  };

  const handleDragStart = (e, item) => {
    e.preventDefault();
    setIsDragging(true);
    setDraggedItem(item);
    
    const gameRect = gameAreaRef.current.getBoundingClientRect();
    setDragPosition({
      x: e.clientX - gameRect.left,
      y: e.clientY - gameRect.top
    });
  };

  const handleDragMove = (e) => {
    if (isDragging && gameAreaRef.current) {
      e.preventDefault();
      const gameRect = gameAreaRef.current.getBoundingClientRect();
      setDragPosition({
        x: e.clientX - gameRect.left,
        y: e.clientY - gameRect.top
      });
    }
  };

  const handleDragEnd = (e) => {
    if (isDragging && holeRef.current) {
      const holeRect = holeRef.current.getBoundingClientRect();
      const gameRect = gameAreaRef.current.getBoundingClientRect();
      
      const dropX = e.clientX - gameRect.left;
      const dropY = e.clientY - gameRect.top;
      
      const holeX = holeRect.left - gameRect.left + holeRect.width / 2;
      const holeY = holeRect.top - gameRect.top + holeRect.height / 2;
      
      const distance = Math.sqrt(Math.pow(dropX - holeX, 2) + Math.pow(dropY - holeY, 2));
      
      if (distance < 60) {
        if (draggedItem === 'seed' && !gameState.seedPlanted) {
          setGameState(prev => ({ ...prev, seedPlanted: true }));
        } else if (draggedItem === 'bucket' && !gameState.watered) {
          // Move bucket right above the hole first, then tilt and pour
          const bucketX = holeX; // Center bucket above hole
          const bucketY = holeY - 80; // Position well above hole
          setDragPosition({ x: bucketX, y: bucketY });
          
          setTimeout(() => {
            setBucketTilted(true);
            setWaterPouring(true);
            setTimeout(() => {
              setGameState(prev => ({ ...prev, watered: true }));
              setBucketTilted(false);
              setWaterPouring(false);
            }, 2000);
          }, 500);
        }
      }
    }
    
    setIsDragging(false);
    setDraggedItem(null);
  };

  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleMouseUp = (e) => handleDragEnd(e);
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  },);

  const Confetti = () => {
    const particles = Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full animate-bounce"
        style={{
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'][i % 5],
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${1 + Math.random()}s`
        }}
      />
    ));
    return <div className="fixed inset-0 pointer-events-none z-50">{particles}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center p-4">
      {showConfetti && <Confetti />}
      
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            🌱 Plant Your Knowledge Tree 🌳
          </h1>
          <div className="flex justify-center items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  level < currentLevel 
                    ? 'bg-green-500 text-white' 
                    : level === currentLevel 
                    ? 'bg-green-300 text-green-800 border-2 border-green-500' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {level < currentLevel ? '✓' : level}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Tree Visualization Area */}
          <div className="flex-1 flex justify-center w-full">
            <div 
              ref={gameAreaRef}
              className="relative w-96 h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl border-4 border-green-300 overflow-hidden"
            >
              {/* Sky background */}
              <div className="absolute top-0 w-full h-48 bg-gradient-to-b from-blue-200 to-blue-100"></div>
              
              {/* Ground */}
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700"></div>
              
              {/* Grass line */}
              <div className="absolute bottom-32 w-full h-2 bg-green-600"></div>

              {/* Hole - appears after level 1 */}
              {gameState.holeCreated && (
                <div 
                  ref={holeRef}
                  className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-amber-950 rounded-full border-2 border-amber-900 transition-all duration-1000 ease-out"
                  style={{
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  <div className="absolute inset-1 bg-gradient-to-b from-amber-800 to-amber-950 rounded-full"></div>
                </div>
              )}

              {/* Seed - appears from top after level 2, can be dragged */}
              {gameState.seedAppeared && !gameState.seedPlanted && (
                <div
                  className={`absolute cursor-grab active:cursor-grabbing transition-all duration-300 select-none ${
                    isDragging && draggedItem === 'seed' ? 'z-50' : 'z-10'
                  }`}
                  style={{
                    left: isDragging && draggedItem === 'seed' ? `${dragPosition.x - 12}px` : '50%',
                    top: isDragging && draggedItem === 'seed' ? `${dragPosition.y - 12}px` : '20px',
                    transform: isDragging && draggedItem === 'seed' ? 'none' : 'translateX(-50%)',
                    pointerEvents: 'auto'
                  }}
                  onMouseDown={(e) => handleDragStart(e, 'seed')}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <div className="w-6 h-6 bg-amber-600 rounded-full border-2 border-amber-800 shadow-lg">
                    <div className="w-2 h-2 bg-amber-400 rounded-full m-1"></div>
                  </div>
                  <div className="text-xs text-center mt-1 text-amber-800 font-medium pointer-events-none">Drag me!</div>
                </div>
              )}

              {/* Planted seed */}
              {gameState.seedPlanted && (
                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 transition-all duration-1000">
                  <div className="w-4 h-4 bg-amber-600 rounded-full border border-amber-800"></div>
                </div>
              )}

              {/* Water bucket - appears from top after level 3, can be dragged */}
              {gameState.bucketAppeared && !gameState.watered && (
                <div
                  className={`absolute cursor-grab active:cursor-grabbing transition-all duration-300 select-none ${
                    isDragging && draggedItem === 'bucket' ? 'z-50' : 'z-10'
                  }`}
                  style={{
                    left: isDragging && draggedItem === 'bucket' ? `${dragPosition.x - 20}px` : '70%',
                    top: isDragging && draggedItem === 'bucket' ? `${dragPosition.y - 20}px` : '20px',
                    transform: `${isDragging && draggedItem === 'bucket' ? 'none' : 'translateX(-50%)'} ${bucketTilted ? 'rotate(45deg)' : ''}`,
                    pointerEvents: 'auto',
                    transformOrigin: 'bottom center'
                  }}
                  onMouseDown={(e) => handleDragStart(e, 'bucket')}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-lg border-2 border-blue-800 shadow-lg flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-2 bg-blue-700 rounded-full mx-1"></div>
                  <div className="text-xs text-center mt-1 text-blue-800 font-medium pointer-events-none">Drag me!</div>
                </div>
              )}

              {/* Water pouring animation */}
              {waterPouring && (
                <div className="absolute left-1/2 transform -translate-x-1/2" style={{bottom: '140px'}}>
                  <div className="w-1 h-12 bg-blue-400 opacity-75 animate-pulse"></div>
                  <div className="w-3 h-3 bg-blue-300 rounded-full animate-ping" style={{marginTop: '2px'}}></div>
                </div>
              )}

              {/* Water puddle */}
              {gameState.watered && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-blue-300 rounded-full opacity-60"></div>
              )}

              {/* Sapling - grows after level 4 */}
              {gameState.saplingGrown && !gameState.treeGrown && (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-2000 ease-out animate-pulse">
                  <div className="flex flex-col items-center">
                    {/* Stem */}
                    <div className="w-1 h-12 bg-green-600 rounded-t"></div>
                    {/* Small leaves */}
                    <div className="absolute top-0 -left-2 w-5 h-3 bg-green-400 rounded-full transform -rotate-12"></div>
                    <div className="absolute top-1 -right-2 w-5 h-3 bg-green-400 rounded-full transform rotate-12"></div>
                    <div className="absolute top-3 -left-1 w-4 h-2 bg-green-500 rounded-full transform -rotate-6"></div>
                    <div className="absolute top-3 -right-1 w-4 h-2 bg-green-500 rounded-full transform rotate-6"></div>
                  </div>
                </div>
              )}

              {/* Full grown tree - appears after level 5 */}
              {gameState.treeGrown && (
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 transition-all duration-3000 ease-out">
                  <div className="flex flex-col items-center">
                    {/* Tree trunk */}
                    <div className="w-4 h-16 bg-amber-800 rounded-t-lg border border-amber-900"></div>
                    {/* Tree crown - multiple layers for fullness */}
                    <div className="absolute -top-12 w-20 h-20 bg-green-500 rounded-full opacity-90"></div>
                    <div className="absolute -top-16 w-16 h-16 bg-green-400 rounded-full opacity-95"></div>
                    <div className="absolute -top-8 -left-6 w-12 h-12 bg-green-600 rounded-full"></div>
                    <div className="absolute -top-8 -right-6 w-12 h-12 bg-green-600 rounded-full"></div>
                    <div className="absolute -top-20 w-12 h-12 bg-green-300 rounded-full opacity-90"></div>
                    
                    {/* Animated leaves falling */}
                    <div className="absolute -top-10 -left-8 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-75" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute -top-6 -right-10 w-2 h-2 bg-green-500 rounded-full animate-bounce opacity-75" style={{animationDelay: '1s'}}></div>
                    <div className="absolute -top-14 left-8 w-2 h-2 bg-green-300 rounded-full animate-bounce opacity-75" style={{animationDelay: '1.5s'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Question Card */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
              {!gameComplete ? (
                <>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      Level {currentLevel} of 5
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {currentQuestion.question}
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        } ${showResult ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:bg-green-50'}`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      </button>
                    ))}
                  </div>
                  
                  {selectedAnswer !== '' && !showResult && (
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                    >
                      Submit Answer
                    </button>
                  )}
                  
                  {showResult && (
                    <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-bold">
                          {isCorrect ? 'Correct! Great job!' : 'Incorrect! Try again.'}
                        </span>
                      </div>
                      {isCorrect && currentLevel === 2 && gameState.seedAppeared && (
                        <p className="text-sm mt-2">Perfect! Now drag the seed into the hole you created.</p>
                      )}
                      {isCorrect && currentLevel === 3 && gameState.bucketAppeared && (
                        <p className="text-sm mt-2">Excellent! Now drag the water bucket near the hole to water your seed.</p>
                      )}
                    </div>
                  )}
                  
                  {showHint && (
                    <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-2">Hint:</p>
                          <p className="text-sm mb-3">{currentQuestion.hint}</p>
                          <button
                            onClick={handleRetry}
                            className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🌳</div>
                  <h2 className="text-3xl font-bold text-green-800 mb-4">
                    Congratulations! 🎉
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    You have successfully planted your Knowledge Tree! 
                    You've learned all the essential steps of tree plantation.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg text-left mb-6">
                    <h3 className="font-bold text-green-800 mb-3">🌱 What you mastered:</h3>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        How to properly dig a hole for planting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Correct seed planting depth and placement
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Importance of watering after planting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Caring for young saplings properly
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Requirements for healthy tree growth
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                        setCurrentLevel(1);
                        setSelectedAnswer('');
                        setShowResult(false);
                        setIsCorrect(false);
                        setShowHint(false);
                        setGameComplete(false);
                        setGameState({
                            holeCreated: false,
                            seedAppeared: false,
                            seedPlanted: false,
                            bucketAppeared: false,
                            watered: false,
                            saplingGrown: false,
                            treeGrown: false
                          });
                    }}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    Plant Another Tree 🌱
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;