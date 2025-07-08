import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../lib/axios';

interface Profile {
	_id: String;
	name: string;
	avatar: string;
	favMovie: string[];
}

interface ProfileState {
	profile: Profile | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProfileState = {
	profile: null,
	loading: false,
	error: null,
};
export const createProfile = createAsyncThunk<
	Profile,
	{ name: string; avatar: string },
	{ rejectValue: string }
>('profile/createProfile', async ({ name, avatar }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post('/createprofile', {
			name,
			avatar,
		});
		return response.data;
	} catch (err) {
		return rejectWithValue('Failed');
	}
});
export const addToFav = createAsyncThunk<
	Profile,
	{ movieId: string },
	{ rejectValue: string }
>('profile/addFav', async ({ movieId }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post(`/addfavMovie`, {
			movieId,
		});
		return response.data;
	} catch (err) {
		return rejectWithValue('Failed');
	}
});
export const getFav = createAsyncThunk<Profile, void, { rejectValue: string }>(
	'profile/getFav',
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get(`/getFavMovie`);
			return response.data;
		} catch (err) {
			console.log('fav fetched ');
			return thunkAPI.rejectWithValue('Failed');
		}
	}
);
const ProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		changeProfile(state) {
			state.profile = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				createProfile.fulfilled,
				(state, action: PayloadAction<Profile>) => {
					state.loading = false;
					state.profile = action.payload;
				}
			)
			.addCase(createProfile.rejected, (state, action) => {
				state.loading = false;
				state.profile = null;
				state.error = action.payload || 'Unknown error';
			})
			.addCase(addToFav.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addToFav.fulfilled, (state, action: PayloadAction<Profile>) => {
				state.loading = false;
				state.profile = action.payload;
			})
			.addCase(addToFav.rejected, (state, action) => {
				state.loading = false;
				state.profile = null;
				state.error = action.payload || 'Unknown error';
			})
			.addCase(getFav.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getFav.fulfilled, (state, action: PayloadAction<Profile>) => {
				state.loading = false;
				state.profile = action.payload;
			})
			.addCase(getFav.rejected, (state, action) => {
				state.loading = false;
				state.profile = null;
				state.error = action.payload || 'Unknown error';
			});
	},
});
export const { changeProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
