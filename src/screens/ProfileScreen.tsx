import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { responsible, thor } from '../mocks/mockData';

const profileActions = [
  { label: 'Dados pessoais', detail: 'Nome, e-mail e telefone', icon: 'person-outline' as const },
  { label: 'Notificações', detail: 'Alertas de saúde e lembretes', icon: 'notifications-outline' as const },
  { label: 'Privacidade e segurança', detail: 'Controle dos seus dados', icon: 'shield-checkmark-outline' as const },
];

export default function ProfileScreen() {
  const showActionFeedback = (label: string) => {
    Alert.alert(label, 'Esta área estará disponível em breve.');
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1" contentContainerClassName="pb-10" showsVerticalScrollIndicator={false}>
        <View className="rounded-b-[32px] bg-[#185A43] px-5 pb-9 pt-6">
          <View className="mb-8 flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-bold uppercase tracking-[2px] text-[#A3D9C9]">ELO VET</Text>
              <Text className="mt-2 text-2xl font-bold text-white">Meu perfil</Text>
            </View>
            <TouchableOpacity
              accessibilityLabel="Editar perfil"
              activeOpacity={0.75}
              className="h-10 w-10 items-center justify-center rounded-full bg-[#A3D9C9]/20"
              onPress={() => showActionFeedback('Editar perfil')}
            >
              <Ionicons name="create-outline" size={19} color="#A3D9C9" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <View className="h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-[#A3D9C9]/40 bg-[#A3D9C9]">
              <Text className="text-2xl font-bold text-[#185A43]">{responsible.initials}</Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-white">{responsible.name}</Text>
              <Text className="mt-1 text-sm text-[#A3D9C9]/80">{responsible.memberSince}</Text>
            </View>
          </View>
        </View>

        <View className="mx-5 -mt-4 mb-7 rounded-3xl bg-white p-5 shadow-md shadow-[#185A43]/10">
          <View className="mb-4 flex-row items-center">
            <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#A3D9C9]/45">
              <Ionicons name="person-circle-outline" size={19} color="#185A43" />
            </View>
            <Text className="ml-3 text-base font-bold text-[#185A43]">Informações de contato</Text>
          </View>
          <View className="border-t border-[#7E9F8E]/15 pt-3">
            <View className="mb-3 flex-row items-center">
              <Ionicons name="mail-outline" size={16} color="#7E9F8E" />
              <Text className="ml-3 text-sm text-[#185A43]">{responsible.email}</Text>
            </View>
            <View className="mb-3 flex-row items-center">
              <Ionicons name="call-outline" size={16} color="#7E9F8E" />
              <Text className="ml-3 text-sm text-[#185A43]">{responsible.phone}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#7E9F8E" />
              <Text className="ml-3 text-sm text-[#185A43]">{responsible.city}</Text>
            </View>
          </View>
        </View>

        <View className="mx-5 mb-7">
          <View className="mb-4 flex-row items-end justify-between">
            <View>
              <Text className="text-xl font-bold text-[#185A43]">Meus pets</Text>
              <Text className="mt-1 text-sm text-[#7E9F8E]">Animais vinculados à sua conta</Text>
            </View>
            <TouchableOpacity accessibilityLabel="Adicionar pet" activeOpacity={0.75} onPress={() => showActionFeedback('Adicionar pet')}>
              <Ionicons name="add-circle-outline" size={24} color="#185A43" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center rounded-3xl border border-[#7E9F8E]/20 bg-white p-4 shadow-sm shadow-[#185A43]/5">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#A3D9C9]/45">
              <Ionicons name="paw" size={23} color="#185A43" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-base font-bold text-[#185A43]">{thor.name}</Text>
              <Text className="mt-1 text-xs text-[#7E9F8E]">{thor.breed} · Código {thor.tutorCode}</Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color="#7E9F8E" />
          </View>
        </View>

        <View className="mx-5">
          <Text className="mb-4 text-xl font-bold text-[#185A43]">Preferências</Text>
          <View className="overflow-hidden rounded-3xl border border-[#7E9F8E]/20 bg-white">
            {profileActions.map((action, index) => (
              <TouchableOpacity
                key={action.label}
                activeOpacity={0.72}
                className={`flex-row items-center p-4 ${index < profileActions.length - 1 ? 'border-b border-[#7E9F8E]/15' : ''}`}
                onPress={() => showActionFeedback(action.label)}
              >
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#A3D9C9]/35">
                  <Ionicons name={action.icon} size={19} color="#185A43" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-bold text-[#185A43]">{action.label}</Text>
                  <Text className="mt-1 text-xs text-[#7E9F8E]">{action.detail}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#7E9F8E" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}