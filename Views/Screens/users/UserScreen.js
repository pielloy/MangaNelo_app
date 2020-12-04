import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

import UserProfileScreen from './UserProfileScreen';
import UserLoginScreen from './UserLoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            login: undefined
        };
        this.text = "";
    }
 
    componentDidMount () {
        this.updateStateLogin()
    }

    updateStateLogin() {
        fetch("https://user.manganelo.com/login?l=m_manganelo&re_l=login").then((response) => {
            response.text().then((text) => {

                this.props.cookieChanged(get_set_cookies(response.headers));
                console.log(text);
                
                const scrap = cheerio.load(text);

                let title_name = scrap("title").text();
                console.log("Title name : ", title_name);
                this.text = text;
                this.setState({ login: title_name });

                if (title_name == 'User') {
                    fetch("https://user.manganelo.com/?l=manganelo").then((response) => {
                        response.text().then((text) => {
                            console.log(text);
                        });
                    });
                }
            })
        })
    }

    pageToDisplay () {
        switch (this.state.login) {
            case 'Login':
                return (<UserLoginScreen page={ this.text } updateLogin={ () => this.updateStateLogin() }/>)
                break;
            case 'User':
                return (<UserProfileScreen page={ this.text } updateLogin={ () => this.updateStateLogin() }/>);
                break;
            default:
                return (
                    <View style={ styles.loading_page }>
                        <ActivityIndicator animating={ true } size="large" color="tomato" />
                    </View>
                );
                break;
        }
    }

    render () {
        return (
            <SafeAreaView style={{ flexGrow: 1 }}>
                <View style={ styles.container }>
                    { this.pageToDisplay() }
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    loading_page: {
        flexGrow: 1,
        justifyContent: "center"
    }
})

export default UserScreen;