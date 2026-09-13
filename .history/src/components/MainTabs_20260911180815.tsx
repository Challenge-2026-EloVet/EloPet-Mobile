import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import ClinicSearchScreen from '../screens/ClinicSearchScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#185A43',
        tabBarInactiveTintColor: '#7E9F8E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#A3D9C9',
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={
              route.name === 'Home' ? 'home-outline' :
                route.name === 'Chat' ? 'chatbubble-ellipses-outline' :
                  route.name === 'Network' ? 'map-outline' : 'person-outline'
            }
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Resumo' }} 
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ tabBarLabel: 'Diário de saúde' }} 
      />
      <Tab.Screen 
        name="Network" 
        component={ClinicSearchScreen} 
        options={{ tabBarLabel: 'Rede credenciada' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Perfil' }} 
      />
      <Tab.Screen 
        name="PetForms" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
}