// // ShareContactsModal.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function ShareContactsModal({
//     isOpen,
//     onClose,
//     shareChat,
//     socket,
// }) {
//     const [contacts, setContacts] = useState([]);
//     const [unknownContacts, setUnknownContacts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedPhones, setSelectedPhones] = useState([]);

//     // Load contacts once modal opens
//     useEffect(() => {
//         if (!isOpen) return;
//         setSearchTerm("");
//         setSelectedPhones([]);

//         (async () => {
//             try {
//                 const owner = localStorage.getItem("username");
//                 const { data } = await axios.get(
//                     `http://localhost:5000/api/contacts?owner=${owner}`
//                 );
//                 setContacts(data.contacts);
//                 setUnknownContacts(data.unknownContacts);
//             } catch (err) {
//                 console.error("Failed to load contacts:", err);
//             }
//         })();
//     }, [isOpen]);

//     if (!isOpen) return null;

//     // merged + filtered
//     const all = [...contacts, ...unknownContacts];
//     const filtered = all.filter(
//         (c) =>
//             c.contactUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             c.contactPhone.includes(searchTerm)
//     );

//     const togglePhone = (phone) =>
//         setSelectedPhones((prev) =>
//             prev.includes(phone)
//                 ? prev.filter((p) => p !== phone)
//                 : [...prev, phone]
//         );

//     const handleSend = () => {
//         const owner = localStorage.getItem("username");
//         selectedPhones.forEach((phone) => {
//             socket.emit("sendMessage", {
//                 sender: owner,
//                 receiver: phone,
//                 message: shareChat.message,
//                 image: shareChat.image,    // ← resend original media path
//             });
//         });
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-90 max-h-[80vh]">
//                 <h2 className="text-lg font-semibold mb-4">Share with…</h2>

//                 <input
//                     type="text"
//                     placeholder="Search contacts"
//                     className="w-full mb-3 p-2 border rounded"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//                 <div className="space-y-2 mb-4 overflow-y-auto max-h-[50vh]">
//                     {filtered.length > 0 && filtered.map((c) => (
//                         // {filtered.map((c) => (
//                         <label key={c.contactPhone} className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
//                             <input
//                                 type="checkbox"
//                                 className="mr-2"
//                                 checked={selectedPhones.includes(c.contactPhone)}
//                                 onChange={() => togglePhone(c.contactPhone)}
//                             />
//                             <div>
//                                 <div className="font-medium">{c.contactUsername}</div>
//                                 <div className="text-xs text-gray-500">{c.contactPhone}</div>
//                             </div>
//                         </label>
//                     ))}
//                     {filtered.length === 0 && (
//                         <p className="text-sm text-gray-500">No contacts found.</p>
//                     )}
//                 </div>

//                 <div className="flex justify-end space-x-2">
//                     <button
//                         onClick={onClose}
//                         className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSend}
//                         disabled={selectedPhones.length === 0}
//                         className={`px-3 py-1 rounded ${selectedPhones.length === 0
//                             ? "bg-green-200 text-gray-500 cursor-not-allowed"
//                             : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
//                             }`}
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function ShareContactsModal({
//     isOpen,
//     onClose,
//     shareChat,   // { message: string, image: string | null }
//     socket,
// }) {
//     const [allContacts, setAllContacts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedPhones, setSelectedPhones] = useState([]);

//     // Load & merge saved + unknown contacts when modal opens
//     useEffect(() => {
//         if (!isOpen) return;

//         const loadContacts = async () => {
//             try {
//                 const owner = localStorage.getItem("username");

//                 // 1️⃣ Fetch saved + unknown contacts
//                 const { data: contactsData } = await axios.get(
//                     `http://localhost:5000/api/contacts?owner=${owner}`
//                 );
//                 const { contacts, unknownContacts } = contactsData;

//                 // 2️⃣ Fetch all registered users so we can pull profile pictures, etc.
//                 const { data: registerData } = await axios.get(
//                     "http://localhost:5000/api/register"
//                 );
//                 const { users: allUsers } = registerData;

//                 // Map phone → custom username
//                 const contactMap = {};
//                 contacts.forEach((c) => {
//                     contactMap[c.contactPhone] = c.contactUsername;
//                 });
//                 const saved = allUsers
//                     .filter((u) => contacts.map((c) => c.contactPhone).includes(u.phone))
//                     .map((u) => ({
//                         phone: u.phone,
//                         contactUsername: contactMap[u.phone],
//                         profilePicture: u.profilePicture || "/default-profile.png",
//                     }));

//                 // Unknown contacts: show default avatar
//                 const unknown = (unknownContacts || []).map((c) => ({
//                     phone: c.contactPhone,
//                     contactUsername: c.contactUsername,
//                     profilePicture: "/default-profile.png",
//                 }));

//                 // Merge, de-duplicate in original order
//                 const seen = new Set();
//                 const merged = [
//                     ...saved,
//                     ...unknown.filter((u) => {
//                         if (seen.has(u.phone)) return false;
//                         seen.add(u.phone);
//                         return !contacts.map((c) => c.contactPhone).includes(u.phone);
//                     }),
//                 ];

//                 setAllContacts(merged);
//                 setSearchTerm("");
//                 setSelectedPhones([]);
//             } catch (err) {
//                 console.error("Failed to load contacts:", err);
//             }
//         };

//         loadContacts();
//     }, [isOpen]);

//     if (!isOpen) return null;

//     // Filter by name or phone
//     const filtered = allContacts.filter(
//         (c) =>
//             c.contactUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             c.phone.includes(searchTerm)
//     );

//     const togglePhone = (phone) => {
//         setSelectedPhones((prev) =>
//             prev.includes(phone) ? prev.filter((p) => p !== phone) : [...prev, phone]
//         );
//     };

//     // Persist each shared chat via API, then emit socket event
//     const handleSend = async () => {
//         const owner = localStorage.getItem("username");
//         for (const phone of selectedPhones) {
//             try {
//                 // 1) Save to your sharedChatModel
//                 await axios.post("http://localhost:5000/api/chats", {
//                     sender: owner,
//                     receiver: phone,
//                     message: shareChat.message,
//                     image: shareChat.image,
//                 });
//                 // 2) Fire real-time update
//                 socket.emit("sendMessage", {
//                     sender: owner,
//                     receiver: phone,
//                     message: shareChat.message,
//                     image: shareChat.image,
//                 });
//             } catch (err) {
//                 console.error(`Failed to share chat to ${phone}:`, err);
//             }
//         }
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-90 max-w-lg max-h-[80vh] overflow-y-auto">
//                 <h2 className="text-lg font-semibold mb-4">Share with…</h2>

//                 <input
//                     type="text"
//                     placeholder="Search contacts"
//                     className="w-full mb-3 p-2 border rounded"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//                 <div className="space-y-2 mb-4">
//                     {filtered.length > 0 ? (
//                         filtered.map((c) => (
//                             <label
//                                 key={c.phone}
//                                 className="flex items-center justify-between hover:bg-gray-100 p-2 rounded cursor-pointer"
//                             >
//                                 {/* Left: avatar + name/phone */}
//                                 <div className="flex items-center space-x-3">
//                                     <img
//                                         src={`http://localhost:5000/${c.profilePicture}`}
//                                         alt="Profile"
//                                         className="h-8 w-8 rounded-full object-cover"
//                                     />
//                                     <div>
//                                         <div className="font-medium">{c.contactUsername}</div>
//                                         <div className="text-xs text-gray-500">{c.phone}</div>
//                                     </div>
//                                 </div>

//                                 {/* Right: checkbox */}
//                                 <input
//                                     type="checkbox"
//                                     className="h-4 w-4"
//                                     checked={selectedPhones.includes(c.phone)}
//                                     onChange={() => togglePhone(c.phone)}
//                                 />
//                             </label>
//                         ))
//                     ) : (
//                         <p className="text-sm text-gray-500">No contacts found.</p>
//                     )}
//                 </div>

//                 <div className="flex justify-end space-x-2">
//                     <button
//                         onClick={onClose}
//                         className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSend}
//                         disabled={selectedPhones.length === 0}
//                         className={`px-3 py-1 rounded ${selectedPhones.length === 0
//                                 ? "bg-green-200 text-gray-500 cursor-not-allowed"
//                                 : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
//                             }`}
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }




import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

export default function ShareContactsModal({
    isOpen,
    onClose,
    shareChat,   // { message: string, image: string | null }
    socket,
}) {
    const [allContacts, setAllContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPhones, setSelectedPhones] = useState([]);

    // Load & merge saved + unknown contacts when modal opens
    useEffect(() => {
        if (!isOpen) return;

        const loadContacts = async () => {
            try {
                const owner = localStorage.getItem("username");

                // 1️⃣ Fetch saved + unknown contacts
                const { data: contactsData } = await axios.get(
                    `http://localhost:5000/api/contacts?owner=${owner}`
                );
                const { contacts, unknownContacts } = contactsData;

                // 2️⃣ Fetch all registered users so we can pull profile pictures, etc.
                const { data: registerData } = await axios.get(
                    "http://localhost:5000/api/register"
                );
                const { users: allUsers } = registerData;

                // Map phone → custom username
                const contactMap = {};
                contacts.forEach((c) => {
                    contactMap[c.contactPhone] = c.contactUsername;
                });
                const saved = allUsers
                    .filter((u) => contacts.map((c) => c.contactPhone).includes(u.phone))
                    .map((u) => ({
                        phone: u.phone,
                        contactUsername: contactMap[u.phone],
                        profilePicture: u.profilePicture || "/default-profile.png",
                    }));

                // Unknown contacts: show default avatar
                const unknown = (unknownContacts || []).map((c) => ({
                    phone: c.contactPhone,
                    contactUsername: c.contactUsername,
                    profilePicture: "/default-profile.png",
                }));

                // Merge, de-duplicate in original order
                const seen = new Set();
                const merged = [
                    ...saved,
                    ...unknown.filter((u) => {
                        if (seen.has(u.phone)) return false;
                        seen.add(u.phone);
                        return !contacts.map((c) => c.contactPhone).includes(u.phone);
                    }),
                ];

                setAllContacts(merged);
                setSearchTerm("");
                setSelectedPhones([]);
            } catch (err) {
                console.error("Failed to load contacts:", err);
            }
        };

        loadContacts();
    }, [isOpen]);

    if (!isOpen) return null;

    // Filter by name or phone
    const filtered = allContacts.filter(
        (c) =>
            c.contactUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm)
    );

    const togglePhone = (phone) => {
        setSelectedPhones((prev) =>
            prev.includes(phone) ? prev.filter((p) => p !== phone) : [...prev, phone]
        );
    };

    // Persist each shared chat via API, then emit socket event
    const handleSend = async () => {
        const owner = localStorage.getItem("username");
        for (const phone of selectedPhones) {
            try {
                // 1) Save to your sharedChatModel
                await axios.post("http://localhost:5000/api/chats", {
                    sender: owner,
                    receiver: phone,
                    message: shareChat.message,
                    image: shareChat.image,
                });
                // 2) Fire real-time update
                socket.emit("sendMessage", {
                    sender: owner,
                    receiver: phone,
                    message: shareChat.message,
                    image: shareChat.image,
                });
            } catch (err) {
                console.error(`Failed to share chat to ${phone}:`, err);
            }
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="fixed bg-white rounded-lg p-6 w-90 max-w-lg h-[70vh] overflow-y-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                >
                    <AiOutlineClose size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Share with…</h2>

                <input
                    type="text"
                    placeholder="Search contacts"
                    className="w-full mb-3 p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {selectedPhones.length > 0 && <div className="flex justify-end space-x-2">
                    {/* <button
                        onClick={onClose}
                        className="w-90 px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button> */}
                    <button
                        onClick={handleSend}
                        disabled={selectedPhones.length === 0}
                        className={`w-90 px-3 py-1 rounded ${selectedPhones.length === 0
                            ? "bg-green-200 text-gray-500 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                            }`}
                    >
                        Send
                    </button>
                </div>}
                <div className="space-y-3 mb-4 mt-2 p-2 overflow-y-auto max-h-[50vh] [&::-webkit-scrollbar]:w-0.5
    [&::-webkit-scrollbar-track]:bg-gray-200
    [&::-webkit-scrollbar-thumb]:bg-green-50
    [&::-webkit-scrollbar-thumb]:rounded-full">
                    {filtered.length > 0 ? (
                        filtered.map((c) => (
                            <label
                                key={c.phone}
                                className="flex items-center justify-between hover:bg-gray-100 p-2 rounded cursor-pointer"
                            >
                                {/* Left: avatar + name/phone */}
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={`http://localhost:5000/${c.profilePicture}`}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="font-medium">{c.contactUsername}</div>
                                        <div className="text-xs text-gray-500">{c.phone}</div>
                                    </div>
                                </div>

                                {/* Right: checkbox */}
                                <input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    checked={selectedPhones.includes(c.phone)}
                                    onChange={() => togglePhone(c.phone)}
                                />
                            </label>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No contacts found.</p>
                    )}
                </div>

                {/* <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={selectedPhones.length === 0}
                        className={`px-3 py-1 rounded ${selectedPhones.length === 0
                                ? "bg-green-200 text-gray-500 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                            }`}
                    >
                        Send
                    </button>
                </div> */}
            </div>
        </div>
    );
}
