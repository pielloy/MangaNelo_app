import React from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, ScrollView, Dimensions, View, TouchableWithoutFeedback } from 'react-native';

class rightLeft extends React.Component {
    constructor() {
        super()
        this.state = {
            width: 0,
            height: 0
        }
    }

    onClickPage() {
        this.props.onPress();
    }

    render () {
        return (
            <ScrollView 
            snapToInterval={ Dimensions.get('window').width }
            decelerationRate={0.99}
            disableIntervalMomentum={true}
            snapToAlignment="center"
            nestedScrollEnabled={true}
            horizontal={ true }
            contentContainerStyle={{ alignItems: 'center' }}
            >
                <TouchableWithoutFeedback onPress={ () => this.onClickPage() }>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        { this.props.children } 
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}; 

let style = StyleSheet.create({
    image: { 
    }
});

export default rightLeft;