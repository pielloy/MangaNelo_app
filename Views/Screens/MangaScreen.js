import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import PageDisplay from '../Elements/PageDisplay';
import TopBottom from '../viewers/topBottom';
import RightLeft from '../viewers/rightLeft';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const cheerio = require('react-native-cheerio');

class MangaScreen extends React.Component {
    constructor() {
        super();
        this.loadState = 0;
        this.images = [];
        this.state = {
            readType: 'Left',
            headerNotVisible: true
        };
    }

    onClickManga() {
        this.setState({ headerNotVisible: !this.state.headerNotVisible});
        this.props.navigation.setOptions({ headerShown: this.state.headerNotVisible }); 
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

    changeReadType(type) {
        this.setState({ readType: type })
    }

    footer() {
        if (this.state.headerNotVisible == true) {
            return (null);
        } else {
            return (
            <View style={ displayer.footer }>
                <TouchableOpacity onPress={ () => this.changeReadType('Left') }>
                    <MaterialCommunityIcons style={ displayer.icon } name="page-next-outline" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.changeReadType('Bottom') }>
                    <MaterialCommunityIcons style={ displayer.icon } name="chevron-down-box-outline" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons style={ displayer.icon } name="page-previous-outline" size={30} color="white" />
                </TouchableOpacity>
            </View>);
        }
    }

    body() {
        let test = [];

        for (let i = 0; i != 20; i++)
            test.push(<PageDisplay key={ i }></PageDisplay>);

        switch (this.state.readType) {
            case 'Bottom':
                return (<TopBottom onPress={ () => this.onClickManga() }>{ test }</TopBottom>);
                break;
            case 'Left':
                return (<RightLeft onPress={ () => this.onClickManga() }>{ test }</RightLeft>);    
                break;
            case 'right':

                break;
        }
    }

    render () {
        //let content;

        /*switch (this.loadState) {
            case 0:
                content = <ActivityIndicator animating={ true } size="large" color="tomato" />; 
                this.loadPage();
                break;
            case 1:
                content = <View>{  }</View>;
                this.loadState = 0;
                break;
        }*/

        return (
            <View style={{ flexGrow: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    { this.body() }
                </View>
                { this.footer() }
            </View>
        );
    }
};

const displayer = StyleSheet.create({
    footer: {
        width: Dimensions.get('window').width,
        height: 60,
        backgroundColor: '#161B21',
        borderTopWidth: 1,
        borderTopColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icon: {
    }
});

export default MangaScreen;