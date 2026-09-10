import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { responsible, thor } from '../mocks/mockData';

const profileActions = [
  { label: 'Dados pessoais', detail: 'Nome, e-mail e telefone', icon: 'person-outline' as const },
  { label: 'Notificações', detail: 'Alertas de saúde e lembretes', icon: 'notifications-outline' as const },
  { label: 'Privacidade e segurança', detail: 'Controle dos seus dados', icon: 'shield-checkmark-outline' as const },
];

export default function ProfileScreen() {
  const showActionFeedback = (label: string) => {
    Alert.alert(label, 'Esta área estará disponível em breve.');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.brandText}>ELO VET</Text>
              <Text style={styles.headerTitle}>Meu perfil</Text>
            </View>
            <TouchableOpacity
              accessibilityLabel="Editar perfil"
              activeOpacity={0.75}
              style={styles.editButton}
              onPress={() => showActionFeedback('Editar perfil')}
            >
              <Ionicons name="create-outline" size={19} color="#A3D9C9" />
            </TouchableOpacity>
          </View>
          <View style={styles.userRow}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{responsible.initials}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{responsible.name}</Text>
              <Text style={styles.userMemberSince}>{responsible.memberSince}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <View style={styles.contactIconWrapper}>
              <Ionicons name="person-circle-outline" size={19} color="#185A43" />
            </View>
            <Text style={styles.contactHeaderTitle}>Informações de contato</Text>
          </View>
          <View style={styles.contactDetailsList}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={16} color="#7E9F8E" />
              <Text style={styles.contactItemText}>{responsible.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={16} color="#7E9F8E" />
              <Text style={styles.contactItemText}>{responsible.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={16} color="#7E9F8E" />
              <Text style={styles.contactItemText}>{responsible.city}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Meus pets</Text>
              <Text style={styles.sectionSubtitle}>Animais vinculados à sua conta</Text>
            </View>
            <TouchableOpacity accessibilityLabel="Adicionar pet" activeOpacity={0.75} onPress={() => showActionFeedback('Adicionar pet')}>
              <Ionicons name="add-circle-outline" size={24} color="#185A43" />
            </TouchableOpacity>
          </View>
          <View style={styles.petCard}>
            <View style={styles.petIconWrapper}>
              <Ionicons name="paw" size={23} color="#185A43" />
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{thor.name}</Text>
              <Text style={styles.petDetails}>{thor.breed} · Código {thor.tutorCode}</Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color="#7E9F8E" />
          </View>
        </View>

        <View style={styles.preferencesContainer}>
          <Text style={styles.preferencesTitle}>Preferências</Text>
          <View style={styles.preferencesCard}>
            {profileActions.map((action, index) => (
              <TouchableOpacity
                key={action.label}
                activeOpacity={0.72}
                style={[
                  styles.preferenceItem,
                  index < profileActions.length - 1 ? styles.preferenceItemBorder : null,
                ]}
                onPress={() => showActionFeedback(action.label)}
              >
                <View style={styles.preferenceIconWrapper}>
                  <Ionicons name={action.icon} size={19} color="#185A43" />
                </View>
                <View style={styles.preferenceTextInfo}>
                  <Text style={styles.preferenceLabel}>{action.label}</Text>
                  <Text style={styles.preferenceDetail}>{action.detail}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#7E9F8E" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    paddingBottom: 40,
  },
  headerContainer: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: '#185A43',
    paddingHorizontal: 20,
    paddingBottom: 36,
    paddingTop: 24,
  },
  headerTopRow: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandText: {
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
  editButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(163, 217, 201, 0.2)',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    height: 76,
    width: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 4,
    borderColor: 'rgba(163, 217, 201, 0.4)',
    backgroundColor: '#A3D9C9',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#185A43',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userMemberSince: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(163, 217, 201, 0.8)',
  },
  contactCard: {
    marginHorizontal: 20,
    marginTop: -16,
    marginBottom: 28,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  contactHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIconWrapper: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(163, 217, 201, 0.45)',
  },
  contactHeaderTitle: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#185A43',
  },
  contactDetailsList: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(126, 159, 142, 0.15)',
    paddingTop: 12,
  },
  contactItem: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactItemText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#185A43',
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 28,
  },
  sectionHeader: {
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
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.2)',
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  petIconWrapper: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(163, 217, 201, 0.45)',
  },
  petInfo: {
    marginLeft: 12,
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#185A43',
  },
  petDetails: {
    marginTop: 4,
    fontSize: 12,
    color: '#7E9F8E',
  },
  preferencesContainer: {
    marginHorizontal: 20,
  },
  preferencesTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#185A43',
  },
  preferencesCard: {
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.2)',
    backgroundColor: '#FFFFFF',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  preferenceItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(126, 159, 142, 0.15)',
  },
  preferenceIconWrapper: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(163, 217, 201, 0.35)',
  },
  preferenceTextInfo: {
    marginLeft: 12,
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#185A43',
  },
  preferenceDetail: {
    marginTop: 4,
    fontSize: 12,
    color: '#7E9F8E',
  },
});