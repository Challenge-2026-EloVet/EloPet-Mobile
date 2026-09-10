import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import RiskScoreCard from '../components/RiskScoreCard';
import StatCard from '../components/StatCard';
import TodoListCuidados from '../components/TodoList';
import { careTasks, quickStats, thor } from '../mocks/mockData';
import { useState, useEffect } from 'react';
import { getPetsService } from '../services/eloPetService';

export default function HomeScreen() {

  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await getPetsService();
        setPets(data);
      } catch (error) {
        console.error('Não foi possível carregar os pets', error);
      }
    }
    fetchPets();
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header pet={thor} />
        <RiskScoreCard pet={thor} />

        <View style={styles.sectionHeaderContainer}>
          <View>
            <Text style={styles.sectionTitle}>Resumo de saúde</Text>
            <Text style={styles.sectionSubtitle}>Os dados mais importantes do {}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          {quickStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </View>
        <TodoListCuidados tasks={careTasks} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  sectionHeaderContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#185A43',
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#7E9F8E',
  },
  statsContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 12,
  },
});