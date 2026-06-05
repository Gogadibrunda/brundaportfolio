import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2, Cpu, MessageSquare, Sparkles } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

const PRESET_QUERIES = [
  "Core projects built by Brunda",
  "Summarize her B.Tech CGPA metrics",
  "Is she open to software roles?",
  "Technical certifications & tools"
];

export default function AIChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Salutations! I am Brundabot, G. Brunda's cognitive assistant agent. Ask me anything about her Python development projects, machine learning analytics models, university leadership coordinates, or hiring status!"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: ChatMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      // Build server request payload with history context
      const chatHistory = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: chatHistory })
      });

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        role: "assistant",
        text: data.text || "Hello! G. Brunda is a computer science student with a 9.3 B.Tech CGPA. Ask me anything about her projects!"
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "My high-latitude neural link was interrupted, but G. Brunda is a computer science student with a 9.3 CGPA, expertise in Python, C, MySQL, and ML projects like 'Prediction of Diabetes'. Feel free to email her at gogadibrunda@gmail.com!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full glass-effect rounded-2xl border border-neon-cyan/20 overflow-hidden shadow-2xl flex flex-col h-[520px]">
      
      {/* Header bar area */}
      <div className="bg-space-dark/95 px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-neon-cyan to-electric-purple rounded-xl border border-neon-cyan/20 text-black">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech text-white font-semibold tracking-wider">BRUNDABOT AI V2</span>
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            </div>
            <p className="text-[10px] font-mono text-gray-400">COGNITIVE CAREER CO-PILOT</p>
          </div>
        </div>
        
        <button
          onClick={() => setMessages([
            {
              role: "assistant",
              text: "Logs refreshed. System initialized. Let me know how I can help evaluate G. Brunda for your team!"
            }
          ])}
          className="p-1.5 hover:bg-white/5 text-gray-500 hover:text-red-400 rounded transition-colors border border-transparent hover:border-white/5"
          title="Clear Conversation Logs"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main chat log container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/60 scrollbar-thin">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Sender bubble icon */}
            <div className={`p-1.5 h-8 w-8 rounded-lg shrink-0 flex items-center justify-center border ${
              msg.role === "user"
                ? "bg-electric-purple/10 text-electric-purple border-electric-purple/25"
                : "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/25"
            }`}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble itself */}
            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed tracking-wide ${
              msg.role === "user"
                ? "bg-electric-purple/15 text-white border border-electric-purple/20 rounded-tr-none"
                : "bg-space-dark/80 text-gray-200 border border-white/5 rounded-tl-none font-mono"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-[50%] mr-auto">
            <div className="p-1.5 h-8 w-8 rounded-lg shrink-0 flex items-center justify-center bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/25 animate-pulse">
              <Cpu className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 bg-space-dark/80 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Fast Queries Deck */}
      <div className="px-5 py-2.5 bg-space-dark/90 border-t border-white/5 flex flex-wrap gap-2 text-[10px] items-center">
        <span className="text-gray-500 font-mono flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5 text-neon-cyan" /> QUICK ACCESS:
        </span>
        {PRESET_QUERIES.map((query, id) => (
          <button
            key={id}
            onClick={() => handleSend(query)}
            disabled={loading}
            className="bg-white/2 hover:bg-neon-cyan hover:text-black border border-white/5 hover:border-transparent text-gray-400 font-mono px-2.5 py-1 rounded transition-colors duration-150 disabled:opacity-50"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Input panel block */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputVal);
        }}
        className="p-4 bg-space-dark border-t border-white/5 flex gap-3 text-xs"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask about CGPA, python core, academic awards, ML diabetic classification..."
          disabled={loading}
          className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-neon-cyan/40 font-mono transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="p-3 bg-gradient-to-r from-neon-cyan to-electric-purple text-black rounded-xl hover:brightness-110 transition-all font-semibold active:scale-95 disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
