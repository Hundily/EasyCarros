import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default class ButtonCustom extends React.Component {

	render() {
		const props = this.props;
		const btnStyle = {
			container: {
				opacity: props.disabled ? 0.5 : null,
				flexDirection: 'row',
				backgroundColor: props.btncolor ? props.btncolor : colors.buttonColor,
				width: '100%',
				height: 44,
				marginVertical: props.marginVertical ? props.marginVertical : 20,
				height: 44,
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 24,
				shadowColor: colors.line_text,
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.2,
				shadowRadius: 1,
				elevation: 7,
			},
			text: {
				flex: 1,
				color: props.textcolor ? props.textcolor : colors.white,
				fontFamily: fonts.bold,
				paddingVertical: 10,
				fontSize: 14,
				textAlign: "center",
			},
			iconArrow: {
				height: 20,
				width: 30,
				position: 'absolute',
				right: 10,
				alignItems: 'center',
			}
		}
		const iconArrow = <Icon  name='long-arrow-alt-right' size={18} color={colors.white2} style={btnStyle.iconArrow} />;

		return (
			<TouchableOpacity
				disabled={this.props.disabled}
				onPress={this.props.onPress}
				style={btnStyle.container}>
				{this.props.loading && <ActivityIndicator style={btnStyle.text} color={colors.white} animating />}

				{!this.props.loading && <Text style={btnStyle.text}>{this.props.text}</Text>}

				{this.props.iconArrow && iconArrow}
			</TouchableOpacity>
		);
	}
}