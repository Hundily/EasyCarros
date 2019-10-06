import { StyleSheet, Platform } from 'react-native';
import colors from './colors';
import fonts from './fonts';

const commons = StyleSheet.create({
    shadow:{
        elevation: 4,
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowColor: '#80000000',
        shadowOffset: { height: 2, width: 2 },
    },
    small:{
        color: colors.black,
        fontSize: 14
    },
    default:{
        color: colors.black,
        fontSize: 16
    },
    texto:{
        color: colors.white,
        fontSize: 18
    },
    medium:{
        color: colors.black,
        fontSize: 16,
        // fontFamily: fonts.medium
    },
    light:{
        color: colors.black,
        fontSize: 16,
        fontFamily: Platform.OS == 'ios' ? null : 'sans-serif-light',
        fontWeight: '300',
    },
    textoAccent:{
        color: colors.cherry_red,
        fontSize: 18
    },
    textoButton:{
        color: colors.cherry_red,
        fontSize: 16,
        fontFamily: Platform.OS == 'ios' ? null : 'sans-serif-medium',
        fontWeight: '300',
    },
    textField: {
        flex: 1,
        marginTop: 16,
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 3,
        backgroundColor: colors.white_two,
        borderWidth: 0,
        borderColor: colors.white_two
    },
    valor: {
		fontSize: 16,
        fontFamily: Platform.OS == 'ios' ? null : 'sans-serif-medium',
        fontWeight: Platform.OS == 'ios' ? '600' : '300',
		color: colors.cherry_red
    },
    button: {
		fontSize: 14,
		fontFamily: fonts.bold,
		color: colors.cherry_red
	},
    textFieldError: {
        flex: 1,
        marginTop: 16,
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 3,
        backgroundColor: colors.white_two,
        borderWidth: 1,
        borderColor: colors.vermillion
    },

    baseButton: {
        backgroundColor: colors.white,
        elevation: 6,
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
        height: 48,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    baseButton: {
        backgroundColor: colors.white,
        height: 48,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    line: {
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    shadow:{
        elevation: 4,
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 2 },
    }, 
    avatar:{
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    row_space:{
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    fill: {
        flex: 1
    }
});

export default commons;