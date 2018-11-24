import { 
	FETCH_USERS_SUCCESS,
	FETCH_USERS_START,
	FETCH_USERS_FAIL
} from '../actions';

const initial = {
	users: {},
	usersLoading: false,
	usersError: null
}

export default (state = initial, action) => {
    switch(action.type) {
    	case FETCH_USERS_START:
            return { ...state, usersLoading: true, usersError: null };
        case FETCH_USERS_FAIL:
            return { ...state, usersLoading: false, usersError: action.payload };
        case FETCH_USERS_SUCCESS:
            return { ...state, usersLoading: false, usersError: null, users: action.payload };
        default:
            return state;
    }
}