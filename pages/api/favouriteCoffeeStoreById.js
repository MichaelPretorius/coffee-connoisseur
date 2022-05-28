import { findRecordByFilter, getMinifiedRecords, table } from '../../lib/airtable';

const favouriteCoffeeStoreById = async (req, res) => {
	if (req.method == 'PUT') {
		const { id } = req.body;

		try {
			if (id) {
				const records = await findRecordByFilter(id);

				if (records.length != 0) {
					const record = records[0];
					const voting = parseInt(record.voting) + 1;
					const updateRecords = await table.update([
						{
							id: record.recordId,
							fields: {
								voting,
							},
						},
					]);
					if (updateRecords) {
						const updateRecordsClean = getMinifiedRecords(updateRecords);
						res.status(200).json(updateRecordsClean);
					} else {
						res.status(400).json({ message: 'Oh no! Something went wrong' });
					}
				} else {
					res.status(400).json({ message: 'Id could not be found', id });
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

export default favouriteCoffeeStoreById;
