import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import GamePage from "./pages/game/GamePage";
import FinishedGamePage from "./pages/finished-game/FinishedGamePage";
import Auth from "./pages/auth/Auth";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/this-or-that" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/game-end" element={<FinishedGamePage />} />
              <Route path="/auth" element={<Auth />} />
          </Routes>
      </Router>
  );
}

export default App;
