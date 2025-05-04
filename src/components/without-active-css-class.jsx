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

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // State to keep track of the active list item
  const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
  const [latestMessages, setLatestMessages] = useState({}); // State for latest messages
  const [loggedInUser, setLoggedInUser] = useState(null); // State for logged-in user
  const [showUserList, setShowUserList] = useState(false); // State for showing user 
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const optionsRef = useRef(null);

  const dispatch = useDispatch();

  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

  const handleAiChatToggle = () => {
    dispatch(toggleAiChat(!isAiChatOpen));
  };

  // const handleDeepAiClick = () => {
  //   const currentUser = localStorage.getItem("username");
  //   if (currentUser) {
  //     dispatch(toggleAiChat(true));
  //   } else {
  //     alert("Please log in first!");
  //   }
  // };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLoggedInUser(data.user); // Assuming the response has a field 'user' containing the user object
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

        // Check if user order exists in localStorage
        const storedUserOrder = JSON.parse(localStorage.getItem("userOrder"));
        if (storedUserOrder) {
          const sortedUsers = storedUserOrder
            .map((phone) => data.users.find((user) => user.phone === phone))
            .filter(Boolean); // Remove undefined users
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

    if (users.length > 0) {
      fetchLatestMessages();
    }
  }, [users]);

  // Function to handle new messages and update user order
  const handleNewMessage = (chat) => {
    const { sender, receiver } = chat;
    const currentUser = localStorage.getItem("username");

    // Determine the user involved in the chat
    const involvedUser = sender === currentUser ? receiver : sender;

    // Update latest messages
    setLatestMessages((prevMessages) => ({
      ...prevMessages,
      [involvedUser]: chat.message,
    }));

    // Move involved user to top and store in localStorage
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter(user => user.phone !== involvedUser);
      const userToMove = prevUsers.find(user => user.phone === involvedUser);

      if (userToMove) {
        const newUserOrder = [userToMove, ...updatedUsers];
        localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map(user => user.phone)));
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
  }, []);

  const handleClick = (user, index) => {
    setActiveIndex(index); // Update active index
    onSelectUser(user); // Call onSelectUser callback
  };

  const handleImageClick = (e, imageUrl) => {
    e.stopPropagation(); // Prevent click event from propagating to the parent
    setOverlayImage(imageUrl); // Show the overlay image
  };

  const closeOverlay = () => {
    setOverlayImage(null); // Close the overlay
  };

  const closeOverlayProfile = () => {
    setSelectedUser(null); // Close the overlay
  };

  const handleProfileImageClick = () => {
    setSelectedUser(loggedInUser); // Set the selected user to the logged-in user
    setShowUserList(!showUserList); // Toggle the user list visibility
  };

  const truncateUsername = (username) => {
    return username.length > 23 ? `${username.slice(0, 23)}...` : username;
  };

  const truncateLatestMessage = (message) => {
    if (!message) return ""; // Return an empty string if the message is undefined
    return message.length > 20 ? `${message.slice(0, 20)}...` : message;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username && user.username?.toLowerCase().includes(searchQuery.toLowerCase())
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
      {loggedInUser && (
        <div className="logged-in-user">
          <img
            onClick={handleProfileImageClick}
            src={`http://localhost:5000/${loggedInUser.profilePicture}`}
            alt="Profile"
            style={{ height: "40px", width: "40px", marginLeft: "10px", marginRight: "20px", borderRadius: "50%" }}
          />
          {/* <div onClick={()=>navigate("/ask")}>DeepAi</div> */}
          <div>
            <button onClick={handleAiChatToggle} className="ai-chat-btn">
              {/* {isAiChatOpen ? "Close AI Chat" : "Open AI Chat"} */}
              {/* {isAiChatOpen ? "Close DeepChat AI" : "DeepChat AI"} */}
              {isAiChatOpen ? <IoCloseOutline /> : <SiDeepgram />}
            </button>
          </div>
          <div className="logout" id="logout" onClick={handleLogOut}><BsThreeDotsVertical /></div>
          {showOptions && (
            <div className="logout-options" ref={optionsRef}>
              <ul>
                <li>
                  <div onClick={logOut}>Log Out</div>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="user-list">
        <div className="user-search-header">
          <h2>Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="user-search-input"
          />
        </div>
        <ul style={{ marginTop: '48%' }}>
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => handleClick(user, index)}
            >
              <img
                src={`http://localhost:5000/${user.profilePicture}`}
                alt="Profile"
                style={{
                  height: "40px", width: "40px", marginRight: "20px", borderRadius: "50%",
                  objectFit: "cover",
                }}
                onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
              />
              <div className="user-info">
                <p style={{
                  height: "8px", fontWeight: "bold",
                  // overflowWrap:"anywhere",
                }}>
                  {loggedInUser && loggedInUser.phone === user.phone ? "You" : truncateUsername(user.username)}
                </p>
                <p style={{ height: "8px" }} className="latest-message">{truncateLatestMessage(latestMessages[user.phone])}</p>
              </div>
            </li>
          ))}
        </ul>
        {overlayImage && (
          <div className="overlay" onClick={closeOverlay}>
            <img src={overlayImage} alt="Full View" className="overlay-image" />
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