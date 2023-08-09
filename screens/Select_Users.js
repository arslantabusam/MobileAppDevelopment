import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Picker} from "react-native";
import { SearchBar } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage from the correct package

export default class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
      }
      
      componentDidMount(){
        this.retrieveUsers();
      }
    
      retrieveUsers = async () => {
        try {
        const user_id = await AsyncStorage.getItem("user_id");
        const token = await AsyncStorage.getItem("session_token");
    
          const response = await fetch(
            `http://localhost:3333/api/1.0.0/search`, {
                method: "GET",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Authorization": token,
              },
            });

            console.log("API response status:", response.status);
            const data = await response.json();
            console.log("API response data:", data);

            console.log(data)
          if (response.status === 200) {
            this.setState({ userDetails: data });
          } else if (response.status === 400) {
            console.log('Bad Request');
          } else if (response.status === 401) {
            console.log('Unauthorized');
          } else if (response.status === 500) {
            console.log('Server Error');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      render() {
        const { q, search_in, limit, offset} = this.state;
    
        return (
          <View style={styles.container}>

        <View style={styles.details}>
            
            <FlatList
            data={this.state.userDetails}
            renderItem={({item}) => 
            <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>
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
      }
    }
    

    const styles = StyleSheet.create({
    container: {
    flex:1,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    searchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    searchItems: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        // padding: 10,
        paddingLeft: 20,
    },
    searchLabel: {
        marginRight: 5,
    },
    picker: {
        height: 30,
        width: 100,
    },
    input: {
        height: 30,
        width: 60,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 5,
    },
    UserItem: {
        flex: 1,
        flexDirection: "row",
    },
    details:{
        flex:2,
        paddingTop: 20,
        paddingBottom: 10,
    }, 
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      },
      highlightedId: {
        backgroundColor: '#B79CED', // Highlight color
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
      },
      userInfo: {
        flex: 1,
      },
      userName: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      userEmail: {
        color: '#888',
      },
      searchBtn: {
         backgroundColor: "#528E7A",
        justifyContent: "center",
        alignContent: "center",
         textAlign: "center",
         height: 50,
         fontWeight: "bold"
      }
  });
  