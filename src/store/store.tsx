// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // ✅ Adjust path to where your slice file is!
import profileReducer from './ProfileSlice';
export const store = configureStore({
	reducer: {
		auth: userReducer, // ✅ Use the same key you use in useSelector (state.auth)
		profile: profileReducer,
	},
});

// ✅ 2) RootState & AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
