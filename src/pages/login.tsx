import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';
const Login = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const loading = useSelector((state: RootState) => state.auth.loading);
	const error = useSelector((state: RootState) => state.auth.error);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const resultAction = await dispatch(loginUser(formData));
			if (loginUser.fulfilled.match(resultAction)) {
				navigate('/');
			}
		} catch (error) {
			console.log('an error has occured');
		}
	};

	return (
		<div className="flex items-center justify-center text-black border-2 border-black w-[400px] h-[400px] ml-[400px] mt-[100px]">
			<div className="m-[30px]">
				<form onSubmit={handleSubmit}>
					{/* <p className="text-red-500">{error}</p> */}
					{error && <p className="text-red-500">{error}</p>}
					<br />
					<label>UserName :</label>
					<input
						type="text"
						placeholder="username"
						id="username"
						value={formData.username}
						onChange={(e) =>
							setFormData({ ...formData, username: e.target.value })
						}
						className="border-2 border-black"
					/>
					<br />
					<br />
					<label>Password :</label>
					<input
						type="text"
						placeholder="password"
						id="password"
						value={formData.password}
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
						className="border-2 border-black"
					/>
					<br />
					<br />
					<br />
					<button
						className="bg-blue-500 py-[10px] px-[20px] font-bold text-white ml-[100px]"
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
