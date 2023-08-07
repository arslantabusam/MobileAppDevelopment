import "react-native-gesture-handler";
import React, { Component } from "react";
import LoginScreen1 from "../screens/Login";
import Sign_up from "../screens/Sign_up";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

// export default class AuthNav extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <NavigationContainer>
//         <AuthStack.Navigator initialRouteName="Login">
//           <AuthStack.Screen name="Login" component={LoginScreen}/>
//           <AuthStack.Screen name="Sign up" component={Sign_upScreen} options={{title: "Register"}} />
//           <AuthStack.Screen name="App Nav" component={AppNav} />
//         </AuthStack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import AppNav from "./AppNav"; // Import your AppNav component

export default class AuthNav extends Component {
  constructor(props) {
    super(props);
    this.checkToken(); // Call the function to check the token
  }

  // Function to check the session token in AsyncStorage
  checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("sessionToken");
      if (token) {
        // If the token exists, navigate to the main app navigation
        this.props.navigation.navigate("AppNav");
      }
    } catch (error) {
      // Handle AsyncStorage errors here, if needed
      console.error("Error reading token from AsyncStorage:", error);
    }
  };

  render() {
    // Since we are checking the token in the constructor, no need to check again here
    return (
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            name="Login"
            component={(props) => (
              <LoginScreen1 {...props} navigation={props.navigation} />
            )}
          />
          <AuthStack.Screen
            name="Sign_up"
            component={Sign_up}
            options={{ title: "Register" }}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}
