import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TextInput, Pressable } from 'react-native';
import styles from './styles';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen2 from './screens/HomeScreen - Logic Code';
import HomeScreen from './screens/HomeScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home Screen" component={HomeScreen} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    })
  })


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? 
          (<Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen}/>
          ) : (
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/>
          )}
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

