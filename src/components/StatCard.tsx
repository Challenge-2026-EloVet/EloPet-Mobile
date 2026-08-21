import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import type { QuickStat } from '../types';

export default function StatCard({ stat }: { stat: QuickStat }) {
  return (
    <View className="min-h-[142px] flex-1 rounded-3xl border border-[#7E9F8E]/25 bg-white p-4 shadow-sm shadow-[#185A43]/5">
      <View className="mb-5 h-9 w-9 items-center justify-center rounded-xl bg-[#A3D9C9]/45">
        <Ionicons name={stat.icon} size={19} color="#185A43" />
      </View>
      <Text className="text-xs font-medium leading-4 text-[#7E9F8E]">{stat.label}</Text>
      <Text className="mt-1 text-base font-bold leading-5 text-[#185A43]">{stat.value}</Text>
    </View>
  );
}