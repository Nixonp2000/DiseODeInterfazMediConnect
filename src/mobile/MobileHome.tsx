import { Video, MapPin, Bell, Search, ChevronRight, Activity } from "lucide-react";
import { upcomingAppointments, specialties } from "../data";

interface Props {
  onNavigate: (screen: string) => void;
}

export default function MobileHome({ onNavigate }: Props) {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollable bg-[#EEF4FD]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(135deg, #0D1E35 0%, #1A3A5C 100%)" }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/60 text-xs mb-0.5">Bienvenida de vuelta</p>
            <h1 className="text-white text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
              María López 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Bell size={18} className="text-white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format"
              alt="Perfil"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#1A6EF2]/60"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5">
          <Search size={15} className="text-white/60" />
          <span className="text-white/40 text-sm">Buscar médico, especialidad...</span>
        </div>
      </div>

      <div className="px-4 space-y-5 py-5">
        {/* Next appointment highlight */}
        {upcomingAppointments[0] && (
          <div className="bg-[#1A6EF2] rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-8 -mt-8" />
            <div className="absolute bottom-0 right-8 w-20 h-20 rounded-full bg-white/5 -mb-6" />
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span className="text-white/70 text-xs font-medium">Próxima cita</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={upcomingAppointments[0].doctor.photo}
                  alt={upcomingAppointments[0].doctor.name}
                  className="w-11 h-11 rounded-xl object-cover bg-white/20 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {upcomingAppointments[0].doctor.name}
                  </p>
                  <p className="text-white/70 text-xs">{upcomingAppointments[0].doctor.specialty}</p>
                </div>
                <span className="flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  <Video size={10} /> Virtual
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{upcomingAppointments[0].date}</p>
                  <p className="text-white/70 text-xs">{upcomingAppointments[0].time} hs</p>
                </div>
                <button
                  onClick={() => onNavigate("video")}
                  className="bg-white text-[#1A6EF2] font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Unirse
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Citas\neste mes", value: "3", icon: "📅", bg: "bg-white" },
            { label: "Presión\nmm Hg", value: "120/76", icon: "❤️", bg: "bg-white" },
            { label: "Glucosa\nmg/dL", value: "96", icon: "📊", bg: "bg-white" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-3 border border-[#DDE5F0] text-center`}>
              <div className="text-xl mb-1">{s.icon}</div>
              <p className="text-base font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>{s.value}</p>
              <p className="text-[10px] text-[#64748B] leading-tight whitespace-pre-line">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Specialties */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-[#0F172A] text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
              Especialidades
            </h2>
            <button
              onClick={() => onNavigate("schedule")}
              className="flex items-center gap-0.5 text-xs text-[#1A6EF2] font-medium"
            >
              Ver todas <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {specialties.slice(0, 8).map((sp) => (
              <button
                key={sp.id}
                onClick={() => onNavigate("schedule")}
                className="flex flex-col items-center gap-1.5 p-2.5 bg-white rounded-2xl border border-[#DDE5F0] hover:border-[#1A6EF2]/40 hover:bg-[#EBF2FF] transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: sp.bg }}>
                  {sp.emoji}
                </div>
                <p className="text-[9px] text-[#64748B] text-center leading-tight font-medium">{sp.label.replace(" ", "\n")}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Second appointment */}
        {upcomingAppointments[1] && (
          <div>
            <h2 className="font-bold text-[#0F172A] text-sm mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              También tienes próximamente
            </h2>
            <div className="bg-white rounded-2xl p-4 border border-[#DDE5F0]">
              <div className="flex items-center gap-3">
                <img
                  src={upcomingAppointments[1].doctor.photo}
                  alt={upcomingAppointments[1].doctor.name}
                  className="w-12 h-12 rounded-xl object-cover bg-[#EEF4FD]"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0F172A] text-sm truncate" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {upcomingAppointments[1].doctor.name}
                  </p>
                  <p className="text-xs text-[#64748B]">{upcomingAppointments[1].doctor.specialty}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={10} className="text-[#16A34A]" />
                    <span className="text-xs text-[#64748B]">
                      {upcomingAppointments[1].date} · {upcomingAppointments[1].time}
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-[#EEF4FD] text-[#1A6EF2]">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vital sign tip */}
        <div className="bg-[#DCFCE7] rounded-2xl p-4 border border-[#16A34A]/20">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={14} className="text-[#16A34A]" />
            <span className="text-xs font-bold text-[#16A34A]" style={{ fontFamily: "Outfit, sans-serif" }}>Tendencia positiva</span>
          </div>
          <p className="text-xs text-[#166534] leading-relaxed">
            Tu presión arterial bajó de 142/88 a 120/76 mmHg en 8 semanas. Excelente progreso con el tratamiento de Dra. García.
          </p>
        </div>
      </div>
    </div>
  );
}
