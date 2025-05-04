// import jwt_decode from "jwt-decode";

// const CheckTokenExpiry = () => {
//   const token = localStorage.getItem("username");
//   if (token) {
//     const decoded = jwt_decode(token);
//     const currentTime = Date.now() / 1000; // Convert to seconds
//     if (decoded.exp < currentTime) {
//       localStorage.removeItem("username");
//       window.location.href = "/login"; // Redirect to login page
//     }
//   }
// };

// export default CheckTokenExpiry;
