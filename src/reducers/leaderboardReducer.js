import { 
	FETCH_LEADERBOARD_START,
	FETCH_LEADERBOARD_SUCCESS,
	FETCH_LEADERBOARD_FAIL
} from '../actions';

const initial = {
	data: [],
	totalResults: 0,
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
            console.log(action.payload.totalResults);
            return {
            	...state,
            	leaderboardLoading: false,
            	leaderboardError: null,
            	data: action.payload.data,
            	totalResults: Number(action.payload.totalResults),
            };
        default:
            return state;
    }
}