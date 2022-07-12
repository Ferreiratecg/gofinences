import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,  //o hooks que carrega as fontes p gente
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({   //fontsLoad vem do useFonts espera as fonts corregarem
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });
  if(!fontsLoaded){ //se fontsLoaded não for carregado segura a tela de splash(retorna nulo)
    return null;
  }
  SplashScreen.hideAsync();
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
      <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}


