/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  Terminal, 
  Cpu, 
  ChevronRight, 
  Download, 
  Briefcase, 
  Mail, 
  ExternalLink, 
  Command, 
  BookOpen, 
  FolderOpen, 
  Code2, 
  Compass, 
  Flame,
  Moon,
  Sun,
  LayoutGrid
} from "lucide-react";

import MatrixBackground from "./components/MatrixBackground.tsx";
import ThreeBrain from "./components/ThreeBrain.tsx";
import WorkspaceTerminal from "./components/WorkspaceTerminal.tsx";
import ResumeViewer from "./components/ResumeViewer.tsx";
import AchievementsGrid from "./components/AchievementsGrid.tsx";
import AIChatBot from "./components/AIChatBot.tsx";
import ContactSection from "./components/ContactSection.tsx";

import { PROJECTS_DATA, Project } from "./types.ts";

export default function App() {
  // Theme state: Cyberpunk Cyan, Vaporwave Purple, Matrix Green
  const [accentColor, setAccentColor] = useState<"cyan" | "purple" | "green">("cyan");
  const [accentClass, setAccentClass] = useState("text-neon-cyan border-neon-cyan");
  
  // Project filtering state
  const [projectFilter, setProjectFilter] = useState<"all" | "ML" | "Python" | "Web">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS_DATA[0]);

  // Command palette state
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Dark/Light toggle (AI Mode vs Standard Mode)
  const [aiModeLocked, setAiModeLocked] = useState(true);

  // Quick accent updater
  useEffect(() => {
    if (accentColor === "cyan") {
      setAccentClass("text-neon-cyan border-neon-cyan");
      document.documentElement.style.setProperty("--color-neon-cyan", "#00E5FF");
    } else if (accentColor === "purple") {
      setAccentClass("text-electric-purple border-electric-purple");
      document.documentElement.style.setProperty("--color-neon-cyan", "#7B2FF7");
    } else if (accentColor === "green") {
      setAccentClass("text-neon-green border-neon-green");
      document.documentElement.style.setProperty("--color-neon-cyan", "#00FFB2");
    }
  }, [accentColor]);

  // Handle Command Palette shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects = projectFilter === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === projectFilter);

  const simulateResumeDownload = () => {
    // Generate beautiful readable plain-text copy-pasteable Resume/Vector configuration sheet
    const manifestText = `
=========================================
G. BRUNDA - AI & SOFTWARE ENGINEER PORTFOLIO
=========================================
Name: G. Brunda (Brunda Gogadi)
Location: Rajampet, Andhra Pradesh, India
Email: gogadibrunda@gmail.com
LinkedIn: linkedin.com/in/brunda-gogadi

SUMMARY:
Passionate Computer Science Engineering student with strong academic excellence
and deep interest in AI, Machine Learning, Cloud and Software Development.

ACADEMICS:
- Madanapalle Institute of Technology & Science: CGPA: 9.3
- Sri Chaitanya Junior College (Intermediate): Percentage: 97.5%
- Sri Chaitanya Techno School (SSC): Percentage: 97%

CORE PROJECTS:
1. Prediction of Diabetics [Machine Learning | Python]
2. Unified Banking Terminal System [Python | File Handling]
3. School Management System [Python | MySQL]
4. Personal Expense Tracker [Python]
5. Tambola Bingo Grid Validation Suite [Python]
6. E-Commerce Web Storefront [HTML | CSS | JS | MySQL]

CERTIFICATIONS:
- NPTEL Operating Systems Fundamentals
- NPTEL Entrepreneurship & Incubation pathways
- NPTEL Effective Academic Coursework

ORGANIZING LEADERSHIP:
- Coordinated University Technical Workshops in university (2nd Year B.Tech CSE).

=========================================
[MOCKED DOWNLOAD INITIATED SUCCESSFULLY]
=========================================
    `.trim();

    const blob = new Blob([manifestText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "G_Brunda_Resume_Manifest.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-white relative font-sans selection:bg-neon-cyan selection:text-black">
      
      {/* Animated Matrix Stream Grid background */}
      <MatrixBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-12">
        
        {/* ========================================================
            NAVIGATION BAR
           ======================================================== */}
        <header className="glass-effect rounded-2xl border border-white/5 sticky top-4 z-40 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-lg shadow-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-neon-cyan animate-pulse" />
            <span className="font-tech text-base tracking-widest font-semibold uppercase">
              BG <span className="text-gray-500">//</span> PORTFOLIO
            </span>
          </div>

          {/* Quick Menu Anchors */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-300">
            <a href="#about-me" className="hover:text-neon-cyan hover:scale-105 transition-all">ABOUT</a>
            <a href="#stats-timeline" className="hover:text-neon-cyan hover:scale-105 transition-all">ACADEMICS</a>
            <a href="#workspace" className="hover:text-neon-cyan hover:scale-105 transition-all">WORKSPACE</a>
            <a href="#projects" className="text-neon-cyan border border-neon-cyan/2 bg-neon-cyan/1 px-2 py-1 rounded hover:bg-neon-cyan hover:text-black transition-all">PROJECTS</a>
            <a href="#contact" className="hover:text-neon-cyan hover:scale-105 transition-all">CONTACT</a>
          </nav>

          {/* Config Controls (Theme Modifier, Command Palette, etc) */}
          <div className="flex items-center gap-2">
            
            {/* Color Switcher */}
            <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1.5 rounded-lg border border-white/5 text-[10px] font-mono">
              <span className="text-gray-500 hidden sm:inline mr-1">THEME CORE:</span>
              <button 
                onClick={() => setAccentColor("cyan")}
                className={`w-3.5 h-3.5 rounded-full bg-[#00E5FF] transition-transform ${accentColor === "cyan" ? "scale-125 border border-white" : "opacity-60"}`}
                title="Neon Cyan"
              />
              <button 
                onClick={() => setAccentColor("purple")}
                className={`w-3.5 h-3.5 rounded-full bg-[#7B2FF7] transition-transform ${accentColor === "purple" ? "scale-125 border border-white" : "opacity-60"}`}
                title="Vaporwave Purple"
              />
              <button 
                onClick={() => setAccentColor("green")}
                className={`w-3.5 h-3.5 rounded-full bg-[#00FFB2] transition-transform ${accentColor === "green" ? "scale-125 border border-white" : "opacity-60"}`}
                title="Toxic Green"
              />
            </div>

            {/* CMD Shortcut Button */}
            <button 
              onClick={() => setIsCommandOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg border border-white/5 text-gray-400 hover:text-white transition-colors"
              title="Open Command Center (Ctrl+K)"
            >
              <Command className="w-4 h-4" />
            </button>

            {/* AI Calibration Locks */}
            <button 
              onClick={() => setAiModeLocked(!aiModeLocked)}
              className="p-2 bg-gradient-to-r from-neon-cyan/10 to-electric-purple/10 border border-white/15 hover:border-neon-cyan/40 text-neon-cyan rounded-lg transition-colors flex items-center justify-center"
              title={aiModeLocked ? "Disable ambient telemetry modes" : "Calibrate system AI parameters"}
            >
              {aiModeLocked ? <Sun className="w-4 h-4 text-neon-green" /> : <Moon className="w-4 h-4 text-electric-purple" />}
            </button>

          </div>
        </header>

        {/* ========================================================
            HERO SECTION / MAIN DIGITAL STAGE
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
          
          {/* Welcome coordinates / Details (L: 7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#00E5FF]">
                <Cpu className="w-4 h-4 text-neon-green animate-spin" />
                <span className="uppercase bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded border border-neon-cyan/20">SYSTEM LOG: ONLINE</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-sans leading-none">
                G. Brunda
              </h1>
              
              <h2 className="text-lg sm:text-xl font-mono tracking-wide text-neon-cyan glow-glow">
                AI Enthusiast | Software Developer | Computer Science Engineer
              </h2>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed tracking-wide font-sans max-w-2xl">
              "Transforming Ideas Into Intelligent Digital Experiences"
              <br />
              <span className="text-gray-400 text-xs mt-2 block font-mono">
                B.Tech Candidate at Madanapalle Institute of Technology & Science // Academic CGPA of 9.3 // Expert Python architect exploring Machine Learning pathways.
              </span>
            </p>

            {/* Action buttons list */}
            <div className="flex flex-wrap gap-3 pt-2">
              
              <button 
                onClick={simulateResumeDownload}
                className="bg-transparent hover:bg-white/5 text-white border border-white/10 px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-mono tracking-wider transition-all hover:border-neon-cyan/40 active:scale-98"
              >
                <Download className="w-4 h-4 text-neon-green" />
                <span>DOWNLOAD RESUME</span>
              </button>

              <a 
                href="#projects"
                className="bg-gradient-to-r from-neon-cyan to-electric-purple hover:brightness-110 text-black font-semibold px-5 py-3 rounded-xl flex items-center gap-2 text-xs transition-all hover:shadow-[0_0_15px_rgba(0,186,255,0.4)] active:scale-98 cursor-pointer"
              >
                <FolderOpen className="w-4 h-4" />
                <span>VIEW PROJECTS</span>
              </a>

              <a 
                href="#contact"
                className="bg-white/2 hover:bg-white/5 text-gray-300 hover:text-white border border-white/5 hover:border-white/20 px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-mono transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>CONTACT ME</span>
              </a>

            </div>

            {/* Floating system chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
              
              <div className="bg-white/2 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-gray-400">
                <span className="text-gray-500 block">CORE CODES:</span>
                <span className="text-white font-medium">PYTHON // C // Java</span>
              </div>

              <div className="bg-white/2 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-gray-400">
                <span className="text-gray-500 block">DB SCHEMAS:</span>
                <span className="text-white font-medium">MYSQL ENGINE</span>
              </div>

              <div className="bg-white/2 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-gray-400">
                <span className="text-gray-500 block">CLOUD CLUSTER:</span>
                <span className="text-neon-cyan font-medium">INFRA FUNDAMENTALS</span>
              </div>

              <div className="bg-white/2 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-gray-400">
                <span className="text-gray-500 block">COLLABORATION:</span>
                <span className="text-neon-green font-medium">GIT // GITHUB HOST</span>
              </div>

            </div>

          </div>

          {/* Rotating AI Brain Canvas (R: 5 Columns) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <ThreeBrain />
          </div>

        </section>

        {/* ========================================================
            ABOUT ME SECTION
           ======================================================== */}
        <section id="about-me" className="glass-effect rounded-2xl border border-white/5 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="text-neon-cyan w-5 h-5" />
            <h3 className="font-tech text-base tracking-widest text-[#00E5FF] uppercase">ABOUT THE ARCHITECT</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <p className="text-gray-200 text-sm md:text-base leading-relaxed tracking-wide font-sans">
                Hello! I'm <strong>Brunda Gogadi</strong>, a passionate Computer Science Engineering student built for academic excellence and deep intellectual interest in Artificial Intelligence, Machine Learning, Cloud Computing, and Software Development workflows.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                I enjoy constructing innovative algorithms, solving demanding real-world parameters, and continuously learning new technology stacks. My ultimate goal is to become an elite <strong>Software Engineer / AI Engineer</strong> capable of engineering impactful technology solutions that enrich lives.
              </p>
            </div>

            <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3 font-mono text-xs">
              <p className="text-gray-500 uppercase tracking-widest text-[10px] pb-1 border-b border-white/5">COGNITIVE STATUS</p>
              <div className="flex justify-between">
                <span className="text-gray-400">Academic Standing:</span>
                <span className="text-neon-cyan font-bold">Excellent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Main Focus:</span>
                <span className="text-white">AI / Data Services</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Code Architecture:</span>
                <span className="text-neon-green">Object Oriented</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Core Engine:</span>
                <span className="text-white">Python Core System</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            EDUCATION & STATS / TIMELINE MAPS
           ======================================================== */}
        <section id="stats-timeline" className="space-y-6">
          <div className="text-center space-y-1">
            <h4 className="font-tech text-neon-cyan text-xs tracking-widest uppercase">SCHOLASTIC DASHBOARD</h4>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Academics, Trophies & Credentials</h2>
          </div>
          
          <ResumeViewer />
        </section>

        {/* ========================================================
            COMPILER & CODES WORKSPACE TERMINAL
           ======================================================== */}
        <section id="workspace" className="space-y-6">
          <div className="text-center space-y-1">
            <h4 className="font-tech text-neon-cyan text-xs tracking-widest uppercase animate-pulse">SANDBOX ENV</h4>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Interactive Engineering Playground</h2>
          </div>

          <WorkspaceTerminal />
        </section>

        {/* ========================================================
            PROJECTS PORTFOLIO FILTER WITH LIVE CODE VIEW
           ======================================================== */}
        <section id="projects" className="space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-white/5">
            <div>
              <h4 className="font-tech text-neon-cyan text-xs tracking-widest uppercase">CODING SHOWCASE</h4>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Engineered Systems & Applications</h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-space-dark border border-white/5 p-1 rounded-xl text-xs font-mono">
              {(["all", "ML", "Python", "Web"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors capitalize ${
                    projectFilter === filter
                      ? "bg-slate-950 text-neon-cyan border border-neon-cyan/20 font-bold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {filter === "all" ? "All Projects" : filter === "ML" ? "Machine Learning" : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`glass-effect rounded-xl overflow-hidden cursor-pointer transition-all ${
                  selectedProject?.id === proj.id 
                    ? "border-neon-cyan ring-1 ring-neon-cyan/40 bg-white/4 scale-102" 
                    : "hover:border-white/10 hover:bg-white/1"
                } p-5 space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-neon-green/90 uppercase tracking-widest">
                      {proj.category === "ML" ? "🤖 ML Model" : "🐍 Python Code"}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{proj.duration}</span>
                  </div>
                  
                  <h4 className="font-bold text-white text-base font-sans">{proj.title}</h4>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed min-h-[36px]">{proj.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono bg-white/2 text-gray-300 px-2 py-0.5 rounded border border-white/5">
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 3 && (
                      <span className="text-[9px] font-mono text-neon-cyan font-bold">+{proj.tech.length - 3}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-neon-cyan">
                    <span>{proj.role}</span>
                    <span className="flex items-center gap-1">VIEW ARTIFACTS <ChevronRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Project Details Panel */}
          {selectedProject && (
            <div className="glass-effect-cyan rounded-2xl border border-neon-cyan/30 p-6 space-y-4 bg-slate-950/80 animate-fadeIn">
              <div className="flex flex-wrap justify-between items-start gap-2 pb-3 border-b border-neon-cyan/15">
                <div>
                  <h3 className="text-white font-bold text-lg">{selectedProject.title} details</h3>
                  <p className="text-xs text-neon-green font-mono">{selectedProject.duration} // {selectedProject.role}</p>
                </div>
                <div className="flex gap-2">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono bg-neon-cyan/10 text-neon-cyan px-2.5 py-0.5 rounded border border-neon-cyan/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-gray-300 text-xs leading-relaxed">{selectedProject.description}</p>
                
                <div className="space-y-2">
                  <p className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">KEY IMPLEMENTATION FEATURES</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {selectedProject.features.map((feat, fIdx) => (
                      <div key={fIdx} className="bg-black/40 p-2.5 rounded border border-white/5 flex gap-2 items-center text-gray-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>

        {/* ========================================================
            ACHIEVEMENTS, CERTIFICATES & UNIVERSITY WORKSHOPS
           ======================================================== */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h4 className="font-tech text-neon-cyan text-xs tracking-widest uppercase">LAURELS & RECOGNITIONS</h4>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">NPTEL Credentials & University Activity</h2>
          </div>

          <AchievementsGrid />
        </section>

        {/* ========================================================
            AI AGENT CO-PILOT CHAT INTERFACE & MOCK VOICE UI
           ======================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* AI Bot floating panel (L: 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="space-y-1">
              <h4 className="font-tech text-neon-cyan text-xs tracking-widest uppercase">COGNITIVE SYSTEM</h4>
              <h2 className="text-2xl font-bold tracking-tight text-white">Direct Agent Interviewer Bot</h2>
              <p className="text-gray-400 text-xs tracking-wide">
                Speak directly with Brundabot to query her database on Python routines, CGPA audits, and career availabilities.
              </p>
            </div>
            
            <AIChatBot />
          </div>

          {/* Futuristic 3D Visualizer & Mockups Box (R: 5 Columns) */}
          <div className="lg:col-span-5 bg-space-dark/60 p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="font-tech text-xs tracking-widest text-[#00E5FF] uppercase">AI VOICE CALIBRATOR</span>
                <span className="text-[9px] font-mono text-gray-500">MOCKUP ENGINE</span>
              </div>
              
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed font-mono">
                  G. Brunda's Voice Synth is fully calibrated. Test simulated sound oscillations below:
                </p>

                {/* Animated voice bar waves */}
                <div className="flex justify-center items-end gap-1.5 h-16 py-2">
                  <div className="w-1 bg-[#00E5FF] h-6 rounded animate-pulse" />
                  <div className="w-1 bg-[#7B2FF7] h-12 rounded animate-pulse [animation-delay:0.2s]" />
                  <div className="w-1 bg-[#00E5FF] h-16 rounded animate-pulse [animation-delay:0.4s]" />
                  <div className="w-1 bg-[#00FFB2] h-10 rounded animate-pulse [animation-delay:0.1s]" />
                  <div className="w-1 bg-[#7B2FF7] h-14 rounded animate-pulse [animation-delay:0.5s]" />
                  <div className="w-1 bg-[#00E5FF] h-8 rounded animate-pulse [animation-delay:0.3s]" />
                </div>

                <div className="flex justify-center gap-2">
                  <span className="text-[10px] font-mono text-neon-green bg-neon-green/10 px-2.5 py-0.5 rounded border border-neon-green/20">VOICE: READY</span>
                  <span className="text-[10px] font-mono text-gray-500">24000 HZ LATENCY BASE</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">PROJECT COMPILER METRIC STATS</p>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Code Base Volume:</span>
                  <span className="text-white">6 Modules verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Average Model Accuracy:</span>
                  <span className="text-neon-cyan">93.42% (SVM/RF classification)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MySQL Constraints checks:</span>
                  <span className="text-neon-green">100% Passed</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ========================================================
            CONTACT ME DETAILS & TRANSMITTER CORE FORM
           ======================================================== */}
        <section id="contact" className="space-y-6">
          <div className="text-center space-y-1">
            <h4 className="font-tech text-neon-cyan text-xs tracking-widest uppercase">TRANSMISSION SECTORS</h4>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Contact & Connect Direct Channels</h2>
          </div>

          <ContactSection />
        </section>

        {/* ========================================================
            FOOTER CRED SHEET
           ======================================================== */}
        <footer className="pt-8 border-t border-white/5 text-center space-y-2 text-xs text-gray-500 font-mono">
          <p>© 2026 G. Brunda. Designed with Future AI Engineer specs.</p>
          <div className="flex justify-center gap-4 text-[10px]">
            <span>SYSTEM STATE: EXTREMELY HIGH STANDING</span>
            <span>APPLICATIONS BUILT ON REACT V19</span>
          </div>
        </footer>

      </div>

      {/* ========================================================
          COMMAND CENTER MODAL PALETTE
         ======================================================== */}
      <AnimatePresence>
        {isCommandOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-space-dark border border-neon-cyan/30 rounded-2xl p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 font-tech text-xs tracking-widest text-[#00E5FF]">
                  <Command className="w-4 h-4 text-neon-cyan" />
                  <span>COMMAND CENTER (SHORTCUT MANIFEST)</span>
                </div>
                <button 
                  onClick={() => setIsCommandOpen(false)}
                  className="text-gray-500 hover:text-white text-xs font-mono"
                >
                  [ESC]
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono max-h-[300px] overflow-y-auto">
                <p className="text-gray-400">Available commands / accents swap selectors:</p>
                
                <div 
                  onClick={() => { setAccentColor("cyan"); setIsCommandOpen(false); }}
                  className="p-2.5 bg-white/2 hover:bg-neon-cyan/10 border border-white/5 rounded cursor-pointer transition-colors flex justify-between items-center"
                >
                  <span>🧬 Accent core: Cyan Cyberpunk</span>
                  <span className="text-[10px] text-neon-cyan">ACTIVATE</span>
                </div>

                <div 
                  onClick={() => { setAccentColor("purple"); setIsCommandOpen(false); }}
                  className="p-2.5 bg-white/2 hover:bg-electric-purple/10 border border-white/5 rounded cursor-pointer transition-colors flex justify-between items-center"
                >
                  <span>⚛️ Accent core: Vaporwave Purple</span>
                  <span className="text-[10px] text-electric-purple">ACTIVATE</span>
                </div>

                <div 
                  onClick={() => { setAccentColor("green"); setIsCommandOpen(false); }}
                  className="p-2.5 bg-white/2 hover:bg-neon-green/10 border border-white/5 rounded cursor-pointer transition-colors flex justify-between items-center"
                >
                  <span>👾 Accent core: Matrix Toxic Green</span>
                  <span className="text-[10px] text-neon-green">ACTIVATE</span>
                </div>

                <div 
                  onClick={() => { simulateResumeDownload(); setIsCommandOpen(false); }}
                  className="p-2.5 bg-white/2 hover:bg-white/5 border border-white/5 rounded cursor-pointer transition-colors flex justify-between items-center"
                >
                  <span>📝 Download printable resume manifest (Plaintext)</span>
                  <span className="text-[10px] text-gray-500">EXECUTE DOWNLOAD</span>
                </div>

              </div>

              <div className="pt-2 border-t border-white/5 text-[10px] text-gray-500 font-mono text-center">
                Press CTRL+K at any segment coordinates to summon system palette.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
