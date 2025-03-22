import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const MovieProgress = () => {
	const navigate = useNavigate();
	const API_KEY = import.meta.env.VITE_API_KEY; // For Vite
	const [fav, setFav] = useState([]);
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getFavouriteMovie = () => {
			const storedMovies = localStorage.getItem('favorites');
			if (storedMovies) {
				try {
					const parsedMovies = JSON.parse(storedMovies);
					if (Array.isArray(parsedMovies)) {
						console.log(`Favorite movie id retrieved : ${parsedMovies}`);
						setFav(parsedMovies);
					} else {
						console.error('Data retrived is not an array.');
						setFav([]);
					}
				} catch (error) {
					throw error;
				}
			} else {
				console.log("you don't have favorite movie");
				return null;
			}
		};
		getFavouriteMovie();
	}, []);
	console.log('favorite', fav);

	useEffect(() => {
		const favmovie = async () => {
			if (fav.length === 0) return;
			try {
				const movie = fav.map((id) =>
					axios.get(
						`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
					)
				);
				const response = await Promise.all(movie);
				setMovies(response.map((res) => res.data));
			} catch (error) {
				throw error;
			}
		};
		favmovie();
	}, [fav, API_KEY]);
	console.log('Current movies:', movies);

	return (
		<div className="bg-black h-auto">
			<h1>movieProgress</h1>
			<div className="grid grid-cols-4 gap-[10px]">
				{movies.map((movie, index) => {
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
							<h1 className="text-white">{movie.id}</h1>
							<div className="flex justify-between mr-[20px]">
								<p className="text-white">{movie.vote_average}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MovieProgress;
