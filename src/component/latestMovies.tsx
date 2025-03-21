import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';
const LatestMovies = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate(); // 👈 React Router navigation
	const API_KEY = config.API_KEY;
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
				);
				if (!response.ok) {
					throw new Error('Failed to Fetch movies');
				}
				const data = await response.json();
				setMovies(data.results);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, []);

	if (loading) return <p>Loading Movies....</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const latestMovies = movies.filter((movie) => {
		const movieReleaseDate = new Date(movie.release_date);
		return movieReleaseDate >= thirtyDaysAgo;
	});
	console.log('this is the latest movies', latestMovies);
	const truncateText = (text, length) => {
		return text.length > length ? text.slice(0, length) + '...' : text;
	};

	return (
		<>
			<div className="mt-[20px]">
				<h1 className="text-2xl font-bold pl-[50px] pb-[20px]">
					Latest Movies
				</h1>
				<div className="flex justify-center items-center">
					<div className="flex px-[20px] gap-[50px] overflow-x-auto w-[100%] whitespace-nowrap overflow-hidden">
						{latestMovies.map((movie) => (
							<div className="flex-shrink-0 w-[200px]">
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									className="w-auto h-[40vh]"
									onClick={() => navigate(`/trailer/${movie.id}`)}
								/>

								<p className="font-semibold mt-2 text-white">
									{truncateText(movie.title, 20)}
								</p>
								<p>{movie.vote_average}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default LatestMovies;
