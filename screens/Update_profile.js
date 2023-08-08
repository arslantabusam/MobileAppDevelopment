import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage from the correct package
import Ionicons from "react-native-vector-icons/Ionicons";


export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        originalState: {},
        first_name: '',
        last_name: '',
        email: '',
        userDetails: null,
        submitted: false,
        error: '',
    };
  }

  async componentDidMount() {

     try {
        const user_id = await AsyncStorage.getItem("user_id");
      const token = await AsyncStorage.getItem("session_token");
      console.log("User ID from AsyncStorage:", user_id);
      if (!user_id) {
        throw new Error("User ID not found in AsyncStorage");
      }
    // Fetch the user's profile image
      const imageResponse = await fetch(
        `http://localhost:3333/api/1.0.0/user/${user_id}/photo`,
            {
            headers: {
                Accept: 'image/png, image/jpg',
                'X-Authorization': token,
            },
           }
         );

        if (imageResponse.status === 200) {
            const imageBlob = await imageResponse.blob();
            this.setState({ profileImage: URL.createObjectURL(imageBlob) });
        } else if (imageResponse.status === 401) {
            throw new Error("Not logged in");
            await AsyncStorage.removeItem("user_id");
            await AsyncStorage.removeItem("session_token");
            this.props.navigation.navigate("Login");
        } else if (imageResponse.status === 404) {
            throw new Error("Profile pic not found");
        } else {
            throw new Error("Server Error");
        }
        } catch (error) {
        console.error("Error fetching user profile pic:", error.message);
        }

        
    
//     // Store a copy of the original state when the component mounts
//     const userDetails = this.props.route.params.userDetails;
//     this.setState({
//       originalState: {
//         first_name: userDetails.first_name,
//         last_name: userDetails.last_name,
//         email: userDetails.email,
//       },
//     });
  }

  handleUpdateUser = async (userDetails) => {
    this.setState({submitted: true})
    this.setState({error: ''})
    
    let to_send = {};

    const { first_name, last_name, email } = this.state;
    
    if(this.state.first_name != '' && this.state.first_name != userDetails.first_name){
        to_send['first_name'] = this.state.first_name
    }
    if(this.state.last_name != '' &&  this.state.last_name != userDetails.last_name){
        to_send['last_name'] = this.state.last_name
    }
    if(this.state.email != '' &&  this.state.email != userDetails.email){
        console.log("ok");
        to_send['email'] = this.state.email
        const email_regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
        if(!email_regex.test(this.state.email)){
            this.setState({error: "Email not valid."})
            return;
        }

    }

    console.log(to_send);
   
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      const token = await AsyncStorage.getItem("session_token");

      console.log("User ID from AsyncStorage:", user_id);
      if (!user_id) {
        throw new Error("User ID not found in AsyncStorage");
      }

      const response = await fetch(
        `http://localhost:3333/api/1.0.0/user/${user_id}`, {
            method: "PATCH",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Authorization": token,
          },
          body: JSON.stringify(to_send),
        });
        

        //const data = await response.json();
        //console.log('API response:', data);

        if (response.ok) {

            console.log('User Successfully Updated');
            this.props.navigation.navigate('ProfileHome');
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


  handleLogout = async () => {
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


  render() {
    const { profileImage } = this.state;
    const userDetails = this.props.route.params.userDetails;

    if (userDetails === null) {
        return(
            <View style={styles.activityIndicator}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (

        
      //   <View style={styles.container}>
      //     <Text>User ID: {userDetails.user_id}</Text>
      //     <Text>First Name: {userDetails.first_name}</Text>
      //     <Text>Last Name: {userDetails.last_name}</Text>
      //     <Text>Email: {userDetails.email}</Text>
      //   </View>
      
    <View style={styles.container}>
        

        <View style={styles.profilePhoto}>
        <TouchableOpacity style={styles.profilePhotoBtn}>
            
        <Image
            source={{ uri: profileImage }} // Set the image source from the state
            style={styles.profilePhotoImage}
        />
        </TouchableOpacity>
        </View>

        <View style={styles.ItemsContainer}>

            <View style={styles.updateContainer}>
                <TouchableOpacity style = {styles.updateBack} onPress={() => this.props.navigation.navigate("ProfileHome")}>
                    <View>
                            <Ionicons name="arrow-back-outline" size={30} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.updateButton} onPress={() => this.handleUpdateUser(userDetails)}>
                    <View>
                            <Ionicons name="save-outline" size={30} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            
            <View style={styles.detailsContainer}>
                <View style={styles.detailBox}>
                    <Text style={styles.label}>User ID:</Text>
                    <View style={styles.textContainer}>
                    <Text style={styles.text}>{userDetails.user_id}</Text>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <Text style={styles.label}>First Name:</Text>
                    <View style={styles.textContainer}>
                    <TextInput style={styles.text} defaultValue={userDetails.first_name}
                    onChangeText={(first_name) => this.setState({ first_name })}></TextInput>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <Text style={styles.label}>Last Name:</Text>
                    <View style={styles.textContainer}>
                    <TextInput style={styles.text} defaultValue={userDetails.last_name} 
                    onChangeText={(last_name) => this.setState({last_name})}></TextInput>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <Text style={styles.label}>Email:</Text>
                    <View style={styles.textContainer}>
                    <TextInput style={styles.text} defaultValue={userDetails.email} 
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({email})}></TextInput>
                    </View>
                </View>
                <View style={styles.logoutButton}>
                    <TouchableOpacity onPress={this.handleLogout}>
                        <View>
                        <Text style={styles.buttonText}> Logout </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
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
