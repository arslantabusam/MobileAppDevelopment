import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Login';
import Sign_upScreen from './screens/Sign_up';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNav from './navigation/AuthNav';
import AppNav from './navigation/AppNav';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

       //<AuthNav /> 
      <AppNav />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// import LoginScreen from './components/Login';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <LoginScreen />
      
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

