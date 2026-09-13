import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Pet } from '../types/interfaces';

interface PetCardProps {
    pets: Pet[];
    onEdit: (pet: Pet) => void;
    onDelete: (pet: Pet) => void;
}

export default function PetCard({ pets, onEdit, onDelete }: PetCardProps) {
    const renderItem = (data: { item: Pet }) => {
        const pet = data.item;
        const isCachorro = pet?.especie?.toLowerCase() === 'cachorro' || pet?.especie?.toLowerCase() === 'dog';

        return (
            <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                    <View style={[styles.iconBadge, { backgroundColor: 'rgba(24, 90, 67, 0.12)' }]}>
                        <MaterialCommunityIcons
                            name={isCachorro ? 'dog' : 'cat'}
                            size={20}
                            color="#185A43"
                        />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {pet?.nome}
                    </Text>
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {pet?.raca || 'Raça não informada'}
                    </Text>
                </View>

                <View style={styles.dataRow}>
                    <FontAwesome6 name="cake-candles" size={12} color="#7E9F8E" style={styles.dataIcon} />
                    <Text style={styles.dataText}>
                        {pet?.idadeAproximada ? `${pet.idadeAproximada} anos` : 'Idade não informada'}
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
                    <MaterialCommunityIcons name="pencil" size={20} color="#FFFFFF" />
                    <Text style={styles.backBtnText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.backBtn, styles.deleteBtn]}
                    onPress={() => {
                        closeRow();
                        onDelete(pet);
                    }}
                >
                    <MaterialCommunityIcons name="trash-can" size={20} color="#FFFFFF" />
                    <Text style={styles.backBtnText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (!pets || pets.length === 0) {
        return (
            <View style={styles.emptyCard}>
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
            rightOpenValue={-160} // Largura total dos botões ocultos (80 + 80)
            previewRowKey={pets[0]?.idPet ? String(pets[0].idPet) : '0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            disableRightSwipe={true}
            keyExtractor={(item, index) => String(item?.idPet || index)}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            contentContainerStyle={{ paddingBottom: 10 }}
        />
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(126, 159, 142, 0.2)',
        elevation: 2,
        shadowColor: '#185A43',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    iconBadge: {
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#185A43',
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: 12,
        color: '#7E9F8E',
        marginTop: 2,
    },
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(24, 90, 67, 0.04)',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    dataIcon: {
        marginRight: 6,
    },
    dataText: {
        fontSize: 12,
        fontWeight: '600',
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
    emptyCard: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(126, 159, 142, 0.2)',
        backgroundColor: '#FFFFFF',
        padding: 16,
        elevation: 2,
    },
    petInfo: {
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
});