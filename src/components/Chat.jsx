import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { FaPaperclip, FaCheck, FaCheckDouble, FaRupeeSign, FaArrowRight } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { fetchChats, deleteChat } from "../actions/chatAction";
import Update from "./Update";
import { useNavigate } from "react-router-dom";
import PromptAndResponseApp from "./PromptAndResponseApp";
import axios from "axios";
import ReactLoading from 'react-loading';
import { jsPDF } from "jspdf";
import { IoArrowBack, IoCheckmark } from "react-icons/io5";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { LuSendHorizontal } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import ShareContactsModal from "./ShareContactsModal";


const socket = io("http://localhost:5000");

const Chat = ({ selectedUser, onToggleUserList }) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [filteredChats, setFilteredChats] = useState([]);
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chat);
  const chatContainerRef = useRef(null);
  const imageInputRef = useRef(null);
  const deleteOptionsRef = useRef(null);
  const [showFullView, setShowFullView] = useState(false);
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);
  const [hideUserList, setHideUserList] = useState(false);
  // New state to toggle emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // Ref for emoji picker container
  const emojiPickerRef = useRef(null);
  // NEW: state to control the pop-up for unknown users
  const [showUnknownPopup, setShowUnknownPopup] = useState(false);

  // Determine if the selected user is unknown (for instance, if they have the default profile picture)
  const isUnknownUser = selectedUser && selectedUser.profilePicture === "/default-profile.png";

  const [isBlocked, setIsBlocked] = useState(false);

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFromDate, setExportFromDate] = useState("");
  const [exportToDate, setExportToDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const messageInputRef = useRef(null);


  const [editingMessage, setEditingMessage] = useState(null);

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareChat, setShareChat] = useState({ message: "", image: null });


  // When a new user is selected (from the merged contacts list), hide the user list
  // and show the unknown user pop-up if the user is not saved.
  useEffect(() => {
    setMessage("");
    setSelectedImage(null);
    setHideUserList(true);
    // NEW: If the selected user is unknown, show the pop-up; otherwise, hide it.
    if (isUnknownUser) {
      setShowUnknownPopup(true);
    } else {
      setShowUnknownPopup(false);
    }
  }, [selectedUser, isUnknownUser]);

  // Close emoji picker when clicking outside of it
  useEffect(() => {
    const handleClickOutsideEmoji = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutsideEmoji);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideEmoji);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEmoji);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    const fetchBlockStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/contacts/${selectedUser.phone}`);
        const data = await res.json();
        setIsBlocked(data.isBlocked);
      } catch (error) {
        console.error("Error fetching block status:", error);
      }
    };

    if (selectedUser) {
      fetchBlockStatus();
    }
  }, [selectedUser]);

  useEffect(() => {
    const fetchBlockStatus = async () => {
      try {
        // Fetch all contacts and unknown contacts for the owner
        const res = await fetch(`http://localhost:5000/api/contacts?owner=${localStorage.getItem("username")}`);
        const data = await res.json();

        // Find the selected user in either contacts or unknownContacts
        const contactInContacts = data.contacts.find(contact => contact.contactPhone === selectedUser.phone);
        const contactInUnknownContacts = data.unknownContacts.find(contact => contact.contactPhone === selectedUser.phone);

        // Set the block status based on whether the contact was found
        if (contactInContacts || contactInUnknownContacts) {
          setIsBlocked(contactInContacts ? contactInContacts.isBlocked : contactInUnknownContacts.isBlocked);
        }
      } catch (error) {
        console.error("Error fetching block status:", error);
      }
    };

    if (selectedUser) {
      fetchBlockStatus();
    }
  }, [selectedUser]);

  const handleBlockUser = async () => {
    try {
      await fetch("http://localhost:5000/api/block", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: localStorage.getItem("username"),
          contactPhone: selectedUser.phone,
        }),
      });
      setIsBlocked(true);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblockUser = async () => {
    try {
      await fetch("http://localhost:5000/api/unblock", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: localStorage.getItem("username"),
          contactPhone: selectedUser.phone,
        }),
      });
      setIsBlocked(false);
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      const razorpayScript = await loadRazorpayScript();
      if (!razorpayScript) {
        alert("Failed to load Razorpay. Please check your internet connection.");
        setIsPaying(false);
        return;
      }
      const { data } = await axios.post("http://localhost:5000/api/payment", {
        amount: 100,
      });
      const options = {
        key: "rzp_test_CJUUypRoLbw1c2",
        amount: data.order.amount,
        currency: "INR",
        name: "Chat App",
        description: "AI Chat Subscription",
        order_id: data.order.id,
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        theme: { color: "#3399cc" },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Try again.");
    } finally {
      setIsPaying(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openExportModal = () => setShowExportModal(true);
  const closeExportModal = () => {
    setShowExportModal(false);
    setExportFromDate("");
    setExportToDate("");
  };

  // Download only chats in the selected date range
  const handleExportDownload = async () => {
    if (!exportFromDate || !exportToDate) {
      alert("Please select both a start and end date.");
      return;
    }
    setIsExporting(true);
    try {
      await downloadChatHistory(exportFromDate, exportToDate);
      closeExportModal();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const stripEmojis = (text = "") =>
    text.replace(
      /[\p{Emoji_Presentation}\p{Extended_Pictographic}\u200d]/gu,
      ""
    );

  // Modified download function: takes optional from/to ISO dates
  const downloadChatHistory = async (fromDateISO, toDateISO) => {
    const storedUsername = localStorage.getItem("username");
    const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    let yOffset = 15;
    const pageWidth = doc.internal.pageSize.width;
    const maxBubbleWidth = pageWidth * 0.4;

    // Title
    doc.setFontSize(16);
    const title = `Chat with ${selectedUser.username}`;
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, yOffset);
    yOffset += 10;

    // Parse date inputs
    const from = new Date(fromDateISO);
    const to = new Date(toDateISO);
    // extend 'to' to end of day
    to.setHours(23, 59, 59, 999);

    // Filter messages by content + date range
    const validChats = filteredChats
      .filter((chat) => {
        const msg = (chat.message?.trim() || "");
        const hasText = Boolean(msg);
        const hasImage = chat.image && !isInvalidFile(chat.image);
        return hasText || hasImage;
      })
      .filter((chat) => {
        const chatDate = new Date(chat.timestamp);
        return chatDate >= from && chatDate <= to;
      });

    // Loop through filtered messages
    for (let idx = 0; idx < validChats.length; idx++) {
      const chat = validChats[idx];
      const raw = chat.message?.trim() || "";
      const msg = stripEmojis(raw);
      // const msg = chat.message?.trim() || "";
      const isSender = chat.sender === storedUsername;
      const xPos = isSender ? pageWidth - maxBubbleWidth - 10 : 10;

      // Draw text bubble
      if (msg) {
        doc.setFillColor(isSender ? 144 : 200, isSender ? 238 : 200, isSender ? 144 : 200);
        doc.setFontSize(12);

        const lines = doc.splitTextToSize(msg, maxBubbleWidth);
        const height = lines.length * 7;
        doc.roundedRect(xPos - 5, yOffset - 5, maxBubbleWidth + 10, height + 6, 3, 3, "F");
        doc.setTextColor(0, 0, 0);

        if (isSender) {
          doc.text(lines, xPos + maxBubbleWidth, yOffset, { align: "right" });
        } else {
          doc.text(lines, xPos, yOffset);
        }
        yOffset += height + 8;
      }

      // Draw image if present
      if (chat.image && !isInvalidFile(chat.image)) {
        try {
          const base64 = await getBase64FromURL(`http://localhost:5000/${chat.image}`);
          doc.addImage(base64, "JPEG", xPos, yOffset, 80, 60);
          yOffset += 70;
        } catch {
          doc.text("⚠️ Image failed to load", xPos, yOffset);
          yOffset += 10;
        }
      }

      // New page if needed
      if (yOffset > doc.internal.pageSize.height - 30 && idx < validChats.length - 1) {
        doc.addPage();
        yOffset = 15;
      }
    }

    doc.save(`Chat_${selectedUser.username}_${fromDateISO}_to_${toDateISO}.pdf`);
  };

  // Helpers to skip certain file types
  const isInvalidFile = (fileName) => {
    const badExt = [".pdf", ".mp4", ".avi", ".mov", ".mp3", ".wav"];
    return badExt.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const getBase64FromURL = async (url) => {
    const resp = await fetch(url);
    const blob = await resp.blob();
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onloadend = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(blob);
    });
  };

  const handleNavbarClick = () => {
    setShowFullView(true);
  };

  const closeOverlayMainImage = () => {
    setShowFullView(false);
  };

  const handleUpdateProfile = async (newUsername, newImage, removeImage) => {
    const formData = new FormData();
    formData.append("username", selectedUser.username);
    if (newUsername) formData.append("newUsername", newUsername);
    if (newImage) formData.append("profilePicture", newImage);
    if (removeImage) formData.append("removeProfilePicture", "true");
    try {
      const response = await fetch("http://localhost:5000/api/updateprofile", {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    // Emit to the server when the user is connected
    if (storedUsername) {
      socket.emit("userConnected", storedUsername);
    }

    // Fetch chat history for the current user
    dispatch(fetchChats(navigate));

    // Listen for new messages from the server
    socket.on("receiveMessage", (chat) => {
      chat.senderIsSelf = chat.sender === storedUsername;
      dispatch({ type: "ADD_CHAT", payload: chat });

      // Update message status to 'received' once it is received by the user
      socket.emit("messageReceived", { chatId: chat._id });
    });


    socket.on("messageEdited", (updatedChat) => {
      dispatch({ type: "EDIT_CHAT", payload: updatedChat });
    });


    // Listen for status updates (received or seen)
    socket.on("messageStatusUpdate", (statusUpdate) => {
      // Update the chat's status in Redux when received from the server
      console.log("Message status update received:", statusUpdate);
      dispatch({
        type: "UPDATE_CHAT_STATUS",
        payload: { chatId: statusUpdate.chatId, status: statusUpdate.status }
      });
    });

    // Handle message deletion
    socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
      if (deleteForBoth && user === storedUsername) {
        dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
      } else {
        dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageStatusUpdate");
      socket.off("messageDeleted");
      socket.off("messageEdited");
    };
  }, [dispatch, navigate]);

  const markMessagesAsSeen = () => {
    const loggedInUser = localStorage.getItem("username");

    // Loop through all chats and mark the ones received by the logged-in user as "seen"
    filteredChats.forEach((chat) => {
      if (chat.receiver === loggedInUser && chat.status !== "seen") {
        console.log("Emitting messageSeen with chatId:", chat._id);  // Debugging line
        socket.emit("messageSeen", { chatId: chat._id });
      }
    });
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;  // 10px tolerance

    // If scrolled to the bottom, mark all new messages as "seen"
    if (isAtBottom) {
      markMessagesAsSeen();
    }
  };

  useEffect(() => {
    // Attach the scroll event listener to the chat container
    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [filteredChats]);  // Run this effect whenever filteredChats change



  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username");

  //   if (storedUsername) {
  //     socket.emit("userConnected", storedUsername);
  //   }

  //   dispatch(fetchChats(navigate));

  //   // Listen for new messages from the server
  //   socket.on("receiveMessage", (chat) => {
  //     const currentUser = localStorage.getItem("username");

  //     // Only add the chat if the current user is the receiver and is not blocked
  //     if (chat.receiver === currentUser) {
  //       // Check if the receiver has blocked the sender
  //       const isBlocked = chats.some(
  //         (contact) => contact.contactPhone === chat.sender && contact.isBlocked
  //       );

  //       if (!isBlocked) {
  //         // Only add the chat if it's not blocked
  //         chat.senderIsSelf = chat.sender === currentUser;
  //         dispatch({ type: "ADD_CHAT", payload: chat });
  //       } else {
  //         console.log("Blocked message from", chat.sender); // Optionally log blocked messages
  //       }
  //     }
  //   });

  //   socket.on("messageDeleted", ({ id, user, deleteForBoth }) => {
  //     if (deleteForBoth && user === storedUsername) {
  //       dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
  //     } else {
  //       dispatch({ type: "DELETE_CHAT", payload: { id, user, deleteForBoth } });
  //     }
  //   });

  //   return () => {
  //     socket.off("receiveMessage");
  //     socket.off("messageDeleted");
  //   };
  // }, [dispatch, navigate]);


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const filtered = chats.filter(
      (chat) =>
        ((chat.sender === storedUsername && chat.receiver === selectedUser.phone) ||
          (chat.sender === selectedUser.phone && chat.receiver === storedUsername)) &&
        !(chat.deletedBy && chat.deletedBy.includes(storedUsername))
    );
    setFilteredChats(filtered);
    console.log(filtered);
  }, [chats, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [filteredChats]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const actualUsername = localStorage.getItem("username");
    const formData = new FormData();
    formData.append("message", message);
    formData.append("sender", actualUsername);
    formData.append("receiver", selectedUser.phone);
    if (selectedImage) formData.append("image", selectedImage);

    try {
      if (editingMessage) {
        // Editing an existing message
        await fetch(`http://localhost:5000/api/editChat/${editingMessage}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
      } else {
        // Sending new message
        const response = await fetch("http://localhost:5000/api/chats", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Message sent:", data);
      }

      setMessage("");
      setSelectedImage(null);
      setEditingMessage(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      scrollToBottom();
    } catch (error) {
      console.error("Error sending/editing message:", error.message);
    }
  };



  // const sendMessage = async () => {
  //   // const actualUsername = localStorage.getItem("username");
  //   // const formData = new FormData();
  //   // formData.append("message", message);
  //   // formData.append("sender", actualUsername);
  //   // formData.append("receiver", selectedUser.phone);
  //   // if (selectedImage) formData.append("image", selectedImage);
  //   // try {
  //   //   const response = await fetch("http://localhost:5000/api/chats", {
  //   //     method: "POST",
  //   //     body: formData,
  //   //   });
  //   // SOCKET save + reorder
  //   const sender = localStorage.getItem("username");
  //   const payload = { message, sender, receiver: selectedUser.phone, image: selectedImage };
  //   socket.emit("sendMessage", payload);
  //   // if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  //   // const data = await response.json();
  //   // console.log("Message sent:", data);
  //   setMessage("");
  //   setSelectedImage(null);
  //   if (imageInputRef.current) imageInputRef.current.value = "";
  //   scrollToBottom();
  //   // } catch (error) {
  //   // console.error("Error sending message:", error.message);
  //   // }
  // };

  const handleDelete = (id, deleteForBoth) => {
    socket.emit("deleteMessage", {
      id,
      user: localStorage.getItem("username"),
      deleteForBoth,
    });
    if (!deleteForBoth) {
      dispatch({ type: "DELETE_CHAT", payload: { id, user: localStorage.getItem("username"), deleteForBoth } });
    } else {
      dispatch(deleteChat(id, localStorage.getItem("username"), deleteForBoth));
    }
    setShowDeleteOptions(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) setMessage(`Image: ${file.name}`);
    messageInputRef.current?.focus();
  };

  const handleImageClick = (imageUrl) => {
    setOverlayImage(imageUrl);
  };

  const closeOverlay = () => {
    setOverlayImage(null);
  };

  const handleMessageClick = (chat) => {
    setSelectedMessageId(chat._id);
    setEditingMessage(null); // Reset editing
    setShowDeleteOptions(true);
  };


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (deleteOptionsRef.current && !deleteOptionsRef.current.contains(event.target)) {
        setShowDeleteOptions(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function truncateUsername(username) {
    return username.length > 80 ? `${username.slice(0, 80)}...` : username;
  }

  function truncateSenderMessage(username) {
    return username.length > 35 ? `${username.slice(0, 35)}...` : username;
  }

  // NOTE: useSelector below already exists in the file. (Keeping it as is.)
  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);

  const renderFileMessage = (chat) => {
    if (chat.image) {
      const loggedInUser = localStorage.getItem("username");
      const fileExtension = chat.image.split('.').pop();
      const isSender = chat.sender === loggedInUser;
      if (fileExtension === 'pdf') {
        return (
          <div className="mt-2">
            {isSender ? (
              <a
                href={`http://localhost:5000/${chat.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-end items-center mt-1 pr-2 gap-2 text-blue-600 underline"
              >
                View PDF
              </a>
            ) : (
              <a
                href={`http://localhost:5000/download/${chat.image}`}
                download
                rel="noopener noreferrer"
                className="flex justify-end items-center pt-1 pr-2 gap-2 text-blue-600 underline"
              >
                Download PDF
                <GoDownload size={20} />
              </a>
            )}
          </div>
        );
      } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
        return (
          <video src={`http://localhost:5000/${chat.image}`} controls className="max-w-full max-h-52 mt-2" />
        );
      } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
        return (
          <audio src={`http://localhost:5000/${chat.image}`} controls className="mt-2" />
        );
      } else {
        return (
          <>
            <img
              src={`http://localhost:5000/${chat.image}`}
              alt="Chat"
              className="max-w-full max-h-52 cursor-pointer mt-2 object-cover"
              onClick={() => handleImageClick(`http://localhost:5000/${chat.image}`)}
            />
            {isSender ? (
              <a
                href={`http://localhost:5000/${chat.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-end items-center pt-1 pr-2 gap-2 text-blue-600 underline"
              >
                {/* View Image */}
              </a>
            ) : (
              <a
                href={`http://localhost:5000/download/${chat.image}`}
                download
                className="flex justify-end items-center pt-1 pr-2 gap-2 text-blue-600 underline"
              >
                Download Image
                <GoDownload size={20} className="ml-2" />
              </a>
            )}
          </>
        );
      }
    }
    return null;
  };

  return (
    <div className={`w-full sm:w-[100%] h-[100%] p-0 border border-gray-300 rounded-lg bg-gray-100 bg-[url('/image.png')] bg-cover bg-center overflow-hidden relative transition-all duration-300 ${hideUserList ? "" : ""}`}>
      {/* Mobile back arrow to reopen user list */}
      <div className="md:hidden absolute top-2 left-2 z-20 max-[668px]:top-1 max-[668px]:left-1">
        <button
          onClick={() => {
            setHideUserList(false);
            if (onToggleUserList) onToggleUserList(true);
          }}
          className="bg-white text-black rounded-full hover:bg-blue-600 transition max-[668px]:p-1 max-[668px]:w-6 max-[668px]:h-6"
        >
          <IoArrowBack size={24} className="max-[668px]:w-4 max-[668px]:h-4" />
        </button>
      </div>

      {/* NEW: Unknown Contact Prompt Pop-up */}
      {showUnknownPopup && (
        <div className="absolute top-[50px] left-0 right-0 bg-yellow-200 border border-yellow-400 text-yellow-800 px-4 py-3 flex justify-between items-center z-40">
          <div>
            <p className="text-sm">
              Unknown User: {selectedUser.phone}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                // Redirect to AddUser page passing the contact number in the query string.
                // navigate(`/addUser?phone=${selectedUser.phone}`);
                navigate(`/chat?phone=${selectedUser.phone}`);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowUnknownPopup(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white text-sm px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {loading && <p className="p-2 text-center text-gray-600">Loading...</p>}
      {error && <p className="p-2 text-center text-red-600">Error: {error}</p>}
      <div className="flex flex-row justify-start items-center bg-white pb-1 pt-1 sm:pt-2 mt-[-5px] sm:pl-5 pl-3 absolute w-full sm:w-screen z-10 max-[668px]:py-2">
        <img
          onClick={handleNavbarClick}
          src={`http://localhost:5000/${selectedUser.profilePicture}`}
          alt="Profile"
          className="h-10 w-10 mr-3 sm:mr-5 rounded-full object-cover cursor-pointer max-[668px]:h-8 max-[668px]:w-8 max-[788px]:ml-5"
        />
        <div className="flex flex-row justify-between items-center w-full sm:w-[72.1vw] max-[668px]:justify-between">
          <h3
            onClick={handleNavbarClick}
            className="capitalize cursor-pointer text-sm sm:text-base max-[668px]:text-sm"
          >
            {truncateUsername(selectedUser.contactUsername ? selectedUser.contactUsername : selectedUser.username)}
          </h3>
          <div className="flex justify-end">
            {isBlocked ? (
              <button onClick={handleUnblockUser} className="bg-gray-100 text-black text-sm max-[668px]:text-xs py-2 max-[668px]:px-2 px-4 rounded-md cursor-pointer border-none transition duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 font-bold">
                Unblock
              </button>
            ) : (
              <button onClick={handleBlockUser} className="bg-gray-100 text-black text-sm max-[668px]:text-xs py-2 max-[668px]:px-2 px-4 rounded-md cursor-pointer border-none transition duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 font-bold">
                Block
              </button>
            )}
            <span className="flex items-center justify-center sm:w-[255px]">
              <button
                onClick={openExportModal}
                className="flex items-center gap-2 bg-white py-2 px-4 rounded-md hover:bg-gray-200 cursor-pointer"
              >
                <GoDownload />
                <span className="max-[668px]:text-xs text-sm cursor-pointer">Export Chat</span>
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="h-[60vh] sm:h-[70vh] md:h-[76vh] overflow-y-auto mb-5 flex flex-col pl-3 sm:pl-5 pr-1 mt-[60px] sm:mt-[70px]" ref={chatContainerRef}>
        {filteredChats.map((chat) => {
          const loggedInUser = localStorage.getItem("username");
          const isSender = chat.sender === loggedInUser;

          return (
            <div
              key={chat._id}
              // add both `relative` and `group` so children can respond to hover
              className={`
        group relative flex flex-col my-2.5 p-2.5 rounded-lg max-w-[70%] break-words
        ${isSender
                  ? "self-end bg-green-100 ml-auto mr-3 sm:mr-5"
                  : "self-start bg-gray-200 ml-2"}
      `}
            >
              {/* ▽ chevron */}
              <span
                onClick={() => handleMessageClick(chat)}
                className={`
          absolute top-1/2 transform -translate-y-1/2
          ${isSender
                    ? "absolute top-1/2 left-[-25px] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    : "absolute top-1/2 left-[-25px] transform -translate-y-1/2 text-gray-500 cursor-pointer"}
          text-gray-500 cursor-pointer
          opacity-0 group-hover:opacity-100
          transition-opacity
        `}
              >
                <RiArrowDownSLine size={25} />
              </span>

              {/* your message text + timestamp */}
              <p className="text-xs sm:text-sm">
                <span className="block max-w-[70vw] break-words">
                  {chat.deletedForEveryone ? (
                    chat.sender === loggedInUser ? (
                      <i className="text-gray-500">You deleted this message</i>
                    ) : (
                      <i className="text-gray-500">This message was deleted</i>
                    )
                  ) : (
                    chat.message
                  )}
                </span>

                <div className="flex justify-end items-center mt-1 text-xs text-gray-500">
                  <span>
                    {new Date(chat.timestamp).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                  {chat.edited && (
                    <span className="ml-2 text-[11px] text-gray-500 italic">edited</span>
                  )}
                </div>

              </p>

              {/* image/pdf/audio/video rendering */}
              {/* {renderFileMessage(chat)} */}

              {/* only show attachments if not deleted for everyone */}
              {!chat.deletedForEveryone && renderFileMessage(chat)}

              {/* status checks */}
              {isSender && (
                // bottom-1                  //below class
                <div className="absolute bottom-0 right-1">
                  {chat.status === "sent" && <FaCheck size={10} />}
                  {chat.status === "received" && <FaCheckDouble size={11} />}
                  {chat.status === "seen" && (
                    <FaCheckDouble className="text-blue-600" size={10} />
                  )}
                </div>
              )}

              {/* delete options */}
              {showDeleteOptions && selectedMessageId === chat._id && (
                <div
                  ref={deleteOptionsRef}
                  className={`
            flex flex-col absolute top-full py-1
            ${isSender ? "right-0" : "left-0"}
            bg-white border border-gray-300 rounded-lg
            z-50 mt-1 w-[150px]
          `}
                >
                  {!chat.deletedForEveryone && (
                    <button
                      onClick={() => {
                        setShareChat({ message: chat.message, image: chat.image });
                        setShowShareModal(true);
                        setShowDeleteOptions(false);
                      }}
                      className="px-3 py-1 text-left hover:bg-gray-100 text-xs cursor-pointer"
                    >
                      Share
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(chat._id, false)}
                    className="px-3 py-1 text-left hover:bg-gray-100 text-xs cursor-pointer"
                  >
                    Delete for You
                  </button>
                  {isSender && !chat.deletedForEveryone && (Date.now() - new Date(chat.timestamp)) < 60 * 60 * 1000 && (
                    <button
                      onClick={() => handleDelete(chat._id, true)}
                      className="px-3 py-1 text-left hover:bg-gray-100 text-xs cursor-pointer"
                    >
                      Delete for Everyone
                    </button>
                  )}
                  {/* NEW: Copy Message or Image */}
                  {!chat.deletedForEveryone && (

                    <button
                      onClick={async () => {
                        try {
                          if (chat.image) {
                            // fetch the actual image blob
                            const resp = await fetch(`http://localhost:5000/${chat.image}`);
                            const blob = await resp.blob();
                            // write it to the clipboard
                            await navigator.clipboard.write([
                              new window.ClipboardItem({ [blob.type]: blob })
                            ]);
                            alert("Image copied to clipboard");
                          } else {
                            // fallback: copy text
                            await navigator.clipboard.writeText(chat.message || "");
                            alert("Text copied to clipboard");
                          }
                        } catch (err) {
                          console.error("Copy failed:", err);
                          alert("Failed to copy");
                        } finally {
                          setShowDeleteOptions(false);
                        }
                      }}
                      className="px-3 py-1 text-left hover:bg-gray-100 text-xs cursor-pointer"
                    >
                      Copy
                    </button>
                  )}

                  {isSender && !chat.image && !chat.deletedForEveryone && (Date.now() - new Date(chat.timestamp)) < 30 * 60 * 1000 && (
                    <button
                      onClick={() => {
                        setMessage(chat.message);
                        setEditingMessage(chat._id);
                        setShowDeleteOptions(false);
                      }}
                      className="px-3 py-1 text-left hover:bg-gray-100 text-xs cursor-pointer"
                    >
                      Edit
                    </button>
                  )}


                </div>
              )}

            </div>
          );
        })}

      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // only send when there's text or an image
          if (message.trim() || selectedImage) {
            //  setShowEmojiPicker(!showEmojiPicker)
            sendMessage();
          }
        }}
        className="bg-white flex flex-row flex-wrap items-center p-2.5 absolute bottom-0 w-full sm:w-[100%]"
      >
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="text-black rounded-3xl mx-2.5 cursor-pointer max-[500px]:mx-0"
        >
          <HiOutlineEmojiHappy size={25} />
        </button>
        {/* Conditional Emoji Picker Panel */}
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-12 left-2 bg-white border border-gray-300 rounded p-1 flex gap-2">
            {["😀", "😃", "😊", "😄", "😁", "😆", "😅", "😂", "🤣", "😭", "😍", "🤩", "🤦‍♂️", "👌", "👍", "🙌"].map((emoji, index) => (
              <span
                key={index}
                onClick={() => {
                  setMessage(prev => prev + emoji);
                  //  setShowEmojiPicker(false);
                  messageInputRef.current?.focus();
                }}
                className="cursor-pointer"
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        <label
          htmlFor="file-upload"
          className="inline-block cursor-pointer p-2.5 text-black rounded-md mx-2 mr-5 max-[500px]:mx-1 max-[500px]:p-0 max-[500px]:mr-1"
        >
          <FaPaperclip size={20} />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*,audio/*,.pdf"
          onChange={handleImageChange}
          ref={imageInputRef}
          className="hidden"
        />
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2.5 border border-gray-300 rounded-lg text-sm min-w-0 max-[668px]:w-auto max-[459px]:w-[50px] "
        />
        {!editingMessage && <button
          type="button"
          onClick={handlePayment}
          disabled={isPaying}
          className="max-[668px]:text-xs ml-2.5 py-2.5 px-3 bg-blue-600 rounded-lg text-white cursor-pointer flex items-center max-[500px]:px-1.5 max-[500px]:ml-1"
        >
          {isPaying ? (
            <ReactLoading type="spin" color="white" height={16} width={14.5} />
          ) : (
            <FaRupeeSign />
          )}
        </button>}
        {editingMessage && (
          <button
            type="button"
            onClick={() => {
              setMessage('');  // Clear the message
              setEditingMessage(null);  // Exit editing mode
            }}
            className="text-black rounded-lg px-4 py-2 ml-2 cursor-pointer hover:bg-gray-200 transition duration-300"
          >
            <AiOutlineClose size={20} />

          </button>
        )}
        {editingMessage ? <button
          type="submit"
          disabled={!message.trim() && !selectedImage}
          className={`max-[500px]:px-1 max-[668px]:px-2.5 max-[500px]:mr-0 max-[500px]:ml-1.5 mr-4 ml-2.5 h-9 py-2 px-4 rounded-lg cursor-pointer flex items-center hover:bg-gray-200 transition duration-300 ${(!message.trim() && !selectedImage) ? " text-gray-400" : " text-black"}`}
        >
          {/* <span className="max-[668px]:text-xs"> */}
          <IoCheckmark size={20} />
          {/* </span> */}
        </button> : <button
          type="submit"
          disabled={!message.trim() && !selectedImage}
          className={`max-[500px]:px-1 max-[668px]:px-2.5 max-[500px]:mr-0 max-[500px]:ml-1.5 mr-4 ml-2.5 h-9 py-2 px-4 rounded-lg cursor-pointer flex items-center transition-colors duration-300 ${(!message.trim() && !selectedImage) ? "bg-green-200 text-gray-400" : "bg-green-600 text-white"}`}
        >
          <span className="max-[668px]:text-xs"><LuSendHorizontal /></span>
        </button>}
      </form>

      {overlayImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50 cursor-pointer" onClick={closeOverlay}>
          <img src={overlayImage} alt="Full View" className="max-w-[90%] max-h-[90%] object-contain" />
          <div className="absolute right-5 top-5 text-white" onClick={closeOverlay}>
            <AiOutlineClose size={30} />
          </div>
        </div>
      )}


      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col">
                From:
                <input
                  type="date"
                  value={exportFromDate}
                  onChange={(e) => setExportFromDate(e.target.value)}
                  className="mt-1 p-2 border rounded cursor-pointer"
                />
              </label>

              {/* <label className="flex flex-col">
                To:
                <input
                  type="date"
                  value={exportToDate}
                  onChange={(e) => setExportToDate(e.target.value)}
                  className="mt-1 p-2 border rounded cursor-pointer"
                />
              </label> */}

              <label className="flex flex-col">
                To:
                <input
                  type="date"
                  value={exportToDate}
                  onChange={(e) => setExportToDate(e.target.value)}
                  className="mt-1 p-2 border rounded cursor-pointer"
                  max={new Date().toISOString().split('T')[0]}  // Sets the "To" date picker to today's date
                />
              </label>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={closeExportModal}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportDownload}
                  disabled={isExporting}
                  className={`px-4 py-2 rounded ${isExporting
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    } flex items-center justify-center`}
                >
                  {isExporting ? (
                    <ReactLoading type="spin" height={20} width={20} />
                  ) : (
                    "Download"
                  )}
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
      {showFullView && (
        <Update
          imageUrl={`http://localhost:5000/${selectedUser.profilePicture}`}
          username={selectedUser.contactUsername ? selectedUser.contactUsername : selectedUser.username}
          phone={selectedUser.phone}
          closeOverlay={closeOverlayMainImage}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
      <ShareContactsModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareChat={shareChat}
        socket={socket}
      />
    </div>
  );
};

export default Chat;




