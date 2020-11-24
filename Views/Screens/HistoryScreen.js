import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View  } from 'react-native';

class HistoryScreen extends React.Component {
    constructor() {
        super()
    }

    

    render () {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white' }}>History Screen</Text>
            </View>
        );
    }
};

export default HistoryScreen;