import axios from 'axios';
const Axios = axios.create({
	baseURL: import.meta.env.VITE_APP_PATH,
	headers: {
        'Content-Type': 'text/json',
		"Accept": "application/json",
		"Access-Control-Allow-Origin" : "*",
		"Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, OPTIONS, PATCH",
		"Authorization" : localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '',
		'X-CSRF-TOKEN' : document.querySelector('meta')
	},
});

export default Axios;