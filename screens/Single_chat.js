import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';




export default class SingleChat extends Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }

     //DIFFERENT STYLES FOR MESSAGES

    //  getStyle = (form) => {
    //     if(from == 'User'){
    //         return styles.left; 
    //     } else{
    //         return styles.right;
    //     }
    // }

    render(){
        
        //const navigation = this.props.navigation;

        // SINGLE CHAT VISUALISE
        return(
            <View >
                {/* <View style={styles.chatWindow}>
                    <FlatList
                        data={this.state.messages}
                        renderItem={({item}) => 
                        <View style={this.getStyle(item.form)}>
                            <Text style={styles.messages}>{item.msg}</Text>
                        </View>
                        }
                        keyExtractor={item=>item.id}
                    />
                </View>

                <View style={styles.typeBox}>
                    <TextInput placeholder="Type"/>
                </View> */}
            </View>
        );
    }
}

