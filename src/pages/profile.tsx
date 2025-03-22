// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// const ProfilePage = () => {
// 	const [profiles, setProfiles] = useState([]);
// 	const [newProfile, setNewProfile] = useState({ name: '', avatar: '' });
// 	const [progressData, setProgressData] = useState({
// 		profileId: '',
// 		movieId: '',
// 		progress: '',
// 	});
// 	const [error, setError] = useState('');
// 	const [success, setSuccess] = useState('');
// 	const [reload, setReload] = useState(true);
// 	useEffect(() => {
// 		const loadData = async () => {
// 			try {
// 				// Try cookies first, fallback to localStorage
// 				const token =
// 					Cookies.get('access_token') || localStorage.getItem('access_token');
// 				// console.log(token);
// 				if (!token) throw new Error('No token found, please log in again.');

// 				// Safely decode
// 				const decodedToken = jwtDecode(token);
// 				// console.log(decodedToken);

// 				if (!decodedToken?._id) throw new Error('Invalid token structure');
// 				const userId = decodedToken._id;
// 				const response = await axios.get(
// 					`http://localhost:8080/api/user/getprofiles/${userId}`,
// 					{
// 						headers: { Authorization: `Bearer ${token}` },
// 						withCredentials: true,
// 					}
// 				);

// 				setProfiles(response.data);
// 			} catch (error) {
// 				setError(error.message);
// 			}
// 		};
// 		loadData();
// 	}, [reload]);

// 	const handleCreateProfile = async (e) => {
// 		e.preventDefault();

// 		const token = Cookies.get('access_token');
// 		if (!token) return setError('Token not found');
// 		console.log(token);
// 		const decodedToken = jwtDecode(token); // Decode token to get user info (e.g., _id)
// 		const userId = decodedToken._id;

// 		try {
// 			await axios.post(
// 				`http://localhost:8080/api/createprofile/${userId}`,
// 				{
// 					...newProfile,
// 				},
// 				{
// 					headers: { Authorization: `Bearer ${token}` },
// 					withCredentials: true,
// 				}
// 			);

// 			const profilesRes = await axios.get(
// 				`http://localhost:8080/api/getaprofile/${userId}`,
// 				{ withCredentials: true }
// 			);
// 			// console.log(profilesRes);
// 			setProfiles(profilesRes.data);
// 			// Store profiles in state
// 			setSuccess('Profile created successfully!');
// 			setNewProfile({ name: '', avatar: '' });
// 			setError('');
// 			console.log('profile', profiles);
// 			window.location.reload();
// 		} catch (err) {
// 			setError(err.response?.data?.error || 'Failed to create profile');
// 			setSuccess('');
// 		}
// 	};

// 	const handleSaveProgress = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await axios.post(
// 				'http://localhost:8080/api/watch-progress',
// 				progressData,
// 				{ withCredentials: true }
// 			);

// 			setSuccess('Progress saved successfully!');
// 			setProgressData({ profileId: '', movieId: '', progress: '' });
// 			setError('');
// 		} catch (err) {
// 			setError(err.response?.data?.error || 'Failed to save progress');
// 			setSuccess('');
// 		}
// 	};
// 	const navigate = useNavigate();
// 	// console.log(profiles);
// 	return (
// 		<div className="flex w-[100%] p-[25px]">
// 			<div className="max-w-4xl mx-auto p-6 w-[60%]" id="profile">
// 				<h2 className="text-2xl font-bold mb-4">Your Profiles</h2>
// 				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 					{profiles.length > 0 ? (
// 						profiles.map((profile) => (
// 							<div onClick={() => navigate(`/watch-progress/${profile._id}`)}>
// 								<h1>{profile._id}</h1>
// 								<h1>{profile.name}</h1>
// 								<img
// 									src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`}
// 									alt="avatar img"
// 								/>
// 							</div>
// 						))
// 					) : (
// 						<h1>No Profiles</h1>
// 					)}
// 				</div>
// 			</div>
// 			<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
// 				<h2 className="text-2xl font-bold mb-4">Create Profile</h2>

// 				{error && <p className="text-red-500">{error}</p>}
// 				{success && <p className="text-green-500">{success}</p>}

// 				<form onSubmit={handleCreateProfile} className="space-y-4">
// 					<input
// 						type="text"
// 						placeholder="Name"
// 						value={newProfile.name}
// 						onChange={(e) =>
// 							setNewProfile({ ...newProfile, name: e.target.value })
// 						}
// 						className="w-full p-2 border rounded"
// 						required
// 					/>
// 					<input
// 						type="text"
// 						placeholder="Avatar URL (optional)"
// 						value={newProfile.avatar}
// 						onChange={(e) =>
// 							setNewProfile({ ...newProfile, avatar: e.target.value })
// 						}
// 						className="w-full p-2 border rounded"
// 					/>
// 					<button
// 						type="submit"
// 						className="w-full bg-blue-500 text-white p-2 rounded"
// 					>
// 						Create Profile
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ProfilePage;
///////////////////////////////////
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface DecodedToken extends JwtPayload {
	_id: string;
}

interface Profile {
	_id: string;
	name: string;
	avatar?: string;
}

const ProfilePage = () => {
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [newProfile, setNewProfile] = useState({ name: '', avatar: '' });
	// const [progressData, setProgressData] = useState({
	// 	profileId: '',
	// 	movieId: '',
	// 	progress: '',
	// });
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [reload, setReload] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const token = Cookies.get('access_token');
				if (!token) throw new Error('No token found, please log in again.');

				const decodedToken = jwtDecode<DecodedToken>(token);
				if (!decodedToken?._id) throw new Error('Invalid token structure');

				const userId = decodedToken._id;
				const response = await axios.get(
					`http://localhost:8080/api/user/getprofiles/${userId}`,
					{
						headers: { Authorization: `Bearer ${token}` },
						withCredentials: true,
					}
				);

				setProfiles(response.data);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : 'An unknown error occurred'
				);
			}
		};

		loadData();
	}, [reload]);

	const handleCreateProfile = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const token = Cookies.get('access_token');
			if (!token) throw new Error('Token not found');

			const decodedToken = jwtDecode<DecodedToken>(token);
			const userId = decodedToken._id;

			await axios.post(
				`http://localhost:8080/api/createprofile/${userId}`,
				newProfile,
				{ headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
			);

			setReload((prev) => !prev);
			setSuccess('Profile created successfully!');
			setError('');
		} catch (err: any) {
			setError(err.response?.data?.error || 'Failed to create profile');
			setSuccess('');
		}
	};

	const navigate = useNavigate();

	return (
		<div className="flex w-full p-6">
			<div className="max-w-4xl mx-auto p-6 w-3/5">
				<h2 className="text-2xl font-bold mb-4">Your Profiles</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{profiles.length > 0 ? (
						profiles.map((profile) => (
							<div
								key={profile._id}
								onClick={() => navigate(`/watch-progress/${profile._id}`)}
							>
								<h1>{profile._id}</h1>
								<h1>{profile.name}</h1>
								<img
									src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`}
									alt="avatar"
								/>
							</div>
						))
					) : (
						<h1>No Profiles</h1>
					)}
				</div>
			</div>

			<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-4">Create Profile</h2>

				{error && <p className="text-red-500">{error}</p>}
				{success && <p className="text-green-500">{success}</p>}

				<form onSubmit={handleCreateProfile} className="space-y-4">
					<input
						type="text"
						placeholder="Name"
						value={newProfile.name}
						onChange={(e) =>
							setNewProfile({ ...newProfile, name: e.target.value })
						}
						className="w-full p-2 border rounded"
						required
					/>
					<input
						type="text"
						placeholder="Avatar URL (optional)"
						value={newProfile.avatar}
						onChange={(e) =>
							setNewProfile({ ...newProfile, avatar: e.target.value })
						}
						className="w-full p-2 border rounded"
					/>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded"
					>
						Create Profile
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
