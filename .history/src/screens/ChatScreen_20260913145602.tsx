import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  id: string;
  text: string;
  sender: 'assistant' | 'tutor';
};

const quickReplies = [
  'Comeu bem e está ativo',
  'Comeu pouco',
  'Parece meio amuado/com dor',
];

const initialMessage: Message = {
  id: 'welcome',
  text: 'Olá! Como o {pet?.nome} se comportou hoje com relação ao apetite e energia? 🐾',
  sender: 'assistant',
};

function getAssistantReply(reply: string, pet: Pet) {
  if (reply === quickReplies[0]) {
    return 'Que bom saber disso! Vou registrar que o {pet?.nome} está com bom apetite e energia hoje. Continue observando com carinho. 🌿';
  }

  if (reply === quickReplies[1]) {
    return 'Obrigada por me contar. Registrei a redução do apetite. Ofereça água e observe o {pet?.nome}; se ele recusar a próxima refeição, avise a clínica. 💚';
  }

  return 'Sinto muito que ele pareça desconfortável. Registrei esse sinal de atenção. Evite saltos e, se a dor persistir ou piorar, fale com a VetLife. 🩺';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isSending]);

  const sendReply = (reply: string) => {
    if (isSending) return;

    setMessages((current) => [
      ...current,
      { id: `${reply}-tutor`, text: reply, sender: 'tutor' },
    ]);
    setIsSending(true);

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `${reply}-assistant`, text: getAssistantReply(reply), sender: 'assistant' },
      ]);
      setIsSending(false);
    }, 850);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View style={styles.avatarContainer}>
            <Ionicons name="medical" size={22} color="#A3D9C9" />
          </View>
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.headerTitle}>Assistente Elo Vet</Text>
              <View style={styles.checkBadge}>
                <Ionicons name="checkmark" size={11} color="#185A43" />
              </View>
            </View>
            <Text style={styles.headerSubtitle}>Clínica VetLife · online agora</Text>
          </View>
          <TouchableOpacity accessibilityLabel="Mais opções" activeOpacity={0.7} style={styles.optionsButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#A3D9C9" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatScroll}
        contentContainerStyle={styles.chatContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dateBadge}>
          <Text style={styles.dateBadgeText}>Diário de saúde · hoje</Text>
        </View>

        {messages.map((message) => {
          const isTutor = message.sender === 'tutor';
          return (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                isTutor ? styles.messageWrapperTutor : styles.messageWrapperAssistant,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isTutor ? styles.bubbleTutor : styles.bubbleAssistant,
                ]}
              >
                <Text style={[styles.messageText, isTutor ? styles.textTutor : styles.textAssistant]}>
                  {message.text}
                </Text>
              </View>
              <Text style={[styles.messageTime, isTutor ? styles.timeTutor : styles.timeAssistant]}>
                {isTutor ? 'Você · agora' : 'Assistente Elo Vet · agora'}
              </Text>
            </View>
          );
        })}

        {isSending ? (
          <View style={[styles.messageWrapper, styles.messageWrapperAssistant]}>
            <View style={[styles.messageBubble, styles.bubbleAssistant]}>
              <Text style={styles.typingText}>Assistente está digitando...</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footerContainer}>
        <Text style={styles.quickRepliesTitle}>Respostas rápidas</Text>
        <View style={styles.quickRepliesList}>
          {quickReplies.map((reply, index) => (
            <TouchableOpacity
              key={reply}
              accessibilityRole="button"
              activeOpacity={0.72}
              style={[
                styles.quickReplyButton,
                isSending ? styles.quickReplyDisabled : styles.quickReplyActive,
              ]}
              disabled={isSending}
              onPress={() => sendReply(reply)}
            >
              <Ionicons
                name={
                  index === 0
                    ? 'sunny-outline'
                    : index === 1
                    ? 'restaurant-outline'
                    : 'heart-dislike-outline'
                }
                size={17}
                color="#185A43"
              />
              <Text style={styles.quickReplyText}>{reply}</Text>
              <Ionicons name="arrow-up-circle-outline" size={19} color="#185A43" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    backgroundColor: '#185A43',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(163, 217, 201, 0.25)',
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  checkBadge: {
    marginLeft: 8,
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#A3D9C9',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: 'rgba(163, 217, 201, 0.75)',
  },
  optionsButton: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatScroll: {
    flex: 1,
  },
  chatContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 24,
  },
  dateBadge: {
    marginBottom: 24,
    alignSelf: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(163, 217, 201, 0.35)',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dateBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#185A43',
  },
  messageWrapper: {
    marginBottom: 12,
    maxWidth: '86%',
  },
  messageWrapperTutor: {
    alignSelf: 'flex-end',
  },
  messageWrapperAssistant: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleTutor: {
    borderBottomRightRadius: 4,
    backgroundColor: '#185A43',
  },
  bubbleAssistant: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(126, 159, 142, 0.15)',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  textTutor: {
    color: '#FFFFFF',
  },
  textAssistant: {
    color: '#185A43',
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E9F8E',
  },
  messageTime: {
    marginTop: 4,
    fontSize: 10,
    color: '#7E9F8E',
  },
  timeTutor: {
    textAlign: 'right',
  },
  timeAssistant: {
    textAlign: 'left',
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(126, 159, 142, 0.15)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
  },
  quickRepliesTitle: {
    marginBottom: 12,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#7E9F8E',
  },
  quickRepliesList: {
    gap: 8,
  },
  quickReplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  quickReplyActive: {
    borderColor: 'rgba(24, 90, 67, 0.2)',
    backgroundColor: 'rgba(163, 217, 201, 0.15)',
  },
  quickReplyDisabled: {
    borderColor: 'rgba(126, 159, 142, 0.15)',
    backgroundColor: '#F8FAFC',
    opacity: 0.5,
  },
  quickReplyText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#185A43',
  },
});