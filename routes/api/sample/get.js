'use strict';

module.exports = (req, res, db, idGenerator, shaGenerator) => {

	let query = req.query;

	db.get({

		model: 'sample',

		start: query.start,

		limit: query.limit,

		filter: query.filter,

		sort: query.sort,

		callback: (result, count, start, limit) => {

			let data = {
				code: 0,
				msg: 'success',
				count: count,
				data: result
			};

			if (start !== undefined) {

				data.start = start;
			}

			if (limit !== undefined) {

				data.limit = limit;
			}

			res.send(data);
		}
	});
};
