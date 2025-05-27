import TEMPLATE_ONE_IMG from "../assets/template-one.png"
import TEMPLATE_TWO_IMG from "../assets/template-two.png"
import TEMPLATE_THREE_IMG from "../assets/template-three.png"
import TEMPLATE_Fourth_IMG from "../assets/template 4.jpg"
import TEMPLATE_Five_IMG from "../assets/template5.jpg"



export const resumeTemplates = [
  {
    id: "01",
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: "themeOne",
  },
  {
    id: "02",
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: "themeTwo",
  },
  {
    id: "03",
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: "themeThree",
  },
  {
    id: "04",
    thumbnailImg: TEMPLATE_Fourth_IMG,
    colorPaletteCode: "themeOne",
  },
  {
    id: "05",
    thumbnailImg: TEMPLATE_Five_IMG,
    colorPaletteCode: "themeOne",
  },
]

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],

    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],

    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],

    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#a8d2f4", "#1E88E5", "#0D47A1"],

    // Professional resume color schemes for Template Four
    ["#f5f5f5", "#e0e0e0", "#c0c0c0", "#505050", "#333333"],
    ["#f8f9fa", "#e9ecef", "#dee2e6", "#495057", "#212529"],
    ["#f0f4f8", "#d9e2ec", "#bcccdc", "#486581", "#102a43"],

    // Modern color schemes for Template Five
    ["#4285F4", "#000000", "#333333", "#666666", "#EEEEEE"], // Google Blue
    ["#0077B5", "#000000", "#333333", "#666666", "#EEEEEE"], // LinkedIn Blue
    ["#EA4335", "#000000", "#333333", "#666666", "#EEEEEE"], // Google Red
    ["#34A853", "#000000", "#333333", "#666666", "#EEEEEE"], // Google Green
    ["#FBBC05", "#000000", "#333333", "#666666", "#EEEEEE"], // Google Yellow
    ["#6200EA", "#000000", "#333333", "#666666", "#EEEEEE"], // Deep Purple
    ["#00BCD4", "#000000", "#333333", "#666666", "#EEEEEE"], // Cyan
    ["#FF5722", "#000000", "#333333", "#666666", "#EEEEEE"], // Deep Orange
  ],
}

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    previewUrl: "",
    fullName: "John Doe",
    designation: "Senior Software Engineer",
    summary:
      "Exceeded annual performance targets by 25% through innovative solutions. Received Employee of the Year award for exceptional client satisfaction. Led cross-functional team that delivered project 2 weeks ahead of schedule.",
  },
  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    github: "https://github.com/timetoprogram",
    website: "https://timetoprogram.com",
  },
  workExperience: [
    {
      company: "Tech Solutions",
      role: "Senior Frontend Engineer",
      startDate: "2022-03",
      endDate: "2025-04",
      description:
        "Leading the frontend team to build scalable enterprise applications using React, Tailwind CSS, and TypeScript. Improved application performance by 40% through code optimization. Mentored junior developers and implemented best practices that reduced bug reports by 30%",
      accomplishments: [
        "Improved application performance by 40% through code optimization",
        "Led a team of 5 developers to deliver projects on time",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      company: "Coding Dev",
      role: "Full Stack Developer",
      startDate: "2020-01",
      endDate: "2022-02",
      description:
        "Worked on cross-functional teams developing full-stack solutions with React, Node.js, and MongoDB. Improved performance by 30% through code optimization. Built custom analytics dashboard that increased client retention by 25%. Implemented automated testing that reduced QA time by 40%",
    },
    {
      company: "Startup Company",
      role: "Junior Web Developer",
      startDate: "2018-06",
      endDate: "2019-12",
      description:
        "Built responsive websites for startups and small businesses. Maintained legacy code and collaborated with designers to enhance UX/UI. Created mobile-first design system that improved conversion rates by 15%. Optimized database queries resulting in 50% faster page load times",
    },
  ],
  education: [
    {
      degree: "M.Sc. Software Engineering",
      institution: "Tech University",
      startDate: "2021-08",
      endDate: "2023-06",
    },
    {
      degree: "B.Sc. Computer Science",
      institution: "State University",
      startDate: "2017-08",
      endDate: "2021-05",
    },
  ],
  skills: [
    { name: "JavaScript", progress: 95 },
    { name: "React", progress: 90 },
    { name: "Node.js", progress: 85 },
    { name: "TypeScript", progress: 80 },
    { name: "MongoDB", progress: 75 },
  ],
  projects: [
    {
      title: "Project Manager App",
      description:
        "A task and team management app built with MERN stack. Includes user roles, real-time notifications, and drag-and-drop task boards.",
      github: "https://github.com/timetoprogram/project-manager-app",
    },
    {
      title: "E-Commerce Platform",
      description:
        "An e-commerce site built with Next.js and Stripe integration. Supports cart, payments, order history, and admin dashboard.",
      liveDemo: "https://ecommerce-demo.timetoprogram.com",
    },
    {
      title: "Blog CMS",
      description:
        "A custom CMS for blogging using Express and React. Includes WYSIWYG editor, markdown support, and user management.",
      github: "https://github.com/timetoprogram/blog-cms",
      liveDemo: "https://blogcms.timetoprogram.dev",
    },
  ],
  certifications: [
    {
      title: "Full Stack Web Developer",
      issuer: "Udemy",
      year: "2023",
    },
    {
      title: "React Advanced Certification",
      issuer: "Coursera",
      year: "2022",
    },
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "Spanish", progress: 70 },
    { name: "French", progress: 40 },
  ],
  interests: ["Reading", "Open Source Contribution", "Hiking", "Photography", "Travel"],
  // Additional fields for Template Four
  dateOfBirth: "15.05.1990",
  nationality: "American",
  maritalStatus: "Single",
  applications: ["Microsoft Word", "Excel", "PowerPoint", "Outlook", "Project", "Access"],
  cadSkills: ["CATIA V4", "CATIA V5", "I-DEAS", "Pro-Engineer", "UNIGRAPHICS", "AutoCAD"],
  feaSkills: ["NASTRAN", "ANSYS", "ABAQUS", "FEMLAB", "HyperCrash"],
}
