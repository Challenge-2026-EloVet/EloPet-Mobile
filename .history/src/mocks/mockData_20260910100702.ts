import type { Clinic, Pet, QuickStat, Responsible, TodoItem } from '../types/interfaces';

export const thor: Pet = {
  name: 'Thor',
  breed: 'Dachshund',
  tutorCode: 'ELO-1234',
};

export const responsible: Responsible = {
  name: 'Marina Oliveira',
  email: 'marina.oliveira@email.com',
  phone: '(11) 99842-1730',
  city: 'São Paulo, SP',
  initials: 'MO',
  memberSince: 'Membro desde 2024',
};

export const quickStats: QuickStat[] = [
  { label: 'Peso', value: '9.2kg', icon: 'scale-outline' },
  { label: 'Último check-up', value: 'Há 6 meses', icon: 'calendar-outline' },
  { label: 'Vacinas', value: '1 pendente', icon: 'shield-checkmark-outline' },
];

export const careTasks: TodoItem[] = [
  {
    id: 'anti-inflammatory',
    label: 'Dar anti-inflamatório VetMax - 20h',
    category: 'clinical',
    icon: 'medkit-outline',
  },
  {
    id: 'sofa',
    label: 'Evitar que o Thor suba no sofá hoje',
    category: 'preventive',
    icon: 'paw-outline',
  },
  {
    id: 'walk',
    label: 'Passeio leve de 15 min',
    category: 'preventive',
    icon: 'walk-outline',
  },
];

export const partnerClinics: Clinic[] = [
  {
    id: 'vetlife-moema',
    name: 'Clínica VetLife Moema',
    distance: '1.2 km',
    distanceKm: 1.2,
    specialties: ['Ortopedia', 'Clínico Geral'],
    rating: 4.9,
    address: 'Av. Pavão, 842 · Moema',
    phone: '(11) 3051-2040',
    accessibility: ['Rampa', 'Estacionamento', 'Cat-Friendly'],
    coordinates: { latitude: 34, longitude: 27 },
  },
  {
    id: 'animalis-saude',
    name: 'Animalis Saúde Integrada',
    distance: '3.8 km',
    distanceKm: 3.8,
    specialties: ['Cardiologia', 'Clínico Geral'],
    rating: 4.8,
    address: 'Rua Harmonia, 156 · Vila Madalena',
    phone: '(11) 3814-7780',
    accessibility: ['Elevador', 'Estacionamento'],
    coordinates: { latitude: 58, longitude: 68 },
  },
  {
    id: 'pata-serena',
    name: 'Pata Serena Especialidades',
    distance: '6.4 km',
    distanceKm: 6.4,
    specialties: ['Ortopedia', 'Cardiologia'],
    rating: 4.7,
    address: 'Rua das Flores, 390 · Pinheiros',
    phone: '(11) 3090-1162',
    accessibility: ['Rampa', 'Cat-Friendly'],
    coordinates: { latitude: 73, longitude: 40 },
  },
];