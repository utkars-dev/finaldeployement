import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/quiz";
import Games from "./components/games";
import Dash from "./components/dashboard";
import Login from "./components/login";
import Aboutus from "./components/About-us"
import Game1 from "./components/game1";
import Game2 from "./components/game2";
import Game3 from "./components/game3";
import Game4 from "./components/game4";
import Game6 from "./components/game6";
import Game5 from "./components/game5";



function App() {
  return (
    <div>
      {/* <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/waste" element={<Games/>}/>
        <Route path="/dashboard" element={<Dash/>}/>
        <Route path="/Aboutus" element={<Aboutus/>}/>
        <Route path="/game1" element={<Game1/>}/>
        <Route path="/game2" element={<Game2/>}/>
        <Route path="/game3" element={<Game3/>}/>
        <Route path="/game4" element={<Game4/>}/>
        <Route path="/game5" element={<Game5/>}/>
        <Route path="/game6" element={<Game6/>}/>
      </Routes>
    </div>
  );
}

export default App;
