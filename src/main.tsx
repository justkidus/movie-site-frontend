import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/header.tsx';
import MovieTrailer from './component/movieTrailer.tsx';
import MovieSearch from './pages/movieSearch.tsx';
import Login from './pages/login.tsx';

import { AuthContextProvider } from './context/authContext.tsx';
import Signup from './pages/signup.tsx';
import Profile from './pages/profile.tsx';
import MovieProgress from './pages/movieProgress.tsx';
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthContextProvider>
			<Router>
				<Header />

				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/trailer/:movieId" element={<MovieTrailer />} />
					<Route path="/search" element={<MovieSearch />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/fav" element={<MovieProgress />} />
				</Routes>
			</Router>
		</AuthContextProvider>
	</StrictMode>
);
