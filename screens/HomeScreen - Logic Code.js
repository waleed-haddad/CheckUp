import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TextInput, Pressable, Button, SafeAreaView } from 'react-native';
import styles from '../styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  //DatePicker Setup
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  //listens to incoming notification, different actions for one-time and recurring notifications
  React.useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      if (notification.request.trigger.repeats) {
        console.log("recurring noti")
      } else {
        scheduleIntervalNotification(1);
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.homescreencontainer}>
      <Text>HomeScreen</Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
      <Button onPress={async () => {
          //oldDate used to account for time shift
          const oldDate = new Date();
          //Check whether the date conversion is as expected
          console.log(oldDate.getTime()/1000);
          console.log(date.getTime()/1000);
          await scheduleOneTimeNotification(date.getTime()/1000, oldDate.getTime()/1000);
        }} title="notification"
      /> 
      <Button onPress={async () => {
          await cancelPushNotification();
        }} title="cancel notification"
      /> 
      <SafeAreaView>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
    </View>
  )
}

// One-time notification, scheduled based on user's selected date and time
async function scheduleOneTimeNotification(date, oldDate) {
  const initalNotification = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'This is a one-time notification',
      body: "I'm so proud of myself!",
    },
    trigger: { 
      seconds: date - oldDate, repeats: false
    },
  });
}

// Repeating notification, scheduled based on user's selected interval range (in weeks)
async function scheduleIntervalNotification(weeks) {
  const initalNotification = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'This is a repeating notification',
      body: "I'm so proud of myself!",
    },
    trigger: { 
      seconds: 60, repeats: true
    },
  });
}

async function cancelPushNotification() {
  Notifications.cancelAllScheduledNotificationsAsync();
}


export default HomeScreen;