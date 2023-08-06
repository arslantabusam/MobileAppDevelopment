import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {
    const urlApi = "http://localhost:3333/api/1.0.0/login";

    try {
      const response = await fetch(urlApi, { // Fix the variable name here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(response.status)
      
      if (response.status === 200) {
        // Login successful
        console.log("Login successful!");
        setShowAlert(true); // Use the setShowAlert hook to show the alert

        // Close the alert after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 2000); // 5000 milliseconds (5 seconds)

        setErrorMessage("");
      } 
      else if (response.status === 400){
        // Login failed, display error message
        setErrorMessage("Invalid credentials.");
      }
      else {
        setErrorMessage("server error");
      }
    } catch (error) {
      // Error while making the request
      setErrorMessage("An error occurred on server side. Please try again later!");
    }
  };

  const hideAlert = () => {
    setShowAlert(false); // Use the setShowAlert hook to hide the alert
  };

  return (
    <View style={styles.container}>

<Image source = {require('./img/logo.png')} 
      style = {{ width: 250, height: 50, marginBottom: 150}} />

      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        style={styles.input}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Button title="Login" onPress={handleLogin} />

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Success"
        message="You have been logged in"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor="#008000"
        onConfirmPressed={hideAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
