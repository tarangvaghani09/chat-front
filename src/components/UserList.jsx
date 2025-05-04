// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { SiDeepgram } from "react-icons/si";
// import { IoCloseOutline } from "react-icons/io5";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   const [users, setUsers] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [latestMessages, setLatestMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showUserList, setShowUserList] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [unreadMessages, setUnreadMessages] = useState({});

//   const navigate = useNavigate();
//   const optionsRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   const handleAiChatToggle = () => {
//     dispatch(toggleAiChat(!isAiChatOpen));
//   };

//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // useEffect(() => {
//   //   const fetchUsers = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:5000/api/register");
//   //       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//   //       const data = await response.json();

//   //       //this is not show new register user


//   //       // const storedUserOrder = JSON.parse(localStorage.getItem("userOrder"));
//   //       // if (storedUserOrder) {
//   //       //   const sortedUsers = storedUserOrder
//   //       //     .map((phone) => data.users.find((user) => user.phone === phone))
//   //       //     .filter(Boolean);
//   //       //   setUsers(sortedUsers);
//   //       // } else {
//   //       //   setUsers(data.users);
//   //       // }

//   //       const storedUserOrder = JSON.parse(localStorage.getItem("userOrder"));
//   //       if (storedUserOrder) {
//   //         let sortedUsers = storedUserOrder
//   //           .map((phone) => data.users.find((user) => user.phone === phone))
//   //           .filter(Boolean);
//   //         // Find users that are not in the stored order
//   //         const sortedPhones = sortedUsers.map(user => user.phone);
//   //         const newUsers = data.users.filter(user => !sortedPhones.includes(user.phone));
//   //         // Append new users at the end
//   //         sortedUsers = [...sortedUsers, ...newUsers];
//   //         setUsers(sortedUsers);
//   //       } else {
//   //         setUsers(data.users);
//   //       }

//   //     } catch (error) {
//   //       console.error("Error fetching users:", error.message);
//   //     }
//   //   };
//   //   fetchUsers();
//   // }, []);

//   // Update inside UserList.jsx
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!loggedInUser) return; // Make sure logged in user details are available
//       try {
//         // Get the contacts list for the logged in user
//         const contactResponse = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//         let contactsArray = [];
//         if (contactResponse.ok) {
//           const contactData = await contactResponse.json();
//           // console.log("contactData", contactData)
//           contactsArray = contactData.contacts;
//           // console.log("contactsArray", contactsArray)
//         }
//         // Fetch all registered users
//         const response = await fetch("http://localhost:5000/api/register");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         // console.log("data", data)
//         // Extract just the phone numbers from the contact objects
//         const phoneList = contactsArray.map(contactObj => contactObj.contactPhone);
//         // Filter users whose phone numbers exist in the contacts array
//         const filteredUsers = data.users.filter(user => phoneList.includes(user.phone));
//         // console.log("filteredUsers", filteredUsers)
//         setUsers(filteredUsers);
//         // console.log(filteredUsers)
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };
//     fetchUsers();
//   }, [loggedInUser]); // Ensure that fetchUsers is run after loggedInUser is set

//   useEffect(() => {
//     const fetchLatestMessages = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const latestMessages = {};
//       for (const user of users) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
//           if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//           const data = await response.json();
//           latestMessages[user.phone] = data.message;
//         } catch (error) {
//           console.error("Error fetching latest message:", error.message);
//         }
//       }
//       setLatestMessages(latestMessages);
//     };
//     if (users.length > 0) fetchLatestMessages();
//   }, [users]);

//   const handleNewMessage = (chat) => {
//     const { sender, receiver, message } = chat;
//     const currentUser = localStorage.getItem("username");
//     const involvedUser = sender === currentUser ? receiver : sender;
//     setLatestMessages((prevMessages) => ({
//       ...prevMessages,
//       [involvedUser]: message,
//     }));
//     if (receiver === currentUser && activeIndex !== sender) {
//       const audio = new Audio("/peep.mp3");
//       audio.play().catch(err => console.error("Audio playback error:", err));
//       setUnreadMessages((prev) => {
//         const updatedUnreadMessages = {
//           ...prev,
//           [sender]: (prev[sender] || 0) + 1,
//         };
//         localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//         return updatedUnreadMessages;
//       });
//     }
//     setUsers((prevUsers) => {
//       const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
//       const userToMove = prevUsers.find((user) => user.phone === involvedUser);
//       if (userToMove) {
//         const newUserOrder = [userToMove, ...updatedUsers];
//         localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
//         return newUserOrder;
//       }
//       return prevUsers;
//     });
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (chat) => {
//       handleNewMessage(chat);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [activeIndex, unreadMessages]);

//   useEffect(() => {
//     const storedUnreadMessages = JSON.parse(localStorage.getItem("unreadMessages"));
//     if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
//   }, []);

//   const handleClick = (user, index) => {
//     setActiveIndex(user.phone);
//     setUnreadMessages((prev) => {
//       const updatedUnreadMessages = { ...prev };
//       delete updatedUnreadMessages[user.phone];
//       localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//       return updatedUnreadMessages;
//     });
//     localStorage.setItem("unreadMessages", JSON.stringify({ ...unreadMessages, [user.phone]: false }));
//     onSelectUser(user);
//   };

//   const handleImageClick = (e, imageUrl) => {
//     e.stopPropagation();
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const closeOverlayProfile = () => {
//     setSelectedUser(null);
//   };

//   const handleProfileImageClick = () => {
//     setSelectedUser(loggedInUser);
//     setShowUserList(!showUserList);
//   };

//   const truncateUsername = (username) => {
//     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
//   };

//   const truncateLatestMessage = (message) => {
//     if (!message) return "";
//     return message.length > 20 ? `${message.slice(0, 15)}...` : message;
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredUsers = users.filter(user =>
//     user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogOut = () => {
//     setShowOptions(!showOptions);
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setShowOptions(false);
//     navigate("/");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       {/* Outer container now hides horizontal overflow to avoid double scrollbars */}
//       {/* <div className={`mt-20 sm:mt-0 w-full fixed sm:w-full sm:static top-16 left-0 flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"}`}> */}

//       <div className={`mt-0 sm:mt-0 w-full relative sm:w-full sm:static flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"}`}>
//         {/* Header container changed to sticky with balanced spacing */}
//         <div className="flex flex-col sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <ul className="mt-4">
//           {filteredUsers.map((user, index) => (
//             <li
//               key={index}
//               className={`mb-2 px-3 py-4 rounded-lg cursor-pointer flex items-center hover:bg-blue-50 transition-colors ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"}`}
//               onClick={() => handleClick(user, index)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture}`}
//                 alt="Profile"
//                 className="h-10 w-10 mr-4 rounded-full object-cover"
//                 onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
//               />
//               <div className="user-info flex-1">
//                 <p className="font-bold text-gray-800">
//                   {loggedInUser && loggedInUser.phone === user.phone ? "You" : truncateUsername(user.username)}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-600 truncate">
//                     {truncateLatestMessage(latestMessages[user.phone])}
//                   </p>
//                   {unreadMessages[user.phone] > 0 && (
//                     <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {unreadMessages[user.phone]}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {overlayImage && (
//           <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer" onClick={closeOverlay}>
//             <img src={overlayImage} alt="Full View" className="max-w-[90%] max-h-[90%] object-contain" />
//           </div>
//         )}
//       </div>
//       <div className="user-details-right">
//         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
//       </div>
//     </>
//   );
// };

// export default UserList;





//not save contact then not show messge



// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { SiDeepgram } from "react-icons/si";
// import { IoCloseOutline } from "react-icons/io5";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   const [users, setUsers] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [latestMessages, setLatestMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showUserList, setShowUserList] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [unreadMessages, setUnreadMessages] = useState({});

//   const navigate = useNavigate();
//   const optionsRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   const handleAiChatToggle = () => {
//     dispatch(toggleAiChat(!isAiChatOpen));
//   };

//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Modified effect: Fetch contacts to build a mapping,
//   // then fetch registered users and attach the stored contactUsername from the contacts list.
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!loggedInUser) return; // Make sure logged in user details are available
//       try {
//         // Get the contacts list for the logged in user
//         const contactResponse = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//         let contactsArray = [];
//         if (contactResponse.ok) {
//           const contactData = await contactResponse.json();
//           contactsArray = contactData.contacts;
//         }
//         // Build a mapping: phone -> contactUsername
//         const contactMap = {};
//         contactsArray.forEach((contactObj) => {
//           contactMap[contactObj.contactPhone] = contactObj.contactUsername;
//         });
//         // Extract phone numbers from contacts array
//         const phoneList = contactsArray.map(contactObj => contactObj.contactPhone);

//         // Fetch all registered users
//         const response = await fetch("http://localhost:5000/api/register");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();

//         // Filter users whose phone numbers exist in the contacts array
//         const filteredUsers = data.users.filter(user => phoneList.includes(user.phone));

//         // Merge the contact username from contactMap (if exists) with user data.
//         const usersWithContactNames = filteredUsers.map(user => ({
//           ...user,
//           contactUsername: contactMap[user.phone] || user.username
//         }));

//         setUsers(usersWithContactNames);
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };
//     fetchUsers();
//   }, [loggedInUser]);

//   useEffect(() => {
//     const fetchLatestMessages = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const latestMessages = {};
//       for (const user of users) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
//           if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//           const data = await response.json();
//           latestMessages[user.phone] = data.message;
//         } catch (error) {
//           console.error("Error fetching latest message:", error.message);
//         }
//       }
//       setLatestMessages(latestMessages);
//     };
//     if (users.length > 0) fetchLatestMessages();
//   }, [users]);

//   const handleNewMessage = (chat) => {
//     const { sender, receiver, message } = chat;
//     const currentUser = localStorage.getItem("username");
//     const involvedUser = sender === currentUser ? receiver : sender;
//     setLatestMessages((prevMessages) => ({
//       ...prevMessages,
//       [involvedUser]: message,
//     }));
//     if (receiver === currentUser && activeIndex !== sender) {
//       const audio = new Audio("/peep.mp3");
//       audio.play().catch(err => console.error("Audio playback error:", err));
//       setUnreadMessages((prev) => {
//         const updatedUnreadMessages = {
//           ...prev,
//           [sender]: (prev[sender] || 0) + 1,
//         };
//         localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//         return updatedUnreadMessages;
//       });
//     }
//     setUsers((prevUsers) => {
//       const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
//       const userToMove = prevUsers.find((user) => user.phone === involvedUser);
//       if (userToMove) {
//         const newUserOrder = [userToMove, ...updatedUsers];
//         localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
//         return newUserOrder;
//       }
//       return prevUsers;
//     });
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (chat) => {
//       handleNewMessage(chat);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [activeIndex, unreadMessages]);

//   useEffect(() => {
//     const storedUnreadMessages = JSON.parse(localStorage.getItem("unreadMessages"));
//     if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
//   }, []);

//   const handleClick = (user, index) => {
//     setActiveIndex(user.phone);
//     setUnreadMessages((prev) => {
//       const updatedUnreadMessages = { ...prev };
//       delete updatedUnreadMessages[user.phone];
//       localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//       return updatedUnreadMessages;
//     });
//     localStorage.setItem("unreadMessages", JSON.stringify({ ...unreadMessages, [user.phone]: false }));
//     onSelectUser(user);
//   };

//   const handleImageClick = (e, imageUrl) => {
//     e.stopPropagation();
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const closeOverlayProfile = () => {
//     setSelectedUser(null);
//   };

//   const handleProfileImageClick = () => {
//     setSelectedUser(loggedInUser);
//     setShowUserList(!showUserList);
//   };

//   const truncateUsername = (username) => {
//     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
//   };

//   const truncateLatestMessage = (message) => {
//     if (!message) return "";
//     return message.length > 20 ? `${message.slice(0, 15)}...` : message;
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredUsers = users.filter(user =>
//     user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogOut = () => {
//     setShowOptions(!showOptions);
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setShowOptions(false);
//     navigate("/");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div className={`mt-0 sm:mt-0 w-full relative sm:w-full sm:static flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"}`}>
//         <div className="flex flex-col sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <ul className="mt-4">
//           {filteredUsers.map((user, index) => (
//             <li
//               key={index}
//               className={`mb-2 px-3 py-4 rounded-lg cursor-pointer flex items-center hover:bg-blue-50 transition-colors ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"}`}
//               onClick={() => handleClick(user, index)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture}`}
//                 alt="Profile"
//                 className="h-10 w-10 mr-4 rounded-full object-cover"
//                 onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
//               />
//               <div className="user-info flex-1">
//                 <p className="font-bold text-gray-800 capitalize">
//                   {loggedInUser && loggedInUser.phone === user.phone
//                     ? "You"
//                     : truncateUsername(user.contactUsername ? user.contactUsername : user.username)}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-600 truncate">
//                     {truncateLatestMessage(latestMessages[user.phone])}
//                   </p>
//                   {unreadMessages[user.phone] > 0 && (
//                     <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {unreadMessages[user.phone]}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         {/* {overlayImage && (
//           <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer" onClick={closeOverlay}>
//             <img src={overlayImage} alt="Full View" className="max-w-[90%] max-h-[90%] object-contain" />
//           </div>
//         )} */}

//         {overlayImage && (
//           <>
//             <div
//               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <img
//                 src={overlayImage}
//                 alt="Full View"
//                 className="max-w-[90%] max-h-[90%] object-contain"
//               />
//             </div>
//             <div
//               className="fixed top-8 right-10 text-white z-60 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <AiOutlineClose size={30} />
//             </div>
//           </>
//         )}

//       </div>
//       <div className="user-details-right">
//         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
//       </div>
//     </>
//   );
// };

// export default UserList;


//not preserv unknown number meg


// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { SiDeepgram } from "react-icons/si";
// import { IoCloseOutline } from "react-icons/io5";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   const [users, setUsers] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [latestMessages, setLatestMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showUserList, setShowUserList] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [unreadMessages, setUnreadMessages] = useState({});

//   const navigate = useNavigate();
//   const optionsRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   const handleAiChatToggle = () => {
//     dispatch(toggleAiChat(!isAiChatOpen));
//   };

//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Modified effect: Fetch contacts to build a mapping,
//   // then fetch registered users and attach the stored contactUsername from the contacts list.
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!loggedInUser) return; // Make sure logged in user details are available
//       try {
//         // Get the contacts list for the logged in user
//         const contactResponse = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//         let contactsArray = [];
//         if (contactResponse.ok) {
//           const contactData = await contactResponse.json();
//           contactsArray = contactData.contacts;
//         }
//         // Build a mapping: phone -> contactUsername
//         const contactMap = {};
//         contactsArray.forEach((contactObj) => {
//           contactMap[contactObj.contactPhone] = contactObj.contactUsername;
//         });
//         // Extract phone numbers from contacts array
//         const phoneList = contactsArray.map(contactObj => contactObj.contactPhone);

//         // Fetch all registered users
//         const response = await fetch("http://localhost:5000/api/register");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();

//         // Filter users whose phone numbers exist in the contacts array
//         const filteredUsers = data.users.filter(user => phoneList.includes(user.phone));

//         // Merge the contact username from contactMap (if exists) with user data.
//         const usersWithContactNames = filteredUsers.map(user => ({
//           ...user,
//           contactUsername: contactMap[user.phone] || undefined
//         }));

//         setUsers(usersWithContactNames);
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };
//     fetchUsers();
//   }, [loggedInUser]);

//   useEffect(() => {
//     const fetchLatestMessages = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const latestMessages = {};
//       for (const user of users) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
//           if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//           const data = await response.json();
//           latestMessages[user.phone] = data.message;
//         } catch (error) {
//           console.error("Error fetching latest message:", error.message);
//         }
//       }
//       setLatestMessages(latestMessages);
//     };
//     if (users.length > 0) fetchLatestMessages();
//   }, [users]);

//   const handleNewMessage = (chat) => {
//     const { sender, receiver, message } = chat;
//     const currentUser = localStorage.getItem("username");
//     const involvedUser = sender === currentUser ? receiver : sender;
//     setLatestMessages((prevMessages) => ({
//       ...prevMessages,
//       [involvedUser]: message,
//     }));
//     if (receiver === currentUser && activeIndex !== sender) {
//       const audio = new Audio("/peep.mp3");
//       audio.play().catch(err => console.error("Audio playback error:", err));
//       setUnreadMessages((prev) => {
//         const updatedUnreadMessages = {
//           ...prev,
//           [sender]: (prev[sender] || 0) + 1,
//         };
//         localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//         return updatedUnreadMessages;
//       });
//     }
//     setUsers((prevUsers) => {
//       const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
//       const userToMove = prevUsers.find((user) => user.phone === involvedUser);
//       if (userToMove) {
//         const newUserOrder = [userToMove, ...updatedUsers];
//         localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
//         return newUserOrder;
//       } else {
//         // If the user is not in the list, create a new minimal user object.
//         const newUser = { phone: involvedUser, username: involvedUser };
//         const newUserOrder = [newUser, ...prevUsers];
//         localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
//         return newUserOrder;
//       }
//     });
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (chat) => {
//       handleNewMessage(chat);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [activeIndex, unreadMessages]);

//   useEffect(() => {
//     const storedUnreadMessages = JSON.parse(localStorage.getItem("unreadMessages"));
//     if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
//   }, []);

//   const handleClick = (user, index) => {
//     setActiveIndex(user.phone);
//     setUnreadMessages((prev) => {
//       const updatedUnreadMessages = { ...prev };
//       delete updatedUnreadMessages[user.phone];
//       localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//       return updatedUnreadMessages;
//     });
//     localStorage.setItem("unreadMessages", JSON.stringify({ ...unreadMessages, [user.phone]: false }));
//     onSelectUser(user);
//   };

//   const handleImageClick = (e, imageUrl) => {
//     e.stopPropagation();
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const closeOverlayProfile = () => {
//     setSelectedUser(null);
//   };

//   const handleProfileImageClick = () => {
//     setSelectedUser(loggedInUser);
//     setShowUserList(!showUserList);
//   };

//   const truncateUsername = (username) => {
//     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
//   };

//   const truncateLatestMessage = (message) => {
//     if (!message) return "";
//     return message.length > 20 ? `${message.slice(0, 15)}...` : message;
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredUsers = users.filter(user =>
//     user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogOut = () => {
//     setShowOptions(!showOptions);
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setShowOptions(false);
//     navigate("/");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div className={`mt-0 sm:mt-0 w-full relative sm:w-full sm:static flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"}`}>
//         <div className="flex flex-col sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <ul className="mt-4">
//           {filteredUsers.map((user, index) => (
//             <li
//               key={index}
//               className={`mb-2 px-3 py-4 rounded-lg cursor-pointer flex items-center hover:bg-blue-50 transition-colors ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"}`}
//               onClick={() => handleClick(user, index)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture}`}
//                 alt="Profile"
//                 className="h-10 w-10 mr-4 rounded-full object-cover"
//                 onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
//               />
//               <div className="user-info flex-1">
//                 <p className="font-bold text-gray-800 capitalize">
//                   {loggedInUser && loggedInUser.phone === user.phone
//                     ? "You"
//                     : (user.contactUsername 
//                         ? truncateUsername(user.contactUsername) 
//                         : user.phone)}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-600 truncate">
//                     {truncateLatestMessage(latestMessages[user.phone])}
//                   </p>
//                   {unreadMessages[user.phone] > 0 && (
//                     <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {unreadMessages[user.phone]}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         {overlayImage && (
//           <>
//             <div
//               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <img
//                 src={overlayImage}
//                 alt="Full View"
//                 className="max-w-[90%] max-h-[90%] object-contain"
//               />
//             </div>
//             <div
//               className="fixed top-8 right-10 text-white z-60 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <AiOutlineClose size={30} />
//             </div>
//           </>
//         )}
//       </div>
//       <div className="user-details-right">
//         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
//       </div>
//     </>
//   );
// };

// export default UserList;




//store in localstorage unknown 


// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { SiDeepgram } from "react-icons/si";
// import { IoCloseOutline } from "react-icons/io5";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   const [users, setUsers] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [latestMessages, setLatestMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showUserList, setShowUserList] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [unreadMessages, setUnreadMessages] = useState({});
//   const [tempUsers, setTempUsers] = useState([]);

//   const navigate = useNavigate();
//   const optionsRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   const handleAiChatToggle = () => {
//     dispatch(toggleAiChat(!isAiChatOpen));
//   };

//   useEffect(() => {
//     const savedTempUsers = JSON.parse(localStorage.getItem("tempUsers")) || [];
//     setTempUsers(savedTempUsers);
//   }, []);


//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Modified effect: Fetch contacts to build a mapping,
//   // then fetch registered users and attach the stored contactUsername from the contacts list.
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!loggedInUser) return; // Make sure logged in user details are available
//       try {
//         // Get the contacts list for the logged in user
//         const contactResponse = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//         let contactsArray = [];
//         if (contactResponse.ok) {
//           const contactData = await contactResponse.json();
//           contactsArray = contactData.contacts;
//         }
//         // Build a mapping: phone -> contactUsername
//         const contactMap = {};
//         contactsArray.forEach((contactObj) => {
//           contactMap[contactObj.contactPhone] = contactObj.contactUsername;
//         });
//         // Extract phone numbers from contacts array
//         const phoneList = contactsArray.map(contactObj => contactObj.contactPhone);

//         // Fetch all registered users
//         const response = await fetch("http://localhost:5000/api/register");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();

//         // Filter users whose phone numbers exist in the contacts array
//         const filteredUsers = data.users.filter(user => phoneList.includes(user.phone));

//         // Merge the contact username from contactMap (if exists) with user data.
//         const usersWithContactNames = filteredUsers.map(user => ({
//           ...user,
//           contactUsername: contactMap[user.phone] || undefined
//         }));

//         setUsers(usersWithContactNames);
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };
//     fetchUsers();
//   }, [loggedInUser]);

//   useEffect(() => {
//     const fetchLatestMessages = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const latestMessages = {};
//       for (const user of users) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
//           if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//           const data = await response.json();
//           latestMessages[user.phone] = data.message;
//         } catch (error) {
//           console.error("Error fetching latest message:", error.message);
//         }
//       }
//       setLatestMessages(latestMessages);
//     };
//     if (users.length > 0) fetchLatestMessages();
//   }, [users]);

//   const handleNewMessage = (chat) => {
//     const { sender, receiver, message } = chat;
//     const currentUser = localStorage.getItem("username");
//     const involvedUser = sender === currentUser ? receiver : sender;
//     setLatestMessages((prevMessages) => ({
//       ...prevMessages,
//       [involvedUser]: message,
//     }));
//     if (receiver === currentUser && activeIndex !== sender) {
//       const audio = new Audio("/peep.mp3");
//       audio.play().catch(err => console.error("Audio playback error:", err));
//       setUnreadMessages((prev) => {
//         const updatedUnreadMessages = {
//           ...prev,
//           [sender]: (prev[sender] || 0) + 1,
//         };
//         localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//         return updatedUnreadMessages;
//       });
//     }
//     setUsers((prevUsers) => {
//       const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
//       const userToMove = prevUsers.find((user) => user.phone === involvedUser);
//       if (userToMove) {
//         const newUserOrder = [userToMove, ...updatedUsers];
//         localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
//         return newUserOrder;
//       } else {
//         // If the user is not in the list, create a new minimal user object.
//         // Check if user already in temp list
//         const isAlreadyTemp = tempUsers.some(user => user.phone === involvedUser);
//         if (!isAlreadyTemp) {
//           const newUser = { phone: involvedUser, username: involvedUser };
//           const updatedTempUsers = [newUser, ...tempUsers];
//           setTempUsers(updatedTempUsers);
//           localStorage.setItem("tempUsers", JSON.stringify(updatedTempUsers));
//         }
//         return prevUsers;

//       }
//     });
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (chat) => {
//       handleNewMessage(chat);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [activeIndex, unreadMessages]);

//   useEffect(() => {
//     const storedUnreadMessages = JSON.parse(localStorage.getItem("unreadMessages"));
//     if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
//   }, []);

//   const handleClick = (user, index) => {
//     setActiveIndex(user.phone);
//     setUnreadMessages((prev) => {
//       const updatedUnreadMessages = { ...prev };
//       delete updatedUnreadMessages[user.phone];
//       localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//       return updatedUnreadMessages;
//     });
//     localStorage.setItem("unreadMessages", JSON.stringify({ ...unreadMessages, [user.phone]: false }));
//     onSelectUser(user);
//   };

//   const handleImageClick = (e, imageUrl) => {
//     e.stopPropagation();
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const closeOverlayProfile = () => {
//     setSelectedUser(null);
//   };

//   const handleProfileImageClick = () => {
//     setSelectedUser(loggedInUser);
//     setShowUserList(!showUserList);
//   };

//   const truncateUsername = (username) => {
//     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
//   };

//   const truncateLatestMessage = (message) => {
//     if (!message) return "";
//     return message.length > 20 ? `${message.slice(0, 15)}...` : message;
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const mergedUsers = [...users, ...tempUsers.filter(
//     tempUser => !users.some(user => user.phone === tempUser.phone)
//   )];

//   const filteredUsers = mergedUsers.filter(user =>
//     user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogOut = () => {
//     setShowOptions(!showOptions);
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setShowOptions(false);
//     navigate("/");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div className={`mt-0 sm:mt-0 w-full relative sm:w-full sm:static flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"}`}>
//         <div className="flex flex-col sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <ul className="mt-4">
//           {filteredUsers.map((user, index) => (
//             <li
//               key={index}
//               className={`mb-2 px-3 py-4 rounded-lg cursor-pointer flex items-center hover:bg-blue-50 transition-colors ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"}`}
//               onClick={() => handleClick(user, index)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture}`}
//                 alt="Profile"
//                 className="h-10 w-10 mr-4 rounded-full object-cover"
//                 onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
//               />
//               <div className="user-info flex-1">
//                 <p className="font-bold text-gray-800 capitalize">
//                   {loggedInUser && loggedInUser.phone === user.phone
//                     ? "You"
//                     : (user.contactUsername
//                       ? truncateUsername(user.contactUsername)
//                       : user.phone)}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-600 truncate">
//                     {truncateLatestMessage(latestMessages[user.phone])}
//                   </p>
//                   {unreadMessages[user.phone] > 0 && (
//                     <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {unreadMessages[user.phone]}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         {overlayImage && (
//           <>
//             <div
//               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <img
//                 src={overlayImage}
//                 alt="Full View"
//                 className="max-w-[90%] max-h-[90%] object-contain"
//               />
//             </div>
//             <div
//               className="fixed top-8 right-10 text-white z-60 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <AiOutlineClose size={30} />
//             </div>
//           </>
//         )}
//       </div>
//       <div className="user-details-right">
//         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
//       </div>
//     </>
//   );
// };

// export default UserList;




//show only user in contact not int unknown contac




// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { SiDeepgram } from "react-icons/si";
// import { IoCloseOutline } from "react-icons/io5";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   // Existing states
//   const [users, setUsers] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [latestMessages, setLatestMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showUserList, setShowUserList] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [unreadMessages, setUnreadMessages] = useState({});

//   // NEW: state to hold unknown contacts retrieved from the backend
//   const [unknownContacts, setUnknownContacts] = useState([]);

//   const navigate = useNavigate();
//   const optionsRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   const handleAiChatToggle = () => {
//     dispatch(toggleAiChat(!isAiChatOpen));
//   };

//   // Existing code: fetch logged in user
//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Existing effect: fetch saved contacts from registered users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!loggedInUser) return; // Ensure logged in user details are available
//       try {
//         // Get the contacts list for the logged in user
//         const contactResponse = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//         let contactsArray = [];
//         if (contactResponse.ok) {
//           const contactData = await contactResponse.json();
//           contactsArray = contactData.contacts;
//           // NEW: set the unknown contacts from this API call
//           setUnknownContacts(contactData.unknownContacts || []);
//         }
//         // Build a mapping: phone -> contactUsername
//         const contactMap = {};
//         contactsArray.forEach((contactObj) => {
//           contactMap[contactObj.contactPhone] = contactObj.contactUsername;
//         });
//         // Extract phone numbers from contacts array
//         const phoneList = contactsArray.map(contactObj => contactObj.contactPhone);

//         // Fetch all registered users
//         const response = await fetch("http://localhost:5000/api/register");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();

//         // Filter users whose phone numbers exist in the contacts array
//         const filteredUsers = data.users.filter(user => phoneList.includes(user.phone));

//         // Merge the contact username from contactMap (if exists) with user data.
//         const usersWithContactNames = filteredUsers.map(user => ({
//           ...user,
//           contactUsername: contactMap[user.phone] || undefined
//         }));

//         setUsers(usersWithContactNames);
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };
//     fetchUsers();
//   }, [loggedInUser]);

//   // Existing: fetch latest messages for users
//   useEffect(() => {
//     const fetchLatestMessages = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const latestMessages = {};
//       for (const user of users) {
//         try {
//           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
//           if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//           const data = await response.json();
//           latestMessages[user.phone] = data.message;
//         } catch (error) {
//           console.error("Error fetching latest message:", error.message);
//         }
//       }
//       setLatestMessages(latestMessages);
//     };
//     if (users.length > 0) fetchLatestMessages();
//   }, [users]);

//   // NEW FUNCTION: Add an unknown contact to the database.
//   // This function calls the "addUnknownContact" endpoint.
//   const addUnknownContactToDB = async (phone) => {
//     if (!loggedInUser) return;
//     try {
//       const response = await fetch("http://localhost:5000/api/addunknowncontact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone: phone,
//           contactUsername: phone // Using the phone as the default username. Adjust as needed.
//         })
//       });
//       if (response.ok) {
//         const data = await response.json();
//         // Append the new unknown contact returned from the server to state.
//         setUnknownContacts((prev) => [...prev, ...data.unknownContacts ? data.unknownContacts : [{ contactPhone: phone, contactUsername: phone }]]);
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to add unknown contact:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error adding unknown contact:", error.message);
//     }
//   };

//   // Existing: handle incoming messages via socket
//   const handleNewMessage = (chat) => {
//     const { sender, receiver, message } = chat;
//     const currentUser = localStorage.getItem("username");
//     // Determine the involved user based on the sender and receiver
//     const involvedUser = sender === currentUser ? receiver : sender;
//     setLatestMessages((prevMessages) => ({
//       ...prevMessages,
//       [involvedUser]: message,
//     }));
//     if (receiver === currentUser && activeIndex !== sender) {
//       const audio = new Audio("/peep.mp3");
//       audio.play().catch(err => console.error("Audio playback error:", err));
//       setUnreadMessages((prev) => {
//         const updatedUnreadMessages = {
//           ...prev,
//           [sender]: (prev[sender] || 0) + 1,
//         };
//         localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//         return updatedUnreadMessages;
//       });
//     }
//     setUsers((prevUsers) => {
//       const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
//       const userToMove = prevUsers.find((user) => user.phone === involvedUser);
//       if (userToMove) {
//         const newUserOrder = [userToMove, ...updatedUsers];
//         localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
//         return newUserOrder;
//       } else {
//         // If the user is not in the list, create a new minimal user object.
//         const newUser = { phone: involvedUser, username: involvedUser };
//         const newUserOrder = [newUser, ...prevUsers];
//         localStorage.setItem("userOrder", JSON.stringify(newUserOrder.map((user) => user.phone)));
//         return newUserOrder;
//       }
//     });
//     // NEW: Check if the sender is unknown and not already added as a saved contact or unknown contact.
//     if (receiver === currentUser && loggedInUser) {
//       const isSaved = users.some(user => user.phone === sender);
//       const isAlreadyUnknown = unknownContacts.some(contact => contact.contactPhone === sender);
//       if (!isSaved && !isAlreadyUnknown) {
//         addUnknownContactToDB(sender);
//       }
//     }
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", (chat) => {
//       handleNewMessage(chat);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [activeIndex, unreadMessages, users, unknownContacts, loggedInUser]);

//   // Existing: Load unread messages from localStorage
//   useEffect(() => {
//     const storedUnreadMessages = JSON.parse(localStorage.getItem("unreadMessages"));
//     if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
//   }, []);

//   const handleClick = (user, index) => {
//     setActiveIndex(user.phone);
//     setUnreadMessages((prev) => {
//       const updatedUnreadMessages = { ...prev };
//       delete updatedUnreadMessages[user.phone];
//       localStorage.setItem("unreadMessages", JSON.stringify(updatedUnreadMessages));
//       return updatedUnreadMessages;
//     });
//     localStorage.setItem("unreadMessages", JSON.stringify({ ...unreadMessages, [user.phone]: false }));
//     onSelectUser(user);
//   };

//   const handleImageClick = (e, imageUrl) => {
//     e.stopPropagation();
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const closeOverlayProfile = () => {
//     setSelectedUser(null);
//   };

//   const handleProfileImageClick = () => {
//     setSelectedUser(loggedInUser);
//     setShowUserList(!showUserList);
//   };

//   const truncateUsername = (username) => {
//     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
//   };

//   const truncateLatestMessage = (message) => {
//     if (!message) return "";
//     return message.length > 20 ? `${message.slice(0, 15)}...` : message;
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredUsers = users.filter(user =>
//     user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogOut = () => {
//     setShowOptions(!showOptions);
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setShowOptions(false);
//     navigate("/");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // EXISTING FUNCTION: Save an unknown contact into the saved contacts.
//   // This calls the addContact endpoint, and on success refreshes the unknown contacts list.
//   const handleSaveUnknownContact = async (unknownContact) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/addcontact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone: unknownContact.contactPhone,
//           contactUsername: unknownContact.contactUsername
//         })
//       });
//       if (response.ok) {
//         // Remove the unknown contact from state and add it to the saved contacts list.
//         setUnknownContacts((prev) =>
//           prev.filter(contact => contact.contactPhone !== unknownContact.contactPhone)
//         );
//         setUsers((prev) => {
//           return [...prev, { phone: unknownContact.contactPhone, username: unknownContact.contactUsername, contactUsername: unknownContact.contactUsername }];
//         });
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to save contact:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error saving unknown contact:", error.message);
//     }
//   };

//   return (
//     <>
//       <div className={`mt-0 sm:mt-0 w-full relative sm:w-full sm:static flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"}`}>
//         <div className="flex flex-col sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <ul className="mt-4">
//           {filteredUsers.map((user, index) => (
//             <li
//               key={index}
//               className={`mb-2 px-3 py-4 rounded-lg cursor-pointer flex items-center hover:bg-blue-50 transition-colors ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"}`}
//               onClick={() => handleClick(user, index)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture}`}
//                 alt="Profile"
//                 className="h-10 w-10 mr-4 rounded-full object-cover"
//                 onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
//               />
//               <div className="user-info flex-1">
//                 <p className="font-bold text-gray-800 capitalize">
//                   {loggedInUser && loggedInUser.phone === user.phone
//                     ? "You"
//                     : (user.contactUsername 
//                         ? truncateUsername(user.contactUsername) 
//                         : user.phone)}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-600 truncate">
//                     {truncateLatestMessage(latestMessages[user.phone])}
//                   </p>
//                   {unreadMessages[user.phone] > 0 && (
//                     <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {unreadMessages[user.phone]}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* NEW: Render Unknown Contacts, if any */}
//         {unknownContacts.length > 0 && (
//           <div className="mt-6 px-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Unknown Contacts</h3>
//             <ul>
//               {unknownContacts.map((contact, idx) => (
//                 <li key={idx} className="mb-2 px-3 py-4 rounded-lg flex items-center bg-yellow-50">
//                   <img
//                     src="/default-profile.png"
//                     alt="Profile"
//                     className="h-10 w-10 mr-4 rounded-full object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-800">
//                       {truncateUsername(contact.contactUsername || contact.contactPhone)}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleSaveUnknownContact(contact)}
//                     className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
//                   >
//                     Save
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {overlayImage && (
//           <>
//             <div
//               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <img
//                 src={overlayImage}
//                 alt="Full View"
//                 className="max-w-[90%] max-h-[90%] object-contain"
//               />
//             </div>
//             <div
//               className="fixed top-8 right-10 text-white z-60 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <AiOutlineClose size={30} />
//             </div>
//           </>
//         )}
//       </div>
//       <div className="user-details-right">
//         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
//       </div>
//     </>
//   );
// };

// export default UserList;



//show save button in userlist for unknown user


// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { SiDeepgram } from "react-icons/si";
// import { IoCloseOutline } from "react-icons/io5";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   // Existing states
//   const [users, setUsers] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [latestMessages, setLatestMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showUserList, setShowUserList] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [unreadMessages, setUnreadMessages] = useState({});

//   // NEW: state to hold unknown contacts retrieved from the backend
//   const [unknownContacts, setUnknownContacts] = useState([]);

//   const navigate = useNavigate();
//   const optionsRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   const handleAiChatToggle = () => {
//     dispatch(toggleAiChat(!isAiChatOpen));
//   };

//   // Existing code: fetch logged in user
//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(
//           `http://localhost:5000/api/registerUser?username=${storedUsername}`
//         );
//         if (!response.ok)
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Existing effect: fetch saved contacts & unknown contacts from registered users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!loggedInUser) return; // Ensure logged in user details are available
//       try {
//         // Get the contacts list for the logged in user
//         const contactResponse = await fetch(
//           `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//         );
//         let contactsArray = [];
//         if (contactResponse.ok) {
//           const contactData = await contactResponse.json();
//           contactsArray = contactData.contacts;
//           // NEW: set the unknown contacts from this API call
//           setUnknownContacts(contactData.unknownContacts || []);
//         }
//         // Build a mapping: phone -> contactUsername for saved contacts
//         const contactMap = {};
//         contactsArray.forEach((contactObj) => {
//           contactMap[contactObj.contactPhone] = contactObj.contactUsername;
//         });
//         // Extract phone numbers from saved contacts array
//         const phoneList = contactsArray.map(
//           (contactObj) => contactObj.contactPhone
//         );

//         // Fetch all registered users
//         const response = await fetch("http://localhost:5000/api/register");
//         if (!response.ok)
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();

//         // Filter users whose phone numbers exist in the contacts array
//         const filteredUsers = data.users.filter((user) =>
//           phoneList.includes(user.phone)
//         );

//         // Merge the contact username from contactMap (if exists) with user data.
//         const usersWithContactNames = filteredUsers.map((user) => ({
//           ...user,
//           contactUsername: contactMap[user.phone] || undefined,
//         }));

//         setUsers(usersWithContactNames);
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };
//     fetchUsers();
//   }, [loggedInUser]);

//   // Existing: fetch latest messages for users
//   useEffect(() => {
//     const fetchLatestMessages = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const latestMessages = {};
//       for (const user of users) {
//         try {
//           const response = await fetch(
//             `http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`
//           );
//           if (!response.ok)
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           const data = await response.json();
//           latestMessages[user.phone] = data.message;
//         } catch (error) {
//           console.error("Error fetching latest message:", error.message);
//         }
//       }
//       setLatestMessages(latestMessages);
//     };
//     if (users.length > 0) fetchLatestMessages();
//   }, [users]);

//   // NEW FUNCTION: Add an unknown contact to the database.
//   // This function calls the "addUnknownContact" endpoint.
//   const addUnknownContactToDB = async (phone) => {
//     if (!loggedInUser) return;
//     try {
//       const response = await fetch("http://localhost:5000/api/addunknowncontact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone: phone,
//           contactUsername: phone, // Using the phone as the default username. Adjust as needed.
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         // Append the new unknown contact returned from the server to state.
//         // If the API returns an array, we append that; otherwise, we append the single contact.
//         setUnknownContacts((prev) => [
//           ...prev,
//           ...(data.unknownContacts
//             ? data.unknownContacts
//             : [{ contactPhone: phone, contactUsername: phone }]),
//         ]);
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to add unknown contact:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error adding unknown contact:", error.message);
//     }
//   };

//   // Existing: handle incoming messages via socket
//   const handleNewMessage = (chat) => {
//     const { sender, receiver, message } = chat;
//     const currentUser = localStorage.getItem("username");
//     // Determine the involved user based on the sender and receiver
//     const involvedUser = sender === currentUser ? receiver : sender;
//     setLatestMessages((prevMessages) => ({
//       ...prevMessages,
//       [involvedUser]: message,
//     }));

//     // If you are the receiver and the incoming message is from a different user than the active chat
//     if (receiver === currentUser && activeIndex !== sender) {
//       const audio = new Audio("/peep.mp3");
//       audio.play().catch((err) =>
//         console.error("Audio playback error:", err)
//       );
//       setUnreadMessages((prev) => {
//         const updatedUnreadMessages = {
//           ...prev,
//           [sender]: (prev[sender] || 0) + 1,
//         };
//         localStorage.setItem(
//           "unreadMessages",
//           JSON.stringify(updatedUnreadMessages)
//         );
//         return updatedUnreadMessages;
//       });
//     }

//     // Move or create this user in the users array so it appears at the top
//     setUsers((prevUsers) => {
//       const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
//       const userToMove = prevUsers.find((user) => user.phone === involvedUser);
//       if (userToMove) {
//         const newUserOrder = [userToMove, ...updatedUsers];
//         localStorage.setItem(
//           "userOrder",
//           JSON.stringify(newUserOrder.map((user) => user.phone))
//         );
//         return newUserOrder;
//       } else {
//         // If the user is not in the list, create a new minimal user object.
//         const newUser = { phone: involvedUser, username: involvedUser };
//         const newUserOrder = [newUser, ...prevUsers];
//         localStorage.setItem(
//           "userOrder",
//           JSON.stringify(newUserOrder.map((user) => user.phone))
//         );
//         return newUserOrder;
//       }
//     });

//     // NEW: Check if the sender is unknown and not already added as a saved contact or unknown contact.
//     if (receiver === currentUser && loggedInUser) {
//       const isSaved = users.some((u) => u.phone === sender);
//       const isAlreadyUnknown = unknownContacts.some(
//         (contact) => contact.contactPhone === sender
//       );
//       if (!isSaved && !isAlreadyUnknown) {
//         addUnknownContactToDB(sender);
//       }
//     }
//   };

//   // Socket connection effect
//   useEffect(() => {
//     socket.on("receiveMessage", (chat) => {
//       handleNewMessage(chat);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [activeIndex, unreadMessages, users, unknownContacts, loggedInUser]);

//   // Existing: Load unread messages from localStorage
//   useEffect(() => {
//     const storedUnreadMessages = JSON.parse(
//       localStorage.getItem("unreadMessages")
//     );
//     if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
//   }, []);

//   // When user clicks on a user in the list
//   const handleClick = (user, index) => {
//     setActiveIndex(user.phone);
//     setUnreadMessages((prev) => {
//       const updatedUnreadMessages = { ...prev };
//       delete updatedUnreadMessages[user.phone];
//       localStorage.setItem(
//         "unreadMessages",
//         JSON.stringify(updatedUnreadMessages)
//       );
//       return updatedUnreadMessages;
//     });
//     localStorage.setItem(
//       "unreadMessages",
//       JSON.stringify({ ...unreadMessages, [user.phone]: false })
//     );
//     onSelectUser(user);
//   };

//   const handleImageClick = (e, imageUrl) => {
//     e.stopPropagation();
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const closeOverlayProfile = () => {
//     setSelectedUser(null);
//   };

//   const handleProfileImageClick = () => {
//     setSelectedUser(loggedInUser);
//     setShowUserList(!showUserList);
//   };

//   const truncateUsername = (username) => {
//     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
//   };

//   const truncateLatestMessage = (message) => {
//     if (!message) return "";
//     return message.length > 20 ? `${message.slice(0, 15)}...` : message;
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // NEW: Merge saved contacts (users) and unknown contacts.
//   // IMPORTANT: We filter out unknownContacts whose phone is already in users, so it doesn't appear twice.
//   const allContacts = [
//     ...users,
//     ...unknownContacts
//       .filter((unk) => !users.some((usr) => usr.phone === unk.contactPhone))
//       .map((contact) => ({
//         phone: contact.contactPhone,
//         username: contact.contactUsername,
//         contactUsername: contact.contactUsername,
//         profilePicture: "/default-profile.png",
//       })),
//   ];

//   // Filter combined contacts by search query
//   const filteredUsers = allContacts.filter((user) =>
//     user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogOut = () => {
//     setShowOptions(!showOptions);
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setShowOptions(false);
//     navigate("/");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // EXISTING FUNCTION: Save an unknown contact into the saved contacts.
//   // This calls the addContact endpoint, and on success refreshes the unknown contacts list.
//   const handleSaveUnknownContact = async (unknownContact) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/addcontact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone: unknownContact.phone,
//           contactUsername: unknownContact.contactUsername,
//         }),
//       });
//       if (response.ok) {
//         // Remove the unknown contact from state and add it to the saved contacts list.
//         setUnknownContacts((prev) =>
//           prev.filter(
//             (contact) => contact.contactPhone !== unknownContact.phone
//           )
//         );
//         setUsers((prev) => [
//           ...prev,
//           {
//             phone: unknownContact.phone,
//             username: unknownContact.contactUsername,
//             contactUsername: unknownContact.contactUsername,
//             profilePicture: "/default-profile.png",
//           },
//         ]);
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to save contact:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error saving unknown contact:", error.message);
//     }
//   };

//   return (
//     <>
//       <div
//         className={`mt-0 sm:mt-0 w-full relative sm:w-full sm:static flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${
//           hideUserList ? "hidden" : "block"
//         }`}
//       >
//         <div className="flex flex-col sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <ul className="mt-4">
//           {filteredUsers.map((user, index) => (
//             <li
//               key={index}
//               className={`mb-2 px-3 py-4 rounded-lg cursor-pointer flex items-center hover:bg-blue-50 transition-colors ${
//                 activeIndex === user.phone ? "bg-blue-100" : "bg-white"
//               }`}
//               onClick={() => handleClick(user, index)}
//             >
//               <img
//                 src={`http://localhost:5000/${
//                   user.profilePicture || "default-profile.png"
//                 }`}
//                 alt="Profile"
//                 className="h-10 w-10 mr-4 rounded-full object-cover"
//                 onClick={(e) =>
//                   handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)
//                 }
//               />
//               <div className="user-info flex-1">
//                 <p className="font-bold text-gray-800 capitalize">
//                   {loggedInUser && loggedInUser.phone === user.phone
//                     ? "You"
//                     : user.contactUsername
//                     ? truncateUsername(user.contactUsername)
//                     : user.phone}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-600 truncate">
//                     {truncateLatestMessage(latestMessages[user.phone])}
//                   </p>
//                   {unreadMessages[user.phone] > 0 && (
//                     <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {unreadMessages[user.phone]}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               {/* Conditionally render the "Save" button for unknown contacts */}
//               {user.profilePicture === "/default-profile.png" && (
//                 <button
//                   onClick={(e) => {
//                     // Prevent triggering the handleClick event for the list item.
//                     e.stopPropagation();
//                     handleSaveUnknownContact(user);
//                   }}
//                   className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
//                 >
//                   Save
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>

//         {overlayImage && (
//           <>
//             <div
//               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <img
//                 src={overlayImage}
//                 alt="Full View"
//                 className="max-w-[90%] max-h-[90%] object-contain"
//               />
//             </div>
//             <div
//               className="fixed top-8 right-10 text-white z-60 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <AiOutlineClose size={30} />
//             </div>
//           </>
//         )}
//       </div>
//       <div className="user-details-right">
//         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
//       </div>
//     </>
//   );
// };

// export default UserList;



// show blue color delet message


// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { SiDeepgram } from "react-icons/si";
// import { IoCloseOutline } from "react-icons/io5";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   // Existing states
//   const [users, setUsers] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [latestMessages, setLatestMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showUserList, setShowUserList] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [unreadMessages, setUnreadMessages] = useState({});

//   // NEW: state to hold unknown contacts retrieved from the backend
//   const [unknownContacts, setUnknownContacts] = useState([]);

//   const navigate = useNavigate();
//   const optionsRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   const handleAiChatToggle = () => {
//     dispatch(toggleAiChat(!isAiChatOpen));
//   };

//   // Existing code: fetch logged in user
//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(
//           `http://localhost:5000/api/registerUser?username=${storedUsername}`
//         );
//         if (!response.ok)
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Existing effect: fetch saved contacts & unknown contacts from registered users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!loggedInUser) return; // Ensure logged in user details are available
//       try {
//         // Get the contacts list for the logged in user
//         const contactResponse = await fetch(
//           `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//         );
//         let contactsArray = [];
//         if (contactResponse.ok) {
//           const contactData = await contactResponse.json();
//           contactsArray = contactData.contacts;
//           // NEW: set the unknown contacts from this API call
//           setUnknownContacts(contactData.unknownContacts || []);
//         }
//         // Build a mapping: phone -> contactUsername for saved contacts
//         const contactMap = {};
//         contactsArray.forEach((contactObj) => {
//           contactMap[contactObj.contactPhone] = contactObj.contactUsername;
//         });
//         // Extract phone numbers from saved contacts array
//         const phoneList = contactsArray.map(
//           (contactObj) => contactObj.contactPhone
//         );

//         // Fetch all registered users
//         const response = await fetch("http://localhost:5000/api/register");
//         if (!response.ok)
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();

//         // Filter users whose phone numbers exist in the contacts array
//         const filteredUsers = data.users.filter((user) =>
//           phoneList.includes(user.phone)
//         );

//         // Merge the contact username from contactMap (if exists) with user data.
//         const usersWithContactNames = filteredUsers.map((user) => ({
//           ...user,
//           contactUsername: contactMap[user.phone] || undefined,
//         }));

//         setUsers(usersWithContactNames);
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       }
//     };
//     fetchUsers();
//   }, [loggedInUser]);

//   // Existing: fetch latest messages for users
//   useEffect(() => {
//     const fetchLatestMessages = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const latestMessages = {};
//       for (const user of users) {
//         try {
//           const response = await fetch(
//             `http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`
//           );
//           if (!response.ok)
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           const data = await response.json();
//           latestMessages[user.phone] = data.message;
//         } catch (error) {
//           console.error("Error fetching latest message:", error.message);
//         }
//       }
//       setLatestMessages(latestMessages);
//     };
//     if (users.length > 0) fetchLatestMessages();
//   }, [users]);

//   // NEW FUNCTION: Add an unknown contact to the database.
//   // This function calls the "addUnknownContact" endpoint.
//   const addUnknownContactToDB = async (phone) => {
//     if (!loggedInUser) return;
//     try {
//       const response = await fetch("http://localhost:5000/api/addunknowncontact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone: phone,
//           contactUsername: phone, // Using the phone as the default username. Adjust as needed.
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         // Append the new unknown contact returned from the server to state.
//         // If the API returns an array, we append that; otherwise, we append the single contact.
//         setUnknownContacts((prev) => [
//           ...prev,
//           ...(data.unknownContacts
//             ? data.unknownContacts
//             : [{ contactPhone: phone, contactUsername: phone }]),
//         ]);
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to add unknown contact:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error adding unknown contact:", error.message);
//     }
//   };

//   // Existing: handle incoming messages via socket
//   const handleNewMessage = (chat) => {
//     const { sender, receiver, message } = chat;
//     const currentUser = localStorage.getItem("username");
//     // Determine the involved user based on the sender and receiver
//     const involvedUser = sender === currentUser ? receiver : sender;
//     setLatestMessages((prevMessages) => ({
//       ...prevMessages,
//       [involvedUser]: message,
//     }));

//     // If you are the receiver and the incoming message is from a different user than the active chat
//     if (receiver === currentUser && activeIndex !== sender) {
//       const audio = new Audio("/peep.mp3");
//       audio.play().catch((err) =>
//         console.error("Audio playback error:", err)
//       );
//       setUnreadMessages((prev) => {
//         const updatedUnreadMessages = {
//           ...prev,
//           [sender]: (prev[sender] || 0) + 1,
//         };
//         localStorage.setItem(
//           "unreadMessages",
//           JSON.stringify(updatedUnreadMessages)
//         );
//         return updatedUnreadMessages;
//       });
//     }

//     // Move or create this user in the users array so it appears at the top
//     setUsers((prevUsers) => {
//       const updatedUsers = prevUsers.filter((user) => user.phone !== involvedUser);
//       const userToMove = prevUsers.find((user) => user.phone === involvedUser);
//       if (userToMove) {
//         const newUserOrder = [userToMove, ...updatedUsers];
//         localStorage.setItem(
//           "userOrder",
//           JSON.stringify(newUserOrder.map((user) => user.phone))
//         );
//         return newUserOrder;
//       } else {
//         // If the user is not in the list, create a new minimal user object.
//         const newUser = { phone: involvedUser, username: involvedUser };
//         const newUserOrder = [newUser, ...prevUsers];
//         localStorage.setItem(
//           "userOrder",
//           JSON.stringify(newUserOrder.map((user) => user.phone))
//         );
//         return newUserOrder;
//       }
//     });

//     // NEW: Check if the sender is unknown and not already added as a saved contact or unknown contact.
//     if (receiver === currentUser && loggedInUser) {
//       const isSaved = users.some((u) => u.phone === sender);
//       const isAlreadyUnknown = unknownContacts.some(
//         (contact) => contact.contactPhone === sender
//       );
//       if (!isSaved && !isAlreadyUnknown) {
//         addUnknownContactToDB(sender);
//       }
//     }
//   };

//   // Socket connection effect
//   useEffect(() => {
//     socket.on("receiveMessage", (chat) => {
//       handleNewMessage(chat);
//     });
//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [activeIndex, unreadMessages, users, unknownContacts, loggedInUser]);

//   // Existing: Load unread messages from localStorage
//   useEffect(() => {
//     const storedUnreadMessages = JSON.parse(
//       localStorage.getItem("unreadMessages")
//     );
//     if (storedUnreadMessages) setUnreadMessages(storedUnreadMessages);
//   }, []);

//   // When user clicks on a user in the list
//   const handleClick = (user, index) => {
//     setActiveIndex(user.phone);
//     setUnreadMessages((prev) => {
//       const updatedUnreadMessages = { ...prev };
//       delete updatedUnreadMessages[user.phone];
//       localStorage.setItem(
//         "unreadMessages",
//         JSON.stringify(updatedUnreadMessages)
//       );
//       return updatedUnreadMessages;
//     });
//     localStorage.setItem(
//       "unreadMessages",
//       JSON.stringify({ ...unreadMessages, [user.phone]: false })
//     );
//     onSelectUser(user);
//   };

//   const handleImageClick = (e, imageUrl) => {
//     e.stopPropagation();
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const closeOverlayProfile = () => {
//     setSelectedUser(null);
//   };

//   const handleProfileImageClick = () => {
//     setSelectedUser(loggedInUser);
//     setShowUserList(!showUserList);
//   };

//   const truncateUsername = (username) => {
//     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
//   };

//   const truncateLatestMessage = (message) => {
//     if (!message) return "";
//     return message.length > 20 ? `${message.slice(0, 15)}...` : message;
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // NEW: Merge saved contacts (users) and unknown contacts.
//   // IMPORTANT: We filter out unknownContacts whose phone is already in users, so it doesn't appear twice.
//   const allContacts = [
//     ...users,
//     ...unknownContacts
//       .filter((unk) => !users.some((usr) => usr.phone === unk.contactPhone))
//       .map((contact) => ({
//         phone: contact.contactPhone,
//         username: contact.contactUsername,
//         contactUsername: contact.contactUsername,
//         profilePicture: "/default-profile.png",
//       })),
//   ];

//   // Filter combined contacts by search query
//   const filteredUsers = allContacts.filter((user) =>
//     user.username.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleLogOut = () => {
//     setShowOptions(!showOptions);
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setShowOptions(false);
//     navigate("/");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//  // NEW: Remove an unknown contact from the database
//  const handleDeleteUnknownContact = async (contactPhone) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/removeunknowncontact", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         owner: loggedInUser.phone,
//         contactPhone,
//       }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       // update local state
//       setUnknownContacts((prev) =>
//         prev.filter((c) => c.contactPhone !== contactPhone)
//       );
//     } else {
//       console.error("Failed to delete unknown contact:", data.message);
//     }
//   } catch (err) {
//     console.error("Error deleting unknown contact:", err);
//   }
// };

//   return (
//     <>
//       <div
//         className={`mt-0 sm:mt-0 w-full relative sm:w-full sm:static flex flex-col p-0 border-r border-gray-300 bg-gray-50 overflow-y-auto overflow-x-hidden h-full z-10 transition-all duration-300 ${hideUserList ? "hidden" : "block"
//           }`}
//       >
//         <div className="flex flex-col sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 h-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <ul className="mt-4">
//           {filteredUsers.map((user, index) => (
//             <li
//               key={index}
//               className={`mb-2 px-3 py-4 rounded-lg cursor-pointer flex items-center hover:bg-blue-50 transition-colors ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"
//                 }`}
//               onClick={() => handleClick(user, index)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture || "default-profile.png"
//                   }`}
//                 alt="Profile"
//                 className="h-10 w-10 mr-4 rounded-full object-cover"
//                 onClick={(e) =>
//                   handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)
//                 }
//               />
//               <div className="user-info flex-1">
//                 <p className="font-bold text-gray-800 capitalize">
//                   {loggedInUser && loggedInUser.phone === user.phone
//                     ? "You"
//                     : user.contactUsername
//                       ? truncateUsername(user.contactUsername)
//                       : user.phone}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-gray-600 truncate">
//                     {truncateLatestMessage(latestMessages[user.phone])}
//                   </p>
//                   {unreadMessages[user.phone] > 0 && (
//                     <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                       {unreadMessages[user.phone]}
//                     </span>
//                   )}
//                 </div>
//               </div>
//               {/* Conditionally render the "Save" button for unknown contacts */}
//               {user.profilePicture === "/default-profile.png" && (
//                 <button
//                   onClick={(e) => {
//                     // Prevent triggering the handleClick event for the list item.
//                     e.stopPropagation();
//                     handleDeleteUnknownContact(user.phone);
//                   }}
//                   className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>

//         {overlayImage && (
//           <>
//             <div
//               className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <img
//                 src={overlayImage}
//                 alt="Full View"
//                 className="max-w-[90%] max-h-[90%] object-contain"
//               />
//             </div>
//             <div
//               className="fixed top-8 right-10 text-white z-60 cursor-pointer"
//               onClick={closeOverlay}
//             >
//               <AiOutlineClose size={30} />
//             </div>
//           </>
//         )}
//       </div>
//       <div className="user-details-right">
//         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
//       </div>
//     </>
//   );
// };

// export default UserList;


//show chat if user click unknowen user delete btn



// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList }) => {
//   // === state ===
//   const [users, setUsers] = useState([]);                  // saved contacts
//   const [unknownContacts, setUnknownContacts] = useState([]); // unsaved
//   const [latestMessages, setLatestMessages] = useState({});
//   const [unreadMessages, setUnreadMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   // === fetch logged in user ===
//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const res = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//         if (!res.ok) throw new Error(res.statusText);
//         const { user } = await res.json();
//         setLoggedInUser(user);
//       } catch (err) {
//         console.error("Error fetching logged-in user:", err);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // === fetch saved & unknown contacts ===
//   useEffect(() => {
//     if (!loggedInUser) return;
//     const fetchContacts = async () => {
//       try {
//         // 1) contacts endpoint returns both saved and unknown
//         const res = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//         if (!res.ok) throw new Error(res.statusText);
//         const { contacts, unknownContacts: unk } = await res.json();
//         setUnknownContacts(unk || []);
//         // 2) fetch all registered users, filter to your saved
//         const allRes = await fetch("http://localhost:5000/api/register");
//         if (!allRes.ok) throw new Error(allRes.statusText);
//         const { users: allUsers } = await allRes.json();

//         const contactMap = {};
//         contacts.forEach((c) => {
//           contactMap[c.contactPhone] = c.contactUsername;
//         });
//         const phoneList = contacts.map((c) => c.contactPhone);

//         const saved = allUsers
//           .filter((u) => phoneList.includes(u.phone))
//           .map((u) => ({
//             ...u,
//             contactUsername: contactMap[u.phone],
//           }));

//         setUsers(saved);
//       } catch (err) {
//         console.error("Error fetching contacts:", err);
//       }
//     };
//     fetchContacts();
//   }, [loggedInUser]);

//   // === fetch latest messages for saved users ===
//   useEffect(() => {
//     const fetchLatest = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const lm = {};
//       for (let u of users) {
//         try {
//           const res = await fetch(
//             `http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${u.phone}`
//           );
//           if (!res.ok) throw new Error(res.statusText);
//           const { message } = await res.json();
//           lm[u.phone] = message;
//         } catch (err) {
//           console.error(err);
//         }
//       }
//       setLatestMessages(lm);
//     };
//     if (users.length) fetchLatest();
//   }, [users]);

//   // === load unread from localStorage ===
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("unreadMessages"));
//     if (stored) setUnreadMessages(stored);
//   }, []);

//   // === helper: add unknown to DB & state ===
//   const addUnknownContactToDB = async (phone) => {
//     if (!loggedInUser) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/addunknowncontact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone: phone,
//           contactUsername: phone,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         // server returns new unknownContacts array or single
//         const toAppend = data.unknownContacts || [{ contactPhone: phone, contactUsername: phone }];
//         setUnknownContacts((prev) => [...prev, ...toAppend]);
//       } else {
//         console.error("Add unknown failed:", data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // === helper: remove unknown both DB & state ===
//   const handleDeleteUnknownContact = async (contactPhone) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/removeunknowncontact", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setUnknownContacts((prev) =>
//           prev.filter((c) => c.contactPhone !== contactPhone)
//         );
//       } else {
//         console.error("Delete unknown failed:", data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // === handle incoming socket message ===
//   const handleNewMessage = ({ sender, receiver, message }) => {
//     const currentUser = localStorage.getItem("username");
//     const other = sender === currentUser ? receiver : sender;

//     // update latestMessages
//     setLatestMessages((prev) => ({ ...prev, [other]: message }));

//     // unread badge if I'm receiver and chat not active
//     if (receiver === currentUser && activeIndex !== sender) {
//       setUnreadMessages((prev) => {
//         const upd = { ...prev, [sender]: (prev[sender] || 0) + 1 };
//         localStorage.setItem("unreadMessages", JSON.stringify(upd));
//         return upd;
//       });
//     }

//     // reorder list: bring this user to top
//     setUsers((prev) => {
//       const exists = prev.find((u) => u.phone === other);
//       if (exists) {
//         const filtered = prev.filter((u) => u.phone !== other);
//         return [exists, ...filtered];
//       } else {
//         // unknown => create minimal user & add to unknownContacts
//         addUnknownContactToDB(other);
//         return prev;
//       }
//     });

//     // also if unknown and I receive it, ensure unknownContacts state has it
//     if (receiver === currentUser) {
//       const isSaved = users.some((u) => u.phone === sender);
//       const isUnknown = unknownContacts.some((c) => c.contactPhone === sender);
//       if (!isSaved && !isUnknown) {
//         addUnknownContactToDB(sender);
//       }
//     }
//   };

//   // === socket setup ===
//   useEffect(() => {
//     socket.on("receiveMessage", handleNewMessage);
//     return () => socket.off("receiveMessage");
//   }, [activeIndex, users, unknownContacts]);

//   // === handlers ===
//   const handleClick = (user) => {
//     setActiveIndex(user.phone);
//     // clear unread
//     setUnreadMessages((prev) => {
//       const upd = { ...prev };
//       delete upd[user.phone];
//       localStorage.setItem("unreadMessages", JSON.stringify(upd));
//       return upd;
//     });
//     onSelectUser(user);
//   };
//   const handleSearchChange = (e) => setSearchQuery(e.target.value);
//   const handleImageClick = (e, url) => { e.stopPropagation(); setOverlayImage(url); };
//   const closeOverlay = () => setOverlayImage(null);

//   // === combine saved + unknown for display ===
//   // const allContacts = [
//   //   ...users,
//   //   ...unknownContacts
//   //     .filter((u) => !users.find((s) => s.phone === u.contactPhone))
//   //     .map((c) => ({
//   //       phone: c.contactPhone,
//   //       username: c.contactUsername,
//   //       contactUsername: c.contactUsername,
//   //       profilePicture: "/default-profile.png",
//   //     })),
//   // ];

//   const seen = new Set();
//   const allContacts = [
//     ...users,
//     ...unknownContacts
//       .filter((unk) => {
//         const key = unk.contactPhone;
//         if (seen.has(key) || users.some((usr) => usr.phone === key)) return false;
//         seen.add(key);
//         return true;
//       })
//       .map((contact) => ({
//         phone: contact.contactPhone,
//         username: contact.contactUsername,
//         contactUsername: contact.contactUsername,
//         profilePicture: "/default-profile.png",
//       })),
//   ];

//   const filtered = allContacts.filter((u) =>
//     u.contactUsername?.toLowerCase()?.includes(searchQuery.toLowerCase())
//   );

//   // console.log(filtered)

//   return (
//     <>
//       <div className={`w-full h-full bg-gray-50 border-r overflow-y-auto ${hideUserList ? "hidden" : ""}`}>
//         <div className="sticky top-0 bg-white p-4 shadow">
//           <h2 className="text-xl font-semibold">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 w-full p-2 border rounded focus:ring"
//           />
//         </div>
//         <ul className="p-2">
//           {filtered.map((user) => (
//             <li
//               key={user.phone}
//               className={`flex items-center p-3 mb-2 rounded cursor-pointer hover:bg-blue-50 ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"
//                 }`}
//               onClick={() => handleClick(user)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture || "default-profile.png"}`}
//                 alt="Profile"
//                 className="h-10 w-10 rounded-full mr-3 object-cover"
//                 onClick={(e) =>
//                   handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)
//                 }
//               />
//               <div className="flex-1">
//                 <p className="font-bold capitalize">
//                   {loggedInUser?.phone === user.phone
//                     ? "You"
//                     : user.contactUsername || user.username}
//                 </p>
//                 <p className="text-sm text-gray-600 truncate">
//                   {latestMessages[user.phone]?.slice(0, 20) || ""}
//                   {latestMessages[user.phone]?.length > 20 && "..."}
//                 </p>
//               </div>
//               {unreadMessages[user.phone] > 0 && (
//                 <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                   {unreadMessages[user.phone]}
//                 </span>
//               )}
//               {/* delete button for unknown */}
//               {user.profilePicture === "/default-profile.png" && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteUnknownContact(user.phone);
//                   }}
//                   className="ml-3 px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
//                 >
//                   Delete
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>

//         {overlayImage && (
//           <>
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//               onClick={closeOverlay}
//             >
//               <img src={overlayImage} className="max-h-[90%] max-w-[90%]" />
//             </div>
//             <AiOutlineClose
//               className="fixed top-5 right-5 text-white text-2xl z-60 cursor-pointer"
//               onClick={closeOverlay}
//             />
//           </>
//         )}
//       </div>

//       <div className="flex-1">
//         <UserDetails user={selectedUser} closeOverlayProfile={() => setSelectedUser(null)} />
//       </div>
//     </>
//   );
// };

// export default UserList;


// not show top new message civey


// import React, { useEffect, useRef, useState } from "react";
// import UserDetails from "./UserDetails";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import io from "socket.io-client";
// import { AiOutlineClose } from "react-icons/ai";

// const socket = io("http://localhost:5000");

// const UserList = ({ onSelectUser, onCloseUserList, hideUserList, onClearChat }) => {
//   // === state ===
//   const [users, setUsers] = useState([]);                  // saved contacts
//   const [unknownContacts, setUnknownContacts] = useState([]); // unsaved
//   const [latestMessages, setLatestMessages] = useState({});
//   const [unreadMessages, setUnreadMessages] = useState({});
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [overlayImage, setOverlayImage] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   // === fetch logged in user ===
//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const res = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//         if (!res.ok) throw new Error(res.statusText);
//         const { user } = await res.json();
//         setLoggedInUser(user);
//       } catch (err) {
//         console.error("Error fetching logged-in user:", err);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // === fetch saved & unknown contacts ===
//   useEffect(() => {
//     if (!loggedInUser) return;
//     const fetchContacts = async () => {
//       try {
//         // 1) contacts endpoint returns both saved and unknown
//         const res = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//         if (!res.ok) throw new Error(res.statusText);
//         const { contacts, unknownContacts: unk } = await res.json();
//         setUnknownContacts(unk || []);
//         // 2) fetch all registered users, filter to your saved
//         const allRes = await fetch("http://localhost:5000/api/register");
//         if (!allRes.ok) throw new Error(allRes.statusText);
//         const { users: allUsers } = await allRes.json();

//         const contactMap = {};
//         contacts.forEach((c) => {
//           contactMap[c.contactPhone] = c.contactUsername;
//         });
//         const phoneList = contacts.map((c) => c.contactPhone);

//         const saved = allUsers
//           .filter((u) => phoneList.includes(u.phone))
//           .map((u) => ({
//             ...u,
//             contactUsername: contactMap[u.phone],
//           }));

//         setUsers(saved);
//       } catch (err) {
//         console.error("Error fetching contacts:", err);
//       }
//     };
//     fetchContacts();
//   }, [loggedInUser]);

//   // === fetch latest messages for saved users ===
//   useEffect(() => {
//     const fetchLatest = async () => {
//       const storedUsername = localStorage.getItem("username");
//       const lm = {};
//       for (let u of users) {
//         try {
//           const res = await fetch(
//             `http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${u.phone}`
//           );
//           if (!res.ok) throw new Error(res.statusText);
//           const { message } = await res.json();
//           lm[u.phone] = message;
//         } catch (err) {
//           console.error(err);
//         }
//       }
//       setLatestMessages(lm);
//     };
//     if (users.length) fetchLatest();
//   }, [users]);

//   // === load unread from localStorage ===
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("unreadMessages"));
//     if (stored) setUnreadMessages(stored);
//   }, []);

//   // === helper: add unknown to DB & state ===
//   const addUnknownContactToDB = async (phone) => {
//     if (!loggedInUser) return;
//     try {
//       const res = await fetch("http://localhost:5000/api/addunknowncontact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone: phone,
//           contactUsername: phone,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         // server returns new unknownContacts array or single
//         const toAppend = data.unknownContacts || [{ contactPhone: phone, contactUsername: phone }];
//         setUnknownContacts((prev) => [...prev, ...toAppend]);
//       } else {
//         console.error("Add unknown failed:", data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // === helper: remove unknown both DB & state ===
//   const handleDeleteUnknownContact = async (contactPhone) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/removeunknowncontact", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setUnknownContacts((prev) =>
//           prev.filter((c) => c.contactPhone !== contactPhone)
//         );
//         if (onClearChat) onClearChat();
//         navigate('/chat');
//       } else {
//         console.error("Delete unknown failed:", data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // === handle incoming socket message ===
//   const handleNewMessage = ({ sender, receiver, message }) => {
//     const currentUser = localStorage.getItem("username");
//     const other = sender === currentUser ? receiver : sender;

//     // update latestMessages
//     setLatestMessages((prev) => ({ ...prev, [other]: message }));

//     // unread badge if I'm receiver and chat not active
//     if (receiver === currentUser && activeIndex !== sender) {
//       setUnreadMessages((prev) => {
//         const upd = { ...prev, [sender]: (prev[sender] || 0) + 1 };
//         localStorage.setItem("unreadMessages", JSON.stringify(upd));
//         return upd;
//       });
//     }

//     // reorder list: bring this user to top
//     setUsers((prev) => {
//       const exists = prev.find((u) => u.phone === other);
//       if (exists) {
//         const filtered = prev.filter((u) => u.phone !== other);
//         return [exists, ...filtered];
//       } else {
//         // unknown => create minimal user & add to unknownContacts
//         addUnknownContactToDB(other);
//         return prev;
//       }
//     });

//     // also if unknown and I receive it, ensure unknownContacts state has it
//     if (receiver === currentUser) {
//       const isSaved = users.some((u) => u.phone === sender);
//       const isUnknown = unknownContacts.some((c) => c.contactPhone === sender);
//       if (!isSaved && !isUnknown) {
//         addUnknownContactToDB(sender);
//       }
//     }
//   };

//   // === socket setup ===
//   useEffect(() => {
//     socket.on("receiveMessage", handleNewMessage);
//     return () => socket.off("receiveMessage");
//   }, [activeIndex, users, unknownContacts]);

//   // === handlers ===
//   const handleClick = (user) => {
//     setActiveIndex(user.phone);
//     // clear unread
//     setUnreadMessages((prev) => {
//       const upd = { ...prev };
//       delete upd[user.phone];
//       localStorage.setItem("unreadMessages", JSON.stringify(upd));
//       return upd;
//     });
//     onSelectUser(user);
//   };
//   const handleSearchChange = (e) => setSearchQuery(e.target.value);
//   const handleImageClick = (e, url) => { e.stopPropagation(); setOverlayImage(url); };
//   const closeOverlay = () => setOverlayImage(null);

//   // === combine saved + unknown for display ===
//   // const allContacts = [
//   //   ...users,
//   //   ...unknownContacts
//   //     .filter((u) => !users.find((s) => s.phone === u.contactPhone))
//   //     .map((c) => ({
//   //       phone: c.contactPhone,
//   //       username: c.contactUsername,
//   //       contactUsername: c.contactUsername,
//   //       profilePicture: "/default-profile.png",
//   //     })),
//   // ];

//   const seen = new Set();
//   const allContacts = [
//     ...users,
//     ...unknownContacts
//       .filter((unk) => {
//         const key = unk.contactPhone;
//         if (seen.has(key) || users.some((usr) => usr.phone === key)) return false;
//         seen.add(key);
//         return true;
//       })
//       .map((contact) => ({
//         phone: contact.contactPhone,
//         username: contact.contactUsername,
//         contactUsername: contact.contactUsername,
//         profilePicture: "/default-profile.png",
//       })),
//   ];

//   const filtered = allContacts.filter((u) =>
//     u.contactUsername?.toLowerCase()?.includes(searchQuery.toLowerCase())
//   );

//   // console.log(filtered)

//   return (
//     <>
//       <div className={`w-full h-full bg-gray-50 border-r overflow-y-auto ${hideUserList ? "hidden" : ""}`}>
//         <div className="sticky top-0 bg-white p-4 shadow">
//           <h2 className="text-xl font-semibold">Chat</h2>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="mt-2 w-full p-2 border rounded focus:ring"
//           />
//         </div>
//         <ul className="p-2">
//           {filtered.map((user) => (
//             <li
//               key={user.phone}
//               className={`flex items-center p-3 mb-2 rounded cursor-pointer hover:bg-blue-50 ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"
//                 }`}
//               onClick={() => handleClick(user)}
//             >
//               <img
//                 src={`http://localhost:5000/${user.profilePicture || "default-profile.png"}`}
//                 alt="Profile"
//                 className="h-10 w-10 rounded-full mr-3 object-cover"
//                 onClick={(e) =>
//                   handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)
//                 }
//               />
//               <div className="flex-1">
//                 <p className="font-bold capitalize">
//                   {loggedInUser?.phone === user.phone
//                     ? "You"
//                     : user.contactUsername || user.username}
//                 </p>
//                 <p className="text-sm text-gray-600 truncate">
//                   {latestMessages[user.phone]?.slice(0, 20) || ""}
//                   {latestMessages[user.phone]?.length > 20 && "..."}
//                 </p>
//               </div>
//               {unreadMessages[user.phone] > 0 && (
//                 <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
//                   {unreadMessages[user.phone]}
//                 </span>
//               )}
//               {/* delete button for unknown */}
//               {user.profilePicture === "/default-profile.png" && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteUnknownContact(user.phone);
//                   }}
//                   className="ml-3 px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
//                 >
//                   Delete
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>

//         {overlayImage && (
//           <>
//             <div
//               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//               onClick={closeOverlay}
//             >
//               <img src={overlayImage} className="max-h-[90%] max-w-[90%]" />
//             </div>
//             <AiOutlineClose
//               className="fixed top-5 right-5 text-white text-2xl z-60 cursor-pointer"
//               onClick={closeOverlay}
//             />
//           </>
//         )}
//       </div>

//       <div className="flex-1">
//         <UserDetails user={selectedUser} closeOverlayProfile={() => setSelectedUser(null)} />
//       </div>
//     </>
//   );
// };

// export default UserList;



import React, { useEffect, useRef, useState } from "react";
import UserDetails from "./UserDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiChat } from "../actions/chatAction";
import io from "socket.io-client";
import { AiOutlineClose } from "react-icons/ai";

const socket = io("http://localhost:5000");

const UserList = ({ onSelectUser, onCloseUserList, hideUserList, onClearChat }) => {
  // === state ===
  const [users, setUsers] = useState([]);                  // saved contacts
  const [unknownContacts, setUnknownContacts] = useState([]); // unsaved
  const [latestMessages, setLatestMessages] = useState({});
  const [unreadMessages, setUnreadMessages] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [overlayImage, setOverlayImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

  // === fetch logged in user ===
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const res = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
        if (!res.ok) throw new Error(res.statusText);
        const { user } = await res.json();
        setLoggedInUser(user);
      } catch (err) {
        console.error("Error fetching logged-in user:", err);
      }
    };
    fetchLoggedInUser();
  }, []);

  // === fetch saved & unknown contacts ===
  useEffect(() => {
    if (!loggedInUser) return;
    const fetchContacts = async () => {
      try {
        // 1) contacts endpoint returns both saved and unknown
        const res = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
        if (!res.ok) throw new Error(res.statusText);
        const { contacts, unknownContacts: unk } = await res.json();
        setUnknownContacts(unk || []);
        // 2) fetch all registered users, filter to your saved
        const allRes = await fetch("http://localhost:5000/api/register");
        if (!allRes.ok) throw new Error(allRes.statusText);
        const { users: allUsers } = await allRes.json();

        const contactMap = {};
        contacts.forEach((c) => {
          contactMap[c.contactPhone] = c.contactUsername;
        });
        const phoneList = contacts.map((c) => c.contactPhone);

        // const saved = allUsers
        //   .filter((u) => phoneList.includes(u.phone))
        //   .map((u) => ({
        //     ...u,
        //     contactUsername: contactMap[u.phone],
        //   }));


        const saved = allUsers
          // only keep your saved numbers
          .filter(u => phoneList.includes(u.phone))
          // sort by their position in phoneList (DB‑persisted order)
          .sort((a, b) => phoneList.indexOf(a.phone) - phoneList.indexOf(b.phone))
          // then map to include your custom name
          .map(u => ({
            ...u,
            contactUsername: contactMap[u.phone],
          }));

        setUsers(saved);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, [loggedInUser]);

  // === fetch latest messages for saved users ===
  // useEffect(() => {
  const fetchLatest = async () => {
    const storedUsername = localStorage.getItem("username");
    const lm = {};
    // Combine phones of saved and unknown contacts
    const contactPhones = [
      ...users.map((u) => u.phone),
      ...unknownContacts.map((c) => c.contactPhone),
    ];
    const uniquePhones = Array.from(new Set(contactPhones));

    for (let phone of uniquePhones) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${phone}`
        );
        if (!res.ok) throw new Error(res.statusText);
        const { displayMessage } = await res.json();
        lm[phone] = displayMessage;
      } catch (err) {
        console.error(`Error fetching latest for ${phone}:`, err);
        lm[phone] = "";
      }
    }
    setLatestMessages(lm);
  };
  //   if (users.length) fetchLatest();
  // }, [users]);

  // ← CHANGED: run once on mount and whenever `users` changes
  useEffect(() => {
    if (users.length || unknownContacts.length) {
      fetchLatest();
    }
  }, [users, unknownContacts]);

  // ← CHANGED: listen for deletions and re-fetch immediately
  useEffect(() => {
    const handleDeleted = () => {
      if (users.length) fetchLatest();
    };
    socket.on("messageDeleted", handleDeleted);
    return () => {
      socket.off("messageDeleted", handleDeleted);
    };
  }, [users]);

  // === load unread from localStorage ===
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("unreadMessages"));
    if (stored) setUnreadMessages(stored);
  }, []);

  // === helper: add unknown to DB & state ===
  const addUnknownContactToDB = async (phone) => {
    if (!loggedInUser) return;
    try {
      const res = await fetch("http://localhost:5000/api/addunknowncontact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: loggedInUser.phone,
          contactPhone: phone,
          contactUsername: phone,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // server returns new unknownContacts array or single
        const toAppend = data.unknownContacts || [{ contactPhone: phone, contactUsername: phone }];
        setUnknownContacts((prev) => [...prev, ...toAppend]);
      } else {
        console.error("Add unknown failed:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // === helper: remove unknown both DB & state ===
  const handleDeleteUnknownContact = async (contactPhone) => {
    try {
      const res = await fetch("http://localhost:5000/api/removeunknowncontact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
      });
      const data = await res.json();
      if (res.ok) {
        setUnknownContacts((prev) =>
          prev.filter((c) => c.contactPhone !== contactPhone)
        );
        if (onClearChat) onClearChat();
        navigate('/chat');
      } else {
        console.error("Delete unknown failed:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // === handle incoming socket message ===
  const handleNewMessage = ({ sender, receiver, message }) => {
    const currentUser = localStorage.getItem("username");
    const other = sender === currentUser ? receiver : sender;

    // update latestMessages
    setLatestMessages((prev) => ({ ...prev, [other]: message }));

    // unread badge if I'm receiver and chat not active
    if (receiver === currentUser && activeIndex !== sender) {
      setUnreadMessages((prev) => {
        const upd = { ...prev, [sender]: (prev[sender] || 0) + 1 };
        localStorage.setItem("unreadMessages", JSON.stringify(upd));
        return upd;
      });
    }

    // reorder list: bring this user to top
    setUsers((prev) => {
      const exists = prev.find((u) => u.phone === other);
      if (exists) {
        const filtered = prev.filter((u) => u.phone !== other);
        return [exists, ...filtered];
      } else {
        // unknown => create minimal user & add to unknownContacts
        addUnknownContactToDB(other);
        return prev;
      }
    });

    // also if unknown and I receive it, ensure unknownContacts state has it
    if (receiver === currentUser) {
      const isSaved = users.some((u) => u.phone === sender);
      const isUnknown = unknownContacts.some((c) => c.contactPhone === sender);
      if (!isSaved && !isUnknown) {
        addUnknownContactToDB(sender);
      }
    }
  };

  // === socket setup ===
  useEffect(() => {
    socket.on("receiveMessage", handleNewMessage);
    return () => socket.off("receiveMessage");
  }, [activeIndex, users, unknownContacts]);

  // === handlers ===
  const handleClick = (user) => {
    setActiveIndex(user.phone);
    // clear unread
    setUnreadMessages((prev) => {
      const upd = { ...prev };
      delete upd[user.phone];
      localStorage.setItem("unreadMessages", JSON.stringify(upd));
      return upd;
    });
    onSelectUser(user);
  };
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleImageClick = (e, url) => { e.stopPropagation(); setOverlayImage(url); };
  const closeOverlay = () => setOverlayImage(null);

  // === combine saved + unknown for display ===
  // const allContacts = [
  //   ...users,
  //   ...unknownContacts
  //     .filter((u) => !users.find((s) => s.phone === u.contactPhone))
  //     .map((c) => ({
  //       phone: c.contactPhone,
  //       username: c.contactUsername,
  //       contactUsername: c.contactUsername,
  //       profilePicture: "/default-profile.png",
  //     })),
  // ];

  const seen = new Set();
  const allContacts = [
    ...users,
    ...unknownContacts
      .filter((unk) => {
        const key = unk.contactPhone;
        if (seen.has(key) || users.some((usr) => usr.phone === key)) return false;
        seen.add(key);
        return true;
      })
      .map((contact) => ({
        phone: contact.contactPhone,
        username: contact.contactUsername,
        contactUsername: contact.contactUsername,
        profilePicture: "/default-profile.png",
      })),
  ];

  const filtered = allContacts.filter((u) =>
    u.contactUsername?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  // console.log(filtered)


  // const getPreview = (phone) => {
  //   const maxLen = unreadMessages[phone] > 0 ? 15 : 18;
  //   const msg = latestMessages[phone] || "";
  //   return msg.slice(0, maxLen) + (msg.length > maxLen ? "..." : "");
  // };

  return (
    <>
      <div className={`[&::-webkit-scrollbar]:w-0.5
    [&::-webkit-scrollbar-track]:bg-gray-300
    [&::-webkit-scrollbar-thumb]:bg-gray-400
    [&::-webkit-scrollbar-thumb]:rounded-full w-full h-full bg-gray-50 overflow-y-auto ${hideUserList ? "hidden" : ""}`}>
        {/* border-r       // if see right border then add above */}
        <div className="sticky top-0 bg-white p-4 shadow">
          <h2 className="text-xl font-semibold">Chat</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mt-2 w-full p-2 border rounded focus:ring"
          />
        </div>
        <ul className="p-2">
          {filtered.map((user) => (
            <li
              key={user.phone}
              className={`flex items-center p-3 mb-2 rounded cursor-pointer hover:bg-blue-50 ${activeIndex === user.phone ? "bg-blue-100" : "bg-white"
                }`}
              onClick={() => handleClick(user)}
            >
              <img
                src={`http://localhost:5000/${user.profilePicture || "default-profile.png"}`}
                alt="Profile"
                className="h-10 w-10 rounded-full mr-3 object-cover"
                onClick={(e) =>
                  handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)
                }
              />
              <div className="flex-1">
                <p className="font-bold capitalize">
                  {loggedInUser?.phone === user.phone
                    ? "You"
                    : user.contactUsername || user.username}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {latestMessages[user.phone]?.slice(0, 15) || ""}
                  {latestMessages[user.phone]?.length > 15 && "..."}
                  {/* {getPreview(user.phone)} */}
                </p>
              </div>
              {unreadMessages[user.phone] > 0 && (
                <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadMessages[user.phone]}
                </span>
              )}
              {/* delete button for unknown */}
              {user.profilePicture === "/default-profile.png" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUnknownContact(user.phone);
                  }}
                  className="ml-3 px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>

        {overlayImage && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={closeOverlay}
            >
              <img src={overlayImage} className="max-h-[90%] max-w-[90%]" />
            </div>
            <AiOutlineClose
              className="fixed top-5 right-5 text-white text-2xl z-60 cursor-pointer"
              onClick={closeOverlay}
            />
          </>
        )}
      </div>

      <div className="flex-1">
        <UserDetails user={selectedUser} closeOverlayProfile={() => setSelectedUser(null)} />
      </div>
    </>
  );
};

export default UserList;
