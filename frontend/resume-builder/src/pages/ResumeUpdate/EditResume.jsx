import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import MinimalInputForm from "./Forms/MinimalInputForm"; 
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import { captureElementAsImage, dataURLtoFile, fixTailwindColors } from "../../utils/helper";
import ThemeSelector from "./ThemeSelector";
import Modal from "../../components/Modal";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("minimal-input");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
  });

  // Validate Inputs
  const validateAndNext = async () => {
    const errors = [];

    if (currentPage === "minimal-input") {
      const { fullName, designation } = resumeData.profileInfo;
      if (!fullName.trim()) errors.push("Full Name is required");
      if (!designation.trim()) errors.push("Job Title is required");
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    setErrorMsg("");

    if (currentPage === "minimal-input") {
      await generateResumeWithAI();
    } else {
      setOpenPreviewModal(true);
    }
  };

  // AI Generation Function
 const generateResumeWithAI = async () => {
  try {
    setIsLoading(true);
    const { fullName, designation, summary } = resumeData.profileInfo;

    const prompt = `Generate a professional resume for ${fullName}, a ${designation}. Use the following details: ${summary}. Include sections for contact information, work experience, education, skills, projects, certifications, languages, and interests. Format the response as a JSON object matching this structure: {
      "contactInfo": { "email": "", "phone": "", "location": "", "linkedin": "", "github": "", "website": "" },
      "workExperience": [{ "company": "", "role": "", "startDate": "", "endDate": "", "description": "" }],
      "education": [{ "degree": "", "institution": "", "startDate": "", "endDate": "" }],
      "skills": [{ "name": "", "progress": 0 }],
      "projects": [{ "title": "", "description": "", "github": "", "liveDemo": "" }],
      "certifications": [{ "title": "", "issuer": "", "year": "" }],
      "languages": [{ "name": "", "progress": 0 }],
      "interests": [""]
    }`;

    const response = await axiosInstance.post(
      "https://ai-model-henna.vercel.app/generate",
      { prompt },
      { headers: { "Content-Type": "application/json", accept: "application/json" } }
    );

    if (response.data.success) {
      let aiMessage = response.data.message.trim();

      // 🔍 Clean the ```json ... ``` fences
      if (aiMessage.startsWith("```json")) {
        aiMessage = aiMessage.replace(/^```json/, "").replace(/```$/, "").trim();
      }

      const aiGeneratedData = JSON.parse(aiMessage); // now safe
      setResumeData((prev) => ({
        ...prev,
        contactInfo: aiGeneratedData.contactInfo || prev.contactInfo,
        workExperience: aiGeneratedData.workExperience || prev.workExperience,
        education: aiGeneratedData.education || prev.education,
        skills: aiGeneratedData.skills || prev.skills,
        projects: aiGeneratedData.projects || prev.projects,
        certifications: aiGeneratedData.certifications || prev.certifications,
        languages: aiGeneratedData.languages || prev.languages,
        interests: aiGeneratedData.interests || prev.interests,
      }));
      setCurrentPage("preview");
      setProgress(100);
    } else {
      throw new Error("AI generation failed");
    }
  } catch (error) {
    console.error("Error generating resume with AI:", error);
    toast.error("Failed to generate resume with AI");
  } finally {
    setIsLoading(false);
  }
};


  // Navigation Functions
  const goToNextStep = () => {
    if (currentPage === "minimal-input") {
      validateAndNext();
    } else {
      setOpenPreviewModal(true);
    }
  };

  const goBack = () => {
    if (currentPage === "minimal-input") {
      navigate("/dashboard");
    } else {
      setCurrentPage("minimal-input");
      setProgress(0);
    }
  };

  // Render Form
  const renderForm = () => {
    switch (currentPage) {
      case "minimal-input":
        return (
          <MinimalInputForm
            profileData={resumeData.profileInfo}
            updateSection={(key, value) => updateSection("profileInfo", key, value)}
            onNext={validateAndNext}
          />
        );
      case "preview":
        return (
          <div className="p-5">
            <h3 className="text-lg font-semibold">Resume Preview</h3>
            <p className="text-sm text-gray-600">
              Review the AI-generated resume. You can save or download it.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Update Section
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Fetch, Upload, Delete, and Download Functions (Unchanged)
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
      if (response.data && response.data.profileInfo) {
        setResumeData((prevState) => ({
          ...prevState,
          title: response.data.title || "Untitled",
          template: response.data.template || prevState.template,
          profileInfo: response.data.profileInfo || prevState.profileInfo,
        }));
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);
      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementAsImage(resumeRef.current);
      const thumbnailFile = dataURLtoFile(imageDataUrl, `resume-${resumeId}.png`);
      const profileImageFile = resumeData.profileInfo.profileImg || null;

      const formData = new FormData();
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
      await updateResumeDetails(thumbnailLink, profilePreviewUrl);
      toast.success("Resume Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
        ...resumeData,
        thumbnailLink: thumbnailLink || "",
        profileInfo: {
          ...resumeData.profileInfo,
          profilePreviewUrl: profilePreviewUrl || "",
        },
      });
    } catch (err) {
      console.error("Error updating resume:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Resume Deleted Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting resume:", err);
      toast.error("Failed to delete resume");
    } finally {
      setIsLoading(false);
    }
  };

  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    if (resumeId) fetchResumeDetailsById();
    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) => setResumeData((prev) => ({ ...prev, title: value }))}
          />
          <div className="flex items-center gap-4">
            <button className="btn-small-light" onClick={() => setOpenThemeSelector(true)}>
              <LuPalette className="text-[16px]" />
              <span className="hidden md:block">Change Theme</span>
            </button>
            <button className="btn-small-light" onClick={handleDeleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">Delete</span>
            </button>
            <button className="btn-small-light" onClick={() => setOpenPreviewModal(true)}>
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={progress} />
            {renderForm()}
            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}
              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button className="btn-small-light" onClick={goBack} disabled={isLoading}>
                  <LuArrowLeft className="text-[16px]" />
                  Back
                </button>
                <button className="btn-small-light" onClick={uploadResumeImages} disabled={isLoading}>
                  <LuSave className="text-[16px]" />
                  {isLoading ? "Updating..." : "Save & Exit"}
                </button>
                <button className="btn-small" onClick={validateAndNext} disabled={isLoading}>
                  {currentPage === "preview" ? (
                    <LuDownload className="text-[16px]" />
                  ) : null}
                  {currentPage === "preview" ? "Preview & Download" : "Generate Resume"}
                  {currentPage !== "preview" && (
                    <LuArrowLeft className="text-[16px] rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div ref={resumeRef} className="h-[100vh]">
            <RenderResume
              templateId={resumeData.template.theme || ""}
              resumeData={resumeData}
              colorPalette={resumeData.template.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Change Theme"
      >
        <div className="w-[90vw] h-[80vh]">
          <ThemeSelector
            selectedTheme={resumeData.template}
            setSelectedTheme={(value) =>
              setResumeData((prev) => ({ ...prev, template: value || prev.template }))
            }
            resumeData={null}
            onClose={() => setOpenThemeSelector(false)}
          />
        </div>
      </Modal>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText="Download"
        actionBtnIcon={<LuDownload className="text-[16px]" />}
        onActionClick={() => reactToPrintFn()}
      >
        <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
          <RenderResume
            templateId={resumeData.template.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData.template.colorPalette || []}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default EditResume;