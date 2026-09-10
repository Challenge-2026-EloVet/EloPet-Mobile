import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Clinic } from '../types/interfaces';

type ClinicCardProps = {
  clinic: Clinic;
  onRoute: () => void;
};

export default function ClinicCard({ clinic, onRoute }: ClinicCardProps) {
  const confirmAppointment = () => {
    Alert.alert('Solicitação enviada', `A ${clinic.name} recebeu seu pedido de agendamento.`, [
      { text: 'Entendi', style: 'default' },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.clinicName}>{clinic.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={15} color="#7E9F8E" />
            <Text style={styles.locationText}>{clinic.distance} · {clinic.address}</Text>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={13} color="#DFB461" />
          <Text style={styles.ratingText}>{clinic.rating}</Text>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {clinic.specialties.map((specialty) => (
          <View key={specialty} style={styles.specialtyBadge}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
        {clinic.accessibility.map((item) => (
          <View key={item} style={styles.accessibilityBadge}>
            <Text style={styles.accessibilityText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.phoneContainer}>
        <Ionicons name="call-outline" size={15} color="#7E9F8E" />
        <Text style={styles.phoneText}>{clinic.phone}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity activeOpacity={0.75} style={[styles.button, styles.primaryButton]} onPress={confirmAppointment}>
          <Ionicons name="calendar-outline" size={17} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Agendar Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} style={[styles.button, styles.secondaryButton]} onPress={onRoute}>
          <Ionicons name="navigate-outline" size={17} color="#185A43" />
          <Text style={styles.secondaryButtonText}>Como Chegar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.2)',
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Equivalente a shadow-md no Android
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flex: 1,
    paddingRight: 12,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#185A43',
  },
  locationContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#7E9F8E',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(223, 180, 97, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#185A43',
  },
  tagsContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // Nota: 'gap' é suportado nas versões mais recentes do React Native. Se der erro, use margin nas tags.
  },
  specialtyBadge: {
    borderRadius: 999,
    backgroundColor: 'rgba(163, 217, 201, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  specialtyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#185A43',
  },
  accessibilityBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  accessibilityText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#7E9F8E',
  },
  phoneContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#7E9F8E',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12, // Nota: Equivalente a gap-3.
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  primaryButton: {
    backgroundColor: '#185A43',
  },
  primaryButtonText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#185A43',
  },
  secondaryButtonText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#185A43',
  },
});