import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {TouchableOpacity, StyleSheet} from "react-native";

/**
 * Es la aplicación principal del programa
 */
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />

      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({

})
