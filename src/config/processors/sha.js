'use strict';

let shaReg = /^(?:sha-)?(\d+)$/i;

module.exports = (config, name, value) => {

	if (shaReg.test(value)) {

		config[name] = value.replace(shaReg, 'SHA-$1');
	}
	else {

		config[name] = 'SHA-512';
	}
};
