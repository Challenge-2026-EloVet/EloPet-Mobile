import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ClinicCard from '../components/ClinicCard';
import { partnerClinics } from '../mocks/mockData';
import type { Clinic } from '../types/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.networkText}>REDE ELO VET</Text>
              <Text style={styles.headerTitle}>Encontre cuidado perto</Text>
            </View>
            <View style={styles.headerIconWrapper}>
              <Ionicons name="map-outline" size={23} color="#A3D9C9" />
            </View>
          </View>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#7E9F8E" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar clínica ou especialidade"
              placeholderTextColor="#7E9F8E"
              value={query}
              onChangeText={setQuery}
            />
            {query ? <TouchableOpacity activeOpacity={0.7} onPress={() => setQuery('')}><Ionicons name="close-circle" size={19} color="#7E9F8E" /></TouchableOpacity> : null}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollContent}>
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.75}
                style={[
                  styles.filterButton,
                  isActive ? styles.filterButtonActive : styles.filterButtonInactive,
                ]}
                onPress={() => setActiveFilter(isActive ? null : filter)}
              >
                <Text style={[styles.filterText, isActive ? styles.filterTextActive : styles.filterTextInactive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.mapCard}>
          <View style={styles.mapInner}>
            <View style={styles.mapLine1} />
            <View style={styles.mapLine2} />
            <View style={styles.mapLine3} />
            <View style={styles.mapLine4} />
            <View style={styles.mapLine5} />
            <View style={styles.mapBadge}>
              <Text style={styles.mapBadgeText}>Clínicas próximas</Text>
            </View>
            <View style={styles.locationBadge}>
              <Ionicons name="locate-outline" size={15} color="#185A43" />
              <Text style={styles.locationBadgeText}>Sua localização</Text>
            </View>
            {filteredClinics.map((clinic) => {
              const isSelected = selectedClinic?.id === clinic.id;
              return (
                <TouchableOpacity
                  key={clinic.id}
                  activeOpacity={0.7}
                  style={[styles.pinContainer, { left: `${clinic.coordinates.longitude}%`, top: `${clinic.coordinates.latitude}%` }]}
                  onPress={() => setSelectedClinicId(clinic.id)}
                >
                  <View style={[styles.pinIconWrapper, isSelected ? styles.pinSelected : styles.pinUnselected]}>
                    <Ionicons name="paw" size={19} color="#FFFFFF" />
                  </View>
                  <View style={styles.pinDistanceBadge}>
                    <Text style={styles.pinDistanceText}>{clinic.distance}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.partnersHeader}>
          <View>
            <Text style={styles.partnersTitle}>Parceiros credenciados</Text>
            <Text style={styles.partnersSubtitle}>{filteredClinics.length} opções para o Thor</Text>
          </View>
          {activeFilter ? <TouchableOpacity activeOpacity={0.7} onPress={() => setActiveFilter(null)}><Text style={styles.clearFilterText}>Limpar filtro</Text></TouchableOpacity> : null}
        </View>

        {selectedClinic ? <View style={styles.cardWrapper}><ClinicCard clinic={selectedClinic} onRoute={showRouteToast} /></View> : <View style={styles.emptyCard}><Text style={styles.emptyText}>Nenhuma clínica encontrada.</Text></View>}
      </ScrollView>
      {isToastVisible ? (
        <View style={styles.toastContainer}>
          <Ionicons name="navigate" size={18} color="#A3D9C9" />
          <Text style={styles.toastText}>Traçando rota com o Waze/Maps...</Text>
          <Ionicons name="checkmark-circle" size={18} color="#A3D9C9" />
        </View>
      ) : null}
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
    paddingBottom: 32,
  },
  headerContainer: {
    backgroundColor: '#185A43',
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 24,
  },
  headerTopRow: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  networkText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#A3D9C9',
  },
  headerTitle: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIconWrapper: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(163, 217, 201, 0.2)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  searchInput: {
    marginLeft: 12,
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#185A43',
  },
  filtersScrollContent: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  filterButton: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterButtonActive: {
    borderColor: '#A3D9C9',
    backgroundColor: '#A3D9C9',
  },
  filterButtonInactive: {
    borderColor: 'rgba(126, 159, 142, 0.3)',
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#185A43',
  },
  filterTextInactive: {
    color: '#7E9F8E',
  },
  mapCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.2)',
    backgroundColor: '#EAF3F0',
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mapInner: {
    height: 250,
    overflow: 'hidden',
    backgroundColor: '#EAF3F0',
    position: 'relative',
  },
  mapLine1: {
    position: 'absolute',
    left: -20,
    top: 80,
    height: 12,
    width: '120%',
    transform: [{ rotate: '18deg' }],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  mapLine2: {
    position: 'absolute',
    left: -20,
    top: 160,
    height: 8,
    width: '120%',
    transform: [{ rotate: '-12deg' }],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  mapLine3: {
    position: 'absolute',
    left: 64,
    top: -30,
    height: 320,
    width: 8,
    transform: [{ rotate: '28deg' }],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  mapLine4: {
    position: 'absolute',
    left: 192,
    top: -30,
    height: 320,
    width: 12,
    transform: [{ rotate: '-32deg' }],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  mapLine5: {
    position: 'absolute',
    left: 320,
    top: -30,
    height: 320,
    width: 8,
    transform: [{ rotate: '12deg' }],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  mapBadge: {
    position: 'absolute',
    left: 20,
    top: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mapBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#185A43',
  },
  locationBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  locationBadgeText: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: '600',
    color: '#185A43',
  },
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinIconWrapper: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  pinSelected: {
    backgroundColor: '#185A43',
  },
  pinUnselected: {
    backgroundColor: '#7E9F8E',
  },
  pinDistanceBadge: {
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pinDistanceText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#185A43',
  },
  partnersHeader: {
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  partnersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#185A43',
  },
  partnersSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#7E9F8E',
  },
  clearFilterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#185A43',
  },
  cardWrapper: {
    marginHorizontal: 20,
  },
  emptyCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7E9F8E',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#185A43',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  toastText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});