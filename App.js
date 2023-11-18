import React, { useCallback } from "react";
import { NativeBaseProvider} from "native-base";
import { Home } from "./components/Home";
import {  useFonts, Lato_700Bold, Lato_900Black, Lato_300Light, Lato_400Regular } from '@expo-google-fonts/lato';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Lato_700Bold, Lato_900Black, Lato_300Light, Lato_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <NativeBaseProvider>
        <Home/>
    </NativeBaseProvider>
  );
}