import { useEffect } from 'react';
import { checkAuth } from './store/userSlice';
import { useDispatch } from 'react-redux';
import LandPage from './component/landingPage';
import LatestMovies from './component/latestMovies';
import MovieList from './component/movieList';
import PopularMovies from './component/popularMovies';
import { AppDispatch } from './store/store';
const App = () => {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(checkAuth());
	}, [dispatch]);
	return (
		<>
			<div className="bg-gray-900 text-white min-h-screen">
				{/* <h1 className="text-3xl font-bold text-center p-6">Popular Movies</h1> */}
				<LandPage />
				<PopularMovies />
				<LatestMovies />
				<MovieList />
			</div>
		</>
	);
};
export default App;
