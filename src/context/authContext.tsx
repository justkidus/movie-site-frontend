// import { createContext, useReducer, useEffect } from 'react';

// const INITIAL_STATE = {
// 	user: JSON.parse(localStorage.getItem('user')) || null,
// 	loading: false,
// 	error: null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

// const AuthReducer = (state, action) => {
// 	switch (action.type) {
// 		case 'LOGIN_START':
// 			return {
// 				user: null,
// 				loading: true,
// 				error: null,
// 			};
// 		case 'LOGIN_SUCCESS':
// 			return {
// 				user: action.payload,
// 				loading: false,
// 				error: null,
// 			};
// 		case 'LOGIN_FAILURE':
// 			return {
// 				user: null,
// 				loading: false,
// 				error: action.payload,
// 			};
// 		case 'LOGOUT':
// 			return {
// 				user: null,
// 				loading: false,
// 				error: null,
// 			};
// 		default:
// 			return state;
// 	}
// };

// export const AuthContextProvider = ({ children }) => {
// 	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

// 	useEffect(() => {
// 		localStorage.setItem('user', JSON.stringify(state.user));
// 	}, [state.user]);
// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				user: state.user,
// 				loading: state.loading,
// 				error: state.error,
// 				dispatch,
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };
////////////////////////////////
import { createContext, useReducer, useEffect, ReactNode } from 'react';

// Define the shape of our authentication state.
interface AuthState {
	user: any; // Replace 'any' with a proper user type if available.
	loading: boolean;
	error: string | null;
}

// Define action types for our reducer.
type AuthAction =
	| { type: 'LOGIN_START' }
	| { type: 'LOGIN_SUCCESS'; payload: any }
	| { type: 'LOGIN_FAILURE'; payload: string }
	| { type: 'LOGOUT' };

// Define the type of our context value.
interface AuthContextType extends AuthState {
	dispatch: React.Dispatch<AuthAction>;
}

// Safely parse the user from localStorage.
const storedUser = localStorage.getItem('user');
const INITIAL_STATE: AuthState = {
	user: storedUser ? JSON.parse(storedUser) : null,
	loading: false,
	error: null,
};

// Create the AuthContext with a default value.
export const AuthContext = createContext<AuthContextType>({
	...INITIAL_STATE,
	dispatch: () => null,
});

// The reducer function to manage auth state.
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGIN_START':
			return { user: null, loading: true, error: null };
		case 'LOGIN_SUCCESS':
			return { user: action.payload, loading: false, error: null };
		case 'LOGIN_FAILURE':
			return { user: null, loading: false, error: action.payload };
		case 'LOGOUT':
			return { user: null, loading: false, error: null };
		default:
			return state;
	}
};

// Type the provider's props.
interface AuthContextProviderProps {
	children: ReactNode;
}

// The context provider component.
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
