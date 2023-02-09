import './App.css';
import ForumMenu from './views/ForumMenuFrame';
import AboutMenu from './views/AboutMenuFrame';
import ProfileMenu from './views/ProfileMenuFrame';
import CreatePost from './views/CreatePostFrame';
import Newspaper from './views/newspaperFrame';
import {SocketContext, socket} from './views/components/socket';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

function App()
{
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path='' key="b" element={<Newspaper socket={socket} />} />
            <Route path="/forum" key="h" element={<ForumMenu socket={socket} />} />
            <Route path='/about' key="a" element={<AboutMenu socket={socket} />} />
            <Route path='/profile' key="p" element={<ProfileMenu />} />
            <Route path='/new-post-create' key="n" element={<CreatePost />} />
          </Routes>
        </div>
    </Router>
  </SocketContext.Provider>
  );
}

export default App;
