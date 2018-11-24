import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import leaderboardReducer from './leaderboardReducer';

const rootReducers = combineReducers({
    // add reducer files references here
    usersReducer,
    leaderboardReducer
});

export default rootReducers;