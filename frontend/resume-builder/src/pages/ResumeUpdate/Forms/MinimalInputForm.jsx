import React, { useState, useEffect, useRef } from "react";
import { LuImage, LuSparkles } from "react-icons/lu";
import axios from "axios";
import Tesseract from "tesseract.js";

const MinimalInputForm = ({ profileData, updateSection, onNext }) => {
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [ocrLoading, setOcrLoading] = useState(false);
  const recognitionRef = useRef(null);

  // Voice recognition setup
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setMicError("Speech recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setMicError("");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      updateSection("summary", (profileData.summary + " " + transcript).trim());
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "permission-denied") {
        setMicError("Microphone permission denied.");
      } else {
        setMicError("Speech recognition error: " + event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const handleVoiceInput = () => {
    if (micError) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error("Voice Input Error:", error);
        setMicError("Unable to start speech recognition.");
      }
    }
  };

  const generateSummaryWithAI = async () => {
    const { fullName, designation } = profileData;

    if (!fullName?.trim() || !designation?.trim()) {
      alert("Please enter Full Name and Job Title first.");
      return;
    }

    const prompt = `Generate a concise but rich professional summary for ${fullName}, who works as a ${designation}. The summary should highlight years of experience, key skills, achievements, technologies used, and career focus. It should be detailed enough so that it can be used as the base to generate a full resume. Write it in first-person tone, suitable for modern professional resumes. Keep it under 100 words.`;

    try {
      setLoadingSummary(true);
      const response = await axios.post("https://ai-model-henna.vercel.app/generate", {
        prompt,
      });

      if (response.data.success) {
        let summary = response.data.message.trim();
        if (summary.startsWith("```")) {
          summary = summary.replace(/^```[\w]*\n?/, "").replace(/```$/, "").trim();
        }
        updateSection("summary", summary);
      } else {
        throw new Error("AI generation failed.");
      }
    } catch (error) {
      console.error("AI Summary Error:", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleImageToText = (imageFile) => {
    if (!imageFile) return;
    setOcrLoading(true);

    Tesseract.recognize(imageFile, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        const prompt = `Extracted resume text: "${text}". Generate a professional summary from this information. Write it in first-person, under 100 words.`;
        return axios.post("https://ai-model-henna.vercel.app/generate", { prompt });
      })
      .then((response) => {
        if (response.data.success) {
          let summary = response.data.message.trim();
          if (summary.startsWith("```")) {
            summary = summary.replace(/^```[\w]*\n?/, "").replace(/```$/, "").trim();
          }
          updateSection("summary", summary);
        } else {
          alert("AI generation failed from image text.");
        }
      })
      .catch((err) => {
        console.error("OCR to AI Error:", err);
        alert("Failed to generate summary from image.");
      })
      .finally(() => setOcrLoading(false));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateSection("profileImg", file);
      handleImageToText(file);
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-lg font-semibold">Enter Basic Information</h3>
      <p className="text-sm text-gray-600 mb-4">
        Provide minimal details, and our AI will generate a complete resume for you.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={profileData.fullName}
            onChange={(e) => updateSection("fullName", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={profileData.designation}
            onChange={(e) => updateSection("designation", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            value={profileData.summary}
            onChange={(e) => updateSection("summary", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Briefly describe your experience or career goals."
            rows={4}
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Use AI, voice, or image to help build your professional summary.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleVoiceInput}
                className={`text-xs px-3 py-1 rounded-md flex items-center gap-1 ${
                  isListening ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                🎤 {isListening ? "Listening..." : "Voice Input"}
              </button>
              <button
                onClick={generateSummaryWithAI}
                disabled={loadingSummary}
                className={`text-xs flex items-center gap-1 px-3 py-1 rounded-md ${
                  loadingSummary
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                }`}
              >
                <LuSparkles className="text-sm" />
                {loadingSummary ? "Generating..." : "Use AI"}
              </button>
            </div>
          </div>
          {ocrLoading && <p className="text-xs text-blue-500 mt-1">⏳ Extracting text from image...</p>}
          {micError && <p className="text-xs text-red-500 mt-1">{micError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image with Text</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-img"
            />
            <label
              htmlFor="profile-img"
              className="cursor-pointer bg-purple-100 text-purple-600 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-purple-200"
            >
              <LuImage className="text-[16px]" />
              Upload Image
            </label>
            {profileData.profileImg && (
              <span className="ml-3 text-sm text-gray-600">{profileData.profileImg.name}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="btn-small" onClick={onNext}>
          Generate Resume
        </button>
      </div>
    </div>
  );
};

export default MinimalInputForm;