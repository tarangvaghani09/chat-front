const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const registerSchema = new Schema({
  username: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: null },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String},
  expiresAt: { type: Date},
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

    // const token = jwt.sign({ id: user._id, phone: user.phone }, "secretkey", {
    //   expiresIn: "1h",
    // });

    // const newLogin = new Login({
    //   username,
    //   // password: user.password, // Note: Storing passwords in the login schema is not recommended for security reasons.
    //   ipAddress: req.ip,
    // });

    // await newLogin.save();

    res.json({
      message: "Login successful",
      // token,
      // user: { username: user.username, phone: user.phone },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




const { Server } = require("socket.io");
const Chat = require("./model/chat-model");
const twilio = require("twilio");
const Register = require("./model/register-model");
const jwt = require("jsonwebtoken");

const users = new Map();

// Twilio Config
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function configureSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("userConnected", (username) => {
      users.set(socket.id, username);
      io.emit("updateUserList", Array.from(users.values()));
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { message, sender, receiver, image } = data;

        if (!sender || !receiver) {
          console.error("Sender and receiver are required");
          return;
        }

        const chat = new Chat({ message, sender, receiver, image });
        await chat.save();

        io.emit("receiveMessage", chat);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("messageReceived", async ({ chatId }) => {
      await Chat.findByIdAndUpdate(chatId, { status: "received" });
      io.emit("messageStatusUpdate", { chatId, status: "received" });
    });

    socket.on("messageSeen", async ({ chatId }) => {
      await Chat.findByIdAndUpdate(chatId, { status: "seen" });
      io.emit("messageStatusUpdate", { chatId, status: "seen" });
    });

    socket.on("deleteMessage", async ({ id, user, deleteForBoth }) => {
      if (deleteForBoth) {
        await Chat.findByIdAndDelete(id);
      } else {
        await Chat.findByIdAndUpdate(id, { $push: { deletedBy: user } });
      }
      io.emit("messageDeleted", { id, user, deleteForBoth });
    });

      // Generate OTP and send via Twilio
      socket.on("requestOTP", async ({ phone }) => {
        try {
          const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  
          // Save OTP in database
          await Register.findOneAndUpdate(
            { phone },
            { otp: otpCode, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, // Expires in 5 mins
            { upsert: true, new: true }
          );
  
          // Send OTP via Twilio
          await twilioClient.messages.create({
            body: `Your OTP for login is: ${otpCode}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
          });
  
          socket.emit("otpSent", { success: true, message: "OTP sent successfully!" });
        } catch (error) {
          console.error("Error sending OTP:", error);
          socket.emit("otpSent", { success: false, message: "Failed to send OTP." });
        }
      });
  
      // Verify OTP
      socket.on("verifyOTP", async ({ phone, otp }) => {
        try {
            const user = await Register.findOne({ phone });
    
            if (!user || user.otp !== otp) {
                return socket.emit("otpVerification", { success: false });
            }
    
            // Generate JWT token
            const token = jwt.sign({ id: user._id, phone: user.phone }, "secretkey", { expiresIn: "1h" });
    
            socket.emit("otpVerification", {
                success: true,
                user: { phone: user.phone, username: user.username },
                token: token,
            });
        } catch (error) {
            console.error("Error verifying OTP:", error);
            socket.emit("otpVerification", { success: false });
        }
    });
    

    socket.on("disconnect", () => {
      users.delete(socket.id);
      io.emit("updateUserList", Array.from(users.values()));
      console.log("user disconnected");
    });
  });

  return io;
}

module.exports = configureSocket;





import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Login = () => {
    const [user, setUser] = useState({ phone: "", password: "", otp: "" });
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        socket.emit("requestOTP", { phone: user.phone });

        socket.on("otpSent", (data) => {
            if (data.success) {
                setOtpSent(true);
                alert("OTP sent to your phone!");
            } else {
                alert("Failed to send OTP.");
            }
        });
    };

    const handleVerifyOTP = () => {
        socket.emit("verifyOTP", { phone: user.phone, otp: user.otp });

        socket.on("otpVerification", (data) => {
            if (data.success) {
                localStorage.setItem("phone", data.user.phone);
                localStorage.setItem("username", data.user.username);
                localStorage.setItem("token", data.token);
                navigate("/chat");
            } else {
                alert("Invalid OTP!");
            }
        });
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" name="phone" placeholder="Phone" required onChange={handleInput} />
                <input type="password" name="password" placeholder="Password" required onChange={handleInput} />
                <button type="submit">Send OTP</button>
            </form>

            {otpSent && (
                <div>
                    <input type="text" name="otp" placeholder="Enter OTP" required onChange={handleInput} />
                    <button onClick={handleVerifyOTP}>Verify OTP</button>
                </div>
            )}
        </div>
    );
};

export default Login;




