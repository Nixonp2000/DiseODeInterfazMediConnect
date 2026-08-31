import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Video,
  MapPin,
  RotateCcw,
  Download,
  ChevronRight,
  Activity,
  TrendingDown,
  Weight,
} from "lucide-react";
import { upcomingAppointments, prescriptions, vitalsData, type Appointment, type Prescription } from "../data";

type VitalTab = "presion" | "peso" | "glucosa";

interface Props {
  onNavigate: (page: string) => void;
}

function AppointmentCard({ appt, onNavigate }: { appt: Appointment; onNavigate: (p: string) => void }) {
  const isVirtual = appt.type === "virtual";
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0] hover:shadow-md transition-shadow duration-200 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={appt.doctor.photo}
              alt={appt.doctor.name}
              className="w-12 h-12 rounded-full object-cover bg-[#EEF4FD]"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                appt.status === "confirmada" ? "bg-[#16A34A]" : "bg-[#EA580C]"
              }`}
            />
          </div>
          <div>
            <p className="font-semibold text-[#0F172A] text-sm leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              {appt.doctor.name}
            </p>
            <p className="text-xs text-[#64748B] mt-0.5">{appt.doctor.specialty}</p>
          </div>
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
            isVirtual
              ? "bg-[#EBF2FF] text-[#1A6EF2]"
              : "bg-[#DCFCE7] text-[#16A34A]"
          }`}
        >
          {isVirtual ? <Video size={11} /> : <MapPin size={11} />}
          {isVirtual ? "Virtual" : "Presencial"}
        </span>
      </div>

      <div className="bg-[#EEF4FD] rounded-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#64748B]">Fecha y hora</p>
            <p className="text-sm font-semibold text-[#0F172A] mt-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>
              {appt.date} · {appt.time}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#64748B]">Motivo</p>
            <p className="text-xs text-[#0F172A] mt-0.5 max-w-[140px] text-right leading-snug">{appt.reason}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {isVirtual ? (
          <button
            onClick={() => {}}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1A6EF2] hover:bg-[#1558D0] active:bg-[#1045B8] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-150"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <Video size={15} />
            Ingresar a consulta
          </button>
        ) : (
          <button
            onClick={() => {}}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1A6EF2] hover:bg-[#1558D0] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-150"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <MapPin size={15} />
            Ver indicaciones
          </button>
        )}
        <button
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#DDE5F0] text-[#64748B] hover:bg-[#EEF4FD] text-sm transition-colors duration-150"
          title="Reprogramar"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}

function PrescriptionRow({ rx }: { rx: Prescription }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#DDE5F0] last:border-0 hover:bg-[#EEF4FD] -mx-4 px-4 rounded-lg transition-colors duration-150 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
            {rx.diagnosis}
          </span>
        </div>
        <p className="text-xs text-[#64748B] mt-0.5">
          {rx.doctor} · {rx.specialty}
        </p>
        <p className="text-xs text-[#94A3B8] mt-0.5">{rx.medications.length} medicamentos · {rx.date}</p>
      </div>
      <button className="flex items-center gap-1.5 ml-4 px-3 py-1.5 rounded-lg border border-[#DDE5F0] text-[#1A6EF2] hover:bg-[#EBF2FF] text-xs font-medium transition-colors duration-150 group-hover:border-[#1A6EF2]">
        <Download size={12} />
        PDF
      </button>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#DDE5F0] rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-[#0F172A] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[#64748B]">{entry.name}:</span>
          <span className="font-medium text-[#0F172A]">{entry.value}{entry.name.includes("Peso") ? " kg" : entry.name.includes("Glucosa") ? " mg/dL" : " mmHg"}</span>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard({ onNavigate }: Props) {
  const [vitalTab, setVitalTab] = useState<VitalTab>("presion");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-7 scrollable overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Buenos días, María 👋
          </h1>
          <p className="text-[#64748B] text-sm mt-1">
            Lunes, 31 de agosto de 2026 · Tu salud, nuestra prioridad
          </p>
        </div>
        <button
          onClick={() => onNavigate("booking")}
          className="flex items-center gap-2 bg-[#1A6EF2] hover:bg-[#1558D0] active:bg-[#1045B8] text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm shadow-blue-200 transition-all duration-150"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          + Agendar cita
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Citas este mes", value: "3", sub: "1 pendiente de confirmación", icon: <Activity size={18} className="text-[#1A6EF2]" />, bg: "bg-[#EBF2FF]" },
          { label: "Presión arterial", value: "120/76", sub: "mmHg · Óptima ↓", icon: <TrendingDown size={18} className="text-[#16A34A]" />, bg: "bg-[#DCFCE7]" },
          { label: "Peso actual", value: "72.2", sub: "kg · −2.3 kg este mes", icon: <Weight size={18} className="text-[#7C3AED]" />, bg: "bg-[#EDE9FE]" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#DDE5F0] flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-[#64748B]">{stat.label}</p>
              <p className="text-xl font-bold text-[#0F172A] leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                {stat.value}
              </p>
              <p className="text-xs text-[#94A3B8]">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Upcoming appointments — spans 2 cols */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
              Próximas citas
            </h2>
            <button
              onClick={() => onNavigate("appointments")}
              className="flex items-center gap-1 text-sm text-[#1A6EF2] hover:text-[#1558D0] font-medium transition-colors"
            >
              Ver todas <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {upcomingAppointments.map((a) => (
              <AppointmentCard key={a.id} appt={a} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Prescriptions */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
              Recetas digitales
            </h2>
            <button
              onClick={() => onNavigate("prescriptions")}
              className="text-sm text-[#1A6EF2] hover:text-[#1558D0] font-medium transition-colors"
            >
              Ver todas
            </button>
          </div>
          <div className="-mx-0">
            {prescriptions.map((rx) => (
              <PrescriptionRow key={rx.id} rx={rx} />
            ))}
          </div>
        </div>
      </div>

      {/* Vitals chart */}
      <div className="bg-white rounded-2xl p-6 border border-[#DDE5F0]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
              Seguimiento de signos vitales
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">Evolución de las últimas 8 semanas</p>
          </div>
          <div className="flex rounded-xl border border-[#DDE5F0] overflow-hidden text-sm">
            {(["presion", "peso", "glucosa"] as VitalTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setVitalTab(tab)}
                className={`px-4 py-1.5 font-medium transition-colors duration-150 ${
                  vitalTab === tab
                    ? "bg-[#1A6EF2] text-white"
                    : "text-[#64748B] hover:bg-[#EEF4FD]"
                }`}
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {tab === "presion" ? "Presión" : tab === "peso" ? "Peso" : "Glucosa"}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          {vitalTab === "presion" ? (
            <LineChart data={vitalsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 160]} tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: "Source Sans 3" }} />
              <Line type="monotone" dataKey="sistolica" name="Sistólica" stroke="#1A6EF2" strokeWidth={2.5} dot={{ r: 4, fill: "#1A6EF2" }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="diastolica" name="Diastólica" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: "#7C3AED" }} activeDot={{ r: 6 }} strokeDasharray="5 3" />
            </LineChart>
          ) : vitalTab === "peso" ? (
            <LineChart data={vitalsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 77]} tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="peso" name="Peso" stroke="#16A34A" strokeWidth={2.5} dot={{ r: 4, fill: "#16A34A" }} activeDot={{ r: 6 }} />
            </LineChart>
          ) : (
            <LineChart data={vitalsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 130]} tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="glucosa" name="Glucosa" stroke="#EA580C" strokeWidth={2.5} dot={{ r: 4, fill: "#EA580C" }} activeDot={{ r: 6 }} />
            </LineChart>
          )}
        </ResponsiveContainer>

        {/* Reference values */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#DDE5F0]">
          {vitalTab === "presion" && (
            <>
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <span className="w-6 h-0.5 bg-[#16A34A] rounded" />
                Rango normal: 90–120 / 60–80 mmHg
              </div>
              <div className="flex items-center gap-2 text-xs text-[#16A34A] font-medium">
                ✓ Tu presión está en rango óptimo
              </div>
            </>
          )}
          {vitalTab === "peso" && (
            <div className="flex items-center gap-2 text-xs text-[#16A34A] font-medium">
              ✓ IMC 24.3 · Peso normal · Tendencia a la baja
            </div>
          )}
          {vitalTab === "glucosa" && (
            <div className="flex items-center gap-2 text-xs text-[#16A34A] font-medium">
              ✓ Glucosa en ayunas 96 mg/dL · En rango normal (&lt;100)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
