const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const registerSchema = new Schema({
  username: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: null },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const Register = model("Register", registerSchema);
module.exports = Register;



const login = async (req, res) => {
  try {
    const { username, phone, password } = req.body;
    const user = await Register.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, phone: user.phone }, "secretkey", {
      expiresIn: "1h",
    });

    // const newLogin = new Login({
    //   username,
    //   // password: user.password, // Note: Storing passwords in the login schema is not recommended for security reasons.
    //   ipAddress: req.ip,
    // });

    // await newLogin.save();

    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, phone: user.phone },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import '../App.css';

// const Login = () => {

//     const [user, setUser] = useState({
//         username: "",
//         phone: "",
//         password: ""
//     });

//     const navigate = useNavigate();

//     const handleInput = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;

//         setUser({
//             ...user,
//             [name]: value,
//         })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch("http://localhost:5000/api/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(user),
//             })
//             const res_data = await response.json();
//             console.log(res_data);
//             localStorage.setItem('username', res_data.user.phone);
//             localStorage.setItem('token', res_data.token);
//             if (response.ok) {
//                 navigate("/chat");
//             }
//         } catch (error) {
//             console.log("Login", error);
//         }
//     }

//     return (
//         <div className="bg-white flex justify-center items-center h-screen">
//             <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
//                 {/* Left Side: Image */}
//                 <div className="w-1/2 bg-gray-100 shadow-inner max-[500px]:hidden">
//                     <img
//                         src="login.png"
//                         alt="Login Illustration"
//                         className="object-contain w-full h-full p-6"
//                     />
//                 </div>

//                 {/* Right Side: Login Form */}
//                 <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner max-[500px]:w-full">
//                     <div className="w-full max-w-sm">
//                         <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

//                         <div className="mb-4">
//                             <label htmlFor="username" className="block text-sm font-medium text-gray-700">Enter your Username</label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 value={user.username}
//                                 onChange={handleInput}
//                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                 autoFocus
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Enter your Phone</label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 id="phone"
//                                 value={user.phone}
//                                 onChange={handleInput}
//                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Enter your Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 id="password"
//                                 value={user.password}
//                                 onChange={handleInput}
//                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <button
//                                 type="submit"
//                                 className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
//                                 onClick={handleSubmit}
//                             >
//                                 Login
//                             </button>
//                         </div>

//                         <p className="text-sm text-gray-600 mt-4 text-center">
//                             If you don't have an account{" "}
//                             <a href="/register" className="text-blue-500 hover:underline">click here</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




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






























// with otp











// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [phone, setPhone] = useState("");
//     const [otp, setOtp] = useState("");
//     const [otpSent, setOtpSent] = useState(false);
//     const navigate = useNavigate();

//     const sendOtp = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/api/send-otp", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ phone }),
//             });
//             const data = await response.json();
//             alert(data.message);
//             setOtpSent(true);
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//         }
//     };

//     const verifyOtp = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/api/verify-otp", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ phone, otp }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 console.log(data);
//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("username", data.user.phone.replace("+91", ""));
//                 localStorage.setItem("name", data.user.username);
//                 navigate("/chat");
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error("Error verifying OTP:", error);
//         }
//     };

//     return (
//         <div className="bg-white flex justify-center items-center h-screen">
//             <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
//                 {/* Left Side: Image */}
//                 <div className="w-1/2 bg-gray-100 shadow-inner max-[500px]:hidden">
//                     <img
//                         src="login.png"
//                         alt="Login Illustration"
//                         className="object-contain w-full h-full p-6"
//                     />
//                 </div>

//                 {/* Right Side: Login Form */}
//                 <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner max-[500px]:w-full">
//                     <div className="w-full max-w-sm">
//                         <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

//                         <div className="mb-4">
//                             <label htmlFor="loginPhone" className="block text-sm font-medium text-gray-700">Enter phone number</label>
//                             <input
//                                 type="text"
//                                 name="loginPhone"
//                                 id="loginPhone"
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)}
//                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                 autoFocus
//                                 required
//                             />
//                         </div>

//                         {!otpSent ? (
//                             <div>
//                                 <button
//                                     onClick={sendOtp}
//                                     className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
//                                 >
//                                     Send OTP
//                                 </button>
//                             </div>
//                         ) : (
//                             <>
//                                 <div className="mt-4">
//                                     <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Enter OTP</label>
//                                     <input
//                                         type="text"
//                                         name="loginPassword"
//                                         id="loginPassword"
//                                         value={otp}
//                                         onChange={(e) => setOtp(e.target.value)}
//                                         className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mt-6">
//                                     <button
//                                         onClick={verifyOtp}
//                                         className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
//                                     >
//                                         Verify OTP
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                         <p className="text-sm text-gray-600 mt-4 text-center">
//                             If you don't have an account{" "}
//                             <a href="/register" className="text-blue-500 hover:underline">click here</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

// };

// export default Login;