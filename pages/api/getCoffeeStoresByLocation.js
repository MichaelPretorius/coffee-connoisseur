import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
	try {
		const { latLong, limit } = req.query;
		const response = await fetchCoffeeStores(latLong, limit);
		res.status(200).json(response);
	} catch (error) {
		console.error('There isw an error ', err);
		res.status(200).json({ message: 'Oh no! Something went wrong', error });
	}
};

export default getCoffeeStoresByLocation;
