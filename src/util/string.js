'use strict';

let QueryString = require('querystring'),
	UtilArray = require('./array');

let urlReg = /\:([^\:\\\/\.\?\&\=]+)/g;

exports.split = (data, reg) => {

	let result = data.split(reg);

	UtilArray.remove(result, '');

	return result;
};

exports.formatURL = (url, params) => {

	return url.replace(urlReg, (match, p1) => {

		return params[p1];
	});
};

exports.urlAppend = (url, query) => {

	let queryStr = QueryString.stringify(query);

	return `${url}${queryStr === '' ? '' : (url.indexOf('?') === -1 ? '?' : '&')}${queryStr}`;
};
