import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Layers, 
  Brain, 
  Heart, 
  Music, 
  Award as Trophy,
  CircleDot,
  CheckCircle,
  Briefcase
} from "lucide-react";
import { 
  EDUCATION_DATA, 
  SKILL_CATEGORIES, 
  TIMELINE_EVENTS, 
  RECRUITER_ADVANTAGES 
} from "../types.ts";

export default function ResumeViewer() {
  const [activeTab, setActiveTab] = useState<"education" | "skills" | "timeline" | "recruiter" | "hobbies">("skills");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Custom counters state helper
  const [counts, setCounts] = useState({ cgpa: 0, ssc: 0, inter: 0, projects: 0, certs: 0 });

  useEffect(() => {
    // Elegant incremental ticker
    const interval = setInterval(() => {
      setCounts((prev) => {
        const nextCgpa = prev.cgpa < 9.3 ? parseFloat((prev.cgpa + 0.3).toFixed(1)) : 9.3;
        const nextSsc = prev.ssc < 97 ? prev.ssc + 3 : 97;
        const nextInter = prev.inter < 97.5 ? parseFloat((prev.inter + 2.5).toFixed(1)) : 97.5;
        const nextProj = prev.projects < 6 ? prev.projects + 1 : 6;
        const nextCerts = prev.certs < 3 ? prev.certs + 1 : 3;

        if (nextCgpa === 9.3 && nextSsc === 97 && nextInter === 97.5 && nextProj === 6 && nextCerts === 3) {
          clearInterval(interval);
        }

        return {
          cgpa: nextCgpa,
          ssc: nextSsc,
          inter: nextInter,
          projects: nextProj,
          certs: nextCerts
        };
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-10">
      
      {/* 1. STATS DASHBOARD WITH ANIMATED COUNTERS */}
      <div id="stats-section" className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* CGPA Counter */}
        <div className="glass-effect-cyan rounded-xl p-4 text-center cursor-help transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_15px_rgba(0,229,255,0.25)]">
          <div className="flex justify-center mb-1 text-neon-cyan"><GraduationCap className="w-5 h-5 animate-pulse" /></div>
          <p className="text-2xl md:text-3xl font-tech font-bold text-neon-cyan">{counts.cgpa}</p>
          <p className="text-[11px] font-mono tracking-widest text-gray-400 mt-1 uppercase">B.Tech CGPA</p>
        </div>

        {/* Intermediate Counter */}
        <div className="glass-effect rounded-xl p-4 text-center cursor-help transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_15px_rgba(123,47,247,0.25)]">
          <div className="flex justify-center mb-1 text-electric-purple"><BookOpen className="w-5 h-5" /></div>
          <p className="text-2xl md:text-3xl font-tech font-bold text-electric-purple">{counts.inter}%</p>
          <p className="text-[11px] font-mono tracking-widest text-gray-400 mt-1 uppercase">Intermediate</p>
        </div>

        {/* SSC Counter */}
        <div className="glass-effect rounded-xl p-4 text-center cursor-help transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_15px_rgba(0,255,178,0.25)]">
          <div className="flex justify-center mb-1 text-neon-green"><TrendingUp className="w-5 h-5" /></div>
          <p className="text-2xl md:text-3xl font-tech font-bold text-neon-green">{counts.ssc}%</p>
          <p className="text-[11px] font-mono tracking-widest text-gray-400 mt-1 uppercase">SSC Percentage</p>
        </div>

        {/* Projects Counter */}
        <div className="glass-effect rounded-xl p-4 text-center cursor-help transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_15px_rgba(0,229,255,0.25)]">
          <div className="flex justify-center mb-1 text-neon-cyan"><Layers className="w-5 h-5" /></div>
          <p className="text-2xl md:text-3xl font-tech font-bold text-white">{counts.projects}+</p>
          <p className="text-[11px] font-mono tracking-widest text-gray-400 mt-1 uppercase">Completed Projects</p>
        </div>

        {/* Certifications Counter */}
        <div className="glass-effect rounded-xl p-4 text-center cursor-help transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_15px_rgba(123,47,247,0.25)] col-span-2 md:col-span-1">
          <div className="flex justify-center mb-1 text-electric-purple"><Trophy className="w-5 h-5" /></div>
          <p className="text-2xl md:text-3xl font-tech font-bold text-neon-cyan">{counts.certs}x</p>
          <p className="text-[11px] font-mono tracking-widest text-gray-400 mt-1 uppercase">NPTEL Certified</p>
        </div>

      </div>

      {/* 2. SUB NAVIGATION CONTROL DECK */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-space-dark/80 rounded-xl border border-white/5 max-w-3xl mx-auto backdrop-blur-md">
        
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-1 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded-lg ${
            activeTab === "skills"
              ? "bg-gradient-to-r from-neon-cyan to-electric-purple text-black font-semibold shadow-md"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Brain className="w-3.5 h-3.5" /> Skills Radar
        </button>

        <button
          onClick={() => setActiveTab("education")}
          className={`flex items-center gap-1 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded-lg ${
            activeTab === "education"
              ? "bg-gradient-to-r from-neon-cyan to-electric-purple text-black font-semibold shadow-md"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" /> Academy
        </button>

        <button
          onClick={() => setActiveTab("timeline")}
          className={`flex items-center gap-1 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded-lg ${
            activeTab === "timeline"
              ? "bg-gradient-to-r from-neon-cyan to-electric-purple text-black font-semibold shadow-md"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Journey Maps
        </button>

        <button
          onClick={() => setActiveTab("recruiter")}
          className={`flex items-center gap-1 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded-lg ${
            activeTab === "recruiter"
              ? "bg-gradient-to-r from-neon-cyan to-electric-purple text-black font-semibold shadow-md"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Recruitment Core
        </button>

        <button
          onClick={() => setActiveTab("hobbies")}
          className={`flex items-center gap-1 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all rounded-lg ${
            activeTab === "hobbies"
              ? "bg-gradient-to-r from-neon-cyan to-electric-purple text-black font-semibold shadow-md"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Heart className="w-3.5 h-3.5" /> Hobbies & Beats
        </button>

      </div>

      {/* 3. DYNAMIC TAB CONTAINER */}
      <div className="glass-effect rounded-2xl border border-neon-cyan/10 p-6 md:p-8 relative min-h-[340px]">
        
        <AnimatePresence mode="wait">
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-neon-cyan/10">
                <GraduationCap className="text-neon-cyan w-5 h-5" />
                <h3 className="font-tech text-base tracking-widest text-neon-cyan uppercase">SCHOLASTIC RECORDS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={idx} className="relative group bg-space-dark/60 p-5 rounded-xl border border-white/5 hover:border-neon-cyan/25 transition-all">
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20 text-[10px] font-mono text-neon-cyan">
                      0{idx + 1}
                    </div>
                    <span className="text-xs font-mono text-neon-green/90">{edu.duration}</span>
                    <h4 className="font-semibold text-white mt-1 leading-snug group-hover:text-neon-cyan transition-colors">{edu.degree}</h4>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{edu.institution}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                      <span className="text-xs text-gray-500 font-mono">SCORES ACQUIRED</span>
                      <span className="text-sm font-tech font-bold text-neon-cyan">
                        {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-neon-cyan/10">
                <div className="flex items-center gap-2">
                  <Brain className="text-neon-green w-5 h-5 animate-pulse" />
                  <h3 className="font-tech text-base tracking-widest text-neon-green uppercase">NEURAL RADAR & SKILL INTERFACES</h3>
                </div>
                <span className="text-[10px] font-mono text-gray-500">HOVER AND INTERACT FOR FEEDBACK</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="font-mono text-xs tracking-wider text-neon-cyan uppercase font-semibold pl-2 border-l-2 border-neon-cyan">
                      {cat.title}
                    </h4>
                    
                    <div className="space-y-3 pl-2">
                      {cat.items.map((skill, sIdx) => (
                        <div 
                          key={sIdx} 
                          className="space-y-1 group"
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-gray-300 group-hover:text-neon-cyan transition-colors font-medium">
                              {skill.name}
                            </span>
                            <span className="text-neon-green font-semibold">
                              {skill.level}%
                            </span>
                          </div>
                          
                          {/* Progress Line */}
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-neon-green/80 to-neon-cyan rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {hoveredSkill && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 bg-white/2 border border-neon-cyan/2 border-dashed rounded-lg text-center mt-4"
                  >
                    <p className="text-xs font-mono text-gray-400">
                      G. Brunda has demonstrated strong working knowledge of <strong className="text-neon-cyan uppercase tracking-wider">{hoveredSkill}</strong> via live academic projects and real-time validation suites.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-neon-cyan/10">
                <Layers className="text-neon-cyan w-5 h-5" />
                <h3 className="font-tech text-base tracking-widest text-neon-cyan uppercase">MILESTONE TIMELINE MAP</h3>
              </div>

              {/* Vertical timeline graph */}
              <div className="relative pl-6 md:pl-32 space-y-8 border-l border-white/5 py-4">
                {TIMELINE_EVENTS.map((event, idx) => (
                  <div key={idx} className="relative group">
                    
                    {/* Year Label left (desktop only) */}
                    <div className="hidden md:block absolute -left-32 text-right w-24 pr-4 top-1">
                      <span className="font-tech text-neon-cyan text-sm tracking-wider">{event.year}</span>
                    </div>

                    {/* Interactive anchor dot */}
                    <div className="absolute -left-10 md:-left-[28px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-neon-cyan group-hover:bg-neon-cyan transition-colors flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-purple animate-ping" />
                    </div>

                    <div className="bg-space-dark/40 p-4 rounded-xl border border-white/5 hover:border-electric-purple/30 transition-all">
                      <span className="text-[10px] font-mono text-neon-cyan/80 md:hidden bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/15 mr-2">
                        {event.year}
                      </span>
                      <h4 className="font-semibold text-white group-hover:text-neon-cyan transition-colors">{event.title}</h4>
                      <p className="text-gray-400 text-xs mt-1 font-mono">{event.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "recruiter" && (
            <motion.div
              key="recruiter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-neon-green/10">
                <Trophy className="text-neon-green w-5 h-5" />
                <h3 className="font-tech text-base tracking-widest text-neon-green uppercase">WHY HIRE G. BRUNDA?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECRUITER_ADVANTAGES.map((advantage, idx) => (
                  <div key={idx} className="flex gap-3 bg-white/2 p-4 rounded-xl border border-white/5 hover:bg-white/4 hover:border-neon-green/20 transition-all">
                    <CheckCircle className="text-neon-green w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-mono text-xs tracking-wider text-white font-semibold uppercase">{advantage.title}</h4>
                      <p className="text-gray-400 text-xs mt-1.5 leading-relaxed font-sans">{advantage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "hobbies" && (
            <motion.div
              key="hobbies"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-neon-cyan/10">
                <Heart className="text-electric-purple w-5 h-5" />
                <h3 className="font-tech text-base tracking-widest text-white uppercase">HOBBIES & BRAIN DECOMPRESSION</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Art Drawing Hobby */}
                <div className="bg-space-dark/60 p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-neon-cyan/5 rounded-full filter blur-xl group-hover:bg-neon-cyan/10 transition-all" />
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-neon-cyan/10 text-neon-cyan rounded-lg border border-neon-cyan/20">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white font-mono text-xs uppercase">Drawing & Design Sketching</h4>
                      <p className="text-[11px] font-mono text-neon-green">ACTIVE INSPIRATION</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-4 leading-relaxed pl-1">
                    G. Brunda loves sketching and drawing conceptual illustrations, bringing symmetry, structural alignment, and visual creative balance from fine arts into clean frontend engineering.
                  </p>
                </div>

                {/* Music Hobby with Custom Interactive Beat Waveform */}
                <div className="bg-space-dark/60 p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-electric-purple/5 rounded-full filter blur-xl group-hover:bg-electric-purple/10 transition-all" />
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-electric-purple/10 text-electric-purple rounded-lg border border-electric-purple/20">
                      <Music className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white font-mono text-xs uppercase">Listening to Music</h4>
                      <p className="text-[11px] font-mono text-electric-purple">COGNITIVE COMPOSURES</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-4 leading-relaxed pl-1">
                    Listens to ambient tracks and classical synthwave rhythm loops which promote focus during rigorous algorithmic coding and diagnostic deep research sessions.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
