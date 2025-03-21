import { useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const login = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useState({
		username: undefined,
		password: undefined,
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const { loading, dispatch } = useContext(AuthContext);
	const handleChange = (e) => {
		setAuth((prev) => ({ ...prev, [e.target.id]: e.target.value })); //explain this
	};
	const handleClick = async (e) => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });
		try {
			const res = await axios.post('http://localhost:8080/api/login', auth, {
				withCredentials: true,
			});
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
			setSuccess('login successfull');
			navigate('/');
		} catch (error) {
			dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
			setError('An error occured');
		}
	};
	return (
		<div className="flex items-center justify-center text-black border-2 border-black w-[400px] h-[400px] ml-[400px] mt-[100px]">
			<div className="m-[30px]">
				<p className="text-red-500">{error}</p>
				<br />
				<p>{success}</p>
				<label>UserName :</label>
				<input
					type="text"
					placeholder="username"
					id="username"
					onChange={handleChange}
					className="border-2 border-black"
				/>
				<br />
				<br />
				<label>Password :</label>
				<input
					type="text"
					placeholder="password"
					id="password"
					onChange={handleChange}
					className="border-2 border-black"
				/>
				<br />
				<br />
				<br />
				<button
					onClick={handleClick}
					className="bg-blue-500 py-[10px] px-[20px] font-bold text-white ml-[100px]"
					disabled={loading}
				>
					Login
				</button>
				{/* {error && <span>Wrong password or username</span>} */}
			</div>
		</div>
	);
};

export default login;
