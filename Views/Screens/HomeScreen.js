import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, ScrollView, View } from 'react-native';
import MangaDisplay from '../Elements/MangaDisplay';

import { SafeAreaView } from 'react-native-safe-area-context';

const cheerio = require('react-native-cheerio')

class HomeScreen extends React.Component {
    constructor() {
        super()

        this.NewMangas = [];
    }

    componentDidMount () {
        fetch("https://m.manganelo.com/genre-all-latest").then((response) => {
            response.text().then((text) => {
                const scrap = cheerio.load(text);
                let mangas = scrap('.content-genres-item');

                for (let i = 0; i != mangas.length; i++) {
                    let name = scrap(mangas[i]).find(".genres-item-name").text();
                    let path = scrap(mangas[i]).find(".genres-item-name").attr('href');
                    let image = scrap(mangas[i]).find(".genres-item-img img").attr('src');

                    this.NewMangas.push({ name : name, path: path, image: image });
                }
                this.forceUpdate()
            })
        }) // fetch page
    }

    onClickManga(path) {
        this.props.navigation.navigate('MangaInfo', {
            path: path
        });
    }

    render () {
        let content = [];

        if (this.NewMangas.length == 0) {
            content = <ActivityIndicator animating={ true } size="large" color="tomato" />; 
        } else {
            let i = 0;
            this.NewMangas.forEach((element) => {
                content.push(<MangaDisplay key={ i } name={ element.name } image={element.image} path={element.path} onPress={(path) => this.onClickManga(path)}></MangaDisplay>);
                i++; 
            });
        }

        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flexWrap: 'wrap' , flexDirection: 'row', justifyContent: 'space-around' }}>
                        { content }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default HomeScreen;