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
    render(){
        
        //const navigation = this.props.navigation;


        //ALL CHATS SCREEN
        return(
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("AllUsers")}>
                    <View>
                            <Text>Press</Text>

                    </View>
                </TouchableOpacity>

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


const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      //backgroundColor: "red",
      paddingHorizontal: 20,
    },
    profilePhoto: {
      flex:1,
    },
    ItemsContainer: {
      flex: 3,
      width: "100%",
      height: "100%",
    },
    profilePhotoBtn: {
      marginTop: 20,
      width: 150, // Adjust as needed for medium size
      height: 150, // Adjust as needed for medium size
      borderRadius: 75, // Makes it round
      // backgroundColor: 'blue', // Set a background color
      borderColor: "#883D1A",
      alignSelf: "center",
    },
    detailsContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#883D1A",
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    updateContainer: {
      flexDirection: 'row',
      alignSelf: "stretch",
      //backgroundColor: "pink",
    },
    updateButton: {
      alignItems: "center",
      width: "50%",
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
      marginTop: "10%",
      backgroundColor: "#528E7A",
    },
    updateBack: {
      width: "50%",
      alignItems: "center",
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
      marginTop: "10%",
      backgroundColor: "grey"
    },
    logoutButton: {
      backgroundColor: "#D97F6D",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
      marginTop: "10%",
      justifyContent: "flex-start",
    },
    detailBox: {
      flexDirection: "row",
      alignSelf: "stretch",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginBottom: 10,
      marginBottom: "10%",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      padding: 5,
    },
    textContainer: {
      borderWidth: 1,
      borderColor: "#883D1A",
      borderRadius: 5,
      padding: 5,
      width: "60%",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    text: {
      fontSize: 16,
      color: "black",
    },
    activityIndicator: {
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
    },
    profilePhotoImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderColor: '#883D1A',
      borderWidth: 1,
    }
  });
  