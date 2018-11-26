import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import leaderboardReducer from './leaderboardReducer';
import gamesReducer from './gamesReducer';

const rootReducers = combineReducers({
	// add reducer files references here
	usersReducer,
	leaderboardReducer,
	gamesReducer
});

export default rootReducers;