import { useState } from "react";
import { Video, MapPin, Download, Check, X, CheckCircle } from "lucide-react";
import { pastAppointments, prescriptions } from "../data";

export default function HistoryProfile() {
  const [tab, setTab] = useState<"history" | "prescriptions" | "profile">("history");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "María López García",
    email: "maria.lopez@email.com",
    phone: "+52 55 1234 5678",
    dob: "1988-04-12",
    gender: "Femenino",
    blood: "A+",
    weight: "72.2",
    height: "165",
    allergies: "Penicilina, Ibuprofeno",
    conditions: "Hipertensión arterial, Diabetes tipo 2",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto scrollable overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Historial y Perfil
          </h1>
          <p className="text-sm text-[#64748B] mt-1">Consulta tu historial clínico y administra tu información</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#EEF4FD] p-1 rounded-xl mb-6 w-fit">
        {(["history", "prescriptions", "profile"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === t ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"
            }`}
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {t === "history" ? "Citas anteriores" : t === "prescriptions" ? "Recetas" : "Mi perfil"}
          </button>
        ))}
      </div>

      {/* History tab */}
      {tab === "history" && (
        <div className="space-y-3">
          {pastAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white rounded-2xl p-5 border border-[#DDE5F0] flex items-center gap-5 hover:shadow-sm transition-shadow"
            >
              <img
                src={appt.doctor.photo}
                alt={appt.doctor.name}
                className="w-14 h-14 rounded-xl object-cover bg-[#EEF4FD] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {appt.doctor.name}
                    </p>
                    <p className="text-sm text-[#64748B]">{appt.doctor.specialty}</p>
                    <p className="text-sm text-[#94A3B8] mt-1 truncate">{appt.reason}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium text-[#0F172A]">{appt.date}</p>
                    <p className="text-xs text-[#64748B]">{appt.time}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 justify-end">
                      <span
                        className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          appt.type === "virtual"
                            ? "bg-[#EBF2FF] text-[#1A6EF2]"
                            : "bg-[#DCFCE7] text-[#16A34A]"
                        }`}
                      >
                        {appt.type === "virtual" ? <Video size={10} /> : <MapPin size={10} />}
                        {appt.type === "virtual" ? "Virtual" : "Presencial"}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          appt.status === "completada"
                            ? "bg-[#DCFCE7] text-[#16A34A]"
                            : appt.status === "cancelada"
                            ? "bg-[#FEE2E2] text-[#DC2626]"
                            : "bg-[#FFF7ED] text-[#EA580C]"
                        }`}
                      >
                        {appt.status === "completada" ? <Check size={10} /> : <X size={10} />}
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescriptions tab */}
      {tab === "prescriptions" && (
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl p-6 border border-[#DDE5F0] hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-[#0F172A] text-lg leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {rx.diagnosis}
                  </h3>
                  <p className="text-sm text-[#64748B] mt-0.5">{rx.doctor} · {rx.specialty}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Emitida el {rx.date}</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#EBF2FF] text-[#1A6EF2] hover:bg-[#1A6EF2] hover:text-white rounded-xl text-sm font-semibold transition-all duration-150 flex-shrink-0">
                  <Download size={14} />
                  Descargar PDF
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {rx.medications.map((med, i) => (
                  <div key={i} className="bg-[#EEF4FD] rounded-xl px-4 py-3 border border-[#DDE5F0]">
                    <p className="text-xs text-[#64748B] mb-0.5">Medicamento {i + 1}</p>
                    <p className="text-sm font-medium text-[#0F172A]">{med}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Profile tab */}
      {tab === "profile" && (
        <div className="grid grid-cols-3 gap-6">
          {/* Avatar + quick info */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#DDE5F0] text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format"
                  alt="Perfil"
                  className="w-24 h-24 rounded-full object-cover bg-[#EEF4FD] ring-4 ring-[#EBF2FF]"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1A6EF2] rounded-full flex items-center justify-center text-white text-xs hover:bg-[#1558D0] transition-colors">
                  ✎
                </button>
              </div>
              <h3 className="font-bold text-[#0F172A] text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>
                {form.name}
              </h3>
              <p className="text-sm text-[#64748B]">{form.email}</p>
              <div className="mt-4 space-y-2 text-left">
                {[
                  ["Tipo sanguíneo", form.blood, "bg-[#FEE2E2] text-[#DC2626]"],
                  ["Alergias", "2 registradas", "bg-[#FFF7ED] text-[#EA580C]"],
                  ["Condiciones", "2 crónicas", "bg-[#EBF2FF] text-[#1A6EF2]"],
                ].map(([label, value, cls]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">{label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-[#DDE5F0]">
              <h3 className="font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                Datos personales
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Nombre completo", type: "text" },
                  { key: "email", label: "Correo electrónico", type: "email" },
                  { key: "phone", label: "Teléfono", type: "tel" },
                  { key: "dob", label: "Fecha de nacimiento", type: "date" },
                  { key: "gender", label: "Género", type: "text" },
                  { key: "blood", label: "Tipo sanguíneo", type: "text" },
                ].map(({ key, label, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-[#DDE5F0] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2] bg-[#FAFBFE] hover:border-[#94A3B8] transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#DDE5F0]">
              <h3 className="font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                Información médica
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "weight", label: "Peso (kg)" },
                  { key: "height", label: "Estatura (cm)" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">{label}</label>
                    <input
                      type="text"
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-[#DDE5F0] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2] bg-[#FAFBFE]"
                    />
                  </div>
                ))}
                {[
                  { key: "allergies", label: "Alergias conocidas" },
                  { key: "conditions", label: "Condiciones crónicas" },
                ].map(({ key, label }) => (
                  <div key={key} className="col-span-2">
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">{label}</label>
                    <input
                      type="text"
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-[#DDE5F0] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2] bg-[#FAFBFE]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#1A6EF2] hover:bg-[#1558D0] active:bg-[#1045B8] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {saved ? <CheckCircle size={16} /> : null}
                {saved ? "¡Cambios guardados!" : "Guardar cambios"}
              </button>
              <button className="px-6 py-3 rounded-xl border border-[#DDE5F0] text-[#64748B] hover:bg-[#EEF4FD] text-sm font-medium transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
