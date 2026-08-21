import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import type { Pet } from '../types';

type HeaderProps = {
  pet: Pet;
};

export default function Header({ pet }: HeaderProps) {
  return (
    <View className="overflow-hidden rounded-b-[32px] bg-[#185A43] px-5 pb-8 pt-5">
      <View className="mb-8 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 overflow-hidden rounded-2xl bg-[#A3D9C9]">
            <Image source={require('../imgs/logo.png')} className="h-full w-full" resizeMode="cover" />
          </View>
          <View>
            <Text className="text-sm font-bold tracking-[2px] text-[#A3D9C9]">ELO VET</Text>
            <Text className="mt-1 text-[10px] text-[#A3D9C9]/65">Cuidar de quem amamos: é isso que nos une.</Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityLabel="Abrir notificações"
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-full bg-[#A3D9C9]/15"
        >
          <Ionicons name="notifications-outline" size={20} color="#A3D9C9" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-end justify-between">
        <View className="flex-1 pr-4">
          <Text className="mb-1 text-sm font-medium text-[#A3D9C9]/70">HEALTH HUB</Text>
          <Text className="text-3xl font-bold tracking-tight text-white">Olá, tutor do {pet.name}!</Text>
          <Text className="mt-2 text-base text-[#A3D9C9]/80">Veja como ele está hoje.</Text>
        </View>
        <View className="items-center rounded-2xl border border-[#A3D9C9]/30 bg-[#A3D9C9]/10 px-3 py-2.5">
          <Ionicons name="paw" size={18} color="#A3D9C9" />
          <Text className="mt-1 text-xs font-bold tracking-wider text-[#A3D9C9]">{pet.tutorCode}</Text>
        </View>
      </View>
    </View>
  );
}