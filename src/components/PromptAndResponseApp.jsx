import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiChat } from "../actions/chatAction";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactLoading from 'react-loading';
import { FaArrowRight } from "react-icons/fa";
import { BsPauseCircleFill } from "react-icons/bs";
import '../prompt.css';

const PromptAndResponseApp = () => {
  const dispatch = useDispatch();
  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = "AIzaSyDvQvhLu15nMUCqwAcbv4DoDI6YxmxVMM4";  // Replace with your actual API key
  const MODEL_NAME = "gemini-1.5-pro";  // Use a valid model name 

  const storedUsername = localStorage.getItem("name");

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { role: "user", text: inputText };
    setConversation([...conversation, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userMessage.text }] }]
      });

      let aiResponse = result.response.text();

      setConversation([...conversation, userMessage, { role: "model", text: aiResponse }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`ai-chat-container ${isAiChatOpen ? "open" : "closed"} mt-5 p-4 h-[80%] w-[80%] mx-auto bg-green-100 relative max-[500px]:h-[70%]`}>
      <h2 className="ai-heading text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-purple-800 capitalize max-[500px]:text-md">
        {/* max-[500px]:mb-1 */}
        Welcome {storedUsername}
      </h2>

      <div className="chat-box bg-gray-50 p-4 rounded shadow-inner overflow-y-auto h-[90%] pb-24">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={` max-[500px]:text-sm message ${msg.role} flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div className={` max-w-[75%] p-3 rounded-lg ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
              <strong>{msg.role === "user" ? "You:" : "Gemini:"}</strong>
              {Array.isArray(msg.text) ? (
                <ul className="mt-2">
                  {msg.text.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {/* Loading Spinner for Gemini's Response */}
        {isLoading && (
          <div className="message model loading flex justify-start mb-4">
            <div className="max-w-[75%] p-3 rounded-lg bg-gray-100 text-left flex items-center">
              <strong className="mr-2">DeepChat:</strong>
              <ReactLoading type="spin" color="black" height={30} width={30} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-prompt-input flex justify-center bottom-10 left-20 right-0 mx-auto w-[100%] p-4 mt-5 bg-white border-t border-gray-200 shadow-lg border rounded-xl max-[500px]:bottom-3 max-[500px]:p-2">
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out max-[500px]:p-1.5"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out max-[500px]:p-1.5"
        >
          {isLoading ? <BsPauseCircleFill /> : <FaArrowRight />}
        </button>
      </form>


    </div>
  );

};

export default PromptAndResponseApp;
