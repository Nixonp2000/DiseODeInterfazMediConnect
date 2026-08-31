import { ChevronRight, Shield, Bell, FileText, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { useState } from "react";

export default function MobileProfile() {
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    { icon: <FileText size={18} />, label: "Mis documentos", sub: "Recetas y estudios", color: "#1A6EF2", bg: "#EBF2FF" },
    { icon: <CreditCard size={18} />, label: "Métodos de pago", sub: "Tarjetas y transferencia", color: "#16A34A", bg: "#DCFCE7" },
    { icon: <Shield size={18} />, label: "Privacidad y seguridad", sub: "Contraseña y acceso", color: "#7C3AED", bg: "#EDE9FE" },
    { icon: <Bell size={18} />, label: "Notificaciones", sub: "Recordatorios de citas", color: "#EA580C", bg: "#FFF7ED" },
    { icon: <HelpCircle size={18} />, label: "Ayuda y soporte", sub: "Centro de ayuda · Chat", color: "#0891B2", bg: "#CFFAFE" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollable bg-[#EEF4FD]">
      {/* Header */}
      <div className="px-5 pt-6 pb-8" style={{ background: "linear-gradient(135deg, #0D1E35 0%, #1A3A5C 100%)" }}>
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format"
              alt="María López"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-[#1A6EF2]/50"
            />
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#1A6EF2] rounded-full flex items-center justify-center text-white text-xs">
              ✎
            </button>
          </div>
          <h2 className="text-white font-bold text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>
            María López García
          </h2>
          <p className="text-white/60 text-xs mt-0.5">maria.lopez@email.com</p>
          <div className="flex items-center gap-3 mt-4">
            {[
              { label: "Citas", value: "7" },
              { label: "Recetas", value: "3" },
              { label: "Tipo", value: "A+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-white font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>{s.value}</p>
                <p className="text-white/50 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-3 pb-6">
        {/* Health card */}
        <div className="bg-white rounded-2xl border border-[#DDE5F0] p-4">
          <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Datos de salud</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Peso", value: "72.2 kg" },
              { label: "Estatura", value: "1.65 m" },
              { label: "IMC", value: "26.5" },
            ].map((d) => (
              <div key={d.label} className="text-center bg-[#EEF4FD] rounded-xl py-2.5">
                <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>{d.value}</p>
                <p className="text-[10px] text-[#64748B]">{d.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5 text-xs">
            {[
              { label: "Alergias", value: "Penicilina, Ibuprofeno", color: "text-[#DC2626]", bg: "bg-[#FEE2E2]" },
              { label: "Condiciones crónicas", value: "Hipertensión, Diabetes tipo 2", color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
            ].map((item) => (
              <div key={item.label} className={`flex items-center justify-between ${item.bg} rounded-xl px-3 py-2`}>
                <span className="text-[#64748B]">{item.label}</span>
                <span className={`font-semibold ${item.color} text-right ml-2 max-w-[60%]`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-[#DDE5F0] divide-y divide-[#DDE5F0]">
          {menuItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#EEF4FD] transition-colors">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg, color: item.color }}>
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>{item.label}</p>
                <p className="text-[10px] text-[#64748B]">{item.sub}</p>
              </div>
              {item.label === "Notificaciones" ? (
                <button
                  onClick={(e) => { e.stopPropagation(); setNotifications(!notifications); }}
                  className={`w-11 h-6 rounded-full transition-colors ${notifications ? "bg-[#1A6EF2]" : "bg-[#DDE5F0]"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full mx-1 transition-transform ${notifications ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              ) : (
                <ChevronRight size={16} className="text-[#CBD5E1] flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-[#FEE2E2] text-[#DC2626] font-semibold text-sm bg-white hover:bg-[#FEE2E2] transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
          <LogOut size={16} />
          Cerrar sesión
        </button>

        <p className="text-center text-[10px] text-[#CBD5E1]" style={{ fontFamily: "DM Mono, monospace" }}>
          MediConnect v2.4.1 · © 2026
        </p>
      </div>
    </div>
  );
}
