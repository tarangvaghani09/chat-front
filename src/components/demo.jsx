// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // // import io from 'socket.io-client';

// // // // // // // // const socket = io('http://localhost:5000');

// // // // // // // // const Chat = () => {
// // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // //     const [user, setUser] = useState('');
// // // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null); // State to track selected message
// // // // // // // //     const dispatch = useDispatch();
// // // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);

// // // // // // // //     useEffect(() => {
// // // // // // // //         // Fetch username from localStorage
// // // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // // //         if (storedUsername) {
// // // // // // // //             setUser(storedUsername);
// // // // // // // //         }

// // // // // // // //         console.log('Fetching chats...');
// // // // // // // //         dispatch(fetchChats());

// // // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // // //         });

// // // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // // //         });

// // // // // // // //         return () => {
// // // // // // // //             socket.off('receiveMessage');
// // // // // // // //             socket.off('messageDeleted');
// // // // // // // //         };
// // // // // // // //     }, [dispatch]);

// // // // // // // //     const sendMessage = () => {
// // // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // // //         const chat = {
// // // // // // // //             message,
// // // // // // // //             sender: actualUsername,
// // // // // // // //             senderIsSelf: true // This flag indicates the message is sent by the user
// // // // // // // //         };
// // // // // // // //         socket.emit('sendMessage', chat);
// // // // // // // //         setMessage('');
// // // // // // // //     };

// // // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // // //     };

// // // // // // // //     // const handleSelectMessage = (id) => {
// // // // // // // //     //     setSelectedMessageId(id);
// // // // // // // //     // };

// // // // // // // //     const handleToggleOptions = (id) => {
// // // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <div>
// // // // // // // //             <h1>Chat App</h1>
// // // // // // // //             {loading && <p>Loading...</p>}
// // // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // // //             <div>
// // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // //                     <div key={chat._id} style={{ position: 'relative' }}>
// // // // // // // //                         <p>{chat.senderIsSelf ? 'You' : chat.sender}: {chat.message}
// // // // // // // //                             <span
// // // // // // // //                                 style={{ cursor: 'pointer', marginLeft: '10px' }}
// // // // // // // //                                 onClick={() => handleToggleOptions(chat._id)}
// // // // // // // //                             >
// // // // // // // //                                 ↓
// // // // // // // //                             </span>
// // // // // // // //                         </p>
// // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // //                             <div style={{ position: 'absolute', left: '10rem', marginTop: '-35px' }}>
// // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // //                                 {chat.senderIsSelf && (
// // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 ))}
// // // // // // // //             </div>
// // // // // // // //             {/* <div>
// // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // //                     <div key={chat._id} onClick={() => handleSelectMessage(chat._id)}>
// // // // // // // //                         <p>{chat.senderIsSelf ? 'You' : chat.sender}: {chat.message}</p>
// // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // //                             <div>
// // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // //                                 {chat.senderIsSelf && (
// // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 ))}
// // // // // // // //             </div> */}
// // // // // // // //             {/* show button for both */}
// // // // // // // //             {/* <div>
// // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // //                     <div key={chat._id}>
// // // // // // // //                         <p>{chat.sender}: {chat.message}</p>
// // // // // // // //                         <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // //                         <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // //                     </div>
// // // // // // // //                 ))}
// // // // // // // //             </div> */}

// // // // // // // //             {/* show button for only message sender */}
// // // // // // // //             {/* <div>
// // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // //                     <div key={chat._id}>
// // // // // // // //                         <p>{chat.senderIsSelf ? 'You' : chat.sender}: {chat.message}</p>
// // // // // // // //                         {chat.senderIsSelf && (
// // // // // // // //                             <>
// // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // //                                 <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // //                             </>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 ))}
// // // // // // // //             </div> */}
// // // // // // // //             <input
// // // // // // // //                 type="text"
// // // // // // // //                 value={message}
// // // // // // // //                 onChange={(e) => setMessage(e.target.value)}
// // // // // // // //                 className='input'
// // // // // // // //             />
// // // // // // // //             <button onClick={sendMessage} className='sendBtn'>Send</button>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // export default Chat;






// // // // // // // // //


// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // // import io from 'socket.io-client';

// // // // // // // // const socket = io('http://localhost:5000');

// // // // // // // // const Chat = () => {
// // // // // // // //     const [message, setMessage] = useState('');
// // // // // // // //     const [user, setUser] = useState('');
// // // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null); // State to track selected message
// // // // // // // //     const dispatch = useDispatch();
// // // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);

// // // // // // // //     useEffect(() => {
// // // // // // // //         // Fetch username from localStorage
// // // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // // //         if (storedUsername) {
// // // // // // // //             setUser(storedUsername);
// // // // // // // //         }

// // // // // // // //         console.log('Fetching chats...');
// // // // // // // //         dispatch(fetchChats());

// // // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // // //         });

// // // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // // //         });

// // // // // // // //         return () => {
// // // // // // // //             socket.off('receiveMessage');
// // // // // // // //             socket.off('messageDeleted');
// // // // // // // //         };
// // // // // // // //     }, [dispatch]);

// // // // // // // //     const sendMessage = () => {
// // // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // // //         const chat = {
// // // // // // // //             message,
// // // // // // // //             sender: actualUsername,
// // // // // // // //             senderIsSelf: true // This flag indicates the message is sent by the user
// // // // // // // //         };
// // // // // // // //         socket.emit('sendMessage', chat);
// // // // // // // //         setMessage('');
// // // // // // // //     };

// // // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // // //     };

// // // // // // // //     // const handleSelectMessage = (id) => {
// // // // // // // //     //     setSelectedMessageId(id);
// // // // // // // //     // };

// // // // // // // //     const handleToggleOptions = (id) => {
// // // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <div className="chat-container">
// // // // // // // //             <h1>Chat App</h1>
// // // // // // // //             {loading && <p>Loading...</p>}
// // // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // // //             <div className="chat-messages">
// // // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // // //                     <div key={chat._id} className={`chat-message ${chat.senderIsSelf ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)}>
// // // // // // // //                         <p>{chat.senderIsSelf ? 'You' : chat.sender}: {chat.message}
// // // // // // // //                             <span className="options-indicator">
// // // // // // // //                                 ↓
// // // // // // // //                             </span>
// // // // // // // //                         </p>
// // // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // // //                             <div className="options">
// // // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // // //                                 {chat.senderIsSelf && (
// // // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // // //                                 )}
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 ))}
// // // // // // // //             </div>
// // // // // // // //             <div className="chat-input">
// // // // // // // //                 <input
// // // // // // // //                     type="text"
// // // // // // // //                     value={message}
// // // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // // //                 />
// // // // // // // //                 <button onClick={sendMessage}>Send</button>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // export default Chat;




// // // // // // // // //


// // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // // // import { fetchChats } from '../actions/chatAction';
// // // // // // // import io from 'socket.io-client';

// // // // // // // const socket = io('http://localhost:5000');

// // // // // // // const Chat = () => {
// // // // // // //     const [message, setMessage] = useState('');
// // // // // // //     const [user, setUser] = useState('');
// // // // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null); // State to track selected message
// // // // // // //     const dispatch = useDispatch();
// // // // // // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // // // // // //     const chatEndRef = useRef(null); // Reference to the end of the chat messages

// // // // // // //     useEffect(() => {
// // // // // // //         // Fetch username from localStorage
// // // // // // //         const storedUsername = localStorage.getItem('username');
// // // // // // //         if (storedUsername) {
// // // // // // //             setUser(storedUsername);
// // // // // // //         }

// // // // // // //         console.log('Fetching chats...');
// // // // // // //         dispatch(fetchChats());

// // // // // // //         socket.on('receiveMessage', (chat) => {
// // // // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // // // //         });

// // // // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // // // //         });

// // // // // // //         return () => {
// // // // // // //             socket.off('receiveMessage');
// // // // // // //             socket.off('messageDeleted');
// // // // // // //         };
// // // // // // //     }, [dispatch]);

// // // // // // //     useEffect(() => {
// // // // // // //         if (chatEndRef.current) {
// // // // // // //             chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
// // // // // // //         }
// // // // // // //     }, [chats]); // Scroll to bottom when chats change

// // // // // // //     const sendMessage = () => {
// // // // // // //         const actualUsername = localStorage.getItem('username');
// // // // // // //         const chat = {
// // // // // // //             message,
// // // // // // //             sender: actualUsername,
// // // // // // //             senderIsSelf: true // This flag indicates the message is sent by the user
// // // // // // //         };
// // // // // // //         socket.emit('sendMessage', chat);
// // // // // // //         setMessage('');
// // // // // // //     };

// // // // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // // // //     };

// // // // // // //     // const handleSelectMessage = (id) => {
// // // // // // //     //     setSelectedMessageId(id);
// // // // // // //     // };

// // // // // // //     const handleToggleOptions = (id) => {
// // // // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="chat-container">
// // // // // // //             <h1>Chat App</h1>
// // // // // // //             {loading && <p>Loading...</p>}
// // // // // // //             {error && <p>Error: {error}</p>}
// // // // // // //             <div className="chat-messages">
// // // // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // // // //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)}>
// // // // // // //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}
// // // // // // //                             <span className="options-indicator">
// // // // // // //                                 ↓
// // // // // // //                             </span>
// // // // // // //                         </p>
// // // // // // //                         {selectedMessageId === chat._id && (
// // // // // // //                             <div className="options">
// // // // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // // // //                                 {chat.sender === user && (
// // // // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // // // // // //                                 )}
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 ))}
// // // // // // //                 <div ref={chatEndRef} /> {/* Reference to the end of the chat messages */}
// // // // // // //             </div>
// // // // // // //             <div className="chat-input">
// // // // // // //                 <input
// // // // // // //                     type="text"
// // // // // // //                     value={message}
// // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // //                 />
// // // // // // //                 <button onClick={sendMessage}>Send</button>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default Chat;



// // // // // // // FOR MESSAGE FULL WIDTH

// // // // // // .chat-container {
// // // // // //     max-width: 600px;
// // // // // //     margin: 0 auto;
// // // // // //     padding: 20px;
// // // // // //     border: 1px solid #ccc;
// // // // // //     border-radius: 8px;
// // // // // //     background-color: #f9f9f9;
// // // // // //   }
  
// // // // // //   .chat-messages {
// // // // // //     max-height: 400px;
// // // // // //     overflow-y: auto;
// // // // // //     margin-bottom: 20px;
// // // // // //   }
  
// // // // // //   .chat-message {
// // // // // //     display: flex;
// // // // // //     flex-direction: column;
// // // // // //     margin: 10px 0;
// // // // // //     padding: 10px;
// // // // // //     border-radius: 8px;
// // // // // //     position: relative;
// // // // // //   }
  
// // // // // //   .chat-message.self {
// // // // // //     align-items: flex-end;
// // // // // //     background-color: #daf1da;
// // // // // //   }
  
// // // // // //   .chat-message.other {
// // // // // //     align-items: flex-start;
// // // // // //     background-color: #f1f1f1;
// // // // // //   }
  
// // // // // //   .chat-message p {
// // // // // //     margin: 0;
// // // // // //   }
  
// // // // // //   .options-indicator {
// // // // // //     cursor: pointer;
// // // // // //     margin-left: 10px;
// // // // // //   }
  
// // // // // //   .options {
// // // // // //     display: flex;
// // // // // //     flex-direction: column;
// // // // // //     position: absolute;
// // // // // //     top: 100%;
// // // // // //     right: 0;
// // // // // //     background-color: white;
// // // // // //     border: 1px solid #ccc;
// // // // // //     border-radius: 8px;
// // // // // //     z-index: 1;
// // // // // //   }
  
// // // // // //   .options button {
// // // // // //     background: none;
// // // // // //     border: none;
// // // // // //     padding: 5px;
// // // // // //     cursor: pointer;
// // // // // //   }
  
// // // // // //   .chat-input {
// // // // // //     display: flex;
// // // // // //     gap: 10px;
// // // // // //   }
  
// // // // // //   .chat-input input {
// // // // // //     flex: 1;
// // // // // //     padding: 10px;
// // // // // //     border: 1px solid #ccc;
// // // // // //     border-radius: 8px;
// // // // // //   }
  
// // // // // //   .chat-input button {
// // // // // //     padding: 10px 20px;
// // // // // //     border: none;
// // // // // //     border-radius: 8px;
// // // // // //     background-color: #007bff;
// // // // // //     color: white;
// // // // // //     cursor: pointer;
// // // // // //   }
  


// // // // // // WHEN RELOAD THEN CHAT SCROLL AND SEE LATEST CHAT

// // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // import { useDispatch, useSelector } from 'react-redux';
// // // // // import { fetchChats } from '../actions/chatAction';
// // // // // import io from 'socket.io-client';

// // // // // const socket = io('http://localhost:5000');

// // // // // const Chat = () => {
// // // // //     const [message, setMessage] = useState('');
// // // // //     const [user, setUser] = useState('');
// // // // //     const [selectedMessageId, setSelectedMessageId] = useState(null); // State to track selected message
// // // // //     const dispatch = useDispatch();
// // // // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // // // //     const chatEndRef = useRef(null); // Reference to the end of the chat messages

// // // // //     useEffect(() => {
// // // // //         // Fetch username from localStorage
// // // // //         const storedUsername = localStorage.getItem('username');
// // // // //         if (storedUsername) {
// // // // //             setUser(storedUsername);
// // // // //         }

// // // // //         console.log('Fetching chats...');
// // // // //         dispatch(fetchChats());

// // // // //         socket.on('receiveMessage', (chat) => {
// // // // //             chat.senderIsSelf = chat.sender === storedUsername;
// // // // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // // // //         });

// // // // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // // // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // // // //         });

// // // // //         return () => {
// // // // //             socket.off('receiveMessage');
// // // // //             socket.off('messageDeleted');
// // // // //         };
// // // // //     }, [dispatch]);

// // // // //     useEffect(() => {
// // // // //         if (chatEndRef.current) {
// // // // //             chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
// // // // //         }
// // // // //     }, [chats]); // Scroll to bottom when chats change
    

// // // // //     useEffect(() => {
// // // // //         const handleClickOutside = (event) => {
// // // // //             if (!event.target.closest('.chat-message')) {
// // // // //                 setSelectedMessageId(null);
// // // // //             }
// // // // //         };

// // // // //         document.addEventListener('click', handleClickOutside);

// // // // //         return () => {
// // // // //             document.removeEventListener('click', handleClickOutside);
// // // // //         };
// // // // //     }, []);

// // // // //     const sendMessage = () => {
// // // // //         const actualUsername = localStorage.getItem('username');
// // // // //         const chat = {
// // // // //             message,
// // // // //             sender: actualUsername,
// // // // //             senderIsSelf: true // This flag indicates the message is sent by the user
// // // // //         };
// // // // //         socket.emit('sendMessage', chat);
// // // // //         setMessage('');
// // // // //     };

// // // // //     const handleDelete = (id, deleteForBoth) => {
// // // // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // // // //         dispatch(deleteChat(id, user, deleteForBoth));
// // // // //     };

// // // // //     // const handleSelectMessage = (id) => {
// // // // //     //     setSelectedMessageId(id);
// // // // //     // };

// // // // //     const handleToggleOptions = (id) => {
// // // // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // // // //     };

// // // // //     return (
// // // // //         <div className="chat-container">
// // // // //             <h1>Chat App</h1>
// // // // //             {loading && <p>Loading...</p>}
// // // // //             {error && <p>Error: {error}</p>}
// // // // //             <div className="chat-messages">
// // // // //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // // // //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)} style={{ cursor: 'pointer' }}>
// // // // //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}
// // // // //                             <span className="options-indicator">
// // // // //                                 ↓
// // // // //                             </span>
// // // // //                         </p>
// // // // //                         {selectedMessageId === chat._id && (
// // // // //                             <div className="options">
// // // // //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // // // //                                 {chat.sender === user && (
// // // // //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 ))}
// // // // //                 <div ref={chatEndRef} /> {/* Reference to the end of the chat messages */}
// // // // //             </div>
// // // // //             <div className="chat-input">
// // // // //                 <input
// // // // //                     type="text"
// // // // //                     value={message}
// // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // //                 />
// // // // //                 <button onClick={sendMessage}>Send</button>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default Chat;



// // // // // scroll  only see useeefect BY DEFAULT PAGE SCROLL DOWN AND SEE LATEST MESSAGE


// // // import React, { useEffect, useState, useRef } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { fetchChats } from '../actions/chatAction';
// // // import io from 'socket.io-client';

// // // const socket = io('http://localhost:5000');

// // // const Chat = () => {
// // //     const [message, setMessage] = useState('');
// // //     const [user, setUser] = useState('');
// // //     const [selectedMessageId, setSelectedMessageId] = useState(null); // State to track selected message
// // //     const dispatch = useDispatch();
// // //     const { chats, loading, error } = useSelector((state) => state.chat);
// // //     const chatEndRef = useRef(null); // Reference to the end of the chat messages

// // //     useEffect(() => {
// // //         // Fetch username from localStorage
// // //         const storedUsername = localStorage.getItem('username');
// // //         if (storedUsername) {
// // //             setUser(storedUsername);
// // //         }

// // //         console.log('Fetching chats...');
// // //         dispatch(fetchChats());

// // //         socket.on('receiveMessage', (chat) => {
// // //             chat.senderIsSelf = chat.sender === storedUsername;
// // //             dispatch({ type: 'ADD_CHAT', payload: chat });
// // //         });

// // //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// // //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// // //         });

// // //         return () => {
// // //             socket.off('receiveMessage');
// // //             socket.off('messageDeleted');
// // //         };
// // //     }, [dispatch]);


// // //     useEffect(() => {
// // //         scrollToBottom();
// // //     }, [chats]); // Scroll to bottom when chats change

// // //     useEffect(() => {
// // //         // Scroll to bottom on initial load
// // //         scrollToBottom();
// // //     }, []); // Empty dependency array ensures it runs only once on mount

// // //     const scrollToBottom = () => {
// // //         if (chatContainerRef.current) {
// // //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// // //         }
// // //     };


// // //     const sendMessage = () => {
// // //         const actualUsername = localStorage.getItem('username');
// // //         const chat = {
// // //             message,
// // //             sender: actualUsername,
// // //             senderIsSelf: true // This flag indicates the message is sent by the user
// // //         };
// // //         socket.emit('sendMessage', chat);
// // //         setMessage('');
// // //     };

// // //     const handleDelete = (id, deleteForBoth) => {
// // //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// // //         dispatch(deleteChat(id, user, deleteForBoth));
// // //     };

// // //     // const handleSelectMessage = (id) => {
// // //     //     setSelectedMessageId(id);
// // //     // };

// // //     const handleToggleOptions = (id) => {
// // //         setSelectedMessageId(selectedMessageId === id ? null : id);
// // //     };

// // //     return (
// // //         <div className="chat-container">
// // //         <h1>Chat App</h1>
// // //         {loading && <p>Loading...</p>}
// // //         {error && <p>Error: {error}</p>}
// // //         <div
// // //             className="chat-messages"
// // //             ref={chatContainerRef}
// // //             onScroll={() => {
// // //                 const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
// // //                 if (scrollTop === 0) {
// // //                     console.log('Load more messages...');
// // //                     // Implement logic to load more messages if needed
// // //                 }
// // //             }}
// // //         >
// // //             {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// // //                 <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)}>
// // //                     <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}
// // //                         <span className="options-indicator">
// // //                             ↓
// // //                         </span>
// // //                     </p>
// // //                     {selectedMessageId === chat._id && (
// // //                         <div className="options">
// // //                             <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// // //                             {chat.sender === user && (
// // //                                 <button onClick={() => handleDelete(chat._id, true)}>Delete for both</button>
// // //                             )}
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             ))}
// // //         </div>
// // //         <div className="chat-input">
// // //             <input
// // //                 type="text"
// // //                 value={message}
// // //                 onChange={(e) => setMessage(e.target.value)}
// // //             />
// // //             <button onClick={sendMessage}>Send</button>
// // //         </div>
// // //     </div>
// // //     );
// // // };

// // // export default Chat;



// // // ONLINE USER

// // // Chat.js
// // import React, { useEffect, useState, useRef } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchChats } from '../actions/chatAction';
// // import io from 'socket.io-client';

// // const socket = io('http://localhost:5000');

// // const Chat = () => {
// //     const [message, setMessage] = useState('');
// //     const [user, setUser] = useState('');
// //     const [selectedMessageId, setSelectedMessageId] = useState(null);
// //     const [onlineUsers, setOnlineUsers] = useState([]);
// //     const [personalMessage, setPersonalMessage] = useState('');
// //     const [selectedUser, setSelectedUser] = useState('');
// //     const dispatch = useDispatch();
// //     const { chats, loading, error } = useSelector((state) => state.chat);
// //     const chatContainerRef = useRef(null);

// //     useEffect(() => {
// //         const storedUsername = localStorage.getItem('username');
// //         if (storedUsername) {
// //             setUser(storedUsername);
// //             socket.emit('userConnected', storedUsername);
// //         }

// //         dispatch(fetchChats());

// //         socket.on('receiveMessage', (chat) => {
// //             chat.senderIsSelf = chat.sender === storedUsername;
// //             dispatch({ type: 'ADD_CHAT', payload: chat });
// //         });

// //         socket.on('receivePersonalMessage', ({ message, sender }) => {
// //             alert(`New message from ${sender}: ${message}`);
// //         });

// //         socket.on('updateUserList', (users) => {
// //             setOnlineUsers(users.filter(u => u !== storedUsername));
// //         });

// //         socket.on('messageDeleted', ({ id, user, deleteForBoth }) => {
// //             dispatch({ type: 'DELETE_CHAT', payload: { id, user, deleteForBoth } });
// //         });

// //         return () => {
// //             socket.off('receiveMessage');
// //             socket.off('receivePersonalMessage');
// //             socket.off('updateUserList');
// //             socket.off('messageDeleted');
// //         };
// //     }, [dispatch]);

// //     useEffect(() => {
// //         scrollToBottom();
// //     }, [chats]);

// //     useEffect(() => {
// //         scrollToBottom();
// //     }, []);

// //     const scrollToBottom = () => {
// //         if (chatContainerRef.current) {
// //             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
// //         }
// //     };

// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (!event.target.closest('.chat-message')) {
// //                 setSelectedMessageId(null);
// //             }
// //         };

// //         document.addEventListener('click', handleClickOutside);

// //         return () => {
// //             document.removeEventListener('click', handleClickOutside);
// //         };
// //     }, []);

// //     const sendMessage = () => {
// //         const actualUsername = localStorage.getItem('username');
// //         const chat = {
// //             message,
// //             sender: actualUsername,
// //             senderIsSelf: true
// //         };
// //         socket.emit('sendMessage', chat);
// //         setMessage('');
// //     };

// //     const handlePersonalMessageSend = () => {
// //         socket.emit('sendPersonalMessage', {
// //             to: selectedUser,
// //             message: personalMessage,
// //             sender: user
// //         });
// //         setPersonalMessage('');
// //     };

// //     const handleDelete = (id, deleteForBoth) => {
// //         socket.emit('deleteMessage', { id, user, deleteForBoth });
// //         dispatch(deleteChat(id, user, deleteForBoth));
// //     };

// //     const handleToggleOptions = (id) => {
// //         setSelectedMessageId(selectedMessageId === id ? null : id);
// //     };

// //     return (
// //         <div className="chat-container">
// //             <h1>Chat App</h1>
// //             {loading && <p>Loading...</p>}
// //             {error && <p>Error: {error}</p>}
// //             <div className="chat-messages" ref={chatContainerRef}>
// //                 {chats.filter(chat => !chat.deletedBy.includes(user)).map((chat) => (
// //                     <div key={chat._id} className={`chat-message ${chat.sender === user ? 'self' : 'other'}`} onClick={() => handleToggleOptions(chat._id)} style={{cursor:"pointer"}}>
// //                         <p>{chat.sender === user ? 'You' : chat.sender}: {chat.message}
// //                             <span className="options-indicator">
// //                                 ↓
// //                             </span>
// //                         </p>
// //                         {selectedMessageId === chat._id && (
// //                             <div className="options">
// //                                 <button onClick={() => handleDelete(chat._id, false)}>Delete for you</button>
// //                                 {chat.sender === user && (
// //                                     <button onClick={() => handleDelete(chat._id, true)}>Delete for Everyone</button>
// //                                 )}
// //                             </div>
// //                         )}
// //                     </div>
// //                 ))}
// //             </div>
// //             <div className="chat-input">
// //                 <input
// //                     type="text"
// //                     placeholder='Message'
// //                     value={message}
// //                     onChange={(e) => setMessage(e.target.value)}
// //                 />
// //                 <button onClick={sendMessage}>Send</button>
// //             </div>
// //             <div className="online-users">
// //                 <h2>Online Users</h2>
// //                 <ul>
// //                     {onlineUsers.map((username, index) => (
// //                         <li key={index} onClick={() => setSelectedUser(username)} style={{cursor:"pointer"}}>
// //                             {username}
// //                         </li>
// //                     ))}
// //                 </ul>
// //             </div>
// //             {selectedUser && (
// //                 <div className="personal-message">
// //                     <h3>Send Personal Message to {selectedUser}</h3>
// //                     <input
// //                         type="text"
// //                         placeholder='Personal Message'
// //                         value={personalMessage}
// //                         onChange={(e) => setPersonalMessage(e.target.value)}
// //                     />
// //                     <button onClick={handlePersonalMessageSend}>Send</button>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Chat;
















// // -------------------------

// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import io from "socket.io-client";
// import { FaPaperclip, FaCheck, FaCheckDouble } from "react-icons/fa";
// import { fetchChats, deleteChat } from "../actions/chatAction";

// const socket = io("http://localhost:5000");

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [receiver, setReceiver] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [overlayImage, setOverlayImage] = useState(null); // State for overlay image
//   const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message
//   const [showDeleteOptions, setShowDeleteOptions] = useState(false); // State for delete options visibility
//   const [users, setUsers] = useState([]); // State to store list of users
//   const [filteredChats, setFilteredChats] = useState([]); // State to store filtered chats
//   const [defaultImage, setDefaultImage] = useState("http://localhost:5000/uploads/default.png"); // Default image URL
//   const dispatch = useDispatch();
//   const { chats, loading, error } = useSelector((state) => state.chat);
//   const chatContainerRef = useRef(null);
//   const imageInputRef = useRef(null);
//   const deleteOptionsRef = useRef(null); // Ref for delete options

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       socket.emit("userConnected", storedUsername);
//     }

//     dispatch(fetchChats());

//     // Fetch users from backend
//     fetchUsers();

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
//   }, [dispatch]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [filteredChats]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (deleteOptionsRef.current && !deleteOptionsRef.current.contains(event.target)) {
//         setShowDeleteOptions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     const filtered = chats.filter(
//       (chat) =>
//         (chat.sender === storedUsername && chat.receiver === receiver) ||
//         (chat.sender === receiver && chat.receiver === storedUsername)
//     );
//     setFilteredChats(filtered);
//   }, [chats, receiver]);

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
//     formData.append("receiver", receiver);
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

//   // Function to fetch users from backend
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/register");
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log("data",data.phones)
//       setUsers(data.phones); // Assuming the response has a field 'phones' containing an array of phone numbers
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//       // Handle error (e.g., display an error message to the user)
//     }
//   };

//   return (
//     <div className="chat-container">
//       <h1>Chat App</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       <div className="chat-messages" ref={chatContainerRef}>
//         {filteredChats.map((chat) => (
//           <div
//             key={chat._id}
//             className={`chat-message ${
//               chat.sender === localStorage.getItem("username") ? "self" : "other"
//             }`}
//             onClick={() => handleMessageClick(chat._id)}
//           >
//             <p>
//               {chat.sender === localStorage.getItem("username") ? "You" : chat.sender}:{" "}
//               {chat.message}
//             </p>
//             {chat.image && (
//               <img
//                 src={`http://localhost:5000/${chat.image}`}
//                 alt="Chat"
//                 style={{ maxWidth: "100%", maxHeight: "200px", cursor: "pointer" }}
//                 onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
//               />
//             )}
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
//         {!receiver && (
//           <div className="default-image-container" style={{display:"flex",justifyContent:"center",alignContent:"center",fontSize:"3rem",fontFamily:"sans-serif",color:"green",fontWeight:"bold",marginTop:"4rem"}}>
//             {/* <img src={defaultImage} alt="Default Image" style={{width:"80%",height:"20rem",objectFit:"cover",imageResolution:"from-image",margin:"auto"}}/> */}
//             <p>Welcome to Wave Chat App</p>
//           </div>
//         )}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
//           <option value="">Select Receiver</option>
//           {users.map((user, index) => (
//             <option key={index} value={user}>
//               {user}
//             </option>
//           ))}
//         </select>
//         <label htmlFor="file-upload" className="custom-file-upload">
//           <FaPaperclip size={20} />
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//           accept="image/*"
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
//     </div>
//   );
// };

// export default Chat;





// // App.js
// import React from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Register from './components/Register';
// import Login from './components/Login';
// import Chat from './components/Chat';
// import { Provider } from 'react-redux';
// import store from './store';
// import './App.css';

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/chat" element={<Chat />} />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;
