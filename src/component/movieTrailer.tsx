import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useSelector, UseSelector } from 'react-redux';
import { RootState } from '../store/store';
// Define interfaces for type safety
interface Video {
	type: string;
	key: string;
}

interface Movie {
	id: number;
	original_title: string;
	overview: string;
	original_language: string;
	popularity: number;
	release_date: string;
	vote_average: number;
	vote_count: number;
	poster_path: string;
}

const MovieTrailer = () => {
	const auth = useSelector((state: RootState) => state.auth.user);
	// Explicitly type the URL parameter
	const { movieId } = useParams<{ movieId: string }>();
	const navigate = useNavigate();
	const [trailerKey, setTrailerKey] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const API_KEY = import.meta.env.VITE_API_KEY; // For Vite
	if (auth) {
		useEffect(() => {
			if (!movieId) return;
			const fetchTrailer = async () => {
				try {
					const response = await fetch(
						`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
					);
					if (!response.ok) throw new Error('Failed to fetch trailer');

					const data = await response.json();
					console.log('this the data', data);
					// Provide an explicit type for the video parameter
					const trailer: Video | undefined = data.results.find(
						(video: Video) => video.type === 'Trailer'
					);
					console.log('this is the trailer', trailer);
					if (trailer) {
						setTrailerKey(trailer.key);
					} else {
						setError('No trailer found.');
					}
				} catch (err: unknown) {
					if (err instanceof Error) {
						setError(err.message);
					} else {
						setError('An unknown error occurred.');
					}
				}
			};

			fetchTrailer();
		}, [movieId, API_KEY]);
	} else {
		return 'user have to be authniticated';
	}
	/////////////////////////////////////////////
	const { data } = useFetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
	);
	// Explicitly type movies as an array of Movie objects
	let movies: Movie[] = [];
	if (data && Array.isArray(data)) {
		console.log('results:', data);
		movies = data;
		console.log('Fetched Data hass:', movies);
	} else {
		console.log('no fetched data');
	}
	// Compare movie id as strings for consistency
	const movie = movies.find((m) => m.id.toString() === movieId);

	return (
		<div>
			<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
				{error ? (
					<p className="text-red-500">{error}</p>
				) : trailerKey ? (
					<iframe
						width="80%"
						height="400"
						src={`https://www.youtube.com/embed/${trailerKey}`}
						title="Movie Trailer"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				) : (
					<p>Loading trailer...</p>
				)}
				<button
					onClick={() => navigate(-1)}
					className="mb-4 px-4 py-2 bg-red-500 rounded-lg"
				>
					🔙 Back
				</button>
			</div>
			<div className="text-white bg-black p-[20px] leading-[30px]">
				{movie ? (
					<div>
						<h2>
							Movie Title:{' '}
							<span className="text-red-600 font-bold">
								{movie.original_title}
							</span>
						</h2>
						<p>
							Movie Description:{' '}
							<span className="text-red-600 font-bold">{movie.overview}</span>
						</p>
						<p>
							Movie Language:{' '}
							<span className="text-red-600 font-bold">
								{movie.original_language}
							</span>
						</p>
						<p>
							Movie Vote Count:{' '}
							<span className="text-red-600 font-bold">{movie.popularity}</span>
						</p>
						<p>
							Released Date:{' '}
							<span className="text-red-600 font-bold">
								{movie.release_date}
							</span>
						</p>
						<p>
							Movie Rating:{' '}
							<span className="text-red-600 font-bold">
								{movie.vote_average}
							</span>
						</p>
						<p>
							Vote Count:{' '}
							<span className="text-red-600">{movie.vote_count}</span>
						</p>
					</div>
				) : (
					'no description'
				)}
			</div>
		</div>
	);
};

export default MovieTrailer;
