import React, { useState, useEffect, useRef } from 'react';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";

const Update = ({ imageUrl, username, phone, closeOverlay, onUpdateProfile }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newImage, setNewImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const storedUsername = localStorage.getItem('username');
  const imageContainerRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setRemoveImage(false); // Reset removeImage state
      onUpdateProfile(newUsername, file, false);
    }
  };

  const handleRemoveImage = () => {
    setRemoveImage(true);
    setNewImage(null);
    setShowOptions(false); // Hide options after removing image
    onUpdateProfile(newUsername, null, true);
  };

  const handleViewImage = () => {
    setShowFullImage(true);
    setShowOptions(false); // Hide options after viewing image
  };

  const handleFileInputClick = () => {
    document.getElementById('fileupload').click();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSaveUsername = () => {
    onUpdateProfile(newUsername, newImage, removeImage);
    setIsEditingUsername(false); // Exit edit mode
  };

  const handleClickOutside = (event) => {
    if (imageContainerRef.current && !imageContainerRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-[1000] cursor-pointer"
        onClick={closeOverlay}
      >
        <form
          className="overflow-y-auto bg-white p-5 rounded-lg shadow-md w-[350px] h-screen flex flex-col items-center absolute right-0 max-[500px]:w-screen"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute right-5 top-5" onClick={closeOverlay}>
            <AiOutlineClose size={20} />
          </div>
          <div className="relative" ref={imageContainerRef}>
            <img
              src={removeImage ? '' : (newImage ? URL.createObjectURL(newImage) : imageUrl)}
              alt="Profile"
              className="max-[668px]:w-[180px] max-[668px]:h-[180px] mb-12 w-[250px] h-[250px] rounded-full cursor-pointer object-cover"
              onClick={toggleOptions}
            />

            {showOptions && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-2.5 bg-white p-2 rounded shadow">
                <ul className="list-none p-0 m-0">
                  <li>
                    <div className="p-2 cursor-pointer hover:bg-gray-200" onClick={handleViewImage}>View Image</div>
                  </li>
                  {storedUsername === phone && (
                    <>
                      <li>
                        <div className="p-2 cursor-pointer hover:bg-gray-200" onClick={handleRemoveImage}>Remove Image</div>
                      </li>
                      <li>
                        <div className="p-2 cursor-pointer hover:bg-gray-200" onClick={handleFileInputClick}>Upload Image</div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          id="fileupload"
                          style={{ display: 'none' }}
                        />
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          {storedUsername === phone ? (
            <div className="max-[668px]:my-2 flex flex-col justify-center bg-gray-100 gap-5 p-2 rounded w-[210px] my-5">
              <label className="max-[668px]:text-sm text-gray-500">Your name</label>
              <div className="flex items-center justify-between">
                {isEditingUsername ? (
                  <>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="p-2 border border-gray-300 rounded flex-grow -ml-2"
                    />
                    <FaCheck onClick={handleSaveUsername} className="cursor-pointer ml-2 flex-none" />
                  </>
                ) : (
                  <>
                    <span>{newUsername}</span>
                    <FaPencilAlt onClick={() => setIsEditingUsername(true)} className="cursor-pointer ml-2" />
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="max-[668px]:my-2 flex flex-col justify-center gap-5 my-5">
              <label className="max-[668px]:text-sm text-gray-500">Username</label>
              <input
                type="text"
                value={username}
                readOnly
                className="max-[668px]:p-1 p-2 border border-gray-300 rounded"
              />
            </div>
          )}
          <div className="max-[668px]:my-2 flex flex-col justify-center gap-5 my-5">
            <label className="max-[668px]:text-sm text-gray-500">Phone</label>
            <input
              type="text"
              value={phone}
              readOnly
              className="max-[668px]:p-1 p-2 border border-gray-300 rounded"
            />
          </div>
        </form>
      </div>
      {showFullImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-[1000] cursor-pointer"
          onClick={() => setShowFullImage(false)}
        >
          <img
            src={newImage ? URL.createObjectURL(newImage) : imageUrl}
            alt="Full View"
            className="max-w-[90%] max-h-[90%] object-contain"
          />
          <div className="absolute right-5 top-5 text-white" onClick={closeOverlay}>
            <AiOutlineClose size={30} />
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
