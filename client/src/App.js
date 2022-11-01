import './App.css';
import MainMenuElements from './views/MainMenuFrame';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
//love you so much

function App()
{
  return (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" component={<MainMenu />} />
      </Routes>
    </div>
  </Router>
  );
}

class MainMenu extends React.Component
{
  render(){
    const elem = MainMenuElements();
    return elem;
  }
}

export default App;
