'use strict';

let Uuid = require('uuid');

exports.id = () => {

	return Uuid.v4();
};
