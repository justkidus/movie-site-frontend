import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
const Header = () => {
	const [clicked, setClicked] = useState('Home');
	const handleClick = (item) => {
		setClicked(item); // when handleClick clicked the function came to this function make itel==Home,when movie clicked item==movie
	};
	const [show, setShow] = useState(false);
	const handleShowMore = () => {
		setShow((prev) => !prev);
	};
	const navigate = useNavigate();
	const { link } = useParams();
	return (
		<>
			<div className="flex justify-between p-[25px] bg-black">
				<div className="text-2xl font-bold text-[red] ">
					<h1>Movie Site</h1>
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
								<ul className="text-white font-light bg-[red] p-[10px] absolute cursor-pointer">
									<li onClick={() => navigate('/login')}>Login</li>
									<li onClick={() => navigate('/profile')}>user</li>
									<li onClick={() => navigate('/signup')}>Register</li>
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
