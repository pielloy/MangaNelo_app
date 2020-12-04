import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

const cheerio = require('react-native-cheerio')

class UserScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: ""
        };
    }
 
    async componentDidMount () {
        const scrap = cheerio.load(this.props.page);

        let name = scrap(".box-user-options p").text();
        console.log(name);
        this.setState({ username: name });
    }

    disconectProfile() {
        fetch ("https://user.manganelo.com/home_logout?l=manganelo&re_l=logout").then(() => {
            this.props.updateLogin();
        }).catch(function (err) {
            console.log("error : ", err);
        })
    }

    render () {
        return (
            <View style={ styles.container }>
                <Text style={ styles.title }>Username :</Text>
                <Text style={ styles.text }> {this.state.username }</Text>
                <Text style={ styles.title }>Best waifu :</Text>

                <TouchableOpacity style={ styles.button } onPress={ () => this.disconectProfile() }>
                    <Text>Disconect</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        color: 'tomato',
        margin: 20
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginLeft: 50
    },
    button: {
        height: 50,
        width: 200,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "tomato",
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center'
    }
})

export default UserScreen;