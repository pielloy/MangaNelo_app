import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

// Audezi345uihfz
// pielloy

const cheerio = require('react-native-cheerio')

const get_set_cookies = function(headers) {
    const set_cookies = []
    for (const [name, value] of headers) {
        if (name === "set-cookie") {
            set_cookies.push(value)
        }
    }
    return set_cookies
}
  
class UserScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            captcharImg: '',
            captchar: ''
        };
        this.handleLogin = this.handleLogin.bind(this);
    }
 
    async componentDidMount () {
        const scrap = cheerio.load(this.props.page);
        let captchar = scrap('.captchar');

        let image = scrap(captchar).find(".captchar img").attr('src');
        this.setState({ captcharImg: image })
    }

    handleLogin() {
        var details = {
            'user': this.state.username,
            'pass': this.state.password,
            'captchar': this.state.captchar
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        fetch('https://user.manganelo.com/login_handle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        }).then((response) => {
            response.text().then((text) => {
                console.log(text);
                if (text == "okie") {
                    this.props.updateLogin();
                }
            })
        })
    }

    render () {
        return (
            <View style={ styles.container }>
                <Text style={styles.logo}>MangaNelo App</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({username: text})}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({password: text})}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    {
                        (this.state.captcharImg == "") ? null :
                        <Image style={styles.captcharImage} source={{ uri: this.state.captcharImg }} />
                    }
                    <View style={styles.captcharInputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Captchar..."
                            placeholderTextColor="#003f5c"
                            onChangeText={text => this.setState({captchar: text})}
                        />
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        color: "#fb5b5a",
        fontWeight:"bold",
        fontSize:30,
        marginBottom:30
    },
    inputView: {
        height: 50,
        width: "80%",
        marginBottom: 20,
        padding: 20,
        borderRadius: 25,
        justifyContent: "center",
        backgroundColor: "#465881"        
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        fontSize: 14,
        color: "white"
    },
    loginBtn:{
        height: 50,
        width: "80%",
        marginTop: 40,
        marginBottom: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fb5b5a"
    },
    loginText:{
        color:"white"
    },
    captcharImage: {
        height: 45,
        width: 100
    },
    captcharInputView: {
        height: 50,
        width: "40%",
        marginBottom: 20,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 25,
        justifyContent: "center",
        backgroundColor: "#465881"
    }
})

export default UserScreen;