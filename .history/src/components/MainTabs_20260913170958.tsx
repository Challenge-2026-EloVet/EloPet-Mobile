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
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
        tabBarLabelStyle: { 
          fontSize: 10, 
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({ color }) => (
          <Ionicons
            name={
              route.name === 'Home' ? 'home-outline' :
                route.name === 'Chat' ? 'chatbubble-ellipses-outline' :
                  route.name === 'Network' ? 'map-outline' : 'person-outline'
            }
            size={22}
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
        options={{ tabBarLabel: 'Diário' }}
      />
      <Tab.Screen
        name="Network"
        component={ClinicSearchScreen}
        options={{ tabBarLabel: 'Rede' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}