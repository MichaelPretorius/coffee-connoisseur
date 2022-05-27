import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getCoffeeStorePhotos = async (limit = 11) => {
	const unsplashRes = await unsplashApi.search.getPhotos({
		query: 'coffee stores',
		perPage: limit,
	});
	const photos = unsplashRes.response.results.map(res => res.urls.small);
	return photos;
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
	return `https://api.foursquare.com/v3/places/nearby?query=${query}&ll=${latLong}&limit=${limit}&v=20220505`;
};

export const fetchCoffeeStores = async (latLong = '43.65267326999575,-79.39545615725015', limit = 11) => {
	const photos = await getCoffeeStorePhotos(limit);

	const options = {
		method: 'GET',
		headers: { Accept: 'application/json', Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_ACCESS_TOKEN },
	};
	const res = await fetch(getUrlForCoffeeStores(latLong, 'coffee stores', limit), options);
	const stores = await res.json();

	return (
		stores?.results?.map(({ fsq_id, name, location }, index) => {
			const neighbourhood = location?.neighborhood;

			return {
				id: fsq_id,
				name,
				address: location.address,
				neighbourhood: (neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) || location.cross_street || '',
				imgUrl: photos[index],
			};
		}) ?? []
	);
};
