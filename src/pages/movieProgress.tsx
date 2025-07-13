import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { getFav } from '../store/ProfileSlice';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';
interface Movie {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
	// add other needed fields...
}
interface FavItem {
	movieId: string; // or number, depending on your data
	// ... other properties if any
}
const MovieProgress = () => {
	const navigate = useNavigate();
	const API_KEY = import.meta.env.VITE_API_KEY; // For Vite

	const fav = useSelector(
		(state: RootState) => state.profile.profile || []
	) as FavItem[];
	const dispatch = useDispatch<AppDispatch>();
	// const [fav, setFav] = useState<number[]>([]);
	// Type movies as an array of Movie objects
	const [movies, setMovies] = useState<Movie[]>([]);
	// useEffect(() => {
	// 	const getFavouriteMovie = () => {
	// 		const storedMovies = localStorage.getItem('favorites');
	// 		if (storedMovies) {
	// 			try {
	// 				const parsedMovies = JSON.parse(storedMovies);
	// 				if (Array.isArray(parsedMovies)) {
	// 					console.log(`Favorite movie id retrieved: ${parsedMovies}`);
	// 					setFav(parsedMovies);
	// 				} else {
	// 					console.error('Data retrieved is not an array.');
	// 					setFav([]);
	// 				}
	// 			} catch (error) {
	// 				console.error('Error parsing favorites:', error);
	// 				setFav([]);
	// 			}
	// 		} else {
	// 			console.log("You don't have favorite movie");
	// 		}
	// 	};
	// 	getFavouriteMovie();
	// }, []);

	// console.log('favorite', fav);
	useEffect(() => {
		dispatch(getFav());
	}, [dispatch]);
	// console.log('fav', fav);

	useEffect(() => {
		const favmovie = async () => {
			if (fav.length === 0) return;
			const movieIds = fav.map((item) => item.movieId);
			try {
				const moviePromises = movieIds.map((id) =>
					axios.get<Movie>(
						`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
					)
				);
				const responses: AxiosResponse<Movie>[] = await Promise.all(
					moviePromises
				);
				const fetchedMovies = responses.map((res) => res.data as Movie);
				setMovies(fetchedMovies);
				// console.log('movies', movies);
			} catch (error: unknown) {
				console.error('Error fetching favorite movies:', error);
			}
		};
		favmovie();
	}, [fav, API_KEY]);

	console.log('Current movies:', movies);

	return (
		<div className="bg-black h-auto">
			<h1 className="text-[20px] ml-[20px]">Movie Progress</h1>
			<br />
			<div className="grid grid-cols-4 gap-[10px]">
				{movies.map((movie) => (
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
						<h1 className="text-white">{movie.id}</h1>
						<div className="flex justify-between mr-[20px]">
							<p className="text-white">{movie.vote_average}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MovieProgress;
