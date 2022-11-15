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
        <Route path="/" key="h" element={<ForumMenu />} />
        <Route path='/about' key="a" element={<AboutMenu />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
