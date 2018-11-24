import { fetchUsersEndpoint } from '../api/scrabbleapi';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const FETCH_LEADERBOARD_START = 'FETCH_LEADERBOARD_START';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAIL = 'FETCH_LEADERBOARD_FAIL';

export function getUsersSuccessAction(payload) {
    return {
    	type: FETCH_USERS_SUCCESS,
    	payload: payload
    }
}

export function getUsers() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USERS_START });
    
    fetchUsersEndpoint()
    	.then(resp => {
    		let mappedUsers = mapUserArrayToObjectById(resp);
    		dispatch(getUsersSuccessAction(mappedUsers))
    	})
    	.catch(err => dispatch({ type: FETCH_USERS_FAIL, payload: err }))
  }
}

const mapUserArrayToObjectById = (array) => {
	var userObj = {};
	for (var i = 0; i < array.length; i++) {
		userObj[array[i].id] = array[i];
	}
	return userObj;
}