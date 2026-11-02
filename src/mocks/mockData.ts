import type { Clinic} from '../types/interfaces';


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