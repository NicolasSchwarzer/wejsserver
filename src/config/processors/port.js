'use strict';

let numReg = /^\d+$/;

module.exports = (config, name, value) => {

	if (numReg.test(value)) {

		config[name] = parseInt(value);
	}
	else {

		config[name] = 3006;
	}
};
