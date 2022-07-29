import 'react-native-gesture-handler';
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "intl";
import "intl/locale-data/jsonp/pt-BR";


import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,  //o hooks que carrega as fontes p gente
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins';


import theme from './src/global/styles/theme';

import { Signin } from './src/screens/Signin';

import { AppRoutes } from './src/routes/app.routes';

export default function App() {

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
});

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <Signin />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


