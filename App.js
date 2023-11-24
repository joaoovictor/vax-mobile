import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Lato_700Bold, Lato_900Black, Lato_300Light, Lato_400Regular } from '@expo-google-fonts/lato';
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { Cadastro } from "./components/Cadastro";
import UserService from "./services/UserService";
import VacinaScreen from "./components/VacinaScreen";



const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Lato_700Bold, Lato_900Black, Lato_300Light, Lato_400Regular
  });
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const resp = await UserService.readDataUser();
        setAuthenticated(resp !== false);
      } catch (e) {
        console.log(e);
      }
    };

    checkAuthentication();
  }, []); 

  if (!fontsLoaded || fontError) {
    return null; 
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={authenticated ? "Home" : "Login"} screenOptions={{ headerShadowVisible: false, headerTitleAlign: 'center', headerTitleStyle: { fontFamily: "Lato_700Bold", fontSize: 18 } }}>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ title: "Meu Perfil", headerStyle: { backgroundColor: '#7dd3fc' } }} name="Profile" component={Profile} />
          <Stack.Screen options={{ title: "Login", headerStyle: { backgroundColor: '#EFEFEF' } }} name="Login" component={Login} />
          <Stack.Screen options={{ title: "Cadastro", headerStyle: { backgroundColor: '#EFEFEF' } }} name="Cadastro" component={Cadastro} />
          <Stack.Screen options={{ title: "Vacinas", headerStyle: { backgroundColor: '#EFEFEF' } }} name="Vacinas" component={VacinaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
