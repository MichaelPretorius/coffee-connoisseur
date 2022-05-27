import { useState, useContext } from 'react';

import { ACTION_TYPES, StoreContext } from '../store/store-context';

const useGeolocation = () => {
	const { dispatch } = useContext(StoreContext);
	const [locationError, setError] = useState('');
	const [isLoadingLocation, setIsLoadingLocation] = useState(false);

	const successHandler = ({ coords: { latitude, longitude } }) => {
		dispatch({ type: ACTION_TYPES.SET_LAT_LONG, payload: `${latitude},${longitude}` });
		setError('');
		setIsLoadingLocation(false);
	};

	const errorHandler = () => {
		setError('Unable to retrieve your location');
		setIsLoadingLocation(false);
	};

	const handleTrackLocation = () => {
		setIsLoadingLocation(true);
		if (!navigator.geolocation) {
			setError('Geolocation is not supported by your browser');
			setIsLoadingLocation(false);
		} else {
			navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
		}
	};

	return { locationError, handleTrackLocation, isLoadingLocation };
};

export default useGeolocation;
