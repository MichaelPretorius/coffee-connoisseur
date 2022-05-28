import { getMinifiedRecords, table } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
	if (req.method == 'POST') {
		const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

		try {
			if (id) {
				const findCoffeeStoreRecords = await table.select({ filterByFormula: `id="${id}"` }).firstPage();

				if (findCoffeeStoreRecords.length != 0) {
					const records = getMinifiedRecords(findCoffeeStoreRecords);
					res.status(200).json(records);
				} else {
					if (name) {
						const createRecords = await table.create([
							{
								fields: {
									id,
									name,
									address,
									neighbourhood,
									voting,
									imgUrl,
								},
							},
						]);
						const records = getMinifiedRecords(createRecords);
						res.status(200).json(records);
					} else {
						res.status(400).json({ message: 'Name is missing' });
					}
				}
			} else {
				res.status(400).json({ message: 'Id is missing' });
			}
		} catch (error) {
			console.error('There is an error ', err);
			res.status(500).json({ message: 'Oh no! Something went wrong', error });
		}
	} else {
		res.status(400).json({ message: 'Invalid method type' });
	}
};

export default createCoffeeStore;
