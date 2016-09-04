'use strict';

module.exports = (req, res, db, idGenerator, shaGenerator) => {

	let data = req.body.data || {};

	db.insert({

		model: 'sample',

		data: {
			_id: idGenerator.id(),
			name: data.name || 'unknown'
		},

		callback: data => {

			res.send({
				code: 0,
				msg: 'success',
				data: data[0]
			});
		}
	});
};
