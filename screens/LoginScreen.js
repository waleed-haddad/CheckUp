import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TextInput, Pressable } from 'react-native';
import styles from '../styles';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, withSequence, withSpring } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginScreen = () => {

    const { height, width } = useWindowDimensions();
    const imagePosition = useSharedValue(1);
    const fomrBUttonScale = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);


    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 2, 0])
        return {
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })

    const buttonsAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        };
    });

    const closeButtonContainerStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
            transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }]
        }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withTiming(0, { duration: 300 }),
        }
    })

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: fomrBUttonScale.value }]
        }
    })

    const loginHandler = () => {
        imagePosition.value = 0;
        if (isRegistering) {
            setIsRegistering(false);
        }
    }

    const registerHandler = () => {
        imagePosition.value = 0;
        if (!(isRegistering)) {
            setIsRegistering(true);
        }
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
                <Svg height={height + 35} width={width}>
                    <ClipPath id="clipPathId">
                        <Ellipse cx={width / 2} rx={height} ry={height + 35} />
                    </ClipPath>
                    <Image
                        href={require('../assets/login-background-5.jpg')}
                        width={width}
                        height={height + 35}
                        preserveAspectRatio='xMidYMid slice'
                        clipPath="url(#clipPathId)"
                    />
                </Svg>
                <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
                    <Pressable onPress={() => imagePosition.value = 1}>
                        <Text>X</Text>
                    </Pressable>
                </Animated.View>
            </Animated.View>
            <View style={styles.bottomContainer}>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={styles.button} onPress={loginHandler}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={styles.button} onPress={registerHandler}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
                    <TextInput 
                        placeholder="Email"
                        // value={ }
                        // onChangeText={text => } 
                        placeholderTextColor="black" 
                        style={styles.textInput} 
                    />
                    {isRegistering && (
                        <TextInput 
                            placeholder="Full Name" 
                            placeholderTextColor="black"
                            // value={ }
                            // onChangeText={text => } 
                            style={styles.textInput} 
                        />
                    )}
                    <TextInput 
                        placeholder="Password" 
                        placeholderTextColor="black" 
                        // value={ }
                        // onChangeText={text => }
                        style={styles.textInput} 
                        secureTextEntry
                    />
                    <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                        <Pressable onPress={() => fomrBUttonScale.value = withSequence(withSpring(1.5), withSpring(1))}>
                            <Text style={styles.buttonText}>
                                {isRegistering ? 'Register' : 'Login'}
                            </Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    )
}

export default LoginScreen

