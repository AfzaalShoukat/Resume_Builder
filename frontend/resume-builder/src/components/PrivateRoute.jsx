// import React, { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../context/userContext";

// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(UserContext);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     // Delay check just enough for context to populate
//     const timeout = setTimeout(() => {
//       setChecking(false);
//     }, 100); // 100ms buffer

//     return () => clearTimeout(timeout);
//   }, []);

//   // While context is still initializing
//   if (checking) return null;

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoute;
