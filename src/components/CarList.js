import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../styles/colors";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class CarList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.isFavorite ? this.props.isFavorite : false
        }
    }

    render() {
        const item = this.props.item;

        const { container, title } = styles;

        return (
            <View style={container}>
                <Text style={title}>{item.plate.toUpperCase()}</Text>
                <TouchableOpacity
                    onPress={this.props.callback}
                    style={{paddingHorizontal: 10}}>
                        <Icon
                        name='times-circle'
                        size={25}
                        color={colors.red}
                        style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray,
    },
    title: {
        flex: 1,
        fontSize: 16,
    }
});