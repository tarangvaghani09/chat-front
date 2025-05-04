// import React, { useRef, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const [videoEnded, setVideoEnded] = useState(false);

//   // Ensure the video plays when the component mounts
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play();
//       videoRef.current.onended = () => {
//         setVideoEnded(true);
//         // Reset the video state and show the poster image
//         if (videoRef.current) {
//           videoRef.current.pause(); // Pause the video
//           videoRef.current.currentTime = 1; // Reset to the beginning
//         }
//       };
//     }
//   }, []);

//   const handleGetStarted = () => {
//     // Add the animation class to the entire landing component
//     document.getElementById('landing').classList.add('animate-fullSwipeUp');
//     // Wait for the animation to finish before navigating
//     setTimeout(() => {
//       navigate('/login');
//     }, 800); // Duration matches the animation length
//   };

//   return (
//     <div id="landing" className="relative w-full h-screen flex items-center justify-center font-sans overflow-hidden">
//       <style>{`
//         .animate-fullSwipeUp {
//           animation: swipeUp 0.8s ease-in-out forwards;
//         }
//         @keyframes swipeUp {
//           0% {
//             transform: translateY(0);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100vh);
//             opacity: 0;
//           }
//         }
//         .landing-bg-gradient {
//           background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
//         }
//       `}</style>

//       {/* Video element as background */}
//       <div className="absolute inset-0 z-0">
//         <video
//           ref={videoRef}
//           src="landnext.mp4"
//           autoPlay
//           muted
//           playsInline
//           controls={false}
//           className="w-full h-full object-cover opacity-70"
//           poster="land.png"  // Fallback image
//         />
//       </div>

//       {/* Gradient overlay to ensure content is visible */}
//       <div className="absolute inset-0 z-0 landing-bg-gradient"></div>

//       {/* Content above the video */}
//       <div className="relative z-10 text-center text-white px-6 md:px-12">
//         <h1 className="text-5xl font-extrabold mb-6 tracking-wide leading-tight text-shadow-lg">
//           Your Security is Our Priority
//         </h1>
//         <p className="text-lg mb-8 font-medium text-shadow-md">
//           We ensure maximum protection of your data while you communicate freely.
//         </p>
//         <button
//           onClick={handleGetStarted}
//           className="px-10 py-4 bg-indigo-700 hover:bg-indigo-800 text-white text-xl font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 cursor-pointer"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;



import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const LandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  // Ensure the video plays when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.onended = () => {
        setVideoEnded(true);
        if (videoRef.current) {
          videoRef.current.pause(); // Pause the video
          videoRef.current.currentTime = 2; // Reset to the beginning
        }
      };
    }
  }, []);

  const handleGetStarted = () => {
    document.getElementById('landing').classList.add('animate-fullSwipeUp');
    setTimeout(() => {
      navigate('/login');
    }, 800); // Duration matches the animation length
  };

  return (
    <div id="landing" className="relative w-full h-screen flex items-center justify-center font-sans overflow-hidden">
      <style>{`
        .animate-fullSwipeUp {
          animation: swipeUp 0.8s ease-in-out forwards;
        }
        @keyframes swipeUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        .landing-bg-overlay {
          background: rgba(0, 0, 0, 0.6); /* Semi-transparent black overlay */
        }
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* Video element as background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="landnext.mp4"
          autoPlay
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover opacity-60"
          poster="land.png"  /* Initial poster image */
        />
      </div>

      {/* Gradient overlay to ensure content is visible */}
      <div className="absolute inset-0 z-10 landing-bg-overlay"></div>

      {/* Content above the video */}
      <div className="relative z-20 text-center text-white px-6 md:px-12">
        <h1 className="max-[500px]:text-3xl text-6xl font-extrabold mb-6 tracking-wide leading-tight text-shadow">
          Your Security is Our Priority
        </h1>
        <p className="max-[500px]:text-sm text-lg mb-8 font-medium text-shadow">
          We ensure maximum protection of your data while you communicate freely.
        </p>
        <button
          onClick={handleGetStarted}
          className="max-[500px]:px-5 max-[500px]:py-3 px-12 py-5 bg-indigo-700 hover:bg-indigo-800 text-white text-xl font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <div className='max-[500px]:text-sm flex gap-3 items-center'>Get Started <FaArrowRight /></div>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;



// import React, { useRef, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const [videoEnded, setVideoEnded] = useState(false);

//   // Ensure the video plays when the component mounts
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play();
//       videoRef.current.onended = () => {
//         setVideoEnded(true);
//         // Reset the video state and show the poster image
//         if (videoRef.current) {
//           videoRef.current.pause(); // Pause the video
//           videoRef.current.currentTime = 1; // Reset to the beginning
//           // videoRef.current.poster = "land.png"; // Set the poster image
//         }
//       };
//     }
//   }, []);

//   const handleGetStarted = () => {
//     // Add the animation class to the entire landing component
//     document.getElementById('landing').classList.add('animate-fullSwipeUp');
//     // Wait for the animation to finish before navigating
//     setTimeout(() => {
//       navigate('/login');
//     }, 800); // Duration matches the animation length
//   };

//   return (
//     <div id="landing" className="landing-bg flex flex-col md:flex-row justify-center items-center font-sans">
//       <style>{`
//         .animate-fullSwipeUp {
//           animation: swipeUp 0.8s ease-in-out forwards;
//         }
//         @keyframes swipeUp {
//           0% {
//             transform: translateY(0);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100vh);
//             opacity: 0;
//           }
//         }
//         .landing-bg {
//           background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
//           height: 100vh;
//         }
//       `}</style>

//       {/* Left side: Text content */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-10">
//         <h1 className="text-5xl font-extrabold mb-6 tracking-wide leading-tight text-gray-800">
//           Your Security is Our Priority
//         </h1>
//         <p className="text-lg mb-8 font-medium text-gray-600">
//           We ensure maximum protection of your data while you communicate freely.
//         </p>
//         <button
//           onClick={handleGetStarted}
//           className="px-10 py-4 bg-indigo-700 hover:bg-indigo-800 text-white text-xl font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 cursor-pointer"
//         >
//           Get Started
//         </button>
//       </div>

//       {/* Right side: Video */}
//       <div className="w-full md:w-1/2 flex justify-center items-center p-10">
//         <video
//           ref={videoRef}
//           src="landnext.mp4"
//           autoPlay
//           muted
//           playsInline
//           controls={false}
//           width={550}
//           poster="land.png"  /* Initial poster image */
//           className="max-w-full h-auto border-none outline-none rounded-2xl opacity-80"
//         />
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
