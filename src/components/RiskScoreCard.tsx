import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import type { Pet } from '../types';

type RiskScoreCardProps = {
  pet: Pet;
};

export default function RiskScoreCard({ pet }: RiskScoreCardProps) {
  return (
    <View className="mx-5 -mt-4 mb-8 rounded-3xl border-l-[6px] border-[#DFB461] bg-white p-6 shadow-md shadow-[#185A43]/10">
      <View className="mb-6 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-[#DFB461]/20">
            <Ionicons name="pulse" size={23} color="#185A43" />
          </View>
          <View>
            <Text className="text-[11px] font-bold tracking-[1.5px] text-[#7E9F8E]">SCORE DE RISCO</Text>
            <Text className="mt-1 text-sm font-semibold text-[#185A43]">{pet.name} · {pet.breed}</Text>
          </View>
        </View>
        <View className="rounded-full bg-[#DFB461]/20 px-3 py-1.5">
          <Text className="text-xs font-bold text-[#185A43]">ATENÇÃO</Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <View className="mr-5 h-[92px] w-[92px] items-center justify-center rounded-full border-[7px] border-[#DFB461]/35">
          <View className="absolute h-[78px] w-[78px] rounded-full border-[7px] border-[#DFB461]" />
          <Text className="text-xl font-bold text-[#185A43]">7.2</Text>
          <Text className="text-[10px] font-semibold text-[#7E9F8E]">/10</Text>
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-xl font-bold leading-7 text-[#185A43]">Atenção Ortopédica</Text>
          <Text className="text-sm leading-5 text-[#7E9F8E]">Risco moderado de coluna</Text>
        </View>
      </View>

      <View className="mt-6 rounded-2xl bg-[#F8FAFC] p-4">
        <View className="mb-2 flex-row items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={16} color="#185A43" />
          <Text className="ml-2 text-xs font-bold uppercase tracking-wider text-[#185A43]">Recomendação clínica</Text>
        </View>
        <Text className="text-sm leading-5 text-[#7E9F8E]">Evite saltos e observe os movimentos do Thor. Estamos acompanhando juntos.</Text>
      </View>
    </View>
  );
}