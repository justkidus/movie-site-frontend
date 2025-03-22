// import { useState, useEffect } from 'react';
// import axios from 'axios';
// const useFetch = (url) => {
// 	const [data, setData] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(false);
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const res = await axios.get(url);
// 				// setData((prevMovies) => [...prevMovies, ...res.data.results]);
// 				setData(res.data.results);
// 				console.log('data is being fetched', data);
// 			} catch (error) {
// 				setError(error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchData();
// 	}, [url]);
// 	return { data, loading, error };
// };

// export default useFetch;
///////////////////////////////////////////////
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url: string) => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(url);
				setData(res.data.results);
				console.log('data is being fetched', res.data.results);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('An unknown error occurred');
				}
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
