import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';

class MangaDisplay extends React.Component {
    constructor () {
        super();
    }

    viewClicked () {
        this.props.onPress(this.props.path);
    }

    render() {
        return (
            <TouchableOpacity style={ displayer.manga } onPress={() => this.viewClicked() }>
                <Image source={{ uri: this.props.image }} style={displayer.image }></Image>
                <Text style={displayer.text}>{ this.props.name }</Text>
            </TouchableOpacity>);
    }
};

const displayer = StyleSheet.create({
    manga: {
        width: 120,
        margin: 3
    },
    image: {
        height: 150,
        margin: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5  
    },
    text: {
        color: 'white',
        textAlign: 'center'
    }
});

export default MangaDisplay;