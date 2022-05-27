import { createContext, useReducer } from 'react';

export const StoreContext = createContext();

export const ACTION_TYPES = {
	SET_LAT_LONG: 'SET_LAT_LONG',
	SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};

const INITIAL_STATE = {
	coffeeStores: [],
	latLong: '',
};

const storeReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_LAT_LONG: {
			return { ...state, latLong: action.payload };
		}
		case ACTION_TYPES.SET_COFFEE_STORES: {
			return { ...state, coffeeStores: action.payload };
		}
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);
	return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
