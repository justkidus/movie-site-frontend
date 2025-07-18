import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define a Movie interface to describe the shape of each movie object
interface Movie {
	release_date: string;
	poster_path: string;
	title: string;
	id: number;
	vote_average: number;
}

const LatestMovies = () => {
	// Type your state with Movie[]
	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	// Define error as string or null
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const API_KEY = import.meta.env.VITE_API_KEY; // Ensure your .env variable is prefixed with VITE_
	const [currentIndex, setCurrentIndex] = useState<number>(0);
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
				// TypeScript now understands that data.results is an array of Movie
				setMovies(data.results);
			} catch (err: unknown) {
				// Ensure err is an instance of Error to safely access .message
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

	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	let latestMovies = movies.filter((movie) => {
		const movieReleaseDate = new Date(movie.release_date);
		return movieReleaseDate >= thirtyDaysAgo;
	});

	// Add explicit types for the parameters
	const truncateText = (text: string, length: number): string => {
		return text.length > length ? text.slice(0, length) + '...' : text;
	};

	const groupedMovies: Movie[][] = [];
	for (let i = 0; i < latestMovies.length; i += 5) {
		groupedMovies.push(latestMovies.slice(i, i + 5));
	}
	useEffect(() => {
		if (!groupedMovies.length) return;
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % groupedMovies.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [groupedMovies.length]);

	const currentGroup = groupedMovies[currentIndex] || [];
	if (loading) return <p>Loading Movies....</p>;
	if (error) return <p className="text-red-500">{error}</p>;
	return (
		<div className="mt-[20px]">
			<h1 className="text-2xl font-bold pl-[50px] pb-[20px]">Latest Movies</h1>
			<div className="flex justify-center items-center">
				<div className="flex px-[20px] gap-[50px] w-[100%] whitespace-nowrap overflow-hidden transition-all duration-500">
					{currentGroup.map((movie) => (
						<div key={movie.id} className="flex-shrink-0 w-[200px]">
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
	);
};

export default LatestMovies;
