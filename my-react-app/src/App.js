import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import { JourneyPage } from './pages/JourneyPage/JourneyPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
