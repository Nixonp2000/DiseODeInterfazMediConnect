import { useState } from "react";
import WebApp from "./web/WebApp";
import MobileApp from "./mobile/MobileApp";
import { Monitor, Smartphone } from "lucide-react";

type Platform = "web" | "mobile";

export default function App() {
  const [platform, setPlatform] = useState<Platform>("web");

  return (
    <div className="h-full flex flex-col bg-[#EEF4FD]">
      {/* Platform switcher */}
      <div className="flex items-center justify-center gap-2 py-3 bg-white border-b border-[#DDE5F0] z-50 flex-shrink-0">
        <span className="text-xs font-medium text-[#64748B] mr-2" style={{ fontFamily: "DM Mono, monospace" }}>
          MediConnect — Vista
        </span>
        <button
          onClick={() => setPlatform("web")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            platform === "web"
              ? "bg-[#1A6EF2] text-white shadow-sm"
              : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#EEF4FD]"
          }`}
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          <Monitor size={14} />
          Escritorio
        </button>
        <button
          onClick={() => setPlatform("mobile")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            platform === "mobile"
              ? "bg-[#1A6EF2] text-white shadow-sm"
              : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#EEF4FD]"
          }`}
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          <Smartphone size={14} />
          Móvil
        </button>
      </div>

      {/* Platform view */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {platform === "web" ? <WebApp /> : <MobileApp />}
      </div>
    </div>
  );
}
