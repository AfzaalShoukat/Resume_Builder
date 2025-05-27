import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuCirclePlus } from "react-icons/lu";
import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/"); // 👈 redirect if not logged in
    }
  }, [user]);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <div className="pt-6 pb-10 px-4 md:px-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Resume Builder
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7">
        {/* Add New Resume Card */}
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
            <LuCirclePlus className="text-xl text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-800">Add New Resume</h3>
        </div>

        {/* Resume Cards */}
        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            imgUrl={resume?.thumbnailLink || null}
            title={resume.title}
            lastUpdated={
              resume?.updatedAt
                ? moment(resume.updatedAt).format("Do MMM YYYY")
                : ""
            }
            onSelect={() => navigate(`/resume/${resume?._id}`)}
          />
        ))}
      </div>

      {/* Resume Create Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateResumeForm />
      </Modal>
    </div>
  );
};

export default Dashboard;