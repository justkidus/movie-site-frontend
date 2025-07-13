import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
// import { logout } from '../store/userSlice';
import { Logout } from '../store/userSlice';
import { AppDispatch } from '../store/store';
const Header = () => {
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);
	const [clicked, setClicked] = useState<string>('Home');
	const [show, setShow] = useState<boolean>(false);

	const handleClick = (item: string) => {
		setClicked(item); // when handleClick clicked the function came to this function make itel==Home,when movie clicked item==movie
	};
	const handleShowMore = () => {
		setShow(!show);
	};
	const navigate = useNavigate();
	const { link } = useParams();
	const handleLogout = () => {
		dispatch(Logout());
		navigate('/login');
	};
	return (
		<>
			<div className="flex justify-between p-[25px] bg-black">
				<div className="text-2xl font-bold text-[red] cursor-pointer">
					<h1 onClick={() => navigate('/')}>Movie Site</h1>
				</div>

				<div>
					<ul className="font-[700] text-[] flex gap-[15px] pr-[30px]">
						<li
							className={`cursor-pointer ${
								clicked === 'Home' ? 'border-b-2 border-white' : ''
							}`}
							onClick={() => handleClick('Home')}
						>
							<a href="/#Home" className="text-white">
								Home
							</a>
						</li>
						<li
							className={`cursor-pointer ${
								clicked === 'Movies' ? 'border-b-2 border-white' : ''
							}`}
							onClick={() => handleClick('Movies')}
						>
							<a href="/#movies" className="text-white">
								{' '}
								Movies
							</a>
						</li>

						<li
							className={`cursor-pointer ${
								clicked === 'fav' ? 'border-b-2 border-white' : ''
							}`}
							onClick={() => handleClick('Service')}
						>
							<Link to="/fav" className="text-white">
								Favorite
							</Link>
						</li>
						<li
							className={`cursor-pointer ${
								clicked === 'search' ? 'border-b-2 border-white' : ''
							}`}
							onClick={() => handleClick('Search')}
						>
							<button
								onClick={() => navigate('/search')}
								className="text-white"
							>
								Search
							</button>
						</li>
						<li
							className={`cursor-pointer ${
								clicked === 'profile' ? 'border-b-2 border-white' : ''
							}`}
							onClick={() => handleClick('Profile')}
						>
							<h3 className="text-white">
								<button
									onClick={handleShowMore}
									// className="border-2 border-bottom"
								>
									Profile
								</button>
							</h3>
							{show && (
								<ul className="text-white font-light bg-[red] p-[10px] absolute cursor-pointer z-10">
									{!user && <li onClick={() => navigate('/login')}>Login</li>}
									{user && (
										<>
											<li onClick={() => navigate('/profile')}>
												{user.username}
											</li>
											<li onClick={handleLogout}>Logout</li>
										</>
									)}
									{!user && (
										<li onClick={() => navigate('/signup')}>Register</li>
									)}
								</ul>
							)}
						</li>
						<h3>
							<button onClick={handleShowMore} className=""></button>
						</h3>
					</ul>
				</div>
			</div>
			<p className="text-black">{link}</p>
		</>
	);
};

export default Header;
