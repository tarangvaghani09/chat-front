const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const registerSchema = new Schema({
  username: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: null },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String }, // Store OTP temporarily
  otpExpires: { type: Date }, // OTP expiration time
});

const Register = model("Register", registerSchema);
module.exports = Register;



// Twilio Config
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

        // Ensure phone number starts with +91
    // if (!phone.startsWith("+91")) {
    //   phone = `+91${phone}`;
    // }
    const user = await Register.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate OTP
    // const otp = otpGenerator.generate(6, {
    //   upperCase: false,
    //   specialChars: false,
    // });

        // Remove +91 if present
        // if (phone.startsWith("+91")) {
        //   phone = phone.slice(3);
        // }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5-minute expiration
    await user.save();

    // Send OTP via Twilio SMS
    await client.messages.create({
      body: `Your OTP for login is: ${otp}. It is valid for 5 minutes.`,
      from: twilioPhone,
      to: phone,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await Register.findOne({ phone });
    console.log(user, phone, otp);

    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP after verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, phone: user.phone }, "secretkey", {
      expiresIn: "1h",
    });
    console.log(token);
    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, phone: user.phone },
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};


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


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const sendOtp = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
            });
            const data = await response.json();
            alert(data.message);
            setOtpSent(true);
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, otp }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.user.phone);
                localStorage.setItem("name", data.user.username);
                navigate("/chat");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            {!otpSent ? (
                <button onClick={sendOtp}>Send OTP</button>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}
        </div>
    );
};

export default Login;



router.route("/send-otp").post(chatcontrollers.sendOtp);

router.route("/verify-otp").post(chatcontrollers.verifyOtp);





localStorage.setItem("username", data.user.phone.replace("+91",""));
localStorage.setItem("username", data.user.phone.slice(3));





const sendOtp = async () => {
  try {
      const formattedPhone = formatPhoneNumber(phone);
      const response = await fetch("http://localhost:5000/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formattedPhone }),
      });
      const data = await response.json();
      alert(data.message);
      setOtpSent(true);
  } catch (error) {
      console.error("Error sending OTP:", error);
  }
};

const verifyOtp = async () => {
  try {
      const formattedPhone = formatPhoneNumber(phone);
      const response = await fetch("http://localhost:5000/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formattedPhone, otp }),
      });
      const data = await response.json();
      if (response.ok) {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.phone.replace("+91", ""));
          localStorage.setItem("name", data.user.username);
          navigate("/chat");
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error("Error verifying OTP:", error);
  }
};