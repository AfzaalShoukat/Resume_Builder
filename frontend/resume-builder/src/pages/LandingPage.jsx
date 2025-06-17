import React, { useContext } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const LandingPage = ({ setOpenAuthModal, setCurrentPage }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCTA = () => {
    if (!user) {
      setCurrentPage("login");
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-full bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center mt-8">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#1189ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                Resume Effortlessly
              </span>
            </h1>
            <p className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#1189ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine mb-8">
              Craft a standout resume in minutes with our smart and intuitive resume builder.
            </p>
            <button
              className="bg-blue-400 text-2xl  font-semibold text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <img src={HERO_IMG} alt="Hero" className="w-full rounded-lg shadow-md" />
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
  <p>
    Update your resume sections with live preview and instant formatting.
  </p>
</div>

<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">Beautiful Templates</h3>
  <p>
    Choose from modern, professional templates that are easy to customize.
  </p>
</div>

<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
  <p>
    Download your resume instantly as a high-quality PDF with one click.
  </p>
</div>

<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">AI-Powered Builder</h3>
  <p>
    Create a professional resume in seconds with intelligent AI suggestions.
  </p>
</div>

<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">Auto Formatting</h3>
  <p>
    Say goodbye to alignment issues—our builder handles formatting for you.
  </p>
</div>

<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">Modern Templates</h3>
  <p>
    Choose from sleek, professional templates designed to impress recruiters.
  </p>
</div>

<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">Real-Time Editing</h3>
  <p>
    Edit your resume live and see changes update instantly with preview mode.
  </p>
</div>

<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">Smart Suggestions</h3>
  <p>
    Get role-specific suggestions for skills, summaries, and achievements.
  </p>
</div>
<div className="bg-gray-800 hover:bg-gray-900 p-6 rounded-xl shadow-sm transition-colors duration-300 text-white">
  <h3 className="text-lg font-semibold mb-3">AI-Powered Builder</h3>
  <p>
    Create a professional resume in seconds with intelligent AI suggestions.
  </p>
</div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
