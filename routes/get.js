'use strict';

let FS = require('../src/util/fs'),
	Path = require('../src/util/path');

module.exports = (req, res, db, idGenerator, shaGenerator) => {

	res.send(FS.readFileSync(Path.join(__dirname, '..', 'templates', 'home.html')).toString());
};
