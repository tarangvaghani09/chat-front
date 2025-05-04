// actions/chatAction.js
import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const fetchChats = () => async (dispatch) => {
//   try {
//     dispatch({ type: "FETCH_CHATS_REQUEST" });

//     const username = localStorage.getItem("username");
//     const { data } = await axios.get(`http://localhost:5000/api/chats/${username}`);

//     dispatch({
//       type: "FETCH_CHATS_SUCCESS",
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: "FETCH_CHATS_FAILURE",
//       payload: error.message,
//     });
//   }
// };

const getToken = () => localStorage.getItem("token");

export const fetchChats = (navigate) => async (dispatch) => {
  // const navigate = useNavigate();
  dispatch({ type: "LOADING" });
  try {
    const token = getToken();
    if (!token) {
      navigate("/");
      return;
    }

    // Check if the token is expired
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    if (Date.now() >= decodedToken.exp * 1000) {
      localStorage.removeItem("token"); // Clear expired token
      navigate("/"); // Redirect
      return;
    }

    const response = await axios.get("http://localhost:5000/api/getChats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "SET_CHATS", payload: response.data });
  } catch (error) {
    console.error("Error fetching chats:", error);
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || error.message,
    });
    // console.log("err",error.response.data.message);
  }
};

export const addChat = (chat) => async (dispatch) => {
  dispatch({ type: "LOADING" });
  try {
    console.log("Sending chat:", chat);
    const response = await axios.post("http://localhost:5000/api/chats", chat);
    console.log("Chat response:", response.data);
    dispatch({ type: "ADD_CHAT", payload: response.data });
  } catch (error) {
    console.error("Error adding chat:", error);
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// export const deleteChat = (id, user, deleteForBoth) => async (dispatch) => {
//   dispatch({ type: "LOADING" });
//   try {
//     await axios.post(`http://localhost:5000/api/chatsDelete/${id}`, {
//       user,
//       deleteForBoth,
//     });
//     dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
//   } catch (error) {
//     console.error("Error deleting chat:", error);
//     dispatch({
//       type: "ERROR",
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };


export const deleteChat = (id, user, deleteForBoth) => async (dispatch) => {
  dispatch({ type: "LOADING" });
  try {
    await axios.post(`http://localhost:5000/api/chatsDelete/${id}`, {
      user,
      deleteForBoth,
    });
    dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
  } catch (error) {
    console.error("Error deleting chat:", error);
    dispatch({
      type: "ERROR",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const toggleAiChat = (isOpen) => (dispatch) => {
  dispatch({ type: "TOGGLE_AI_CHAT", payload: isOpen });
};

export const toggleAnonymousChat = (isOpen) => (dispatch) => {
  dispatch({ type: "TOGGLE_ANONYMOUS_CHAT", payload: isOpen });
};

export const toggleTrendChat = (isOpen) => (dispatch) => {
  dispatch({ type: "TOGGLE_TREND_CHAT", payload: isOpen });
};

export const toggleAddContactChat = (isOpen) => (dispatch) => {
  dispatch({ type: "TOGGLE_ADDCONTACT_CHAT", payload: isOpen });
};

