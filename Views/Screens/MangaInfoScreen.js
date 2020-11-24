import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image, ScrollView } from 'react-native';
import ChapterDisplay from '../Elements/ChapterDisplay';

const cheerio = require('react-native-cheerio');

class MangaInfoScreen extends React.Component {
    constructor() {
        super()
        this.loadState = 0;
        this.chapters = [];
    }

    onPressChapter(path) {
        this.props.navigation.navigate('MangaScreen', {
            path: path
        });
    }

    loadPage() {
        fetch(this.props.route.params.path).then((response) => {
            response.text().then((text) => {
                const scrap = cheerio.load(text);
                
                this.image = scrap('.info-image').find("img").attr('src');
                this.name = scrap('.story-info-right').find("h1").text();
                this.description = scrap('.panel-story-info-description').text().slice(15, 100000000);

                let chapters = scrap('.chapter-name');
                this.chapters = [];

                for (let i = 0; i != chapters.length; i++) {
                    let chapterName = scrap(chapters[i]).text();
                    let chapterPath = scrap(chapters[i]).attr('href');

                    this.chapters.push(<ChapterDisplay key={ i } title={ chapterName } path={ chapterPath } onPress={ (path) => this.onPressChapter(path) }></ChapterDisplay>);
                }
                this.loadState = 1;
                this.forceUpdate()
            })
        });
    }
 
    render () {
        let content;

        switch (this.loadState) {
            case 0:
                content = <ActivityIndicator animating={ true } size="large" color="tomato" />; 
                this.loadPage();
                break;
            case 1:
                this.loadState = 0;
                content = 
                    <View>
                        <View style={ displayer.header }>
                            <Image source={{ uri: this.image }} style={displayer.image }></Image>
                            <View>
                                <Text style={ {color: 'white', textAlign: 'center', fontSize: 20, width: (Dimensions.get('window').width - 200) } }>
                                    { this.name }
                                </Text>
                            </View>
                        </View>
                        <Text style={ displayer.orangeTitle }>Description :</Text>
                        <Text style={ displayer.description } >
                            { this.description }
                        </Text>
                        <Text style={ displayer.orangeTitle }>Chapters :</Text>
                        <View style={{ height: 25 }}></View>
                        { this.chapters }
                        <View style={{ height: 25 }}></View>
                    </View>;
                break;
        }

        return (
            <ScrollView>
                { content }
            </ScrollView>
        );
    }
};

const displayer = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 20
    },
    image: {
        height: 240,
        width: 160,
        backgroundColor: 'black',
        margin: 10,
        borderRadius: 10
    },
    description: {
        color: 'white',
        textAlign: 'justify',
        margin: 20
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    orangeTitle: {
        color: 'tomato',
        fontSize: 20,
        marginLeft: 30,
    }
});

export default MangaInfoScreen;