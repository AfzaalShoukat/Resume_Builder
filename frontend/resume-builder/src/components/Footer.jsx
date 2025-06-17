import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-400  text-white px-8 py-10 rounded-xl w-[95%] mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Services */}
        <div>
          <h6 className="font-bold text-3xl mb-4">SERVICES</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline text-2xl cursor-pointer">Resume Templates</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">AI Suggestions</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">PDF Export</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">Live Preview</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="font-bold text-3xl mb-4">COMPANY</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline text-2xl cursor-pointer">About us</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">Contact</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">Careers</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">Press</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="font-bold text-3xl mb-4">LEGAL</h6>
          <ul className="space-y-2">
            <li><a className="hover:underline text-2xl cursor-pointer">Terms of use</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">Privacy policy</a></li>
            <li><a className="hover:underline text-2xl cursor-pointer">Cookie policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xl text-black mt-15">
        Made with ❤️ by <span className="font-semibold text-white">Afzaal Shoukat & Rehan Akhtar</span> — © {new Date().getFullYear()} Resume Bulider
      </div>
    </footer>
  );
};

export default Footer;
