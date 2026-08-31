import { useState } from "react";
import {
  Home,
  CalendarPlus,
  Calendar,
  FileText,
  Activity,
  CreditCard,
  User,
  Palette,
  Bell,
  Search,
  ChevronDown,
  Cross,
} from "lucide-react";
import Dashboard from "./Dashboard";
import BookingFlow from "./BookingFlow";
import HistoryProfile from "./HistoryProfile";
import StyleGuide from "./StyleGuide";

type WebPage = "dashboard" | "booking" | "appointments" | "prescriptions" | "tracking" | "payments" | "profile" | "styleguide";

const NAV_ITEMS: { id: WebPage; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Inicio", icon: <Home size={18} /> },
  { id: "booking", label: "Agendar Cita", icon: <CalendarPlus size={18} /> },
  { id: "appointments", label: "Mis Citas", icon: <Calendar size={18} /> },
  { id: "prescriptions", label: "Recetas", icon: <FileText size={18} /> },
  { id: "tracking", label: "Seguimiento", icon: <Activity size={18} /> },
  { id: "payments", label: "Pagos", icon: <CreditCard size={18} /> },
  { id: "profile", label: "Perfil", icon: <User size={18} /> },
];

function Sidebar({ active, onNavigate }: { active: WebPage; onNavigate: (p: WebPage) => void }) {
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full" style={{ backgroundColor: "#0D1E35" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-[#1A6EF2] rounded-lg flex items-center justify-center flex-shrink-0">
          <Cross size={16} className="text-white" fill="white" />
        </div>
        <div>
          <span className="text-white font-bold text-base leading-none" style={{ fontFamily: "Outfit, sans-serif" }}>
            Medi<span className="text-[#1A6EF2]">Connect</span>
          </span>
          <p className="text-white/40 text-[10px] mt-0.5" style={{ fontFamily: "DM Mono, monospace" }}>TELEMEDICINA</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto hide-scroll">
        <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ fontFamily: "DM Mono, monospace" }}>
          Menú principal
        </p>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              active === item.id
                ? "bg-[#1A6EF2] text-white"
                : "text-white/60 hover:text-white hover:bg-white/8"
            }`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <span className={active === item.id ? "text-white" : "text-white/50"}>{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div className="border-t border-white/10 my-3" />
        <button
          onClick={() => onNavigate("styleguide")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
            active === "styleguide"
              ? "bg-white/15 text-white"
              : "text-white/40 hover:text-white/70 hover:bg-white/5"
          }`}
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          <Palette size={16} className="text-white/40" />
          Guía de Estilos
        </button>
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 transition-colors">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format"
            alt="María López"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-[#1A6EF2]/60 flex-shrink-0"
          />
          <div className="text-left flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
              María López
            </p>
            <p className="text-white/40 text-xs truncate" style={{ fontFamily: "DM Mono, monospace" }}>Paciente</p>
          </div>
          <ChevronDown size={14} className="text-white/40 flex-shrink-0" />
        </button>
      </div>
    </aside>
  );
}

function TopBar({ page }: { page: WebPage }) {
  const labels: Record<WebPage, string> = {
    dashboard: "Panel principal",
    booking: "Agendar cita",
    appointments: "Mis citas",
    prescriptions: "Recetas digitales",
    tracking: "Seguimiento de salud",
    payments: "Historial de pagos",
    profile: "Mi perfil",
    styleguide: "Guía de estilos",
  };
  return (
    <div className="h-14 flex-shrink-0 flex items-center justify-between px-7 bg-white border-b border-[#DDE5F0]">
      <h2 className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
        {labels[page]}
      </h2>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#EEF4FD] rounded-xl px-3 py-1.5 text-sm text-[#64748B]">
          <Search size={14} />
          <span className="hidden sm:block">Buscar...</span>
        </div>
        <button className="relative p-2 rounded-xl hover:bg-[#EEF4FD] transition-colors text-[#64748B]">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
        </button>
      </div>
    </div>
  );
}

function PaymentsPage() {
  const items = [
    { date: "11 ago 2026", desc: "Consulta Cardiología — Dra. Ana García", amount: 88.5, status: "Pagado" },
    { date: "22 jul 2026", desc: "Consulta Pediatría — Dr. Carlos Mendoza", amount: 63.5, status: "Pagado" },
    { date: "10 jul 2026", desc: "Consulta Medicina General — Dr. Roberto Díaz", amount: 48.5, status: "Pagado" },
    { date: "17 jun 2026", desc: "Consulta Neurología — Dra. Patricia Núñez", amount: 98.5, status: "Reembolsado" },
  ];
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
        Historial de pagos
      </h1>
      <div className="bg-white rounded-2xl border border-[#DDE5F0] divide-y divide-[#DDE5F0]">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-semibold text-[#0F172A] text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{item.desc}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{item.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  item.status === "Pagado" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#EBF2FF] text-[#1A6EF2]"
                }`}
              >
                {item.status}
              </span>
              <span className="font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                ${item.amount.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackingPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
        Seguimiento de salud
      </h1>
      <p className="text-sm text-[#64748B] mb-6">Registra y monitorea tus signos vitales diariamente</p>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Presión arterial", value: "120/76", unit: "mmHg", trend: "↓ mejorando", color: "#1A6EF2", bg: "#EBF2FF" },
          { label: "Frecuencia cardíaca", value: "72", unit: "bpm", trend: "→ estable", color: "#DC2626", bg: "#FEE2E2" },
          { label: "Glucosa en ayunas", value: "96", unit: "mg/dL", trend: "↓ bajando", color: "#EA580C", bg: "#FFF7ED" },
          { label: "Peso corporal", value: "72.2", unit: "kg", trend: "↓ −2.3 kg", color: "#16A34A", bg: "#DCFCE7" },
          { label: "Saturación O₂", value: "98", unit: "%", trend: "→ normal", color: "#0891B2", bg: "#CFFAFE" },
          { label: "Temperatura", value: "36.6", unit: "°C", trend: "→ normal", color: "#7C3AED", bg: "#EDE9FE" },
        ].map((v) => (
          <div key={v.label} className="bg-white rounded-2xl p-5 border border-[#DDE5F0]">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm text-[#64748B]">{v.label}</p>
              <span className="text-xs font-medium" style={{ color: v.color }}>{v.trend}</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>{v.value}</span>
              <span className="text-sm text-[#64748B] mb-1">{v.unit}</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden bg-[#EEF4FD]">
              <div className="h-full rounded-full" style={{ width: "68%", backgroundColor: v.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WebApp() {
  const [page, setPage] = useState<WebPage>("dashboard");

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar active={page} onNavigate={setPage} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#EEF4FD]">
        <TopBar page={page} />
        <div className="flex-1 overflow-y-auto hide-scroll">
          {page === "dashboard" && <Dashboard onNavigate={(p) => setPage(p as WebPage)} />}
          {page === "booking" && <BookingFlow onNavigate={(p) => setPage(p as WebPage)} />}
          {(page === "appointments" || page === "prescriptions" || page === "profile") && (
            <HistoryProfile />
          )}
          {page === "tracking" && <TrackingPage />}
          {page === "payments" && <PaymentsPage />}
          {page === "styleguide" && <StyleGuide />}
        </div>
      </div>
    </div>
  );
}
