import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Clock, Check, MapPin, Video } from "lucide-react";
import { specialties, doctors, type Doctor, type ConsultType } from "../data";

interface Props {
  onNavigate: (screen: string) => void;
}

const CALENDAR_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const AVAILABLE = [8, 10, 15, 17, 22, 24, 29];

export default function MobileSchedule({ onNavigate }: Props) {
  const [step, setStep] = useState<"specialty" | "doctors" | "calendar" | "confirm">("specialty");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [consultType, setConsultType] = useState<ConsultType>("virtual");
  const [booked, setBooked] = useState(false);

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((d) => d.specialty === specialties.find((s) => s.id === selectedSpecialty)?.label)
    : doctors;

  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center bg-[#EEF4FD]">
        <div className="w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center mb-5">
          <Check size={36} className="text-[#16A34A]" />
        </div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
          ¡Cita agendada!
        </h2>
        <p className="text-sm text-[#64748B] mb-6">
          Tu cita con <strong>{selectedDoctor?.name}</strong> está confirmada para el{" "}
          <strong>{selectedDay} de septiembre a las {selectedSlot}</strong>.
        </p>
        <button
          onClick={() => { setBooked(false); setStep("specialty"); }}
          className="w-full bg-[#1A6EF2] text-white font-bold py-3.5 rounded-2xl text-sm"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#EEF4FD] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-5 pb-4 bg-white border-b border-[#DDE5F0]">
        <div className="flex items-center gap-3">
          {step !== "specialty" && (
            <button
              onClick={() => {
                if (step === "doctors") setStep("specialty");
                else if (step === "calendar") setStep("doctors");
                else setStep("calendar");
              }}
              className="p-2 rounded-xl bg-[#EEF4FD] text-[#64748B]"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <div>
            <h1 className="font-bold text-[#0F172A] text-base" style={{ fontFamily: "Outfit, sans-serif" }}>
              {step === "specialty" ? "Elige especialidad" : step === "doctors" ? "Elige médico" : step === "calendar" ? "Fecha y hora" : "Confirmar cita"}
            </h1>
            <p className="text-xs text-[#64748B]">
              Paso {["specialty", "doctors", "calendar", "confirm"].indexOf(step) + 1} de 4
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-[#DDE5F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A6EF2] rounded-full transition-all duration-300"
            style={{ width: `${(["specialty", "doctors", "calendar", "confirm"].indexOf(step) + 1) * 25}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollable">
        {/* Step 1 - Specialty */}
        {step === "specialty" && (
          <div className="px-4 py-4 space-y-4">
            {/* Consult type */}
            <div className="grid grid-cols-2 gap-3">
              {(["virtual", "presencial"] as ConsultType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setConsultType(t)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 text-sm font-semibold transition-all ${
                    consultType === t
                      ? t === "virtual"
                        ? "border-[#1A6EF2] bg-[#EBF2FF] text-[#1A6EF2]"
                        : "border-[#16A34A] bg-[#DCFCE7] text-[#16A34A]"
                      : "border-[#DDE5F0] bg-white text-[#64748B]"
                  }`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {t === "virtual" ? <Video size={16} /> : <MapPin size={16} />}
                  {t === "virtual" ? "Virtual" : "Presencial"}
                </button>
              ))}
            </div>

            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Especialidades</p>
            <div className="grid grid-cols-2 gap-3">
              {specialties.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => { setSelectedSpecialty(sp.id); setStep("doctors"); }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all bg-white ${
                    selectedSpecialty === sp.id ? "border-[#1A6EF2] bg-[#EBF2FF]" : "border-[#DDE5F0] hover:border-[#94A3B8]"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: sp.bg }}>
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

        {/* Step 2 - Doctors */}
        {step === "doctors" && (
          <div className="px-4 py-4 space-y-3">
            <p className="text-xs text-[#64748B]">{filteredDoctors.length} médicos disponibles</p>
            {filteredDoctors.map((doc) => (
              <button
                key={doc.id}
                onClick={() => { setSelectedDoctor(doc); setStep("calendar"); }}
                className={`w-full text-left bg-white rounded-2xl p-4 border-2 transition-all ${
                  selectedDoctor?.id === doc.id ? "border-[#1A6EF2]" : "border-[#DDE5F0]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-14 h-14 rounded-xl object-cover bg-[#EEF4FD] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-[#0F172A] text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {doc.name}
                      </p>
                      <p className="text-base font-bold text-[#0F172A] flex-shrink-0" style={{ fontFamily: "Outfit, sans-serif" }}>
                        ${doc.price}
                      </p>
                    </div>
                    <p className="text-xs text-[#64748B]">{doc.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < Math.floor(doc.rating) ? "text-[#FBBF24] fill-[#FBBF24]" : "text-[#DDE5F0]"} />
                      ))}
                      <span className="text-[10px] text-[#64748B] ml-0.5">{doc.rating} ({doc.reviewCount})</span>
                    </div>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {doc.slots.slice(0, 3).map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 bg-[#EEF4FD] text-[#1A6EF2] rounded-full border border-[#DDE5F0]" style={{ fontFamily: "DM Mono, monospace" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 3 - Calendar */}
        {step === "calendar" && (
          <div className="px-4 py-4 space-y-5">
            {/* Calendar */}
            <div className="bg-white rounded-2xl border border-[#DDE5F0] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#DDE5F0]">
                <button className="p-1.5 rounded-lg hover:bg-[#EEF4FD]"><ChevronLeft size={16} className="text-[#64748B]" /></button>
                <span className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>Septiembre 2026</span>
                <button className="p-1.5 rounded-lg hover:bg-[#EEF4FD]"><ChevronRight size={16} className="text-[#64748B]" /></button>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-7 mb-1">
                  {CALENDAR_DAYS.map((d) => (
                    <div key={d} className="text-center text-[10px] font-bold text-[#94A3B8] py-1" style={{ fontFamily: "DM Mono, monospace" }}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5">
                  <div />
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isAvail = AVAILABLE.includes(day);
                    const isSelected = selectedDay === day;
                    const isPast = day < 8;
                    return (
                      <button
                        key={day}
                        disabled={!isAvail || isPast}
                        onClick={() => setSelectedDay(day)}
                        className={`w-8 h-8 mx-auto rounded-xl text-xs flex items-center justify-center transition-all font-medium ${
                          isSelected
                            ? "bg-[#1A6EF2] text-white font-bold"
                            : isAvail && !isPast
                            ? "text-[#1A6EF2] bg-[#EBF2FF] hover:bg-[#1A6EF2] hover:text-white"
                            : "text-[#CBD5E1]"
                        }`}
                        style={{ fontFamily: "DM Mono, monospace" }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time slots */}
            {selectedDoctor && (
              <div>
                <p className="text-sm font-bold text-[#0F172A] mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {selectedDay ? `Horarios del ${selectedDay} sep` : "Selecciona una fecha primero"}
                </p>
                {selectedDay && (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDoctor.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => { setSelectedSlot(slot); setStep("confirm"); }}
                        className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm transition-all ${
                          selectedSlot === slot
                            ? "bg-[#1A6EF2] border-[#1A6EF2] text-white"
                            : "border-[#DDE5F0] text-[#0F172A] bg-white hover:border-[#1A6EF2] hover:bg-[#EBF2FF]"
                        }`}
                        style={{ fontFamily: "DM Mono, monospace" }}
                      >
                        <Clock size={12} />
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 4 - Confirm */}
        {step === "confirm" && selectedDoctor && (
          <div className="px-4 py-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#DDE5F0]">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#DDE5F0]">
                <img src={selectedDoctor.photo} alt={selectedDoctor.name} className="w-14 h-14 rounded-xl object-cover bg-[#EEF4FD]" />
                <div>
                  <p className="font-bold text-[#0F172A] text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{selectedDoctor.name}</p>
                  <p className="text-xs text-[#64748B]">{selectedDoctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className={i < Math.floor(selectedDoctor.rating) ? "text-[#FBBF24] fill-[#FBBF24]" : "text-[#DDE5F0]"} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Tipo", consultType === "virtual" ? "Virtual (videollamada)" : "Presencial"],
                  ["Fecha", selectedDay ? `${selectedDay} de septiembre 2026` : "—"],
                  ["Hora", selectedSlot ?? "—"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[#64748B]">{label}</span>
                    <span className="font-semibold text-[#0F172A]">{val}</span>
                  </div>
                ))}
                <div className="border-t border-[#DDE5F0] pt-3 flex justify-between">
                  <span className="font-bold text-[#0F172A]">Total</span>
                  <span className="font-bold text-[#1A6EF2] text-base">${selectedDoctor.price + 3.5}</span>
                </div>
              </div>
            </div>
            <div className="bg-[#DCFCE7] rounded-xl p-3 text-xs text-[#166534]">
              ✓ Pago seguro · Reembolso garantizado si cancelas con 24 h de anticipación
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {step === "confirm" && (
        <div className="flex-shrink-0 px-4 py-4 bg-white border-t border-[#DDE5F0]">
          <button
            onClick={() => setBooked(true)}
            className="w-full bg-[#1A6EF2] text-white font-bold py-4 rounded-2xl text-sm shadow-lg shadow-blue-200 transition-all active:bg-[#1045B8]"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Confirmar y pagar ${selectedDoctor ? selectedDoctor.price + 3.5 : "—"}
          </button>
        </div>
      )}
    </div>
  );
}
