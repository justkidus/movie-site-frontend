// import axios from 'axios';
// const fetchUserProfile = async (userId, token) => {
// 	// const userId = '67d44844557ccb2d877b41b6';

// 	try {
// 		const response = await axios.get(
// 			`http://localhost:8080/api/profiles/${userId}`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 				withCredentials: true,
// 			}
// 		);
// 		console.log('User Profile Data:', response.data);
// 		return response.data;
// 	} catch (error) {
// 		console.error(
// 			'Error fetching profile:',
// 			error.response?.data || error.message
// 		);
// 	}
// };
// export default fetchUserProfile;
////////////////////////////////////////////////////////////////
import axios from 'axios';

const fetchUserProfile = async (userId: string, token: string) => {
	try {
		const response = await axios.get(
			`http://localhost:8080/api/profiles/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			}
		);
		console.log('User Profile Data:', response.data);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error(
				'Error fetching profile:',
				error.response?.data || error.message
			);
		} else if (error instanceof Error) {
			console.error('Error fetching profile:', error.message);
		} else {
			console.error('An unknown error occurred while fetching profile.');
		}
	}
};

export default fetchUserProfile;
