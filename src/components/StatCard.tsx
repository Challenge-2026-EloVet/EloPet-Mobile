import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { QuickStat } from '../types/interfaces';

export default function StatCard({ stat }: { stat: QuickStat }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={stat.icon} size={19} color="#185A43" />
      </View>
      <Text style={styles.label}>{stat.label}</Text>
      <Text style={styles.value}>{stat.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 142,
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.25)',
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 20,
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(163, 217, 201, 0.45)',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: '#7E9F8E',
  },
  value: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#185A43',
  },
});