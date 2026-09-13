import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';

interface PetCardProps {
  pets: any[];
  onEdit: (pet: any) => void;
  onDelete: (pet: any) => void;
  onAddPress: () => void;
}

export default function PetCard({ pets, onEdit, onDelete, onAddPress }: PetCardProps) {
  // Normaliza o objeto caso venha aninhado como { pet: { ... } } ou direto
  const getPetData = (item: any) => (item?.pet ? item.pet : item);

  const renderItem = (data: any, rowMap: any) => {
    const pet = getPetData(data.item);
    const index = data.index;

    return (
      <View style={[styles.petCard, index > 0 && { marginTop: 10 }]}>
        <View style={styles.petIconWrapper}>
          <Ionicons name="paw" size={23} color="#185A43" />
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{pet?.nome || 'Nome não informado'}</Text>
          <Text style={styles.petDetails}>
            {pet?.raca || 'Raça não informada'} · Idade: {pet?.idadeAproximada || 'Não informada'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="#7E9F8E" />
      </View>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    const item = data.item;
    const pet = getPetData(item);

    const closeRow = () => {
      if (rowMap[data.item.idPet || data.index]) {
        rowMap[data.item.idPet || data.index].closeRow();
      }
    };

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backBtn, styles.editBtn]}
          onPress={() => {
            closeRow();
            onEdit(pet);
          }}
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <Text style={styles.backBtnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backBtn, styles.deleteBtn]}
          onPress={() => {
            closeRow();
            onDelete(pet);
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
          <Text style={styles.backBtnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!pets || pets.length === 0) {
    return (
      <View style={styles.petCard}>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>Nenhum pet cadastrado</Text>
          <Text style={styles.petDetails}>Toque no '+' para adicionar o primeiro pet</Text>
        </View>
      </View>
    );
  }

  return (
    <SwipeListView
      data={pets}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-160} // Largura total dos botões ocultos
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      disableRightSwipe={true} // Permite apenas arrastar para a esquerda
      keyExtractor={(item, index) => {
        const pet = getPetData(item);
        return String(pet?.idPet || item?.idPetResponsavel || index);
      }}
      contentContainerStyle={{ paddingBottom: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.2)',
    backgroundColor: '#FFFFFF',
    padding: 16,
    elevation: 2,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 24,
    overflow: 'hidden',
    marginVertical: 2,
  },
  backBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 80,
    height: '100%',
    flexDirection: 'column',
    gap: 4,
  },
  editBtn: {
    backgroundColor: '#4A90E2',
    right: 80,
  },
  deleteBtn: {
    backgroundColor: '#D9534F',
    right: 0,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});