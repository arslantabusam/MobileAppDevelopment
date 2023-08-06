import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';


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
            <View >{/* style={styles.container} */}
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
            } 
            keyExtractor={item=>item.id}
            /> */}
            </View>
        );
    }
}

