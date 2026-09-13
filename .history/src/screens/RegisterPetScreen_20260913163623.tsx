import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
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
import { createPetService, updatePetService, getStoredUserId } from '../services/eloPetService';
import { useAuth } from '../context/AuthProvider';

export default function RegisterPetScreen({ route, navigation }: { route?: any; navigation?: any }) {
  const { user } = useAuth();

  // Recebe o pet via parâmetros de navegação (se vier preenchido, estamos em modo edição)
  const petParam = route?.params?.pet;
  const isEditing = !!petParam?.idPet;

  console.log(petParam?.idPet, 'petParam.idPet');

  const [name, setName] = useState(petParam?.nome || '');
  const [species, setSpecies] = useState<'Cachorro' | 'Gato' | 'Outro'>(petParam?.especie || 'Cachorro');
  const [breed, setBreed] = useState(petParam?.raca || '');
  const [gender, setGender] = useState<'M' | 'F'>(petParam?.sexo || 'M');
  const [birthDate, setBirthDate] = useState(petParam?.dataNascimento || '');
  const [age, setAge] = useState<number>(petParam?.idadeAproximada || 0);
  const [castrationFlag, setCastrationFlag] = useState<number>(petParam?.flagCastrado ?? 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePet = async () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Por favor, informe o nome do seu pet.');
      return;
    }

    try {
      setIsLoading(true);

      const userId = user?.idResponsavel || user?.id || (await getStoredUserId());

      if (!userId) {
        throw new Error('ID do responsável não identificado. Faça login novamente.');
      }

      if (isEditing) {
        const petDataUpdate = {
          nome: name.trim(),
          especie: species,
          raca: breed.trim(),
          idadeAproximada: Number(age) || 0,
          dataNascimento: birthDate.trim(),
          sexo: gender,
          flagCastrado: castrationFlag,
        };

        await updatePetService(petParam.idPet, petDataUpdate);
        Alert.alert('Sucesso! 🐾', `${name} foi atualizado com sucesso!`, [
          {
            text: 'OK',
            onPress: () => {
              if (navigation?.goBack) {
                navigation.goBack();
              }
            },
          },
        ]);
      } else {

        const petDataCreate = {
          idResponsavel: Number(userId),
          pet: {
            nome: name.trim(),
            especie: species,
            raca: breed.trim(),
            idadeAproximada: Number(age) || 0,
            dataNascimento: birthDate.trim(),
            sexo: gender,
            flagCastrado: castrationFlag,
          },
        };

        await createPetService(petDataCreate);
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
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || `Não foi possível ${isEditing ? 'atualizar' : 'cadastrar'} o pet.`);
      console.log(error.response?.data)
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
              <Text style={styles.headerTitle}>{isEditing ? 'Editar Pet' : 'Novo Pet'}</Text>
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
              <Text style={styles.headerSubtitleTitle}>
                {isEditing ? 'Atualizar dados do pet' : 'Adicionar membro da família'}
              </Text>
              <Text style={styles.headerSubtitleText}>
                {isEditing ? `Modificando informações de ${name || 'seu pet'}` : 'Preencha os dados para acompanhar a saúde do seu pet'}
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
                      styles.selectionButton,
                      isSelected && styles.selectionButtonActive,
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
                        styles.selectionButtonText,
                        isSelected && styles.selectionButtonTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

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

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Idade aproximada</Text>
              <TextInput
                style={styles.textInput}
                value={age.toString()}
                onChangeText={(text) => setAge(parseInt(text) || 0)}
                placeholder="Ex: 2"
                placeholderTextColor="#7E9F8E"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Data de nascimento</Text>
              <TextInput
                style={styles.textInput}
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="Ex: 1999-12-18"
                placeholderTextColor="#7E9F8E"
              />
            </View>
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Sexo</Text>
              <View style={styles.speciesRow}>
                {(['M', 'F'] as const).map((item) => {
                  const isSelected = gender === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      activeOpacity={0.8}
                      style={[
                        styles.selectionButton,
                        isSelected && styles.selectionButtonActive,
                      ]}
                      onPress={() => setGender(item)}
                    >
                      <MaterialCommunityIcons
                        name={item === 'M' ? 'gender-male' : 'gender-female'}
                        size={16}
                        color={isSelected ? '#FFFFFF' : '#185A43'}
                      />
                      <Text
                        style={[
                          styles.selectionButtonText,
                          isSelected && styles.selectionButtonTextActive,
                        ]}
                      >
                        {item === 'M' ? 'Macho' : 'Fêmea'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Castrado?</Text>
              <View style={styles.speciesRow}>
                {[
                  { label: 'Não', value: 0 },
                  { label: 'Sim', value: 1 },
                ].map((item) => {
                  const isSelected = castrationFlag === item.value;
                  return (
                    <TouchableOpacity
                      key={item.label}
                      activeOpacity={0.8}
                      style={[
                        styles.selectionButton,
                        isSelected && styles.selectionButtonActive,
                      ]}
                      onPress={() => setCastrationFlag(item.value)}
                    >
                      <Text
                        style={[
                          styles.selectionButtonText,
                          isSelected && styles.selectionButtonTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, isLoading && { opacity: 0.7 }]}
            activeOpacity={0.8}
            onPress={handleSavePet}
            disabled={isLoading}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.saveButtonText}>
              {isLoading ? (isEditing ? 'Atualizando...' : 'Cadastrando...') : (isEditing ? 'Salvar Alterações' : 'Cadastrar Pet')}
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
  selectionButton: {
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
  selectionButtonActive: {
    backgroundColor: '#185A43',
    borderColor: '#185A43',
  },
  selectionButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#185A43',
  },
  selectionButtonTextActive: {
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
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});