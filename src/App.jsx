import HomePage from "./pages/home/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from "./pages/game/GamePage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/this-or-that" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
  );
}

export default App;
