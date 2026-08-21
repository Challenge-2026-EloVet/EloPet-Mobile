import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

import './global.css';

const quickStats = [
  { label: 'Peso', value: '9.2kg', icon: 'scale-outline' as const },
  { label: 'Último check-up', value: 'Há 6 meses', icon: 'calendar-outline' as const },
  { label: 'Vacinas', value: '1 pendente', icon: 'shield-checkmark-outline' as const },
];

export default function App() {
  return (
    <View className="flex-1 bg-mint">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-10 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-7 flex-row items-start justify-between">
          <View>
            <Text className="mb-1 text-sm font-medium tracking-wide text-emerald/70">HEALTH HUB</Text>
            <Text className="text-3xl font-bold tracking-tight text-emerald">Olá, tutor do Thor!</Text>
            <Text className="mt-2 text-base text-emerald/70">Veja como ele está hoje.</Text>
          </View>
          <View className="items-center rounded-2xl bg-emerald px-3 py-2.5">
            <Ionicons name="paw" size={18} color="#A3D9C9" />
            <Text className="mt-1 text-xs font-bold tracking-wider text-mint">ELO-1234</Text>
          </View>
        </View>

        <View className="mb-6 rounded-[28px] bg-gold p-6 shadow-lg shadow-emerald/15">
          <View className="mb-8 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-emerald">
                <Ionicons name="pulse" size={23} color="#DFB461" />
              </View>
              <View>
                <Text className="text-xs font-bold tracking-widest text-emerald/65">SCORE DE RISCO</Text>
                <Text className="mt-1 text-sm font-semibold text-emerald">Thor · Dachshund</Text>
              </View>
            </View>
            <View className="rounded-full border border-emerald/20 px-3 py-1.5">
              <Text className="text-xs font-bold text-emerald">MODERADO</Text>
            </View>
          </View>

          <Text className="mb-3 text-2xl font-bold leading-8 text-emerald">Atenção Ortopédica</Text>
          <Text className="max-w-[290px] text-base leading-6 text-emerald/75">
            Risco moderado de coluna. Acompanhe os sinais e mantenha os cuidados preventivos em dia.
          </Text>

          <View className="mt-7 h-2 overflow-hidden rounded-full bg-emerald/15">
            <View className="h-full w-[58%] rounded-full bg-emerald" />
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-xs font-medium text-emerald/65">Acompanhamento contínuo</Text>
            <Ionicons name="arrow-forward" size={18} color="#185A43" />
          </View>
        </View>

        <View className="mb-4 flex-row items-end justify-between">
          <View>
            <Text className="text-xl font-bold text-emerald">Resumo de saúde</Text>
            <Text className="mt-1 text-sm text-emerald/65">Os dados mais importantes do Thor</Text>
          </View>
          <Ionicons name="ellipsis-horizontal" size={22} color="#185A43" />
        </View>

        <View className="flex-row gap-3">
          {quickStats.map((stat) => (
            <View key={stat.label} className="min-h-[142px] flex-1 rounded-3xl border border-sage/30 bg-white/65 p-3.5">
              <View className="mb-5 h-9 w-9 items-center justify-center rounded-xl bg-sage/20">
                <Ionicons name={stat.icon} size={19} color="#185A43" />
              </View>
              <Text className="text-xs font-medium leading-4 text-emerald/60">{stat.label}</Text>
              <Text className="mt-1 text-base font-bold leading-5 text-emerald">{stat.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
