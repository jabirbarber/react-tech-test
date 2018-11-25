const baseUrl = 'http://localhost:3000'; //http://192.168.99.100:3000';

export const fetchUsersEndpoint = () => {
	let endpoint = `${baseUrl}/users`;
	return fetch(endpoint)
			.then(resp => resp.json())
			.catch(resp => resp.json());
}

export const fetchLeaderboardEndpoint = (params) => {
	let fetchData = { 
	    method: 'GET', 
	    headers: {
			'X-Total-Count': true
		}
	}
	let endpoint = `${baseUrl}/leaderboard`;
	return fetch(endpoint + '?' + convertObjToUrlParams(params), fetchData)
			.catch(resp => resp.json());
}

export const fetchGamesEndpoint = (params) => {
	let fetchData = { 
	    method: 'GET', 
	    headers: {
			'X-Total-Count': true
		}
	}
	let endpoint = `${baseUrl}/games`;
	return fetch(endpoint + '?' + convertObjToUrlParams(params), fetchData)
			.catch(resp => resp.json());
}

export const updateUserEndpoint = (userId, params) => {
	let patchData = {
	    method: 'PATCH',
	    headers: {
	      'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(params)
  	}
	let endpoint = `${baseUrl}/users/${userId}`;
	return fetch(endpoint, patchData)
		.then(resp => resp.json())
		.catch(resp => resp.json())
}

const convertObjToUrlParams = (obj) => {
	if (obj) return new URLSearchParams(Object.entries(obj)).toString();
	return '';
}