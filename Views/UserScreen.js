import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';


class UserScreen extends React.Component {
    constructor() {
        super()
    }

    

    render () {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>UserScreen Screen</Text>
            </View>
        );
    }
};

export default UserScreen;