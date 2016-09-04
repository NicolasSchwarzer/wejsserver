'use strict';

module.exports = (req, res, db, idGenerator, shaGenerator) => {

	let id = req.params.id,
		data = req.body.data || {};

	db.update({

		model: 'sample',

		filter: {
			_id: id
		},

		data: {
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
