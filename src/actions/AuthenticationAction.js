import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { API } from '../config/AppConstants';
import { CHANGE_VALUE, CLEANING_STATE, LOADING, AUTH_USER, ERROR_LOGIN, SUCCESS_REGISTER, ERROR_REGISTER } from './types';

export const ChangeValue = (state, val) => {
    return {
        type: CHANGE_VALUE,
        state: state,
        payload: val,
    }
}

export const CleaningState = () => {
    return dispatch => {
        dispatch({ type: CLEANING_STATE })
    }
}

export const Loading = (state, val) => {
    return {
        type: LOADING,
        state: state,
        payload: val,
    }
}

export const AuthenticationUser = (email, password) => {
    return dispatch => {
        dispatch({ type: LOADING });

        var data = {
            email,
            password
        }

        axios.post(API.URL + '/auth', data)
            .then(res => {
                dispatch({ type: AUTH_USER });
                if (res.data.data != null){
                    let token = res.data.data.token
                    AsyncStorage.setItem('token', JSON.stringify(token));
                    global.token = token;
                    Actions.feed();
                }
            }).catch(err => {
                dispatch({ type: ERROR_LOGIN, payload: "Invalid credentials" });
        })
    }
}

export const RegisterPassword = () => {
    return dispatch => {
        dispatch({ type: LOADING });
    }
}