import './App.css';
import ForumMenu from './views/ForumMenuFrame';
import AboutMenu from './views/AboutMenuFrame';
import ProfileMenu from './views/ProfileMenuFrame';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import CreatePost from './views/CreatePostFrame';


function App()
{
  return (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" key="h" element={<ForumMenu />} />
        <Route path='/about' key="a" element={<AboutMenu />} />
        <Route path='/profile' key="p" element={<ProfileMenu />} />
        <Route path='/new-post-create' key="n" element={<CreatePost />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
