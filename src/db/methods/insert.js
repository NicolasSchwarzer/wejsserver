'use strict';

let MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	cfg = require('../../config/init');

module.exports = config => {

	let model = config.model,
		data = config.data;

	assert.notEqual(undefined, model);

	assert.notEqual(undefined, data);

	let time = Date.now();

	if (Array.isArray(data)) {

		for (let item of data) {

			item.update_date = item.create_date = time;
		}
	}
	else {

		data.update_date = data.create_date = time;
	}

	MongoClient.connect(cfg.db.url, (err, db) => {

		assert.equal(null, err);

		console.log(cfg.db.msg.connect.success);

		db.collection(model).insert(data, (err, result) => {

			assert.equal(null, err);

			assert.equal(Array.isArray(data) ? data.length : 1, result.insertedCount);

			console.log(cfg.db.msg.insert.success);

			db.close();

			config.callback && config.callback(result.ops);
		});
	});
};
