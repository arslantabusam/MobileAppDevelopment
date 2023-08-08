import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, FlatList} from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage from the correct package

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
            return (
                <View style={styles.container}>
                  <View style={styles.addContact}>
                    <TextInput onChangeText={(contact_id) => this.setState({ contact_id })} />
                    <TouchableOpacity onPress={() => this.handleAddContact(this.state.contact_id)}>
                      <View>
                        <Text style={styles.buttonText}> Add contact </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addContact}>
                    <TextInput
                      onChangeText={(first_name) => this.setState({ first_name })}
                      placeholder="First Name"
                      style={styles.input}
                    />
                    <TextInput
                      onChangeText={(last_name) => this.setState({ last_name })}
                      placeholder="Last Name"
                      style={styles.input}
                    />
                    <TextInput
                      onChangeText={(email) => this.setState({ email })}
                      placeholder="Email"
                      style={styles.input}
                    />
                    <TouchableOpacity onPress={() => this.handleAddContact()}>
                      <View style={styles.addButton}>
                        <Text style={styles.buttonText}>Add Contact</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {this.state.isLoading ? (
                    <Text>Loading...</Text>
                  ) : (
                    <View>
                      <FlatList
                        data={this.state.contactsData}
                        renderItem={({ item }) => (
                          <View>
                            <Text>{item.first_name}</Text>
                            <Text>{item.last_name}</Text>
                            <Text>{item.email}</Text>
                            <Button title="Delete" onPress={() => console.log("delete")} />
                          </View>
                        )}
                        keyExtractor={({ id }, index) => id}
                      />
                    </View>
                  )}
                </View>
              );
        }
    }
        // return (
        //     <View style={styles.container}>
        //       <View style={styles.addContact}>
        //         <TextInput onChangeText={(contact_id) => this.setState({ contact_id })} />
        //         <TouchableOpacity onPress={() => this.handleAddContact(this.state.contact_id)}>
        //           <View>
        //             <Text style={styles.buttonText}> Add contact </Text>
        //           </View>
        //         </TouchableOpacity>
        //       </View>
        //       <View style={styles.addContact}>
        //         <TextInput
        //           onChangeText={(first_name) => this.setState({ first_name })}
        //           placeholder="First Name"
        //           style={styles.input}
        //         />
        //         <TextInput
        //           onChangeText={(last_name) => this.setState({ last_name })}
        //           placeholder="Last Name"
        //           style={styles.input}
        //         />
        //         <TextInput
        //           onChangeText={(email) => this.setState({ email })}
        //           placeholder="Email"
        //           style={styles.input}
        //         />
        //         <TouchableOpacity onPress={() => this.handleAddContact()}>
        //           <View style={styles.addButton}>
        //             <Text style={styles.buttonText}>Add Contact</Text>
        //           </View>
        //         </TouchableOpacity>
        //       </View>
        //       {this.state.isLoading ? (
        //         <Text>Loading...</Text>
        //       ) : (
        //         <View>
        //           <FlatList
        //             data={this.state.contactsData}
        //             renderItem={({ item }) => (
        //               <View>
        //                 <Text>{item.first_name}</Text>
        //                 <Text>{item.last_name}</Text>
        //                 <Text>{item.email}</Text>
        //                 <Button title="Delete" onPress={() => console.log("delete")} />
        //               </View>
        //             )}
        //             keyExtractor={({ id }, index) => id}
        //           />
        //         </View>
        //       )}
        //     </View>
        //   );
                        
        //  if(isLoading){
//              return (
//                 <View style={styles.container}>
//                     <View style={styles.addContact}>
//                         <TextInput onChangeText={(contact_id) => this.setState({ contact_id })} />
//                         <TouchableOpacity onPress={() => this.handleAddContact(this.state.contact_id)}>
//                             <View>
//                             <Text style={styles.buttonText}> Add contact </Text>
//                         </View>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.container}>
//   <View style={styles.addContact}>
//     <TextInput
//       onChangeText={(first_name) => this.setState({ first_name })}
//       placeholder="First Name"
//       style={styles.input}
//     />
//     <TextInput
//       onChangeText={(last_name) => this.setState({ last_name })}
//       placeholder="Last Name"
//       style={styles.input}
//     />
//     <TextInput
//       onChangeText={(email) => this.setState({ email })}
//       placeholder="Email"
//       style={styles.input}
//     />
//     <TouchableOpacity onPress={() => this.handleAddContact()}>
//       <View style={styles.addButton}>
//         <Text style={styles.buttonText}>Add Contact</Text>
//       </View>
//     </TouchableOpacity>
//   </View>
//   </View>
//                   <Text>Loading...</Text>
//                 </View>

//         //       );
//         // }else{
//         //     return(
//                 <View>
//                     <View style={styles.addContact}>
//                         <TextInput onChangeText={(contact_id) => this.setState({ contact_id })}></TextInput>
//                         <TouchableOpacity onPress={() => this.handleAddContact(this.state.contact_id)}>
//                         <View>
//                         <Text style={styles.buttonText}> Add contact </Text>
//                         </View>
//                     </TouchableOpacity>
//                     </View>
//                     <FlatList data={this.state.contactsData} 
//                         renderItem={({item}) => (
//                         <View>
//                             <Text>{item.first_name}</Text>
//                             <Text>{item.last_name}</Text>
//                             <Text>{item.email}</Text>
//                             <Button title="Delete" onPress={() => console.log("delete")}
//                             />
//                         </View>
//                     )}
//                     keyExtractor={({id}, index) => id}
//                     />
//                 </View>
//              )
//         }
    
//     }
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
  