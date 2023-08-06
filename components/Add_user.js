import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';

class User extends Component{
    render(){

        return (
            <View>
                <Text>First Name: {this.props.firstName}</Text>
                <Text>Last Name: {this.props.lastName}</Text>
                <Text>Email: {this.props.email}</Text>

            <Image 
                source={{uri: ""}}
                style={{width: 200, height:200}}
            />
            </View>
        );
        
    }
}

// export default User;

// // App.js

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// const App = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(true);

//   const handleSignUp = () => {
//     // Implement your sign-up logic here
//     console.log('Sign up', email, password);
//   };

//   const handleLogin = () => {
//     // Implement your login logic here
//     console.log('Login', email, password);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       {isSignUp ? (
//         <Button title="Sign Up" onPress={handleSignUp} />
//       ) : (
//         <Button title="Log In" onPress={handleLogin} />
//       )}
//       <Text
//         style={styles.toggleLink}
//         onPress={() => setIsSignUp((prev) => !prev)}
//       >
//         {isSignUp ? 'Already have an account? Log in' : 'Don\'t have an account? Sign up'}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   toggleLink: {
//     marginTop: 16,
//     textAlign: 'center',
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });

// export default App;
