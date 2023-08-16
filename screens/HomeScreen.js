import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TextInput, Pressable, Button } from 'react-native';
import styles from '../styles';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import * as Notifications from 'expo-notifications';

//First, set the handler that will cause the notification
//to show the alert

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homescreencontainer}>
      <Text>HomeScreen</Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
      <Button onPress={async () => {
          await schedulePushNotification();
        }} title="notification"
      /> 
    </View>
  )
}

// Second, call the method
async function schedulePushNotification() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Look at that notification',
      body: "I'm so proud of myself!",
    },
    trigger: { 
      seconds: 60, repeats: false},
  });
  Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.
}


export default HomeScreen