'use strict';

let JsSha = require('jssha');

let config = require('../config/init');

module.exports = (value) => {

	let shaObj = new JsSha(config.sha, 'TEXT');

	shaObj.update(value || '');

	return shaObj.getHash('HEX');
};
