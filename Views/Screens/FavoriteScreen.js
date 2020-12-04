import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const cheerio = require('react-native-cheerio')

class FavoriteScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            mangas: []
        }
    }

    componentDidMount () {
        this.updateFavorite();
    }

    updateFavorite () {
        console.log(this.props.cookies.cookie[0]);
        fetch("https://manganelo.com/bookmark",
        {
            headers: {
                credentials: 'include',
                "set-cookie": this.props.cookies.cookie,
                cookie: this.props.cookies.cookie,
            }
        }).then((response) => {
            response.text().then((text) => {
                const scrap = cheerio.load(text);

                let mangas = scrap('title').text();

                console.log(mangas)
                //for (let i = 0; i != mangas.length; i++) {
                //    let name = scrap(mangas[i]).find(".item-story-name").text();
                //    console.log(name);
                //}
            })
        })
    }

    render () {
        if (this.state.mangas.length == 0)
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={ styles.text }>Login or reload to see your favorite</Text>
                    <TouchableOpacity style={ styles.button } onPress={ () =>this.updateFavorite() }>
                        <Text style={{ color: 'white' }}>Reload Favorite</Text>
                    </TouchableOpacity>
                </View>
            );
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>Manga Found !</Text>
        </View>);
    }
};

let styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20
    },
    button: {
        height: 50,
        width: 200,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "tomato",
        margin: 30
    }
})

export default FavoriteScreen;