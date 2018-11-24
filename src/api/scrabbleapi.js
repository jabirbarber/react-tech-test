const baseUrl = 'http://192.168.99.100:3000';

export const fetchUsersEndpoint = () => {
	let endpoint = `${baseUrl}/users`;
	return fetch(endpoint).then(resp => resp.json());
}