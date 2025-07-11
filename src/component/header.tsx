import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/userSlice';

const Header = () => {
	const dispatch = useDispatch();
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
		dispatch(logout());
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
							className={
								clicked === 'Home' ? 'rounded border-2 border-[red]' : ''
							}
							onClick={() => handleClick('Home')}
						>
							<a href="/#Home" className="text-white">
								Home
							</a>
						</li>
						<li
							className={
								clicked === 'Movies' ? 'rounded border-2 border-[red]' : ''
							}
							onClick={() => handleClick('Movies')}
						>
							<a href="/#movies" className="text-white">
								{' '}
								Movies
							</a>
						</li>

						<li
							className={
								clicked === 'Service' ? 'rounded border-2 border-[red]' : ''
							}
							onClick={() => handleClick('Service')}
						>
							<Link to="/fav" className="text-white">
								Favorite
							</Link>
						</li>
						<li
							className={
								clicked === 'Search' ? 'rounded border-2 border-[red]' : ''
							}
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
							className={
								clicked === 'Profile' ? 'rounded border-2 border-[red]' : ''
							}
							onClick={() => handleClick('Profile')}
						>
							<h3 className="text-white">
								<button onClick={handleShowMore}>Profile</button>
							</h3>
							{show && (
								<ul className="text-white font-light bg-[red] p-[10px] relative cursor-pointer">
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
					</ul>
				</div>
			</div>
			<p className="text-black">{link}</p>
		</>
	);
};

export default Header;
