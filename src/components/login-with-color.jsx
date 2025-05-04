return (
    <div className="bg-white flex justify-center items-center h-screen">
        <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Left Side: Image */}
            <div className="w-1/2 bg-gray-100 shadow-inner">
                <img
                    src="login.png"
                    alt="Login Illustration"
                    className="object-contain w-full h-full p-6"
                />
            </div>

            {/* Right Side: Login Form */}
            <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-inner">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

                    <div className="mb-4">
                        <label htmlFor="loginPhone" className="block text-sm font-medium text-gray-700">Enter phone number</label>
                        <input
                            type="text"
                            name="loginPhone"
                            id="loginPhone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoFocus
                            required
                        />
                    </div>

                    {!otpSent ? (
                        <div>
                            <button
                                onClick={sendOtp}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                            >
                                Send OTP
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mt-4">
                                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                                <input
                                    type="text"
                                    name="loginPassword"
                                    id="loginPassword"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={verifyOtp}
                                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </>
                    )}
                    <p className="text-sm text-gray-600 mt-4 text-center">
                        If you don't have an account{" "}
                        <a href="/register" className="text-blue-500 hover:underline">click here</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
);



























return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-900 flex justify-center items-center h-screen">
        <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Left Side: Image */}
            <div className="w-1/2 bg-cover bg-center"
            // style={{ backgroundImage: "url('login.png')" }}
            >
                <img
                    src="login.png"
                    alt="Login Illustration"
                    className="object-contain w-full h-full"
                />
            </div>

            {/* Right Side: Login Form */}
            <div className="w-1/2 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

                    <div className="mb-4">
                        <label htmlFor="loginPhone" className="block text-sm font-medium text-gray-700">Enter phone number</label>
                        <input
                            type="text"
                            name="loginPhone"
                            id="loginPhone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoFocus
                            required
                        />
                    </div>

                    {!otpSent ? (
                        <div>
                            <button
                                onClick={sendOtp}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                            >
                                Send OTP
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mt-4">
                                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                                <input
                                    type="text"
                                    name="loginPassword"
                                    id="loginPassword"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={verifyOtp}
                                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </>
                    )}
                    <p className="text-sm text-gray-600 mt-4 text-center">If you don't have an account <a href="/register" className="text-blue-500 hover:underline">click here</a></p>
                </div>
            </div>
        </div>
    </div>
);