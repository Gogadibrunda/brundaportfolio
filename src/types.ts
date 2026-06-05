export interface Project {
  id: string;
  title: string;
  duration: string;
  role: string;
  description: string;
  features: string[];
  tech: string[];
  category: "all" | "ML" | "Python" | "Web";
  demoUrl?: string;
  githubUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  cgpa?: string;
  percentage?: string;
  duration: string;
  details: string;
}

export interface SkillCategory {
  title: string;
  items: { name: string; level: number }[]; // level 0-100 for progress bar
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  iconType: "school" | "college" | "work" | "future";
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "diabetes-prediction",
    title: "Prediction of Diabetics",
    duration: "2 Months",
    role: "Individual Project",
    description: "Developed a Machine Learning model to predict diabetes using medical diagnostic datasets.",
    features: ["Data Preprocessing", "Feature Selection", "Classification Models", "Performance Evaluation"],
    tech: ["Machine Learning", "Python", "Pandas", "Scikit-Learn"],
    category: "ML"
  },
  {
    id: "banking-system",
    title: "Banking System",
    duration: "1 Month",
    role: "Individual Project",
    description: "A secure terminal banking simulator handling core user finance operations securely.",
    features: ["Deposit System", "Instant Withdraw", "Balance Inquiry", "Transaction Management"],
    tech: ["Python", "File Handling", "Data Stream Logging"],
    category: "Python"
  },
  {
    id: "school-management",
    title: "School Management System",
    duration: "1.5 Months",
    role: "Key Developer",
    description: "Full-scale administrative database interface to manage academic records.",
    features: ["Student Records Management", "Attendance Tracking", "Marks Management", "Fee Tracking & Alert System"],
    tech: ["Python", "MySQL", "Relational Database Design"],
    category: "Python"
  },
  {
    id: "expense-tracker",
    title: "Personal Expense Tracker",
    duration: "1 Month",
    role: "Individual Project",
    description: "Console-based analytics application and budget management logger.",
    features: ["Expense Logging", "Budget Cap Analysis", "Monthly Spend Reports", "ASCII Data Visualization"],
    tech: ["Python", "Data Structure Serialization"],
    category: "Python"
  },
  {
    id: "tambola-game",
    title: "Tambola Game Canvas",
    duration: "1 Month",
    role: "Developer",
    description: "Digital version of the popular Tambola (90-Ball Bingo) board game.",
    features: ["Random Number Generation", "Ticket Ticket Verification", "Automated Winning Pattern Detection"],
    tech: ["Python", "Random Libraries", "Boolean Grid Matching"],
    category: "Python"
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Web Platform",
    duration: "2 Months",
    role: "Lead Frontend Developer",
    description: "Dynamic product store featuring cart verification and modern user interfaces.",
    features: ["Interactive Product Listing", "E-Cart Integration", "Secure User Authentication", "Order Processing Mockup"],
    tech: ["HTML", "CSS", "JavaScript", "MySQL"],
    category: "Web"
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelor of Technology in Computer Science Engineering",
    institution: "Madanapalle Institute of Technology & Science",
    cgpa: "9.3",
    duration: "2023 - Present",
    details: "Focusing on Artificial Intelligence, Machine Learning, Operating Systems, Relational Databases, and Cloud Computing."
  },
  {
    degree: "Intermediate Education (MPC)",
    institution: "Sri Chaitanya Junior College",
    percentage: "97.5%",
    duration: "2021 - 2023",
    details: "Rigorous training in Mathematics, Physics, and Chemistry. High scholastic distinction."
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Sri Chaitanya Techno School",
    percentage: "97%",
    duration: "2020 - 2021",
    details: "Early scholastic academic excellence with school-level medals."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    items: [
      { name: "Python", level: 95 },
      { name: "C Language", level: 88 },
      { name: "Java (Basic)", level: 65 }
    ]
  },
  {
    title: "Databases & Cloud",
    items: [
      { name: "MySQL", level: 90 },
      { name: "Cloud Computing Fundamentals", level: 82 }
    ]
  },
  {
    title: "Web Technologies",
    items: [
      { name: "HTML5 / CSS3", level: 92 },
      { name: "JavaScript", level: 85 },
      { name: "Frontend Development (React, Tailwind)", level: 80 }
    ]
  },
  {
    title: "Tools & Collaboration",
    items: [
      { name: "VS Code", level: 95 },
      { name: "Git", level: 88 },
      { name: "GitHub Collaboration", level: 90 }
    ]
  },
  {
    title: "Soft Skills",
    items: [
      { name: "Team Leadership", level: 90 },
      { name: "Outstanding Communication", level: 95 },
      { name: "Management Coordinator", level: 85 },
      { name: "Decision Making & Ethics", level: 88 },
      { name: "Public Speaking", level: 92 }
    ]
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2018 - 2021",
    title: "SSC Graduation",
    subtitle: "Sri Chaitanya Techno School - 97%",
    iconType: "school"
  },
  {
    year: "2021 - 2023",
    title: "Intermediate (MPC)",
    subtitle: "Sri Chaitanya Junior College - 97.5%",
    iconType: "college"
  },
  {
    year: "2023 - Present",
    title: "B.Tech in Computer Science",
    subtitle: "Madanapalle Institute - 9.3 CGPA",
    iconType: "work"
  },
  {
    year: "2026 & Beyond",
    title: "Future Aspirations",
    subtitle: "Awaiting Elite Opportunities as a Software/AI Engineer",
    iconType: "future"
  }
];

export const RECRUITER_ADVANTAGES = [
  { title: "Strong Academic Record", desc: "Top scores with 9.3 B.Tech CGPA, 97.5% Intermediate and 97% SSC." },
  { title: "Quick Tech Adapter", desc: "Successfully built projects in Machine Learning, Web Tech, and File Systems." },
  { title: "Natural Leader", desc: "Organized technical workshops in university, coordinating teams and resources." },
  { title: "Articulate Communicator", desc: "Exceptional public speaking and presentation skills suitable for international clients." },
  { title: "Cloud & DB Savvy", desc: "Capable of designing relational database schemas and configuring cloud instances." },
  { title: "Passionate AI Aspirant", desc: "Fascinated by high-impact neural modeling, data analytics, and intelligent agents." }
];
