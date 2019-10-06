import { Alert } from 'react-native';
import { API } from '../config/AppConstants';
import axios from 'axios';
import { CHANGE_VALUE, CLEANING_STATE, LOADING, GET_FEED } from './types';
import AsyncStorage from '@react-native-community/async-storage';

export const ChangeValue = (state, val) => {
    return {
        type: CHANGE_VALUE,
        state: state,
        payload: val,
    }
}

let config = {
    headers: {
        'Authorization': 'Bearer ' + global.token
    }
}

export const InsertCar = (car) => {
    return dispatch => {
        dispatch({ type: LOADING });

        if (car != "") {
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + global.token
                }
            }

            axios.post(API.URL + '/vehicle', {"plate" : car}, config)
            .then(res => {
                console.log("res", res)
                if (res.data.data != null) {
                    Alert.alert(
                        'EasyCarros',
                        'Carro adicionado com sucesso!',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                }
                dispatch({ type: CLEANING_STATE })
            }).catch(err => {
                console.log('err', err);
                Alert.alert(
                    'EasyCarros',
                    'Erro ao tentar adicionar carro',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
            })
        }
    }
}

export const RemoveCar = (id) => {
    return dispatch => {
        dispatch({ type: LOADING });
            
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.token
            }
        }

        axios.delete(API.URL + `/vehicle/` + id, config)
            .then(res => {
                console.log("res", res)
                if (res.status == 204) {
                    Alert.alert(
                        'EasyCarros',
                        'Carro deletado com sucesso!',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                        );
                }
                dispatch({ type: CLEANING_STATE })
            }).catch(err => {
                console.log('err', err);
                Alert.alert(
                    'EasyCarros',
                    'Erro ao tentar deletar carro',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                    );
            })
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

export const GetCars = () => {

    return dispatch => {
        dispatch({ type: LOADING });

        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.token
            }
        }

        console.log("config", config)

        axios.get(API.URL + '/vehicle', config)
        .then(res => {
            console.log("res", res)
            if (res.data.data != null) {
                dispatch({ type: GET_FEED, payload: res.data.data });
            }
        }).catch(err => {
            console.log('err', err);
        })
    }
}