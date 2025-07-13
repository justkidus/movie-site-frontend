import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// Define a Movie interface for type safety
interface Movie {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
	popularity: number;
}

const PopularMovies = () => {
	const API_KEY = import.meta.env.VITE_API_KEY; // For Vite
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	// If you don't need error and loading, remove them from destructuring:
	const { data } = useFetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
	);

	// Type the movies array as Movie[]
	let movies: Movie[] = [];
	// Assuming data is an array of movies; if not, adjust the type accordingly
	if (data && Array.isArray(data)) {
		console.log('results:', data);
		// Cast data as Movie[] to allow property access
		movies = (data as Movie[]).filter(
			(movie: Movie) => movie.popularity >= 21.0
		);
		console.log('Fetched Data has:', movies);
	} else {
		console.log('no fetched data');
	}
	const groupedMovies: Movie[][] = [];
	for (let i = 0; i < movies.length; i += 5) {
		groupedMovies.push(movies.slice(i, i + 5));
	}
	useEffect(() => {
		if (!groupedMovies.length) return;
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % groupedMovies.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [groupedMovies.length]);
	// Provide explicit types for parameters in truncateText
	const truncateText = (text: string, length: number): string => {
		return text.length > length ? text.slice(0, length) + '...' : text;
	};

	const currentGroup = groupedMovies[currentIndex] || [];
	// console.log('current movie', currentGroup);
	// console.log(currentIndex);
	return (
		<div className="mt-[30px]">
			<h1 className="text-2xl font-bold pl-[50px] pb-[20px]">Popular Movies</h1>
			<div className="flex justify-center items-center">
				<div className="flex px-[20px] gap-[50px] overflow-hidden w-[100%] whitespace-nowrap">
					{currentGroup.map((movie: Movie) => (
						<div key={movie.id} className="flex-shrink-0 w-[200px]">
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								className="w-auto h-[40vh]"
								onClick={() => navigate(`/trailer/${movie.id}`)}
							/>
							<div
								className="relative ml-[70px] w-[100px] flex justify-center items-center mt-[-30px] h-[6vh] transform -translate-x-1/2 -translate-y-1/2 opacity-[100%] group-hover:opacity-100 transition-opacity duration-300 bg-black"
								onClick={() => navigate(`/trailer/${movie.id}`)}
							>
								<h1 className="text-[18px] text-[red] cursor-pointer">
									Play Now
								</h1>
							</div>
							<p className="font-semibold mt-2 text-white">
								{truncateText(movie.title, 20)}
							</p>
							<p>{movie.vote_average}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PopularMovies;
