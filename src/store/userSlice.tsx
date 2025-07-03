import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../lib/axios';
interface User {
	username: string;
	favorites: string[];
}

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

export const checkAuth = createAsyncThunk<User, void, { rejectValue: string }>(
	'auth/checkAuth',
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get('/user/checkAuth');
			return response.data;
		} catch (error) {
			console.log('user is not autheniticated');
			return thunkAPI.rejectWithValue('user is not authenicated');
		}
	}
);
//  🔥 Async thunk for login
// createAsyncThunk use to fetchData
export const loginUser = createAsyncThunk<
	User, //✅ What the thunk returns on success (User)
	{ username: string; password: string }, // ✅ What the thunk accepts as input
	{ rejectValue: string } // ✅ If it fails, what type is the error message
>(
	'auth/loginUser', // ✅ Unique action type prefix for this thunk
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('/login', {
				username,
				password,
			});
			return response.data;
		} catch (err) {
			return rejectWithValue('Login failed. Check your credentials');
		}
	}
);
const userSlice = createSlice({
	name: 'auth', //name is the prefix for the action type (e.g., auth/logout).
	initialState,
	reducers: {
		logout(state) {
			state.user = null;
			state.error = null;
		},
		addFavourite(state, action: PayloadAction<string>) {
			if (state.user) {
				state.user.favorites.push(action.payload);
			}
		},

		removeFavorite(state, action: PayloadAction<string>) {
			if (state.user) {
				state.user.favorites = state.user.favorites.filter(
					(id) => id !== action.payload
				);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.error = action.payload || 'Unknown error';
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? 'Unknown error';
			});
	},
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
