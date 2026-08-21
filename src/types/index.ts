import type { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

export interface Pet {
  name: string;
  breed: string;
  tutorCode: string;
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