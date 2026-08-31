import { useState } from "react";
import { Home, CalendarPlus, Video, FileText, User } from "lucide-react";
import MobileHome from "./MobileHome";
import MobileSchedule from "./MobileSchedule";
import VideoConsult from "./VideoConsult";
import MobileAppointments from "./MobileAppointments";
import MobileProfile from "./MobileProfile";

type Screen = "home" | "schedule" | "video" | "documents" | "profile";

const NAV = [
  { id: "home" as Screen, label: "Inicio", icon: Home },
  { id: "schedule" as Screen, label: "Agendar", icon: CalendarPlus },
  { id: "video" as Screen, label: "Videoconsulta", icon: Video },
  { id: "documents" as Screen, label: "Documentos", icon: FileText },
  { id: "profile" as Screen, label: "Perfil", icon: User },
];

export default function MobileApp() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <div className="flex items-center justify-center h-full bg-[#EEF4FD] py-4">
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 375,
          height: 780,
          borderRadius: 44,
          background: "#ffffff",
          boxShadow: "0 40px 80px rgba(13,30,53,0.25), 0 0 0 1px rgba(13,30,53,0.12), inset 0 0 0 1.5px rgba(255,255,255,0.15)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-7 pt-3 pb-1"
          style={{ background: screen === "video" ? "#0a0f1a" : screen === "home" ? "#0D1E35" : "#ffffff" }}
        >
          <span
            className="text-xs font-semibold"
            style={{
              fontFamily: "DM Mono, monospace",
              color: screen === "video" || screen === "home" ? "rgba(255,255,255,0.9)" : "#0F172A",
            }}
          >
            09:41
          </span>
          <div
            className="w-28 h-6 rounded-full flex items-center justify-center"
            style={{ background: screen === "video" || screen === "home" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}
          >
            <div className="w-2 h-2 rounded-full bg-current opacity-60 mx-0.5" />
            <div className="w-8 h-1.5 rounded-full bg-current opacity-40 mx-0.5" />
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((b) => (
              <div
                key={b}
                className="w-1 rounded-sm"
                style={{
                  height: 6 + b * 2,
                  background: screen === "video" || screen === "home" ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.7)",
                }}
              />
            ))}
            <div
              className="ml-1 w-5 h-2.5 rounded-sm border"
              style={{
                borderColor: screen === "video" || screen === "home" ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.4)",
              }}
            >
              <div
                className="h-full rounded-sm"
                style={{ width: "75%", background: screen === "video" || screen === "home" ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.6)" }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          {screen === "home" && <MobileHome onNavigate={(s) => setScreen(s as Screen)} />}
          {screen === "schedule" && <MobileSchedule onNavigate={(s) => setScreen(s as Screen)} />}
          {screen === "video" && <VideoConsult onEnd={() => setScreen("home")} />}
          {screen === "documents" && <MobileAppointments onNavigate={(s) => setScreen(s as Screen)} />}
          {screen === "profile" && <MobileProfile />}
        </div>

        {/* Bottom nav — hidden during video call */}
        {screen !== "video" && (
          <div
            className="flex-shrink-0 flex items-stretch bg-white border-t border-[#DDE5F0] pb-2 pt-1"
            style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}
          >
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = screen === item.id;
              const isVideo = item.id === "video";
              if (isVideo) {
                return (
                  <button
                    key={item.id}
                    onClick={() => setScreen(item.id)}
                    className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 relative"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#1A6EF2] flex items-center justify-center -mt-6 shadow-lg shadow-blue-300">
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="text-[9px] font-semibold text-[#1A6EF2] mt-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {item.label}
                    </span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => setScreen(item.id)}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 relative transition-colors"
                >
                  {isActive && (
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#1A6EF2] rounded-full" />
                  )}
                  <Icon
                    size={20}
                    className={isActive ? "text-[#1A6EF2]" : "text-[#94A3B8]"}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  <span
                    className={`text-[9px] font-semibold ${isActive ? "text-[#1A6EF2]" : "text-[#94A3B8]"}`}
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Home indicator */}
        <div className="flex-shrink-0 flex justify-center pb-2 pt-1" style={{ background: screen !== "video" ? "#ffffff" : "#0a0f1a" }}>
          <div className="w-32 h-1 rounded-full" style={{ background: screen !== "video" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" }} />
        </div>
      </div>
    </div>
  );
}
