import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage from the correct package
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageUploadScreen from "../components/ImageUpload";
export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
      submitted: false,
      error: '',
    };

    // Bind the handleLogout function to the current instance
    this.handleLogout = this.handleLogout.bind(this);
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
        `http://localhost:3333/api/1.0.0/user/${user_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Authorization": token,
          },
        }
      );

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

      console.log("API response status:", response.status);
      const data = await response.json();
      console.log("API response data:", data);
    
      //error handling get request
      if (response.status === 200) {
        this.setState({ userDetails: data });
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

      //error handling profile pic request
      if (imageResponse.status === 200) {
        this.setState({ userDetails: data });
        const imageBlob = await imageResponse.blob();
        this.setState({ profileImage: URL.createObjectURL(imageBlob) });
      } else if (response.status === 401) {
        throw new Error("Not logged in");
        await AsyncStorage.removeItem("user_id");
        await AsyncStorage.removeItem("session_token");
        this.props.navigation.navigate("Login");
      } else if (response.status === 404) {
        throw new Error("Profile pic not found");
      } else {
        throw new Error("Server Error");
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  }

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
        this.setState({ error: "Not logged in" });
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
    const { userDetails, profileImage } = this.state;

    if (userDetails === null) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      
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

            <View style={styles.updateButton}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileUpdate", 
                {userDetails: this.state.userDetails,
                })}>
                    <View style = {styles.updateContainer}>
                            <Ionicons name="create-outline" size={30} color="white" />
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
                    <Text style={styles.text}>{userDetails.first_name}</Text>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <Text style={styles.label}>Last Name:</Text>
                    <View style={styles.textContainer}>
                    <Text style={styles.text}>{userDetails.last_name}</Text>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <Text style={styles.label}>Email:</Text>
                    <View style={styles.textContainer}>
                    <Text style={styles.text}>{userDetails.email}</Text>
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
    alignSelf: 'center',
  },
  updateButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: "10%",
    backgroundColor: "#528E7A",
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
    alignItems: "center",
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
  profilePhoto: {
    flex: 1,
    alignItems: 'center',
  },
  profilePhotoImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#883D1A',
    borderWidth: 1,
  },
});
