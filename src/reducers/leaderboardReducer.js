import { FETCH_LEADERBOARD_START } from '../actions';

export default (state = {
	leaderboard: []
}, action) => {
    switch(action.type) {
        case FETCH_LEADERBOARD_START:
            return action.payload;
        default:
            return state;
    }
}