import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
  text: 'Olá! Como o Thor se comportou hoje com relação ao apetite e energia? 🐾',
  sender: 'assistant',
};

function getAssistantReply(reply: string) {
  if (reply === quickReplies[0]) {
    return 'Que bom saber disso! Vou registrar que o Thor está com bom apetite e energia hoje. Continue observando com carinho. 🌿';
  }

  if (reply === quickReplies[1]) {
    return 'Obrigada por me contar. Registrei a redução do apetite. Ofereça água e observe o Thor; se ele recusar a próxima refeição, avise a clínica. 💚';
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
    <View className="flex-1 bg-[#F8FAFC]">
      <View className="bg-[#185A43] px-5 pb-5 pt-5">
        <View className="flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#A3D9C9]/25">
            <Ionicons name="medical" size={22} color="#A3D9C9" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-base font-bold text-white">Assistente Elo Vet</Text>
              <View className="ml-2 h-4 w-4 items-center justify-center rounded-full bg-[#A3D9C9]">
                <Ionicons name="checkmark" size={11} color="#185A43" />
              </View>
            </View>
            <Text className="mt-1 text-xs text-[#A3D9C9]/75">Clínica VetLife · online agora</Text>
          </View>
          <TouchableOpacity accessibilityLabel="Mais opções" activeOpacity={0.7} className="h-9 w-9 items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={20} color="#A3D9C9" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerClassName="px-5 pb-5 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 self-center rounded-full bg-[#A3D9C9]/35 px-3 py-1">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-[#185A43]">Diário de saúde · hoje</Text>
        </View>

        {messages.map((message) => (
          <View key={message.id} className={`mb-3 max-w-[86%] ${message.sender === 'tutor' ? 'self-end' : 'self-start'}`}>
            <View className={`rounded-2xl px-4 py-3 ${message.sender === 'tutor' ? 'rounded-br-sm bg-[#185A43]' : 'rounded-bl-sm border border-[#7E9F8E]/15 bg-white'}`}>
              <Text className={`text-[15px] leading-5 ${message.sender === 'tutor' ? 'text-white' : 'text-[#185A43]'}`}>{message.text}</Text>
            </View>
            <Text className={`mt-1 text-[10px] text-[#7E9F8E] ${message.sender === 'tutor' ? 'text-right' : 'text-left'}`}>
              {message.sender === 'tutor' ? 'Você · agora' : 'Assistente Elo Vet · agora'}
            </Text>
          </View>
        ))}

        {isSending ? (
          <View className="mb-3 self-start rounded-2xl rounded-bl-sm border border-[#7E9F8E]/15 bg-white px-4 py-3">
            <Text className="text-sm italic text-[#7E9F8E]">Assistente está digitando...</Text>
          </View>
        ) : null}
      </ScrollView>

      <View className="border-t border-[#7E9F8E]/15 bg-white px-5 pb-5 pt-4">
        <Text className="mb-3 text-xs font-bold uppercase tracking-wider text-[#7E9F8E]">Respostas rápidas</Text>
        <View className="gap-2">
          {quickReplies.map((reply, index) => (
            <TouchableOpacity
              key={reply}
              accessibilityRole="button"
              activeOpacity={0.72}
              className={`flex-row items-center rounded-2xl border px-4 py-3 ${isSending ? 'border-[#7E9F8E]/15 bg-[#F8FAFC] opacity-50' : 'border-[#185A43]/20 bg-[#A3D9C9]/15'}`}
              disabled={isSending}
              onPress={() => sendReply(reply)}
            >
              <Ionicons name={index === 0 ? 'sunny-outline' : index === 1 ? 'restaurant-outline' : 'heart-dislike-outline'} size={17} color="#185A43" />
              <Text className="ml-3 flex-1 text-sm font-semibold text-[#185A43]">{reply}</Text>
              <Ionicons name="arrow-up-circle-outline" size={19} color="#185A43" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}