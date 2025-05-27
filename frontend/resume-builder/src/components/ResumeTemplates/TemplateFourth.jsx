"use client"

import { useEffect, useRef, useState } from "react"
import { LuMapPinHouse, LuMail, LuPhone, LuRss, LuGithub, LuUser } from "react-icons/lu"
import { RiLinkedinLine } from "react-icons/ri"
import ContactInfo from "../ResumeSections/ContactInfo"
import EducationInfo from "../ResumeSections/EducationInfo"
import { formatYearMonth } from "../../utils/helper"
import LanguageSection from "../ResumeSections/LanguageSection"
import WorkExperience from "../ResumeSections/WorkExperience"
import ProjectInfo from "../ResumeSections/ProjectInfo"
import SkillSection from "../ResumeSections/SkillSection"
import CertificationInfo from "../ResumeSections/CertificationInfo"

const DEFAULT_THEME = ["#f5f5f5", "#e0e0e0", "#c0c0c0", "#505050", "#333333"]

const Title = ({ text, color }) => {
  return (
    <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ borderColor: color }}>
      {text}
    </h2>
  )
}

const SkillBar = ({ filled, color }) => {
  return (
    <div className="w-full flex gap-1">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="h-2 w-full"
          style={{
            backgroundColor: index < filled ? color : "#e0e0e0",
          }}
        ></div>
      ))}
    </div>
  )
}

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME

  const resumeRef = useRef(null)
  const [baseWidth, setBaseWidth] = useState(800) // Default value
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Calculate the scale factor based on the container width
    const actualBaseWidth = resumeRef.current.offsetWidth
    setBaseWidth(actualBaseWidth) // Get the actual base width
    setScale(containerWidth / baseWidth)
  }, [containerWidth])

  return (
    <div
      ref={resumeRef}
      className="p-8 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto", // Keep the original size so scaling works correctly
        height: "auto",
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: themeColors[4] }}>
            {resumeData.profileInfo.fullName}
          </h1>
          <h2 className="text-xl" style={{ color: themeColors[3] }}>
            {resumeData.profileInfo.designation}
          </h2>
          <p className="text-sm mt-2">
            {resumeData.contactInfo.location} {resumeData.contactInfo.phone} {resumeData.contactInfo.email}
          </p>
        </div>
        <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">
          {resumeData.profileInfo.profilePreviewUrl ? (
            <img
              src={resumeData.profileInfo.profilePreviewUrl || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-5xl"
              style={{ backgroundColor: themeColors[1], color: themeColors[4] }}
            >
              <LuUser />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-7">
          {/* Profile Section */}
          <div className="mb-6">
            <Title text="Profile" color={themeColors[3]} />
            <p className="text-sm">{resumeData.profileInfo.summary}</p>
          </div>

          {/* Work Experience Section */}
          <div className="mb-6">
            <Title text="Work experience" color={themeColors[3]} />
            {resumeData.workExperience.map((job, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={job.company}
                role={job.role}
                duration={`${formatYearMonth(job.startDate)} - ${formatYearMonth(job.endDate)}`}
                durationColor={themeColors[4]}
                description={job.description}
              />
            ))}
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <Title text="Education" color={themeColors[3]} />
            {resumeData.education.map((edu, index) => (
              <EducationInfo
                key={`education_${index}`}
                degree={edu.degree}
                institution={edu.institution}
                duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-5">
          {/* Details Section */}
          <div className="mb-6">
            <Title text="Details" color={themeColors[3]} />
            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Date of Birth:</span> {resumeData.dateOfBirth || "Not specified"}
              </p>
              <p>
                <span className="font-semibold">Nationality:</span> {resumeData.nationality || "Not specified"}
              </p>
              <p>
                <span className="font-semibold">Marital Status:</span> {resumeData.maritalStatus || "Not specified"}
              </p>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mb-6">
            <Title text="Contact" color={themeColors[3]} />
            <div className="flex flex-col gap-4">
              <ContactInfo icon={<LuMapPinHouse />} iconBG={themeColors[2]} value={resumeData.contactInfo.location} />

              <ContactInfo icon={<LuMail />} iconBG={themeColors[2]} value={resumeData.contactInfo.email} />

              <ContactInfo icon={<LuPhone />} iconBG={themeColors[2]} value={resumeData.contactInfo.phone} />

              {resumeData.contactInfo.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.linkedin}
                />
              )}

              {resumeData.contactInfo.github && (
                <ContactInfo icon={<LuGithub />} iconBG={themeColors[2]} value={resumeData.contactInfo.github} />
              )}

              {resumeData.contactInfo.website && (
                <ContactInfo icon={<LuRss />} iconBG={themeColors[2]} value={resumeData.contactInfo.website} />
              )}
            </div>
          </div>

          {/* Core Competencies Section */}
          <div className="mb-6">
            <Title text="Core Competencies" color={themeColors[3]} />
            <SkillSection skills={resumeData.skills} accentColor={themeColors[3]} bgColor={themeColors[2]} />
          </div>

          {/* Projects Section */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mb-6">
              <Title text="Projects" color={themeColors[3]} />
              {resumeData.projects.map((project, index) => (
                <ProjectInfo
                  key={`project_${index}`}
                  title={project.title}
                  description={project.description}
                  githubLink={project.github}
                  liveDemoUrl={project.liveDemo}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          )}

          {/* Certifications Section */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mb-6">
              <Title text="Certifications" color={themeColors[3]} />
              <div className="grid grid-cols-1 gap-2">
                {resumeData.certifications.map((cert, index) => (
                  <CertificationInfo
                    key={`cert_${index}`}
                    title={cert.title}
                    issuer={cert.issuer}
                    year={cert.year}
                    bgColor={themeColors[2]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {resumeData.languages && resumeData.languages.length > 0 && (
            <div className="mb-6">
              <Title text="Languages" color={themeColors[3]} />
              <LanguageSection languages={resumeData.languages} accentColor={themeColors[3]} bgColor={themeColors[2]} />
            </div>
          )}

          {/* Technical Skills Section */}
          {(resumeData.applications || resumeData.cadSkills || resumeData.feaSkills) && (
            <div className="mb-6">
              <Title text="Technical Skills" color={themeColors[3]} />

              {/* Applications */}
              {resumeData.applications && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-1">Applications</h3>
                  <SkillBar filled={8} color={themeColors[3]} />
                  <ul className="list-disc pl-5 text-sm mt-2">
                    {resumeData.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Computer-Aided Design */}
              {resumeData.cadSkills && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-1">Computer-Aided Design</h3>
                  <SkillBar filled={7} color={themeColors[3]} />
                  <ul className="list-disc pl-5 text-sm mt-2">
                    {resumeData.cadSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Finite Element Analysis */}
              {resumeData.feaSkills && (
                <div>
                  <h3 className="text-sm font-semibold mb-1">Finite Element Analysis</h3>
                  <SkillBar filled={9} color={themeColors[3]} />
                  <ul className="list-disc pl-5 text-sm mt-2">
                    {resumeData.feaSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateFour
