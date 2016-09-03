'use strict';

exports = module.exports = require('fs');

exports.isDirectory = path => {

	return exports.existsSync(path) && exports.statSync(path).isDirectory();
};

exports.isFile = path => {

	return exports.existsSync(path) && exports.statSync(path).isFile();
};
