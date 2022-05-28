import { findRecordByFilter, getMinifiedRecords, table } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
	if (req.method == 'POST') {
		const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

		try {
			if (id) {
				const records = await findRecordByFilter(id);

				if (records.length != 0) {
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
						const createRecordsClean = getMinifiedRecords(createRecords);
						res.status(200).json(createRecordsClean);
					} else {
						res.status(400).json({ message: 'Name is missing' });
					}
				}
			} else {
				res.status(400).json({ message: 'Id is missing' });
			}
		} catch (error) {
			console.error('There is an error ', error);
			res.status(500).json({ message: 'Oh no! Something went wrong', error });
		}
	} else {
		res.status(400).json({ message: 'Invalid method type' });
	}
};

export default createCoffeeStore;
