'use strict';

let MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	cfg = require('../../config/init');

module.exports = config => {

	let model = config.model;

	assert.notEqual(undefined, model);

	MongoClient.connect(cfg.db.url, (err, db) => {

		assert.equal(null, err);

		console.log(cfg.db.msg.connect.success);

		db.listCollections({name: model}).toArray((err, collections) => {

			assert.equal(null, err);

			console.log(cfg.db.msg.get.success);

			db.close();

			config.callback && config.callback(collections.length === 1 ? true : false);
		});
	});
};
