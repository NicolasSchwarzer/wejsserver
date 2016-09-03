'use strict';

exports = module.exports = require('fs');

let jsReg = /\.js$/;

exports.isDirectory = path => {

	return exports.existsSync(path) && exports.statSync(path).isDirectory();
};

exports.isFile = path => {

	return exports.existsSync(path) && exports.statSync(path).isFile();
};

exports.isJavaScriptFile = path => {

	return exports.isFile(path) && jsReg.test(path);
};
