import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StatusBar } from "react-native";
import MainTabs from "./src/components/MainTabs";
import { useAuth } from "./src/context/AuthProvider";
import Login from "./src/screens/Login";
import RegisterPetScreen from "./src/screens/RegisterPetScreen";

function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#185A43" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="RegisterPetScreen" component={RegisterPetScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}