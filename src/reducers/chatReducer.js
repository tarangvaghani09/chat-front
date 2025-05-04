// reducers/chatReducer.js
const initialState = {
  chats: [],
  loading: false,
  error: null,
  isAiChatOpen: false,
  isAnonymousChatOpen: false,
  isTrendChatOpen: false,
  isAddContactChatOpen: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: action.payload, loading: false, error: null };
    case "ADD_CHAT":
      return {
        ...state,
        chats: [...state.chats, action.payload],
        loading: false,
        error: null,
      };
    // case "DELETE_CHAT":
    //   return {
    //     ...state,
    //     chats: state.chats
    //       .map((chat) => {
    //         if (chat._id === action.payload.id) {
    //           if (action.payload.deleteForBoth) {
    //             return null; // Completely remove the chat
    //           } else {
    //             return {
    //               ...chat,
    //               deletedBy: [...chat.deletedBy, action.payload.user],
    //             };
    //           }
    //         }
    //         return chat;
    //       })
    //       .filter((chat) => chat !== null), // Filter out null values
    //     loading: false,
    //     error: null,
    //   };
    case "DELETE_CHAT":
      return {
        ...state,
        chats: state.chats.map((chat) => {
          if (chat._id === action.payload.id) {
            if (action.payload.deleteForBoth) {
              return {
                ...chat,
                deletedForEveryone: true,
              };
            } else {
              return {
                ...chat,
                deletedBy: [...(chat.deletedBy || []), action.payload.user],
              };
            }
          }
          return chat;
        }),
        loading: false,
        error: null,
      };
    case "UPDATE_CHAT_STATUS":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat._id === action.payload.chatId
            ? { ...chat, status: action.payload.status }
            : chat
        ),
        loading: false,
        error: null,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "TOGGLE_AI_CHAT":
      return { ...state, isAiChatOpen: action.payload };
    case "TOGGLE_ANONYMOUS_CHAT":
      return { ...state, isAnonymousChatOpen: action.payload };
    case "TOGGLE_TREND_CHAT":
      return { ...state, isTrendChatOpen: action.payload };
    case "TOGGLE_ADDCONTACT_CHAT":
      return { ...state, isAddContactChatOpen: action.payload };
      case "EDIT_CHAT":
        return {
          ...state,
          chats: state.chats.map((chat) =>
            chat._id === action.payload._id ? action.payload : chat
          ),
        };
      
    default:
      return state;
  }
};

export default chatReducer;
