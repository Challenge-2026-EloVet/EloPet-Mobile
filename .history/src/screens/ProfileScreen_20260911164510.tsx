import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { thor } from '../mocks/mockData';
import { useRoute, useNavigation } from '@react-navigation/native';
import { User } from '../types/interfaces';
import { updateUserService } from '../services/eloPetService';

// Serviço de logout (pode ser mantido aqui ou importado do seu arquivo de services)
const handleL = async () => {
  try {
    await storage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover o token:', error);
    throw error;
  }
};

export default function ProfileScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userFromParams: any = route.params?.user || {};

  const userId = userFromParams.id || userFromParams._id || userFromParams.userId;

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(userFromParams.nomeUsuario || userFromParams.nomeCompleto || 'Usuário');
  const [email, setEmail] = useState(userFromParams.email || '');
  const [phone, setPhone] = useState(userFromParams.telefone || '');
  const [city, setCity] = useState(userFromParams.cidade || '');

  const getInitials = (text: string) => {
    if (!text) return 'UV';
    const parts = text.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const userInitials = getInitials(name);

  const profileActions = [
    {
      label: 'Dados pessoais',
      detail: 'Nome, e-mail e telefone',
      icon: 'person-outline' as const,
      onPress: () => setIsEditing(true)
    },
    {
      label: 'Notificações',
      detail: 'Alertas de saúde e lembretes',
      icon: 'notifications-outline' as const,
      onPress: () => showActionFeedback('Notificações')
    },
    {
      label: 'Privacidade e segurança',
      detail: 'Controle dos seus dados',
      icon: 'shield-checkmark-outline' as const,
      onPress: () => showActionFeedback('Privacidade e segurança')
    },
  ];

  const showActionFeedback = (label: string) => {
    Alert.alert(label, 'Esta área estará disponível em breve.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente encerrar sua sessão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutService();
              // Redireciona para a tela de Login e limpa o histórico de navegação
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Ajuste 'Login' para o nome exato da sua rota de login
              });
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível sair da conta.');
            }
          },
        },
      ]
    );
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não encontrado para atualização.');
      return;
    }

    try {
      setIsLoading(true);

      const updatedData = {
        nomeUsuario: name,
        email: email,
        telefone: phone,
        cidade: city,
      };

      await updateUserService(userId, updatedData);

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      setIsEditing(false);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível atualizar os dados.');
    } finally {
      setIsLoading(false);
    }
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
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="create-outline" size={19} color="#A3D9C9" />
            </TouchableOpacity>
          </View>
          <View style={styles.userRow}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{userInitials}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userMemberSince}>Membro desde 2026</Text>
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
              <Text style={styles.contactItemText}>{email || 'Não informado'}</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={16} color="#7E9F8E" />
              <Text style={styles.contactItemText}>{phone || 'Não informado'}</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={16} color="#7E9F8E" />
              <Text style={styles.contactItemText}>{city || 'Não informada'}</Text>
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
              <Text style={styles.petName}>{thor.nome}</Text>
              <Text style={styles.petDetails}>{thor.raca} · Código {thor.idadeAproximada}</Text>
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
                onPress={action.onPress}
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

          {/* Botão de Sair da Conta */}
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <View style={styles.logoutIconWrapper}>
              <Ionicons name="log-out-outline" size={19} color="#D9534F" />
            </View>
            <View style={styles.preferenceTextInfo}>
              <Text style={styles.logoutLabel}>Sair da conta</Text>
              <Text style={styles.logoutDetail}>Encerrar sessão atual</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D9534F" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={isEditing}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar dados pessoais</Text>
              <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.closeButton}>
                <Ionicons name="close" size={20} color="#185A43" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalFormContent} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome completo</Text>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Seu nome"
                  placeholderTextColor="#7E9F8E"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>E-mail</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Seu e-mail"
                  placeholderTextColor="#7E9F8E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Seu telefone"
                  placeholderTextColor="#7E9F8E"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cidade</Text>
                <TextInput
                  style={styles.textInput}
                  value={city}
                  onChangeText={setCity}
                  placeholder="Sua cidade"
                  placeholderTextColor="#7E9F8E"
                />
              </View>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  activeOpacity={0.75}
                  pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
                  activeOpacity={0.75}
                  onPress={handleSave}
                  disabled={isLoading}
                >
                  <Text style={styles.saveButtonText}>{isLoading ? 'Salvando...' : 'Salvar'}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    boxShadow: '0px 4px 6px rgba(24, 90, 67, 0.1)',
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
    boxShadow: '0px 2px 4px rgba(24, 90, 67, 0.05)',
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(217, 83, 79, 0.25)',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    boxShadow: '0px 2px 4px rgba(217, 83, 79, 0.05)',
    elevation: 2,
  },
  logoutIconWrapper: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(217, 83, 79, 0.1)',
  },
  logoutLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D9534F',
  },
  logoutDetail: {
    marginTop: 4,
    fontSize: 12,
    color: '#D9534F',
    opacity: 0.8,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    boxShadow: '0px 8px 16px rgba(24, 90, 67, 0.2)',
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(126, 159, 142, 0.15)',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#185A43',
  },
  closeButton: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(163, 217, 201, 0.3)',
  },
  modalFormContent: {
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#185A43',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#185A43',
    backgroundColor: '#F8FAFC',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.4)',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7E9F8E',
  },
  saveButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#185A43',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});