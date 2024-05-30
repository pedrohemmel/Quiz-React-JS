import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import DashBoard from './components/DashBoard'
import Game from './components/Game'
import Introduction from './components/Introduction';

function App() {
  return (
    <Router>
      <div>
        <header>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/dashBoard" element={<DashBoard />}/>
            <Route path="/game" element={<Game />}/>
            <Route path="/introduction" element={<Introduction />}/>
          </Routes>
        </header>
      </div>
    </Router>
    
  );
}

export default App;
