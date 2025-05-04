// // adduser.jsx
// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//   const [contactUsername, setContactUsername] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const [contacts, setContacts] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Fetch the logged in user's details (using a similar API as in UserList.jsx)
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

//   // Fetch the current contact list for the logged in user once available
//   useEffect(() => {
//     if (loggedInUser) {
//       fetchContacts();
//     }
//   }, [loggedInUser]);

//   const fetchContacts = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       const data = await response.json();
//       setContacts(data.contacts);
//     } catch (error) {
//       console.error("Error fetching contacts:", error.message);
//     }
//   };

//   // Handler to add a new contact
//   const handleAddContact = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/addContact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone })
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact added successfully!");
//         setContacts(data.contacts);
//       }
//     } catch (error) {
//       console.error("Error adding contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   // Handler to remove an existing contact
//   const handleRemoveContact = async (phone) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/removeContact`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone: phone })
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact removed successfully!");
//         setContacts(data.contacts);
//       }
//     } catch (error) {
//       console.error("Error removing contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   return (
//     <div className="w-full h-full mx-auto p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
//       {message && <p className="mb-4 text-red-500">{message}</p>}
//       <form onSubmit={handleAddContact}>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Username:</label>
//           <input
//             type="text"
//             value={contactUsername}
//             onChange={(e) => setContactUsername(e.target.value)}
//             placeholder="Contact username"
//             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Mobile Number:</label>
//           <input
//             type="text"
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//             placeholder="Contact phone number"
//             required
//             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
//           Add Contact
//         </button>
//       </form>
//       <h3 className="text-xl font-bold mt-6 mb-2">Your Contacts:</h3>
//       <ul>
//         {contacts.map((phone, index) => (
//           <li key={index} className="flex items-center justify-between border-b py-2">
//             <span>{phone}</span>
//             <button onClick={() => handleRemoveContact(phone)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded">
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AddUser;


// not search functiona

// adduser.jsx
// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//   const [contactUsername, setContactUsername] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const [contacts, setContacts] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Fetch the logged in user's details (using a similar API as in UserList.jsx)
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

//   // Fetch the current contact list for the logged in user once available
//   useEffect(() => {
//     if (loggedInUser) {
//       fetchContacts();
//     }
//   }, [loggedInUser]);

//   const fetchContacts = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       const data = await response.json();
//       setContacts(data.contacts);
//     } catch (error) {
//       console.error("Error fetching contacts:", error.message);
//     }
//   };

//   // Handler to add a new contact
//   const handleAddContact = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/addContact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         // Send both contactUsername and contactPhone in the request body
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername })
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact added successfully!");
//         setContacts(data.contacts);
//       }
//     } catch (error) {
//       console.error("Error adding contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   // Handler to remove an existing contact (matches by contactPhone)
//   const handleRemoveContact = async (contactPhone) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/removeContact`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone })
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact removed successfully!");
//         setContacts(data.contacts);
//       }
//     } catch (error) {
//       console.error("Error removing contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   return (
//     <div className="w-full h-full mx-auto p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
//       {message && <p className="mb-4 text-red-500">{message}</p>}
//       <form onSubmit={handleAddContact}>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Username:</label>
//           <input
//             type="text"
//             value={contactUsername}
//             onChange={(e) => setContactUsername(e.target.value)}
//             placeholder="Contact username"
//             required
//             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Mobile Number:</label>
//           <input
//             type="text"
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//             placeholder="Contact phone number"
//             required
//             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
//           Add Contact
//         </button>
//       </form>
//       <h3 className="text-xl font-bold mt-6 mb-2">Your Contacts:</h3>
//       <ul>
//         {/* Now contacts is an array of objects; display both fields */}
//         {contacts.map((contact, index) => (
//           <li key={index} className="flex flex-col border-b py-2">
//             <div className="flex items-center justify-between">
//               <span className="font-bold">{contact.contactUsername}</span>
//               <button
//                 onClick={() => handleRemoveContact(contact.contactPhone)}
//                 className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//             <span className="text-sm text-gray-600">{contact.contactPhone}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AddUser;






//scroll only contac

// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState('');
//     const [message, setMessage] = useState('');
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState(''); // For filtering contacts

//     // Local state for editing
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user's details (using a similar API as in UserList.jsx)
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Fetch the current contact list for the logged in user once available
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler to add a new contact
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 // Send both contactUsername and contactPhone in the request body
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear input fields after adding
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to remove an existing contact (matches by contactPhone)
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact: populate editing fields and set the index.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');
//     };

//     // Handler to cancel editing
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setMessage('');
//     };

//     // Handler to save the edited contact
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 // Send owner, oldContactPhone, and the new details in the request body
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername
//                 })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for search input changes
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts by username or phone that include the search query (case-insensitive)
//     const filteredContacts = contacts.filter(contact => {
//         const usernameMatch = contact.contactUsername && contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch = contact.contactPhone && contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     return (
//         <div className="w-full h-full mx-auto p-6 bg-gradient-to-r from-white via-blue-50 to-white rounded-xl shadow-xl">
//             <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add New Contact</h2>
//             {message && <p className="mb-4 text-center text-red-500 font-medium">{message}</p>}

//             {/* Search Input */}
//             <div className="mb-6">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search contacts..."
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Add New Contact Form */}
//             <form onSubmit={handleAddContact} className="space-y-4">
//                 <div>
//                     <label className="block mb-2 text-gray-700 font-semibold">Username:<span className="text-red-600"> *</span></label>
//                     <input
//                         type="text"
//                         value={contactUsername}
//                         onChange={(e) => setContactUsername(e.target.value)}
//                         placeholder="Contact username"
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-gray-700 font-semibold">Mobile Number:<span className="text-red-600"> *</span></label>
//                     <input
//                         type="text"
//                         value={contactPhone}
//                         onChange={(e) => setContactPhone(e.target.value)}
//                         placeholder="Contact phone number"
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
//                     Add Contact
//                 </button>
//             </form>

//             {/* Contacts List */}
//             <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-700">Your Contacts:</h3>
//             {/* Wrap the contacts list in a scrollable container */}
//             <div className="border border-gray-200 rounded-lg shadow-sm p-4 max-h-80 overflow-y-auto">
//                 <ul className="space-y-4 mb-20">
//                     {filteredContacts.map((contact, index) => (
//                         <li key={index} className="p-4 bg-white rounded-lg shadow flex flex-col">
//                             {editingIndex === index ? (
//                                 // Editing Mode: Show input fields for username and phone with Save & Cancel buttons
//                                 <>
//                                     <div className="mb-3">
//                                         <label className="block text-gray-700 font-semibold mb-1">Username:</label>
//                                         <input
//                                             type="text"
//                                             value={editingUsername}
//                                             onChange={(e) => setEditingUsername(e.target.value)}
//                                             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label className="block text-gray-700 font-semibold mb-1">Mobile Number:</label>
//                                         <input
//                                             type="text"
//                                             value={editingPhone}
//                                             onChange={(e) => setEditingPhone(e.target.value)}
//                                             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="flex justify-end space-x-2">
//                                         <button
//                                             onClick={handleSaveEdit}
//                                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
//                                         >
//                                             Save
//                                         </button>
//                                         <button
//                                             onClick={handleCancelEdit}
//                                             className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 // Default Mode: Show contact details with Edit and Remove buttons
//                                 <>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-lg font-bold text-gray-800">{contact.contactUsername}</span>
//                                         <div className="flex space-x-2">
//                                             <button
//                                                 onClick={() => handleEditContact(index)}
//                                                 className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-300"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleRemoveContact(contact.contactPhone)}
//                                                 className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-300"
//                                             >
//                                                 Remove
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <span className="mt-2 text-gray-600">{contact.contactPhone}</span>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default AddUser;




//proper css scroll only contact


// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState('');
//     const [message, setMessage] = useState('');
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState(''); // For filtering contacts

//     // Local state for editing
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user's details (using a similar API as in UserList.jsx)
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Fetch the current contact list for the logged in user once available
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler to add a new contact
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 // Send both contactUsername and contactPhone in the request body
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear input fields after adding
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to remove an existing contact (matches by contactPhone)
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact: populate editing fields and set the index.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');
//     };

//     // Handler to cancel editing
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setMessage('');
//     };

//     // Handler to save the edited contact
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 // Send owner, oldContactPhone, and the new details in the request body
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername
//                 })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for search input changes
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts by username or phone that include the search query (case-insensitive)
//     const filteredContacts = contacts.filter(contact => {
//         const usernameMatch = contact.contactUsername && contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch = contact.contactPhone && contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     return (
//         <div className="w-full h-full mx-auto p-6 bg-gradient-to-r from-white via-blue-50 to-white rounded-xl shadow-xl flex flex-col">
//             {/* Fixed header section with Title, Message, Search, and Add Contact Form */}
//             <div>
//                 <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add New Contact</h2>
//                 {message && <p className="mb-4 text-center text-red-500 font-medium">{message}</p>}

//                 {/* Search Input */}
//                 <div className="mb-6">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         placeholder="Search contacts..."
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>

//                 {/* Add New Contact Form */}
//                 <form onSubmit={handleAddContact} className="space-y-4">
//                     <div>
//                         <label className="block mb-2 text-gray-700 font-semibold">
//                             Username:<span className="text-red-600"> *</span>
//                         </label>
//                         <input
//                             type="text"
//                             value={contactUsername}
//                             onChange={(e) => setContactUsername(e.target.value)}
//                             placeholder="Contact username"
//                             required
//                             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label className="block mb-2 text-gray-700 font-semibold">
//                             Mobile Number:<span className="text-red-600"> *</span>
//                         </label>
//                         <input
//                             type="text"
//                             value={contactPhone}
//                             onChange={(e) => setContactPhone(e.target.value)}
//                             placeholder="Contact phone number"
//                             required
//                             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
//                     >
//                         Add Contact
//                     </button>
//                 </form>
//             </div>
//             {/* Scrollable contacts list section takes remaining vertical space */}
//             <div className="mt-8 flex-1 overflow-y-auto">
//                 <h3 className="text-2xl font-bold mb-4 text-blue-700">Your Contacts:</h3>
//                 <ul className="space-y-4">
//                     {filteredContacts.map((contact, index) => (
//                         <li key={index} className="p-4 bg-white rounded-lg shadow flex flex-col">
//                             {editingIndex === index ? (
//                                 // Editing Mode: Show input fields for username and phone with Save & Cancel buttons
//                                 <>
//                                     <div className="mb-3">
//                                         <label className="block text-gray-700 font-semibold mb-1">Username:</label>
//                                         <input
//                                             type="text"
//                                             value={editingUsername}
//                                             onChange={(e) => setEditingUsername(e.target.value)}
//                                             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label className="block text-gray-700 font-semibold mb-1">Mobile Number:</label>
//                                         <input
//                                             type="text"
//                                             value={editingPhone}
//                                             onChange={(e) => setEditingPhone(e.target.value)}
//                                             className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         />
//                                     </div>
//                                     <div className="flex justify-end space-x-2">
//                                         <button
//                                             onClick={handleSaveEdit}
//                                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
//                                         >
//                                             Save
//                                         </button>
//                                         <button
//                                             onClick={handleCancelEdit}
//                                             className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 // Default Mode: Show contact details with Edit and Remove buttons
//                                 <>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-lg font-bold text-gray-800">{contact.contactUsername}</span>
//                                         <div className="flex space-x-2">
//                                             <button
//                                                 onClick={() => handleEditContact(index)}
//                                                 className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-300"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleRemoveContact(contact.contactPhone)}
//                                                 className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-300"
//                                             >
//                                                 Remove
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <span className="mt-2 text-gray-600">{contact.contactPhone}</span>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default AddUser;




// AddUser.jsx
// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState('');
//     const [message, setMessage] = useState('');
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState(''); // For filtering contacts

//     // Local state for editing
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user's details (using a similar API as in UserList.jsx)
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(`http://localhost:5000/api/registerUser?username=${storedUsername}`);
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Fetch the current contact list for the logged in user once available
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler to add a new contact
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 // Send both contactUsername and contactPhone in the request body
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear input fields after adding
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to remove an existing contact (matches by contactPhone)
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact: populate editing fields and set the index.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');
//     };

//     // Handler to cancel editing
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setMessage('');
//     };

//     // Handler to save the edited contact
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 // Send owner, oldContactPhone, and the new details in the request body
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername
//                 })
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for search input changes
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts by username or phone that include the search query (case-insensitive)
//     const filteredContacts = contacts.filter(contact => {
//         const usernameMatch = contact.contactUsername && contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch = contact.contactPhone && contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     return (
//         <div className="w-full h-full mx-auto p-6 bg-gradient-to-r from-white via-blue-50 to-white rounded-xl shadow-xl overflow-y-auto">
//             <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add New Contact</h2>
//             {message && <p className="mb-4 text-center text-red-500 font-medium">{message}</p>}

//             {/* Search Input */}
//             <div className="mb-6">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search contacts..."
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Add New Contact Form */}
//             <form onSubmit={handleAddContact} className="space-y-4">
//                 <div>
//                     <label className="block mb-2 text-gray-700 font-semibold">Username:<span className="text-red-600"> *</span></label>
//                     <input
//                         type="text"
//                         value={contactUsername}
//                         onChange={(e) => setContactUsername(e.target.value)}
//                         placeholder="Contact username"
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-gray-700 font-semibold">Mobile Number:<span className="text-red-600"> *</span></label>
//                     <input
//                         type="text"
//                         value={contactPhone}
//                         onChange={(e) => setContactPhone(e.target.value)}
//                         placeholder="Contact phone number"
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 cursor-pointer">
//                     Add Contact
//                 </button>
//             </form>

//             {/* Contacts List */}
//             <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-700">Your Contacts:</h3>
//             <ul className="space-y-4">
//                 {filteredContacts.map((contact, index) => (
//                     <li key={index} className="p-4 bg-white rounded-lg shadow flex flex-col hover:bg-blue-50">
//                         {editingIndex === index ? (
//                             // Editing Mode: Show input fields for username and phone with Save & Cancel buttons
//                             <>
//                                 <div className="mb-3">
//                                     <label className="block text-gray-700 font-semibold mb-1">Username:</label>
//                                     <input
//                                         type="text"
//                                         value={editingUsername}
//                                         onChange={(e) => setEditingUsername(e.target.value)}
//                                         className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="block text-gray-700 font-semibold mb-1">Mobile Number:</label>
//                                     <input
//                                         type="text"
//                                         value={editingPhone}
//                                         onChange={(e) => setEditingPhone(e.target.value)}
//                                         className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 <div className="flex justify-end space-x-2">
//                                     <button
//                                         onClick={handleSaveEdit}
//                                         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition duration-300 cursor-pointer"
//                                     >
//                                         Save
//                                     </button>
//                                     <button
//                                         onClick={handleCancelEdit}
//                                         className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition duration-300 cursor-pointer"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </>
//                         ) : (
//                             // Default Mode: Show contact details with Edit and Remove buttons
//                             <>
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-lg font-bold text-gray-800 capitalize">{contact.contactUsername}</span>
//                                     <div className="flex space-x-2">
//                                         <button
//                                             onClick={() => handleEditContact(index)}
//                                             className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-1.5 px-3 rounded transition duration-300 cursor-pointer"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleRemoveContact(contact.contactPhone)}
//                                             className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1.5 px-3 rounded transition duration-300 cursor-pointer"
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <span className="mt-2 text-gray-600">{contact.contactPhone}</span>
//                             </>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AddUser;


//show aplhabetic order


// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//     // State variables for contact info, messages, and contacts list.
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState('');
//     const [message, setMessage] = useState('');
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     // Local state for editing a contact.
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user info.
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(
//                     `http://localhost:5000/api/registerUser?username=${storedUsername}`
//                 );
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Once loggedInUser is available, fetch the contacts.
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     // Function to fetch contacts from the server.
//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//             );
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler for adding a new contact.
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear the input fields.
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for removing a contact.
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');
//     };

//     // Handler to cancel editing.
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setMessage('');
//     };

//     // Handler to save the edited contact.
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername,
//                 }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode.
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for search input changes.
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts based on search query (matches username or phone, case-insensitive).
//     const filteredContacts = contacts.filter(contact => {
//         const usernameMatch =
//             contact.contactUsername &&
//             contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch =
//             contact.contactPhone &&
//             contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     // Sort filtered contacts alphabetically (A to Z) by username.
//     const sortedContacts = [...filteredContacts].sort((a, b) =>
//         a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
//     );

//     return (
//         <div className="w-full h-full mx-auto p-6 bg-gradient-to-r from-white via-blue-50 to-white rounded-xl shadow-xl overflow-y-auto">
//             <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add New Contact</h2>
//             {message && <p className="mb-4 text-center text-red-500 font-medium">{message}</p>}

//             {/* Search Input */}
//             <div className="mb-6">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search contacts..."
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Add New Contact Form */}
//             <form onSubmit={handleAddContact} className="space-y-4">
//                 <div>
//                     <label className="block mb-2 text-gray-700 font-semibold">
//                         Username:<span className="text-red-600"> *</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactUsername}
//                         onChange={(e) => setContactUsername(e.target.value)}
//                         placeholder="Contact username"
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-gray-700 font-semibold">
//                         Mobile Number:<span className="text-red-600"> *</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactPhone}
//                         onChange={(e) => setContactPhone(e.target.value)}
//                         placeholder="Contact phone number"
//                         required
//                         className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 cursor-pointer"
//                 >
//                     Add Contact
//                 </button>
//             </form>

//             {/* Contacts List */}
//             <h3 className="text-2xl font-bold mt-8 mb-4 text-blue-700">Your Contacts:</h3>
//             <ul className="space-y-4">
//                 {sortedContacts.map((contact, index) => {
//                     // Get the first letter of the username in uppercase.
//                     const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
//                     // Determine if a new header should be displayed.
//                     const showHeader =
//                         index === 0 ||
//                         currentLetter !== sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

//                     return (
//                         // Use React.Fragment so that we can include the optional letter header.
//                         <React.Fragment key={index}>
//                             {showHeader && (
//                                 <div className="pt-4 text-xl font-bold text-blue-700">{currentLetter}</div>
//                             )}
//                             <li className="p-4 bg-white rounded-lg shadow flex flex-col hover:bg-blue-50">
//                                 {editingIndex === index ? (
//                                     // Editing Mode: Show input fields for username and phone.
//                                     <>
//                                         {/* {message && <p className="mb-4 text-center text-red-500 font-medium">{message}</p>} */}

//                                         <div className="mb-3">
//                                             <label className="block text-gray-700 font-semibold mb-1">Username:</label>
//                                             <input
//                                                 type="text"
//                                                 value={editingUsername}
//                                                 onChange={(e) => setEditingUsername(e.target.value)}
//                                                 className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label className="block text-gray-700 font-semibold mb-1">Mobile Number:</label>
//                                             <input
//                                                 type="text"
//                                                 value={editingPhone}
//                                                 onChange={(e) => setEditingPhone(e.target.value)}
//                                                 className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             />
//                                         </div>
//                                         <div className="flex justify-end space-x-2">
//                                             <button
//                                                 onClick={handleSaveEdit}
//                                                 className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded transition duration-300 cursor-pointer"
//                                             >
//                                                 Save
//                                             </button>
//                                             <button
//                                                 onClick={handleCancelEdit}
//                                                 className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded transition duration-300 cursor-pointer"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     // Default Mode: Display contact details with Edit and Remove buttons.
//                                     <>
//                                         <div className="flex items-center justify-between">
//                                             <span className="text-lg font-bold text-gray-800 capitalize">
//                                                 {contact.contactUsername}
//                                             </span>
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleEditContact(index)}
//                                                     className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-1.5 px-3 rounded transition duration-300 cursor-pointer"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleRemoveContact(contact.contactPhone)}
//                                                     className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1.5 px-3 rounded transition duration-300 cursor-pointer"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <span className="mt-2 text-gray-600">{contact.contactPhone}</span>
//                                     </>
//                                 )}
//                             </li>
//                         </React.Fragment>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };

// export default AddUser;






//UI 


// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//     // State variables for contact info, messages, and contacts list.
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState('');
//     const [message, setMessage] = useState(''); // Global message for add or remove.
//     const [editMessage, setEditMessage] = useState(''); // Message specific for edit operations.
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');

//     // Local state for editing a contact.
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user info.
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(
//                     `http://localhost:5000/api/registerUser?username=${storedUsername}`
//                 );
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Once loggedInUser is available, fetch the contacts.
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     // Function to fetch contacts from the server.
//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//             );
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler for adding a new contact.
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear the input fields.
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for removing a contact.
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');       // Clear global message.
//         setEditMessage('');   // Clear any previous edit message.
//     };

//     // Handler to cancel editing.
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setEditMessage('');
//     };

//     // Handler to save the edited contact.
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername,
//                 }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 // Set edit-specific message.
//                 setEditMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode and clear edit message.
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//                 setEditMessage('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setEditMessage("Internal error");
//         }
//     };

//     // Handler for search input changes.
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts based on search query (matches username or phone, case-insensitive).
//     const filteredContacts = contacts.filter(contact => {
//         const usernameMatch =
//             contact.contactUsername &&
//             contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch =
//             contact.contactPhone &&
//             contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     // Sort filtered contacts alphabetically (A to Z) by username.
//     const sortedContacts = [...filteredContacts].sort((a, b) =>
//         a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
//     );

//     return (
//         <div className="w-full h-full mx-auto p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl overflow-y-auto">
//             {/* Top Title & Global Message for add or remove operations */}
//             <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow-md">
//                 Add New Contact
//             </h2>
//             {message && <p className="mb-6 text-center text-red-600 font-medium">{message}</p>}

//             {/* Search Input */}
//             <div className="mb-8">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search contacts..."
//                     className="w-full border border-blue-300 rounded-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                 />
//             </div>

//             {/* Add New Contact Form */}
//             <form onSubmit={handleAddContact} className="space-y-6">
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Username:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactUsername}
//                         onChange={(e) => setContactUsername(e.target.value)}
//                         placeholder="Contact username"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Mobile Number:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactPhone}
//                         onChange={(e) => setContactPhone(e.target.value)}
//                         placeholder="Contact phone number"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg cursor-pointer"
//                 >
//                     Add Contact
//                 </button>
//             </form>

//             {/* Contacts List */}
//             <h3 className="text-3xl font-bold mt-10 mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">Your Contacts:</h3>
//             <ul className="space-y-6">
//                 {sortedContacts.map((contact, index) => {
//                     // Get the first letter of the username in uppercase.
//                     const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
//                     // Determine if a new header should be displayed.
//                     const showHeader =
//                         index === 0 ||
//                         currentLetter !== sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

//                     return (
//                         <React.Fragment key={index}>
//                             {showHeader && (
//                                 <div className="pt-4 text-2xl font-extrabold text-blue-800">{currentLetter}</div>
//                             )}
//                             <li className="px-6 py-3 bg-white rounded-xl shadow-md flex flex-col hover:bg-blue-50 transition duration-300">
//                                 {editingIndex === index ? (
//                                     // Editing Mode: Show edit UI along with edit-specific message.
//                                     <>
//                                         {editMessage && (
//                                             <p className="mb-6 text-center text-red-600 font-medium">{editMessage}</p>
//                                         )}
//                                         <div className="mb-4">
//                                             <label className="block text-gray-700 font-semibold mb-2">Username:</label>
//                                             <input
//                                                 type="text"
//                                                 value={editingUsername}
//                                                 onChange={(e) => setEditingUsername(e.target.value)}
//                                                 className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                             />
//                                         </div>
//                                         <div className="mb-4">
//                                             <label className="block text-gray-700 font-semibold mb-2">Mobile Number:</label>
//                                             <input
//                                                 type="text"
//                                                 value={editingPhone}
//                                                 onChange={(e) => setEditingPhone(e.target.value)}
//                                                 className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                             />
//                                         </div>
//                                         <div className="flex justify-end space-x-4">
//                                             <button
//                                                 onClick={handleSaveEdit}
//                                                 className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                             >
//                                                 Save
//                                             </button>
//                                             <button
//                                                 onClick={handleCancelEdit}
//                                                 className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     // Default Mode: Display contact details with Edit and Remove buttons.
//                                     <>
//                                         <div className="flex items-center justify-between">
//                                             <span className="text-xl font-bold text-gray-800 capitalize">
//                                                 {contact.contactUsername}
//                                             </span>
//                                             <div className="flex space-x-3">
//                                                 <button
//                                                     onClick={() => handleEditContact(index)}
//                                                     className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleRemoveContact(contact.contactPhone)}
//                                                     className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <span className="mt-3 text-gray-600 text-base">{contact.contactPhone}</span>
//                                     </>
//                                 )}
//                             </li>
//                         </React.Fragment>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };

// export default AddUser;



//not seach work

// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//     // State variables for contact info, messages, and contacts list.
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState('');
//     const [message, setMessage] = useState(''); // Global message for add or remove.
//     const [editMessage, setEditMessage] = useState(''); // Message specific for edit operations.
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     // New state: whether to show the contacts list.
//     const [showContacts, setShowContacts] = useState(false);

//     // Local state for editing a contact.
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user info.
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(
//                     `http://localhost:5000/api/registerUser?username=${storedUsername}`
//                 );
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Once loggedInUser is available, fetch the contacts.
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     // Function to fetch contacts from the server.
//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//             );
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler for adding a new contact.
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear the input fields.
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for removing a contact.
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');       // Clear global message.
//         setEditMessage('');   // Clear any previous edit message.
//     };

//     // Handler to cancel editing.
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setEditMessage('');
//     };

//     // Handler to save the edited contact.
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername,
//                 }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 // Set edit-specific message.
//                 setEditMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode and clear edit message.
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//                 setEditMessage('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setEditMessage("Internal error");
//         }
//     };

//     // Handler for search input changes.
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts based on search query (matches username or phone, case-insensitive).
//     const filteredContacts = contacts.filter(contact => {
//         const usernameMatch =
//             contact.contactUsername &&
//             contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch =
//             contact.contactPhone &&
//             contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     // Sort filtered contacts alphabetically (A to Z) by username.
//     const sortedContacts = [...filteredContacts].sort((a, b) =>
//         a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
//     );

//     return (
//         <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl overflow-y-auto h-[85vh]">
//             {/* Always display the top header and global message */}
//             <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow-md">
//                 Add New Contact
//             </h2>
//             {message && <p className="mb-6 text-center text-red-600 font-medium">{message}</p>}

//             {/* Search Input */}
//             <div className="mb-8">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search contacts..."
//                     className="w-full border border-blue-300 rounded-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                 />
//             </div>

//             {/* Add New Contact Form */}
//             <form onSubmit={handleAddContact} className="space-y-6">
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Username:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactUsername}
//                         onChange={(e) => setContactUsername(e.target.value)}
//                         placeholder="Contact username"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Mobile Number:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactPhone}
//                         onChange={(e) => setContactPhone(e.target.value)}
//                         placeholder="Contact phone number"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg cursor-pointer"
//                 >
//                     Add Contact
//                 </button>
//             </form>

//             {/* Toggle Button for Contacts List */}
//             <div className="mt-10 flex justify-center">
//                 <button
//                     onClick={() => setShowContacts(!showContacts)}
//                     className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow cursor-pointer"
//                 >
//                     {showContacts ? 'Hide Your Contacts' : 'Show Your Contacts'}
//                 </button>
//             </div>

//             {/* Contacts List is displayed only if showContacts is true */}
//             {showContacts && (
//                 <>
//                     <h3 className="text-3xl font-bold mt-10 mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">Your Contacts:</h3>
//                     <ul className="space-y-6">
//                         {sortedContacts.map((contact, index) => {
//                             // Get the first letter of the username in uppercase.
//                             const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
//                             // Determine if a new header should be displayed.
//                             const showHeader =
//                                 index === 0 ||
//                                 currentLetter !== sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

//                             return (
//                                 <React.Fragment key={index}>
//                                     {showHeader && (
//                                         <div className="pt-4 text-2xl font-extrabold text-blue-800">{currentLetter}</div>
//                                     )}
//                                     <li className="px-6 py-3 bg-white rounded-xl shadow-md flex flex-col hover:bg-blue-50 transition duration-300">
//                                         {editingIndex === index ? (
//                                             // Editing Mode: Show edit UI along with edit-specific message.
//                                             <>
//                                                 {editMessage && (
//                                                     <p className="mb-6 text-center text-red-600 font-medium">{editMessage}</p>
//                                                 )}
//                                                 <div className="mb-4">
//                                                     <label className="block text-gray-700 font-semibold mb-2">Username:</label>
//                                                     <input
//                                                         type="text"
//                                                         value={editingUsername}
//                                                         onChange={(e) => setEditingUsername(e.target.value)}
//                                                         className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                                     />
//                                                 </div>
//                                                 <div className="mb-4">
//                                                     <label className="block text-gray-700 font-semibold mb-2">Mobile Number:</label>
//                                                     <input
//                                                         type="text"
//                                                         value={editingPhone}
//                                                         onChange={(e) => setEditingPhone(e.target.value)}
//                                                         className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                                     />
//                                                 </div>
//                                                 <div className="flex justify-end space-x-4">
//                                                     <button
//                                                         onClick={handleSaveEdit}
//                                                         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                     >
//                                                         Save
//                                                     </button>
//                                                     <button
//                                                         onClick={handleCancelEdit}
//                                                         className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                     >
//                                                         Cancel
//                                                     </button>
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             // Default Mode: Display contact details with Edit and Remove buttons.
//                                             <>
//                                                 <div className="flex items-center justify-between">
//                                                     <span className="text-xl font-bold text-gray-800 capitalize">
//                                                         {contact.contactUsername}
//                                                     </span>
//                                                     <div className="flex space-x-3">
//                                                         <button
//                                                             onClick={() => handleEditContact(index)}
//                                                             className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                         >
//                                                             Edit
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleRemoveContact(contact.contactPhone)}
//                                                             className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                         >
//                                                             Remove
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <span className="mt-3 text-gray-600 text-base">{contact.contactPhone}</span>
//                                             </>
//                                         )}
//                                     </li>
//                                 </React.Fragment>
//                             );
//                         })}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// };

// export default AddUser;


// not chat save not



// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//     // State variables for contact info, messages, and contacts list.
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState('');
//     const [message, setMessage] = useState(''); // Global message for add or remove.
//     const [editMessage, setEditMessage] = useState(''); // Message specific for edit operations.
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     // New state: whether to show the contacts list.
//     const [showContacts, setShowContacts] = useState(false);

//     // Local state for editing a contact.
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user info.
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(
//                     `http://localhost:5000/api/registerUser?username=${storedUsername}`
//                 );
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Once loggedInUser is available, fetch the contacts.
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     // Function to fetch contacts from the server.
//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//             );
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler for adding a new contact.
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear the input fields.
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for removing a contact.
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');       // Clear global message.
//         setEditMessage('');   // Clear any previous edit message.
//     };

//     // Handler to cancel editing.
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setEditMessage('');
//     };

//     // Handler to save the edited contact.
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername,
//                 }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 // Set edit-specific message.
//                 setEditMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode and clear edit message.
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//                 setEditMessage('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setEditMessage("Internal error");
//         }
//     };

//     // Handler for search input changes.
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts based on search query (matches username or phone, case-insensitive).
//     const filteredContacts = contacts.filter(contact => {
//         const usernameMatch =
//             contact.contactUsername &&
//             contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch =
//             contact.contactPhone &&
//             contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     // Sort filtered contacts alphabetically (A to Z) by username.
//     const sortedContacts = [...filteredContacts].sort((a, b) =>
//         a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
//     );

//     // Determine whether to show the contacts list.
//     // If there's text in the search input, show the contacts; otherwise rely on the toggle.
//     const contactsVisible = searchQuery.trim() !== "" || showContacts;

//     return (
//         <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl overflow-y-auto h-[85vh]">
//             {/* Always display the top header and global message */}
//             <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow-md">
//                 Add New Contact
//             </h2>
//             {message && <p className="mb-6 text-center text-red-600 font-medium">{message}</p>}

//             {/* Search Input */}
//             <div className="mb-8">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search contacts..."
//                     className="w-full border border-blue-300 rounded-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                 />
//             </div>

//             {/* Add New Contact Form */}
//             <form onSubmit={handleAddContact} className="space-y-6">
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Username:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactUsername}
//                         onChange={(e) => setContactUsername(e.target.value)}
//                         placeholder="Contact username"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Mobile Number:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactPhone}
//                         onChange={(e) => setContactPhone(e.target.value)}
//                         placeholder="Contact phone number"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg cursor-pointer"
//                 >
//                     Add Contact
//                 </button>
//             </form>

//             {/* Toggle Button for Contacts List */}
//             {/* This button only affects the toggle state when search input is empty */}
//             {searchQuery.trim() === "" && (
//                 <div className="mt-10 flex justify-center">
//                     <button
//                         onClick={() => setShowContacts(!showContacts)}
//                         className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow cursor-pointer"
//                     >
//                         {showContacts ? 'Hide Your Contacts' : 'Show Your Contacts'}
//                     </button>
//                 </div>
//             )}

//             {/* Contacts List is displayed based on contactsVisible */}
//             {contactsVisible && (
//                 <>
//                     <h3 className="text-3xl font-bold mt-10 mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">Your Contacts:</h3>
//                     <ul className="space-y-6">
//                         {sortedContacts.map((contact, index) => {
//                             // Get the first letter of the username in uppercase.
//                             const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
//                             // Determine if a new header should be displayed.
//                             const showHeader =
//                                 index === 0 ||
//                                 currentLetter !== sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

//                             return (
//                                 <React.Fragment key={index}>
//                                     {showHeader && (
//                                         <div className="pt-4 text-2xl font-extrabold text-blue-800">{currentLetter}</div>
//                                     )}
//                                     <li className="px-6 py-3 bg-white rounded-xl shadow-md flex flex-col hover:bg-blue-50 transition duration-300">
//                                         {editingIndex === index ? (
//                                             // Editing Mode: Show edit UI along with edit-specific message.
//                                             <>
//                                                 {editMessage && (
//                                                     <p className="mb-6 text-center text-red-600 font-medium">{editMessage}</p>
//                                                 )}
//                                                 <div className="mb-4">
//                                                     <label className="block text-gray-700 font-semibold mb-2">Username:</label>
//                                                     <input
//                                                         type="text"
//                                                         value={editingUsername}
//                                                         onChange={(e) => setEditingUsername(e.target.value)}
//                                                         className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                                     />
//                                                 </div>
//                                                 <div className="mb-4">
//                                                     <label className="block text-gray-700 font-semibold mb-2">Mobile Number:</label>
//                                                     <input
//                                                         type="text"
//                                                         value={editingPhone}
//                                                         onChange={(e) => setEditingPhone(e.target.value)}
//                                                         className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                                     />
//                                                 </div>
//                                                 <div className="flex justify-end space-x-4">
//                                                     <button
//                                                         onClick={handleSaveEdit}
//                                                         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                     >
//                                                         Save
//                                                     </button>
//                                                     <button
//                                                         onClick={handleCancelEdit}
//                                                         className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                     >
//                                                         Cancel
//                                                     </button>
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             // Default Mode: Display contact details with Edit and Remove buttons.
//                                             <>
//                                                 <div className="flex items-center justify-between">
//                                                     <span className="text-xl font-bold text-gray-800 capitalize">
//                                                         {contact.contactUsername}
//                                                     </span>
//                                                     <div className="flex space-x-3">
//                                                         <button
//                                                             onClick={() => handleEditContact(index)}
//                                                             className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                         >
//                                                             Edit
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleRemoveContact(contact.contactPhone)}
//                                                             className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                         >
//                                                             Remove
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <span className="mt-3 text-gray-600 text-base">
//                                                     {contact.contactPhone}
//                                                 </span>
//                                             </>
//                                         )}
//                                     </li>
//                                 </React.Fragment>
//                             );
//                         })}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// };

// export default AddUser;



// not pass data from unkonew use save button


// import React, { useState, useEffect } from 'react';

// const AddUser = () => {
//   // State variables for contact info, messages, and contacts list.
//   const [contactUsername, setContactUsername] = useState('');
//   const [contactPhone, setContactPhone] = useState('');
//   const [message, setMessage] = useState(''); // Global message for add or remove.
//   const [editMessage, setEditMessage] = useState(''); // Message specific for edit operations.
//   const [contacts, setContacts] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   // New state: whether to show the contacts list.
//   const [showContacts, setShowContacts] = useState(false);

//   // Local state for editing a contact.
//   const [editingIndex, setEditingIndex] = useState(-1);
//   const [editingUsername, setEditingUsername] = useState('');
//   const [editingPhone, setEditingPhone] = useState('');

//   // Fetch the logged in user info.
//   useEffect(() => {
//     const fetchLoggedInUser = async () => {
//       try {
//         const storedUsername = localStorage.getItem("username");
//         const response = await fetch(
//           `http://localhost:5000/api/registerUser?username=${storedUsername}`
//         );
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setLoggedInUser(data.user);
//       } catch (error) {
//         console.error("Error fetching logged-in user:", error.message);
//       }
//     };
//     fetchLoggedInUser();
//   }, []);

//   // Once loggedInUser is available, fetch the contacts.
//   useEffect(() => {
//     if (loggedInUser) {
//       fetchContacts();
//     }
//   }, [loggedInUser]);

//   // Function to fetch contacts from the server.
//   const fetchContacts = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//       );
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       const data = await response.json();
//       setContacts(data.contacts);
//     } catch (error) {
//       console.error("Error fetching contacts:", error.message);
//     }
//   };

//   // Handler for adding a new contact.
//   const handleAddContact = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/addContact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone, contactUsername }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact added successfully!");
//         setContacts(data.contacts);
//         // Clear the input fields.
//         setContactUsername('');
//         setContactPhone('');
//       }
//     } catch (error) {
//       console.error("Error adding contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   // Handler for removing a contact.
//   const handleRemoveContact = async (contactPhone) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/removeContact`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact removed successfully!");
//         setContacts(data.contacts);
//       }
//     } catch (error) {
//       console.error("Error removing contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   // Handler to start editing a contact.
//   const handleEditContact = (index) => {
//     const contact = contacts[index];
//     setEditingIndex(index);
//     setEditingUsername(contact.contactUsername);
//     setEditingPhone(contact.contactPhone);
//     setMessage('');       // Clear global message.
//     setEditMessage('');   // Clear any previous edit message.
//   };

//   // Handler to cancel editing.
//   const handleCancelEdit = () => {
//     setEditingIndex(-1);
//     setEditingUsername('');
//     setEditingPhone('');
//     setEditMessage('');
//   };

//   // Handler to save the edited contact.
//   const handleSaveEdit = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/updateContact`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           oldContactPhone: contacts[editingIndex].contactPhone,
//           newContactPhone: editingPhone,
//           newContactUsername: editingUsername,
//         }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         // Set edit-specific message.
//         setEditMessage(data.message);
//       } else {
//         setMessage("Contact updated successfully!");
//         setContacts(data.contacts);
//         // Exit edit mode and clear edit message.
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setEditMessage('');
//       }
//     } catch (error) {
//       console.error("Error updating contact:", error.message);
//       setEditMessage("Internal error");
//     }
//   };

//   // Handler for search input changes.
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter contacts based on search query (matches username or phone, case-insensitive).
//   const filteredContacts = contacts.filter(contact => {
//     const usernameMatch =
//       contact.contactUsername &&
//       contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//     const phoneMatch =
//       contact.contactPhone &&
//       contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//     return usernameMatch || phoneMatch;
//   });

//   // Sort filtered contacts alphabetically (A to Z) by username.
//   const sortedContacts = [...filteredContacts].sort((a, b) =>
//     a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
//   );

//   // Determine whether to show the contacts list.
//   // If there's text in the search input, show the contacts; otherwise rely on the toggle.
//   const contactsVisible = searchQuery.trim() !== "" || showContacts;

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl overflow-y-auto h-[85vh]">
//       {/* Always display the top header and global message */}
//       <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow-md">
//         Add New Contact
//       </h2>
//       {message && <p className="mb-6 text-center text-red-600 font-medium">{message}</p>}

//       {/* Search Input */}
//       <div className="mb-8">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search contacts..."
//           className="w-full border border-blue-300 rounded-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//         />
//       </div>

//       {/* Add New Contact Form */}
//       <form onSubmit={handleAddContact} className="space-y-6">
//         <div>
//           <label className="block mb-2 text-lg font-semibold text-gray-700">
//             Username:<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={contactUsername}
//             onChange={(e) => setContactUsername(e.target.value)}
//             placeholder="Contact username"
//             required
//             className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-lg font-semibold text-gray-700">
//             Mobile Number:<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//             placeholder="Contact phone number"
//             required
//             className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg cursor-pointer"
//         >
//           Add Contact
//         </button>
//       </form>

//       {/* Toggle Button for Contacts List */}
//       {/* This button only affects the toggle state when search input is empty */}
//       {searchQuery.trim() === "" && (
//         <div className="mt-10 flex justify-center">
//           <button
//             onClick={() => setShowContacts(!showContacts)}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow cursor-pointer"
//           >
//             {showContacts ? 'Hide Your Contacts' : 'Show Your Contacts'}
//           </button>
//         </div>
//       )}

//       {/* Contacts List is displayed based on contactsVisible */}
//       {contactsVisible && (
//         <>
//           <h3 className="text-3xl font-bold mt-10 mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">Your Contacts:</h3>
//           <ul className="space-y-6">
//             {sortedContacts.map((contact, index) => {
//               // Get the first letter of the username in uppercase.
//               const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
//               // Determine if a new header should be displayed.
//               const showHeader =
//                 index === 0 ||
//                 currentLetter !== sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

//               return (
//                 <React.Fragment key={index}>
//                   {showHeader && (
//                     <div className="pt-4 text-2xl font-extrabold text-blue-800">{currentLetter}</div>
//                   )}
//                   <li className="px-6 py-3 bg-white rounded-xl shadow-md flex flex-col hover:bg-blue-50 transition duration-300">
//                     {editingIndex === index ? (
//                       // Editing Mode: Show edit UI along with edit-specific message.
//                       <>
//                         {editMessage && (
//                           <p className="mb-6 text-center text-red-600 font-medium">{editMessage}</p>
//                         )}
//                         <div className="mb-4">
//                           <label className="block text-gray-700 font-semibold mb-2">Username:</label>
//                           <input
//                             type="text"
//                             value={editingUsername}
//                             onChange={(e) => setEditingUsername(e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                           />
//                         </div>
//                         <div className="mb-4">
//                           <label className="block text-gray-700 font-semibold mb-2">Mobile Number:</label>
//                           <input
//                             type="text"
//                             value={editingPhone}
//                             onChange={(e) => setEditingPhone(e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                           />
//                         </div>
//                         <div className="flex justify-end space-x-4">
//                           <button
//                             onClick={handleSaveEdit}
//                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={handleCancelEdit}
//                             className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       // Default Mode: Display contact details with Edit and Remove buttons.
//                       <>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xl font-bold text-gray-800 capitalize">
//                             {contact.contactUsername}
//                           </span>
//                           <div className="flex space-x-3">
//                             <button
//                               onClick={() => handleEditContact(index)}
//                               className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleRemoveContact(contact.contactPhone)}
//                               className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                         <span className="mt-3 text-gray-600 text-base">
//                           {contact.contactPhone}
//                         </span>
//                       </>
//                     )}
//                   </li>
//                 </React.Fragment>
//               );
//             })}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default AddUser;


//not show close button in add user if pass phone in url


// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';  // New import to grab query params

// const AddUser = () => {
//   // Retrieve any query parameters from the URL.
//   const location = useLocation();

//   // State variables for contact info, messages, and contacts list.
//   const [contactUsername, setContactUsername] = useState('');
//   const [contactPhone, setContactPhone] = useState(''); // This will be populated from query if present.
//   const [message, setMessage] = useState(''); // Global message for add or remove.
//   const [editMessage, setEditMessage] = useState(''); // Message specific for edit operations.
//   const [contacts, setContacts] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   // New state: whether to show the contacts list.
//   const [showContacts, setShowContacts] = useState(false);

//   // Local state for editing a contact.
//   const [editingIndex, setEditingIndex] = useState(-1);
//   const [editingUsername, setEditingUsername] = useState('');
//   const [editingPhone, setEditingPhone] = useState('');

//   // Fetch the logged in user info.
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

//   // Once loggedInUser is available, fetch the contacts.
//   useEffect(() => {
//     if (loggedInUser) {
//       fetchContacts();
//     }
//   }, [loggedInUser]);

//   // NEW: Read the "phone" query parameter and set it as the initial phone number value.
//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const phoneParam = query.get('phone');
//     if (phoneParam) {
//       setContactPhone(phoneParam);
//     }
//   }, [location.search]);

//   // Function to fetch contacts from the server.
//   const fetchContacts = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//       );
//       if (!response.ok)
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       const data = await response.json();
//       setContacts(data.contacts);
//     } catch (error) {
//       console.error("Error fetching contacts:", error.message);
//     }
//   };

//   // Handler for adding a new contact.
//   const handleAddContact = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/addContact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           contactPhone,
//           contactUsername,
//         }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact added successfully!");
//         setContacts(data.contacts);
//         // Clear the input fields.
//         setContactUsername('');
//         setContactPhone('');
//       }
//     } catch (error) {
//       console.error("Error adding contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   // Handler for removing a contact.
//   const handleRemoveContact = async (contactPhone) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/removeContact`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage("Contact removed successfully!");
//         setContacts(data.contacts);
//       }
//     } catch (error) {
//       console.error("Error removing contact:", error.message);
//       setMessage("Internal error");
//     }
//   };

//   // Handler to start editing a contact.
//   const handleEditContact = (index) => {
//     const contact = contacts[index];
//     setEditingIndex(index);
//     setEditingUsername(contact.contactUsername);
//     setEditingPhone(contact.contactPhone);
//     setMessage('');       // Clear global message.
//     setEditMessage('');   // Clear any previous edit message.
//   };

//   // Handler to cancel editing.
//   const handleCancelEdit = () => {
//     setEditingIndex(-1);
//     setEditingUsername('');
//     setEditingPhone('');
//     setEditMessage('');
//   };

//   // Handler to save the edited contact.
//   const handleSaveEdit = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/updateContact`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           owner: loggedInUser.phone,
//           oldContactPhone: contacts[editingIndex].contactPhone,
//           newContactPhone: editingPhone,
//           newContactUsername: editingUsername,
//         }),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         // Set edit-specific message.
//         setEditMessage(data.message);
//       } else {
//         setMessage("Contact updated successfully!");
//         setContacts(data.contacts);
//         // Exit edit mode and clear edit message.
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setEditMessage('');
//       }
//     } catch (error) {
//       console.error("Error updating contact:", error.message);
//       setEditMessage("Internal error");
//     }
//   };

//   // Handler for search input changes.
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter contacts based on search query (matches username or phone, case-insensitive).
//   const filteredContacts = contacts.filter((contact) => {
//     const usernameMatch =
//       contact.contactUsername &&
//       contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//     const phoneMatch =
//       contact.contactPhone &&
//       contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//     return usernameMatch || phoneMatch;
//   });

//   // Sort filtered contacts alphabetically (A to Z) by username.
//   const sortedContacts = [...filteredContacts].sort((a, b) =>
//     a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
//   );

//   // Determine whether to show the contacts list.
//   // If there's text in the search input, show the contacts; otherwise rely on the toggle.
//   const contactsVisible = searchQuery.trim() !== "" || showContacts;

//   return (
//     <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl overflow-y-auto h-[85vh]">
//       {/* Always display the top header and global message */}
//       <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow-md">
//         Add New Contact
//       </h2>
//       {message && (
//         <p className="mb-6 text-center text-red-600 font-medium">{message}</p>
//       )}

//       {/* Search Input */}
//       <div className="mb-8">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search contacts..."
//           className="w-full border border-blue-300 rounded-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//         />
//       </div>

//       {/* Add New Contact Form */}
//       <form onSubmit={handleAddContact} className="space-y-6">
//         <div>
//           <label className="block mb-2 text-lg font-semibold text-gray-700">
//             Username:<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={contactUsername}
//             onChange={(e) => setContactUsername(e.target.value)}
//             placeholder="Contact username"
//             required
//             className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-lg font-semibold text-gray-700">
//             Mobile Number:<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={contactPhone}
//             onChange={(e) => setContactPhone(e.target.value)}
//             placeholder="Contact phone number"
//             required
//             className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg cursor-pointer"
//         >
//           Add Contact
//         </button>
//       </form>

//       {/* Toggle Button for Contacts List */}
//       {/* This button only affects the toggle state when search input is empty */}
//       {searchQuery.trim() === "" && (
//         <div className="mt-10 flex justify-center">
//           <button
//             onClick={() => setShowContacts(!showContacts)}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow cursor-pointer"
//           >
//             {showContacts ? 'Hide Your Contacts' : 'Show Your Contacts'}
//           </button>
//         </div>
//       )}

//       {/* Contacts List is displayed based on contactsVisible */}
//       {contactsVisible && (
//         <>
//           <h3 className="text-3xl font-bold mt-10 mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">
//             Your Contacts:
//           </h3>
//           <ul className="space-y-6">
//             {sortedContacts.map((contact, index) => {
//               // Get the first letter of the username in uppercase.
//               const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
//               // Determine if a new header should be displayed.
//               const showHeader =
//                 index === 0 ||
//                 currentLetter !==
//                   sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

//               return (
//                 <React.Fragment key={index}>
//                   {showHeader && (
//                     <div className="pt-4 text-2xl font-extrabold text-blue-800">
//                       {currentLetter}
//                     </div>
//                   )}
//                   <li className="px-6 py-3 bg-white rounded-xl shadow-md flex flex-col hover:bg-blue-50 transition duration-300">
//                     {editingIndex === index ? (
//                       // Editing Mode: Show edit UI along with edit-specific message.
//                       <>
//                         {editMessage && (
//                           <p className="mb-6 text-center text-red-600 font-medium">
//                             {editMessage}
//                           </p>
//                         )}
//                         <div className="mb-4">
//                           <label className="block text-gray-700 font-semibold mb-2">
//                             Username:
//                           </label>
//                           <input
//                             type="text"
//                             value={editingUsername}
//                             onChange={(e) =>
//                               setEditingUsername(e.target.value)
//                             }
//                             className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                           />
//                         </div>
//                         <div className="mb-4">
//                           <label className="block text-gray-700 font-semibold mb-2">
//                             Mobile Number:
//                           </label>
//                           <input
//                             type="text"
//                             value={editingPhone}
//                             onChange={(e) =>
//                               setEditingPhone(e.target.value)
//                             }
//                             className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                           />
//                         </div>
//                         <div className="flex justify-end space-x-4">
//                           <button
//                             onClick={handleSaveEdit}
//                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={handleCancelEdit}
//                             className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       // Default Mode: Display contact details with Edit and Remove buttons.
//                       <>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xl font-bold text-gray-800 capitalize">
//                             {contact.contactUsername}
//                           </span>
//                           <div className="flex space-x-3">
//                             <button
//                               onClick={() => handleEditContact(index)}
//                               className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleRemoveContact(contact.contactPhone)
//                               }
//                               className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                         <span className="mt-3 text-gray-600 text-base">
//                           {contact.contactPhone}
//                         </span>
//                       </>
//                     )}
//                   </li>
//                 </React.Fragment>
//               );
//             })}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default AddUser;




//when edit , delete contact then open chat also this called error


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';  // New import to grab query params

// const AddUser = () => {
//     // Retrieve any query parameters from the URL.
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Create a URLSearchParams object and extract the phone parameter.
//     const query = new URLSearchParams(location.search);
//     const phoneParam = query.get('phone');

//     // State variables for contact info, messages, and contacts list.
//     const [contactUsername, setContactUsername] = useState('');
//     const [contactPhone, setContactPhone] = useState(''); // This will be populated from query if present.
//     const [message, setMessage] = useState(''); // Global message for add or remove.
//     const [editMessage, setEditMessage] = useState(''); // Message specific for edit operations.
//     const [contacts, setContacts] = useState([]);
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     // New state: whether to show the contacts list.
//     const [showContacts, setShowContacts] = useState(false);

//     // Local state for editing a contact.
//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editingUsername, setEditingUsername] = useState('');
//     const [editingPhone, setEditingPhone] = useState('');

//     // Fetch the logged in user info.
//     useEffect(() => {
//         const fetchLoggedInUser = async () => {
//             try {
//                 const storedUsername = localStorage.getItem("username");
//                 const response = await fetch(
//                     `http://localhost:5000/api/registerUser?username=${storedUsername}`
//                 );
//                 if (!response.ok)
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 setLoggedInUser(data.user);
//             } catch (error) {
//                 console.error("Error fetching logged-in user:", error.message);
//             }
//         };
//         fetchLoggedInUser();
//     }, []);

//     // Once loggedInUser is available, fetch the contacts.
//     useEffect(() => {
//         if (loggedInUser) {
//             fetchContacts();
//         }
//     }, [loggedInUser]);

//     // NEW: Read the "phone" query parameter and set it as the initial phone number value.
//     useEffect(() => {
//         const query = new URLSearchParams(location.search);
//         const phoneParam = query.get('phone');
//         if (phoneParam) {
//             setContactPhone(phoneParam);
//         }
//     }, [location.search]);

//     // Function to fetch contacts from the server.
//     const fetchContacts = async () => {
//         try {
//             const response = await fetch(
//                 `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
//             );
//             if (!response.ok)
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setContacts(data.contacts);
//         } catch (error) {
//             console.error("Error fetching contacts:", error.message);
//         }
//     };

//     // Handler for adding a new contact.
//     const handleAddContact = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`http://localhost:5000/api/addContact`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     contactPhone,
//                     contactUsername,
//                 }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact added successfully!");
//                 setContacts(data.contacts);
//                 // Clear the input fields.
//                 setContactUsername('');
//                 setContactPhone('');
//             }
//         } catch (error) {
//             console.error("Error adding contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler for removing a contact.
//     const handleRemoveContact = async (contactPhone) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/removeContact`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message);
//             } else {
//                 setMessage("Contact removed successfully!");
//                 setContacts(data.contacts);
//             }
//         } catch (error) {
//             console.error("Error removing contact:", error.message);
//             setMessage("Internal error");
//         }
//     };

//     // Handler to start editing a contact.
//     const handleEditContact = (index) => {
//         const contact = contacts[index];
//         setEditingIndex(index);
//         setEditingUsername(contact.contactUsername);
//         setEditingPhone(contact.contactPhone);
//         setMessage('');       // Clear global message.
//         setEditMessage('');   // Clear any previous edit message.
//     };

//     // Handler to cancel editing.
//     const handleCancelEdit = () => {
//         setEditingIndex(-1);
//         setEditingUsername('');
//         setEditingPhone('');
//         setEditMessage('');
//     };

//     // Handler to save the edited contact.
//     const handleSaveEdit = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/updateContact`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     owner: loggedInUser.phone,
//                     oldContactPhone: contacts[editingIndex].contactPhone,
//                     newContactPhone: editingPhone,
//                     newContactUsername: editingUsername,
//                 }),
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 // Set edit-specific message.
//                 setEditMessage(data.message);
//             } else {
//                 setMessage("Contact updated successfully!");
//                 setContacts(data.contacts);
//                 // Exit edit mode and clear edit message.
//                 setEditingIndex(-1);
//                 setEditingUsername('');
//                 setEditingPhone('');
//                 setEditMessage('');
//             }
//         } catch (error) {
//             console.error("Error updating contact:", error.message);
//             setEditMessage("Internal error");
//         }
//     };

//     // Handler for search input changes.
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     // Filter contacts based on search query (matches username or phone, case-insensitive).
//     const filteredContacts = contacts.filter((contact) => {
//         const usernameMatch =
//             contact.contactUsername &&
//             contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
//         const phoneMatch =
//             contact.contactPhone &&
//             contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
//         return usernameMatch || phoneMatch;
//     });

//     // Sort filtered contacts alphabetically (A to Z) by username.
//     const sortedContacts = [...filteredContacts].sort((a, b) =>
//         a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
//     );

//     // Determine whether to show the contacts list.
//     // If there's text in the search input, show the contacts; otherwise rely on the toggle.
//     const contactsVisible = searchQuery.trim() !== "" || showContacts;

//     return (
//         <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl overflow-y-auto h-[86vh]">
//             {/* Conditionally render Close Button only if phoneParam exists */}
//             {phoneParam && (
//                 <div className="flex justify-end mb-4">
//                     <button
//                         onClick={() => navigate("/chat")}
//                         className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
//                     >
//                         Close
//                     </button>
//                 </div>
//             )}
//             {/* Always display the top header and global message */}
//             <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow-md">
//                 Add New Contact
//             </h2>
//             {message && (
//                 <p className="mb-6 text-center text-red-600 font-medium">{message}</p>
//             )}

//             {/* Search Input */}
//             <div className="mb-8">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search contacts..."
//                     className="w-full border border-blue-300 rounded-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                 />
//             </div>

//             {/* Add New Contact Form */}
//             <form onSubmit={handleAddContact} className="space-y-6">
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Username:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactUsername}
//                         onChange={(e) => setContactUsername(e.target.value)}
//                         placeholder="Contact username"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <div>
//                     <label className="block mb-2 text-lg font-semibold text-gray-700">
//                         Mobile Number:<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         value={contactPhone}
//                         onChange={(e) => setContactPhone(e.target.value)}
//                         placeholder="Contact phone number"
//                         required
//                         className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg cursor-pointer"
//                 >
//                     Add Contact
//                 </button>
//             </form>

//             {/* Toggle Button for Contacts List */}
//             {/* This button only affects the toggle state when search input is empty */}
//             {searchQuery.trim() === "" && (
//                 <div className="mt-10 flex justify-center">
//                     <button
//                         onClick={() => setShowContacts(!showContacts)}
//                         className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow cursor-pointer"
//                     >
//                         {showContacts ? 'Hide Your Contacts' : 'Show Your Contacts'}
//                     </button>
//                 </div>
//             )}

//             {/* Contacts List is displayed based on contactsVisible */}
//             {contactsVisible && (
//                 <>
//                     <h3 className="text-3xl font-bold mt-10 mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">
//                         Your Contacts:
//                     </h3>
//                     <ul className="space-y-6">
//                         {sortedContacts.map((contact, index) => {
//                             // Get the first letter of the username in uppercase.
//                             const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
//                             // Determine if a new header should be displayed.
//                             const showHeader =
//                                 index === 0 ||
//                                 currentLetter !==
//                                 sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

//                             return (
//                                 <React.Fragment key={index}>
//                                     {showHeader && (
//                                         <div className="pt-4 text-2xl font-extrabold text-blue-800">
//                                             {currentLetter}
//                                         </div>
//                                     )}
//                                     <li className="px-6 py-3 bg-white rounded-xl shadow-md flex flex-col hover:bg-blue-50 transition duration-300">
//                                         {editingIndex === index ? (
//                                             // Editing Mode: Show edit UI along with edit-specific message.
//                                             <>
//                                                 {editMessage && (
//                                                     <p className="mb-6 text-center text-red-600 font-medium">
//                                                         {editMessage}
//                                                     </p>
//                                                 )}
//                                                 <div className="mb-4">
//                                                     <label className="block text-gray-700 font-semibold mb-2">
//                                                         Username:
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={editingUsername}
//                                                         onChange={(e) =>
//                                                             setEditingUsername(e.target.value)
//                                                         }
//                                                         className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                                     />
//                                                 </div>
//                                                 <div className="mb-4">
//                                                     <label className="block text-gray-700 font-semibold mb-2">
//                                                         Mobile Number:
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={editingPhone}
//                                                         onChange={(e) =>
//                                                             setEditingPhone(e.target.value)
//                                                         }
//                                                         className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                                     />
//                                                 </div>
//                                                 <div className="flex justify-end space-x-4">
//                                                     <button
//                                                         onClick={handleSaveEdit}
//                                                         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                     >
//                                                         Save
//                                                     </button>
//                                                     <button
//                                                         onClick={handleCancelEdit}
//                                                         className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                     >
//                                                         Cancel
//                                                     </button>
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             // Default Mode: Display contact details with Edit and Remove buttons.
//                                             <>
//                                                 <div className="flex items-center justify-between">
//                                                     <span className="text-xl font-bold text-gray-800 capitalize">
//                                                         {contact.contactUsername}
//                                                     </span>
//                                                     <div className="flex space-x-3">
//                                                         <button
//                                                             onClick={() => handleEditContact(index)}
//                                                             className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                         >
//                                                             Edit
//                                                         </button>
//                                                         <button
//                                                             onClick={() =>
//                                                                 handleRemoveContact(contact.contactPhone)
//                                                             }
//                                                             className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
//                                                         >
//                                                             Remove
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <span className="mt-3 text-gray-600 text-base">
//                                                     {contact.contactPhone}
//                                                 </span>
//                                             </>
//                                         )}
//                                     </li>
//                                 </React.Fragment>
//                             );
//                         })}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// };

// export default AddUser;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // New import to grab query params

const AddUser = ({ onRemove }) => {
    // Retrieve any query parameters from the URL.
    const location = useLocation();
    const navigate = useNavigate();

    // Create a URLSearchParams object and extract the phone parameter.
    const query = new URLSearchParams(location.search);
    const phoneParam = query.get('phone');

    // State variables for contact info, messages, and contacts list.
    const [contactUsername, setContactUsername] = useState('');
    const [contactPhone, setContactPhone] = useState(''); // This will be populated from query if present.
    const [message, setMessage] = useState(''); // Global message for add or remove.
    const [editMessage, setEditMessage] = useState(''); // Message specific for edit operations.
    const [contacts, setContacts] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    // New state: whether to show the contacts list.
    const [showContacts, setShowContacts] = useState(false);

    // Local state for editing a contact.
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editingUsername, setEditingUsername] = useState('');
    const [editingPhone, setEditingPhone] = useState('');

    // Fetch the logged in user info.
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

    // Once loggedInUser is available, fetch the contacts.
    useEffect(() => {
        if (loggedInUser) {
            fetchContacts();
        }
    }, [loggedInUser]);

    // NEW: Read the "phone" query parameter and set it as the initial phone number value.
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const phoneParam = query.get('phone');
        if (phoneParam) {
            setContactPhone(phoneParam);
        }
    }, [location.search]);

    // Function to fetch contacts from the server.
    const fetchContacts = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/contacts?owner=${loggedInUser.phone}`
            );
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setContacts(data.contacts);
        } catch (error) {
            console.error("Error fetching contacts:", error.message);
        }
    };

    // Handler for adding a new contact.
    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/addContact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    owner: loggedInUser.phone,
                    contactPhone,
                    contactUsername,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setMessage(data.message);
            } else {
                setMessage("Contact added successfully!");
                setContacts(data.contacts);
                // Clear the input fields.
                setContactUsername('');
                setContactPhone('');
            }
        } catch (error) {
            console.error("Error adding contact:", error.message);
            setMessage("Internal error");
        }
    };

    // Handler for removing a contact.
    const handleRemoveContact = async (contactPhone) => {
        try {
            const response = await fetch(`http://localhost:5000/api/removeContact`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ owner: loggedInUser.phone, contactPhone }),
            });
            const data = await response.json();
            if (!response.ok) {
                setMessage(data.message);
            } else {
                setMessage("Contact removed successfully!");
                setContacts(data.contacts);
                // close chat in ChatPage
                if (onRemove) onRemove();
                // navigate back to chat list
                navigate('/chat');
            }
        } catch (error) {
            console.error("Error removing contact:", error.message);
            setMessage("Internal error");
        }
    };

    // Handler to start editing a contact.
    const handleEditContact = (index) => {
        const contact = contacts[index];
        setEditingIndex(index);
        setEditingUsername(contact.contactUsername);
        setEditingPhone(contact.contactPhone);
        setMessage('');       // Clear global message.
        setEditMessage('');   // Clear any previous edit message.
    };

    // Handler to cancel editing.
    const handleCancelEdit = () => {
        setEditingIndex(-1);
        setEditingUsername('');
        setEditingPhone('');
        setEditMessage('');
    };

    // Handler to save the edited contact.
    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/updateContact`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    owner: loggedInUser.phone,
                    oldContactPhone: contacts[editingIndex].contactPhone,
                    newContactPhone: editingPhone,
                    newContactUsername: editingUsername,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                // Set edit-specific message.
                setEditMessage(data.message);
            } else {
                setMessage("Contact updated successfully!");
                setContacts(data.contacts);
                // Exit edit mode and clear edit message.
                setEditingIndex(-1);
                setEditingUsername('');
                setEditingPhone('');
                setEditMessage('');
                // close chat in ChatPage
                if (onRemove) onRemove();
                // navigate back to chat list
                navigate('/chat');
            }
        } catch (error) {
            console.error("Error updating contact:", error.message);
            setEditMessage("Internal error");
        }
    };

    // Handler for search input changes.
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter contacts based on search query (matches username or phone, case-insensitive).
    const filteredContacts = contacts.filter((contact) => {
        const usernameMatch =
            contact.contactUsername &&
            contact.contactUsername.toLowerCase().includes(searchQuery.toLowerCase());
        const phoneMatch =
            contact.contactPhone &&
            contact.contactPhone.toLowerCase().includes(searchQuery.toLowerCase());
        return usernameMatch || phoneMatch;
    });

    // Sort filtered contacts alphabetically (A to Z) by username.
    const sortedContacts = [...filteredContacts].sort((a, b) =>
        a.contactUsername.toLowerCase().localeCompare(b.contactUsername.toLowerCase())
    );

    // Determine whether to show the contacts list.
    // If there's text in the search input, show the contacts; otherwise rely on the toggle.
    const contactsVisible = searchQuery.trim() !== "" || showContacts;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl overflow-y-auto h-[86vh] [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-gray-200
    [&::-webkit-scrollbar-thumb]:bg-green-50
    [&::-webkit-scrollbar-thumb]:rounded-full">
            {/* Conditionally render Close Button only if phoneParam exists */}
            {phoneParam && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => navigate("/chat")}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                    >
                        Close
                    </button>
                </div>
            )}
            {/* Always display the top header and global message */}
            <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 drop-shadow-md">
                Add New Contact
            </h2>
            {message && (
                <p className="mb-6 text-center text-red-600 font-medium">{message}</p>
            )}

            {/* Search Input */}
            <div className="mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search contacts..."
                    className="w-full border border-blue-300 rounded-full py-3 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
            </div>

            {/* Add New Contact Form */}
            <form onSubmit={handleAddContact} className="space-y-6">
                <div>
                    <label className="block mb-2 text-lg font-semibold text-gray-700">
                        Username:<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={contactUsername}
                        onChange={(e) => setContactUsername(e.target.value)}
                        placeholder="Contact username"
                        required
                        className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-lg font-semibold text-gray-700">
                        Mobile Number:<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Contact phone number"
                        required
                        className="w-full border border-gray-300 rounded-lg py-3 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 shadow-lg cursor-pointer"
                >
                    Add Contact
                </button>
            </form>

            {/* Toggle Button for Contacts List */}
            {/* This button only affects the toggle state when search input is empty */}
            {searchQuery.trim() === "" && (
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => setShowContacts(!showContacts)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow cursor-pointer"
                    >
                        {showContacts ? 'Hide Your Contacts' : 'Show Your Contacts'}
                    </button>
                </div>
            )}

            {/* Contacts List is displayed based on contactsVisible */}
            {contactsVisible && (
                <>
                    <h3 className="text-3xl font-bold mt-10 mb-6 text-blue-800 border-b-2 border-blue-300 pb-2">
                        Your Contacts:
                    </h3>
                    <ul className="space-y-6">
                        {sortedContacts.map((contact, index) => {
                            // Get the first letter of the username in uppercase.
                            const currentLetter = contact.contactUsername.charAt(0).toUpperCase();
                            // Determine if a new header should be displayed.
                            const showHeader =
                                index === 0 ||
                                currentLetter !==
                                sortedContacts[index - 1].contactUsername.charAt(0).toUpperCase();

                            return (
                                <React.Fragment key={index}>
                                    {showHeader && (
                                        <div className="pt-4 text-2xl font-extrabold text-blue-800">
                                            {currentLetter}
                                        </div>
                                    )}
                                    <li className="px-6 py-3 bg-white rounded-xl shadow-md flex flex-col hover:bg-blue-50 transition duration-300">
                                        {editingIndex === index ? (
                                            // Editing Mode: Show edit UI along with edit-specific message.
                                            <>
                                                {editMessage && (
                                                    <p className="mb-6 text-center text-red-600 font-medium">
                                                        {editMessage}
                                                    </p>
                                                )}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 font-semibold mb-2">
                                                        Username:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingUsername}
                                                        onChange={(e) =>
                                                            setEditingUsername(e.target.value)
                                                        }
                                                        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 font-semibold mb-2">
                                                        Mobile Number:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editingPhone}
                                                        onChange={(e) =>
                                                            setEditingPhone(e.target.value)
                                                        }
                                                        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                                    />
                                                </div>
                                                <div className="flex justify-end space-x-4">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            // Default Mode: Display contact details with Edit and Remove buttons.
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xl font-bold text-gray-800 capitalize">
                                                        {contact.contactUsername}
                                                    </span>
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => handleEditContact(index)}
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleRemoveContact(contact.contactPhone)
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 cursor-pointer shadow"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                                <span className="mt-3 text-gray-600 text-base">
                                                    {contact.contactPhone}
                                                </span>
                                            </>
                                        )}
                                    </li>
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default AddUser;
