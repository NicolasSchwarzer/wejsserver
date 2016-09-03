'use strict';

let MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	cfg = require('../../config/init');

module.exports = config => {

	let model = config.model,
		start = Number(config.start),
		limit = Number(config.limit),
		filter = config.filter,
		sort = config.sort;

	assert.notEqual(undefined, model);

	if (filter) {

		filter = JSON.parse(decodeURIComponent(filter));
	}

	if (sort) {

		sort = JSON.parse(decodeURIComponent(sort));
	}

	let codeString = 'collection.find(filter || {})';

	if (sort) {

		codeString += '.sort(sort)';
	}

	let limitStr;

	if (Number.isInteger(limit)) {

		if (limit !== -1) {

			limitStr = '.limit(limit)';
		}
	}
	else {

		limit = 200;

		limitStr = '.limit(limit)';
	}

	if (Number.isInteger(start)) {

		codeString += `.skip(start${limitStr ? ' * limit' : ''})`;
	}

	codeString += limitStr || '';

	codeString += '.toArray(onFind)';

	MongoClient.connect(cfg.db.url, (err, db) => {

		assert.equal(null, err);

		console.log(cfg.db.msg.connect.success);

		let collection = db.collection(model);

		collection.count(filter || {}, (err, count) => {

			assert.equal(null, err);

			let onFind = (err, docs) => {

				assert.equal(null, err);

				console.log(cfg.db.msg.get.success);

				db.close();

				config.callback && config.callback(docs, count, Number.isInteger(start) ? start : undefined, Number.isInteger(limit) ? limit : undefined);
			};

			eval(codeString);
		});
	});
};
