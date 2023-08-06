import 'react-native-gesture-handler';
import React, { Component } from 'react';
import LoginScreen from '../screens/Login';
import Sign_upScreen from '../screens/Sign_up';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNav from './AppNav';

const AuthStack = createStackNavigator();


export default class AuthNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen name="Login" component={LoginScreen}/>
          <AuthStack.Screen name="Sign up" component={Sign_upScreen} options={{title: "Register"}} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

