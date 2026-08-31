import { useState } from "react";
import {
  Video,
  MapPin,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";
import { specialties, doctors, type Doctor, type ConsultType } from "../data";

interface Props {
  onNavigate: (page: string) => void;
}

const STEPS = ["Tipo", "Especialidad", "Médico", "Horario", "Pago"];

const CALENDAR_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const AVAILABLE_DAYS = [8, 10, 15, 17, 22, 24, 29, 30];
const SEPTEMBER_OFFSET = 1; // Sep 1 2026 = Tuesday (index 1)

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                i < current
                  ? "bg-[#16A34A] text-white"
                  : i === current
                  ? "bg-[#1A6EF2] text-white ring-4 ring-[#EBF2FF]"
                  : "bg-[#EEF4FD] text-[#94A3B8] border border-[#DDE5F0]"
              }`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                i === current ? "text-[#1A6EF2]" : i < current ? "text-[#16A34A]" : "text-[#94A3B8]"
              }`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mb-5 transition-colors duration-300 ${i < current ? "bg-[#16A34A]" : "bg-[#DDE5F0]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingFlow({ onNavigate }: Props) {
  const [step, setStep] = useState(0);
  const [consultType, setConsultType] = useState<ConsultType | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "transfer">("card");
  const [booked, setBooked] = useState(false);

  const filteredDoctors = doctors.filter((d) => {
    if (selectedSpecialty && d.specialty !== specialties.find((s) => s.id === selectedSpecialty)?.label) return false;
    if (filterRating > 0 && d.rating < filterRating) return false;
    return true;
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (booked) {
    return (
      <div className="p-8 max-w-2xl mx-auto h-full flex items-center justify-center">
        <div className="bg-white rounded-2xl p-10 border border-[#DDE5F0] text-center shadow-sm">
          <div className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={40} className="text-[#16A34A]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
            ¡Cita confirmada!
          </h2>
          <p className="text-[#64748B] mb-6">
            Tu cita con <strong>{selectedDoctor?.name}</strong> el <strong>martes 8 de septiembre</strong> a las{" "}
            <strong>{selectedSlot}</strong> ha sido registrada. Recibirás un recordatorio 24 h antes.
          </p>
          <div className="bg-[#EEF4FD] rounded-xl p-4 text-left mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Médico</span>
              <span className="font-medium text-[#0F172A]">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Tipo</span>
              <span className="font-medium text-[#0F172A] capitalize">{consultType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Fecha</span>
              <span className="font-medium text-[#0F172A]">Mar, 8 sep 2026 · {selectedSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Total pagado</span>
              <span className="font-semibold text-[#16A34A]">${selectedDoctor?.price}.00</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-full bg-[#1A6EF2] hover:bg-[#1558D0] text-white font-semibold py-3 rounded-xl transition-colors"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Ir al panel principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto scrollable overflow-y-auto h-full">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => (step === 0 ? onNavigate("dashboard") : back())} className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-[#DDE5F0] transition-all text-[#64748B]">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
            Agendar nueva cita
          </h1>
          <p className="text-sm text-[#64748B]">Paso {step + 1} de {STEPS.length}</p>
        </div>
      </div>

      <StepIndicator current={step} />

      {/* Step 0 — Tipo de consulta */}
      {step === 0 && (
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
            ¿Cómo prefieres tu consulta?
          </h2>
          <p className="text-sm text-[#64748B] mb-6">Selecciona la modalidad que mejor se adapte a ti</p>
          <div className="grid grid-cols-2 gap-5">
            {[
              {
                type: "virtual" as ConsultType,
                title: "Consulta Virtual",
                desc: "Videollamada HD con tu médico desde casa, trabajo o cualquier lugar.",
                icon: <Video size={32} />,
                features: ["Sin desplazamientos", "Grabación disponible", "Receta digital inmediata"],
                color: "#1A6EF2",
                bg: "bg-[#EBF2FF]",
                border: "border-[#1A6EF2]",
              },
              {
                type: "presencial" as ConsultType,
                title: "Consulta Presencial",
                desc: "Visita al consultorio del médico con exploración física completa.",
                icon: <MapPin size={32} />,
                features: ["Exploración clínica", "Pruebas en sitio", "Atención personalizada"],
                color: "#16A34A",
                bg: "bg-[#DCFCE7]",
                border: "border-[#16A34A]",
              },
            ].map((opt) => (
              <button
                key={opt.type}
                onClick={() => {
                  setConsultType(opt.type);
                  next();
                }}
                className={`relative text-left p-7 rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${
                  consultType === opt.type ? `${opt.border} bg-white shadow-md` : "border-[#DDE5F0] bg-white hover:border-gray-300"
                }`}
              >
                {consultType === opt.type && (
                  <span className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: opt.color }}>
                    <Check size={12} className="text-white" />
                  </span>
                )}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${opt.bg}`} style={{ color: opt.color }}>
                  {opt.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {opt.title}
                </h3>
                <p className="text-sm text-[#64748B] mb-4 leading-relaxed">{opt.desc}</p>
                <ul className="space-y-1.5">
                  {opt.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: opt.color }}>
                      <Check size={13} />
                      <span className="text-[#0F172A]">{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Especialidad */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
            Elige la especialidad médica
          </h2>
          <p className="text-sm text-[#64748B] mb-6">¿Qué tipo de atención necesitas hoy?</p>
          <div className="grid grid-cols-4 gap-4">
            {specialties.map((sp) => (
              <button
                key={sp.id}
                onClick={() => {
                  setSelectedSpecialty(sp.id);
                  next();
                }}
                className={`p-5 rounded-2xl border-2 text-center transition-all duration-200 hover:shadow-md ${
                  selectedSpecialty === sp.id
                    ? "border-[#1A6EF2] bg-[#EBF2FF]"
                    : "border-[#DDE5F0] bg-white hover:border-[#94A3B8]"
                }`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl"
                  style={{ background: sp.bg }}
                >
                  {sp.emoji}
                </div>
                <p className="text-sm font-semibold text-[#0F172A] leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {sp.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Doctor */}
      {step === 2 && (
        <div className="flex gap-6">
          {/* Filters */}
          <aside className="w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0] sticky top-0">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={15} className="text-[#64748B]" />
                <span className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>Filtros</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Valoración mínima</p>
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setFilterRating(r)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${
                        filterRating === r ? "bg-[#EBF2FF] text-[#1A6EF2] font-medium" : "text-[#64748B] hover:bg-[#EEF4FD]"
                      }`}
                    >
                      <Star size={12} className={filterRating === r ? "text-[#FBBF24] fill-[#FBBF24]" : "text-[#94A3B8]"} />
                      {r === 0 ? "Todos" : `${r}+ estrellas`}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Disponibilidad</p>
                  {["Hoy", "Esta semana", "Cualquiera"].map((d) => (
                    <button key={d} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#64748B] hover:bg-[#EEF4FD] mb-1 transition-colors text-left">
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Doctor list */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                {filteredDoctors.length} médico{filteredDoctors.length !== 1 ? "s" : ""} disponibles
              </h2>
            </div>
            {filteredDoctors.map((doc) => (
              <button
                key={doc.id}
                onClick={() => { setSelectedDoctor(doc); next(); }}
                className={`w-full text-left bg-white rounded-2xl p-5 border-2 transition-all duration-200 hover:shadow-md ${
                  selectedDoctor?.id === doc.id ? "border-[#1A6EF2]" : "border-[#DDE5F0] hover:border-[#94A3B8]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img src={doc.photo} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover bg-[#EEF4FD]" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                          {doc.name}
                        </p>
                        <p className="text-sm text-[#64748B]">{doc.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < Math.floor(doc.rating) ? "text-[#FBBF24] fill-[#FBBF24]" : "text-[#DDE5F0]"}
                            />
                          ))}
                          <span className="text-xs text-[#64748B] ml-1">{doc.rating} ({doc.reviewCount} reseñas)</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                          ${doc.price}
                        </p>
                        <p className="text-xs text-[#64748B]">por consulta</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {doc.slots.slice(0, 4).map((s) => (
                        <span key={s} className="text-xs px-2.5 py-1 bg-[#EEF4FD] text-[#1A6EF2] rounded-full font-medium border border-[#EBF2FF]">
                          {s}
                        </span>
                      ))}
                      {doc.slots.length > 4 && (
                        <span className="text-xs px-2.5 py-1 bg-[#EEF4FD] text-[#64748B] rounded-full">
                          +{doc.slots.length - 4} más
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — Calendar */}
      {step === 3 && (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Selecciona la fecha
            </h2>
            <p className="text-sm text-[#64748B] mb-5">Septiembre 2026</p>
            <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0]">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button className="p-1.5 rounded-lg hover:bg-[#EEF4FD] transition-colors"><ChevronLeft size={18} className="text-[#64748B]" /></button>
                <span className="font-semibold text-[#0F172A] text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>Septiembre 2026</span>
                <button className="p-1.5 rounded-lg hover:bg-[#EEF4FD] transition-colors"><ChevronRight size={18} className="text-[#64748B]" /></button>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {CALENDAR_DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-[#94A3B8] py-1" style={{ fontFamily: "DM Mono, monospace" }}>{d}</div>
                ))}
              </div>
              {/* Day grid */}
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: SEPTEMBER_OFFSET }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const isAvail = AVAILABLE_DAYS.includes(day);
                  const isSelected = selectedDay === day;
                  const isPast = day < 8;
                  return (
                    <button
                      key={day}
                      disabled={!isAvail || isPast}
                      onClick={() => setSelectedDay(day)}
                      className={`w-9 h-9 mx-auto rounded-xl text-sm flex items-center justify-center transition-all duration-150 font-medium ${
                        isSelected
                          ? "bg-[#1A6EF2] text-white font-bold"
                          : isAvail && !isPast
                          ? "text-[#1A6EF2] bg-[#EBF2FF] hover:bg-[#1A6EF2] hover:text-white cursor-pointer"
                          : "text-[#CBD5E1] cursor-not-allowed"
                      }`}
                      style={{ fontFamily: "DM Mono, monospace" }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#DDE5F0] text-xs text-[#64748B]">
                <span className="w-3 h-3 rounded bg-[#EBF2FF] border border-[#1A6EF2]" /> Disponible
                <span className="w-3 h-3 rounded bg-[#1A6EF2]" /> Seleccionado
              </div>
            </div>
          </div>

          {/* Time slots */}
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Elige el horario
            </h2>
            <p className="text-sm text-[#64748B] mb-5">
              {selectedDay ? `${selectedDay} de septiembre 2026` : "Selecciona primero una fecha"}
            </p>
            {selectedDoctor && selectedDay ? (
              <div className="grid grid-cols-3 gap-3">
                {selectedDoctor.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => { setSelectedSlot(slot); next(); }}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 ${
                      selectedSlot === slot
                        ? "bg-[#1A6EF2] border-[#1A6EF2] text-white"
                        : "border-[#DDE5F0] text-[#0F172A] hover:border-[#1A6EF2] hover:bg-[#EBF2FF] bg-white"
                    }`}
                    style={{ fontFamily: "DM Mono, monospace" }}
                  >
                    <Clock size={13} />
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#DDE5F0] p-8 text-center text-[#94A3B8] text-sm">
                Selecciona una fecha disponible para ver los horarios del médico
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 4 — Payment */}
      {step === 4 && selectedDoctor && (
        <div className="grid grid-cols-2 gap-8">
          {/* Summary */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
              Resumen de tu cita
            </h2>
            <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0] space-y-4">
              <div className="flex items-center gap-3">
                <img src={selectedDoctor.photo} alt={selectedDoctor.name} className="w-14 h-14 rounded-xl object-cover bg-[#EEF4FD]" />
                <div>
                  <p className="font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>{selectedDoctor.name}</p>
                  <p className="text-sm text-[#64748B]">{selectedDoctor.specialty}</p>
                </div>
              </div>
              <div className="border-t border-[#DDE5F0] pt-4 space-y-2 text-sm">
                {[
                  ["Tipo de consulta", consultType === "virtual" ? "Virtual (videollamada)" : "Presencial"],
                  ["Fecha", selectedDay ? `${selectedDay} de septiembre 2026` : "—"],
                  ["Hora", selectedSlot ?? "—"],
                  ...(consultType === "presencial" ? [["Dirección", selectedDoctor.address]] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[#64748B]">{label}</span>
                    <span className="font-medium text-[#0F172A] text-right max-w-[200px]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#DDE5F0] pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Consulta médica</span>
                  <span>${selectedDoctor.price}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Cargo de plataforma</span>
                  <span>$3.50</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t border-[#DDE5F0]" style={{ fontFamily: "Outfit, sans-serif" }}>
                  <span>Total</span>
                  <span className="text-[#1A6EF2]">${selectedDoctor.price + 3.5}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] bg-[#DCFCE7] rounded-xl px-4 py-3">
              <Shield size={14} className="text-[#16A34A]" />
              Pago cifrado con SSL · Reembolso garantizado si cancelas con 24 h de anticipación
            </div>
          </div>

          {/* Payment form */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
              Método de pago
            </h2>
            <div className="flex gap-2 mb-4">
              {(["card", "paypal", "transfer"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                    paymentMethod === m ? "border-[#1A6EF2] bg-[#EBF2FF] text-[#1A6EF2]" : "border-[#DDE5F0] text-[#64748B] hover:bg-[#EEF4FD] bg-white"
                  }`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {m === "card" ? "💳 Tarjeta" : m === "paypal" ? "🔵 PayPal" : "🏦 Transferencia"}
                </button>
              ))}
            </div>
            {paymentMethod === "card" && (
              <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0] space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Número de tarjeta</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim())}
                      placeholder="0000 0000 0000 0000"
                      className="w-full border border-[#DDE5F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2] placeholder:text-[#CBD5E1] bg-[#FAFBFE]"
                      style={{ fontFamily: "DM Mono, monospace" }}
                    />
                    <CreditCard size={16} className="absolute right-3 top-3.5 text-[#94A3B8]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Nombre del titular</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="María López García"
                    className="w-full border border-[#DDE5F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2] placeholder:text-[#CBD5E1] bg-[#FAFBFE]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Vencimiento</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / AA"
                      className="w-full border border-[#DDE5F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2] placeholder:text-[#CBD5E1] bg-[#FAFBFE]"
                      style={{ fontFamily: "DM Mono, monospace" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">CVV</label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                      placeholder="•••"
                      className="w-full border border-[#DDE5F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2] placeholder:text-[#CBD5E1] bg-[#FAFBFE]"
                      style={{ fontFamily: "DM Mono, monospace" }}
                    />
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === "paypal" && (
              <div className="bg-white rounded-2xl p-8 border border-[#DDE5F0] text-center">
                <div className="text-4xl mb-3">🔵</div>
                <p className="font-semibold text-[#0F172A] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>Pagar con PayPal</p>
                <p className="text-sm text-[#64748B]">Serás redirigido a PayPal para completar tu pago de forma segura.</p>
              </div>
            )}
            {paymentMethod === "transfer" && (
              <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0] text-sm space-y-2 text-[#0F172A]">
                <p className="font-semibold" style={{ fontFamily: "Outfit, sans-serif" }}>Datos de transferencia</p>
                <div className="bg-[#EEF4FD] rounded-xl p-4 space-y-1 font-mono text-xs">
                  <p>Banco: Banco Nacional</p>
                  <p>CLABE: 0211 8000 0000 0000 00</p>
                  <p>Beneficiario: MediConnect SA de CV</p>
                  <p>Concepto: CITA-{selectedDoctor.id.padStart(6, "0")}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setBooked(true)}
              className="w-full bg-[#1A6EF2] hover:bg-[#1558D0] active:bg-[#1045B8] text-white font-bold py-4 rounded-xl transition-all duration-150 text-base shadow-md shadow-blue-200"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Confirmar y pagar ${selectedDoctor.price + 3.5}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
