
import { UserRole } from './types';

export const APP_NAME = "Studio - Funcional & Corrida";
export const INVITE_CODE = "PERSONAL2024"; // Código secreto para cadastro

export const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export const MOCK_USER_ADMIN = {
  id: 'admin-1',
  name: 'Treinador Alexandre',
  email: 'admin@studio.com',
  role: UserRole.ADMIN,
  avatarUrl: 'https://ui-avatars.com/api/?name=Alexandre+Silva&background=f97316&color=fff',
  joinDate: '2023-01-01',
  phoneNumber: '5511999999999',
  address: 'Rua da Academia, 100 - Centro, SP'
};

export const MOCK_USER_STUDENT = {
  id: 'student-1',
  name: 'Ana Souza',
  email: 'ana@exemplo.com',
  role: UserRole.STUDENT,
  avatarUrl: 'https://ui-avatars.com/api/?name=Ana+Souza&background=random',
  joinDate: '2023-06-15',
  phoneNumber: '5511988888888',
  address: 'Av. Paulista, 1500 - Ap 42 - Bela Vista, São Paulo - SP'
};

export const WORKOUT_TYPES = ['FUNCIONAL', 'CORRIDA', 'FORÇA', 'MOBILIDADE'];
