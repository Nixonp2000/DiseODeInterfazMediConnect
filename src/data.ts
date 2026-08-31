export type ConsultType = "virtual" | "presencial";
export type AppointmentStatus = "confirmada" | "pendiente" | "completada" | "cancelada";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  rating: number;
  reviewCount: number;
  price: number;
  slots: string[];
  address: string;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: ConsultType;
  status: AppointmentStatus;
  reason: string;
}

export interface Prescription {
  id: string;
  date: string;
  doctor: string;
  specialty: string;
  diagnosis: string;
  medications: string[];
}

export interface VitalPoint {
  date: string;
  sistolica: number;
  diastolica: number;
  peso: number;
  glucosa: number;
}

export const specialties = [
  { id: "cardiologia", label: "Cardiología", emoji: "❤️", color: "#DC2626", bg: "#FEE2E2" },
  { id: "pediatria", label: "Pediatría", emoji: "🧒", color: "#2563EB", bg: "#DBEAFE" },
  { id: "ginecologia", label: "Ginecología", emoji: "🌸", color: "#DB2777", bg: "#FCE7F3" },
  { id: "general", label: "Medicina General", emoji: "🩺", color: "#16A34A", bg: "#DCFCE7" },
  { id: "dermatologia", label: "Dermatología", emoji: "✨", color: "#7C3AED", bg: "#EDE9FE" },
  { id: "traumatologia", label: "Traumatología", emoji: "🦴", color: "#EA580C", bg: "#FFF7ED" },
  { id: "neurologia", label: "Neurología", emoji: "🧠", color: "#0891B2", bg: "#CFFAFE" },
  { id: "psiquiatria", label: "Psiquiatría", emoji: "💬", color: "#059669", bg: "#D1FAE5" },
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dra. Ana García Rojas",
    specialty: "Cardiología",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&auto=format",
    rating: 4.9,
    reviewCount: 234,
    price: 85,
    slots: ["09:00", "10:30", "11:00", "14:00", "16:30"],
    address: "Clínica Metropolitana, Av. Principal 215",
  },
  {
    id: "2",
    name: "Dr. Carlos Mendoza Torres",
    specialty: "Pediatría",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&auto=format",
    rating: 4.7,
    reviewCount: 189,
    price: 60,
    slots: ["08:30", "10:00", "11:30", "15:00", "17:00"],
    address: "Centro Médico Los Alamos, Calle 4 Sur 88",
  },
  {
    id: "3",
    name: "Dra. Laura Vega Castillo",
    specialty: "Ginecología",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&auto=format",
    rating: 4.8,
    reviewCount: 312,
    price: 75,
    slots: ["09:30", "11:00", "12:30", "14:30", "16:00"],
    address: "Instituto de la Mujer, Blvd. Salud 340",
  },
  {
    id: "4",
    name: "Dr. Roberto Díaz Fuentes",
    specialty: "Medicina General",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&auto=format",
    rating: 4.6,
    reviewCount: 421,
    price: 45,
    slots: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
    address: "Consultorio Dr. Díaz, Calle Reforma 12",
  },
  {
    id: "5",
    name: "Dra. Isabel Moreno Reyes",
    specialty: "Dermatología",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&auto=format",
    rating: 4.9,
    reviewCount: 156,
    price: 90,
    slots: ["10:00", "11:30", "14:00", "15:30", "17:00"],
    address: "DermaClinic, Torre Médica B, Piso 6",
  },
  {
    id: "6",
    name: "Dr. Miguel Ángel Santos",
    specialty: "Traumatología",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop&auto=format",
    rating: 4.5,
    reviewCount: 98,
    price: 80,
    slots: ["09:00", "10:30", "12:00", "15:00", "16:30"],
    address: "Hospital Ortopédico Central, Av. Norte 780",
  },
  {
    id: "7",
    name: "Dra. Patricia Núñez Lima",
    specialty: "Neurología",
    photo: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=100&h=100&fit=crop&auto=format",
    rating: 4.8,
    reviewCount: 203,
    price: 95,
    slots: ["09:00", "11:00", "14:30", "16:00"],
    address: "Neuromed, Av. Científicos 55",
  },
  {
    id: "8",
    name: "Dr. Fernando Ruiz Espada",
    specialty: "Psiquiatría",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&auto=format",
    rating: 4.7,
    reviewCount: 177,
    price: 70,
    slots: ["10:00", "11:30", "15:00", "16:30", "18:00"],
    address: "Centro de Salud Mental, Paseo Verde 901",
  },
];

export const upcomingAppointments: Appointment[] = [
  {
    id: "a1",
    doctor: doctors[0],
    date: "Lun, 8 sep 2026",
    time: "10:30",
    type: "virtual",
    status: "confirmada",
    reason: "Control mensual — hipertensión arterial",
  },
  {
    id: "a2",
    doctor: doctors[4],
    date: "Mié, 10 sep 2026",
    time: "15:00",
    type: "presencial",
    status: "confirmada",
    reason: "Revisión de lunar — sospecha queratosis seborreica",
  },
];

export const pastAppointments: Appointment[] = [
  {
    id: "b1",
    doctor: doctors[0],
    date: "Lun, 11 ago 2026",
    time: "10:30",
    type: "virtual",
    status: "completada",
    reason: "Control mensual — hipertensión arterial",
  },
  {
    id: "b2",
    doctor: doctors[1],
    date: "Mar, 22 jul 2026",
    time: "09:00",
    type: "presencial",
    status: "completada",
    reason: "Consulta pediátrica — tos persistente",
  },
  {
    id: "b3",
    doctor: doctors[3],
    date: "Jue, 10 jul 2026",
    time: "14:00",
    type: "virtual",
    status: "completada",
    reason: "Chequeo general anual",
  },
  {
    id: "b4",
    doctor: doctors[6],
    date: "Mar, 17 jun 2026",
    time: "09:00",
    type: "presencial",
    status: "cancelada",
    reason: "Cefalea crónica — evaluación neurológica",
  },
];

export const prescriptions: Prescription[] = [
  {
    id: "r1",
    date: "11 ago 2026",
    doctor: "Dra. Ana García Rojas",
    specialty: "Cardiología",
    diagnosis: "Hipertensión arterial esencial",
    medications: ["Atenolol 50mg — 1 comp. diario", "Losartán 50mg — 1 comp. diario", "Amlodipino 5mg — 1 comp. nocturno"],
  },
  {
    id: "r2",
    date: "22 jul 2026",
    doctor: "Dr. Carlos Mendoza Torres",
    specialty: "Pediatría",
    diagnosis: "Faringoamigdalitis bacteriana",
    medications: ["Amoxicilina 500mg — cada 8 h por 7 días", "Ibuprofeno 200mg — si fiebre o dolor", "Loratadina 10mg — 1 comp. nocturna"],
  },
  {
    id: "r3",
    date: "10 jul 2026",
    doctor: "Dr. Roberto Díaz Fuentes",
    specialty: "Medicina General",
    diagnosis: "Diabetes mellitus tipo 2",
    medications: ["Metformina 850mg — 1 comp. con almuerzo y cena", "Sitagliptina 100mg — 1 comp. diario en ayunas"],
  },
];

export const vitalsData: VitalPoint[] = [
  { date: "7 jul", sistolica: 142, diastolica: 88, peso: 74.5, glucosa: 118 },
  { date: "14 jul", sistolica: 138, diastolica: 85, peso: 74.2, glucosa: 112 },
  { date: "21 jul", sistolica: 135, diastolica: 83, peso: 73.8, glucosa: 108 },
  { date: "28 jul", sistolica: 132, diastolica: 82, peso: 73.5, glucosa: 115 },
  { date: "4 ago", sistolica: 128, diastolica: 80, peso: 73.1, glucosa: 105 },
  { date: "11 ago", sistolica: 125, diastolica: 78, peso: 72.8, glucosa: 102 },
  { date: "18 ago", sistolica: 122, diastolica: 77, peso: 72.5, glucosa: 98 },
  { date: "25 ago", sistolica: 120, diastolica: 76, peso: 72.2, glucosa: 96 },
];
