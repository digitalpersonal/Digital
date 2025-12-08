

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  GUEST = 'GUEST'
}

export interface Anamnesis {
  hasInjury: boolean;
  injuryDescription?: string;
  takesMedication: boolean;
  medicationDescription?: string;
  hadSurgery: boolean;
  surgeryDescription?: string;
  hasHeartCondition: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodType?: string;
  notes?: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  joinDate: string;
  phoneNumber?: string; // Para contato via WhatsApp
  birthDate?: string; // YYYY-MM-DD
  address?: string; // Endereço completo para contrato
  anamnesis?: Anamnesis; // Ficha médica
  contractUrl?: string; // Base64 Data URI do PDF do contrato
  contractGeneratedAt?: string; // Data de geração do contrato
}

export interface ClassSession {
  id: string;
  title: string;
  description: string;
  dayOfWeek: string; // 'Monday', 'Tuesday', etc.
  startTime: string; // HH:mm
  durationMinutes: number;
  instructor: string;
  maxCapacity: number;
  enrolledStudentIds: string[];
  waitlistStudentIds: string[]; // Novo campo: Lista de Espera
  type: 'FUNCTIONAL' | 'RUNNING';
  isCancelled?: boolean; // Novo campo para status
  wod?: string; // Workout of the Day description
  feedback?: { studentId: string, rating: number }[]; // PSE ratings (1-10)
}

export interface PersonalizedWorkout {
  id: string;
  title: string;
  description: string; // Detalhes do treino, séries, repetições
  videoUrl?: string; // Link opcional para vídeo demonstrativo
  studentIds: string[]; // Lista de alunos que têm acesso a este treino
  createdAt: string;
  instructorName: string;
}

export interface Assessment {
  id: string;
  studentId: string;
  date: string;
  status: 'DONE' | 'SCHEDULED';
  notes: string;
  customMetrics?: { name: string, value: string, unit: string }[];

  // Composição Corporal Básica
  weight: number; // kg
  height: number; // cm
  bodyFatPercentage: number; // %
  skeletalMuscleMass?: number; // kg ou %
  visceralFatLevel?: number; // 1-59
  basalMetabolicRate?: number; // kcal
  hydrationPercentage?: number; // %

  // Funcional & Performance
  vo2Max?: number; 
  squatMax?: number; 
  flexibilitySitAndReach?: number; // cm
  pushUpsCount?: number;

  // Perimetria (Circunferências em cm)
  circumferences?: {
    chest?: number;
    shoulders?: number;
    rightArmRelaxed?: number;
    leftArmRelaxed?: number;
    rightArmContracted?: number;
    leftArmContracted?: number;
    waist?: number;
    abdomen?: number;
    hips?: number;
    rightThigh?: number;
    leftThigh?: number;
    rightCalf?: number;
    leftCalf?: number;
  };

  // Dobras Cutâneas (mm)
  skinfolds?: {
    triceps?: number;
    biceps?: number;
    subscapular?: number;
    suprailiac?: number;
    abdominal?: number;
    thigh?: number;
    calf?: number;
    midaxillary?: number;
    chest?: number;
  };
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  dueDate: string;
  description: string;
  installmentNumber?: number;
  totalInstallments?: number;
}

export interface AcademySettings {
  name: string;
  cnpj: string;
  address: string;
  phone: string; // Novo
  email: string; // Novo
  representativeName: string;
  mercadoPagoPublicKey?: string;
  mercadoPagoAccessToken?: string;
  monthlyFee: number; // Novo campo: Valor da Mensalidade para recorrência
  inviteCode: string; // Novo campo: Código de convite dinâmico
}

export interface Route {
  id: string;
  title: string;
  distanceKm: number;
  description: string;
  mapLink: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  elevationGain: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  unit: string;
  startDate: string;
  endDate: string;
  currentValue?: number;
}

export type ViewState = 
  | 'LOGIN' 
  | 'REGISTER' 
  | 'DASHBOARD' 
  | 'RANKING'
  | 'ROUTES'
  | 'SCHEDULE' 
  | 'PERSONAL_WORKOUTS'
  | 'ASSESSMENTS' 
  | 'FEED' 
  | 'FINANCIAL' 
  | 'REPORTS'
  | 'MANAGE_USERS'
  | 'SETTINGS';