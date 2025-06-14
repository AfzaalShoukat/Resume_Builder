import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-16 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">About Resume Builder</h2>
        <p className="mb-4 text-base leading-relaxed">
          Resume Builder is a web-based application designed to help users create professional resumes
          easily and quickly. Whether you're a fresh graduate, a job seeker, or a working professional,
          this tool simplifies the resume creation process with clean templates and real-time previews.
        </p>
        <p className="mb-4 text-base leading-relaxed">
          Our builder features multiple customizable templates, intuitive form-based input, and a live
          preview that updates as you type. With support for PDF and image exports, Resume Builder is
          your one-stop solution for crafting resumes that stand out.
        </p>
        <p className="mb-4 text-base leading-relaxed">
          <strong>Tech Stack:</strong> React JS, Tailwind CSS, optional Node.js/FastAPI for backend,
          and Firebase/MongoDB for data handling.
        </p>
        <p className="text-base leading-relaxed">
          This project was developed as a Final Year Project to demonstrate practical skills in modern
          web development and UI/UX design, providing real-world value to job seekers and professionals.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
