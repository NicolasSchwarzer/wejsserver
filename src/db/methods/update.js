'use strict';

let MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	cfg = require('../../config/init');

module.exports = config => {

	let model = config.model,
		data = config.data,
		filter = config.filter || {};

	assert.notEqual(undefined, model);

	assert.notEqual(undefined, data);

	data.update_date = Date.now();

	MongoClient.connect(cfg.db.url, (err, db) => {

		assert.equal(null, err);

		console.log(cfg.db.msg.connect.success);

		let collection = db.collection(model);

		collection.update(filter, {$set: data},
		{
			upsert: config.upsert === true ? true : false,
			multi: config.multi === true ? true : false
		},
		(err, result) => {

			assert.equal(null, err);

			console.log(cfg.db.msg.update.success);

			collection.find(filter).toArray((err, docs) => {

				assert.equal(null, err);

				console.log(cfg.db.msg.get.success);

				db.close();

				config.callback && config.callback(docs);
			});
		});
	});
};
