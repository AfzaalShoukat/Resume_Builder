import React from "react";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";
import TemplateFourth from "./TemplateFourth"; // ✅ Fixed typo from 'TempalteFourth'
import TemplateFIVE from "./TemplateFive";

const RenderResume = ({
  templateId,
  resumeData,
  colorPalette,
  containerWidth,
}) => {
  switch (templateId) {
    case "01":
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    case "02":
      return (
        <TemplateTwo
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    case "03":
      return (
        <TemplateThree
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    case "04":
      return (
        <TemplateFourth
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
          case "05":
      return (
        <TemplateFIVE
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
    default:
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPalette={colorPalette}
          containerWidth={containerWidth}
        />
      );
  }
};

export default RenderResume;
