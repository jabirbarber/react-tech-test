const baseUrl = 'http://192.168.99.100:3000';

export const fetchUsersEndpoint = () => {
	let endpoint = `${baseUrl}/users`;
	return fetch(endpoint).then(resp => resp.json());
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
}

const convertObjToUrlParams = (obj) => {
	if (obj) return new URLSearchParams(Object.entries(obj)).toString();
	return '';
}