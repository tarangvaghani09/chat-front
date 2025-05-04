import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    profilePicture: null,
    password: ""
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setUser({
        ...user,
        profilePicture: e.target.files[0]
      });
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('phone', user.phone);
      formData.append('profilePicture', user.profilePicture);
      formData.append('password', user.password);

      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        // Clear error if registration is successful and navigate to login page
        setError("");
        navigate("/login");
      } else {
        // Display error message returned from server
        setError(responseData.message);
      }
    } catch (error) {
      // In case of network or unexpected errors, show a generic error message
      setError("Registration failed. Please try again later.");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
        {/* Left Side: Image */}
        <div className="w-1/2 bg-gray-100 shadow-inner max-[500px]:hidden">
          <img
            src="register.png"  // Replace with the image URL if needed
            alt="Registration Illustration"
            className="object-contain w-full h-full p-6"
          />
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner max-[500px]:w-full">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Register</h1>

            {/* Display error message if exists */}
            {error && (
              <div className="mb-4 text-red-600 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Enter your Username</label>
                <input
                  type="text"
                  name='username'
                  id='username'
                  autoFocus
                  required
                  value={user.username}
                  onChange={handleInput}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Enter your Mobile</label>
                <input
                  type="text"
                  name='phone'
                  id='phone'
                  required
                  value={user.phone}
                  onChange={handleInput}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Upload your Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  id='profilePicture'
                  onChange={handleInput}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter your Password</label>
                <input
                  type="password"
                  name='password'
                  id='password'
                  required
                  value={user.password}
                  onChange={handleInput}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer'>
                  Register
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
