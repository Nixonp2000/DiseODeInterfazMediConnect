import { useState, useEffect } from "react";
import { Video, VideoOff, Mic, MicOff, Phone, MessageSquare, Wifi, X, Send } from "lucide-react";

interface Props {
  onEnd: () => void;
}

const MESSAGES = [
  { from: "doctor", text: "Buenos días, María. ¿Cómo se ha sentido esta semana?" },
  { from: "patient", text: "Mejor que la semana pasada, la presión ha bajado un poco." },
  { from: "doctor", text: "Excelente. ¿Ha tenido algún mareo o dolor de cabeza?" },
];

export default function VideoConsult({ onEnd }: Props) {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { from: "patient", text: message }]);
    setMessage("");
  };

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "#0a0f1a" }}>
      {/* Main video — doctor */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=800&fit=crop&auto=format"
          alt="Doctora en videollamada"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-5 pt-4 pb-3 flex items-start justify-between z-20">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-white text-xs font-medium" style={{ fontFamily: "DM Mono, monospace" }}>
              EN CURSO
            </span>
          </div>
          <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            Dra. Ana García Rojas
          </p>
          <p className="text-white/70 text-xs">Cardiología</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
            <Wifi size={12} className="text-[#16A34A]" />
            <span className="text-white text-xs font-medium" style={{ fontFamily: "DM Mono, monospace" }}>
              {formatTime(seconds)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white/70 text-[10px]">HD · 720p</span>
          </div>
        </div>
      </div>

      {/* Patient self-view */}
      <div className="absolute bottom-[140px] right-4 z-20">
        <div className="w-24 h-32 rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl relative">
          {cameraOn ? (
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=140&fit=crop&auto=format"
              alt="Tu cámara"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#1A2335] flex flex-col items-center justify-center gap-1">
              <VideoOff size={20} className="text-white/40" />
              <span className="text-white/40 text-[9px]">Cámara off</span>
            </div>
          )}
          <div className="absolute bottom-1.5 left-1.5 bg-black/60 rounded-full px-1.5 py-0.5">
            <span className="text-white text-[9px]" style={{ fontFamily: "DM Mono, monospace" }}>Tú</span>
          </div>
        </div>
      </div>

      {/* Chat panel */}
      {chatOpen && (
        <div className="absolute bottom-[140px] left-0 right-0 mx-4 z-30 bg-[#0D1E35]/95 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-white text-sm font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>Chat con la doctora</span>
            <button onClick={() => setChatOpen(false)} className="text-white/50 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="h-48 overflow-y-auto px-4 py-3 space-y-2.5 scrollable">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "patient" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.from === "patient"
                      ? "bg-[#1A6EF2] text-white rounded-br-sm"
                      : "bg-white/10 text-white/90 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-3 border-t border-white/10">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-white/10 text-white placeholder:text-white/30 text-xs rounded-xl px-3 py-2 outline-none border border-white/10 focus:border-[#1A6EF2]"
            />
            <button
              onClick={sendMessage}
              className="w-8 h-8 bg-[#1A6EF2] rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Control buttons */}
      <div className="absolute bottom-10 left-0 right-0 px-6 z-20">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCameraOn(!cameraOn)}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-200 shadow-lg ${
              cameraOn
                ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                : "bg-white/10 border border-white/20 text-white/50"
            }`}
          >
            {cameraOn ? <Video size={20} /> : <VideoOff size={20} />}
            <span className="text-[9px] font-medium" style={{ fontFamily: "DM Mono, monospace" }}>
              {cameraOn ? "Cámara" : "Off"}
            </span>
          </button>

          <button
            onClick={() => setMicOn(!micOn)}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-200 shadow-lg ${
              micOn
                ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                : "bg-[#EA580C] border border-[#EA580C] text-white"
            }`}
          >
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            <span className="text-[9px] font-medium" style={{ fontFamily: "DM Mono, monospace" }}>
              {micOn ? "Mic" : "Mute"}
            </span>
          </button>

          {/* End call */}
          <button
            onClick={onEnd}
            className="w-16 h-16 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] flex flex-col items-center justify-center gap-0.5 shadow-xl shadow-red-900/50 transition-all duration-200"
          >
            <Phone size={22} className="text-white rotate-[135deg]" />
            <span className="text-[9px] text-white font-medium" style={{ fontFamily: "DM Mono, monospace" }}>Finalizar</span>
          </button>

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all duration-200 shadow-lg ${
              chatOpen
                ? "bg-[#1A6EF2] border border-[#1A6EF2] text-white"
                : "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            }`}
          >
            <MessageSquare size={20} />
            <span className="text-[9px] font-medium" style={{ fontFamily: "DM Mono, monospace" }}>Chat</span>
          </button>

          <div className="w-14 h-14" />
        </div>
      </div>
    </div>
  );
}
