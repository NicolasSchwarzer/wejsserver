'use strict';

let MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	cfg = require('../../config/init');

module.exports = config => {

	let model = config.model,
		filter = config.filter || {};

	assert.notEqual(undefined, model);

	MongoClient.connect(cfg.db.url, (err, db) => {

		assert.equal(null, err);

		console.log(cfg.db.msg.connect.success);

		let collection = db.collection(model);

		if (Object.keys(filter).length) {

			collection.find(filter).toArray((err, docs) => {

				assert.equal(null, err);

				console.log(cfg.db.msg.get.success);

				collection.remove(filter, (err, result) => {

					assert.equal(null, err);

					console.log(cfg.db.msg.delete.success);

					db.close();

					config.callback && config.callback(docs);
				});
			});
		}
		else {

			collection.drop((err, result) => {

				assert.equal(null, err);

				console.log(cfg.db.msg.delete.success);

				db.close();

				config.callback && config.callback([]);
			});
		}
	});
};
