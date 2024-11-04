import { Dimensions, Button, SafeAreaView, StyleSheet, Text, View, BackHandler, Image } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, React, useCallback, useState } from "react";
import HomeScreen from './HomeScreen';
import CameraScreen from "./app/screens/CameraScreen";
import Login from './Login';
import Register from './Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './header';
import Profile from './ProfileScreen';
import Bulbizarre from './Buli';
import SplashScreen from "react-native-splash-screen";
import Friend from './Friend';
import Profilpage from './Profil';
import Snaps from './Snap';
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      {/* screenOptions={{headerShown: false}} */}
      <Stack.Navigator >
        <Stack.Screen name="Accueil" component={HomeScreen} options={{
          title: "Snapzone"
        }} />
        <Stack.Screen name="Login" component={Login} options={{
          title: 'Login Snapzone'
        }} />
        <Stack.Screen name="Register" component={Register} options={{
          title: 'Register Snapzone'
        }} />
        <Stack.Screen name="Profile" component={Profile} options={{
          title: 'Sélectionner les destinataires'
        }} />
        <Stack.Screen
          name="Friend"
          component={Friend}
        />
        <Stack.Screen name="camera" component={CameraScreen} />
        <Stack.Screen name="profilpage" component={Profilpage} />
        <Stack.Screen name="Snaps" component={Snaps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



