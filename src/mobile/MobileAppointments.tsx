import { Video, MapPin, Check, X, Download, ChevronRight } from "lucide-react";
import { upcomingAppointments, pastAppointments, prescriptions } from "../data";
import { useState } from "react";

interface Props {
  onNavigate: (screen: string) => void;
  tab?: "appointments" | "prescriptions";
}

export default function MobileAppointments({ onNavigate, tab: initialTab = "appointments" }: Props) {
  const [tab, setTab] = useState<"appointments" | "prescriptions">(initialTab);

  return (
    <div className="flex flex-col h-full bg-[#EEF4FD]">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 bg-white border-b border-[#DDE5F0] flex-shrink-0">
        <h1 className="text-lg font-bold text-[#0F172A] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
          Documentos
        </h1>
        <div className="flex gap-1 bg-[#EEF4FD] p-1 rounded-xl">
          {(["appointments", "prescriptions"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === t ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"
              }`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {t === "appointments" ? "Mis citas" : "Recetas"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollable">
        {tab === "appointments" && (
          <div className="px-4 py-4 space-y-5">
            {/* Upcoming */}
            <div>
              <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Próximas citas</p>
              <div className="space-y-3">
                {upcomingAppointments.map((appt) => (
                  <div key={appt.id} className="bg-white rounded-2xl p-4 border border-[#DDE5F0]">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={appt.doctor.photo} alt={appt.doctor.name} className="w-12 h-12 rounded-xl object-cover bg-[#EEF4FD]" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#0F172A] text-sm truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
                          {appt.doctor.name}
                        </p>
                        <p className="text-xs text-[#64748B]">{appt.doctor.specialty}</p>
                      </div>
                      <span
                        className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                          appt.type === "virtual" ? "bg-[#EBF2FF] text-[#1A6EF2]" : "bg-[#DCFCE7] text-[#16A34A]"
                        }`}
                      >
                        {appt.type === "virtual" ? <Video size={9} /> : <MapPin size={9} />}
                        {appt.type === "virtual" ? "Virtual" : "Presencial"}
                      </span>
                    </div>
                    <div className="bg-[#EEF4FD] rounded-xl px-3 py-2 mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-[#64748B]">Fecha y hora</p>
                        <p className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                          {appt.date} · {appt.time}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-full font-medium">
                        Confirmada
                      </span>
                    </div>
                    {appt.type === "virtual" && (
                      <button
                        onClick={() => onNavigate("video")}
                        className="w-full flex items-center justify-center gap-2 bg-[#1A6EF2] text-white font-bold py-3 rounded-xl text-sm"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        <Video size={15} />
                        Unirse a la consulta
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Past */}
            <div>
              <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3">Historial</p>
              <div className="space-y-2">
                {pastAppointments.map((appt) => (
                  <div key={appt.id} className="bg-white rounded-2xl p-4 border border-[#DDE5F0] flex items-center gap-3">
                    <img src={appt.doctor.photo} alt={appt.doctor.name} className="w-10 h-10 rounded-xl object-cover bg-[#EEF4FD] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0F172A] text-sm truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {appt.doctor.name}
                      </p>
                      <p className="text-[10px] text-[#64748B]">{appt.date} · {appt.time}</p>
                    </div>
                    <span
                      className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                        appt.status === "completada"
                          ? "bg-[#EEF4FD] text-[#64748B]"
                          : "bg-[#FEE2E2] text-[#DC2626]"
                      }`}
                    >
                      {appt.status === "completada" ? <Check size={9} /> : <X size={9} />}
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "prescriptions" && (
          <div className="px-4 py-4 space-y-3">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Recetas digitales</p>
            {prescriptions.map((rx) => (
              <div key={rx.id} className="bg-white rounded-2xl p-4 border border-[#DDE5F0]">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {rx.diagnosis}
                    </p>
                    <p className="text-xs text-[#64748B] mt-0.5">{rx.doctor}</p>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{rx.specialty} · {rx.date}</p>
                  </div>
                  <button className="flex items-center gap-1 bg-[#EBF2FF] text-[#1A6EF2] text-xs px-3 py-1.5 rounded-xl font-semibold flex-shrink-0">
                    <Download size={11} />
                    PDF
                  </button>
                </div>
                <div className="space-y-1.5">
                  {rx.medications.map((med, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="w-4 h-4 rounded-full bg-[#EEF4FD] text-[#1A6EF2] text-[9px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-[#0F172A] leading-relaxed">{med}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
