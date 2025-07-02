import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ 1. Define a Movie type matching TMDB response
interface Movie {
	id: number;
	title: string;
	overview: string;
	backdrop_path: string | null;
	vote_average: number;
}

const LandPage = () => {
	const API_KEY = import.meta.env.VITE_API_KEY;
	const navigate = useNavigate();

	const [movies, setMovies] = useState<Movie[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [err, setError] = useState<string | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	// ✅ 2. Fetch movies with type safety
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
				setMovies(data.results);
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
		fetchMovies();
	}, [API_KEY]);

	// ✅ 3. Auto-change movie every 10s when movies are loaded
	useEffect(() => {
		if (!movies.length) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % movies.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [movies]);

	if (loading) return <div>Loading...</div>;
	if (err) return <div>Error: {err}</div>;
	if (!movies.length) return <div>No movies found.</div>;

	const currentMovie = movies[currentIndex];

	return (
		<div className="relative w-full h-screen flex justify-center items-center bg-black text-white">
			{/* ✅ Backdrop image */}
			{currentMovie.backdrop_path && (
				<img
					src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
					alt={currentMovie.title}
					className="absolute inset-0 w-full h-full object-cover"
				/>
			)}

			{/* ✅ Dark overlay for readability */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

			{/* ✅ Content */}
			<div className="relative z-10 max-w-3xl px-8 py-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					{currentMovie.title}
				</h2>
				<p className="mb-4">{currentMovie.overview}</p>
				<p className="mb-6">
					Rating:
					<span className="font-bold ml-2">
						{currentMovie.vote_average.toFixed(1)}
					</span>
				</p>
				<button
					onClick={() => navigate(`/trailer/${currentMovie.id}`)}
					className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded hover:bg-red-700"
				>
					Play Now
				</button>
			</div>
		</div>
	);
};

export default LandPage;
