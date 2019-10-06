import { CHANGE_VALUE, GET_FEED, LOADING, CLEANING_STATE, ADD_CAR } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    status: 'NORMAL',
    licensePlate: '',
    loading: true,
    refreshing: false,
}

export default (state = INITIAL_STATE, action) => {
    console.log('state redux', state)

    switch (action.type) {
        case ADD_CAR:
            return { ...state, [action.state]: action.payload }
        case CHANGE_VALUE:
            console.log('action', action)
            return { ...state, [action.state]: action.payload }
        case LOADING:
            return { ...state, loading: !state.loading }
        case GET_FEED:
            return { ...state, data: action.payload, loading: false, refreshing: false }
        case CLEANING_STATE:
            return {
                ...state,
                licensePlate: "",
                loading: false,
            }
        default:
            return state;
    }
}