import React, { useEffect, useRef, useState } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuGithub,
  LuUser,
  LuRss,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import { formatYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#FFF3E0", "#FFE0B2", "#FFB74D", "#FB8C00", "#E65100"];

const Title = ({ text, color }) => (
  <div className="relative w-fit mb-2.5">
    <span
      className="absolute bottom-0 left-0 w-full h-1"
      style={{ backgroundColor: color }}
    ></span>
    <h2 className="relative text-base font-semibold">{text}</h2>
  </div>
);

const TemplateSix = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(900);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-6 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex items-center gap-6">
          <div
            className="w-[90px] h-[90px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: themeColors[1] }}
          >
            {resumeData.profileInfo.profilePreviewUrl ? (
              <img
                src={resumeData.profileInfo.profilePreviewUrl}
                className="w-[80px] h-[80px] rounded-full"
              />
            ) : (
              <div
                className="text-4xl"
                style={{ color: themeColors[4] }}
              >
                <LuUser />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{resumeData.profileInfo.fullName}</h1>
            <p className="text-sm">{resumeData.profileInfo.designation}</p>
            <p className="text-xs text-gray-500">{resumeData.profileInfo.summary}</p>
          </div>
        </div>

        {/* Contact and Skills */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Title text="Contact" color={themeColors[3]} />
            <div className="flex flex-col gap-3">
              <ContactInfo icon={<LuMapPinHouse />} iconBG={themeColors[2]} value={resumeData.contactInfo.location} />
              <ContactInfo icon={<LuMail />} iconBG={themeColors[2]} value={resumeData.contactInfo.email} />
              <ContactInfo icon={<LuPhone />} iconBG={themeColors[2]} value={resumeData.contactInfo.phone} />
              {resumeData.contactInfo.linkedin && (
                <ContactInfo icon={<RiLinkedinLine />} iconBG={themeColors[2]} value={resumeData.contactInfo.linkedin} />
              )}
              {resumeData.contactInfo.github && (
                <ContactInfo icon={<LuGithub />} iconBG={themeColors[2]} value={resumeData.contactInfo.github} />
              )}
              <ContactInfo icon={<LuRss />} iconBG={themeColors[2]} value={resumeData.contactInfo.website} />
            </div>
          </div>

          <div>
            <Title text="Skills" color={themeColors[3]} />
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[4]}
              bgColor={themeColors[2]}
            />
          </div>
        </div>

        {/* Work, Projects, Education, etc. */}
        <div>
          <Title text="Work Experience" color={themeColors[3]} />
          {resumeData.workExperience.map((data, index) => (
            <WorkExperience
              key={`work_${index}`}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
              durationColor={themeColors[4]}
              description={data.description}
            />
          ))}
        </div>

        <div>
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Title text="Education" color={themeColors[3]} />
            {resumeData.education.map((edu, index) => (
              <EducationInfo
                key={`edu_${index}`}
                degree={edu.degree}
                institution={edu.institution}
                duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`}
              />
            ))}
          </div>

          <div>
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
        </div>

        <div>
          <Title text="Languages" color={themeColors[3]} />
          <LanguageSection
            languages={resumeData.languages}
            accentColor={themeColors[4]}
            bgColor={themeColors[2]}
          />
        </div>

        {resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
          <div>
            <Title text="Interests" color={themeColors[3]} />
            <div className="flex flex-wrap gap-2 mt-2">
              {resumeData.interests.map((interest, index) => (
                <div
                  key={`interest_${index}`}
                  className="text-xs py-1 px-3 rounded-md"
                  style={{ backgroundColor: themeColors[2] }}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSix;
