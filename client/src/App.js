import './App.css';
import ForumMenu from './views/ForumMenuFrame';
import AboutMenu from './views/AboutMenuFrame';
import ProfileMenu from './views/ProfileMenuFrame';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import CreatePost from './views/CreatePostFrame';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.1.6:3001');

socket.on('update_comments', (data) => {
  const {commentId} = data
  console.log(`another point of enter in ${commentId}`)
})

function App()
{
  return (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" key="h" element={<ForumMenu socket={socket}  />} />
        <Route path='/about' key="a" element={<AboutMenu socket={socket}/>} />
        <Route path='/profile' key="p" element={<ProfileMenu />} />
        <Route path='/new-post-create' key="n" element={<CreatePost />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
