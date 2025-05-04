import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ChatApp from "./components/ChatApp";
import PromptAndResponseApp from "./components/PromptAndResponseApp";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
// import "./App.css";

function App() {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />

          {/* Protected Chat Route */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute
                element={
                  <ChatApp
                    isAiChatOpen={isAiChatOpen}
                    setIsAiChatOpen={setIsAiChatOpen}
                    setSelectedUser={setSelectedUser}
                  />
                }
              />
            }
          />

          {/* AI Chat Page */}
          <Route
            path="/ask"
            element={<PromptAndResponseApp user={selectedUser} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
