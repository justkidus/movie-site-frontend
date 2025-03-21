import { useEffect, useState } from 'react';
import config from '../../config.json';
const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const API_KEY = config.API_KEY;

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
				);
				if (!response.ok) {
					throw new Error('Failed to fetch movies');
				}
				const data = await response.json();
				setMovies(data.results); // Store movies in state
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);

	if (loading) return <p>Loading movies...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
			{movies.map((movie) => (
				<div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
					<img
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						className="w-full h-80 object-cover rounded-md"
					/>
					<h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
					<p className="text-gray-400">ID: {movie.id}</p>
				</div>
			))}
		</div>
	);
};

export default MovieList;
