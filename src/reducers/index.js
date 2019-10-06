import { combineReducers } from 'redux';
import AuthenticationReducers from './AuthenticationReducers';
import FeedReducers from './FeedReducers';

export default combineReducers({
    AuthenticationReducers: AuthenticationReducers,
    FeedReducers: FeedReducers,
})