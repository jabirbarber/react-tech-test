import { fetchUsersEndpoint, fetchLeaderboardEndpoint } from '../api/scrabbleapi';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const FETCH_LEADERBOARD_START = 'FETCH_LEADERBOARD_START';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAIL = 'FETCH_LEADERBOARD_FAIL';

//@todo - seperate out action logic into seperate files

// User Actions

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

// Leaderboard Actions

export function getLeaderboardSuccessAction(payload) {
    return {
    	type: FETCH_LEADERBOARD_SUCCESS,
    	payload: payload
    }
}

export function getLeaderboard(params) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_LEADERBOARD_START });
    
    fetchLeaderboardEndpoint(params)
    	.then(resp => {
    		var totalPages = resp.headers.get('X-Total-Count');
    		resp.json().then(data => {
    			var leaderBoardData = {
    				totalPages,
    				data
    			}
	    		dispatch(getLeaderboardSuccessAction(leaderBoardData))
    		})
    	})
    	.catch(err => dispatch({ type: FETCH_LEADERBOARD_FAIL, payload: err }))
  }
}