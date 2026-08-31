import { Check, AlertCircle, X, ChevronRight, Star, Download, Video, MapPin } from "lucide-react";

const colors = [
  { name: "Primary", hex: "#1A6EF2", text: "white", usage: "Acciones principales, CTAs, enlaces activos" },
  { name: "Primary Light", hex: "#EBF2FF", text: "#1A6EF2", usage: "Fondos de destacados, badges informativos" },
  { name: "Navy", hex: "#0D1E35", text: "white", usage: "Barra lateral, texto sobre fondos claros" },
  { name: "Success", hex: "#16A34A", text: "white", usage: "Confirmaciones, estados activos, valores óptimos" },
  { name: "Success Light", hex: "#DCFCE7", text: "#16A34A", usage: "Fondo de alertas positivas" },
  { name: "Warning", hex: "#EA580C", text: "white", usage: "Alertas, estados pendientes, valores elevados" },
  { name: "Warning Light", hex: "#FFF7ED", text: "#EA580C", usage: "Fondo de alertas de precaución" },
  { name: "Danger", hex: "#DC2626", text: "white", usage: "Errores, cancelaciones, finalizar acción" },
  { name: "Surface", hex: "#EEF4FD", text: "#0F172A", usage: "Fondo de página, separadores sutiles" },
  { name: "Border", hex: "#DDE5F0", text: "#0F172A", usage: "Bordes de cards, separadores, inputs inactivos" },
  { name: "Muted", hex: "#64748B", text: "white", usage: "Texto secundario, etiquetas, placeholders" },
  { name: "Text", hex: "#0F172A", text: "white", usage: "Texto principal — encabezados y cuerpo" },
];

export default function StyleGuide() {
  return (
    <div className="p-8 max-w-5xl mx-auto scrollable overflow-y-auto h-full space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
          Guía de Estilos — MediConnect
        </h1>
        <p className="text-sm text-[#64748B]">Referencia de tokens de diseño, tipografía y componentes del sistema</p>
      </div>

      {/* Colors */}
      <section>
        <h2 className="text-base font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Paleta de colores</h2>
        <div className="grid grid-cols-4 gap-4">
          {colors.map((c) => (
            <div key={c.name} className="bg-white rounded-2xl border border-[#DDE5F0] overflow-hidden">
              <div className="h-14 w-full" style={{ backgroundColor: c.hex }} />
              <div className="p-3">
                <p className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>{c.name}</p>
                <p className="text-xs text-[#64748B] font-mono mt-0.5">{c.hex}</p>
                <p className="text-xs text-[#94A3B8] mt-1 leading-tight">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-base font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Tipografía</h2>
        <div className="bg-white rounded-2xl border border-[#DDE5F0] p-6 space-y-5">
          {[
            { tag: "H1", style: "text-3xl font-bold", font: "Outfit", sample: "Título principal de página", desc: "32px · Bold · Outfit" },
            { tag: "H2", style: "text-2xl font-bold", font: "Outfit", sample: "Encabezado de sección", desc: "24px · Bold · Outfit" },
            { tag: "H3", style: "text-xl font-semibold", font: "Outfit", sample: "Subtítulo de componente", desc: "20px · Semibold · Outfit" },
            { tag: "Body", style: "text-base", font: "Source Sans 3", sample: "Texto de cuerpo: legible, neutral, accesible para información clínica.", desc: "16px · Regular · Source Sans 3" },
            { tag: "Small", style: "text-sm text-[#64748B]", font: "Source Sans 3", sample: "Etiquetas, metadatos, fechas, notas secundarias", desc: "14px · Regular · Source Sans 3" },
            { tag: "Mono", style: "text-sm font-mono", font: "DM Mono", sample: "09:30 · MX-001 · 120/76 mmHg", desc: "14px · Regular · DM Mono — datos, horarios, códigos" },
          ].map((item) => (
            <div key={item.tag} className="flex items-baseline gap-6 py-3 border-b border-[#DDE5F0] last:border-0">
              <span className="text-xs font-bold w-10 flex-shrink-0 text-[#1A6EF2]" style={{ fontFamily: "DM Mono, monospace" }}>{item.tag}</span>
              <p className={`flex-1 text-[#0F172A] ${item.style}`} style={{ fontFamily: `${item.font}, sans-serif` }}>{item.sample}</p>
              <span className="text-xs text-[#94A3B8] flex-shrink-0" style={{ fontFamily: "DM Mono, monospace" }}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-base font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Botones</h2>
        <div className="bg-white rounded-2xl border border-[#DDE5F0] p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="flex items-center gap-2 bg-[#1A6EF2] hover:bg-[#1558D0] active:bg-[#1045B8] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
              <Video size={15} /> Primario
            </button>
            <button className="flex items-center gap-2 border-2 border-[#1A6EF2] text-[#1A6EF2] hover:bg-[#EBF2FF] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
              Secundario
            </button>
            <button className="flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
              <Check size={15} /> Confirmar
            </button>
            <button className="flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
              <AlertCircle size={15} /> Alerta
            </button>
            <button className="flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
              <X size={15} /> Peligro
            </button>
            <button disabled className="flex items-center gap-2 bg-[#EEF4FD] text-[#CBD5E1] font-semibold px-5 py-2.5 rounded-xl text-sm cursor-not-allowed" style={{ fontFamily: "Outfit, sans-serif" }}>
              Deshabilitado
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-1.5 text-sm text-[#1A6EF2] hover:text-[#1558D0] font-medium transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>
              Ver todo <ChevronRight size={14} />
            </button>
            <button className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0F172A] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#EEF4FD]" style={{ fontFamily: "Outfit, sans-serif" }}>
              <Download size={13} /> Descargar PDF
            </button>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-base font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Badges y estados</h2>
        <div className="bg-white rounded-2xl border border-[#DDE5F0] p-6 flex flex-wrap gap-3">
          {[
            { label: "Virtual", icon: <Video size={11} />, cls: "bg-[#EBF2FF] text-[#1A6EF2]" },
            { label: "Presencial", icon: <MapPin size={11} />, cls: "bg-[#DCFCE7] text-[#16A34A]" },
            { label: "Confirmada", icon: <Check size={11} />, cls: "bg-[#DCFCE7] text-[#16A34A]" },
            { label: "Pendiente", icon: <AlertCircle size={11} />, cls: "bg-[#FFF7ED] text-[#EA580C]" },
            { label: "Cancelada", icon: <X size={11} />, cls: "bg-[#FEE2E2] text-[#DC2626]" },
            { label: "Completada", icon: <Check size={11} />, cls: "bg-[#EEF4FD] text-[#64748B]" },
          ].map((b) => (
            <span key={b.label} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${b.cls}`} style={{ fontFamily: "Outfit, sans-serif" }}>
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-base font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Cards de doctor</h2>
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((i) => {
            const doc = [
              { name: "Dra. Ana García Rojas", specialty: "Cardiología", photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&auto=format", rating: 4.9, reviews: 234, price: 85 },
              { name: "Dr. Carlos Mendoza Torres", specialty: "Pediatría", photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&auto=format", rating: 4.7, reviews: 189, price: 60 },
            ][i];
            return (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#DDE5F0] hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={doc.photo} alt={doc.name} className="w-14 h-14 rounded-xl object-cover bg-[#EEF4FD]" />
                  <div className="flex-1">
                    <p className="font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>{doc.name}</p>
                    <p className="text-sm text-[#64748B]">{doc.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={11} className={j < Math.floor(doc.rating) ? "text-[#FBBF24] fill-[#FBBF24]" : "text-[#DDE5F0]"} />
                      ))}
                      <span className="text-xs text-[#64748B] ml-1">{doc.rating} ({doc.reviews})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>${doc.price}</p>
                    <p className="text-xs text-[#64748B]">por consulta</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Form inputs */}
      <section>
        <h2 className="text-base font-bold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Inputs de formulario</h2>
        <div className="bg-white rounded-2xl border border-[#DDE5F0] p-6 grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Normal</label>
            <input type="text" placeholder="Escribe aquí..." className="w-full border border-[#DDE5F0] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] bg-[#FAFBFE] focus:outline-none focus:ring-2 focus:ring-[#1A6EF2] focus:border-[#1A6EF2]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Con valor</label>
            <input type="text" defaultValue="María López García" className="w-full border border-[#1A6EF2] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] bg-[#FAFBFE] focus:outline-none ring-2 ring-[#EBF2FF]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#DC2626] mb-1.5">Con error</label>
            <input type="text" defaultValue="fecha-inválida" className="w-full border-2 border-[#DC2626] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] bg-[#FFF8F8] focus:outline-none ring-2 ring-[#FEE2E2]" />
            <p className="text-xs text-[#DC2626] mt-1">⚠ Formato de fecha incorrecto</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#16A34A] mb-1.5">Válido</label>
            <div className="relative">
              <input type="email" defaultValue="maria@email.com" className="w-full border-2 border-[#16A34A] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] bg-[#F0FFF4] focus:outline-none pr-10" />
              <Check size={16} className="absolute right-3 top-3 text-[#16A34A]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
