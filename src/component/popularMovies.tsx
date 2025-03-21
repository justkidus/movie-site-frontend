import config from '../../config.json';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
const PopularMovies = () => {
	// const API_KEY = config.API_KEY;
	const API_KEY = '9ba860f27b8af2a4d997f80a66b063b5';
	const navigate = useNavigate();
	const { data, error, loading } = useFetch(
		// `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=2`
		`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
	);
	console.log(data);

	let movies = [];
	if (data) {
		console.log('results:', data);
		movies = data.filter((movie) => movie.popularity >= 21.0);
		console.log('Fetched Data hass:', movies);
	} else {
		console.log('no fetched data');
	}

	const truncateText = (text, length) => {
		return text.length > length ? text.slice(0, length) + '...' : text;
	};
	console.log('movies', movies);

	return (
		<>
			<div className="mt-[250px]">
				<h1 className="text-2xl font-bold pl-[50px] pb-[20px]">
					Popular Movies
				</h1>
				<div className="flex justify-center items-center">
					<div className="flex px-[20px] gap-[50px] overflow-x-auto w-[100%] whitespace-nowrap">
						{movies.map((movie) => (
							<div key={movie.id} className="flex-shrink-0 w-[200px]">
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									className="w-auto h-[40vh] "
									onClick={() => navigate(`/trailer/${movie.id}`)}
								/>
								<div
									className="relative ml-[70px] w-[100px]  flex justify-center items-center mt-[-30px] h-[6vh] transform -translate-x-1/2 -translate-y-1/2 opacity-[100%] group-hover:opacity-100 transition-opacity duration-300 bg-black"
									onClick={() => navigate(`/trailer/${movie.id}`)}
								>
									<h1 className="text-[18px] text-[red] cursor-pointer">
										Play Now{' '}
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
		</>
	);
};

export default PopularMovies;
