// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import config from '../../config.json';
// import axios from 'axios';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import MovieProgress from '../pages/movieProgress';
// const MovieList = () => {
// 	const [movies, setMovies] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const API_KEY = config.API_KEY;
// 	const navigate = useNavigate();
// 	const [favorit, setFavourite] = useState(new Set());
// 	const [watchProgress, setWatchProgress] = useState([]);
// 	useEffect(() => {
// 		const fetchMovies = async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
// 				);
// 				// if (!response.ok) {
// 				// 	throw new Error('Failed to fetch movies');
// 				// }
// 				// const data = await response.json();// this only works for fetch
// 				const data = response.data;
// 				setMovies(data.results);
// 			} catch (err) {
// 				setError(err.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchMovies();
// 	}, [API_KEY]);
// 	useEffect(() => {
// 		const savedFavorites = JSON.parse(localStorage.getItem('favorite')) || [];
// 		const savedProgress =
// 			JSON.parse(localStorage.getItem('movieProgress')) || [];
// 		setFavourite(new Set(savedFavorites));
// 		setWatchProgress(savedProgress);
// 	}, []);
// // save it in the localstorage
// 	useEffect(() => {
// 		localStorage.setItem('favorite', JSON.stringify(Array.from(favorit)));
// 	}, [favorit]);
// 	useEffect(() => {
// 		localStorage.setItem(
// 			'movieProgress',
// 			JSON.stringify(Array.from(watchProgress))
// 		);
// 	}, [watchProgress]);

// 	const handleFavoriteAndProgress = (movieId) => {
// 		setFavourite((prev) => {
// 			const newFavorites = new Set(prev);
// 			newFavorites.has(movieId)
// 				? newFavorites.delete(movieId)
// 				: newFavorites.add(movieId);
// 			return newFavorites;
// 		});
// //update progress
// 		setWatchProgress((prev) => ({
// 			...prev,
// 			[movieId]: prev[movieId]
// 				? (prev[movieId] >= 100
// 					? 0
// 					: prev[movieId] + 25)
// : 25
// 		}));
// 	};

// 	if (loading) return <p>Loading movies...</p>;
// 	if (error) return <p className="text-red-500">{error}</p>;

// 	return (
// 		<div className="p-6 mt-[20px]" id="movies">
// 			<h1 className="text-[20px] mb-[20px] ml-[20px] font-bold">Movies</h1>
// 			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// 				{movies.map((movie) => (
// 					const isFavorite=favorit.has(movie.id)
// 					const progress=watchProgress(movie.id) ||0
// 					return(
// 					<div
// 						key={movie.id}
// 						className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
// 						onClick={() => navigate(`/trailer/${movie.id}`)}
// 					>
// 						<img
// 							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
// 							alt={movie.name}
// 							className="w-full h-80 object-cover rounded-md"
// 						/>
// 						<h3 className="text-lg font-semibold mt-2 text-white">
// 							{movie.title}
// 						</h3>
// 						<div className="flex justify-between mr-[20px]">
// 							<p>{movie.vote_average}</p>
// 							<button
// 								id={`favourite-btn-${movie.id}`}
// 								className="bg-yellow-300"
// 								onClick={(e) => {
// 									e.stopPropagation();
// 									// MovieProgress(movie.id);
// 									console.log('favoutite movie', movie.id);
// 								}}
// 							>
// 								<FavoriteIcon className="bg-yellow-300" />
// 								                                    {progress > 0 && (
//                                         <span className="text-sm">
//                                             {progress}%
//                                         </span>
//                                     )}
// 							</button>
// 						</div>
// 					</div>
// 					)
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default MovieList;

//////////////////////////////////////////////
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import config from '../../config.json';
// import axios from 'axios';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// const MovieList = () => {
// 	const [movies, setMovies] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const API_KEY = config.API_KEY;
// 	const navigate = useNavigate();

// 	// Correct state initialization
// 	const [favorites, setFavorites] = useState(new Set());
// 	const [watchProgress, setWatchProgress] = useState({});

// 	useEffect(() => {
// 		const fetchMovies = async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
// 				);
// 				setMovies(response.data.results);
// 			} catch (err) {
// 				setError(err.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchMovies();
// 	}, [API_KEY]); // Added API_KEY as dependency

// 	// Initialize from localStorage
// 	useEffect(() => {
// 		const savedFavorites = JSON.parse(localStorage.getItem('favorite')) || [];
// 		const savedProgress =
// 			JSON.parse(localStorage.getItem('movieProgress')) || {};
// 		setFavorites(new Set(savedFavorites));
// 		setWatchProgress(savedProgress);
// 	}, []);

// 	// Save favorites to localStorage
// 	useEffect(() => {
// 		localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
// 	}, [favorites]);

// 	// Save progress to localStorage
// 	useEffect(() => {
// 		localStorage.setItem('movieProgress', JSON.stringify(watchProgress));
// 	}, [watchProgress]);
// /////////////////////////////////////////////////
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import config from '../../config.json';
// import axios from 'axios';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// const MovieList = () => {
// 	// State initialization
// 	const [favorites, setFavorites] = useState(new Set());
// 	const [watchProgress, setWatchProgress] = useState({});
// 	const [movies, setMovies] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const API_KEY = config.API_KEY;
// 	const navigate = useNavigate();
// 	useEffect(() => {
// 		const fetchMovies = async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
// 				);
// 				setMovies(response.data.results);
// 			} catch (err) {
// 				setError(err.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchMovies();
// 	}, [API_KEY]); // Added API_KEY as dependency

// 	// Initialize from localStorage
// 	useEffect(() => {
// 		try {
// 			const savedFavorites =
// 				JSON.parse(localStorage.getItem('favorites')) || [];
// 			const savedProgress =
// 				JSON.parse(localStorage.getItem('movieProgress')) || {};
// 			setFavorites(new Set(savedFavorites));
// 			setWatchProgress(savedProgress);
// 		} catch (error) {
// 			console.error('Error loading localStorage data:', error);
// 		}
// 	}, []);

// 	// Save favorites
// 	useEffect(() => {
// 		try {
// 			localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
// 		} catch (error) {
// 			console.error('Error saving favorites:', error);
// 		}
// 	}, [favorites]);

// 	// Save progress
// 	useEffect(() => {
// 		try {
// 			localStorage.setItem('movieProgress', JSON.stringify(watchProgress));
// 		} catch (error) {
// 			console.error('Error saving progress:', error);
// 		}
// 	}, [watchProgress]);

// 	// Rest of your component...

// 	const handleFavoriteAndProgress = (movieId) => {
// 		// Toggle favorite
// 		setFavorites((prev) => {
// 			const newFavorites = new Set(prev);
// 			newFavorites.has(movieId)
// 				? newFavorites.delete(movieId)
// 				: newFavorites.add(movieId);
// 			return newFavorites;
// 		});

// 		// Update progress
// 		setWatchProgress((prev) => ({
// 			...prev,
// 			[movieId]: prev[movieId]
// 				? prev[movieId] >= 100
// 					? 0
// 					: prev[movieId] + 25
// 				: 25,
// 		}));
// 	};

// 	if (loading) return <p>Loading movies...</p>;
// 	if (error) return <p className="text-red-500">{error}</p>;

// 	return (
// 		<div className="p-6 mt-[20px]" id="movies">
// 			<h1 className="text-[20px] mb-[20px] ml-[20px] font-bold">Movies</h1>
// 			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// 				{movies.map((movie) => {
// 					const isFavorite = favorites.has(movie.id);
// 					const progress = watchProgress[movie.id] || 0;

// 					return (
// 						<div
// 							key={movie.id}
// 							className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
// 							onClick={() => navigate(`/trailer/${movie.id}`)}
// 						>
// 							<img
// 								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
// 								alt={movie.title} // Changed from movie.name to movie.title
// 								className="w-full h-80 object-cover rounded-md"
// 							/>
// 							<h3 className="text-lg font-semibold mt-2 text-white">
// 								{movie.title}
// 							</h3>
// 							<div className="flex justify-between mr-[20px]">
// 								<p>{movie.vote_average}</p>
// 								<button
// 									id={`favourite-btn-${movie.id}`}
// 									className={`bg-yellow-300 ${
// 										isFavorite ? 'text-red-500' : 'text-white'
// 									}`}
// 									onClick={(e) => {
// 										e.stopPropagation();
// 										handleFavoriteAndProgress(movie.id);
// 									}}
// 								>
// 									<FavoriteIcon />
// 									{progress > 0 && (
// 										<span className="ml-1 text-sm">{progress}%</span>
// 									)}
// 								</button>
// 							</div>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };

// export default MovieList;
////////////////////////////////////////////////////////

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import config from '../../config.json';
// import axios from 'axios';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// const MovieList = () => {
// 	const [movies, setMovies] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const API_KEY = config.API_KEY;
// 	const navigate = useNavigate();

// 	const [favorites, setFavorites] = useState(new Set());
// 	const [watchProgress, setWatchProgress] = useState({});

// 	useEffect(() => {
// 		const fetchMovies = async () => {
// 			try {
// 				const response = await axios.get(
// 					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
// 				);
// 				setMovies(response.data.results);
// 			} catch (err) {
// 				setError(err.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchMovies();
// 	}, [API_KEY]);

// 	// Initialize from localStorage with numeric conversion
// 	useEffect(() => {
// 		try {
// 			// Convert favorites to numbers
// 			const savedFavorites =
// 				JSON.parse(localStorage.getItem('favorites')) || [];
// 			const numericFavorites = savedFavorites.map(Number);
// 			setFavorites(new Set(numericFavorites));

// 			// Convert progress keys to numbers
// 			const savedProgress =
// 				JSON.parse(localStorage.getItem('movieProgress')) || {};
// 			const numericProgress = Object.entries(savedProgress).reduce(
// 				(acc, [key, value]) => {
// 					acc[Number(key)] = value;
// 					return acc;
// 				},
// 				{}
// 			);
// 			setWatchProgress(numericProgress);
// 		} catch (error) {
// 			console.error('Error loading localStorage data:', error);
// 		}
// 	}, []);

// 	// Save favorites
// 	useEffect(() => {
// 		localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
// 	}, [favorites]);

// 	// Save progress
// 	useEffect(() => {
// 		localStorage.setItem('movieProgress', JSON.stringify(watchProgress));
// 	}, [watchProgress]);

// 	const handleFavoriteAndProgress = (movieId) => {
// 		// Toggle favorite
// 		setFavorites((prev) => {
// 			const newFavorites = new Set(prev);
// 			newFavorites.has(movieId)
// 				? newFavorites.delete(movieId)
// 				: newFavorites.add(movieId);
// 			return newFavorites;
// 		});

// 		// Update progress
// 		setWatchProgress((prev) => ({
// 			...prev,
// 			[movieId]: prev[movieId]
// 				? prev[movieId] >= 100
// 					? 0
// 					: prev[movieId] + 25
// 				: 25,
// 		}));
// 	};

// 	if (loading) return <p>Loading movies...</p>;
// 	if (error) return <p className="text-red-500">{error}</p>;

// 	return (
// 		<div className="p-6 mt-[20px]" id="movies">
// 			<h1 className="text-[20px] mb-[20px] ml-[20px] font-bold">Movies</h1>
// 			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// 				{movies.map((movie) => {
// 					const isFavorite = favorites.has(movie.id);
// 					const progress = watchProgress[movie.id] || 0;

// 					return (
// 						<div
// 							key={movie.id}
// 							className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
// 							onClick={() => navigate(`/trailer/${movie.id}`)}
// 						>
// 							<img
// 								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
// 								alt={movie.title}
// 								className="w-full h-80 object-cover rounded-md"
// 							/>
// 							<h3 className="text-lg font-semibold mt-2 text-white">
// 								{movie.title}
// 							</h3>
// 							<div className="flex justify-between mr-[20px]">
// 								<p>{movie.vote_average}</p>
// 								<button
// 									className={`bg-yellow-300 ${
// 										isFavorite ? 'text-red-500' : 'text-white'
// 									}`}
// 									onClick={(e) => {
// 										e.stopPropagation();
// 										handleFavoriteAndProgress(movie.id);
// 									}}
// 								>
// 									<FavoriteIcon />
// 									{progress > 0 && (
// 										<span className="ml-1 text-sm">{progress}%</span>
// 									)}
// 								</button>
// 							</div>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };

// export default MovieList;

////////////////////////////////////////////////////
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config.json';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MovieList = () => {
	const [favorites, setFavorites] = useState(new Set());
	const [watchProgress, setWatchProgress] = useState({});
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const API_KEY = config.API_KEY;
	const navigate = useNavigate();

	// Fetch Movies
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
				);
				setMovies(response.data.results);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, [API_KEY]);

	// Load favorites and progress from localStorage
	useEffect(() => {
		try {
			const savedFavorites =
				JSON.parse(localStorage.getItem('favorites')) || [];
			const savedProgress =
				JSON.parse(localStorage.getItem('movieProgress')) || {};

			console.log('Loaded favorites:', savedFavorites);
			console.log('Loaded progress:', savedProgress);

			setFavorites(new Set(savedFavorites));
			setWatchProgress(savedProgress);
		} catch (error) {
			console.error('Error loading localStorage data:', error);
		}
	}, []);

	// Save favorites to localStorage
	useEffect(() => {
		if (favorites.size > 0) {
			localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
		}
	}, [favorites]);

	// Save watch progress to localStorage
	useEffect(() => {
		if (Object.keys(watchProgress).length > 0) {
			localStorage.setItem('movieProgress', JSON.stringify(watchProgress));
		}
	}, [watchProgress]);

	// Handle favorite toggle and progress update
	const handleFavoriteAndProgress = (movieId) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			newFavorites.has(movieId)
				? newFavorites.delete(movieId)
				: newFavorites.add(movieId);
			return newFavorites;
		});

		setWatchProgress((prev) => ({
			...prev,
			[movieId]: prev[movieId]
				? prev[movieId] >= 100
					? 0
					: prev[movieId] + 25
				: 25,
		}));
	};

	if (loading) return <p>Loading movies...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="p-6 mt-[20px]" id="movies">
			<h1 className="text-[20px] mb-[20px] ml-[20px] font-bold">Movies</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{movies.map((movie) => {
					const isFavorite = favorites.has(movie.id);
					const progress = watchProgress[movie.id] || 0;

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
								<button
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
