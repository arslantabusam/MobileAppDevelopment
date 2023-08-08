import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default class Chats extends Component {
    constructor(props){
        super(props);

        this.state = {
        }

    }

    // componentDidMount(){
    //     this.unsubcribe = this.props.navigation.addListener('focus', () => {
    //         AsyncStorage.removeItem("user_id");
    //         AsyncStorage.removeItem("session_token");
    //     });
    //   }

    async handleLogout() {
        console.log("Logout")
        this.setState({ submitted: true, error: "" });
    
        try {
          const response = await fetch("http://localhost:3333/api/1.0.0/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Authorization": await AsyncStorage.getItem("session_token"),
              },
          });

          if (response.ok) {
            // The login was successful, store the user ID and session token in session storage
            await AsyncStorage.removeItem("user_id");
            await AsyncStorage.removeItem("session_token");
            console.log("Logout successful!");
            this.props.navigation.navigate("Login");
            // navigation.navigate("AppNav");
          } else if (response.status === 401) {
            // Handle invalid credentials error
            this.setState({ error: "Unauthorised" });
            await AsyncStorage.removeItem("user_id");
            await AsyncStorage.removeItem("session_token");
            this.props.navigation.navigate("Login");
          } else {
            // Handle other unknown errors
            this.setState({ error: "Something went wrong" });
          }
        } catch (error) {
          console.error("Error occurred during login:", error);
          this.setState({ error: "An error occurred during login" });
        }
      }

    render(){
        
        //const navigation = this.props.navigation;


        //ALL CHATS SCREEN
        return(
            <View>

            {/* <FlatList
            data={this.state.chats}
            renderItem={({item}) => 
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleChat')}>
                <View style={styles.chatItem}>
                    <View style={styles.chatImage}>
                        <Text> Image</Text>
                    </View>
                    <View>
                        <Text style={styles.chatName}>{item.Name}</Text>
                        <Text style={styles.chatSnippet}>{item.snippet}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            }  */}
            {/* keyExtractor={item=>item.id}
            /> */}
            </View>
        );
    }
}

