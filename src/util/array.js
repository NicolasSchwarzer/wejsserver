'use strict';

exports.remove = (data, item) => {

	let index;

	while((index = data.indexOf(item)) !== -1) {

		data.splice(index, 1);
	}

	return data;
};
