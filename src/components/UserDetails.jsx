import React, { useState } from "react";
import Update from "./Update";
import { GoArrowLeft } from "react-icons/go";

const UserDetails = ({ user, closeOverlayProfile }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const storedUsername = localStorage.getItem("username");
  // Allow edit if the logged-in user's identifier (storedUsername) matches the profile's phone (as used in Update.jsx)
  const canEdit = user && storedUsername === user.phone;

  if (!user) return null;

  const handleUpdateProfile = async (newUsername, newImage, removeImage) => {
    const formData = new FormData();
    formData.append("username", user.username);
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
    // setShowUpdate(false);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-white flex flex-col justify-start items-center pt-12 z-[1000] cursor-pointer overflow-y-auto"
      // onClick={closeOverlayProfile}
      >
        <div className="absolute left-5 top-5" onClick={closeOverlayProfile}>
          <GoArrowLeft size={35} className="max-[668px]:size-8" />
        </div>
        <img
          src={`http://localhost:5000/${user.profilePicture}`}
          alt="Profile"
          className="max-[668px]:w-[160px] max-[668px]:h-[160px] w-[200px] h-[200px] rounded-full object-cover object-center mb-5"
        />
        <h2 className="max-[668px]:text-sm text-black">{user.username}</h2>
        <p className="max-[668px]:text-sm text-black mt-2">{user.phone}</p>
        {canEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing the overlay
              setShowUpdate(true);
            }}
            className="max-[668px]:px-2 max-[668px]:text-sm mt-4 px-4 py-2 mb-4 bg-blue-600 text-white rounded cursor-pointer"
          >
            Edit Profile
          </button>
        )}
      </div>
      {showUpdate && user && (
        <Update
          imageUrl={`http://localhost:5000/${user.profilePicture}`}
          username={user.username}
          phone={user.phone}
          closeOverlay={() => setShowUpdate(false)}
          //   onUpdateProfile={(newUsername, newImage, removeImage) => {
          // Here you can call your update API as needed.
          // For example, log the updated values and then close the update modal.
          // console.log("Updating profile with:", newUsername, newImage, removeImage);
          // After the update completes (or to trigger a refetch), you might update the displayed user details.
          // setShowUpdate(false);
          //   }}
          onUpdateProfile={handleUpdateProfile}

        />
      )}
    </>
  );
};

export default UserDetails;
