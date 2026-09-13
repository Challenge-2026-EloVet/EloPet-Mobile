import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pet } from '../types/interfaces';

interface PetCardProps {
    pets: Pet[];
    onEdit: (pet: Pet) => void;
    onDelete: (pet: Pet) => void;
    ListHeaderComponent?: React.ReactElement | null;
    ListFooterComponent?: React.ReactElement | null;
}

export default function PetCard({
    pets,
    onEdit,
    onDelete,
    ListHeaderComponent,
    ListFooterComponent,
}: PetCardProps) {
    const renderItem = (data: { item: Pet }) => {
        const pet = data.item;
        const isCachorro = pet?.especie?.toLowerCase() === 'cachorro' || pet?.especie?.toLowerCase() === 'dog';

        return (
            <View style={styles.cardContainer}>
                <View style={styles.petIconWrapper}>
                    <MaterialCommunityIcons
                        name={isCachorro ? 'dog' : 'cat'}
                        size={22}
                        color="#185A43"
                    />
                </View>
                <View style={styles.petInfo}>
                    <Text style={styles.petName} numberOfLines={1}>
                        {pet?.nome || 'Nome não informado'}
                    </Text>
                    <Text style={styles.petDetails} numberOfLines={1}>
                        {pet?.raca || 'Raça não informada'} {pet?.idadeAproximada ? `· ${pet.idadeAproximada} anos` : ''}
                    </Text>
                </View>
            </View>
        );
    };

    const renderHiddenItem = (data: { item: Pet; index: number }, rowMap: any) => {
        const pet = data.item;
        const rowKey = String(pet.idPet || data.index);

        const closeRow = () => {
            if (rowMap[rowKey]) {
                rowMap[rowKey].closeRow();
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
                    <MaterialCommunityIcons name="pencil" size={18} color="#185A43" />
                    <Text style={styles.editBtnText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.backBtn, styles.deleteBtn]}
                    onPress={() => {
                        closeRow();
                        onDelete(pet);
                    }}
                >
                    <MaterialCommunityIcons name="trash-can" size={18} color="#FFFFFF" />
                    <Text style={styles.deleteBtnText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SwipeListView
            data={pets}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-140}
            previewRowKey={pets[0]?.idPet ? String(pets[0].idPet) : '0'}
            previewOpenValue={-30}
            previewOpenDelay={3000}
            disableRightSwipe={true}
            keyExtractor={(item, index) => String(item?.idPet || index)}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            ListEmptyComponent={
                <View style={styles.emptyCard}>
                    <View style={styles.petInfo}>
                        <Text style={styles.petName}>Nenhum pet cadastrado</Text>
                        <Text style={styles.petDetails}>Toque no '+' para adicionar o primeiro pet</Text>
                    </View>
                </View>
            }
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: 'rgba(126, 159, 142, 0.2)',
        elevation: 2,
        shadowColor: '#185A43',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    petIconWrapper: {
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: 'rgba(163, 217, 201, 0.45)',
    },
    petInfo: {
        marginLeft: 12,
        flex: 1,
    },
    petName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#185A43',
    },
    petDetails: {
        marginTop: 2,
        fontSize: 12,
        color: '#7E9F8E',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 20,
        overflow: 'hidden',
    },
    backBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 70,
        height: '100%',
        flexDirection: 'column',
        gap: 2,
    },
    editBtn: {
        backgroundColor: '#A3D9C9',
        right: 70,
    },
    deleteBtn: {
        backgroundColor: '#D9534F',
        right: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    editBtnText: {
        color: '#185A43',
        fontSize: 11,
        fontWeight: '700',
    },
    deleteBtnText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
    emptyCard: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(126, 159, 142, 0.2)',
        backgroundColor: '#FFFFFF',
        padding: 16,
        elevation: 2,
    },
});