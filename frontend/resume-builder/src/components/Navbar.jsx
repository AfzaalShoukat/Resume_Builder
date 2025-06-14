import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import AboutSection from "../components/layouts/AboutSection";

const Navbar = ({ setOpenAuthModal, setCurrentPage }) => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateUser(null);         // Set user to null
    navigate("/");            // Redirect to landing page
  };

  return (
    <nav className="bg-gray-800 p-4 px-6 text-white flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">Resume Bulider</Link>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <a href="#about" className="hover:underline">About</a>
        <a href="#contact" className="hover:underline">Contact</a>

        {user ? (
          <>
            <span className="text-sm font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded-md text-white text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setCurrentPage("login");
              setOpenAuthModal(true);
            }}
            className="bg-purple-100 text-sm font-semibold text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Login / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
