import io from 'socket.io-client';
import React from 'react';

export const socket = io.connect('http://192.168.1.3:3001')
export const SocketContext = React.createContext()
