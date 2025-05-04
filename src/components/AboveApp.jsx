import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import ChatApp from './components/ChatApp';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import PromptAndResponseApp from './components/PromptAndResponseApp';

function AboveApp() {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          {/* Pass AI chat toggle state to ChatApp */}
          <Route 
            path="/chat" 
            element={<ChatApp isAiChatOpen={isAiChatOpen} setIsAiChatOpen={setIsAiChatOpen} setSelectedUser={setSelectedUser} />} 
          />
          {/* AI Chat Page - Can be used if opened separately */}
          <Route 
            path="/ask" 
            element={<PromptAndResponseApp user={selectedUser} />} 
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default AboveApp;


