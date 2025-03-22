// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const Signup = () => {
// 	const [auth, setAuth] = useState({
// 		username: undefined,
// 		email: undefined,
// 		password: undefined,
// 	});
// 	const [error, setError] = useState('');
// 	const [success, setSuccess] = useState('');
// 	const navigate = useNavigate();

// 	const handleChange = (e) => {
// 		setAuth({ ...auth, [e.target.name]: e.target.value });
// 	};
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setError('');
// 		setSuccess('');
// 		try {
// 			const res = await axios.post(`http://localhost:8080/api/register`, auth);
// 			setSuccess('Registration success');
// 			setAuth({ username: '', email: '', password: '' });
// 			navigate('/login');
// 		} catch (error) {
// 			// return 'an error occured';
// 			setError('An error has occured');
// 		}
// 	};

// 	return (
// 		<div className="flex justify-center items-center h-screen bg-gray-100">
// 			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
// 				<h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>

// 				{error && <p className="text-red-500 text-center">{error}</p>}
// 				{success && <p className="text-green-500 text-center">{success}</p>}
// 				<form onSubmit={handleSubmit}>
// 					<div className="mb-4">
// 						<label className="block text-gray-700">Username</label>
// 						<input
// 							type="text"
// 							name="username"
// 							value={auth.username}
// 							onChange={handleChange}
// 							className="w-full p-2 border border-gray-300 rounded"
// 							required
// 						/>
// 					</div>

// 					<div className="mb-4">
// 						<label className="block text-gray-700">Email</label>
// 						<input
// 							type="email"
// 							name="email"
// 							value={auth.email}
// 							onChange={handleChange}
// 							className="w-full p-2 border border-gray-300 rounded"
// 							required
// 						/>
// 					</div>

// 					<div className="mb-4">
// 						<label className="block text-gray-700">Password</label>
// 						<input
// 							type="password"
// 							name="password"
// 							value={auth.password}
// 							onChange={handleChange}
// 							className="w-full p-2 border border-gray-300 rounded"
// 							required
// 						/>
// 					</div>

// 					<button
// 						type="submit"
// 						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
// 					>
// 						Sign Up
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Signup;
/////////////////////////////////////////////////////////
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
	const [auth, setAuth] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAuth({ ...auth, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		try {
			// await axios.post(`http://localhost:8080/api/register`, auth);
			await axios.post(
				`https://movie-site-production-2779.up.railway.app/api/register`,
				auth
			);
			setSuccess('Registration success');
			setAuth({ username: '', email: '', password: '' });
			navigate('/login');
		} catch (error) {
			setError('An error has occurred');
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>

				{error && <p className="text-red-500 text-center">{error}</p>}
				{success && <p className="text-green-500 text-center">{success}</p>}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Username</label>
						<input
							type="text"
							name="username"
							value={auth.username}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							value={auth.email}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Password</label>
						<input
							type="password"
							name="password"
							value={auth.password}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
