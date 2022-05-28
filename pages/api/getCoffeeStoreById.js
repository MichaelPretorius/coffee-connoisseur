import { findRecordByFilter } from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
	const { id } = req.query;

	if (id) {
		try {
			const records = await findRecordByFilter(id);

			if (records.length != 0) {
				res.status(200).json(records);
			} else {
				res.status(500).json({ message: 'Id could not be found' });
			}
		} catch (error) {
			console.error('There is an error ', error);
			res.status(200).json({ message: 'Oh no! Something went wrong', error });
		}
	} else {
		res.status(400).json({ message: 'Id is missing' });
	}
};

export default getCoffeeStoreById;
