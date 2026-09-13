import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import RiskScoreCard from '../components/RiskScoreCard';
import StatCard from '../components/StatCard';
import TodoListCuidados from '../components/TodoList';
import { careTasks, quickStats, thor } from '../mocks/mockData';
import { useState, useEffect } from 'react';
import { getPetsService, getStoredUserId } from '../services/eloPetService';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const handleCurrentUserId = async () => {
    try {
      const userId = await getStoredUserId();
      return userId;
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
      return null;
    }
  }

  const handleGetPets = async () => {
    try {
      const userId = await handleCurrentUserId();
      if (userId) {
        const petsData = await getPetsService(userId);
        return petsData;
      }

  const { data: pets, isLoading, isError } = useQuery({
    queryKey: ['pets'],
    queryFn: getPetsService,
  });

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: '#e5e8f1' }]}>
        <ActivityIndicator size="large" color="#185A43" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, { backgroundColor: '#e5e8f1' }]}>
        <Text style={styles.errorText}>Erro ao carregar os dados do Pet!!</Text>
      </View>
    )
  }

  const currentPet = pets && pets.length > 0 ? pets[0] : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header pet={currentPet} />
        <RiskScoreCard pet={currentPet} />

        <View style={styles.sectionHeaderContainer}>
          <View>
            <Text style={styles.sectionTitle}>Resumo de saúde</Text>
            <Text style={styles.sectionSubtitle}>Os dados mais importantes </Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          {quickStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </View>
        <TodoListCuidados tasks={careTasks} />
      </ScrollView>
    </SafeAreaView>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4a5a',
    fontSize: 16,
    fontWeight: '600',
  }
});