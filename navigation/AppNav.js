import 'react-native-gesture-handler';
import React, { Component } from 'react';
//PROFILE
import UserProfile from '../screens/User_profile';
// import UpdateProfile from '../screens/Update_profile'; 
  //  OR MODAL?

//CONTACTS
import Contacts from '../screens/Contacts';
import AddContact from  '../screens/Add_Contact';
import BlockedContacts from '../screens/Blocked_contacts';

//CHATS
import Chats from '../screens/Chats';
import SingleChat from '../screens/Single_chat'; 
// import ChatDetails from '../screens/Chat_details';
  // I need stack navigators for a single chat as well, to update chat info
  // add or remove a contact.
import NewChat from '../screens/New_Chat'; 

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { createStackNavigator } from '@react-navigation/stack';


const AppTabs = createBottomTabNavigator();

const ChatsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ContactsStack = createStackNavigator();

const ChatsStackScreen = () => (
  <ChatsStack.Navigator screenOptions={{ headerShown: false }}>
     <ChatsStack.Screen name="ChatsHome" component={Chats}/>
     <ChatsStack.Screen name="SingleChat" component={SingleChat}/>
     <ChatsStack.Screen name="NewChat" component={NewChat}/>
   </ChatsStack.Navigator>
  );

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileHome" component={UserProfile}/>
    </ProfileStack.Navigator>
  );

const ContactssStackScreen = () => (
  <ContactsStack.Navigator screenOptions={{ headerShown: false }}>
      <ContactsStack.Screen name="ContactsHome" component={Contacts}/>
      <ContactsStack.Screen name="AddContact" component={AddContact}/>
      <ContactsStack.Screen name="BlockecContacts" component={BlockedContacts}/>
    </ContactsStack.Navigator>
  );


export default class AppNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <AppTabs.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Chats') {
              iconName = focused ? 'ios-chatbox' : 'ios-chatbox-outline';
              size = 40; // Adjust the size 
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              size = 40; 
            } else {
              iconName = focused ? 'people' : 'people-outline';
              size = 40; 
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'brown',
          tabBarInactiveTintColor: 'gray',
        })}>
            <AppTabs.Screen name ="Chats" component={ChatsStackScreen}/>
            <AppTabs.Screen name ="Profile" component={ProfileStackScreen}/>
            <AppTabs.Screen name ="Contacts" component={ContactssStackScreen}/>
        </AppTabs.Navigator>
      </NavigationContainer>
    );
  }
}

