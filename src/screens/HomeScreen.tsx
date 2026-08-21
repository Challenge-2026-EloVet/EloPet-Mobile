import { ScrollView, Text, View } from 'react-native';

import Header from '../components/Header';
import RiskScoreCard from '../components/RiskScoreCard';
import StatCard from '../components/StatCard';
import TodoListCuidados from '../components/TodoListCuidados';
import { careTasks, quickStats, thor } from '../mocks/mockData';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1" contentContainerClassName="pb-12" showsVerticalScrollIndicator={false}>
        <Header pet={thor} />
        <RiskScoreCard pet={thor} />

        <View className="mx-5 mb-4 flex-row items-end justify-between">
          <View>
            <Text className="text-xl font-bold text-[#185A43]">Resumo de saúde</Text>
            <Text className="mt-1 text-sm text-[#7E9F8E]">Os dados mais importantes do Thor</Text>
          </View>
        </View>
        <View className="mx-5 flex-row gap-3">
          {quickStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </View>
        <TodoListCuidados tasks={careTasks} />
      </ScrollView>
    </View>
  );
}