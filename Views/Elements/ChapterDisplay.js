import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class ChapterDisplay extends React.Component {
    constructor() {
        super()
    }

    changePage() {
        this.props.onPress(this.props.path);
    }

    render () {
        return (
            <TouchableOpacity onPress={ () => this.changePage() }>
                <Text style={{
                    color: 'white',
                    margin: 5,
                    marginLeft: 20,
                    marginRight: 20,
                }}>{ this.props.title }</Text>
            </TouchableOpacity>
        );
    }
};

export default ChapterDisplay;