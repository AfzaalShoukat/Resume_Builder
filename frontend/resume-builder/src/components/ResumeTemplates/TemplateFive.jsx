"use client"

import { useEffect, useRef, useState } from "react"
import { formatYearMonth } from "../../utils/helper"

const DEFAULT_THEME = ["#4285F4", "#000000", "#333333", "#666666", "#EEEEEE"]

// Skill dots component for visual skill rating
const SkillDots = ({ level, maxLevel = 5, activeColor, inactiveColor }) => {
  return (
    <div className="flex gap-1">
      {[...Array(maxLevel)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: i < level ? activeColor : inactiveColor,
          }}
        />
      ))}
    </div>
  )
}

const TemplateFive = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME
  const primaryColor = themeColors[0]
  const secondaryColor = themeColors[1]
  const textColor = themeColors[2]
  const subtextColor = themeColors[3]
  const dividerColor = themeColors[4]

  const resumeRef = useRef(null)
  const [baseWidth, setBaseWidth] = useState(800)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Calculate the scale factor based on the container width
    const actualBaseWidth = resumeRef.current.offsetWidth
    setBaseWidth(actualBaseWidth)
    setScale(containerWidth / baseWidth)
  }, [containerWidth])

  // Calculate skill level (1-5) from progress percentage
  const getSkillLevel = (progress) => {
    return Math.ceil((progress / 100) * 5)
  }

  return (
    <div
      ref={resumeRef}
      className="p-8 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
        color: textColor,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-4xl font-bold">
            <span style={{ color: primaryColor }}>{resumeData.profileInfo.fullName.split(" ")[0]}</span>{" "}
            <span style={{ color: secondaryColor }}>
              {resumeData.profileInfo.fullName.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="uppercase text-sm tracking-wider mt-1" style={{ color: subtextColor }}>
            {resumeData.profileInfo.designation}
          </p>
        </div>
        <div className="text-right text-sm">
          <p>{resumeData.contactInfo.email}</p>
          <p>{resumeData.contactInfo.linkedin}</p>
          <p>{resumeData.contactInfo.phone}</p>
          <p>{resumeData.contactInfo.location}</p>
        </div>
      </div>

      <hr style={{ borderColor: dividerColor, borderWidth: "1px" }} />

      {/* Summary Section */}
      <div className="my-4">
        <h2 className="text-xl font-medium mb-2" style={{ color: primaryColor }}>
          {resumeData.profileInfo.designation} Summary
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          {resumeData.profileInfo.summary.split(". ").map((sentence, index) => {
            if (!sentence.trim()) return null
            return (
              <li key={index} className="text-sm">
                {sentence.trim().endsWith(".") ? sentence.trim() : `${sentence.trim()}.`}
              </li>
            )
          })}
        </ul>
      </div>

      <hr style={{ borderColor: dividerColor, borderWidth: "1px" }} />

      {/* Professional Experience */}
      <div className="my-4">
        <h2 className="text-xl font-medium mb-2" style={{ color: primaryColor }}>
          Professional Experience
        </h2>

        {resumeData.workExperience.map((job, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base">{job.role}</h3>
                <p className="text-sm" style={{ color: subtextColor }}>
                  {job.company}
                </p>
              </div>
              <p className="text-sm">
                {formatYearMonth(job.startDate)}-{formatYearMonth(job.endDate)}
              </p>
            </div>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {job.description.split(". ").map((bullet, i) => {
                if (!bullet.trim()) return null
                return (
                  <li key={i} className="text-sm">
                    {bullet.trim().endsWith(".") ? bullet.trim() : `${bullet.trim()}.`}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <hr style={{ borderColor: dividerColor, borderWidth: "1px" }} />

      {/* Education */}
      <div className="my-4">
        <h2 className="text-xl font-medium mb-2" style={{ color: primaryColor }}>
          Education
        </h2>

        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base">{edu.degree}</h3>
                <p className="text-sm" style={{ color: subtextColor }}>
                  {edu.institution}
                </p>
              </div>
              <p className="text-sm">
                {formatYearMonth(edu.startDate)}-{formatYearMonth(edu.endDate)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ borderColor: dividerColor, borderWidth: "1px" }} />

      {/* Skills and Interests in two columns */}
      <div className="grid grid-cols-2 gap-8 my-4">
        {/* Skills */}
        <div>
          <h2 className="text-xl font-medium mb-2" style={{ color: primaryColor }}>
            Skills
          </h2>
          <div className="grid grid-cols-1 gap-y-2">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <p className="text-sm">{skill.name}</p>
                <SkillDots
                  level={getSkillLevel(skill.progress)}
                  activeColor={primaryColor}
                  inactiveColor={dividerColor}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h2 className="text-xl font-medium mb-2" style={{ color: primaryColor }}>
            Interests
          </h2>
          <p className="text-sm">{resumeData.interests.filter(Boolean).join(", ")}</p>
        </div>
      </div>

      {/* Projects Section (if available) */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <>
          <hr style={{ borderColor: dividerColor, borderWidth: "1px" }} />
          <div className="my-4">
            <h2 className="text-xl font-medium mb-2" style={{ color: primaryColor }}>
              Projects
            </h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold text-base">{project.title}</h3>
                <p className="text-sm">{project.description}</p>
                {(project.github || project.liveDemo) && (
                  <div className="flex gap-4 mt-1 text-xs">
                    {project.github && (
                      <a href={project.github} style={{ color: primaryColor }} className="underline">
                        GitHub
                      </a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} style={{ color: primaryColor }} className="underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Certifications Section (if available) */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <>
          <hr style={{ borderColor: dividerColor, borderWidth: "1px" }} />
          <div className="my-4">
            <h2 className="text-xl font-medium mb-2" style={{ color: primaryColor }}>
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="font-bold text-sm">{cert.title}</h3>
                  <p className="text-xs" style={{ color: subtextColor }}>
                    {cert.issuer}, {cert.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TemplateFive
