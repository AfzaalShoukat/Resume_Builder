// ✅ App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import EditResume from "./pages/ResumeUpdate/EditResume";
import UserProvider from "./context/userContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

const App = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar
            setOpenAuthModal={setOpenAuthModal}
            setCurrentPage={setCurrentPage}
          />

          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage
                    setOpenAuthModal={setOpenAuthModal}
                    setCurrentPage={setCurrentPage}
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume/:resumeId" element={<EditResume />} />
            </Routes>
          </main>

          <Footer />

          <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />

          {/* Global Auth Modal */}
          <Modal
            isOpen={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
              setCurrentPage("login");
            }}
            hideHeader
          >
            <div>
              {currentPage === "login" && (
                <Login
                  setCurrentPage={setCurrentPage}
                  setOpenAuthModal={setOpenAuthModal}
                />
              )}
              {currentPage === "signup" && (
                <SignUp
                  setCurrentPage={setCurrentPage}
                  setOpenAuthModal={setOpenAuthModal}
                />
              )}
            </div>
          </Modal>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
