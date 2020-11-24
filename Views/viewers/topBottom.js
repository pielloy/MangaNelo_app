import React from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';

class TopBottom extends React.Component {
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
        console.log(this.props.children)
        return (
            <ScrollView>
                <TouchableWithoutFeedback onPress={ () => this.onClickPage() }>
                    <View>
                        { this.props.children }
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
};

export default TopBottom;