import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Pet } from '../types/interfaces';

type HeaderProps = {
  pet: Pet;
};

export default function Header({ pet }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="cover" />
          </View>
          <View>
            <Text style={styles.brandText}>ELO VET</Text>
          </View>
        </View>
        <TouchableOpacity
          accessibilityLabel="Abrir notificações"
          activeOpacity={0.7}
          style={styles.notificationButton}
        >
          <Ionicons name="notifications-outline" size={20} color="#A3D9C9" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.hubText}>HEALTH HUB</Text>
          <Text style={styles.greetingText}>Olá, tutor do {pet,}!</Text>
          <Text style={styles.subtitleText}>Veja como ele está hoje.</Text>
        </View>
        <View style={styles.codeBadge}>
          <Ionicons name="paw" size={18} color="#A3D9C9" />
          <Text style={styles.codeText}>{pet.especie}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    overflow: 'hidden',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: '#185A43',
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 20,
  },
  topRow: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    marginRight: 12,
    height: 40,
    width: 40,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#A3D9C9',
  },
  logoImage: {
    height: '100%',
    width: '100%',
  },
  brandText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#A3D9C9',
  },
  notificationButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(163, 217, 201, 0.15)',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    flex: 1,
    paddingRight: 16,
  },
  hubText: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: 'medium',
    color: 'rgba(163, 217, 201, 0.7)',
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  subtitleText: {
    marginTop: 8,
    fontSize: 16,
    color: 'rgba(163, 217, 201, 0.8)',
  },
  codeBadge: {
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(163, 217, 201, 0.3)',
    backgroundColor: 'rgba(163, 217, 201, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  codeText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#A3D9C9',
  },
});