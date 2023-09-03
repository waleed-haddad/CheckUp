import React from "react";
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

const Friend = (props) => {
    const dayNumtoString = (props) => {
        if (props.Day == 1) {
            return "Monday"
        } else if (props.Day == 2) {
            return "Tuesday"
        } else if (props.Day == 3) {
            return "Wednesday"
        } else if (props.Day == 4) {
            return "Thursday"
        } else if (props.Day == 5) {
            return "Friday"
        } else if (props.Day == 6) {
            return "Saturday"
        } else {
            return "Sunday"
        }
    }

    const timeRemoveSeconds = (props) => {
        let str = props.Time;
        return str.replace(":00", "");
    }

    return (
        <View style={homescreen_styles.item}>
            <View style={homescreen_styles.itemLeft}>
                <View style={homescreen_styles.square}></View>
                <Text style={homescreen_styles.nameText}>{props.Text}: </Text>
                <Text>Every </Text>
                <Text style={homescreen_styles.dateText}>{dayNumtoString(props)}</Text>
                <Text> at {timeRemoveSeconds(props)}</Text>
            </View>
            {/* <View style={homescreen_styles.circular}></View> */}
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
    nameText: {
        fontWeight: 'bold',
        maxWidth: '100%',
    },
    dateText: {
        color: '#F6793F',
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