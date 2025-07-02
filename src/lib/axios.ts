import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: 'http://localhost:8080/api',
	baseURL: 'https://movie-site-production-2779.up.railway.app/api',
	withCredentials: true,
});
export default axiosInstance;
