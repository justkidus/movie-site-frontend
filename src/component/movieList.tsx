import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
// import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';
import { addToFav } from '../store/ProfileSlice';
interface Movie {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
	// add other needed fields...
}
const MovieList = () => {
	const dispatch = useDispatch<AppDispatch>();
	// const loading = useSelector((state: RootState) => state.auth.loading);
	// const error = useSelector((state: RootState) => state.auth.error);
	// Type favorites as a Set of movie ids (numbers)
	const [favorites, setFavorites] = useState<Set<number>>(new Set());
	// Type watchProgress as a record where keys are movie ids and values are progress numbers
	// const [watchProgress, setWatchProgress] = useState<Record<number, number>>(
	// 	{}
	// );
	// Type movies as an array of Movie objects

	const [movies, setMovies] = useState<Movie[]>([]);

	const [loading, setLoading] = useState<boolean>(true);
	// error is either a string or null
	const [error, setError] = useState<string | null>(null);
	const API_KEY = import.meta.env.VITE_API_KEY; // Ensure your .env variable is prefixed with VITE_
	const navigate = useNavigate();

	// Fetch Movies using axios
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
				);
				setMovies(response.data.results);
			} catch (err: unknown) {
				// Safely extract the error message
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('An unknown error occurred');
				}
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, [API_KEY]);
	console.log('movie list', movies);

	const HandleaddToFav = (movieId: number) => {
		// const favs = new Set();
		// favs.add(1); // add item
		// favs.has(1); // check if exists
		// favs.delete(1); // remove item
		setFavorites((prev) => {
			const fav = new Set(prev);
			fav.has(movieId) ? fav.delete(movieId) : fav.add(movieId);
			return fav;
		});
		console.log('add', movieId);
		dispatch(addToFav({ movieId: movieId.toString() }));
	};
	// // Save watch progress to localStorage whenever it changes
	// useEffect(() => {
	// 	if (Object.keys(watchProgress).length > 0) {
	// 		localStorage.setItem('movieProgress', JSON.stringify(watchProgress));
	// 	}
	// }, [watchProgress]);

	// Handle favorite toggle and progress update
	// const handleFavoriteAndProgress = (movieId: number) => {
	// 	setFavorites((prev) => {
	// 		const newFavorites = new Set(prev);
	// 		newFavorites.has(movieId)
	// 			? newFavorites.delete(movieId)
	// 			: newFavorites.add(movieId);
	// 		return newFavorites;
	// 	});

	// 	setWatchProgress((prev) => ({
	// 		...prev,
	// 		[movieId]: prev[movieId]
	// 			? prev[movieId] >= 100
	// 				? 0
	// 				: prev[movieId] + 25
	// 			: 25,
	// 	}));
	// };

	if (loading) return <p>Loading movies...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="p-6 mt-[20px]" id="movies">
			<h1 className="text-[20px] mb-[20px] ml-[20px] font-bold">Movies</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{movies.map((movie) => {
					// const isFavorite = favorites.has(movie.id);
					// const progress = watchProgress[movie.id] || 0;

					return (
						<div
							key={movie.id}
							className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
							onClick={() => navigate(`/trailer/${movie.id}`)}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								className="w-full h-80 object-cover rounded-md"
							/>
							<h3 className="text-lg font-semibold mt-2 text-white">
								{movie.title}
							</h3>
							<div className="flex justify-between mr-[20px]">
								<p>{movie.vote_average}</p>
								{/* <button
									id={`favourite-btn-${movie.id}`}
									className={`bg-yellow-300 ${
										isFavorite ? 'text-red-500' : 'text-white'
									}`}
									onClick={(e) => {
										e.stopPropagation();
										handleFavoriteAndProgress(movie.id);
									}}
								>
									<FavoriteIcon />
									{progress > 0 && (
										<span className="ml-1 text-sm">{progress}%</span>
									)}
								</button> */}
								<button
									id={`favourite-btn-${movie.id}`}
									className={`bg-yellow-300 ${
										favorites ? 'text-red-500' : 'text-white'
									}`}
									onClick={(e) => {
										e.stopPropagation(); // prevent navigate
										HandleaddToFav(movie.id);
									}}
								>
									<FavoriteIcon />
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MovieList;
