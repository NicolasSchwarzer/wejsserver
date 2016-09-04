'use strict';

module.exports = (req, res, db, idGenerator, shaGenerator) => {

	let id = req.params.id;

	db.delete({

		model: 'sample',

		filter: {
			_id: id
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
