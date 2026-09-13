import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { Pet } from '../types/interfaces';

interface PetCardProps {
    pet: Pet;
    onEdit: () => void;
    onDelete: () => void;
}

export default function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
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

                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                        <MaterialCommunityIcons name="pencil" size={18} color="#185A43" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                        <MaterialCommunityIcons name="trash-can" size={18} color="#D9534F" />
                    </TouchableOpacity>
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
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
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
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 6,
        marginLeft: 8,
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
});