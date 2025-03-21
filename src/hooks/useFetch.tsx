import { useState, useEffect } from 'react';
import axios from 'axios';
const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(url);
				// setData((prevMovies) => [...prevMovies, ...res.data.results]);
				setData(res.data.results);
				console.log('data is being fetched', data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);
	return { data, loading, error };
};

export default useFetch;
