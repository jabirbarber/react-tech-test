import { 
	FETCH_LEADERBOARD_START,
	FETCH_LEADERBOARD_SUCCESS,
	FETCH_LEADERBOARD_FAIL
} from '../actions';

const initial = {
	data: [],
	totalPages: 10,
	leaderboardLoading: false,
	leaderboardError: null
}

export default (state = initial, action) => {
    switch(action.type) {
    	case FETCH_LEADERBOARD_START:
            return { ...state, leaderboardLoading: true, leaderboardError: null };
        case FETCH_LEADERBOARD_FAIL:
            return { ...state, leaderboardLoading: false, leaderboardError: action.payload };
        case FETCH_LEADERBOARD_SUCCESS:
            return {
            	...state,
            	leaderboardLoading: false,
            	leaderboardError: null,
            	data: action.payload.data,
            	totalPages: action.totalPages || state.totalPages
            };
        default:
            return state;
    }
}