import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

const cheerio = require('react-native-cheerio');

class MangaScreen extends React.Component {
    constructor() {
        super();
        this.loadState = 0;
        this.images = [];
    }

    loadPage() {
        


        /*fetch(this.props.route.params.path).then((response) => {
            response.text().then((text) => {
                const scrap = cheerio.load(text);

                let images = scrap('.container-chapter-reader').find("img");
                this.images = [];

                for (let i = 0; i != images.length; i++) {
                    let img = scrap(images[i]).attr('src');

                    this.images.push(<Image source={{ uri: img }} style={ displayer.images }></Image>);
                }
                this.loadState = 1;
                this.forceUpdate()
            })
        });
        this.loadState = 1;*/
    }

    render () {
        let content;

        switch (this.loadState) {
            case 0:
                content = <ActivityIndicator animating={ true } size="large" color="tomato" />; 
                this.loadPage();
                break;
            case 1:
                content = <View>{ this.images }</View>;
                this.loadState = 0;
                break;
        }

        return (
            <View>
                { content }
            </View>
        );
    }
};

const displayer = StyleSheet.create({
    images: {
        width: 400,
        height: 400
    }
});

export default MangaScreen;