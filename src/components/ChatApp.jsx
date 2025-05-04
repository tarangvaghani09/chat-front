// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import UserList from './UserList';
// import Chat from './Chat';
// import { useSelector } from 'react-redux';
// import PromptAndResponseApp from './PromptAndResponseApp';

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//   };

//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

//   return (
//     <div className="chat-page-container flex h-screen bg-gray-50 overflow-hidden">
//       {/* On desktop OR when no chat is selected on mobile, show Sidebar */}
//       {(!isMobile || (isMobile && !selectedUser)) && (
//         <div className={`${isMobile ? "w-[20%]" : "w-[5%]"} border-r border-gray-300 overflow-y-auto`}>
//           <Sidebar />
//         </div>
//       )}

//       {isAiChatOpen ? (
//         // When AI chat is open, show PromptAndResponseApp overriding other views
//         <div className={`${isMobile ? "w-full" : "w-[95%]"} overflow-hidden bg-green-100`}>
//           <PromptAndResponseApp />
//         </div>
//       ) : (
//         <>
//           {isMobile ? (
//             // Mobile view: if no user selected, show UserList; if a user is selected, show Chat in full width
//             !selectedUser ? (
//               <div className="w-[80%]">
//                 <UserList onSelectUser={handleSelectUser} hideUserList={false} />
//               </div>
//             ) : (
//               <div className="w-full">
//                 <Chat selectedUser={selectedUser} onToggleUserList={(show) => {
//                   if (isMobile && show) setSelectedUser(null);
//                 }} />
//               </div>
//             )
//           ) : (
//             // Desktop view: show UserList and Chat side by side
//             <>
//               <div className="w-[20%] border-r border-gray-300 overflow-y-auto">
//                 <UserList onSelectUser={handleSelectUser} hideUserList={false} />
//               </div>
//               <div className="w-[75%] overflow-hidden">
//                 {selectedUser ? (
//                   <Chat selectedUser={selectedUser} onToggleUserList={() => {}} />
//                 ) : (
//                   <div className="bg-white default-image-container flex justify-center items-center h-full font-sans text-green-700 font-bold text-3xl">
//                     <p>Welcome to DeepChat</p>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatPage;




//not pass params phone


// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import UserList from './UserList';
// import Chat from './Chat';
// import { useSelector } from 'react-redux';
// import PromptAndResponseApp from './PromptAndResponseApp';
// import AnonymousChat from './AnonymousChat';
// import Trend from './Trend';
// import AddUser from './AddUser';

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//   };

//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
//   const isAnonymousChatOpen = useSelector((state) => state.chat.isAnonymousChatOpen);
//   const isTrendChatOpen = useSelector((state) => state.chat.isTrendChatOpen);
//   const isAddContactChatOpen = useSelector((state) => state.chat.isAddContactChatOpen);

//   return (
//     <div className="chat-page-container flex h-screen bg-gray-50 overflow-hidden">
//       {/* On desktop OR when no chat is selected on mobile, show Sidebar */}
//       {(!isMobile || (isMobile && !selectedUser)) && (
//         <div className={`${isMobile ? "w-[20%]" : "w-[5%]"} border-r border-gray-300 overflow-y-auto`}>
//           <Sidebar />
//         </div>
//       )}

//       {/* Conditionally render AnonymousChat or Trend based on the state */}
//       {isAnonymousChatOpen ? (
//         <div className="w-full flex justify-center items-center bg-gray-100">
//           <AnonymousChat />
//         </div>
//       ) : isTrendChatOpen ? (
//         <div className="w-full flex justify-center items-center bg-gray-100">
//           <Trend />
//         </div>
//       ) : isAddContactChatOpen ? (
//         <div className="w-full flex justify-center items-center bg-gray-100">
//           <AddUser />
//         </div>
//       ): (
//         <>
//           {isAiChatOpen ? (
//             // When AI chat is open, show PromptAndResponseApp overriding other views
//             <div className={`${isMobile ? "w-full" : "w-[95%]"} overflow-hidden bg-green-100`}>
//               <PromptAndResponseApp />
//             </div>
//           ) : (
//             <>
//               {isMobile ? (
//                 // Mobile view: if no user selected, show UserList; if a user is selected, show Chat in full width
//                 !selectedUser ? (
//                   <div className="w-[80%]">
//                     <UserList onSelectUser={handleSelectUser} hideUserList={false} />
//                   </div>
//                 ) : (
//                   <div className="w-full">
//                     <Chat selectedUser={selectedUser} onToggleUserList={(show) => {
//                       if (isMobile && show) setSelectedUser(null);
//                     }} />
//                   </div>
//                 )
//               ) : (
//                 // Desktop view: show UserList and Chat side by side
//                 <>
//                   <div className="w-[20%] border-r border-gray-300 overflow-y-auto">
//                     <UserList onSelectUser={handleSelectUser} hideUserList={false} />
//                   </div>
//                   <div className="w-[75%] overflow-hidden">
//                     {selectedUser ? (
//                       <Chat selectedUser={selectedUser} onToggleUserList={() => { }} />
//                     ) : (
//                       <div className="bg-white default-image-container flex justify-center items-center h-full font-sans text-green-700 font-bold text-3xl">
//                         <p>Welcome to DeepChat</p>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatPage;


//without close chat when unknown user sav edit delete


// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import UserList from './UserList';
// import Chat from './Chat';
// import { useSelector } from 'react-redux';
// import PromptAndResponseApp from './PromptAndResponseApp';
// import AnonymousChat from './AnonymousChat';
// import Trend from './Trend';
// import AddUser from './AddUser';
// import { useLocation } from 'react-router-dom';

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const location = useLocation();

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//   };

//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
//   const isAnonymousChatOpen = useSelector((state) => state.chat.isAnonymousChatOpen);
//   const isTrendChatOpen = useSelector((state) => state.chat.isTrendChatOpen);
//   const isAddContactChatOpen = useSelector((state) => state.chat.isAddContactChatOpen);

//   const queryParams = new URLSearchParams(location.search);
//   const phoneParam = queryParams.get('phone');

//   return (
//     <div className="chat-page-container flex h-screen bg-gray-50 overflow-hidden">
//       {/* On desktop OR when no chat is selected on mobile, show Sidebar */}
//       {(!isMobile || (isMobile && !selectedUser)) && (
//         <div className={`${isMobile ? "w-[20%]" : "w-[5%]"} border-r border-gray-300 overflow-y-auto`}>
//           <Sidebar />
//         </div>
//       )}

//       {/* Conditionally render AnonymousChat or Trend based on the state */}
//       {isAnonymousChatOpen ? (
//         <div className="w-full flex justify-center items-center bg-gray-100">
//           <AnonymousChat />
//         </div>
//       ) : isTrendChatOpen ? (
//         <div className="w-full flex justify-center items-center bg-gray-100">
//           <Trend />
//         </div>
//       ) : (isAddContactChatOpen || phoneParam) ? (
//         <div className="w-full flex justify-center items-center bg-gray-100">
//           <AddUser />
//         </div>
//       ) : (
//         <>
//           {isAiChatOpen ? (
//             // When AI chat is open, show PromptAndResponseApp overriding other views
//             <div className={`${isMobile ? "w-full" : "w-[95%]"} overflow-hidden bg-green-100`}>
//               <PromptAndResponseApp />
//             </div>
//           ) : (
//             <>
//               {isMobile ? (
//                 // Mobile view: if no user selected, show UserList; if a user is selected, show Chat in full width
//                 !selectedUser ? (
//                   <div className="w-[80%]">
//                     <UserList onSelectUser={handleSelectUser} hideUserList={false} />
//                   </div>
//                 ) : (
//                   <div className="w-full">
//                     <Chat selectedUser={selectedUser} onToggleUserList={(show) => {
//                       if (isMobile && show) setSelectedUser(null);
//                     }} />
//                   </div>
//                 )
//               ) : (
//                 // Desktop view: show UserList and Chat side by side
//                 <>
//                   <div className="w-[20%] border-r border-gray-300 overflow-y-auto">
//                     <UserList onSelectUser={handleSelectUser} hideUserList={false} />
//                   </div>
//                   <div className="w-[75%] overflow-hidden">
//                     {selectedUser ? (
//                       <Chat selectedUser={selectedUser} onToggleUserList={() => { }} />
//                     ) : (
//                       <div className="bg-white default-image-container flex justify-center items-center h-full font-sans text-green-700 font-bold text-3xl">
//                         <p>Welcome to DeepChat</p>
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatPage;




import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import UserList from './UserList';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import PromptAndResponseApp from './PromptAndResponseApp';
import AnonymousChat from './AnonymousChat';
import Trend from './Trend';
import AddUser from './AddUser';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
  const isAnonymousChatOpen = useSelector((state) => state.chat.isAnonymousChatOpen);
  const isTrendChatOpen = useSelector((state) => state.chat.isTrendChatOpen);
  const isAddContactChatOpen = useSelector((state) => state.chat.isAddContactChatOpen);

  const queryParams = new URLSearchParams(location.search);
  const phoneParam = queryParams.get('phone');


  // CLEAR chat when returning from AddUser (no phoneParam)
  useEffect(() => {
    if (!phoneParam) {
      setSelectedUser(null);
    }
  }, [phoneParam]);

  const handleClearChat = () => {
    setSelectedUser(null);
  };

  return (
    <div className="chat-page-container flex h-screen bg-gray-50 overflow-hidden">
      {/* On desktop OR when no chat is selected on mobile, show Sidebar */}
      {(!isMobile || (isMobile && !selectedUser)) && (
        <div className={`${isMobile ? "w-[20%]" : "w-[5%]"} border-r border-gray-300 overflow-y-auto`}>
          <Sidebar />
        </div>
      )}

      {/* Conditionally render AnonymousChat or Trend based on the state */}
      {isAnonymousChatOpen ? (
        <div className="w-full flex justify-center items-center bg-gray-100">
          <AnonymousChat />
        </div>
      ) : isTrendChatOpen ? (
        <div className="w-full flex justify-center items-center bg-gray-100">
          <Trend />
        </div>
      ) : (isAddContactChatOpen || phoneParam) ? (
        <div className="w-full flex justify-center items-center bg-gray-100">
          <AddUser onRemove={() => setSelectedUser(null)} />
        </div>
      ) : (
        <>
          {isAiChatOpen ? (
            // When AI chat is open, show PromptAndResponseApp overriding other views
            <div className={`${isMobile ? "w-full" : "w-[95%]"} overflow-hidden bg-green-100`}>
              <PromptAndResponseApp />
            </div>
          ) : (
            <>
              {isMobile ? (
                // Mobile view: if no user selected, show UserList; if a user is selected, show Chat in full width
                !selectedUser ? (
                  <div className="w-[80%]">
                    <UserList onSelectUser={handleSelectUser} hideUserList={false} />
                  </div>
                ) : (
                  <div className="w-full">
                    <Chat selectedUser={selectedUser} onToggleUserList={(show) => {
                      if (isMobile && show) setSelectedUser(null);
                    }} />
                  </div>
                )
              ) : (
                // Desktop view: show UserList and Chat side by side
                <>
                  <div className="w-[20%] border-r border-gray-300 overflow-y-auto">
                    <UserList onSelectUser={handleSelectUser} hideUserList={false} onClearChat={() => setSelectedUser(null)} />
                  </div>
                  <div className="w-[75%] overflow-hidden">
                    {selectedUser ? (
                      <Chat selectedUser={selectedUser} onToggleUserList={() => { }} />
                    ) : (
                      <div className="bg-white default-image-container flex justify-center items-center h-full font-sans text-green-700 font-bold text-3xl">
                        <p>Welcome to DeepChat</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChatPage;
