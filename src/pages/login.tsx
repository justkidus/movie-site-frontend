// import { useState } from 'react';
// import { AuthContext } from '../context/authContext';
// import axios from 'axios';
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// const login = () => {
// 	const navigate = useNavigate();
// 	const [auth, setAuth] = useState({
// 		username: undefined,
// 		password: undefined,
// 	});
// 	const [error, setError] = useState('');
// 	const [success, setSuccess] = useState('');
// 	const { loading, dispatch } = useContext(AuthContext);
// 	const handleChange = (e) => {
// 		setAuth((prev) => ({ ...prev, [e.target.id]: e.target.value })); //explain this
// 	};
// 	const handleClick = async (e) => {
// 		e.preventDefault();
// 		dispatch({ type: 'LOGIN_START' });
// 		try {
// 			const res = await axios.post('http://localhost:8080/api/login', auth, {
// 				withCredentials: true,
// 			});
// 			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
// 			setSuccess('login successfull');
// 			navigate('/');
// 		} catch (error) {
// 			dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
// 			setError('An error occured');
// 		}
// 	};
// 	return (
// 		<div className="flex items-center justify-center text-black border-2 border-black w-[400px] h-[400px] ml-[400px] mt-[100px]">
// 			<div className="m-[30px]">
// 				<p className="text-red-500">{error}</p>
// 				<br />
// 				<p>{success}</p>
// 				<label>UserName :</label>
// 				<input
// 					type="text"
// 					placeholder="username"
// 					id="username"
// 					onChange={handleChange}
// 					className="border-2 border-black"
// 				/>
// 				<br />
// 				<br />
// 				<label>Password :</label>
// 				<input
// 					type="text"
// 					placeholder="password"
// 					id="password"
// 					onChange={handleChange}
// 					className="border-2 border-black"
// 				/>
// 				<br />
// 				<br />
// 				<br />
// 				<button
// 					onClick={handleClick}
// 					className="bg-blue-500 py-[10px] px-[20px] font-bold text-white ml-[100px]"
// 					disabled={loading}
// 				>
// 					Login
// 				</button>
// 				{/* {error && <span>Wrong password or username</span>} */}
// 			</div>
// 		</div>
// 	);
// };

// export default login;
//////////////////////////////////////////////////
import { useState, ChangeEvent, MouseEvent, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the type for your authentication state if not already defined.
// For example:
// interface AuthState {
//   user: any;
//   loading: boolean;
//   error: string | null;
//   dispatch: React.Dispatch<AuthAction>;
// }

const Login = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useState<{ username?: string; password?: string }>(
		{}
	);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	// Ensure your AuthContext includes dispatch.
	// If TS still complains, you can cast the context value as shown below.
	const { loading, dispatch } = useContext(AuthContext);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAuth((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });
		try {
			// const res = await axios.post('http://localhost:8080/api/login', auth, {
			const res = await axios.post(
				'https://movie-site-production-2779.up.railway.app/api/login',
				auth,
				{
					withCredentials: true,
				}
			);
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
			setSuccess('Login successful');
			navigate('/');
		} catch (err: unknown) {
			// Check for axios error first
			if (axios.isAxiosError(err)) {
				dispatch({ type: 'LOGIN_FAILURE', payload: err.response?.data });
			} else if (err instanceof Error) {
				dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
			}
			setError('An error occurred');
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
			</div>
		</div>
	);
};

export default Login;
