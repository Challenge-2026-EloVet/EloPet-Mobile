import type { Pet, QuickStat, TodoItem } from '../types';

export const thor: Pet = {
  name: 'Thor',
  breed: 'Dachshund',
  tutorCode: 'ELO-1234',
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