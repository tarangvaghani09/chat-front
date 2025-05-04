//not send meesage unknown privay

import React, { useEffect, useRef, useState } from "react";
import UserDetails from "./UserDetails";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiChat } from "../actions/chatAction";
import { SiDeepgram } from "react-icons/si";
import { IoCloseOutline } from "react-icons/io5";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
  const [users, setUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [latestMessages, setLatestMessages] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadMessages, setUnreadMessages] = useState({});

  const navigate = useNavigate();
  const optionsRef = useRef(null);
  const dispatch = useDispatch();
  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

  const handleAiChatToggle = () => {
    dispatch(toggleAiChat(!isAiChatOpen));
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setLoggedInUser(data.user);
      } catch (error) {
        console.error("Error fetching logged-in user:", error.message);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/register");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const storedUserOrder = JSON.parse(localStorage.getItem("userOrder"));
        if (storedUserOrder) {
          const sortedUsers = storedUserOrder
            .map((phone) => data.users.find((user) => user.phone === phone))
            .filter(Boolean);
          setUsers(sortedUsers);
        } else {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchLatestMessages = async () => {
      const storedUsername = localStorage.getItem("username");
      const latestMessages = {};
      for (const user of users) {
        try {
          const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();
          latestMessages[user.phone] = data.message;
        } catch (error) {
          console.error("Error fetching latest message:", error.message);
        }
      }
      setLatestMessages(latestMessages);
    };
    if (users.length > 0) fetchLatestMessages();
  }, [users]);

  const handleNewMessage = (chat) => {
    const { sender, receiver, message } = chat;
    const currentUser = localStorage.getItem("username");
    const involvedUser = sender === currentUser ? receiver : sender;
    setLatestMessages((prevMessages) => ({
      ...prevMessages,
      [involvedUser]: message,
    }));
    if (receiver === currentUser && activeIndex !== sender) {
      const audio = new Audio("/peep.mp3");
      audio.play().catch(err => console.error("Audio playback error:", err));
      setUnreadMessages((prev) => {
        const updatedUnreadMessages = {
          ...prev,
          [sender]: (prev[sender] || 0) + 1,
        };
        localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
        return updatedUnreadMessages;
      });
    }
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
      const userToMove = prevUsers.find((user) => user.phone === involvedUser);
      if (userToMove) {
        const newUserOrder = [userToMove, ...updatedUsers];
        localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
        return newUserOrder;
      }
      return prevUsers;
    });
  };

  useEffect(() => {
    socket.on("receiveMessage", (chat) => {
      handleNewMessage(chat);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [activeIndex, unreadMessages]);

  useEffect(() => {
    const storedUnreadMessages = JSON.parse(localStorage.getItem("unreadMessages"));
    if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
  }, []);

  const handleClick = (user, index) => {
    setActiveIndex(user.phone);
    setUnreadMessages((prev) => {
      const updatedUnreadMessages = { ...prev };
      delete updatedUnreadMessages[user.phone];
      localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
      return updatedUnreadMessages;
    });
    localStorage.setItem("unreadMessages", JSON.stringify({ ...unreadMessages, [user.phone]: false }));
    onSelectUser(user);
  };

  const handleImageClick = (e, imageUrl) => {
    e.stopPropagation();
    setOverlayImage(imageUrl);
  };

  const closeOverlay = () => {
    setOverlayImage(null);
  };

  const closeOverlayProfile = () => {
    setSelectedUser(null);
  };

  const handleProfileImageClick = () => {
    setSelectedUser(loggedInUser);
    setShowUserList(!showUserList);
  };

  const truncateUsername = (username) => {
    return username.length > 23 ? `${username.slice(0, 23)}...` : username;
  };

  const truncateLatestMessage = (message) => {
    if (!message) return "";
    return message.length > 20 ? `${message.slice(0, 17)}...` : message;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogOut = () => {
    setShowOptions(!showOptions);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* {loggedInUser && (
        <div className="bg-gray-100 flex items-center justify-between h-16 w-full sm:w-[19%] fixed top-0 left-0 z-20 px-3 sm:px-5 transition-all duration-300">
          <img
            onClick={handleProfileImageClick}
            src={`http://localhost:5000/${loggedInUser.profilePicture}`}
            alt="Profile"
            className="h-10 w-10 ml-2 mr-5 rounded-full"
          />
          <div>
            <button onClick={handleAiChatToggle} className="p-2 bg-blue-500 text-white rounded">
              {isAiChatOpen ? <IoCloseOutline /> : <SiDeepgram />}
            </button>
          </div>
          <div id="logout" onClick={handleLogOut} className="cursor-pointer">
            <BsThreeDotsVertical />
          </div>  
          {showOptions && (
            <div ref={optionsRef} className="absolute top-16 left-1/2 -translate-x-1/2 bg-white p-2.5 rounded shadow z-10">
              <ul>
                <li>
                  <div onClick={logOut}>Log Out</div>
                </li>
              </ul>
            </div>
          )}
        </div>
      )} */}
      {/* Outer container conditionally hides the list on mobile if hideUserList prop is true */}
      <div className={`mt-20 sm:mt-24 w-full sm:w-full sm:static fixed top-16 left-0 flex flex-col p-5 border-r border-gray-200 bg-white shadow-lg overflow-y-auto h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"}`}>
        {/* Header container is modified here to use 25% of screen width */}
        <div className="flex flex-col justify-center fixed w-full sm:w-[17%] z-10 bg-white -mt-26 px-8">
          <h2 className="pt-2 -ml-4.5 text-xl text-black">Chat</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-5 mt-3 h-10 -ml-5.5 p-2.5 w-full border border-gray-400 rounded outline-none transition-colors focus:border-blue-600 max-[788px]:h-9"
          />
        </div>
        <ul className="mt-6 space-y-4">
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              className={`${activeIndex === user.phone ? "bg-blue-100" : "bg-white"} flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-shadow shadow-sm`}
              onClick={() => handleClick(user, index)}
            >
              <img
                src={`http://localhost:5000/${user.profilePicture}`}
                alt="Profile"
                className="h-10 w-10 mr-5 rounded-full object-cover border border-gray-200"
                onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
              />
              <div className="flex flex-col flex-grow">
                <p className="font-bold text-gray-800">
                  {loggedInUser && loggedInUser.phone === user.phone ? "You" : truncateUsername(user.username)}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{truncateLatestMessage(latestMessages[user.phone])}</p>
                  {unreadMessages[user.phone] > 0 && (
                    <p className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadMessages[user.phone]}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {overlayImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer" onClick={closeOverlay}>
            <img src={overlayImage} alt="Full View" className="max-w-[90%] max-h-[90%] object-contain" />
          </div>
        )}
      </div>
      <div className="user-details-right">
        <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
      </div>
    </>
  );
};

export default UserList;
