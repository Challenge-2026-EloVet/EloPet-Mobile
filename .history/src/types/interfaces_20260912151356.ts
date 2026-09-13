import type { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

export interface User {
  nomeCompleto: string,
  telefone: string,
  cidade: string,
  nomeUsuario: string,
  email: string,
  senha: string,
  tipoUsuario: string
}

export interface 

export interface Pet {
  nome: string,
  especie: string,
  raca: string,
  sexo: string,
  dataNascimento: string,
  idadeAproximada: number,
  flagCastrado: number
}

export interface Responsible {
  name: string;
  email: string;
  phone: string;
  city: string;
  initials: string;
  memberSince: string;
}

export interface TodoItem {
  id: string;
  label: string;
  category: 'clinical' | 'preventive';
  icon: IconName;
}

export interface QuickStat {
  label: string;
  value: string;
  icon: IconName;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Clinic {
  id: string;
  name: string;
  distance: string;
  distanceKm: number;
  specialties: string[];
  rating: number;
  address: string;
  phone: string;
  accessibility: string[];
  coordinates: Coordinates;
}