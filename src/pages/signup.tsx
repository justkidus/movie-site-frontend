import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { signUp } from '../store/userSlice';
const Signup = () => {
	const nav = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});
	const loading = useSelector((state: RootState) => state.auth.loading);
	const error = useSelector((state: RootState) => state.auth.error);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const result = await dispatch(signUp(formData));
			if (signUp.fulfilled.match(result)) {
				nav('/login');
			}
		} catch (error) {
			console.log('error');
		}
	};
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-bold text-center mb-4">Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Username</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={(e) =>
								setFormData({ ...formData, username: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					disabled={loading}
					<button
						className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
						disabled={loading}
					>
						{loading ? 'Signing up...' : 'SignUp'}
					</button>
					{error ? 'problem' : ''}
				</form>
			</div>
		</div>
	);
};

export default Signup;
