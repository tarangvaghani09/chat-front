// // // // // // // // // // // // // // // // // // // // // Chat.js
// // // // // // // // // // // // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // // // // // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // // // // // // // // // // // // // // import io from 'socket.io-client';

// // // // // // // // // // // // // // // // // // // // const socket = io('http://localhost:5000');

// // // // // // // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // // // // // // // // // // // // //     const [user, setUser] = useState('');
// // // // // // // // // // // // // // // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null);
// // // // // // // // // // // // // // // // // // // //     const [selectedUser, setSelectedUser] = useState('');
// // // // // // // // // // // // // // // // // // // //     const dispatch = useDispatch();
// // // // // // // // // // // // // // // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // // // // // // // // //     const chatContainerRef = useRef(null);

// // // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // // // // //         if (storedUsername) {
// // // // // // // // // // // // // // // // // // // //             setUser(storedUsername);
// // // // // // // // // // // // // // // // // // // //             socket.emit('userConnected', storedUsername);
// // // // // // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // // // // // //         dispatch(fetchChats());

// // // // // // // // // // // // // // // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // // // // // // // // // // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // // // // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // // // // //             socket.off('receiveMessage');
// // // // // // // // // // // // // // // // // // // //             socket.off('messageDeleted');
// // // // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // // // //     }, [dispatch]);

// // // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // // // // //     }, [chats]);

// // // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // // // // //     const scrollToBottom = () => {
// // // // // // // // // // // // // // // // // // // //         if (chatContainerRef.current) {
// // // // // // // // // // // // // // // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // // //         const handleClickOutside = (event) => {
// // // // // // // // // // // // // // // // // // // //             if (!event.target.closest('.chat-message')) {
// // // // // // // // // // // // // // // // // // // //                 setSelectedMessageId(null);
// // // // // // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // // // // // //         document.addEventListener('click', handleClickOutside);

// // // // // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // // // // //             document.removeEventListener('click', handleClickOutside);
// // // // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // // // // //     const sendMessage = () => {
// // // // // // // // // // // // // // // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // // // // //         const chat = {
// // // // // // // // // // // // // // // // // // // //             message,
// // // // // // // // // // // // // // // // // // // //             sender: actualUsername,
// // // // // // // // // // // // // // // // // // // //             senderIsSelf: true
// // // // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // // // //         socket.emit('sendMessage', chat);
// // // // // // // // // // // // // // // // // // // //         setMessage('');
// // // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // // // // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // // // // // // // // // // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // // //     const handleToggleOptions = (id) => {
// // // // // // // // // // // // // // // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // // // // // // // //         <div className="chat-container">
// // // // // // // // // // // // // // // // // // // //             <h1>Chat App</h1>
// // // // // // // // // // // // // // // // // // // //             {loading && <p>Loading...</p>}
// // // // // // // // // // // // // // // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // // // // // // // // // // // // // // //             <div
// // // // // // // // // // // // // // // // // // // //                 className="chat-messages"
// // // // // // // // // // // // // // // // // // // //                 ref={chatContainerRef}
// // // // // // // // // // // // // // // // // // // //                 onScroll={() => {
// // // // // // // // // // // // // // // // // // // //                     const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
// // // // // // // // // // // // // // // // // // // //                     if (scrollTop === 0) {
// // // // // // // // // // // // // // // // // // // //                         console.log('Load more messages...');
// // // // // // // // // // // // // // // // // // // //                         // Implement logic to load more messages if needed
// // // // // // // // // // // // // // // // // // // //                     }
// // // // // // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // // // // // // // // // // // // // //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)}style={{cursor:"pointer"}}>
// // // // // // // // // // // // // // // // // // // //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}
// // // // // // // // // // // // // // // // // // // //                             <span className="options-indicator">
// // // // // // // // // // // // // // // // // // // //                                 ↓
// // // // // // // // // // // // // // // // // // // //                             </span>
// // // // // // // // // // // // // // // // // // // //                         </p>
// // // // // // // // // // // // // // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // // // // // // // // // // // // // //                             <div className="options">
// // // // // // // // // // // // // // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // // // // // // // // // // // // // //                                 {chat.sender === user && (
// // // // // // // // // // // // // // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // // // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // // // // // // //                         )}
// // // // // // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // //             <div className="chat-input">
// // // // // // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // // // // // //                     type="text"
// // // // // // // // // // // // // // // // // // // //                     value={message}
// // // // // // // // // // // // // // // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // // // //                 <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // export default Chat;




// // // // // // // // // // // // // // // // // // // //delte button ot work for receiver

// // // // // // // // // // // // // // // // // // // // Chat.js
// // // // // // // // // // // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // // // // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // // // // // import io from 'socket.io-client';

// // // // // // // // // // // // // // // // // // // const socket = io('http://localhost:5000');

// // // // // // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // // // // // // // // // // // //     const [user, setUser] = useState('');
// // // // // // // // // // // // // // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null);
// // // // // // // // // // // // // // // // // // //     const [selectedUser, setSelectedUser] = useState('');
// // // // // // // // // // // // // // // // // // //     const dispatch = useDispatch();
// // // // // // // // // // // // // // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // // // // // // // //     const chatContainerRef = useRef(null);

// // // // // // // // // // // // // // // // // // //     const navigate = useNavigate();

// // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // // // //         if (storedUsername) {
// // // // // // // // // // // // // // // // // // //             setUser(storedUsername);
// // // // // // // // // // // // // // // // // // //             socket.emit('userConnected', storedUsername);
// // // // // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // // // // //         dispatch(fetchChats(navigate));

// // // // // // // // // // // // // // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // // // // // // // // // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // // // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // // // //             socket.off('receiveMessage');
// // // // // // // // // // // // // // // // // // //             socket.off('messageDeleted');
// // // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // // //     }, [dispatch,navigate]);

// // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // // // //     }, [chats]);

// // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // // // //     const scrollToBottom = () => {
// // // // // // // // // // // // // // // // // // //         if (chatContainerRef.current) {
// // // // // // // // // // // // // // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // // //         const handleClickOutside = (event) => {
// // // // // // // // // // // // // // // // // // //             if (!event.target.closest('.chat-message')) {
// // // // // // // // // // // // // // // // // // //                 setSelectedMessageId(null);
// // // // // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // // // // //         document.addEventListener('click', handleClickOutside);

// // // // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // // // //             document.removeEventListener('click', handleClickOutside);
// // // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // // // //     const sendMessage = () => {
// // // // // // // // // // // // // // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // // // //         const chat = {
// // // // // // // // // // // // // // // // // // //             message,
// // // // // // // // // // // // // // // // // // //             sender: actualUsername,
// // // // // // // // // // // // // // // // // // //             senderIsSelf: true
// // // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // // //         socket.emit('sendMessage', chat);
// // // // // // // // // // // // // // // // // // //         setMessage('');
// // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // // // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // // // // // // // // // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // //     const handleToggleOptions = (id) => {
// // // // // // // // // // // // // // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // // // // // // //         <div className="chat-container">
// // // // // // // // // // // // // // // // // // //             <h1>Chat App</h1>
// // // // // // // // // // // // // // // // // // //             {loading && <p>Loading...</p>}
// // // // // // // // // // // // // // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // // // // // // // // // // // // // //             <div
// // // // // // // // // // // // // // // // // // //                 className="chat-messages"
// // // // // // // // // // // // // // // // // // //                 ref={chatContainerRef}
// // // // // // // // // // // // // // // // // // //                 onScroll={() => {
// // // // // // // // // // // // // // // // // // //                     const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
// // // // // // // // // // // // // // // // // // //                     if (scrollTop === 0) {
// // // // // // // // // // // // // // // // // // //                         console.log('Load more messages...');
// // // // // // // // // // // // // // // // // // //                         // Implement logic to load more messages if needed
// // // // // // // // // // // // // // // // // // //                     }
// // // // // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // // // // // // // // // // // // //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)}style={{cursor:"pointer"}}>
// // // // // // // // // // // // // // // // // // //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}
// // // // // // // // // // // // // // // // // // //                             {/* <span className="options-indicator">
// // // // // // // // // // // // // // // // // // //                                 ↓
// // // // // // // // // // // // // // // // // // //                             </span> */}
// // // // // // // // // // // // // // // // // // //                         </p>
// // // // // // // // // // // // // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // // // // // // // // // // // // //                             <div className="options">
// // // // // // // // // // // // // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // // // // // // // // // // // // //                                 {chat.sender === user && (
// // // // // // // // // // // // // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // // // // // //                         )}
// // // // // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // //             <div className="chat-input">
// // // // // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // // // // //                     type="text"
// // // // // // // // // // // // // // // // // // //                     value={message}
// // // // // // // // // // // // // // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // // //                 <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // export default Chat;



// // // // // // // // // // // // // // // // // // // not see select image name

// // // // // // // // // // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // // // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // // // // import io from 'socket.io-client';
// // // // // // // // // // // // // // // // // // import { FaPaperclip } from 'react-icons/fa'; // Import an icon from react-icons

// // // // // // // // // // // // // // // // // // const socket = io('http://localhost:5000');

// // // // // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // // // // // // // // // // //     const [user, setUser] = useState('');
// // // // // // // // // // // // // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null);
// // // // // // // // // // // // // // // // // //     const [selectedImage, setSelectedImage] = useState(null); // State for selected image
// // // // // // // // // // // // // // // // // //     const dispatch = useDispatch();
// // // // // // // // // // // // // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // // // // // // //     const chatContainerRef = useRef(null);
// // // // // // // // // // // // // // // // // //     const imageInputRef = useRef(null); // Ref for image input

// // // // // // // // // // // // // // // // // //     const navigate = useNavigate();

// // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // // //         if (storedUsername) {
// // // // // // // // // // // // // // // // // //             setUser(storedUsername);
// // // // // // // // // // // // // // // // // //             socket.emit('userConnected', storedUsername);
// // // // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // // // //         dispatch(fetchChats(navigate));

// // // // // // // // // // // // // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // // // // // // // // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // // //             socket.off('receiveMessage');
// // // // // // // // // // // // // // // // // //             socket.off('messageDeleted');
// // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // //     }, [dispatch, navigate]);

// // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // // //     }, [chats]);

// // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // // //     const scrollToBottom = () => {
// // // // // // // // // // // // // // // // // //         if (chatContainerRef.current) {
// // // // // // // // // // // // // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // // //         const handleClickOutside = (event) => {
// // // // // // // // // // // // // // // // // //             if (!event.target.closest('.chat-message')) {
// // // // // // // // // // // // // // // // // //                 setSelectedMessageId(null);
// // // // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // // // //         document.addEventListener('click', handleClickOutside);

// // // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // // //             document.removeEventListener('click', handleClickOutside);
// // // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // // //     const sendMessage = async () => {
// // // // // // // // // // // // // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // // //         const chat = {
// // // // // // // // // // // // // // // // // //             message,
// // // // // // // // // // // // // // // // // //             sender: actualUsername,
// // // // // // // // // // // // // // // // // //             senderIsSelf: true,
// // // // // // // // // // // // // // // // // //             image: null
// // // // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // // // //         if (selectedImage) {
// // // // // // // // // // // // // // // // // //             const formData = new FormData();
// // // // // // // // // // // // // // // // // //             formData.append('image', selectedImage);
// // // // // // // // // // // // // // // // // //             const response = await fetch('http://localhost:5000/upload', {
// // // // // // // // // // // // // // // // // //                 method: 'POST',
// // // // // // // // // // // // // // // // // //                 body: formData
// // // // // // // // // // // // // // // // // //             });
// // // // // // // // // // // // // // // // // //             const data = await response.json();
// // // // // // // // // // // // // // // // // //             chat.image = data.imageUrl; // Assuming the backend returns the URL of the uploaded image
// // // // // // // // // // // // // // // // // //             setSelectedImage(null); // Reset the selected image
// // // // // // // // // // // // // // // // // //             if (imageInputRef.current) {
// // // // // // // // // // // // // // // // // //                 imageInputRef.current.value = ''; // Clear the file input value
// // // // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // // // //         socket.emit('sendMessage', chat);
// // // // // // // // // // // // // // // // // //         setMessage('');
// // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // // // // // // // // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // //     const handleToggleOptions = (id) => {
// // // // // // // // // // // // // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // //     const handleImageChange = (e) => {
// // // // // // // // // // // // // // // // // //         setSelectedImage(e.target.files[0]);
// // // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // // // // // //         <div className="chat-container">
// // // // // // // // // // // // // // // // // //             <h1>Chat App</h1>
// // // // // // // // // // // // // // // // // //             {loading && <p>Loading...</p>}
// // // // // // // // // // // // // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // // // // // // // // // // // // //             <div
// // // // // // // // // // // // // // // // // //                 className="chat-messages"
// // // // // // // // // // // // // // // // // //                 ref={chatContainerRef}
// // // // // // // // // // // // // // // // // //                 onScroll={() => {
// // // // // // // // // // // // // // // // // //                     const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
// // // // // // // // // // // // // // // // // //                     if (scrollTop === 0) {
// // // // // // // // // // // // // // // // // //                         console.log('Load more messages...');
// // // // // // // // // // // // // // // // // //                         // Implement logic to load more messages if needed
// // // // // // // // // // // // // // // // // //                     }
// // // // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // // // // // // // // // // // //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)} style={{ cursor: "pointer", position: "relative" }}>
// // // // // // // // // // // // // // // // // //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}</p>
// // // // // // // // // // // // // // // // // //                         {chat.image && <img src={chat.image} alt="Chat" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
// // // // // // // // // // // // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // // // // // // // // // // // //                             <div className="options">
// // // // // // // // // // // // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // // // // // // // // // // // //                                 {chat.sender === user && (
// // // // // // // // // // // // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // // // // //                         )}
// // // // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // //             <div className="chat-input">
// // // // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // // // //                     type="text"
// // // // // // // // // // // // // // // // // //                     placeholder='Message'
// // // // // // // // // // // // // // // // // //                     value={message}
// // // // // // // // // // // // // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // //                 <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // // // // // // // // //                     <FaPaperclip size={20} />
// // // // // // // // // // // // // // // // // //                 </label>
// // // // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // // // //                     id="file-upload"
// // // // // // // // // // // // // // // // // //                     type="file"
// // // // // // // // // // // // // // // // // //                     accept="image/*"
// // // // // // // // // // // // // // // // // //                     onChange={handleImageChange}
// // // // // // // // // // // // // // // // // //                     ref={imageInputRef} // Attach the ref to the input element
// // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // //                 <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // export default Chat;



// // // // // // // // // // // // // // // // // // NOT SEND IMAGE

// // // // // // // // // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // // // import io from 'socket.io-client';
// // // // // // // // // // // // // // // // // import { FaPaperclip } from 'react-icons/fa'; // Import an icon from react-icons

// // // // // // // // // // // // // // // // // const socket = io('http://localhost:5000');

// // // // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // // // // // // // // // //     const [user, setUser] = useState('');
// // // // // // // // // // // // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null);
// // // // // // // // // // // // // // // // //     const [selectedImage, setSelectedImage] = useState(null); // State for selected image
// // // // // // // // // // // // // // // // //     const dispatch = useDispatch();
// // // // // // // // // // // // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // // // // // //     const chatContainerRef = useRef(null);
// // // // // // // // // // // // // // // // //     const imageInputRef = useRef(null); // Ref for image input

// // // // // // // // // // // // // // // // //     const navigate = useNavigate();

// // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // //         if (storedUsername) {
// // // // // // // // // // // // // // // // //             setUser(storedUsername);
// // // // // // // // // // // // // // // // //             socket.emit('userConnected', storedUsername);
// // // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // // //         dispatch(fetchChats(navigate));

// // // // // // // // // // // // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // // // // // // // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // //             socket.off('receiveMessage');
// // // // // // // // // // // // // // // // //             socket.off('messageDeleted');
// // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // //     }, [dispatch, navigate]);

// // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // //     }, [chats]);

// // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // //     const scrollToBottom = () => {
// // // // // // // // // // // // // // // // //         if (chatContainerRef.current) {
// // // // // // // // // // // // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // // //         const handleClickOutside = (event) => {
// // // // // // // // // // // // // // // // //             if (!event.target.closest('.chat-message')) {
// // // // // // // // // // // // // // // // //                 setSelectedMessageId(null);
// // // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // // //         document.addEventListener('click', handleClickOutside);

// // // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // // //             document.removeEventListener('click', handleClickOutside);
// // // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // // //     const sendMessage = async () => {
// // // // // // // // // // // // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // // //         const chat = {
// // // // // // // // // // // // // // // // //             message,
// // // // // // // // // // // // // // // // //             sender: actualUsername,
// // // // // // // // // // // // // // // // //             senderIsSelf: true,
// // // // // // // // // // // // // // // // //             image: null
// // // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // // //         if (selectedImage) {
// // // // // // // // // // // // // // // // //             const formData = new FormData();
// // // // // // // // // // // // // // // // //             formData.append('image', selectedImage);
// // // // // // // // // // // // // // // // //             const response = await fetch('http://localhost:5000/upload', {
// // // // // // // // // // // // // // // // //                 method: 'POST',
// // // // // // // // // // // // // // // // //                 body: formData
// // // // // // // // // // // // // // // // //             });
// // // // // // // // // // // // // // // // //             const data = await response.json();
// // // // // // // // // // // // // // // // //             chat.image = data.imageUrl; // Assuming the backend returns the URL of the uploaded image
// // // // // // // // // // // // // // // // //             setSelectedImage(null); // Reset the selected image
// // // // // // // // // // // // // // // // //             if (imageInputRef.current) {
// // // // // // // // // // // // // // // // //                 imageInputRef.current.value = ''; // Clear the file input value
// // // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // // //         socket.emit('sendMessage', chat);
// // // // // // // // // // // // // // // // //         setMessage('');
// // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // // // // // // // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // //     const handleToggleOptions = (id) => {
// // // // // // // // // // // // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // //     const handleImageChange = (e) => {
// // // // // // // // // // // // // // // // //         const file = e.target.files[0];
// // // // // // // // // // // // // // // // //         setSelectedImage(file);
// // // // // // // // // // // // // // // // //         if (file) {
// // // // // // // // // // // // // // // // //             setMessage(`Image: ${file.name}`);
// // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // // // // //         <div className="chat-container">
// // // // // // // // // // // // // // // // //             <h1>Chat App</h1>
// // // // // // // // // // // // // // // // //             {loading && <p>Loading...</p>}
// // // // // // // // // // // // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // // // // // // // // // // // //             <div
// // // // // // // // // // // // // // // // //                 className="chat-messages"
// // // // // // // // // // // // // // // // //                 ref={chatContainerRef}
// // // // // // // // // // // // // // // // //                 onScroll={() => {
// // // // // // // // // // // // // // // // //                     const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
// // // // // // // // // // // // // // // // //                     if (scrollTop === 0) {
// // // // // // // // // // // // // // // // //                         console.log('Load more messages...');
// // // // // // // // // // // // // // // // //                         // Implement logic to load more messages if needed
// // // // // // // // // // // // // // // // //                     }
// // // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // // // // // // // // // // //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)} style={{ cursor: "pointer", position: "relative" }}>
// // // // // // // // // // // // // // // // //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}</p>
// // // // // // // // // // // // // // // // //                         {chat.image && <img src={chat.image} alt="Chat" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
// // // // // // // // // // // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // // // // // // // // // // //                             <div className="options">
// // // // // // // // // // // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // // // // // // // // // // //                                 {chat.sender === user && (
// // // // // // // // // // // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // // // //                         )}
// // // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //             <div className="chat-input">
// // // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // // //                     type="text"
// // // // // // // // // // // // // // // // //                     placeholder='Message'
// // // // // // // // // // // // // // // // //                     value={message}
// // // // // // // // // // // // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // //                 <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // // // // // // // //                     <FaPaperclip size={20} />
// // // // // // // // // // // // // // // // //                 </label>
// // // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // // //                     id="file-upload"
// // // // // // // // // // // // // // // // //                     type="file"
// // // // // // // // // // // // // // // // //                     accept="image/*"
// // // // // // // // // // // // // // // // //                     onChange={handleImageChange}
// // // // // // // // // // // // // // // // //                     ref={imageInputRef} // Attach the ref to the input element
// // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // //                 <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // export default Chat;

// // // // // // // // // // // // // // // // // // 

// // // // // // // // // // // // // // // // // // socketio.js
// // // // // // // // // // // // // // // // // const { Server } = require("socket.io");
// // // // // // // // // // // // // // // // // const Chat = require("./model/chat-model");

// // // // // // // // // // // // // // // // // const users = new Map();

// // // // // // // // // // // // // // // // // function configureSocket(server) {
// // // // // // // // // // // // // // // // //   const io = new Server(server, {
// // // // // // // // // // // // // // // // //     cors: {
// // // // // // // // // // // // // // // // //       origin: "http://localhost:5173",
// // // // // // // // // // // // // // // // //       methods: ["GET", "POST"],
// // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // //   io.on("connection", (socket) => {
// // // // // // // // // // // // // // // // //     console.log("a user connected");

// // // // // // // // // // // // // // // // //     socket.on("userConnected", (username) => {
// // // // // // // // // // // // // // // // //       users.set(socket.id, username);
// // // // // // // // // // // // // // // // //       io.emit("updateUserList", Array.from(users.values()));
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     socket.on("sendMessage", async (data) => {
// // // // // // // // // // // // // // // // //       const chat = new Chat(data);
// // // // // // // // // // // // // // // // //       await chat.save();
// // // // // // // // // // // // // // // // //       io.emit("receiveMessage", chat);
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     socket.on("sendPersonalMessage", (data) => {
// // // // // // // // // // // // // // // // //       const { to, message, sender } = data;
// // // // // // // // // // // // // // // // //       const recipientSocketId = [...users].find(([id, name]) => name === to)?.[0];
// // // // // // // // // // // // // // // // //       if (recipientSocketId) {
// // // // // // // // // // // // // // // // //         io.to(recipientSocketId).emit("receivePersonalMessage", { message, sender });
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     socket.on("deleteMessage", async ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // // // //       if (deleteForBoth) {
// // // // // // // // // // // // // // // // //         await Chat.findByIdAndDelete(id);
// // // // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // // // //         await Chat.findByIdAndUpdate(id, { $push: { deletedBy: user } });
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //       io.emit("messageDeleted", { id, user, deleteForBoth });
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     socket.on("disconnect", () => {
// // // // // // // // // // // // // // // // //       users.delete(socket.id);
// // // // // // // // // // // // // // // // //       io.emit("updateUserList", Array.from(users.values()));
// // // // // // // // // // // // // // // // //       console.log("user disconnected");
// // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // //   return io;
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // module.exports

// // // // // // // // // // // // // // // // // // 

// // // // // // // // // // // // // // // // // // server.js (backend entry file)
// // // // // // // // // // // // // // // // // require("dotenv").config();
// // // // // // // // // // // // // // // // // const express = require("express");
// // // // // // // // // // // // // // // // // const http = require("http");
// // // // // // // // // // // // // // // // // const { Server } = require("socket.io");
// // // // // // // // // // // // // // // // // const cors = require("cors");
// // // // // // // // // // // // // // // // // const multer = require('multer');
// // // // // // // // // // // // // // // // // const path = require("path");
// // // // // // // // // // // // // // // // // const app = express();
// // // // // // // // // // // // // // // // // const server = http.createServer(app);
// // // // // // // // // // // // // // // // // const authRoute = require("./router/auth-router");
// // // // // // // // // // // // // // // // // const connectDb = require("./utils/db");
// // // // // // // // // // // // // // // // // const Chat = require("./model/chat-model"); // Ensure you import Chat model
// // // // // // // // // // // // // // // // // const configureSocket = require("./socketio");
// // // // // // // // // // // // // // // // // const PORT = process.env.PORT || 5000;

// // // // // // // // // // // // // // // // // // const io = new Server(server, {
// // // // // // // // // // // // // // // // // //     cors: {
// // // // // // // // // // // // // // // // // //         origin: 'http://localhost:5173',
// // // // // // // // // // // // // // // // // //         methods: ['GET', 'POST'],
// // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // const io = configureSocket(server);

// // // // // // // // // // // // // // // // // app.use(express.json());
// // // // // // // // // // // // // // // // // app.use(cors());

// // // // // // // // // // // // // // // // // app.use((req, res, next) => {
// // // // // // // // // // // // // // // // //   req.io = io;
// // // // // // // // // // // // // // // // //   next();
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // app.use("/api", authRoute);

// // // // // // // // // // // // // // // // // // // Socket.io events
// // // // // // // // // // // // // // // // // // io.on('connection', (socket) => {
// // // // // // // // // // // // // // // // // //     console.log('a user connected');

// // // // // // // // // // // // // // // // // //     socket.on('sendMessage', async (data) => {
// // // // // // // // // // // // // // // // // //         const chat = new Chat(data);
// // // // // // // // // // // // // // // // // //         await chat.save();
// // // // // // // // // // // // // // // // // //         io.emit('receiveMessage', chat);
// // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // //     socket.on('deleteMessage', async ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // // // // //         if (deleteForBoth) {
// // // // // // // // // // // // // // // // // //             await Chat.findByIdAndDelete(id);
// // // // // // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // // // // // //             await Chat.findByIdAndUpdate(id, { $push: { deletedBy: user } });
// // // // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // // // //         io.emit('messageDeleted', { id, user, deleteForBoth });
// // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // //     socket.on('disconnect', () => {
// // // // // // // // // // // // // // // // // //         console.log('user disconnected');
// // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // // Configure Multer storage
// // // // // // // // // // // // // // // // // const storage = multer.diskStorage({
// // // // // // // // // // // // // // // // //   destination: function (req, file, cb) {
// // // // // // // // // // // // // // // // //       cb(null, 'uploads/');
// // // // // // // // // // // // // // // // //   },
// // // // // // // // // // // // // // // // //   filename: function (req, file, cb) {
// // // // // // // // // // // // // // // // //       cb(null, Date.now() + path.extname(file.originalname));
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // const upload = multer({ storage: storage });

// // // // // // // // // // // // // // // // // app.post('/upload', upload.single('image'), (req, res) => {
// // // // // // // // // // // // // // // // //   if (!req.file) {
// // // // // // // // // // // // // // // // //       return res.status(400).send({ error: 'No file uploaded' });
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // //   res.send({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // app.use('/uploads', express.static('uploads'));

// // // // // // // // // // // // // // // // // connectDb().then(() => {
// // // // // // // // // // // // // // // // //   server.listen(PORT, () => {
// // // // // // // // // // // // // // // // //     console.log(`Server is listening on port http://localhost:${PORT}`);
// // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // module.exports = io; // Export io to use in routes



// // // // // // // // // // // // // // // // // NOT SEE TICK BLUE


// // // // // // // // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // // // // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // // // // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // // import io from 'socket.io-client';
// // // // // // // // // // // // // // // // import { FaPaperclip } from 'react-icons/fa';
// // // // // // // // // // // // // // // // import { FaCheck, FaCheckDouble } from 'react-icons/fa';

// // // // // // // // // // // // // // // // const socket = io('http://localhost:5000');

// // // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // // // // // // // // // //     const [user, setUser] = useState('');
// // // // // // // // // // // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null);
// // // // // // // // // // // // // // // //     const [selectedImage, setSelectedImage] = useState(null);
// // // // // // // // // // // // // // // //     const [overlayImage, setOverlayImage] = useState(null);
// // // // // // // // // // // // // // // //     const dispatch = useDispatch();
// // // // // // // // // // // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // // // // //     const chatContainerRef = useRef(null);
// // // // // // // // // // // // // // // //     const imageInputRef = useRef(null);

// // // // // // // // // // // // // // // //     const navigate = useNavigate();

// // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // //         if (storedUsername) {
// // // // // // // // // // // // // // // //             setUser(storedUsername);
// // // // // // // // // // // // // // // //             socket.emit('userConnected', storedUsername);
// // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // //         dispatch(fetchChats(navigate));

// // // // // // // // // // // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // // // // // // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // // // // // // // // // // //             if (chat.sender !== storedUsername) {
// // // // // // // // // // // // // // // //                 socket.emit('messageReceived', { chatId: chat._id, receiver: storedUsername });
// // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // //         socket.on('messageStatusUpdate', ({ chatId, status }) => {
// // // // // // // // // // // // // // // //             dispatch({ type: 'UPDATE_CHAT_STATUS', payload: { chatId, status } });
// // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // // // //         });

// // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // //             socket.off('receiveMessage');
// // // // // // // // // // // // // // // //             socket.off('messageStatusUpdate');
// // // // // // // // // // // // // // // //             socket.off('messageDeleted');
// // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // //     }, [dispatch, navigate]);

// // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // //     }, [chats]);

// // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // //         scrollToBottom();
// // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // //     const scrollToBottom = () => {
// // // // // // // // // // // // // // // //         if (chatContainerRef.current) {
// // // // // // // // // // // // // // // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     useEffect(() => {
// // // // // // // // // // // // // // // //         const handleClickOutside = (event) => {
// // // // // // // // // // // // // // // //             if (!event.target.closest('.chat-message')) {
// // // // // // // // // // // // // // // //                 setSelectedMessageId(null);
// // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // //         document.addEventListener('click', handleClickOutside);

// // // // // // // // // // // // // // // //         return () => {
// // // // // // // // // // // // // // // //             document.removeEventListener('click', handleClickOutside);
// // // // // // // // // // // // // // // //         };
// // // // // // // // // // // // // // // //     }, []);

// // // // // // // // // // // // // // // //     const sendMessage = async () => {
// // // // // // // // // // // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // // // // // // // // // // //         const chat = {
// // // // // // // // // // // // // // // //             message: message || 'Image',
// // // // // // // // // // // // // // // //             sender: actualUsername,
// // // // // // // // // // // // // // // //             senderIsSelf: true,
// // // // // // // // // // // // // // // //             image: null
// // // // // // // // // // // // // // // //         };

// // // // // // // // // // // // // // // //         if (selectedImage) {
// // // // // // // // // // // // // // // //             const formData = new FormData();
// // // // // // // // // // // // // // // //             formData.append('image', selectedImage);
// // // // // // // // // // // // // // // //             const response = await fetch('http://localhost:5000/upload', {
// // // // // // // // // // // // // // // //                 method: 'POST',
// // // // // // // // // // // // // // // //                 body: formData
// // // // // // // // // // // // // // // //             });
// // // // // // // // // // // // // // // //             const data = await response.json();
// // // // // // // // // // // // // // // //             chat.image = data.imageUrl;
// // // // // // // // // // // // // // // //             setSelectedImage(null);
// // // // // // // // // // // // // // // //             if (imageInputRef.current) {
// // // // // // // // // // // // // // // //                 imageInputRef.current.value = '';
// // // // // // // // // // // // // // // //             }
// // // // // // // // // // // // // // // //         }

// // // // // // // // // // // // // // // //         socket.emit('sendMessage', chat);
// // // // // // // // // // // // // // // //         setMessage('');
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // // // // // // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     const handleToggleOptions = (id) => {
// // // // // // // // // // // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     const handleImageChange = (e) => {
// // // // // // // // // // // // // // // //         const file = e.target.files[0];
// // // // // // // // // // // // // // // //         setSelectedImage(file);
// // // // // // // // // // // // // // // //         if (file) {
// // // // // // // // // // // // // // // //             setMessage(`Image: ${file.name}`);
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     const openOverlay = (imageUrl) => {
// // // // // // // // // // // // // // // //         setOverlayImage(imageUrl);
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     const closeOverlay = () => {
// // // // // // // // // // // // // // // //         setOverlayImage(null);
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     const getStatusIcon = (status) => {
// // // // // // // // // // // // // // // //         if (status === 'seen') {
// // // // // // // // // // // // // // // //             return <FaCheckDouble style={{ color: 'blue' }} />;
// // // // // // // // // // // // // // // //         } else if (status === 'received') {
// // // // // // // // // // // // // // // //             return <FaCheckDouble />;
// // // // // // // // // // // // // // // //         } else {
// // // // // // // // // // // // // // // //             return <FaCheck />;
// // // // // // // // // // // // // // // //         }
// // // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // // //     return (
// // // // // // // // // // // // // // // //         <div className="chat-container">
// // // // // // // // // // // // // // // //             <h1>Chat App</h1>
// // // // // // // // // // // // // // // //             {loading && <p>Loading...</p>}
// // // // // // // // // // // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // // // // // // // // // // //             <div
// // // // // // // // // // // // // // // //                 className="chat-messages"
// // // // // // // // // // // // // // // //                 ref={chatContainerRef}
// // // // // // // // // // // // // // // //                 onScroll={() => {
// // // // // // // // // // // // // // // //                     const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
// // // // // // // // // // // // // // // //                     if (scrollTop === 0) {
// // // // // // // // // // // // // // // //                         console.log('Load more messages...');
// // // // // // // // // // // // // // // //                     }
// // // // // // // // // // // // // // // //                 }}
// // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // // // // // // // // // //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)} style={{ cursor: "pointer", position: "relative" }}>
// // // // // // // // // // // // // // // //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message !== 'Image' && chat.message}</p>
// // // // // // // // // // // // // // // //                         {chat.image && <img src={chat.image} alt="Chat" style={{ maxWidth: '100%', maxHeight: '200px' }} onClick={() => openOverlay(chat.image)} />}
// // // // // // // // // // // // // // // //                         {chat.sender === user && getStatusIcon(chat.status)}
// // // // // // // // // // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // // // // // // // // // //                             <div className="options">
// // // // // // // // // // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // // // // // // // // // //                                 {chat.sender === user && (
// // // // // // // // // // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // // // // // // // // // //                                 )}
// // // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // // //                         )}
// // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // //                 ))}
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //             <div className="chat-input">
// // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // //                     type="text"
// // // // // // // // // // // // // // // //                     placeholder='Message'
// // // // // // // // // // // // // // // //                     value={message}
// // // // // // // // // // // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // //                 <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // // // // // // //                     <FaPaperclip size={20} />
// // // // // // // // // // // // // // // //                 </label>
// // // // // // // // // // // // // // // //                 <input
// // // // // // // // // // // // // // // //                     id="file-upload"
// // // // // // // // // // // // // // // //                     type="file"
// // // // // // // // // // // // // // // //                     accept="image/*"
// // // // // // // // // // // // // // // //                     onChange={handleImageChange}
// // // // // // // // // // // // // // // //                     ref={imageInputRef}
// // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // //                 <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // // //             {overlayImage && (
// // // // // // // // // // // // // // // //                 <div className="overlay" onClick={closeOverlay}>
// // // // // // // // // // // // // // // //                     <img src={overlayImage} alt="Full Size" className="overlay-image" />
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // //     );
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // export default Chat;






// // // // // // // // // // // // // // // //ENTER RECEIVE NUMBER

// // // // // // // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // // // // // // // // import io from "socket.io-client";
// // // // // // // // // // // // // // // import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// // // // // // // // // // // // // // // import { fetchChats, deleteChat } from "../actions/chatAction";

// // // // // // // // // // // // // // // const socket = io("http://localhost:5000");

// // // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // // //   const [message, setMessage] = useState("");
// // // // // // // // // // // // // // //   const [receiver, setReceiver] = useState("");
// // // // // // // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null);
// // // // // // // // // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // // // // // // // // //   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
// // // // // // // // // // // // // // //   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
// // // // // // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // // // // // //   const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // // // //   const chatContainerRef = useRef(null);
// // // // // // // // // // // // // // //   const imageInputRef = useRef(null);
// // // // // // // // // // // // // // //   const deleteOptionsRef = useRef(null); // Ref for delete options

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // // // // // // //     if (storedUsername) {
// // // // // // // // // // // // // // //       socket.emit("userConnected", storedUsername);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     dispatch(fetchChats());

// // // // // // // // // // // // // // //     socket.on("receiveMessage", (chat) => {
// // // // // // // // // // // // // // //       chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // // // //       dispatch({ type: "ADD_CHAT", payload: chat });
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // // //       if (deleteForBoth && user === storedUsername) {
// // // // // // // // // // // // // // //         // Remove message from UI but keep in database
// // // // // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // // //         // Remove message from UI and database
// // // // // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // //       socket.off("receiveMessage");
// // // // // // // // // // // // // // //       socket.off("messageDeleted");
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }, [dispatch]);

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     scrollToBottom();
// // // // // // // // // // // // // // //   }, [chats]);

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     const handleClickOutside = (event) => {
// // // // // // // // // // // // // // //       if (deleteOptionsRef.current && !deleteOptionsRef.current.contains(event.target)) {
// // // // // // // // // // // // // // //         setShowDeleteOptions(false);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     };

// // // // // // // // // // // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // // //       document.removeEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // // // // // // // //     if (chatContainerRef.current) {
// // // // // // // // // // // // // // //       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // // // // // //     const actualUsername = localStorage.getItem("username");

// // // // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // // // //     formData.append("message", message);
// // // // // // // // // // // // // // //     formData.append("sender", actualUsername);
// // // // // // // // // // // // // // //     formData.append("receiver", receiver);
// // // // // // // // // // // // // // //     if (selectedImage) {
// // // // // // // // // // // // // // //       formData.append("image", selectedImage);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const response = await fetch("http://localhost:5000/api/chats", {
// // // // // // // // // // // // // // //         method: "POST",
// // // // // // // // // // // // // // //         body: formData,
// // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // // // // // // //       }

// // // // // // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // // // // // //       console.log("Message sent:", data);

// // // // // // // // // // // // // // //       setMessage("");
// // // // // // // // // // // // // // //       setSelectedImage(null);
// // // // // // // // // // // // // // //       if (imageInputRef.current) {
// // // // // // // // // // // // // // //         imageInputRef.current.value = "";
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // //       console.error("Error sending message:", error.message);
// // // // // // // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // // // //     socket.emit("deleteMessage", {
// // // // // // // // // // // // // // //       id,
// // // // // // // // // // // // // // //       user: localStorage.getItem("username"),
// // // // // // // // // // // // // // //       deleteForBoth,
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     if (!deleteForBoth) {
// // // // // // // // // // // // // // //       // Remove message from UI only (not from database)
// // // // // // // // // // // // // // //       dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
// // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // //       // Remove message from UI and database
// // // // // // // // // // // // // // //       dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
// // // // // // // // // // // // // // //     }
    
// // // // // // // // // // // // // // //     setShowDeleteOptions(false); // Hide delete options
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleImageChange = (e) => {
// // // // // // // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // // // // // // //     setSelectedImage(file);
// // // // // // // // // // // // // // //     if (file) {
// // // // // // // // // // // // // // //       setMessage(`Image: ${file.name}`);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleImageClick = (imageUrl) => {
// // // // // // // // // // // // // // //     setOverlayImage(imageUrl);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const closeOverlay = () => {
// // // // // // // // // // // // // // //     setOverlayImage(null);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   const handleMessageClick = (id) => {
// // // // // // // // // // // // // // //     setSelectedMessageId(id);
// // // // // // // // // // // // // // //     setShowDeleteOptions(true);
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="chat-container">
// // // // // // // // // // // // // // //       <h1>Chat App</h1>
// // // // // // // // // // // // // // //       {loading && <p>Loading...</p>}
// // // // // // // // // // // // // // //       {error && <p>Error: {error}</p>}
// // // // // // // // // // // // // // //       <div className="chat-messages" ref={chatContainerRef}>
// // // // // // // // // // // // // // //         {chats.map((chat) => (
// // // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // // //             key={chat._id}
// // // // // // // // // // // // // // //             className={`chat-message ${
// // // // // // // // // // // // // // //               chat.sender === localStorage.getItem("username") ? "self" : "other"
// // // // // // // // // // // // // // //             }`}
// // // // // // // // // // // // // // //             onClick={() => handleMessageClick(chat._id)}
// // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // //             <p>
// // // // // // // // // // // // // // //               {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
// // // // // // // // // // // // // // //               {chat.message}
// // // // // // // // // // // // // // //             </p>
// // // // // // // // // // // // // // //             {chat.image && (
// // // // // // // // // // // // // // //               <img
// // // // // // // // // // // // // // //                 src={`http://localhost:5000/${chat.image}`}
// // // // // // // // // // // // // // //                 alt="Chat"
// // // // // // // // // // // // // // //                 style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
// // // // // // // // // // // // // // //                 onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
// // // // // // // // // // // // // // //               />
// // // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // // //             <div className={`status-icon ${chat.status}`}>
// // // // // // // // // // // // // // //               {chat.status === "sent" && <FaCheck size={10} />}
// // // // // // // // // // // // // // //               {chat.status === "received" && <FaCheckDouble size={11} />}
// // // // // // // // // // // // // // //               {chat.status === "seen" && <FaCheckDouble className="seen" size={10} />}
// // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // //             {showDeleteOptions && selectedMessageId === chat._id && (
// // // // // // // // // // // // // // //               <div
// // // // // // // // // // // // // // //                 className={`options ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // // // // // // //                 ref={deleteOptionsRef}
// // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // //                 <button onClick={() => handleDelete(chat._id, false)}>Delete for You</button>
// // // // // // // // // // // // // // //                 {chat.sender === localStorage.getItem("username") && (
// // // // // // // // // // // // // // //                   <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// // // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       <div className="chat-input">
// // // // // // // // // // // // // // //         <input
// // // // // // // // // // // // // // //           type="text"
// // // // // // // // // // // // // // //           placeholder="Message"
// // // // // // // // // // // // // // //           value={message}
// // // // // // // // // // // // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // // // //         />
// // // // // // // // // // // // // // //         <input
// // // // // // // // // // // // // // //           type="text"
// // // // // // // // // // // // // // //           placeholder="Receiver"
// // // // // // // // // // // // // // //           value={receiver}
// // // // // // // // // // // // // // //           onChange={(e) => setReceiver(e.target.value)}
// // // // // // // // // // // // // // //         />
// // // // // // // // // // // // // // //         <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // // // // // //           <FaPaperclip size={20} />
// // // // // // // // // // // // // // //         </label>
// // // // // // // // // // // // // // //         <input
// // // // // // // // // // // // // // //           id="file-upload"
// // // // // // // // // // // // // // //           type="file"
// // // // // // // // // // // // // // //           accept="image/*"
// // // // // // // // // // // // // // //           onChange={handleImageChange}
// // // // // // // // // // // // // // //           ref={imageInputRef}
// // // // // // // // // // // // // // //         />
// // // // // // // // // // // // // // //         <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //       {overlayImage && (
// // // // // // // // // // // // // // //         <div className="overlay" onClick={closeOverlay}>
// // // // // // // // // // // // // // //           <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default Chat;



// // // // // // // // // // // // // // //SHOW SELECT OPTION REGISTER USER

// // // // // // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // // // // // // // import io from "socket.io-client";
// // // // // // // // // // // // // // import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// // // // // // // // // // // // // // import { fetchChats, deleteChat } from "../actions/chatAction";

// // // // // // // // // // // // // // const socket = io("http://localhost:5000");

// // // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // // //   const [message, setMessage] = useState("");
// // // // // // // // // // // // // //   const [receiver, setReceiver] = useState("");
// // // // // // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null);
// // // // // // // // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // // // // // // // //   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
// // // // // // // // // // // // // //   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
// // // // // // // // // // // // // //   const [users, setUsers] = useState([]); // State to store list of users
// // // // // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // // // // //   const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // // //   const chatContainerRef = useRef(null);
// // // // // // // // // // // // // //   const imageInputRef = useRef(null);
// // // // // // // // // // // // // //   const deleteOptionsRef = useRef(null); // Ref for delete options

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // // // // // //     if (storedUsername) {
// // // // // // // // // // // // // //       socket.emit("userConnected", storedUsername);
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     dispatch(fetchChats());

// // // // // // // // // // // // // //     // Fetch users from backend
// // // // // // // // // // // // // //     fetchUsers();

// // // // // // // // // // // // // //     socket.on("receiveMessage", (chat) => {
// // // // // // // // // // // // // //       chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // // //       dispatch({ type: "ADD_CHAT", payload: chat });
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // // //       if (deleteForBoth && user === storedUsername) {
// // // // // // // // // // // // // //         // Remove message from UI but keep in database
// // // // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // //       } else {
// // // // // // // // // // // // // //         // Remove message from UI and database
// // // // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // //       socket.off("receiveMessage");
// // // // // // // // // // // // // //       socket.off("messageDeleted");
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //   }, [dispatch]);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     scrollToBottom();
// // // // // // // // // // // // // //   }, [chats]);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const handleClickOutside = (event) => {
// // // // // // // // // // // // // //       if (deleteOptionsRef.current && !deleteOptionsRef.current.contains(event.target)) {
// // // // // // // // // // // // // //         setShowDeleteOptions(false);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     };

// // // // // // // // // // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // //       document.removeEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // // // // // // //     if (chatContainerRef.current) {
// // // // // // // // // // // // // //       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // // // // //     const actualUsername = localStorage.getItem("username");

// // // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // // //     formData.append("message", message);
// // // // // // // // // // // // // //     formData.append("sender", actualUsername);
// // // // // // // // // // // // // //     formData.append("receiver", receiver);
// // // // // // // // // // // // // //     if (selectedImage) {
// // // // // // // // // // // // // //       formData.append("image", selectedImage);
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await fetch("http://localhost:5000/api/chats", {
// // // // // // // // // // // // // //         method: "POST",
// // // // // // // // // // // // // //         body: formData,
// // // // // // // // // // // // // //       });

// // // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // // // // // //       }

// // // // // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // // // // //       console.log("Message sent:", data);

// // // // // // // // // // // // // //       setMessage("");
// // // // // // // // // // // // // //       setSelectedImage(null);
// // // // // // // // // // // // // //       if (imageInputRef.current) {
// // // // // // // // // // // // // //         imageInputRef.current.value = "";
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error("Error sending message:", error.message);
// // // // // // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // // //     socket.emit("deleteMessage", {
// // // // // // // // // // // // // //       id,
// // // // // // // // // // // // // //       user: localStorage.getItem("username"),
// // // // // // // // // // // // // //       deleteForBoth,
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     if (!deleteForBoth) {
// // // // // // // // // // // // // //       // Remove message from UI only (not from database)
// // // // // // // // // // // // // //       dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
// // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // //       // Remove message from UI and database
// // // // // // // // // // // // // //       dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     setShowDeleteOptions(false); // Hide delete options
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleImageChange = (e) => {
// // // // // // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // // // // // //     setSelectedImage(file);
// // // // // // // // // // // // // //     if (file) {
// // // // // // // // // // // // // //       setMessage(`Image: ${file.name}`);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleImageClick = (imageUrl) => {
// // // // // // // // // // // // // //     setOverlayImage(imageUrl);
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const closeOverlay = () => {
// // // // // // // // // // // // // //     setOverlayImage(null);
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const handleMessageClick = (id) => {
// // // // // // // // // // // // // //     setSelectedMessageId(id);
// // // // // // // // // // // // // //     setShowDeleteOptions(true);
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Function to fetch users from backend
// // // // // // // // // // // // // //   const fetchUsers = async () => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const response = await fetch("http://localhost:5000/api/register");
// // // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // // // // //       console.log("data", data.phones)
// // // // // // // // // // // // // //       setUsers(data.phones); // Assuming the response has a field 'users' containing an array of user objects
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.error("Error fetching users:", error.message);
// // // // // // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="chat-container">
// // // // // // // // // // // // // //       <h1>Chat App</h1>
// // // // // // // // // // // // // //       {loading && <p>Loading...</p>}
// // // // // // // // // // // // // //       {error && <p>Error: {error}</p>}
// // // // // // // // // // // // // //       <div className="chat-messages" ref={chatContainerRef}>
// // // // // // // // // // // // // //         {chats.map((chat) => (
// // // // // // // // // // // // // //           <div
// // // // // // // // // // // // // //             key={chat._id}
// // // // // // // // // // // // // //             className={`chat-message ${chat.sender === localStorage.getItem("username") ? "self" : "other"
// // // // // // // // // // // // // //               }`}
// // // // // // // // // // // // // //             onClick={() => handleMessageClick(chat._id)}
// // // // // // // // // // // // // //           >
// // // // // // // // // // // // // //             <p>
// // // // // // // // // // // // // //               {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
// // // // // // // // // // // // // //               {chat.message}
// // // // // // // // // // // // // //             </p>
// // // // // // // // // // // // // //             {chat.image && (
// // // // // // // // // // // // // //               <img
// // // // // // // // // // // // // //                 src={`http://localhost:5000/${chat.image}`}
// // // // // // // // // // // // // //                 alt="Chat"
// // // // // // // // // // // // // //                 style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
// // // // // // // // // // // // // //                 onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
// // // // // // // // // // // // // //               />
// // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // //             <div className={`status-icon ${chat.status}`}>
// // // // // // // // // // // // // //               {chat.status === "sent" && <FaCheck size={10} />}
// // // // // // // // // // // // // //               {chat.status === "received" && <FaCheckDouble size={11} />}
// // // // // // // // // // // // // //               {chat.status === "seen" && <FaCheckDouble className="seen" size={10} />}
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //             {showDeleteOptions && selectedMessageId === chat._id && (
// // // // // // // // // // // // // //               <div
// // // // // // // // // // // // // //                 className={`options ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // // // // // //                 ref={deleteOptionsRef}
// // // // // // // // // // // // // //               >
// // // // // // // // // // // // // //                 <button onClick={() => handleDelete(chat._id, false)}>Delete for You</button>
// // // // // // // // // // // // // //                 {chat.sender === localStorage.getItem("username") && (
// // // // // // // // // // // // // //                   <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // //             )}
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //       <div className="chat-input">
// // // // // // // // // // // // // //         <input
// // // // // // // // // // // // // //           type="text"
// // // // // // // // // // // // // //           placeholder="Message"
// // // // // // // // // // // // // //           value={message}
// // // // // // // // // // // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // // //         />
// // // // // // // // // // // // // //         <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
// // // // // // // // // // // // // //           <option value="">Select Receiver</option>
// // // // // // // // // // // // // //           {users.map((user) => (
// // // // // // // // // // // // // //             <option key={user.id} value={user}>
// // // // // // // // // // // // // //               {user}
// // // // // // // // // // // // // //             </option>
// // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // //         </select>
// // // // // // // // // // // // // //         <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // // // // //           <FaPaperclip size={20} />
// // // // // // // // // // // // // //         </label>
// // // // // // // // // // // // // //         <input
// // // // // // // // // // // // // //           id="file-upload"
// // // // // // // // // // // // // //           type="file"
// // // // // // // // // // // // // //           accept="image/*"
// // // // // // // // // // // // // //           onChange={handleImageChange}
// // // // // // // // // // // // // //           ref={imageInputRef}
// // // // // // // // // // // // // //         />
// // // // // // // // // // // // // //         <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //       {overlayImage && (
// // // // // // // // // // // // // //         <div className="overlay" onClick={closeOverlay}>
// // // // // // // // // // // // // //           <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default Chat;



// // // // // // // // // // // // // //SEE SIDE BY SIDE 

// // // // // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // // // // // // import io from "socket.io-client";
// // // // // // // // // // // // // import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// // // // // // // // // // // // // import { fetchChats, deleteChat } from "../actions/chatAction";
// // // // // // // // // // // // // import UserList from "./UserList"; // Import UserList component

// // // // // // // // // // // // // const socket = io("http://localhost:5000");

// // // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // // //   const [message, setMessage] = useState("");
// // // // // // // // // // // // //   const [receiver, setReceiver] = useState("");
// // // // // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null);
// // // // // // // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // // // // // // //   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
// // // // // // // // // // // // //   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
// // // // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // // // //   const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // // //   const chatContainerRef = useRef(null);
// // // // // // // // // // // // //   const imageInputRef = useRef(null);
// // // // // // // // // // // // //   const deleteOptionsRef = useRef(null); // Ref for delete options

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // // // // //     if (storedUsername) {
// // // // // // // // // // // // //       socket.emit("userConnected", storedUsername);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     dispatch(fetchChats());

// // // // // // // // // // // // //     socket.on("receiveMessage", (chat) => {
// // // // // // // // // // // // //       chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // // //       dispatch({ type: "ADD_CHAT", payload: chat });
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // // //       if (deleteForBoth && user === storedUsername) {
// // // // // // // // // // // // //         // Remove message from UI but keep in database
// // // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // //       } else {
// // // // // // // // // // // // //         // Remove message from UI and database
// // // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       socket.off("receiveMessage");
// // // // // // // // // // // // //       socket.off("messageDeleted");
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, [dispatch]);

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     scrollToBottom();
// // // // // // // // // // // // //   }, [chats]);

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const handleClickOutside = (event) => {
// // // // // // // // // // // // //       if (deleteOptionsRef.current && !deleteOptionsRef.current.contains(event.target)) {
// // // // // // // // // // // // //         setShowDeleteOptions(false);
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     };

// // // // // // // // // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       document.removeEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // // // // // //     if (chatContainerRef.current) {
// // // // // // // // // // // // //       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // // // //     const actualUsername = localStorage.getItem("username");

// // // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // // //     formData.append("message", message);
// // // // // // // // // // // // //     formData.append("sender", actualUsername);
// // // // // // // // // // // // //     formData.append("receiver", receiver);
// // // // // // // // // // // // //     if (selectedImage) {
// // // // // // // // // // // // //       formData.append("image", selectedImage);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const response = await fetch("http://localhost:5000/api/chats", {
// // // // // // // // // // // // //         method: "POST",
// // // // // // // // // // // // //         body: formData,
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // // // //       console.log("Message sent:", data);

// // // // // // // // // // // // //       setMessage("");
// // // // // // // // // // // // //       setSelectedImage(null);
// // // // // // // // // // // // //       if (imageInputRef.current) {
// // // // // // // // // // // // //         imageInputRef.current.value = "";
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.error("Error sending message:", error.message);
// // // // // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // // //     socket.emit("deleteMessage", {
// // // // // // // // // // // // //       id,
// // // // // // // // // // // // //       user: localStorage.getItem("username"),
// // // // // // // // // // // // //       deleteForBoth,
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     if (!deleteForBoth) {
// // // // // // // // // // // // //       // Remove message from UI only (not from database)
// // // // // // // // // // // // //       dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       // Remove message from UI and database
// // // // // // // // // // // // //       dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     setShowDeleteOptions(false); // Hide delete options
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleImageChange = (e) => {
// // // // // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // // // // //     setSelectedImage(file);
// // // // // // // // // // // // //     if (file) {
// // // // // // // // // // // // //       setMessage(`Image: ${file.name}`);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleImageClick = (imageUrl) => {
// // // // // // // // // // // // //     setOverlayImage(imageUrl);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const closeOverlay = () => {
// // // // // // // // // // // // //     setOverlayImage(null);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleMessageClick = (id) => {
// // // // // // // // // // // // //     setSelectedMessageId(id);
// // // // // // // // // // // // //     setShowDeleteOptions(true);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="chat-app">
// // // // // // // // // // // // //       <UserList /> {/* Render UserList component */}
// // // // // // // // // // // // //       <div className="chat-container">
// // // // // // // // // // // // //         <h1>Chat App</h1>
// // // // // // // // // // // // //         {loading && <p>Loading...</p>}
// // // // // // // // // // // // //         {error && <p>Error: {error}</p>}
// // // // // // // // // // // // //         <div className="chat-messages" ref={chatContainerRef}>
// // // // // // // // // // // // //           {chats.map((chat) => (
// // // // // // // // // // // // //             <div
// // // // // // // // // // // // //               key={chat._id}
// // // // // // // // // // // // //               className={`chat-message ${chat.sender === localStorage.getItem("username") ? "self" : "other"
// // // // // // // // // // // // //                 }`}
// // // // // // // // // // // // //               onClick={() => handleMessageClick(chat._id)}
// // // // // // // // // // // // //             >
// // // // // // // // // // // // //               <p>
// // // // // // // // // // // // //                 {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
// // // // // // // // // // // // //                 {chat.message}
// // // // // // // // // // // // //               </p>
// // // // // // // // // // // // //               {chat.image && (
// // // // // // // // // // // // //                 <img
// // // // // // // // // // // // //                   src={`http://localhost:5000/${chat.image}`}
// // // // // // // // // // // // //                   alt="Chat"
// // // // // // // // // // // // //                   style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
// // // // // // // // // // // // //                   onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
// // // // // // // // // // // // //                 />
// // // // // // // // // // // // //               )}
// // // // // // // // // // // // //               <div className={`status-icon ${chat.status}`}>
// // // // // // // // // // // // //                 {chat.status === "sent" && <FaCheck size={10} />}
// // // // // // // // // // // // //                 {chat.status === "received" && <FaCheckDouble size={11} />}
// // // // // // // // // // // // //                 {chat.status === "seen" && <FaCheckDouble className="seen" size={10} />}
// // // // // // // // // // // // //               </div>
// // // // // // // // // // // // //               {showDeleteOptions && selectedMessageId === chat._id && (
// // // // // // // // // // // // //                 <div
// // // // // // // // // // // // //                   className={`options ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // // // // //                   ref={deleteOptionsRef}
// // // // // // // // // // // // //                 >
// // // // // // // // // // // // //                   <button onClick={() => handleDelete(chat._id, false)}>Delete for You</button>
// // // // // // // // // // // // //                   {chat.sender === localStorage.getItem("username") && (
// // // // // // // // // // // // //                     <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// // // // // // // // // // // // //                   )}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //               )}
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           ))}
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //         <div className="chat-input">
// // // // // // // // // // // // //           <input
// // // // // // // // // // // // //             type="text"
// // // // // // // // // // // // //             placeholder="Message"
// // // // // // // // // // // // //             value={message}
// // // // // // // // // // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // // //           />
// // // // // // // // // // // // //           <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // // // //             <FaPaperclip size={20} />
// // // // // // // // // // // // //           </label>
// // // // // // // // // // // // //           <input
// // // // // // // // // // // // //             id="file-upload"
// // // // // // // // // // // // //             type="file"
// // // // // // // // // // // // //             accept="image/*"
// // // // // // // // // // // // //             onChange={handleImageChange}
// // // // // // // // // // // // //             ref={imageInputRef}
// // // // // // // // // // // // //           />
// // // // // // // // // // // // //           <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //         {overlayImage && (
// // // // // // // // // // // // //           <div className="overlay" onClick={closeOverlay}>
// // // // // // // // // // // // //             <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default Chat;



// // // // // // // // // // // // // IF PHONE NOT SELECT THEN NO SHOW IMAGE

// // // // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // // // // // import io from "socket.io-client";
// // // // // // // // // // // // import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// // // // // // // // // // // // import { fetchChats, deleteChat } from "../actions/chatAction";

// // // // // // // // // // // // const socket = io("http://localhost:5000");

// // // // // // // // // // // // const Chat = () => {
// // // // // // // // // // // //   const [message, setMessage] = useState("");
// // // // // // // // // // // //   const [receiver, setReceiver] = useState("");
// // // // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null);
// // // // // // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // // // // // //   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
// // // // // // // // // // // //   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
// // // // // // // // // // // //   const [users, setUsers] = useState([]); // State to store list of users
// // // // // // // // // // // //   const [filteredChats, setFilteredChats] = useState([]); // State to store filtered chats
// // // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // // //   const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // // //   const chatContainerRef = useRef(null);
// // // // // // // // // // // //   const imageInputRef = useRef(null);
// // // // // // // // // // // //   const deleteOptionsRef = useRef(null); // Ref for delete options

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // // // //     if (storedUsername) {
// // // // // // // // // // // //       socket.emit("userConnected", storedUsername);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     dispatch(fetchChats());

// // // // // // // // // // // //     // Fetch users from backend
// // // // // // // // // // // //     fetchUsers();

// // // // // // // // // // // //     socket.on("receiveMessage", (chat) => {
// // // // // // // // // // // //       chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // // //       dispatch({ type: "ADD_CHAT", payload: chat });
// // // // // // // // // // // //     });

// // // // // // // // // // // //     socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
// // // // // // // // // // // //       if (deleteForBoth && user === storedUsername) {
// // // // // // // // // // // //         // Remove message from UI but keep in database
// // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         // Remove message from UI and database
// // // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       socket.off("receiveMessage");
// // // // // // // // // // // //       socket.off("messageDeleted");
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, [dispatch]);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     scrollToBottom();
// // // // // // // // // // // //   }, [filteredChats]);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const handleClickOutside = (event) => {
// // // // // // // // // // // //       if (deleteOptionsRef.current && !deleteOptionsRef.current.contains(event.target)) {
// // // // // // // // // // // //         setShowDeleteOptions(false);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       document.removeEventListener("mousedown", handleClickOutside);
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // // // //     const filtered = chats.filter(
// // // // // // // // // // // //       (chat) =>
// // // // // // // // // // // //         (chat.sender === storedUsername && chat.receiver === receiver) ||
// // // // // // // // // // // //         (chat.sender === receiver && chat.receiver === storedUsername)
// // // // // // // // // // // //     );
// // // // // // // // // // // //     setFilteredChats(filtered);
// // // // // // // // // // // //   }, [chats, receiver]);

// // // // // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // // // // //     if (chatContainerRef.current) {
// // // // // // // // // // // //       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // // //     const actualUsername = localStorage.getItem("username");

// // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // //     formData.append("message", message);
// // // // // // // // // // // //     formData.append("sender", actualUsername);
// // // // // // // // // // // //     formData.append("receiver", receiver);
// // // // // // // // // // // //     if (selectedImage) {
// // // // // // // // // // // //       formData.append("image", selectedImage);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await fetch("http://localhost:5000/api/chats", {
// // // // // // // // // // // //         method: "POST",
// // // // // // // // // // // //         body: formData,
// // // // // // // // // // // //       });

// // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // // // //       }

// // // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // // //       console.log("Message sent:", data);

// // // // // // // // // // // //       setMessage("");
// // // // // // // // // // // //       setSelectedImage(null);
// // // // // // // // // // // //       if (imageInputRef.current) {
// // // // // // // // // // // //         imageInputRef.current.value = "";
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error("Error sending message:", error.message);
// // // // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // // //     socket.emit("deleteMessage", {
// // // // // // // // // // // //       id,
// // // // // // // // // // // //       user: localStorage.getItem("username"),
// // // // // // // // // // // //       deleteForBoth,
// // // // // // // // // // // //     });

// // // // // // // // // // // //     if (!deleteForBoth) {
// // // // // // // // // // // //       // Remove message from UI only (not from database)
// // // // // // // // // // // //       dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       // Remove message from UI and database
// // // // // // // // // // // //       dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
// // // // // // // // // // // //     }
    
// // // // // // // // // // // //     setShowDeleteOptions(false); // Hide delete options
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleImageChange = (e) => {
// // // // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // // // //     setSelectedImage(file);
// // // // // // // // // // // //     if (file) {
// // // // // // // // // // // //       setMessage(`Image: ${file.name}`);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleImageClick = (imageUrl) => {
// // // // // // // // // // // //     setOverlayImage(imageUrl);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const closeOverlay = () => {
// // // // // // // // // // // //     setOverlayImage(null);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleMessageClick = (id) => {
// // // // // // // // // // // //     setSelectedMessageId(id);
// // // // // // // // // // // //     setShowDeleteOptions(true);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Function to fetch users from backend
// // // // // // // // // // // //   const fetchUsers = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await fetch("http://localhost:5000/api/register");
// // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // // // //       }
// // // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // // //       console.log("data",data.phones)
// // // // // // // // // // // //       setUsers(data.phones); // Assuming the response has a field 'phones' containing an array of phone numbers
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error("Error fetching users:", error.message);
// // // // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="chat-container">
// // // // // // // // // // // //       <h1>Chat App</h1>
// // // // // // // // // // // //       {loading && <p>Loading...</p>}
// // // // // // // // // // // //       {error && <p>Error: {error}</p>}
// // // // // // // // // // // //       <div className="chat-messages" ref={chatContainerRef}>
// // // // // // // // // // // //         {filteredChats.map((chat) => (
// // // // // // // // // // // //           <div
// // // // // // // // // // // //             key={chat._id}
// // // // // // // // // // // //             className={`chat-message ${
// // // // // // // // // // // //               chat.sender === localStorage.getItem("username") ? "self" : "other"
// // // // // // // // // // // //             }`}
// // // // // // // // // // // //             onClick={() => handleMessageClick(chat._id)}
// // // // // // // // // // // //           >
// // // // // // // // // // // //             <p>
// // // // // // // // // // // //               {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
// // // // // // // // // // // //               {chat.message}
// // // // // // // // // // // //             </p>
// // // // // // // // // // // //             {chat.image && (
// // // // // // // // // // // //               <img
// // // // // // // // // // // //                 src={`http://localhost:5000/${chat.image}`}
// // // // // // // // // // // //                 alt="Chat"
// // // // // // // // // // // //                 style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
// // // // // // // // // // // //                 onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
// // // // // // // // // // // //               />
// // // // // // // // // // // //             )}
// // // // // // // // // // // //             <div className={`status-icon ${chat.status}`}>
// // // // // // // // // // // //               {chat.status === "sent" && <FaCheck size={10} />}
// // // // // // // // // // // //               {chat.status === "received" && <FaCheckDouble size={11} />}
// // // // // // // // // // // //               {chat.status === "seen" && <FaCheckDouble className="seen" size={10} />}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             {showDeleteOptions && selectedMessageId === chat._id && (
// // // // // // // // // // // //               <div
// // // // // // // // // // // //                 className={`options ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // // // //                 ref={deleteOptionsRef}
// // // // // // // // // // // //               >
// // // // // // // // // // // //                 <button onClick={() => handleDelete(chat._id, false)}>Delete for You</button>
// // // // // // // // // // // //                 {chat.sender === localStorage.getItem("username") && (
// // // // // // // // // // // //                   <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// // // // // // // // // // // //                 )}
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ))}
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //       <div className="chat-input">
// // // // // // // // // // // //         <input
// // // // // // // // // // // //           type="text"
// // // // // // // // // // // //           placeholder="Message"
// // // // // // // // // // // //           value={message}
// // // // // // // // // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // // //         />
// // // // // // // // // // // //         <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
// // // // // // // // // // // //           <option value="">Select Receiver</option>
// // // // // // // // // // // //           {users.map((user, index) => (
// // // // // // // // // // // //             <option key={index} value={user}>
// // // // // // // // // // // //               {user}
// // // // // // // // // // // //             </option>
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //         </select>
// // // // // // // // // // // //         <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // // //           <FaPaperclip size={20} />
// // // // // // // // // // // //         </label>
// // // // // // // // // // // //         <input
// // // // // // // // // // // //           id="file-upload"
// // // // // // // // // // // //           type="file"
// // // // // // // // // // // //           accept="image/*"
// // // // // // // // // // // //           onChange={handleImageChange}
// // // // // // // // // // // //           ref={imageInputRef}
// // // // // // // // // // // //         />
// // // // // // // // // // // //         <button onClick={sendMessage}>Send</button>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //       {overlayImage && (
// // // // // // // // // // // //         <div className="overlay" onClick={closeOverlay}>
// // // // // // // // // // // //           <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default Chat;


// // // // // // // // // // // //NOT RENDER IMAGE IN CHAT COMPONENT

// // // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // // // // import io from "socket.io-client";
// // // // // // // // // // // import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// // // // // // // // // // // import { fetchChats, deleteChat } from "../actions/chatAction";

// // // // // // // // // // // const socket = io("http://localhost:5000");

// // // // // // // // // // // const Chat = ({ receiver }) => {
// // // // // // // // // // //   const [message, setMessage] = useState("");
// // // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null);
// // // // // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // // // // //   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
// // // // // // // // // // //   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
// // // // // // // // // // //   const [filteredChats, setFilteredChats] = useState([]); // State to store filtered chats
// // // // // // // // // // //   const [defaultImage, setDefaultImage] = useState("http://localhost:5000/uploads/default.png"); // Default image URL
// // // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // // //   const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // // //   const chatContainerRef = useRef(null);
// // // // // // // // // // //   const imageInputRef = useRef(null);
// // // // // // // // // // //   const deleteOptionsRef = useRef(null); // Ref for delete options

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // // //     if (storedUsername) {
// // // // // // // // // // //       socket.emit("userConnected", storedUsername);
// // // // // // // // // // //     }

// // // // // // // // // // //     dispatch(fetchChats());

// // // // // // // // // // //     socket.on("receiveMessage", (chat) => {
// // // // // // // // // // //       chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // // //       dispatch({ type: "ADD_CHAT", payload: chat });
// // // // // // // // // // //     });

// // // // // // // // // // //     socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
// // // // // // // // // // //       if (deleteForBoth && user === storedUsername) {
// // // // // // // // // // //         // Remove message from UI but keep in database
// // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // //       } else {
// // // // // // // // // // //         // Remove message from UI and database
// // // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     return () => {
// // // // // // // // // // //       socket.off("receiveMessage");
// // // // // // // // // // //       socket.off("messageDeleted");
// // // // // // // // // // //     };
// // // // // // // // // // //   }, [dispatch]);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // // //     const filtered = chats.filter(
// // // // // // // // // // //       (chat) =>
// // // // // // // // // // //         (chat.sender === storedUsername && chat.receiver === receiver) ||
// // // // // // // // // // //         (chat.sender === receiver && chat.receiver === storedUsername)
// // // // // // // // // // //     );
// // // // // // // // // // //     setFilteredChats(filtered);
// // // // // // // // // // //   }, [chats, receiver]);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     scrollToBottom();
// // // // // // // // // // //   }, [filteredChats]);

// // // // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // // // //     if (chatContainerRef.current) {
// // // // // // // // // // //       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // // //     const actualUsername = localStorage.getItem("username");

// // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // //     formData.append("message", message);
// // // // // // // // // // //     formData.append("sender", actualUsername);
// // // // // // // // // // //     formData.append("receiver", receiver);
// // // // // // // // // // //     if (selectedImage) {
// // // // // // // // // // //       formData.append("image", selectedImage);
// // // // // // // // // // //     }

// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await fetch("http://localhost:5000/api/chats", {
// // // // // // // // // // //         method: "POST",
// // // // // // // // // // //         body: formData,
// // // // // // // // // // //       });

// // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // // //       }

// // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // //       console.log("Message sent:", data);

// // // // // // // // // // //       setMessage("");
// // // // // // // // // // //       setSelectedImage(null);
// // // // // // // // // // //       if (imageInputRef.current) {
// // // // // // // // // // //         imageInputRef.current.value = "";
// // // // // // // // // // //       }

// // // // // // // // // // //       scrollToBottom(); // Scroll to bottom after sending a message
// // // // // // // // // // //     } catch (error) {
// // // // // // // // // // //       console.error("Error sending message:", error.message);
// // // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // // //     socket.emit("deleteMessage", {
// // // // // // // // // // //       id,
// // // // // // // // // // //       user: localStorage.getItem("username"),
// // // // // // // // // // //       deleteForBoth,
// // // // // // // // // // //     });

// // // // // // // // // // //     if (!deleteForBoth) {
// // // // // // // // // // //       // Remove message from UI only (not from database)
// // // // // // // // // // //       dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
// // // // // // // // // // //     } else {
// // // // // // // // // // //       // Remove message from UI and database
// // // // // // // // // // //       dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
// // // // // // // // // // //     }

// // // // // // // // // // //     setShowDeleteOptions(false); // Hide delete options
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleImageChange = (e) => {
// // // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // // //     setSelectedImage(file);
// // // // // // // // // // //     if (file) {
// // // // // // // // // // //       setMessage(`Image: ${file.name}`);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleImageClick = (imageUrl) => {
// // // // // // // // // // //     setOverlayImage(imageUrl);
// // // // // // // // // // //   };

// // // // // // // // // // //   const closeOverlay = () => {
// // // // // // // // // // //     setOverlayImage(null);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleMessageClick = (id) => {
// // // // // // // // // // //     setSelectedMessageId(id);
// // // // // // // // // // //     setShowDeleteOptions(true);
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="chat-container">
// // // // // // // // // // //       <h1>Chat App</h1>
// // // // // // // // // // //       {loading && <p>Loading...</p>}
// // // // // // // // // // //       {error && <p>Error: {error}</p>}
// // // // // // // // // // //       <div className="chat-messages" ref={chatContainerRef}>
// // // // // // // // // // //         {filteredChats.map((chat) => (
// // // // // // // // // // //           <div
// // // // // // // // // // //             key={chat._id}
// // // // // // // // // // //             className={`chat-message ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // // //             onClick={() => handleMessageClick(chat._id)}
// // // // // // // // // // //           >
// // // // // // // // // // //             <p>
// // // // // // // // // // //               {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
// // // // // // // // // // //               {chat.message}
// // // // // // // // // // //             </p>
// // // // // // // // // // //             {chat.image && (
// // // // // // // // // // //               <img
// // // // // // // // // // //                 src={`http://localhost:5000/${chat.image}`}
// // // // // // // // // // //                 alt="Chat"
// // // // // // // // // // //                 style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
// // // // // // // // // // //                 onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
// // // // // // // // // // //               />
// // // // // // // // // // //             )}
// // // // // // // // // // //             <div className={`status-icon ${chat.status}`}>
// // // // // // // // // // //               {chat.status === "sent" && <FaCheck size={10} />}
// // // // // // // // // // //               {chat.status === "received" && <FaCheckDouble size={11} />}
// // // // // // // // // // //               {chat.status === "seen" && <FaCheckDouble className="seen" size={10} />}
// // // // // // // // // // //             </div>
// // // // // // // // // // //             {showDeleteOptions && selectedMessageId === chat._id && (
// // // // // // // // // // //               <div
// // // // // // // // // // //                 className={`options ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // // //                 ref={deleteOptionsRef}
// // // // // // // // // // //               >
// // // // // // // // // // //                 <button onClick={() => handleDelete(chat._id, false)}>Delete for You</button>
// // // // // // // // // // //                 {chat.sender === localStorage.getItem("username") && (
// // // // // // // // // // //                   <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// // // // // // // // // // //                 )}
// // // // // // // // // // //               </div>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ))}
// // // // // // // // // // //         {!receiver && (
// // // // // // // // // // //           <div className="default-image-container" style={{ display: "flex", justifyContent: "center", alignContent: "center", fontSize: "3rem", fontFamily: "sans-serif", color: "green", fontWeight: "bold", marginTop: "4rem" }}>
// // // // // // // // // // //             <p>Welcome to Wave Chat App</p>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>
// // // // // // // // // // //       <div className="chat-input">
// // // // // // // // // // //         <input
// // // // // // // // // // //           type="text"
// // // // // // // // // // //           placeholder="Message"
// // // // // // // // // // //           value={message}
// // // // // // // // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // // //         />
// // // // // // // // // // //         <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // // //           <FaPaperclip size={20} />
// // // // // // // // // // //         </label>
// // // // // // // // // // //         <input
// // // // // // // // // // //           id="file-upload"
// // // // // // // // // // //           type="file"
// // // // // // // // // // //           accept="image/*"
// // // // // // // // // // //           onChange={handleImageChange}
// // // // // // // // // // //           ref={imageInputRef}
// // // // // // // // // // //         />
// // // // // // // // // // //         <button onClick={sendMessage}>Send</button>
// // // // // // // // // // //       </div>
// // // // // // // // // // //       {overlayImage && (
// // // // // // // // // // //         <div className="overlay" onClick={closeOverlay}>
// // // // // // // // // // //           <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // // // // // //         </div>
// // // // // // // // // // //       )}
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Chat;





// // // // // // // // // // //IMAGE COMPONENT


// // // // // // // // // // import React, { useState, useEffect, useRef } from "react";
// // // // // // // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // // // // // // import io from "socket.io-client";
// // // // // // // // // // import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// // // // // // // // // // import { fetchChats, deleteChat } from "../actions/chatAction";
// // // // // // // // // // import Update from "./Update";

// // // // // // // // // // const socket = io("http://localhost:5000");

// // // // // // // // // // const Chat = ({ selectedUser }) => {
// // // // // // // // // //   const [message, setMessage] = useState("");
// // // // // // // // // //   const [selectedImage, setSelectedImage] = useState(null);
// // // // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // // // //   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
// // // // // // // // // //   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
// // // // // // // // // //   const [filteredChats, setFilteredChats] = useState([]); // State to store filtered chats
// // // // // // // // // //   const dispatch = useDispatch();
// // // // // // // // // //   const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // // // // //   const chatContainerRef = useRef(null);
// // // // // // // // // //   const imageInputRef = useRef(null);
// // // // // // // // // //   const deleteOptionsRef = useRef(null); // Ref for delete options
// // // // // // // // // //   const [showFullView, setShowFullView] = useState(false);

// // // // // // // // // //   const handleNavbarClick = () => {
// // // // // // // // // //     setShowFullView(true);
// // // // // // // // // //   };

// // // // // // // // // //   const closeOverlayMainImage = () => {
// // // // // // // // // //     setShowFullView(false);
// // // // // // // // // //   };

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // //     if (storedUsername) {
// // // // // // // // // //       socket.emit("userConnected", storedUsername);
// // // // // // // // // //     }

// // // // // // // // // //     dispatch(fetchChats());

// // // // // // // // // //     socket.on("receiveMessage", (chat) => {
// // // // // // // // // //       chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // // // //       dispatch({ type: "ADD_CHAT", payload: chat });
// // // // // // // // // //     });

// // // // // // // // // //     socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
// // // // // // // // // //       if (deleteForBoth && user === storedUsername) {
// // // // // // // // // //         // Remove message from UI but keep in database
// // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // //       } else {
// // // // // // // // // //         // Remove message from UI and database
// // // // // // // // // //         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     return () => {
// // // // // // // // // //       socket.off("receiveMessage");
// // // // // // // // // //       socket.off("messageDeleted");
// // // // // // // // // //     };
// // // // // // // // // //   }, [dispatch]);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const storedUsername = localStorage.getItem("username");
// // // // // // // // // //     const filtered = chats.filter(
// // // // // // // // // //       (chat) =>
// // // // // // // // // //         (chat.sender === storedUsername && chat.receiver === selectedUser.phone) ||
// // // // // // // // // //         (chat.sender === selectedUser.phone && chat.receiver === storedUsername)
// // // // // // // // // //     );
// // // // // // // // // //     setFilteredChats(filtered);
// // // // // // // // // //   }, [chats, selectedUser]);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     scrollToBottom();
// // // // // // // // // //   }, [filteredChats]);

// // // // // // // // // //   const scrollToBottom = () => {
// // // // // // // // // //     if (chatContainerRef.current) {
// // // // // // // // // //       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const sendMessage = async () => {
// // // // // // // // // //     const actualUsername = localStorage.getItem("username");

// // // // // // // // // //     const formData = new FormData();
// // // // // // // // // //     formData.append("message", message);
// // // // // // // // // //     formData.append("sender", actualUsername);
// // // // // // // // // //     formData.append("receiver", selectedUser.phone);
// // // // // // // // // //     if (selectedImage) {
// // // // // // // // // //       formData.append("image", selectedImage);
// // // // // // // // // //     }

// // // // // // // // // //     try {
// // // // // // // // // //       const response = await fetch("http://localhost:5000/api/chats", {
// // // // // // // // // //         method: "POST",
// // // // // // // // // //         body: formData,
// // // // // // // // // //       });

// // // // // // // // // //       if (!response.ok) {
// // // // // // // // // //         throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // // //       }

// // // // // // // // // //       const data = await response.json();
// // // // // // // // // //       console.log("Message sent:", data);

// // // // // // // // // //       setMessage("");
// // // // // // // // // //       setSelectedImage(null);
// // // // // // // // // //       if (imageInputRef.current) {
// // // // // // // // // //         imageInputRef.current.value = "";
// // // // // // // // // //       }

// // // // // // // // // //       scrollToBottom(); // Scroll to bottom after sending a message
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error sending message:", error.message);
// // // // // // // // // //       // Handle error (e.g., display an error message to the user)
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleDelete = (id, deleteForBoth) => {
// // // // // // // // // //     socket.emit("deleteMessage", {
// // // // // // // // // //       id,
// // // // // // // // // //       user: localStorage.getItem("username"),
// // // // // // // // // //       deleteForBoth,
// // // // // // // // // //     });

// // // // // // // // // //     if (!deleteForBoth) {
// // // // // // // // // //       // Remove message from UI only (not from database)
// // // // // // // // // //       dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
// // // // // // // // // //     } else {
// // // // // // // // // //       // Remove message from UI and database
// // // // // // // // // //       dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
// // // // // // // // // //     }

// // // // // // // // // //     setShowDeleteOptions(false); // Hide delete options
// // // // // // // // // //   };

// // // // // // // // // //   const handleImageChange = (e) => {
// // // // // // // // // //     const file = e.target.files[0];
// // // // // // // // // //     setSelectedImage(file);
// // // // // // // // // //     if (file) {
// // // // // // // // // //       setMessage(`Image: ${file.name}`);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleImageClick = (imageUrl) => {
// // // // // // // // // //     setOverlayImage(imageUrl);
// // // // // // // // // //   };

// // // // // // // // // //   const closeOverlay = () => {
// // // // // // // // // //     setOverlayImage(null);
// // // // // // // // // //   };

// // // // // // // // // //   const handleMessageClick = (id) => {
// // // // // // // // // //     setSelectedMessageId(id);
// // // // // // // // // //     setShowDeleteOptions(true);
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="chat-container">
// // // // // // // // // //       <div className="chat-navbar" onClick={handleNavbarClick}>
// // // // // // // // // //         <img
// // // // // // // // // //           src={`http://localhost:5000/${selectedUser.profilePicture}`}
// // // // // // // // // //           alt="Profile"
// // // // // // // // // //           style={{ height: "50px", width: "50px", marginRight: "20px", borderRadius: "50%" }}
// // // // // // // // // //         />
// // // // // // // // // //         <div className="chat-navbar-name">
// // // // // // // // // //           <h3 style={{ textTransform: "capitalize" }}>{selectedUser.username}</h3>
// // // // // // // // // //           <p>{selectedUser.phone}</p>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //       {/* <h1>Chat App</h1> */}
// // // // // // // // // //       {loading && <p>Loading...</p>}
// // // // // // // // // //       {error && <p>Error: {error}</p>}
// // // // // // // // // //       <div className="chat-messages" ref={chatContainerRef}>
// // // // // // // // // //         {filteredChats.map((chat) => (
// // // // // // // // // //           <div
// // // // // // // // // //             key={chat._id}
// // // // // // // // // //             className={`chat-message ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // //             onClick={() => handleMessageClick(chat._id)}
// // // // // // // // // //           >
// // // // // // // // // //             <p>
// // // // // // // // // //               {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
// // // // // // // // // //               {chat.message}
// // // // // // // // // //             </p>
// // // // // // // // // //             {chat.image && (
// // // // // // // // // //               <img
// // // // // // // // // //                 src={`http://localhost:5000/${chat.image}`}
// // // // // // // // // //                 alt="Chat"
// // // // // // // // // //                 style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
// // // // // // // // // //                 onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
// // // // // // // // // //               />
// // // // // // // // // //             )}
// // // // // // // // // //             <div className={`status-icon ${chat.status}`}>
// // // // // // // // // //               {chat.status === "sent" && <FaCheck size={10} />}
// // // // // // // // // //               {chat.status === "received" && <FaCheckDouble size={11} />}
// // // // // // // // // //               {chat.status === "seen" && <FaCheckDouble className="seen" size={10} />}
// // // // // // // // // //             </div>
// // // // // // // // // //             {showDeleteOptions && selectedMessageId === chat._id && (
// // // // // // // // // //               <div
// // // // // // // // // //                 className={`options ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
// // // // // // // // // //                 ref={deleteOptionsRef}
// // // // // // // // // //               >
// // // // // // // // // //                 <button onClick={() => handleDelete(chat._id, false)}>Delete for You</button>
// // // // // // // // // //                 {chat.sender === localStorage.getItem("username") && (
// // // // // // // // // //                   <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// // // // // // // // // //                 )}
// // // // // // // // // //               </div>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //       <div className="chat-input">
// // // // // // // // // //         <input
// // // // // // // // // //           type="text"
// // // // // // // // // //           placeholder="Message"
// // // // // // // // // //           value={message}
// // // // // // // // // //           onChange={(e) => setMessage(e.target.value)}
// // // // // // // // // //         />
// // // // // // // // // //         <label htmlFor="file-upload" className="custom-file-upload">
// // // // // // // // // //           <FaPaperclip size={20} />
// // // // // // // // // //         </label>
// // // // // // // // // //         <input
// // // // // // // // // //           id="file-upload"
// // // // // // // // // //           type="file"
// // // // // // // // // //           accept="image/*"
// // // // // // // // // //           onChange={handleImageChange}
// // // // // // // // // //           ref={imageInputRef}
// // // // // // // // // //         />
// // // // // // // // // //         <button onClick={sendMessage}>Send</button>
// // // // // // // // // //       </div>
// // // // // // // // // //       {showFullView && (
// // // // // // // // // //         <Update
// // // // // // // // // //           imageUrl={`http://localhost:5000/${selectedUser.profilePicture}`}
// // // // // // // // // //           username={selectedUser.username}
// // // // // // // // // //           phone={selectedUser.phone}
// // // // // // // // // //           closeOverlay={closeOverlayMainImage}
// // // // // // // // // //         />
// // // // // // // // // //       )}

// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default Chat;




// // // // // // // // // //SHOW WHICH USER LOGIN THOSE ALSO SEE

// // // // // // // // // import React, { useEffect, useState } from "react";

// // // // // // // // // const UserList = ({ onSelectUser }) => {
// // // // // // // // //   const [users, setUsers] = useState([]);
// // // // // // // // //   const [activeIndex, setActiveIndex] = useState(null); // State to keep track of the active list item
// // // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // // //   const [latestMessages, setLatestMessages] = useState({}); // State for latest messages
// // // // // // // // //   const [loggedInUser, setLoggedInUser] = useState(null); // State for logged-in user
// // // // // // // // //   const [showUserList, setShowUserList] = useState(false); // State for showing user list

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchLoggedInUser = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const storedUsername = localStorage.getItem("username");
// // // // // // // // //         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
// // // // // // // // //         if (!response.ok) {
// // // // // // // // //           throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // //         }
// // // // // // // // //         const data = await response.json();
// // // // // // // // //         console.log("Sssssss",data.user)
// // // // // // // // //         setLoggedInUser(data.user); // Assuming the response has a field 'user' containing the user object
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error fetching logged-in user:", error.message);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchLoggedInUser();
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchUsers = async () => {
// // // // // // // // //       try {
// // // // // // // // //         const response = await fetch("http://localhost:5000/api/register");
// // // // // // // // //         if (!response.ok) {
// // // // // // // // //           throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // //         }
// // // // // // // // //         const data = await response.json();
// // // // // // // // //         console.log("Fetched users:", data.users);
// // // // // // // // //         setUsers(data.users); // Assuming the response has a field 'users' containing an array of user objects
// // // // // // // // //       } catch (error) {
// // // // // // // // //         console.error("Error fetching users:", error.message);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchUsers();
// // // // // // // // //   }, []);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchLatestMessages = async () => {
// // // // // // // // //       const storedUsername = localStorage.getItem("username");
// // // // // // // // //       const latestMessages = {};

// // // // // // // // //       for (const user of users) {
// // // // // // // // //         try {
// // // // // // // // //           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
// // // // // // // // //           if (!response.ok) {
// // // // // // // // //             throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // // //           }
// // // // // // // // //           const data = await response.json();
// // // // // // // // //           latestMessages[user.phone] = data.message;
// // // // // // // // //         } catch (error) {
// // // // // // // // //           console.error("Error fetching latest message:", error.message);
// // // // // // // // //         }
// // // // // // // // //       }

// // // // // // // // //       setLatestMessages(latestMessages);
// // // // // // // // //     };

// // // // // // // // //     if (users.length > 0) {
// // // // // // // // //       fetchLatestMessages();
// // // // // // // // //     }
// // // // // // // // //   }, [users]);

// // // // // // // // //   const handleClick = (user, index) => {
// // // // // // // // //     setActiveIndex(index); // Update active index
// // // // // // // // //     onSelectUser(user); // Call onSelectUser callback
// // // // // // // // //   };

// // // // // // // // //   const handleImageClick = (e, imageUrl) => {
// // // // // // // // //     e.stopPropagation(); // Prevent click event from propagating to the parent
// // // // // // // // //     setOverlayImage(imageUrl); // Show the overlay image
// // // // // // // // //   };

// // // // // // // // //   const closeOverlay = () => {
// // // // // // // // //     setOverlayImage(null); // Close the overlay
// // // // // // // // //   };

// // // // // // // // //   const handleProfileImageClick = () => {
// // // // // // // // //     setShowUserList(!showUserList); // Toggle the user list visibility
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <>
// // // // // // // // //       {loggedInUser && (
// // // // // // // // //         <div className="logged-in-user" onClick={handleProfileImageClick}>
// // // // // // // // //           <img
// // // // // // // // //             src={`http://localhost:5000/${loggedInUser.profilePicture}`}
// // // // // // // // //             alt="Profile"
// // // // // // // // //             style={{ height: "40px", width: "40px", marginLeft: "10px",marginRight: "20px", borderRadius: "50%"}}
// // // // // // // // //           />
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //       <div className="user-list">
// // // // // // // // //         <h2>Users</h2>
// // // // // // // // //         <ul>
// // // // // // // // //           {users.map((user, index) => (
// // // // // // // // //             <li
// // // // // // // // //               key={index}
// // // // // // // // //               className={activeIndex === index ? "active" : ""}
// // // // // // // // //               onClick={() => handleClick(user, index)}
// // // // // // // // //             >
// // // // // // // // //               <img
// // // // // // // // //                 src={`http://localhost:5000/${user.profilePicture}`}
// // // // // // // // //                 alt="Profile"
// // // // // // // // //                 style={{ height: "40px", width: "40px", marginRight: "20px", borderRadius: "50%" }}
// // // // // // // // //                 onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
// // // // // // // // //               />
// // // // // // // // //               <div className="user-info">
// // // // // // // // //                 <p style={{ height: "8px", fontWeight: "bold" }}>{user.username}</p>
// // // // // // // // //                 <p style={{ height: "8px" }} className="latest-message">{latestMessages[user.phone]}</p>
// // // // // // // // //               </div>
// // // // // // // // //             </li>
// // // // // // // // //           ))}
// // // // // // // // //         </ul>
// // // // // // // // //         {overlayImage && (
// // // // // // // // //           <div className="overlay" onClick={closeOverlay}>
// // // // // // // // //             <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>
// // // // // // // // //     </>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default UserList;







// // // // // // // // // ----------------------------------------------

// // // // // // // // //NOT SHOW LOG IN USER

// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import UserDetails from "./UserDetails";

// // // // // // // // const UserList = ({ onSelectUser }) => {
// // // // // // // //   const [users, setUsers] = useState([]);
// // // // // // // //   const [activeIndex, setActiveIndex] = useState(null); // State to keep track of the active list item
// // // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // // //   const [latestMessages, setLatestMessages] = useState({}); // State for latest messages
// // // // // // // //   const [loggedInUser, setLoggedInUser] = useState(null); // State for logged-in user
// // // // // // // //   const [showUserList, setShowUserList] = useState(false); // State for showing user 
// // // // // // // //   const [selectedUser, setSelectedUser] = useState(null); // State for selected user

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchLoggedInUser = async () => {
// // // // // // // //       try {
// // // // // // // //         const storedUsername = localStorage.getItem("username");
// // // // // // // //         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
// // // // // // // //         if (!response.ok) {
// // // // // // // //           throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // //         }
// // // // // // // //         const data = await response.json();
// // // // // // // //         console.log("Sssssss", data.user);
// // // // // // // //         setLoggedInUser(data.user); // Assuming the response has a field 'user' containing the user object
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("Error fetching logged-in user:", error.message);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchLoggedInUser();
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchUsers = async () => {
// // // // // // // //       try {
// // // // // // // //         const response = await fetch("http://localhost:5000/api/register");
// // // // // // // //         if (!response.ok) {
// // // // // // // //           throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // //         }
// // // // // // // //         const data = await response.json();
// // // // // // // //         console.log("Fetched users:", data.users);
// // // // // // // //         setUsers(data.users); // Assuming the response has a field 'users' containing an array of user objects
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("Error fetching users:", error.message);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchUsers();
// // // // // // // //   }, []);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchLatestMessages = async () => {
// // // // // // // //       const storedUsername = localStorage.getItem("username");
// // // // // // // //       const latestMessages = {};

// // // // // // // //       for (const user of users) {
// // // // // // // //         try {
// // // // // // // //           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
// // // // // // // //           if (!response.ok) {
// // // // // // // //             throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // // //           }
// // // // // // // //           const data = await response.json();
// // // // // // // //           latestMessages[user.phone] = data.message;
// // // // // // // //         } catch (error) {
// // // // // // // //           console.error("Error fetching latest message:", error.message);
// // // // // // // //         }
// // // // // // // //       }

// // // // // // // //       setLatestMessages(latestMessages);
// // // // // // // //     };

// // // // // // // //     if (users.length > 0) {
// // // // // // // //       fetchLatestMessages();
// // // // // // // //     }
// // // // // // // //   }, [users]);

// // // // // // // //   const handleClick = (user, index) => {
// // // // // // // //     setActiveIndex(index); // Update active index
// // // // // // // //     onSelectUser(user); // Call onSelectUser callback
// // // // // // // //     // setSelectedUser(user); // Show the selected user details
// // // // // // // //   };

// // // // // // // //   const handleImageClick = (e, imageUrl) => {
// // // // // // // //     e.stopPropagation(); // Prevent click event from propagating to the parent
// // // // // // // //     setOverlayImage(imageUrl); // Show the overlay image
// // // // // // // //   };

// // // // // // // //   const closeOverlay = () => {
// // // // // // // //     setOverlayImage(null); // Close the overlay
// // // // // // // //   };

// // // // // // // //   const closeOverlayProfile = () => {
// // // // // // // //     setSelectedUser(null); // Close the overlay
// // // // // // // //   };

// // // // // // // //   const handleProfileImageClick = () => {
// // // // // // // //     setSelectedUser(loggedInUser); // Set the selected user to the logged-in user
// // // // // // // //     setShowUserList(!showUserList); // Toggle the user list visibility
// // // // // // // //   };

// // // // // // // //   function truncateUsername(username) {
// // // // // // // //     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <>
// // // // // // // //       {loggedInUser && (
// // // // // // // //         <div className="logged-in-user" onClick={handleProfileImageClick}>
// // // // // // // //           <img
// // // // // // // //             src={`http://localhost:5000/${loggedInUser.profilePicture}`}
// // // // // // // //             alt="Profile"
// // // // // // // //             style={{ height: "40px", width: "40px", marginLeft: "10px", marginRight: "20px", borderRadius: "50%" }}
// // // // // // // //           />
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //       <div className="user-list">
// // // // // // // //         <h2>Users</h2>
// // // // // // // //         <ul>
// // // // // // // //           {users
// // // // // // // //             .filter(user => user.phone !== loggedInUser?.phone) // Exclude the logged-in user
// // // // // // // //             .map((user, index) => (
// // // // // // // //               <li
// // // // // // // //                 key={index}
// // // // // // // //                 className={activeIndex === index ? "active" : ""}
// // // // // // // //                 onClick={() => handleClick(user, index)}
// // // // // // // //               >
// // // // // // // //                 <img
// // // // // // // //                   src={`http://localhost:5000/${user.profilePicture}`}
// // // // // // // //                   alt="Profile"
// // // // // // // //                   style={{
// // // // // // // //                     height: "40px", width: "40px", marginRight: "20px", borderRadius: "50%",
// // // // // // // //                     objectFit: "cover",
// // // // // // // //                     // objectPosition: "center"
// // // // // // // //                   }}
// // // // // // // //                   onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
// // // // // // // //                 />
// // // // // // // //                 <div className="user-info">
// // // // // // // //                   <p style={{ height: "8px", fontWeight: "bold" }}>{truncateUsername(user.username)}</p>
// // // // // // // //                   <p style={{ height: "8px" }} className="latest-message">{latestMessages[user.phone]}</p>
// // // // // // // //                 </div>
// // // // // // // //               </li>
// // // // // // // //             ))}
// // // // // // // //         </ul>
// // // // // // // //         {overlayImage && (
// // // // // // // //           <div className="overlay" onClick={closeOverlay}>
// // // // // // // //             <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //       <div className="user-details-right">
// // // // // // // //         <UserDetails user={selectedUser} closeOverlayProfile={closeOverlayProfile} />
// // // // // // // //       </div>
// // // // // // // //     </>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default UserList;















// // // // // // // //SHOW YOU

// // // // // // // import React, { useEffect, useState } from "react";

// // // // // // // const UserList = ({ onSelectUser }) => {
// // // // // // //   const [users, setUsers] = useState([]);
// // // // // // //   const [activeIndex, setActiveIndex] = useState(null); // State to keep track of the active list item
// // // // // // //   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
// // // // // // //   const [latestMessages, setLatestMessages] = useState({}); // State for latest messages
// // // // // // //   const [loggedInUser, setLoggedInUser] = useState(null); // State for logged-in user
// // // // // // //   const [showUserList, setShowUserList] = useState(false); // State for showing user list

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchLoggedInUser = async () => {
// // // // // // //       try {
// // // // // // //         const storedUsername = localStorage.getItem("username");
// // // // // // //         const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
// // // // // // //         if (!response.ok) {
// // // // // // //           throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // //         }
// // // // // // //         const data = await response.json();
// // // // // // //         setLoggedInUser(data.user); // Assuming the response has a field 'user' containing the user object
// // // // // // //       } catch (error) {
// // // // // // //         console.error("Error fetching logged-in user:", error.message);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchLoggedInUser();
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchUsers = async () => {
// // // // // // //       try {
// // // // // // //         const response = await fetch("http://localhost:5000/api/register");
// // // // // // //         if (!response.ok) {
// // // // // // //           throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // //         }
// // // // // // //         const data = await response.json();
// // // // // // //         setUsers(data.users); // Assuming the response has a field 'users' containing an array of user objects
// // // // // // //       } catch (error) {
// // // // // // //         console.error("Error fetching users:", error.message);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchUsers();
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchLatestMessages = async () => {
// // // // // // //       const storedUsername = localStorage.getItem("username");
// // // // // // //       const latestMessages = {};

// // // // // // //       for (const user of users) {
// // // // // // //         try {
// // // // // // //           const response = await fetch(`http://localhost:5000/api/latestmessage?user1=${storedUsername}&user2=${user.phone}`);
// // // // // // //           if (!response.ok) {
// // // // // // //             throw new Error(`HTTP error! Status: ${response.status}`);
// // // // // // //           }
// // // // // // //           const data = await response.json();
// // // // // // //           latestMessages[user.phone] = data.message;
// // // // // // //         } catch (error) {
// // // // // // //           console.error("Error fetching latest message:", error.message);
// // // // // // //         }
// // // // // // //       }

// // // // // // //       setLatestMessages(latestMessages);
// // // // // // //     };

// // // // // // //     if (users.length > 0) {
// // // // // // //       fetchLatestMessages();
// // // // // // //     }
// // // // // // //   }, [users]);

// // // // // // //   const handleClick = (user, index) => {
// // // // // // //     setActiveIndex(index); // Update active index
// // // // // // //     onSelectUser(user); // Call onSelectUser callback
// // // // // // //   };

// // // // // // //   const handleImageClick = (e, imageUrl) => {
// // // // // // //     e.stopPropagation(); // Prevent click event from propagating to the parent
// // // // // // //     setOverlayImage(imageUrl); // Show the overlay image
// // // // // // //   };

// // // // // // //   const closeOverlay = () => {
// // // // // // //     setOverlayImage(null); // Close the overlay
// // // // // // //   };

// // // // // // //   const handleProfileImageClick = () => {
// // // // // // //     setShowUserList(!showUserList); // Toggle the user list visibility
// // // // // // //   };

// // // // // // //   function truncateUsername(username) {
// // // // // // //     return username.length > 23 ? `${username.slice(0, 23)}...` : username;
// // // // // // //   }

// // // // // // //   // Function to sort users array, prioritizing logged-in user's chat
// // // // // // //   const sortedUsers = [...users].sort((a, b) => {
// // // // // // //     if (loggedInUser && a.phone === loggedInUser.phone) return -1;
// // // // // // //     if (loggedInUser && b.phone === loggedInUser.phone) return 1;
// // // // // // //     return 0;
// // // // // // //   });

// // // // // // //   return (
// // // // // // //     <>
// // // // // // //       {loggedInUser && (
// // // // // // //         <div className="logged-in-user" onClick={handleProfileImageClick}>
// // // // // // //           <img
// // // // // // //             src={`http://localhost:5000/${loggedInUser.profilePicture}`}
// // // // // // //             alt="Profile"
// // // // // // //             style={{ height: "40px", width: "40px", marginLeft: "10px", marginRight: "20px", borderRadius: "50%" }}
// // // // // // //           />
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //       <div className="user-list">
// // // // // // //         <h2>Users</h2>
// // // // // // //         <ul>
// // // // // // //           {sortedUsers.map((user, index) => (
// // // // // // //             <li
// // // // // // //               key={index}
// // // // // // //               className={activeIndex === index ? "active" : ""}
// // // // // // //               onClick={() => handleClick(user, index)}
// // // // // // //             >
// // // // // // //               <img
// // // // // // //                 src={`http://localhost:5000/${user.profilePicture}`}
// // // // // // //                 alt="Profile"
// // // // // // //                 style={{
// // // // // // //                   height: "40px", width: "40px", marginRight: "20px", borderRadius: "50%",
// // // // // // //                   objectFit: "cover",
// // // // // // //                   // objectPosition: "center"
// // // // // // //                 }}
// // // // // // //                 onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
// // // // // // //               />
// // // // // // //               <div className="user-info">
// // // // // // //                 <p style={{ height: "8px", fontWeight: "bold" }}>{user.phone === loggedInUser.phone ? "You" : truncateUsername(user.username)}</p>
// // // // // // //                 <p style={{ height: "8px" }} className="latest-message">{latestMessages[user.phone]}</p>
// // // // // // //               </div>
// // // // // // //             </li>
// // // // // // //           ))}
// // // // // // //         </ul>
// // // // // // //         {overlayImage && (
// // // // // // //           <div className="overlay" onClick={closeOverlay}>
// // // // // // //             <img src={overlayImage} alt="Full View" className="overlay-image" />
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default UserList;















// // // // // // ////////////////////////////////////////////////////////////////////////////////

// // // // // // // NOT SHOW LOGGEDIN USER THEN USE IT

// // // // // // <ul>
// // // // // // {users
// // // // // //   .filter(user => user.phone !== loggedInUser?.phone) // Exclude the logged-in user
// // // // // //   .map((user, index) => (
// // // // // //     <li
// // // // // //       key={index}
// // // // // //       className={activeIndex === index ? "active" : ""}
// // // // // //       onClick={() => handleClick(user, index)}
// // // // // //     >
// // // // // //       <img
// // // // // //         src={`http://localhost:5000/${user.profilePicture}`}
// // // // // //         alt="Profile"
// // // // // //         style={{ height: "40px", width: "40px", marginRight: "20px", borderRadius: "50%",
// // // // // //           objectFit: "cover", 
// // // // // //           // objectPosition: "center"
// // // // // //            }}
// // // // // //         onClick={(e) => handleImageClick(e, `http://localhost:5000/${user.profilePicture}`)}
// // // // // //       />
// // // // // //       <div className="user-info">
// // // // // //         <p style={{ height: "8px", fontWeight: "bold" }}>{truncateUsername(user.username)}</p>
// // // // // //         <p style={{ height: "8px" }} className="latest-message">{latestMessages[user.phone]}</p>
// // // // // //       </div>
// // // // // //     </li>
// // // // // //   ))}
// // // // // // </ul>



// // // // // //-----------------

// // // // // // UPDATE AND CANCLE BUTTON SHOW TO UPDATE COMPO

// // // // // import React, { useState } from 'react';

// // // // // const Update = ({ imageUrl, username, phone, closeOverlay, onUpdateProfile }) => {
// // // // //   const [newUsername, setNewUsername] = useState(username);
// // // // //   const [newImage, setNewImage] = useState(null);
// // // // //   const [removeImage, setRemoveImage] = useState(false);
// // // // //   const [showOptions, setShowOptions] = useState(false);

// // // // //   const handleSubmit = (e) => {
// // // // //     e.preventDefault();
// // // // //     onUpdateProfile(newUsername, newImage, removeImage);
// // // // //     closeOverlay();
// // // // //   };

// // // // //   const handleImageChange = (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) {
// // // // //       setNewImage(file);
// // // // //     }
// // // // //   };

// // // // //   const handleRemoveImage = () => {
// // // // //     setRemoveImage(true);
// // // // //     setNewImage(null);
// // // // //   };

// // // // //   const toggleOptions = () => {
// // // // //     setShowOptions(!showOptions);
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <div className="overlay">
// // // // //         <form onSubmit={handleSubmit}>
// // // // //           <div className='update-form-img'>
// // // // //             <img src={imageUrl} alt="Profile" className='overlay-image-profile' onClick={toggleOptions} />
// // // // //             {showOptions && (
// // // // //               <div className="image-options">
// // // // //                 <input type="file" accept="image/*" onChange={handleImageChange} />
// // // // //                 <button type="button" onClick={handleRemoveImage}>Remove Image</button>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //           <div>
// // // // //             <label>Username</label>
// // // // //             <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
// // // // //           </div>
// // // // //           <div className='update-form-btn'>
// // // // //             <button type="submit">Update</button>
// // // // //             <button type="button" onClick={closeOverlay}>Cancel</button>
// // // // //           </div>
// // // // //         </form>
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default Update;



// // // // // -----------------------------------------------
// // // // // SELECT OPTION FOR VIEW IMAGE OR ALSO

// // // // import React, { useState, useEffect } from 'react';

// // // // const Update = ({ imageUrl, username, phone, closeOverlay, onUpdateProfile }) => {
// // // //   const [newUsername, setNewUsername] = useState(username);
// // // //   const [newImage, setNewImage] = useState(null);
// // // //   const [removeImage, setRemoveImage] = useState(false);
// // // //   const [showOptions, setShowOptions] = useState(false);
// // // //   const [showFullImage, setShowFullImage] = useState(false);

// // // //   const storedUsername = localStorage.getItem('username');

// // // //   const handleImageChange = (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (file) {
// // // //       setNewImage(file);
// // // //       setRemoveImage(false); // Reset removeImage state
// // // //       onUpdateProfile(newUsername, file, false);
// // // //     }
// // // //   };

// // // //   const handleRemoveImage = () => {
// // // //     setRemoveImage(true);
// // // //     setNewImage(null);
// // // //     setShowOptions(false); // Hide options after removing image
// // // //     onUpdateProfile(newUsername, null, true);
// // // //   };

// // // //   const handleViewImage = () => {
// // // //     setShowFullImage(true);
// // // //     setShowOptions(false); // Hide options after viewing image
// // // //   };

// // // //   const handleFileInputClick = () => {
// // // //     document.getElementById('fileupload').click();
// // // //   };

// // // //   const handleOptionChange = (e) => {
// // // //     const selectedOption = e.target.value;
// // // //     switch (selectedOption) {
// // // //       case 'view':
// // // //         handleViewImage();
// // // //         break;
// // // //       case 'upload':
// // // //         handleFileInputClick();
// // // //         break;
// // // //       case 'remove':
// // // //         handleRemoveImage();
// // // //         break;
// // // //       default:
// // // //         break;
// // // //     }
// // // //     setShowOptions(false);
// // // //   };

// // // //   const toggleOptions = () => {
// // // //     setShowOptions(!showOptions);
// // // //   };

// // // //   useEffect(() => {
// // // //     onUpdateProfile(newUsername, newImage, removeImage);
// // // //   }, [newUsername, newImage, removeImage, onUpdateProfile]);

// // // //   return (
// // // //     <>
// // // //       <div className="overlay">
// // // //         <form>
// // // //           <div className='image-container'>
// // // //             <img
// // // //               src={newImage ? URL.createObjectURL(newImage) : imageUrl}
// // // //               alt="Profile"
// // // //               className='overlay-image-profile'
// // // //               onClick={toggleOptions}
// // // //             />
// // // //             {showOptions && (
// // // //               <div className="image-options">
// // // //                 <select onChange={handleOptionChange}>
// // // //                   <option value="">Select Option</option>
// // // //                   <option value="view">View Image</option>
// // // //                   {storedUsername === phone && (
// // // //                     <>
// // // //                       <option value="remove">Remove Image</option>
// // // //                       <option value="upload">Upload Image</option>
// // // //                     </>
// // // //                   )}
// // // //                 </select>
// // // //                 <input
// // // //                   type="file"
// // // //                   accept="image/*"
// // // //                   onChange={handleImageChange}
// // // //                   id="fileupload"
// // // //                   style={{ display: 'none' }}
// // // //                 />
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //           {storedUsername === phone && (
// // // //             <div>
// // // //               <label>Username</label>
// // // //               <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
// // // //             </div>
// // // //           )}
// // // //         </form>
// // // //       </div>
// // // //       {showFullImage && (
// // // //         <div className="overlay" onClick={() => setShowFullImage(false)}>
// // // //           <img src={newImage ? URL.createObjectURL(newImage) : imageUrl} alt="Full View" className="overlay-image" />
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // };

// // // // export default Update;



// // // // ---------------------------------

// // // // SHOW BUTTON VIEW IMAGE    FIRSTTTTTTTTTTTTTTTTT



// // // import React, { useState, useEffect } from 'react';

// // // const Update = ({ imageUrl, username, phone, closeOverlay, onUpdateProfile }) => {
// // //   const [newUsername, setNewUsername] = useState(username);
// // //   const [newImage, setNewImage] = useState(null);
// // //   const [removeImage, setRemoveImage] = useState(false);
// // //   const [showOptions, setShowOptions] = useState(false);
// // //   const [showFullImage, setShowFullImage] = useState(false);

// // //   const storedUsername = localStorage.getItem('username');

// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setNewImage(file);
// // //       setRemoveImage(false); // Reset removeImage state
// // //       onUpdateProfile(newUsername, file, false);
// // //     }
// // //   };

// // //   const handleRemoveImage = () => {
// // //     setRemoveImage(true);
// // //     setNewImage(null);
// // //     setShowOptions(false); // Hide options after removing image
// // //     onUpdateProfile(newUsername, null, true);
// // //   };

// // //   const handleViewImage = () => {
// // //     setShowFullImage(true);
// // //     setShowOptions(false); // Hide options after viewing image
// // //   };

// // //   const handleFileInputClick = () => {
// // //     document.getElementById('fileupload').click();
// // //   };

// // //   const toggleOptions = () => {
// // //     setShowOptions(!showOptions);
// // //   };

// // //   useEffect(() => {
// // //     onUpdateProfile(newUsername, newImage, removeImage);
// // //   }, [newUsername, newImage, removeImage, onUpdateProfile]);

// // //   return (
// // //     <>
// // //       <div className="overlay" >
// // //         <form>
// // //           <div className='image-container' >
// // //             <img
// // //               src={newImage ? URL.createObjectURL(newImage) : imageUrl}
// // //               alt="Profile"
// // //               className='overlay-image-profile'
// // //               onClick={toggleOptions}
// // //             />
// // //             {/* <div className="overlay-text">Change Profile Photo</div> */}
// // //             {showOptions && (
// // //               <div className="image-options">
// // //                 <button type="button" onClick={handleViewImage}>View Image</button>
// // //                 {storedUsername === phone && (
// // //                   <>
// // //                     <button type="button" onClick={handleRemoveImage}>Remove Image</button>
// // //                     <button type="button" onClick={handleFileInputClick}>Upload Image</button>
// // //                     <input
// // //                       type="file"
// // //                       accept="image/*"
// // //                       onChange={handleImageChange}
// // //                       id="fileupload"
// // //                       style={{ display: 'none' }}
// // //                     />
// // //                   </>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>
// // //           {storedUsername === phone && (
// // //             <div>
// // //               <label>Username</label>
// // //               <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
// // //             </div>
// // //           )}
// // //         </form>
// // //       </div>
// // //       {showFullImage && (
// // //         <div className="overlay" onClick={() => setShowFullImage(false)}>
// // //           <img src={newImage ? URL.createObjectURL(newImage) : imageUrl} alt="Full View" className="overlay-image" />
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default Update;




// // ----------------------------------------------------------------------
// // ----------------------------------------------------------------------------------------------------------

// // // WHEN BY DEAFLUT USERNAME SAVE WITHOUT ANY CLICK


// // import React, { useState, useEffect } from 'react';

// // const Update = ({ imageUrl, username, phone, closeOverlay, onUpdateProfile }) => {
// //   const [newUsername, setNewUsername] = useState(username);
// //   const [newImage, setNewImage] = useState(null);
// //   const [removeImage, setRemoveImage] = useState(false);
// //   const [showOptions, setShowOptions] = useState(false);
// //   const [showFullImage, setShowFullImage] = useState(false);

// //   const storedUsername = localStorage.getItem('username');

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setNewImage(file);
// //       setRemoveImage(false); // Reset removeImage state
// //       onUpdateProfile(newUsername, file, false);
// //     }
// //   };

// //   const handleRemoveImage = () => {
// //     setRemoveImage(true);
// //     setNewImage(null);
// //     setShowOptions(false); // Hide options after removing image
// //     onUpdateProfile(newUsername, null, true);
// //   };

// //   const handleViewImage = () => {
// //     setShowFullImage(true);
// //     setShowOptions(false); // Hide options after viewing image
// //   };

// //   const handleFileInputClick = () => {
// //     document.getElementById('fileupload').click();
// //   };

// //   const toggleOptions = () => {
// //     setShowOptions(!showOptions);
// //   };

// //   useEffect(() => {
// //     onUpdateProfile(newUsername, newImage, removeImage);
// //   }, [newUsername, newImage, removeImage, onUpdateProfile]);

// //   return (
// //     <>
// //       <div className="overlay" onClick={closeOverlay}>
// //         <form onClick={(e) => e.stopPropagation()}>
// //           <div className="image-container">
// //             <img
// //               src={newImage ? URL.createObjectURL(newImage) : imageUrl}
// //               alt="Profile"
// //               className="overlay-image-profile"
// //               onClick={toggleOptions}
// //             />
// //             {showOptions && (
// //               <div className="image-options">
// //                 <ul>
// //                   <li>
// //                     <div onClick={handleViewImage}>View Image</div>
// //                   </li>
// //                   {storedUsername === phone && (
// //                     <>
// //                       <li>
// //                         <div onClick={handleRemoveImage}>Remove Image</div>
// //                       </li>
// //                       <li>
// //                         <div onClick={handleFileInputClick}>Upload Image</div>
// //                         <input
// //                           type="file"
// //                           accept="image/*"
// //                           onChange={handleImageChange}
// //                           id="fileupload"
// //                           style={{ display: 'none' }}
// //                         />
// //                       </li>
// //                     </>
// //                   )}
// //                 </ul>
// //               </div>
// //             )}
// //           </div>
// //           {storedUsername === phone && (
// //             <div className='update-form-input'>
// //               <label>Username</label>
// //               <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
// //             </div>
// //           )}
// //           <div className='update-form-input'>
// //             <label>Phone</label>
// //             <input type="text" value={phone} readOnly />
// //           </div>
// //         </form>
// //       </div>
// //       {showFullImage && (
// //         <div className="overlay" onClick={() => setShowFullImage(false)}>
// //           <img src={newImage ? URL.createObjectURL(newImage) : imageUrl} alt="Full View" className="overlay-image" />
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Update;








// // ----------------------------------------------------------------------
// // ----------------------------------------------------------------------------------------------------------

// // // ONLY PROVIDE ONE UPDATE BUTTON AND CLICK USER UPDATE


// // import React, { useState } from 'react';

// // const Update = ({ imageUrl, username, phone, closeOverlay, onUpdateProfile }) => {
// //   const [newUsername, setNewUsername] = useState(username);
// //   const [newImage, setNewImage] = useState(null);
// //   const [removeImage, setRemoveImage] = useState(false);
// //   const [showOptions, setShowOptions] = useState(false);
// //   const [showFullImage, setShowFullImage] = useState(false);

// //   const storedUsername = localStorage.getItem('username');

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setNewImage(file);
// //       setRemoveImage(false); // Reset removeImage state
// //     }
// //   };

// //   const handleRemoveImage = () => {
// //     setRemoveImage(true);
// //     setNewImage(null);
// //     setShowOptions(false); // Hide options after removing image
// //   };

// //   const handleViewImage = () => {
// //     setShowFullImage(true);
// //     setShowOptions(false); // Hide options after viewing image
// //   };

// //   const handleFileInputClick = () => {
// //     document.getElementById('fileupload').click();
// //   };

// //   const toggleOptions = () => {
// //     setShowOptions(!showOptions);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onUpdateProfile(newUsername, newImage, removeImage);
// //   };

// //   return (
// //     <>
// //       <div className="overlay" onClick={closeOverlay}>
// //         <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
// //           <div className="image-container">
// //             <img
// //               src={newImage ? URL.createObjectURL(newImage) : imageUrl}
// //               alt="Profile"
// //               className="overlay-image-profile"
// //               onClick={toggleOptions}
// //             />
// //             {showOptions && (
// //               <div className="image-options">
// //                 <ul>
// //                   <li>
// //                     <div onClick={handleViewImage}>View Image</div>
// //                   </li>
// //                   {storedUsername === phone && (
// //                     <>
// //                       <li>
// //                         <div onClick={handleRemoveImage}>Remove Image</div>
// //                       </li>
// //                       <li>
// //                         <div onClick={handleFileInputClick}>Upload Image</div>
// //                         <input
// //                           type="file"
// //                           accept="image/*"
// //                           onChange={handleImageChange}
// //                           id="fileupload"
// //                           style={{ display: 'none' }}
// //                         />
// //                       </li>
// //                     </>
// //                   )}
// //                 </ul>
// //               </div>
// //             )}
// //           </div>
// //           {storedUsername === phone && (
// //             <div className='update-form-input'>
// //               <label>Username</label>
// //               <input
// //                 type="text"
// //                 value={newUsername}
// //                 onChange={(e) => setNewUsername(e.target.value)}
// //               />
// //             </div>
// //           )}
// //           <div className='update-form-input'>
// //             <label>Phone</label>
// //             <input type="text" value={phone} readOnly />
// //           </div>
// //           {storedUsername === phone && (
// //             <button type="submit">Update Profile</button>
// //           )}
// //         </form>
// //       </div>
// //       {showFullImage && (
// //         <div className="overlay" onClick={() => setShowFullImage(false)}>
// //           <img src={newImage ? URL.createObjectURL(newImage) : imageUrl} alt="Full View" className="overlay-image" />
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default Update;




// /////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////
// ////////////////////////////////////////////////


// // SEND PDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF



// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import io from "socket.io-client";
// import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// import { fetchChats, deleteChat } from "../actions/chatAction";
// import Update from "./Update";
// import { useNavigate } from "react-router-dom";

// const socket = io("http://localhost:5000");

// const Chat = ({ selectedUser }) => {
//   const [message, setMessage] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
//   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
//   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
//   const [filteredChats, setFilteredChats] = useState([]); // State to store filtered chats
//   const dispatch = useDispatch();
//   const { chats, loading, error } = useSelector((state) => state.chat);
//   const chatContainerRef = useRef(null);
//   const imageInputRef = useRef(null);
//   const deleteOptionsRef = useRef(null); // Ref for delete options
//   const [showFullView, setShowFullView] = useState(false);

//   const navigate = useNavigate();

//   const handleNavbarClick = () => {
//     setShowFullView(true);
//   };

//   const closeOverlayMainImage = () => {
//     setShowFullView(false);
//   };

//   const handleUpdateProfile = async (newUsername, newImage, removeImage) => {
//     const formData = new FormData();
//     formData.append("username", selectedUser.username);
//     if (newUsername) {
//       formData.append("newUsername", newUsername);
//     }
//     if (newImage) {
//       formData.append("profilePicture", newImage);
//     }
//     if (removeImage) {
//       formData.append("removeProfilePicture", "true");
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/updateprofile", {
//         method: "PUT",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Profile updated:", data);
//       // Update local user state or re-fetch user data if necessary
//     } catch (error) {
//       console.error("Error updating profile:", error.message);
//     }
//   };

//   // const handleUpdateImage = (newImage) => {
//   //   // Handle image update logic here
//   //   console.log("New Image:", newImage);
//   // };

//   // const handleRemoveImage = () => {
//   //   // Handle image remove logic here
//   //   console.log("Remove Image");
//   // };

//   // const handleUpdateUsername = (newUsername) => {
//   //   // Handle username update logic here
//   //   console.log("New Username:", newUsername);
//   // };

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       socket.emit("userConnected", storedUsername);
//     }

//     dispatch(fetchChats(navigate));

//     socket.on("receiveMessage", (chat) => {
//       chat.senderIsSelf = chat.sender === storedUsername;
//       dispatch({ type: "ADD_CHAT", payload: chat });
//     });

//     socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
//       if (deleteForBoth && user === storedUsername) {
//         // Remove message from UI but keep in database
//         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
//       } else {
//         // Remove message from UI and database
//         dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("messageDeleted");
//     };
//   }, [dispatch,navigate]);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     const filtered = chats.filter(
//       (chat) =>
//         (chat.sender === storedUsername && chat.receiver === selectedUser.phone) ||
//         (chat.sender === selectedUser.phone && chat.receiver === storedUsername)
//     );
//     setFilteredChats(filtered);
//   }, [chats, selectedUser]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [filteredChats]);

//   const scrollToBottom = () => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   };

//   const sendMessage = async () => {
//     const actualUsername = localStorage.getItem("username");

//     const formData = new FormData();
//     formData.append("message", message);
//     formData.append("sender", actualUsername);
//     formData.append("receiver", selectedUser.phone);
//     if (selectedImage) {
//       formData.append("image", selectedImage);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/chats", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Message sent:", data);

//       setMessage("");
//       setSelectedImage(null);
//       if (imageInputRef.current) {
//         imageInputRef.current.value = "";
//       }

//       scrollToBottom(); // Scroll to bottom after sending a message
//     } catch (error) {
//       console.error("Error sending message:", error.message);
//       // Handle error (e.g., display an error message to the user)
//     }
//   };

//   const handleDelete = (id, deleteForBoth) => {
//     socket.emit("deleteMessage", {
//       id,
//       user: localStorage.getItem("username"),
//       deleteForBoth,
//     });

//     if (!deleteForBoth) {
//       // Remove message from UI only (not from database)
//       dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
//     } else {
//       // Remove message from UI and database
//       dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
//     }

//     setShowDeleteOptions(false); // Hide delete options
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//     if (file) {
//       setMessage(`Image: ${file.name}`);
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     setOverlayImage(imageUrl);
//   };

//   const closeOverlay = () => {
//     setOverlayImage(null);
//   };

//   const handleMessageClick = (id) => {
//     setSelectedMessageId(id);
//     setShowDeleteOptions(true);
//   };

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (deleteOptionsRef.current && !deleteOptionsRef.current.contains(event.target)) {
//         setShowDeleteOptions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   function truncateUsername(username) {
//     return username.length > 80 ? `${username.slice(0, 80)}...` : username;
//   }

//   const renderFileMessage = (chat) => {
//     if (chat.image) {
//       const fileExtension = chat.image.split(".").pop();
//       if (fileExtension === "pdf") {
//         return (
//           <a href={`http://localhost:5000/${chat.image}`} target="_blank" rel="noopener noreferrer">
//             View PDF
//           </a>
//         );
//       } else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
//         return <video src={`http://localhost:5000/${chat.image}`} controls style={{ maxWidth: "100%", maxHeight: "200px" }} />;
//       } else if (["mp3", "wav", "ogg"].includes(fileExtension)) {
//         return <audio src={`http://localhost:5000/${chat.image}`} controls />;
//       } else {
//         return (
//           <img
//             src={`http://localhost:5000/${chat.image}`}
//             alt="Chat"
//             style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
//             onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
//           />
//         );
//       }
//     }
//     return null;
//   };

//   return (
//     <div className="chat-container">
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <div className="chat-navbar" onClick={handleNavbarClick}>
//         <img
//           src={`http://localhost:5000/${selectedUser.profilePicture}`}
//           alt="Profile"
//           style={{ height: "40px", width: "40px", marginRight: "20px", borderRadius: "50%", objectFit: "cover" }}
//         />
//         <div className="chat-navbar-name">
//           <h3 style={{ textTransform: "capitalize" }}>{truncateUsername(selectedUser.username)}</h3>
//           <p>{selectedUser.phone}</p>
//         </div>
//       </div>
//       {/* <h1>Chat App</h1> */}

//       <div className="chat-messages" ref={chatContainerRef} >
//         {filteredChats.map((chat) => (
//           <div
//             key={chat._id}
//             className={`chat-message ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
//             onClick={() => handleMessageClick(chat._id)}
//           >
//             <p>
//               {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
//               {chat.message}
//               <span className="timestamp" style={{ marginLeft: "0.5rem", marginBottom: "0px" }}>{new Date(chat.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</span>
//             </p>
//             {/* <span className="timestamp">{new Date(chat.timestamp).toLocaleString()}</span> Display timestamp */}
//             {renderFileMessage(chat)}
//             <div className={`status-icon ${chat.status}`}>
//               {chat.status === "sent" && <FaCheck size={10} />}
//               {chat.status === "received" && <FaCheckDouble size={11} />}
//               {chat.status === "seen" && <FaCheckDouble className="seen" size={10} />}
//             </div>
//             {showDeleteOptions && selectedMessageId === chat._id && (
//               <div
//                 className={`options ${chat.sender === localStorage.getItem("username") ? "self" : "other"}`}
//                 ref={deleteOptionsRef}
//               >
//                 <button onClick={() => handleDelete(chat._id, false)}>Delete for You</button>
//                 {chat.sender === localStorage.getItem("username") && (
//                   <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <label htmlFor="file-upload" className="custom-file-upload">
//           <FaPaperclip size={20} />
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//          accept="image/*,video/*,audio/*,.pdf"
//           onChange={handleImageChange}
//           ref={imageInputRef}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       {overlayImage && (
//         <div className="overlay" onClick={closeOverlay}>
//           <img src={overlayImage} alt="Full View" className="overlay-image" />
//         </div>
//       )}
//       {showFullView && (
//         <Update
//           imageUrl={`http://localhost:5000/${selectedUser.profilePicture}`}
//           username={selectedUser.username}
//           phone={selectedUser.phone}
//           closeOverlay={closeOverlayMainImage}
//           onUpdateProfile={handleUpdateProfile}
//         // onUpdateImage={handleUpdateImage}
//         // onRemoveImage={handleRemoveImage}
//         // onUpdateUsername={handleUpdateUsername}
//         />
//       )}

//     </div>
//   );
// };

// export default Chat;



