import { Award, Medal, UserCheck, ShieldAlert, Check, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const CERTIFICATIONS = [
  {
    title: "Effective Course",
    provider: "NPTEL Certified",
    topic: "Professional Communication, Ethics & Advanced Academic Presentation Principles",
    credentialId: "NPTEL-MITS2024-EF1"
  },
  {
    title: "Understanding Incubation and Entrepreneurship",
    provider: "NPTEL Certified",
    topic: "Start-up Incubation pathways, Business Models, Pitching, and Venture Ideation",
    credentialId: "NPTEL-MITS2024-UIE"
  },
  {
    title: "Introduction to Operating Systems",
    provider: "NPTEL Certified",
    topic: "Core Kernel Mechanics, Process Scheduling, Semaphore Coordination, Memory Mappings",
    credentialId: "NPTEL-MITS2025-OS3"
  }
];

const EXPERIENCES = [
  {
    role: "Workshop Organizer",
    entity: "University Academic Panels",
    duration: "2nd Year B.Tech CSE",
    desc: "Coordinated university-wide technical events and workshops catering to over 150+ student delegates.",
    points: [
      "Event Planning: Developed technical syllabus modules and curated guest speaker rosters.",
      "Team Coordination: Directed a logistics workforce of 12 peer coordinators.",
      "Communication: Pioneered campus promotions, leading to 100% capacity attendance.",
      "Leadership: Arbitrated project schedules, budget controls, and student feedback evaluations."
    ]
  }
];

export default function AchievementsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
      
      {/* Certifications Block (L: 6 Columns) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
          <Award className="text-neon-cyan w-5 h-5" />
          <h3 className="font-tech text-base tracking-widest text-neon-cyan uppercase">NPTEL CERTIFICATIONS</h3>
        </div>

        <div className="space-y-4">
          {CERTIFICATIONS.map((cert, id) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.01, x: 4 }}
              className="bg-space-dark/60 p-4 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-all flex gap-3 relative overflow-hidden group"
            >
              {/* Decorative side accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50" />
              
              <div className="p-2 bg-neon-cyan/10 text-neon-cyan rounded-lg border border-neon-cyan/15 h-fit mt-0.5 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                <Medal className="w-4 h-4" />
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-white tracking-wide group-hover:text-neon-cyan transition-colors">{cert.title}</h4>
                  <span className="text-[9px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.25 text-gray-400 rounded">Verified ID</span>
                </div>
                <p className="text-xs font-mono text-neon-green">{cert.provider}</p>
                <p className="text-xs text-gray-400 leading-snug pt-1">{cert.topic}</p>
                <p className="text-[10px] font-mono text-gray-600 block pt-1 uppercase">CRED ID: {cert.credentialId}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leadership & Extracurriculars (R: 6 Columns) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
          <UserCheck className="text-electric-purple w-5 h-5" />
          <h3 className="font-tech text-base tracking-widest text-white uppercase">ACTIVITIES & WORKSHOPS</h3>
        </div>

        <div className="space-y-6">
          {/* Experience Card */}
          {EXPERIENCES.map((exp, val) => (
            <div key={val} className="bg-space-dark/60 p-5 rounded-xl border border-white/5 space-y-3 relative group hover:border-electric-purple/20 transition-all">
              <div className="flex flex-wrap justify-between items-start gap-1">
                <div>
                  <h4 className="font-bold text-white text-base group-hover:text-electric-purple transition-colors">{exp.role}</h4>
                  <p className="text-xs font-mono text-gray-400">{exp.entity}</p>
                </div>
                <span className="text-xs font-mono text-electric-purple bg-electric-purple/10 px-2.5 py-1 rounded-full border border-electric-purple/15 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5" /> {exp.duration}
                </span>
              </div>
              
              <p className="text-xs text-gray-300 leading-relaxed font-sans">{exp.desc}</p>
              
              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-[10px] font-mono tracking-wider text-neon-green uppercase font-semibold">CORE DIRECTIVES MANAGED</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
                  {exp.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex gap-2 items-start bg-slate-950/50 p-2 rounded border border-white/2 hover:border-white/5 hover:bg-slate-950 transition-all">
                      <Check className="text-neon-cyan w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span className="leading-snug text-gray-300">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Academic Honors Trophies Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* School Medal */}
            <div className="bg-white/2 p-4 rounded-xl border border-white/5 flex gap-3 hover:bg-white/4 hover:border-neon-cyan/20 transition-all">
              <div className="p-2.5 bg-neon-cyan/10 text-neon-cyan rounded-lg h-fit border border-neon-cyan/10">
                <Award className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h5 className="font-mono text-xs text-white uppercase font-bold tracking-wider leading-tight">Academic Medal</h5>
                <p className="text-gray-400 text-xs font-sans leading-tight">School Academic Excellence Recipient</p>
              </div>
            </div>

            {/* Dance Prize */}
            <div className="bg-white/2 p-4 rounded-xl border border-white/5 flex gap-3 hover:bg-white/4 hover:border-electric-purple/20 transition-all">
              <div className="p-2.5 bg-electric-purple/10 text-electric-purple rounded-lg h-fit border border-electric-purple/10">
                <Award className="w-5 h-5 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h5 className="font-mono text-xs text-white uppercase font-bold tracking-wider leading-tight">Arts Laurels</h5>
                <p className="text-gray-400 text-xs font-sans leading-tight">First Prize in Dance Competition</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
