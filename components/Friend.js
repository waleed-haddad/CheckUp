import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

const Friend = (props) => {

    return (
        <View style={homescreen_styles.item}>
            <View style={homescreen_styles.itemLeft}>
                <View style={homescreen_styles.square}></View>
                <Text style={homescreen_styles.itemText}>{props.Text}</Text>
            </View>
            <View style={homescreen_styles.circular}></View>
        </View>
    )
}

const homescreen_styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#F6793F',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#F6793F',
        borderWidth: 2,
        borderRadius: 5,
    },
});

export default Friend;