import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import RegistrationPage from './pages/ResgistrationPage';
import GameDetailsPage from './pages/GameDetailsPage';
import LoginPage from './pages/LoginPage';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import Test from './testing/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/registration" element={<RegistrationPage/>} />
            <Route path="/game-details/:gameid" element={<GameDetailsPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/form" element={<FormPage/>} />
			<Route path="/test" element={<Test/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
