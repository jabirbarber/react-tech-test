import { 
	FETCH_GAMES_START,
	FETCH_GAMES_SUCCESS,
	FETCH_GAMES_FAIL
} from '../actions';

const initial = {
	games: [],
	totalResults: 0,
	gamesLoading: false,
	gamesError: null
}

export default (state = initial, action) => {
	switch(action.type) {
		case FETCH_GAMES_START:
			return { ...state, gamesLoading: true, gamesError: null };
		case FETCH_GAMES_FAIL:
			return { ...state, gamesLoading: false, gamesError: action.payload };
		case FETCH_GAMES_SUCCESS:
			return {
				...state,
				gamesLoading: false,
				gamesError: null,
				games: action.payload.games,
				totalResults: Number(action.payload.totalResults),
			};
		default:
			return state;
	}
}