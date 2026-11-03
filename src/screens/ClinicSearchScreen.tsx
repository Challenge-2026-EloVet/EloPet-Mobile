import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ClinicCard from '../components/ClinicCard';
import type { Clinic } from '../types/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { parseAppointmentDate, scheduleAppointmentReminder } from '../services/notificationService';
import { getClinicsService } from '../services/eloPetService';
import { formatDateMask, formatTimeMask } from '../utils/functions';

const filters = ['Ortopedia', 'Cardiologia', 'Clinica Geral','Dermatologia','Acessibilidade'];

function clinicMatchesFilter(clinic: Clinic, filter: string) {
  if (filter === 'Acessibilidade') return clinic.accessibility && clinic.accessibility.length > 0;
  return clinic.specialties && clinic.specialties.includes(filter);
}

export default function ClinicSearchScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // 🔹 Estados para gerenciar as clínicas vindas da API Java
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isLoadingClinics, setIsLoadingClinics] = useState(true);
  
  const [selectedClinicId, setSelectedClinicId] = useState<string | number | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  // 🔹 Estados para controlar o Modal de Agendamento
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadClinics() {
      try {
        setIsLoadingClinics(true);
        const data = await getClinicsService();
        setClinics(data || []);
        
        if (data && data.length > 0) {
          setSelectedClinicId(data[0].id);
        }
      } catch (error: any) {
        Alert.alert('Erro', error.message || 'Não foi possível carregar as clínicas.');
      } finally {
        setIsLoadingClinics(false);
      }
    }

    loadClinics();
  }, []);

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery = !normalizedQuery || 
        clinic.name?.toLowerCase().includes(normalizedQuery) || 
        (clinic.specialties && clinic.specialties.some((specialty) => specialty.toLowerCase().includes(normalizedQuery)));
      return matchesQuery && (!activeFilter || clinicMatchesFilter(clinic, activeFilter));
    });
  }, [clinics, activeFilter, query]);

  const selectedClinic = filteredClinics.find((clinic) => clinic.id === selectedClinicId) ?? filteredClinics[0];

  // 🔹 Função para solicitar permissão de localização e simular a rota
  const handleRouteRequest = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Precisamos da sua permissão de localização para calcular e traçar a rota até a clínica.'
        );
        return;
      }

      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 2400);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a permissão de localização.');
    }
  };

  // 🔹 Função para lidar com o envio do agendamento
  const handleConfirmAppointment = async () => {
    if (!appointmentDate || !appointmentTime || !selectedSpecialty) {
      Alert.alert('Atenção', 'Preencha a especialidade, data e horário desejados.');
      return;
    }

    const appointmentAt = parseAppointmentDate(appointmentDate, appointmentTime);
    if (!appointmentAt || appointmentAt.getTime() <= Date.now()) {
      Alert.alert(
        'Data ou horário inválido',
        'Informe uma data futura no formato DD/MM/AAAA e um horário válido no formato HH:MM.'
      );
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let reminderMessage = '';
      try {
        if (!selectedClinic) {
          throw new Error('Nenhuma clínica foi selecionada para a consulta.');
        }

        const reminder = await scheduleAppointmentReminder({
          appointmentDate: appointmentAt,
          clinicName: selectedClinic.name,
          specialty: selectedSpecialty.trim(),
        });

        if (reminder) {
          const reminderTime = reminder.reminderDate.toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
          });
          reminderMessage = ` Um lembrete foi programado para ${reminderTime}.`;
        } else {
          reminderMessage = ' Ative as notificações no Perfil para receber lembretes.';
        }
      } catch (notificationError) {
        console.error('Erro ao programar o lembrete da consulta:', notificationError);
        reminderMessage = notificationError instanceof Error
          ? ` Não foi possível programar o lembrete: ${notificationError.message}`
          : ' Não foi possível programar o lembrete da consulta.';
      }

      Alert.alert(
        'Consulta agendada',
        `Consulta agendada com sucesso na clínica ${selectedClinic?.name}.${reminderMessage}`
      );
      setIsAppointmentModalVisible(false);
      
      setAppointmentDate('');
      setAppointmentTime('');
      setSelectedSpecialty('');
      setAppointmentNotes('');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível concluir o agendamento.');
    } finally {
      setIsLoading(false);
    }
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
              <Text style={styles.mapBadgeText}>Clínicas cadastradas</Text>
            </View>
            <View style={styles.locationBadge}>
              <Ionicons name="locate-outline" size={15} color="#185A43" />
              <Text style={styles.locationBadgeText}>Rede Credenciada</Text>
            </View>
            
            {/* 🔹 Exibe os pins de forma segura na tela, distribuindo caso não venham coordenadas de porcentagem */}
            {filteredClinics.map((clinic, index) => {
              const isSelected = selectedClinic?.id === clinic.id;
              
              // Se a API não mandar coordenadas de layout válidas (0-100), distribui os pins automaticamente no mapa ilustrativo
              const fallbackLeft = 20 + (index * 25) % 65;
              const fallbackTop = 30 + (index * 20) % 50;

              const leftPos = (clinic.coordinates?.longitude !== undefined && clinic.coordinates?.longitude >= 0 && clinic.coordinates?.longitude <= 100) 
                ? clinic.coordinates.longitude 
                : fallbackLeft;
                
              const topPos = (clinic.coordinates?.latitude !== undefined && clinic.coordinates?.latitude >= 0 && clinic.coordinates?.latitude <= 100) 
                ? clinic.coordinates.latitude 
                : fallbackTop;

              return (
                <TouchableOpacity
                  key={clinic.id ?? index}
                  activeOpacity={0.7}
                  style={[styles.pinContainer, { left: `${leftPos}%`, top: `${topPos}%` }]}
                  onPress={() => setSelectedClinicId(clinic.id)}
                >
                  <View style={[styles.pinIconWrapper, isSelected ? styles.pinSelected : styles.pinUnselected]}>
                    <Ionicons name="paw" size={19} color="#FFFFFF" />
                  </View>
                  <View style={styles.pinDistanceBadge}>
                    <Text style={styles.pinDistanceText}>{clinic.distance ?? 'Parceiro'}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.partnersHeader}>
          <View>
            <Text style={styles.partnersTitle}>Parceiros credenciados</Text>
            <Text style={styles.partnersSubtitle}>{filteredClinics.length} opções para o seu pet</Text>
          </View>
          {activeFilter ? <TouchableOpacity activeOpacity={0.7} onPress={() => setActiveFilter(null)}><Text style={styles.clearFilterText}>Limpar filtro</Text></TouchableOpacity> : null}
        </View>

        {isLoadingClinics ? (
          <View style={styles.emptyCard}><Text style={styles.emptyText}>Carregando clínicas...</Text></View>
        ) : selectedClinic ? (
          <View style={styles.cardWrapper}>
            <ClinicCard 
              clinic={selectedClinic} 
              onRoute={handleRouteRequest} 
              onSchedule={() => setIsAppointmentModalVisible(true)}
            />
          </View>
        ) : (
          <View style={styles.emptyCard}><Text style={styles.emptyText}>Nenhuma clínica encontrada.</Text></View>
        )}
      </ScrollView>

      {isToastVisible ? (
        <View style={styles.toastContainer}>
          <Ionicons name="navigate" size={18} color="#A3D9C9" />
          <Text style={styles.toastText}>Traçando rota com o Waze/Maps...</Text>
          <Ionicons name="checkmark-circle" size={18} color="#A3D9C9" />
        </View>
      ) : null}

      <Modal
        visible={isAppointmentModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsAppointmentModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Agendar Consulta</Text>
                <Text style={styles.modalSubtitle}>{selectedClinic?.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsAppointmentModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={20} color="#185A43" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalFormContent} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Especialidade</Text>
                <TextInput
                  style={styles.textInput}
                  value={selectedSpecialty}
                  onChangeText={setSelectedSpecialty}
                  placeholder="Ex: Ortopedia, Clínica Geral..."
                  placeholderTextColor="#7E9F8E"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data da consulta</Text>
                <TextInput
                  style={styles.textInput}
                  value={appointmentDate}
                  onChangeText={(text) => setAppointmentDate(formatDateMask(text))}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#7E9F8E"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Horário</Text>
                <TextInput
                  style={styles.textInput}
                  value={appointmentTime}
                  onChangeText={(text) => setAppointmentTime(formatTimeMask(text))}
                  placeholder="HH:MM"
                  placeholderTextColor="#7E9F8E"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Observações (Opcional)</Text>
                <TextInput
                  style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
                  value={appointmentNotes}
                  onChangeText={setAppointmentNotes}
                  placeholder="Descreva brevemente o sintoma ou necessidade do pet"
                  placeholderTextColor="#7E9F8E"
                  multiline
                />
              </View>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.75}
                  onPress={() => setIsAppointmentModalVisible(false)}
                  disabled={isLoading}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
                  activeOpacity={0.75}
                  onPress={handleConfirmAppointment}
                  disabled={isLoading}
                >
                  <Text style={styles.saveButtonText}>{isLoading ? 'Agendando...' : 'Confirmar'}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(126, 159, 142, 0.15)',
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#185A43',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#7E9F8E',
    marginTop: 2,
  },
  closeButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(163, 217, 201, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalFormContent: {
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#185A43',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#185A43',
    backgroundColor: '#F8FAFC',
  },
  modalButtonRow: {
    zIndex: 1,
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7E9F8E',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#185A43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});