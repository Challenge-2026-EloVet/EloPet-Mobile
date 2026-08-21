import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ClinicCard from '../components/ClinicCard';
import { partnerClinics } from '../mocks/mockData';
import type { Clinic } from '../types';

const filters = ['Ortopedia', 'Cardiologia', 'Até 5km', 'Acessibilidade'];

function clinicMatchesFilter(clinic: Clinic, filter: string) {
  if (filter === 'Até 5km') return clinic.distanceKm <= 5;
  if (filter === 'Acessibilidade') return clinic.accessibility.length > 0;
  return clinic.specialties.includes(filter);
}

export default function ClinicSearchScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedClinicId, setSelectedClinicId] = useState(partnerClinics[0].id);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const filteredClinics = useMemo(() => partnerClinics.filter((clinic) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || clinic.name.toLowerCase().includes(normalizedQuery) || clinic.specialties.some((specialty) => specialty.toLowerCase().includes(normalizedQuery));
    return matchesQuery && (!activeFilter || clinicMatchesFilter(clinic, activeFilter));
  }), [activeFilter, query]);

  const selectedClinic = filteredClinics.find((clinic) => clinic.id === selectedClinicId) ?? filteredClinics[0];

  const showRouteToast = () => {
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2400);
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1" contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <View className="bg-[#185A43] px-5 pb-7 pt-6">
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-bold uppercase tracking-[2px] text-[#A3D9C9]">REDE ELO VET</Text>
              <Text className="mt-2 text-2xl font-bold text-white">Encontre cuidado perto</Text>
            </View>
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#A3D9C9]/20">
              <Ionicons name="map-outline" size={23} color="#A3D9C9" />
            </View>
          </View>
          <View className="flex-row items-center rounded-2xl bg-white px-4 py-1">
            <Ionicons name="search-outline" size={20} color="#7E9F8E" />
            <TextInput
              className="ml-3 flex-1 py-3 text-sm text-[#185A43]"
              placeholder="Buscar clínica ou especialidade"
              placeholderTextColor="#7E9F8E"
              value={query}
              onChangeText={setQuery}
            />
            {query ? <TouchableOpacity activeOpacity={0.7} onPress={() => setQuery('')}><Ionicons name="close-circle" size={19} color="#7E9F8E" /></TouchableOpacity> : null}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 px-5 py-5">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity key={filter} activeOpacity={0.75} className={`rounded-full border px-4 py-2.5 ${isActive ? 'border-[#A3D9C9] bg-[#A3D9C9]' : 'border-[#7E9F8E]/30 bg-white'}`} onPress={() => setActiveFilter(isActive ? null : filter)}>
                <Text className={`text-xs font-bold ${isActive ? 'text-[#185A43]' : 'text-[#7E9F8E]'}`}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="mx-5 mb-5 overflow-hidden rounded-[28px] border border-[#7E9F8E]/20 bg-[#EAF3F0] shadow-sm shadow-[#185A43]/5">
          <View className="h-[250px] overflow-hidden bg-[#EAF3F0]">
            <View className="absolute -left-5 top-20 h-3 w-[120%] rotate-[18deg] bg-white/70" />
            <View className="absolute -left-5 top-40 h-2 w-[120%] rotate-[-12deg] bg-white/70" />
            <View className="absolute left-16 top-[-30px] h-[320px] w-2 rotate-[28deg] bg-white/70" />
            <View className="absolute left-48 top-[-30px] h-[320px] w-3 rotate-[-32deg] bg-white/70" />
            <View className="absolute left-80 top-[-30px] h-[320px] w-2 rotate-[12deg] bg-white/70" />
            <View className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-2">
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#185A43]">Clínicas próximas</Text>
            </View>
            <View className="absolute bottom-4 right-4 flex-row items-center rounded-full bg-white/90 px-3 py-2">
              <Ionicons name="locate-outline" size={15} color="#185A43" />
              <Text className="ml-1 text-[10px] font-semibold text-[#185A43]">Sua localização</Text>
            </View>
            {filteredClinics.map((clinic) => {
              const isSelected = selectedClinic?.id === clinic.id;
              return (
                <TouchableOpacity key={clinic.id} activeOpacity={0.7} className="absolute items-center" style={{ left: `${clinic.coordinates.longitude}%`, top: `${clinic.coordinates.latitude}%` }} onPress={() => setSelectedClinicId(clinic.id)}>
                  <View className={`h-11 w-11 items-center justify-center rounded-full border-2 border-white shadow-md ${isSelected ? 'bg-[#185A43]' : 'bg-[#7E9F8E]'}`}>
                    <Ionicons name="paw" size={19} color="#FFFFFF" />
                  </View>
                  <View className="mt-1 rounded-full bg-white px-2 py-1 shadow-sm">
                    <Text className="text-[9px] font-bold text-[#185A43]">{clinic.distance}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="mx-5 mb-3 flex-row items-end justify-between">
          <View>
            <Text className="text-xl font-bold text-[#185A43]">Parceiros credenciados</Text>
            <Text className="mt-1 text-sm text-[#7E9F8E]">{filteredClinics.length} opções para o Thor</Text>
          </View>
          {activeFilter ? <TouchableOpacity activeOpacity={0.7} onPress={() => setActiveFilter(null)}><Text className="text-xs font-bold text-[#185A43]">Limpar filtro</Text></TouchableOpacity> : null}
        </View>

        {selectedClinic ? <View className="mx-5"><ClinicCard clinic={selectedClinic} onRoute={showRouteToast} /></View> : <View className="mx-5 rounded-3xl bg-white p-6"><Text className="text-center text-sm text-[#7E9F8E]">Nenhuma clínica encontrada.</Text></View>}
      </ScrollView>
      {isToastVisible ? (
        <View className="absolute bottom-5 left-5 right-5 flex-row items-center rounded-2xl bg-[#185A43] px-4 py-3.5 shadow-lg shadow-[#185A43]/25">
          <Ionicons name="navigate" size={18} color="#A3D9C9" />
          <Text className="ml-3 flex-1 text-sm font-semibold text-white">Traçando rota com o Waze/Maps...</Text>
          <Ionicons name="checkmark-circle" size={18} color="#A3D9C9" />
        </View>
      ) : null}
    </View>
  );
}