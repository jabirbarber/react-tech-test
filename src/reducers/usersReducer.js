import { FETCH_USERS_SUCCESS } from '../actions';

export default (state = {
	users: {}
}, action) => {
    switch(action.type) {
        case FETCH_USERS_SUCCESS:
        	let newState = [...state, action.payload]
            return newState;
        default:
            return state;
    }
}