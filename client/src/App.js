import './App.css';
import ForumMenu from './views/ForumMenuFrame';
import AboutMenu from './views/AboutMenuFrame';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

function App()
{
  return (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/home" element={<ForumMenu />} />
        <Route path='/about' element={<AboutMenu />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
