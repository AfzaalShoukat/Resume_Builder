"use client"
import React, { useRef, useEffect, useState } from "react";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";
import { formatYearMonth } from "../../utils/helper";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => (
  <div className="relative w-fit mb-2.5">
    <span className="absolute bottom-0 left-0 w-full h-2" style={{ backgroundColor: color }}></span>
    <h2 className="relative text-sm font-bold">{text}</h2>
  </div>
);

const TemplateSix = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-4 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <Title text="Contact Info" color={themeColors[1]} />
          <div className="flex flex-col gap-2">
            <ContactInfo icon={null} iconBG={themeColors[2]} value={resumeData.contactInfo.location} />
            <ContactInfo icon={null} iconBG={themeColors[2]} value={resumeData.contactInfo.email} />
            <ContactInfo icon={null} iconBG={themeColors[2]} value={resumeData.contactInfo.phone} />
            {resumeData.contactInfo.linkedin && (
              <ContactInfo icon={null} iconBG={themeColors[2]} value={resumeData.contactInfo.linkedin} />
            )}
            {resumeData.contactInfo.github && (
              <ContactInfo icon={null} iconBG={themeColors[2]} value={resumeData.contactInfo.github} />
            )}
          </div>

          <div className="mt-6">
            <Title text="Education" color={themeColors[1]} />
            {resumeData.education.map((data, index) => (
              <EducationInfo
                key={`education_${index}`}
                degree={data.degree}
                institution={data.institution}
                duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
              />
            ))}
          </div>

          <div className="mt-6">
            <Title text="Languages" color={themeColors[1]} />
            <LanguageSection languages={resumeData.languages} accentColor={themeColors[3]} bgColor={themeColors[2]} />
          </div>
        </div>  

        <div className="col-span-6">
          <Title text="Summary" color={themeColors[1]} />
          <p className="text-sm mb-4">{resumeData.profileInfo.summary}</p>

          <div className="mt-4">
            <Title text="Work Experience" color={themeColors[1]} />
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
        </div>
      </div>

      {/* Page 2 */}
      <div className="mt-10 pt-10 border-t border-dashed border-gray-400">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Title text="Projects" color={themeColors[1]} />
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

          <div>
            <Title text="Skills" color={themeColors[1]} />
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />

            <div className="mt-6">
              <Title text="Certifications" color={themeColors[1]} />
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

            {resumeData.interests.length > 0 && resumeData.interests[0] !== "" && (
              <div className="mt-6">
                <Title text="Interests" color={themeColors[1]} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.interests.map((interest, index) => (
                    <span
                      key={`interest_${index}`}
                      className="text-xs font-medium py-1 px-3 rounded-lg"
                      style={{ backgroundColor: themeColors[2] }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSix;
