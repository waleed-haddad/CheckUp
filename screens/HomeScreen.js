import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TextInput, Pressable, Button, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Friend from '../components/Friend';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen = ({ navigation }) => {
  // These states handle individual and lists of friends
  const [friend, setFriend] = useState();
  const [friendItems, setFriendItems] = useState([]);

  //These functions handle friend addition and completion
  const handleAddFriend = () => {
    Keyboard.dismiss()
    setFriendItems([...friendItems, friend])
    setFriend(null);
  }
  const completeFriend = (index) => {
    let itemsCopy = [...friendItems];
    itemsCopy.splice(index, 1);
    setFriendItems(itemsCopy);
  }

  return (
    <View style={homescreen_styles.container}>
      {/* Friends List */}
      <View style={homescreen_styles.friendsWrapper}>
      {/* <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/> */}
        <Text style={homescreen_styles.sectionTitle}>Friends List</Text>
        <View style={homescreen_styles.items}>
          {/* This is where the friend list will go! */}
          {
            friendItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeFriend(index)}>
                  <Friend Text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>

      {/* Add friend to list */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={homescreen_styles.writeFriendWrapper}
      >
        <TextInput style={homescreen_styles.input} placeholder={'Your friend\'s name'} value={friend} onChangeText={text => setFriend(text)} />
        <TouchableOpacity onPress={() => handleAddFriend()}>
          <View style={homescreen_styles.addWrapper}>
            <Text style={homescreen_styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  )
}

const homescreen_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7E5',
  },
  friendsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#3D519A',
  },
  items: {
    marginTop: 30,
  },
  writeFriendWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#000',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  addText: {},
  dateTime: {
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'space-between', 
  }
});

export default HomeScreen;