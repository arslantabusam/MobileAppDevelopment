import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, FlatList} from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage from the correct package
import Select_Users from "./Select_Users";

export default class Contacts extends Component {
    constructor(props){
        super(props)

        this.state ={
            isLoading: true,
            data: [],
            submitted: '',
            error: '',
            contact_id: '',
        }
    }


    //ADD CONTACT
    handleAddContact = async (contact_id) => {
        this.setState({submitted: true})
        this.setState({error: ''})
       
        try {
          const user_id = await AsyncStorage.getItem("user_id");
          const token = await AsyncStorage.getItem("session_token");
    
          console.log("User ID from AsyncStorage:", user_id);
          if (!user_id) {
            throw new Error("User ID not found in AsyncStorage");
          }
          
          const response = await fetch(
            `http://localhost:3333/api/1.0.0/user/${contact_id}/contact`, {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Authorization": token,
              },
              body: JSON.stringify(contact_id),
            });
    
            if (response.ok) {
    
                console.log('Contact Added');
                this.props.navigation.navigate('Contacts');
              } else if (response.status === 400) {
                // Handle invalid credentials error
                this.setState({ error: 'Invalid field parameters' });
              } else if (response.status === 401) {
                // Handle invalid credentials error
                this.setState({ error: "You need to be logged in" });
                await AsyncStorage.removeItem("user_id");
                await AsyncStorage.removeItem("session_token");
                this.props.navigation.navigate("Login");
            } else if (response.status === 500) {
                // Handle server error
                this.setState({ error: 'Server error occurred. Please try again later.' });
              } else {
                // Handle other unknown errors
                this.setState({ error: 'An error occurred during login' });
              }
            } catch (error) {
              console.error('Error occurred during login:', error);
              this.setState({ error: 'An error occurred during login' });
            }
      }


    async componentDidMount() {
        try {
          const user_id = await AsyncStorage.getItem("user_id");
          const token = await AsyncStorage.getItem("session_token");
          console.log("User ID from AsyncStorage:", user_id);
          if (!user_id) {
            throw new Error("User ID not found in AsyncStorage");
          }
    
          const response = await fetch(
            `http://localhost:3333/api/1.0.0/contacts`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Authorization": token,
              },
            }
          );
    
          console.log("API response status:", response.status);
          const data = await response.json();
          console.log("API response data:", data);
            console.log(data)
          this.setState({ isLoading: false, contactsData: data });
          //error handling get request
          if (response.status === 200) {
            this.setState({ contactsData: data });
          } else if (response.status === 401) {
            throw new Error("Not logged in");
            await AsyncStorage.removeItem("user_id");
            await AsyncStorage.removeItem("session_token");
            this.props.navigation.navigate("Login");
          } else if (response.status === 404) {
            throw new Error("Information not found");
          } else {
            throw new Error("Server Error");
          }
       
        } catch (error) {
          console.error("Error fetching user details:", error.message);
        }
      }

    render(){
        const {isLoading, contactsData} = this.state;

        if(!isLoading){
            if(contactsData.keys.length !== 0){
                console.log("ok");
                return (
                    <View style={styles.container}>

                        {/* BUTTON */}
                        <View style={styles.addContactBtn}>
                            {/* <TextInput onChangeText={(contact_id) => this.setState({ contact_id })} /> */}
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Select_Users")}>
                                <View>
                                    <Text style={styles.buttonText}> Add new contact </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        {/* CONTACT DETAILS */}
                         <View style={styles.details}>
                            <FlatList data={this.state.contactsData} renderItem={({item}) => 
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleChat')}>
                                <View style={styles.userItem}>
                                <View style={styles.highlightedId}>
                                    <Text>{item.user_id}</Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{item.given_name} {item.family_name}</Text>
                                    <Text style={styles.userEmail}>{item.email}</Text>
                                </View>
                                </View>
                                </TouchableOpacity>
                            }  
                            keyExtractor={item=>item.user_id}
                            contentContainerStyle={styles.flatListContent}
                            /> 
                        </View>

                    </View>
                  );
            } else{
                return(
                <View style={styles.container}>
                    {/* BUTTON */}
                    <View style={styles.addContactBtn}>
                            {/* <TextInput onChangeText={(contact_id) => this.setState({ contact_id })} /> */}
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("AllUsers")}>
                                <View>
                                    <Text style={styles.buttonText}> Add new contact </Text>
                                </View>
                            </TouchableOpacity>
                     </View>
                     <View style={styles.msg}>
                        <Text >No Contact</Text>
                     </View>
                    
                </View>
                    
                    );
            }
        } else{
            <View>
                <Text>Loading...</Text>
            </View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   backgroundColor: "red",
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 16,
    },
    activityIndicator: {
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
    },
    addContactBtn: {
        backgroundColor: "#528E7A",
        justifyContent: "center",
        alignContent: "center",
         textAlign: "center",
         height: 50,
         fontWeight: "bold",
         paddingVertical: 0,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    },
    msg: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    }
  });
  