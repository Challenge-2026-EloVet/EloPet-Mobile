import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import RiskScoreCard from '../components/RiskScoreCard';
import StatCard from '../components/StatCard';
import TodoListCuidados from '../components/TodoList';
import { careTasks, quickStats } from '../mocks/mockData';
import { getPetsService, getStoredUserId } from '../services/eloPetService';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [selectedPet, setSelectedPet] = useState<any>(null);

  const handleCurrentUserId = async () => {
    try {
      const userId = await getStoredUserId();
      return userId;
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
      return null;
    }
  };

  const handleGetPets = async () => {
    try {
      const userId = await handleCurrentUserId();
      if (userId) {
        const petsData = await getPetsService(userId);
        return petsData;
      } else {
        console.error('ID do usuário não encontrado.');
        return [];
      }
    } catch (error) {
      console.error('Erro ao obter os dados dos pets:', error);
      return [];
    }
  };

  const { data: rawPets, isLoading, isError } = useQuery({
    queryKey: ['pets'],
    queryFn: handleGetPets,
  });

  const pets = Array.isArray(rawPets)
    ? rawPets.map((item: any) => (item?.pet ? { ...item.pet, idPetResponsavel: item.idPetResponsavel } : item))
    : [];

  useEffect(() => {
    if (pets && pets.length > 0) {
      const exists = pets.find((p: any) => p?.idPet === selectedPet?.idPet);
      if (!exists) {
        setSelectedPet(pets[0]);
      }
    } else {
      setSelectedPet(null);
    }
  }, [pets]);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: '#F8FAFC' }]}>
        <ActivityIndicator size="large" color="#185A43" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, { backgroundColor: '#F8FAFC' }]}>
        <Text style={styles.errorText}>Erro ao carregar os dados do Pet!!</Text>
      </View>
    );
  }

  // 1 - Cenário sem nenhum pet cadastrado
  if (!pets || pets.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconWrapper}>
            <MaterialCommunityIcons name="paw-off" size={48} color="#185A43" />
          </View>
          <Text style={styles.emptyTitle}>Nenhum pet registrado</Text>
          <Text style={styles.emptySubtitle}>
            Você ainda não possui nenhum pet cadastrado em sua conta. Cadastre seu pet para acompanhar a saúde e os cuidados.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Text style={styles.primaryButtonText}>Ir para o Perfil / Cadastrar Pet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 2 - Cenário com pets cadastrados
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Seletor de Pets */}
        <View style={styles.petSelectorContainer}>
          <Text>Meus pets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.petSelectorScroll}>
            {pets.map((pet: any) => {
              const isSelected = selectedPet?.idPet === pet?.idPet;
              const isCachorro = pet?.especie?.toLowerCase() === 'cachorro' || pet?.especie?.toLowerCase() === 'dog';
              return (
                <TouchableOpacity
                  key={pet?.idPet}
                  style={[styles.petChip, isSelected && styles.petChipSelected]}
                  onPress={() => setSelectedPet(pet)}
                  activeOpacity={0.75}
                >
                  <MaterialCommunityIcons
                    name={isCachorro ? 'dog' : 'cat'}
                    size={18}
                    color={isSelected ? '#FFFFFF' : '#185A43'}
                  />
                  <Text style={[styles.petChipText, isSelected && styles.petChipTextSelected]}>
                    {pet?.nome || 'Pet'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <Header pet={selectedPet} />
        <RiskScoreCard pet={selectedPet} />

        <View style={styles.sectionHeaderContainer}>
          <View>
            <Text style={styles.sectionTitle}>Resumo de saúde</Text>
            <Text style={styles.sectionSubtitle}>Os dados mais importantes</Text>
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
  petSelectorContainer: {
    marginVertical: 12,
  },
  petSelectorScroll: {
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center',
  },
  petChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.3)',
  },
  petChipSelected: {
    backgroundColor: '#185A43',
    borderColor: '#185A43',
  },
  petChipText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#185A43',
  },
  petChipTextSelected: {
    color: '#FFFFFF',
  },
  sectionHeaderContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 16,
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
    padding: 20,
  },
  errorText: {
    color: '#ff4a5a',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(163, 217, 201, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#185A43',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7E9F8E',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  primaryButton: {
    height: 52,
    backgroundColor: '#185A43',
    borderRadius: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});