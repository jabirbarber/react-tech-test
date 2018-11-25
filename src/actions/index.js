import { fetchUsersEndpoint, fetchLeaderboardEndpoint, fetchGamesEndpoint, updateUserEndpoint } from '../api/scrabbleapi';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const FETCH_LEADERBOARD_START = 'FETCH_LEADERBOARD_START';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAIL = 'FETCH_LEADERBOARD_FAIL';

export const FETCH_GAMES_START = 'FETCH_GAMES_START';
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const FETCH_GAMES_FAIL = 'FETCH_GAMES_FAIL';

export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const UPDATE_USER_ERROR_RESET = 'UPDATE_USER_ERROR_RESET';


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

export function updateUser(userId, newUserObject) {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_START });
    updateUserEndpoint(userId, newUserObject)
        .then(resp => {
            if (resp.errors || !resp.id) {
                dispatch({ type: UPDATE_USER_FAIL, payload: resp })
            } else {
                dispatch({ type: UPDATE_USER_SUCCESS, payload: resp })
            }
        })
        .catch(err => dispatch({ type: UPDATE_USER_FAIL, payload: err }))
  }
}

export function resetUpdateUserError() {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_ERROR_RESET });
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
    		var totalResults = resp.headers.get('X-Total-Count');
    		resp.json().then(data => {
    			var leaderBoardData = {
    				totalResults,
    				data
    			}
	    		dispatch(getLeaderboardSuccessAction(leaderBoardData))
    		})
    	})
    	.catch(err => dispatch({ type: FETCH_LEADERBOARD_FAIL, payload: err }))
  }
}

// Games Actions

export function getGamesSuccessAction(payload) {
    return {
        type: FETCH_GAMES_SUCCESS,
        payload: payload
    }
}

export function getGames(params) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_GAMES_START });
    
    fetchGamesEndpoint(params)
        .then(resp => {
            var totalResults = resp.headers.get('X-Total-Count');
            console.log(totalResults);
            resp.json().then(data => {
                var gamesData = {
                    totalResults,
                    games: data
                }
                dispatch(getGamesSuccessAction(gamesData))
            })
        })
        .catch(err => dispatch({ type: FETCH_GAMES_FAIL, payload: err }))
  }
}