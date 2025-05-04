import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiChat, toggleAnonymousChat, toggleTrendChat, toggleAddContactChat } from "../actions/chatAction";
import { BsThreeDotsVertical, BsChatText } from "react-icons/bs";
import { SiDeepgram } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import { PiChatCircleSlashFill } from "react-icons/pi";
import { TfiStatsUp } from "react-icons/tfi";
import { LuContact } from "react-icons/lu";

const Sidebar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
  const isAnonymousChatOpen = useSelector((state) => state.chat.isAnonymousChatOpen);
  const isTrendChatOpen = useSelector((state) => state.chat.isTrendChatOpen);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const logoutButtonRef = useRef(null);
  // activeMenu state: "chat" or "ai", default is "chat"
  const [activeMenu, setActiveMenu] = useState("chat");

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const response = await fetch(
          `http://localhost:5000/api/registerUser?username=${storedUsername}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setLoggedInUser(data.user);
      } catch (error) {
        console.error("Error fetching logged-in user:", error.message);
      }
    };
    fetchLoggedInUser();
  }, []);

  // When AI button is clicked: open AI chat and set active menu to "ai"
  const handleAiButtonClick = () => {
    dispatch(toggleAiChat(true));
    dispatch(toggleAnonymousChat(false));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("ai");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleChatButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleAiChat(false));
    dispatch(toggleAnonymousChat(false));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("chat");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleAnonymousButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleAnonymousChat(true));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAiChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("anonymous");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleTrendButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleTrendChat(true));
    dispatch(toggleAiChat(false));
    dispatch(toggleAnonymousChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("trend");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleAddContactButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleAddContactChat(true));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAiChat(false));
    dispatch(toggleAnonymousChat(false));
    setActiveMenu("addcontact");
  };

  const handleProfileImageClick = () => {
    setSelectedUser(loggedInUser);
    setShowUserList(!showUserList);
  };

  const toggleDropdown = () => {
    // Toggle the dropdown and compute its absolute position relative to the three dots button
    setShowOptions((prev) => {
      if (!prev && logoutButtonRef.current) {
        const rect = logoutButtonRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "absolute",
          top: rect.top,
          left: rect.right + 10, // 10px gap from the three dots button
        });
      }
      return !prev;
    });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setShowOptions(false);
    navigate("/");
  };

  const handleClickOutside = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  const closeOverlayProfile = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col bg-green-50 p-4 items-center">
        {/* Chat button - active when activeMenu is "chat" */}
        <div className="flex justify-start mb-8">
          {loggedInUser && (
            <button
              onClick={handleChatButtonClick}
              className={`p-2 rounded cursor-pointer hover:bg-green-500 ${activeMenu === "chat" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
            >
              <BsChatText size={20} />
            </button>
          )}
        </div>
        {/* AI button - active when activeMenu is "ai" */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleAiButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "ai" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
            >
              {<SiDeepgram size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}
        </div>
        {/* when activeMenu is "anonymous" */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleAnonymousButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "anonymous" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
            >
              {<PiChatCircleSlashFill size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}

        </div>
        {/*when activeMenu is "trend" */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleTrendButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "trend" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
            >
              {<TfiStatsUp size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}

        </div>

        {/*when add  is contact */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleAddContactButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "addcontact" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
            >
              {<LuContact size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}

        </div>
        {/* User profile and logout section */}
        <div className="flex flex-col items-center justify-center mt-auto gap-5">
          {loggedInUser && (
            <>
              <div className="relative" ref={logoutButtonRef}>
                <div
                  id="logout"
                  onClick={toggleDropdown}
                  className="cursor-pointer mb-2"
                >
                  <FiSettings size={27} />
                  {/* <BsThreeDotsVertical size={20} /> */}
                </div>
              </div>
              <img
                onClick={handleProfileImageClick}
                src={`http://localhost:5000/${loggedInUser.profilePicture}`}
                alt="Profile"
                className="h-10 w-10 rounded-full mb-2 cursor-pointer object-cover"
              />
            </>
          )}
        </div>
      </div>
      {showOptions &&
        ReactDOM.createPortal(
          <div
            ref={optionsRef}
            style={dropdownStyle}
            className="bg-white p-3 rounded shadow z-[9999] cursor-pointer"
          >
            <ul>
              <li>
                <div onClick={logOut}>Log Out</div>
              </li>
            </ul>
          </div>,
          document.body
        )}
      <UserDetails
        user={selectedUser}
        closeOverlayProfile={closeOverlayProfile}
      />
    </>
  );
};

export default Sidebar;






