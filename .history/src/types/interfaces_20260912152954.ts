import type { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

export interface User {
  idUsuario: string,
  no
}

export interface Responsible {
  email: string,
  senha: string
}

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
  idUsuario: string,
  nomeCompleto: string,
  telefone: string,
  rg: string,
  cpf: string,
  dataNascimento: string,
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