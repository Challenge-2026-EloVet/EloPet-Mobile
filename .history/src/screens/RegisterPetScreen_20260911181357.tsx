import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterPetScreen({ navigation }: { navigation?: any }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'Cachorro' | 'Gato' | 'Outro'>('Cachorro');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterPet = async () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Por favor, informe o nome do seu pet.');
      return;
    }

    try {
      setIsLoading(true);

      // colocar API REAL 
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert('Oba! 🐾', `${name} foi cadastrado com sucesso!`, [
        {
          text: 'OK',
          onPress: () => {
            if (navigation?.goBack) {
              navigation.goBack();
            }
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível cadastrar o pet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.brandText}>ELO VET</Text>
              <Text style={styles.headerTitle}>Novo Pet</Text>
            </View>
            <TouchableOpacity
              accessibilityLabel="Voltar"
              activeOpacity={0.75}
              style={styles.backButton}
              onPress={() => navigation?.goBack?.()}
            >
              <Ionicons name="arrow-back" size={19} color="#A3D9C9" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerSubtitleRow}>
            <View style={styles.headerIconWrapper}>
              <Ionicons name="paw" size={24} color="#185A43" />
            </View>
            <View style={styles.headerSubtitleInfo}>
              <Text style={styles.headerSubtitleTitle}>Adicionar membro da família</Text>
              <Text style={styles.headerSubtitleText}>
                Preencha os dados para acompanhar a saúde do seu pet
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Espécie</Text>
            <View style={styles.speciesRow}>
              {(['Cachorro', 'Gato', 'Outro'] as const).map((item) => {
                const isSelected = species === item;
                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.8}
                    style={[
                      styles.speciesButton,
                      isSelected && styles.speciesButtonActive,
                    ]}
                    onPress={() => setSpecies(item)}
                  >
                    <MaterialCommunityIcons 
                      name={
                        item === 'Cachorro'
                          ? 'dog'
                          : item === 'Gato'
                          ? 'cat'
                          : 'heart-outline'
                      }
                      size={16}
                      color={isSelected ? '#FFFFFF' : '#185A43'}
                    />
                    <Text
                      style={[
                        styles.speciesButtonText,
                        isSelected && styles.speciesButtonTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Nome do Pet */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome do pet</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Ex: Thor, Mel, Pipoca..."
              placeholderTextColor="#7E9F8E"
            />
          </View>

          {/* Raça */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Raça</Text>
            <TextInput
              style={styles.textInput}
              value={breed}
              onChangeText={setBreed}
              placeholder="Ex: Golden Retriever, SRD, Persa..."
              placeholderTextColor="#7E9F8E"
            />
          </View>

          {/* Idade e Peso em Linha */}
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Idade aproximada</Text>
              <TextInput
                style={styles.textInput}
                value={age}
                onChangeText={setAge}
                placeholder="Ex: 2 anos"
                placeholderTextColor="#7E9F8E"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Peso (kg)</Text>
              <TextInput
                style={styles.textInput}
                value={weight}
                onChangeText={setWeight}
                placeholder="Ex: 12.5 kg"
                placeholderTextColor="#7E9F8E"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
            activeOpacity={0.8}
            onPress={handleRegisterPet}
            disabled={isLoading}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Cadastrando...' : 'Cadastrar Pet'}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 24,
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
  backButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(163, 217, 201, 0.2)',
  },
  headerSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 16,
  },
  headerIconWrapper: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#A3D9C9',
  },
  headerSubtitleInfo: {
    marginLeft: 14,
    flex: 1,
  },
  headerSubtitleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitleText: {
    marginTop: 2,
    fontSize: 12,
    color: 'rgba(163, 217, 201, 0.9)',
  },
  formCard: {
    marginHorizontal: 20,
    marginTop: -16,
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 20,
    boxShadow: '0px 4px 6px rgba(24, 90, 67, 0.1)',
    elevation: 3,
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
  speciesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  speciesButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.3)',
    borderRadius: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    gap: 6,
  },
  speciesButtonActive: {
    backgroundColor: '#185A43',
    borderColor: '#185A43',
  },
  speciesButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#185A43',
  },
  speciesButtonTextActive: {
    color: '#FFFFFF',
  },
  rowInputs: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  saveButton: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#185A43',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 6px rgba(24, 90, 67, 0.15)',
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});