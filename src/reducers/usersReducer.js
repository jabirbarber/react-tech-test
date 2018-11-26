import { 
	FETCH_USERS_SUCCESS,
	FETCH_USERS_START,
	FETCH_USERS_FAIL,
	UPDATE_USER_START,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_ERROR_RESET
} from '../actions';

const initial = {
	users: {},
	usersLoading: false,
	usersError: null,
	updateUserError: null,
	updateUserLoading: false
}

export default (state = initial, action) => {
	switch(action.type) {
		case FETCH_USERS_START:
			return { ...state, usersLoading: true, usersError: null };
		case FETCH_USERS_FAIL:
			return { ...state, usersLoading: false, usersError: action.payload };
		case FETCH_USERS_SUCCESS:
			return { ...state, usersLoading: false, usersError: null, users: action.payload };
		case UPDATE_USER_SUCCESS:
			let usersCopy = {...state.users};
			let updatedUser = action.payload;
			if (updatedUser) {
				usersCopy[updatedUser.id] = updatedUser;
			}
			return { ...state, updateUserLoading: false, users: usersCopy, updateUserError: null };
		case UPDATE_USER_FAIL:
			return { ...state, updateUserLoading: false, updateUserError: action.payload };
		case UPDATE_USER_START:
			return { ...state, updateUserLoading: true };
		case UPDATE_USER_ERROR_RESET:
			return { ...state, updateUserError: null };
		default:
			return state;
	}
}