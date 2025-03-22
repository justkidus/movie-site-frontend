// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
// const MovieTrailer = () => {
// 	const { movieId } = useParams(); // 👈 Get movie ID from URL
// 	const navigate = useNavigate();
// 	const [trailerKey, setTrailerKey] = useState(null);
// 	const [error, setError] = useState(null);
// 	const API_KEY = import.meta.env.VITE_API_KEY; // For Vite

// 	useEffect(() => {
// 		if (!movieId) return;

// 		const fetchTrailer = async () => {
// 			try {
// 				const response = await fetch(
// 					// `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
// 					`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
// 				);
// 				if (!response.ok) throw new Error('Failed to fetch trailer');

// 				const data = await response.json();
// 				console.log('this the data', data);
// 				const trailer = data.results.find((video) => video.type === 'Trailer');
// 				console.log('this is the trailer', trailer);
// 				if (trailer) {
// 					setTrailerKey(trailer.key);
// 				} else {
// 					setError('No trailer found.');
// 				}
// 			} catch (err) {
// 				setError(err.message);
// 			}
// 		};

// 		fetchTrailer();
// 	}, [movieId]);
// 	/////////////////////////////////////////////
// 	const { data } = useFetch(
// 		`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
// 	);
// 	let movies = [];
// 	if (data && Array.isArray(data)) {
// 		console.log('results:', data);
// 		movies = data;
// 		console.log('Fetched Data hass:', movies);
// 	} else {
// 		console.log('no fetched data');
// 	}
// 	const movie = movies.find((m) => m.id == movieId);
// 	// console.log('movie', movie.overview);
// 	return (
// 		<div>
// 			<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
// 				{error ? (
// 					<p className="text-red-500">{error}</p>
// 				) : trailerKey ? (
// 					<iframe
// 						width="80%"
// 						height="400"
// 						src={`https://www.youtube.com/embed/${trailerKey}`}
// 						title="Movie Trailer"
// 						frameBorder="0"
// 						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// 						allowFullScreen
// 					></iframe>
// 				) : (
// 					<p>Loading trailer...</p>
// 				)}
// 				<button
// 					onClick={() => navigate(-1)}
// 					className="mb-4 px-4 py-2 bg-red-500 rounded-lg"
// 				>
// 					🔙 Back
// 				</button>
// 			</div>
// 			<div className="text-white bg-black p-[20px] leading-[30px]">
// 				{movie ? (
// 					<div>
// 						<h2>
// 							Movie Title:{' '}
// 							<span className="text-red-600 font-bold">
// 								{movie.original_title}
// 							</span>
// 						</h2>
// 						<p>
// 							Movie Description:{' '}
// 							<span className="text-red-600 font-bold">{movie.overview}</span>
// 						</p>
// 						<p>
// 							Movie Lanuage:{' '}
// 							<span className="text-red-600 font-bold">
// 								{movie.original_language}
// 							</span>
// 						</p>
// 						<p>
// 							Movie Vote Count:{' '}
// 							<span className="text-red-600 font-bold">{movie.popularity}</span>
// 						</p>
// 						<p>
// 							{' '}
// 							Realeased Date:{' '}
// 							<span className="text-red-600 font-bold">
// 								{movie.release_date}
// 							</span>
// 						</p>
// 						<p>
// 							Movie Rating:{' '}
// 							<span className="text-red-600 font-bold">
// 								{movie.vote_average}
// 							</span>
// 						</p>
// 						<p>
// 							Vote Count:{' '}
// 							<span className="text-red-600">{movie.vote_count}</span>
// 						</p>
// 					</div>
// 				) : (
// 					'no description'
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default MovieTrailer;

// //////////////////////////////////////
// // i want to uncover the mask i am currently wearing the roles i am playing and the illusions i am believing please guide me through this process by asking me 10 reflective questions one at a time to help me recognize the stories i am telling my self after i answer the 10th question please step into the role of my higher self and analyze my responses identify the top negative pattern present in my life and the top positive patterns i can embrace and grow be direct and truthful tough love is welcome provide me daily affirmations to support my growth actionable steps to change my behaviours and embody my authentic self and message of encouragement from my higher self to celebrate how far i 've come on my journey

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

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
	// Explicitly type the URL parameter
	const { movieId } = useParams<{ movieId: string }>();
	const navigate = useNavigate();
	const [trailerKey, setTrailerKey] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const API_KEY = import.meta.env.VITE_API_KEY; // For Vite

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
