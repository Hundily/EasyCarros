import { CHANGE_VALUE, CLEANING_STATE, LOADING, AUTH_USER, ERROR_LOGIN, ERROR_REGISTER } from '../actions/types';

const INITIAL_STATE = {
    email: 'frontend-dev@easycarros.com',
    password: 'Fr0nt3ndR0ck5!',
    showPassword: false,
    loading: false,
    messageErr: '',
    errors: {}
}

export default (state = INITIAL_STATE, action) => {
    console.log('state redux', state)

    switch (action.type) {
        case CHANGE_VALUE:
            console.log('action', action)
            return { ...state, [action.state]: action.payload }
        case AUTH_USER:
            return { ...state, loading: false }
        case ERROR_LOGIN:
            return { ...state, messageErr: action.payload, loading: false }
        case ERROR_REGISTER:
            return { ...state, messageErr: action.payload, loading: false }
        case LOADING:
            return { ...state, loading: !state.loading }
        case CLEANING_STATE:
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                messageErr: '',
                loading: false
            }
        default:
            return state;
    }
}