import React from 'react';
import { StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

class FavoriteScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            width: 0,
            height: 0
        }
    }

    imageLoaded () {
        Image.getSize("https://scans-mangas.com/uploads/manga/moriarty/chapters/7/01.jpg", 
        (width, height) => { 
            this.setState({ width: (Dimensions.get('window').width) , height: (Dimensions.get('window').width * height) / width })
        });
    }

    render () {
        return (
            <Image
                style={{ width: this.state.width, height: this.state.height }}
                onLoad={ () => this.imageLoaded() } source={{ uri: "https://scans-mangas.com/uploads/manga/moriarty/chapters/7/01.jpg" }}>    
            </Image>
        );
    }
};

let style = StyleSheet.create({
    image: {
    }
});

export default FavoriteScreen;