import "react-native-gesture-handler";

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen1 from "./screens/Login";
import Sign_up from "./screens/Sign_up";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNav from "./navigation/AuthNav";
import AppNav from "./navigation/AppNav";
const Stack = createNativeStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <AuthNav />
      // // <AppNav />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen1} />
          <Stack.Screen name="Sign_up" component={Sign_up} />
          <Stack.Screen name="AppNav" component={AppNav} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
