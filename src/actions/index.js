export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

export const FETCH_LEADERBOARD_START = 'FETCH_LEADERBOARD_START';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAIL = 'FETCH_LEADERBOARD_FAIL';

export function getUsersSuccess(payload) {
    return {
    	type: FETCH_USERS_SUCCESS,
    	payload: payload
    }
}

export function getUsers() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_USERS_START });
    dispatch({ type: FETCH_USERS_FAIL });
    dispatch(getUsersSuccess({ id: 1, test: true }));
  }
}