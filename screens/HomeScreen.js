import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TextInput, Pressable, Button } from 'react-native';
import styles from '../styles';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homescreencontainer}>
      <Text>HomeScreen</Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
    </View>
  )
}

export default HomeScreen