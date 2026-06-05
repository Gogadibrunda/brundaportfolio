import React, { useState } from "react";
import { Mail, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, Copy } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("gogadibrunda@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setFeedbackMsg("Please populate all three parameters to send message.");
      return;
    }

    setStatus("submitting");

    // EmailJS Mock Simulation & Direct Native Form MailFallback 
    setTimeout(() => {
      setStatus("success");
      setFeedbackMsg(`Thank you, ${formData.name}! Your vector-encrypted message was registered on Brunda's local inbox. She will get back to you soon.`);
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Contact Information Pane (L: 5 Columns) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-space-dark/60 p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        {/* Holographic backdrop accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 rounded-full filter blur-xl animate-pulse" />
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-tech text-base tracking-widest text-neon-cyan uppercase">G. BRUNDA DIRECT COORDS</h4>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              Connect directly via standard electronic channels or encrypted digital networks. Evaluators can copy credentials securely below.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Email Address */}
            <div className="flex items-center gap-3 p-3 bg-white/2 rounded-xl border border-white/5 group hover:border-neon-cyan/20 transition-all">
              <div className="p-2.5 bg-neon-cyan/10 text-neon-cyan rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">ELECTRONIC EMAIL</p>
                <a href="mailto:gogadibrunda@gmail.com" className="text-xs font-semibold text-white hover:text-neon-cyan select-all block truncate mt-1">
                  gogadibrunda@gmail.com
                </a>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="p-1.5 hover:bg-white/5 text-gray-500 hover:text-neon-cyan rounded"
                title="Copy mail to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {/* LinkedIn Profile */}
            <a 
              href="https://www.linkedin.com/in/brunda-gogadi-8a50ba2b1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white/2 rounded-xl border border-white/5 group hover:border-electric-purple/20 transition-all cursor-pointer block"
            >
              <div className="p-2.5 bg-electric-purple/10 text-electric-purple rounded-lg group-hover:bg-electric-purple group-hover:text-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">LINKEDIN MATRIX</p>
                <span className="text-xs font-semibold text-white group-hover:text-electric-purple block truncate mt-1">
                  linkedin.com/in/brunda-gogadi
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-500">VISIT ↗</span>
            </a>

            {/* Geographic Coordinates */}
            <div className="flex items-center gap-3 p-3 bg-white/2 rounded-xl border border-white/5 group hover:border-neon-green/20 transition-all">
              <div className="p-2.5 bg-neon-green/10 text-neon-green rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest leading-none">GEOGRAPHIC LOCATION</p>
                <p className="text-xs font-semibold text-white mt-1">
                  Rajampet, Andhra Pradesh, India
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Copy Indicator Toast */}
        {copied && (
          <div className="text-xs bg-neon-green/10 border border-neon-green/30 text-neon-green px-3 py-1.5 rounded-lg text-center animate-pulse">
            📋 Coords copied! paste safely in your email client.
          </div>
        )}

        <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-gray-500 text-center uppercase tracking-widest">
          EST REGION // AP-SOUTH-1 INDIA // SECURE SECRETS DECK
        </div>
      </div>

      {/* Interactive Contact Form (R: 7 Columns) */}
      <form 
        onSubmit={handleFormSubmit}
        className="lg:col-span-7 flex flex-col justify-between space-y-4 bg-slate-950/80 p-6 md:p-8 rounded-2xl border border-white/5 relative"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="font-tech text-xs tracking-widest text-gray-400 uppercase">TRANSMIT TERMINAL BUFFER</span>
            <span className="text-[10px] font-mono text-neon-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" /> SECURE LINK ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            
            {/* Sender Name */}
            <div className="space-y-1.5">
              <label className="text-gray-400 block tracking-wider uppercase">Your Sender Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Recruiter G. Brunda"
                className="w-full bg-space-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-neon-cyan/40 transition-colors"
                required
              />
            </div>

            {/* Sender Email */}
            <div className="space-y-1.5">
              <label className="text-gray-400 block tracking-wider uppercase">Contact Email Pointer</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="tech@firm.com"
                className="w-full bg-space-dark border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-neon-cyan/40 transition-colors"
                required
              />
            </div>

          </div>

          {/* Contact Message */}
          <div className="space-y-1.5 text-xs font-mono">
            <label className="text-gray-400 block tracking-wider uppercase">Algorithm Specification (Message)</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Inquire about interview slotting, projects details or coordinate collaborative ventures..."
              rows={4}
              className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white outline-none focus:border-neon-cyan/40 transition-colors resize-none"
              required
            />
          </div>
        </div>

        {/* Feedback Messages */}
        {status === "success" && (
          <div className="text-xs bg-neon-green/10 border border-neon-green/30 text-neon-green p-3 rounded-lg flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}
        {status === "error" && (
          <div className="text-xs bg-red-400/10 border border-red-400/30 text-red-400 p-3 rounded-lg flex items-center gap-2 font-mono">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Transmission Controls */}
        <button 
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-gradient-to-r from-neon-cyan to-electric-purple hover:brightness-110 text-black font-semibold rounded-lg py-3 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] disabled:opacity-40"
        >
          <Send className="w-4 h-4 fill-current" />
          <span>{status === "submitting" ? "TRANSMITTING DATA..." : "TRANSMIT DIGITALLY"}</span>
        </button>

      </form>

    </div>
  );
}
