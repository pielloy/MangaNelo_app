import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

class MangaDisplay extends React.Component {
    constructor () {
        super();
    }

    render() {
        console.log(this.props.image);
        return (<View style={ displayer.manga }>
            <Image source={{ uri: this.props.image }} style={displayer.image }></Image>
            <Text>{ this.props.name }</Text>
        </View>);
    }
};

const displayer = StyleSheet.create({
    manga: {
        width: 120,
        margin: 3
    },
    image: {
        height: 200,
        margin: 5
    }
});

export default MangaDisplay;