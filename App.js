import React, { useCallback } from "react";
import { NativeBaseProvider } from "native-base";
import { Home } from "./components/Home";
import { useFonts, Lato_700Bold, Lato_900Black, Lato_300Light, Lato_400Regular } from '@expo-google-fonts/lato';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from "./components/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Lato_700Bold, Lato_900Black, Lato_300Light, Lato_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: "Lato_700Bold",
          fontSize: 18
        }
      }}>
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{
          title: "Meu Perfil",
          headerStyle: {
            backgroundColor: '#7dd3fc',
            
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: "Lato_700Bold",
            fontSize: 18
          }
        }} name="Profile" component={Profile} />
      </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}