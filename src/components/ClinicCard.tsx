import { Ionicons } from '@expo/vector-icons';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import type { Clinic } from '../types';

type ClinicCardProps = {
  clinic: Clinic;
  onRoute: () => void;
};

export default function ClinicCard({ clinic, onRoute }: ClinicCardProps) {
  const confirmAppointment = () => {
    Alert.alert('Solicitação enviada', `A ${clinic.name} recebeu seu pedido de agendamento.`, [
      { text: 'Entendi', style: 'default' },
    ]);
  };

  return (
    <View className="rounded-[28px] border border-[#7E9F8E]/20 bg-white p-5 shadow-md shadow-[#185A43]/10">
      <View className="mb-4 flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-bold text-[#185A43]">{clinic.name}</Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="location-outline" size={15} color="#7E9F8E" />
            <Text className="ml-1 text-xs text-[#7E9F8E]">{clinic.distance} · {clinic.address}</Text>
          </View>
        </View>
        <View className="flex-row items-center rounded-full bg-[#DFB461]/20 px-2.5 py-1.5">
          <Ionicons name="star" size={13} color="#DFB461" />
          <Text className="ml-1 text-xs font-bold text-[#185A43]">{clinic.rating}</Text>
        </View>
      </View>

      <View className="mb-4 flex-row flex-wrap gap-2">
        {clinic.specialties.map((specialty) => (
          <View key={specialty} className="rounded-full bg-[#A3D9C9]/35 px-3 py-1.5">
            <Text className="text-[11px] font-semibold text-[#185A43]">{specialty}</Text>
          </View>
        ))}
        {clinic.accessibility.map((item) => (
          <View key={item} className="rounded-full border border-[#7E9F8E]/25 px-3 py-1.5">
            <Text className="text-[11px] font-medium text-[#7E9F8E]">{item}</Text>
          </View>
        ))}
      </View>

      <View className="mb-5 flex-row items-center">
        <Ionicons name="call-outline" size={15} color="#7E9F8E" />
        <Text className="ml-2 text-xs text-[#7E9F8E]">{clinic.phone}</Text>
      </View>

      <View className="flex-row gap-3">
        <TouchableOpacity activeOpacity={0.75} className="flex-1 flex-row items-center justify-center rounded-2xl bg-[#185A43] px-3 py-3.5" onPress={confirmAppointment}>
          <Ionicons name="calendar-outline" size={17} color="#FFFFFF" />
          <Text className="ml-2 text-xs font-bold text-white">Agendar Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} className="flex-row items-center justify-center rounded-2xl border border-[#185A43] px-3 py-3.5" onPress={onRoute}>
          <Ionicons name="navigate-outline" size={17} color="#185A43" />
          <Text className="ml-2 text-xs font-bold text-[#185A43]">Como Chegar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}