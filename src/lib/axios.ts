import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: 'http://localhost:8080/api',
	baseURL: 'https://trailerflix-9olg.onrender.com/api',
	withCredentials: true,
});
export default axiosInstance;
