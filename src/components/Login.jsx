import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    password: ""
  });
  // Store error message as a string (null means no error)
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      
      if (response.ok) {
        // Successful login: clear error and store token/phone
        setError("");
        localStorage.setItem('username', res_data.user.phone);
        localStorage.setItem('token', res_data.token);
        navigate("/chat");
      } else {
        // If there is an error, display the message from backend
        setError(res_data.message);
      }
    } catch (error) {
      // Catch any other errors that might occur during the fetch
      setError("An error occurred while logging in. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
        {/* Left Side: Image */}
        <div className="w-1/2 bg-gray-100 shadow-inner max-[500px]:hidden">
          <img
            src="login.png"
            alt="Login Illustration"
            className="object-contain w-full h-full p-6"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner max-[500px]:w-full">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

            {/* Display error message if exists */}
            {error && (
              <div className="mb-4 text-red-600 text-center">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Enter your Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={handleInput}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInput}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-4 text-center">
              If you don't have an account{" "}
              <a href="/register" className="text-blue-500 hover:underline">click here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

