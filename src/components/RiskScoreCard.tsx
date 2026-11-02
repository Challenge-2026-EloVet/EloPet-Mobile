import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type RiskScoreCardProps = {
  pet: any;
  scoreData: any;
};

export default function RiskScoreCard({ pet, scoreData }: RiskScoreCardProps) {
  const valorNum = Number(scoreData?.valor ?? 7.2);
  const categoria = scoreData?.categoria ?? 'Atenção Geral';
  const observacao = scoreData?.observacao ?? 'Acompanhamento regular de saúde';
  const recomendacao = scoreData?.recomendacao ?? `Mantenha os cuidados em dia para o(a) ${pet?.nome || 'pet'}.`;

  const getThemeByScore = (score: number) => {
    if (score <= 5) {
      return {
        borderLeftColor: '#E57373',
        iconBg: 'rgba(229, 115, 115, 0.2)',
        circleBorder: 'rgba(229, 115, 115, 0.35)',
        circleInner: '#E57373',
        badgeBg: 'rgba(229, 115, 115, 0.2)',
        badgeText: '#C62828',
      };
    } else if (score >= 8) {
      return {
        borderLeftColor: '#64B5F6',
        iconBg: 'rgba(100, 181, 246, 0.2)',
        circleBorder: 'rgba(100, 181, 246, 0.35)',
        circleInner: '#64B5F6',
        badgeBg: 'rgba(100, 181, 246, 0.2)',
        badgeText: '#1565C0',
      };
    } else {
      return {
        borderLeftColor: '#DFB461',
        iconBg: 'rgba(223, 180, 97, 0.2)',
        circleBorder: 'rgba(223, 180, 97, 0.35)',
        circleInner: '#DFB461',
        badgeBg: 'rgba(223, 180, 97, 0.2)',
        badgeText: '#185A43',
      };
    }
  };

  const theme = getThemeByScore(valorNum);

  return (
    <View style={[styles.card, { borderLeftColor: theme.borderLeftColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconContainer, { backgroundColor: theme.iconBg }]}>
            <Ionicons name="pulse" size={23} color="#185A43" />
          </View>
          <View>
            <Text style={styles.scoreLabel}>SCORE DE RISCO</Text>
            <Text style={styles.petInfo}></Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}>
          <Text style={[styles.badgeText, { color: theme.badgeText }]}>
            {valorNum <= 5 ? 'CRÍTICO' : valorNum >= 8 ? 'ESTÁVEL' : 'ATENÇÃO'}
          </Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <View style={[styles.circleOuter, { borderColor: theme.circleBorder }]}>
          <View style={[styles.circleInner, { borderColor: theme.circleInner }]} />
          <Text style={styles.scoreNumber}>{valorNum.toFixed(1)}</Text>
          <Text style={styles.scoreMax}>/10</Text>
        </View>
        <View style={styles.contentDetails}>
          <Text style={styles.alertTitle}>{categoria}</Text>
          <Text style={styles.alertDescription}>{observacao}</Text>
        </View>
      </View>

      <View style={styles.recommendationContainer}>
        <View style={styles.recommendationHeader}>
          <Ionicons name="chatbubble-ellipses-outline" size={16} color="#185A43" />
          <Text style={styles.recommendationTitle}>Recomendação clínica</Text>
        </View>
        <Text style={styles.recommendationText}>{recomendacao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: -16,
    marginBottom: 32,
    borderRadius: 24,
    borderLeftWidth: 6,
    backgroundColor: '#FFFFFF',
    padding: 24,
    shadowColor: '#185A43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#7E9F8E',
  },
  petInfo: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#185A43',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleOuter: {
    marginRight: 20,
    height: 92,
    width: 92,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 7,
  },
  circleInner: {
    position: 'absolute',
    height: 78,
    width: 78,
    borderRadius: 999,
    borderWidth: 7,
  },
  scoreNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#185A43',
  },
  scoreMax: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7E9F8E',
  },
  contentDetails: {
    flex: 1,
  },
  alertTitle: {
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    color: '#185A43',
  },
  alertDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7E9F8E',
  },
  recommendationContainer: {
    marginTop: 24,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  recommendationHeader: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationTitle: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#185A43',
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7E9F8E',
  },
});