import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';

export default class LoginScreen1 extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            submitted: false,
            showAlert: false
        }

        this.handleLogin = this.handleLogin.bind(this)
        //this.hideAlert = this.hideAlert.bind(this);
    }

    handleLogin(){
        this.setState({submitted: true})
        this.setState({error: ''})
        
        if(!(this.state.email && this.state.password)){
            this.setState({error: "Must enter email and password"})
            return;
        }

        const email_regex = new RegExp("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/")
        if(!email_regex.test(this.state.email)){
            this.setState({error: "Email not valid."})
            return;
        }

        const pass_regex = new RegExp("/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{6,20}$")
        if(!pass_regex.test(this.state.password)){
            this.setState({error: "Passowrd should contain 1 upper case, 1 lower case, 1 digit and 1 special character, and min length of 6 and max 20."})
            return;
        }

        console.log("Button clicked" + this.state.email + " " + this.state.password)
        console.log("Validated and ready to send to the Api")

       //  this.setState({ showAlert: true });
    }

    // hideAlert() {
    // this.setState({ showAlert: false });
    // }

    render(){
        
        const navigation = this.props.navigation;
        //const { showAlert } = this.state; // Destructure the showAlert state
        return(
           <View style={styles.container}> 
                <View style={styles.logoContainer}>  
                    <Image source = {require('../img/logo.png')} style={styles.logo}/>
                    
                </View>


                {/* email input field */}
                <View style={styles.formContainer}> 
                    <View style={styles.email}> 
                     <TextInput  
                        placeholder="Email"
                        onChangeText={email => this.setState({email})}
                        defaultValue={this.state.email}
                        style={styles.input}
                        keyboardType="email-address"
                        />

                        <>
                            {this.state.submitted && !this.state.email && 
                            <Text style={styles.error}> Email field can't be empty. </Text>} 
                        </>

                    </View>
                </View>

                {/* password input field */}
                <View style={styles.formContainer}> 
                    <View style={styles.email}> 
                     <TextInput  
                        placeholder="Password"
                        onChangeText={password => this.setState({password})}
                        defaultValue={this.state.password}
                        style={styles.input}
                        secureTextEntry
                        />

                        <>
                            {this.state.submitted && !this.state.password && 
                            <Text style={styles.error}> Password field can't be empty. </Text>} 
                        </>

                    </View>
                </View>

                {/* confirm button */}
                <View style={styles.loginButton}> 
                    <TouchableOpacity onPress={this.handleLogin}>
                        <View>
                                <Text style={styles.buttonText}> Login </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <>
                    {this.state.error && 
                        <Text style={styles.error}> {this.state.error}</Text>

                    }
                </>

                <View style={styles.registerMsg}> 
                    <Text onPress={() => navigation.navigate('Sign up')}> Not registered yet? Make a new account! </Text>
                </View>

                {/* Alert */}
                {/* <View>
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
                </View> */}

            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  logoContainer: {
    flex: 1,
    marginTop: "40%",
  },
  logo: {
    width: 250, 
    height: 50, 
   // marginBottom: 150,
  },
  loginButton: {
    backgroundColor: '#883D1A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: "10%",
  },
  button: {
    marginTop: "30%"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerMsg: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: "100%",
    padding: 20,
    marginTop: 30,
  },
});

