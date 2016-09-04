'use strict';

let routeReg = /^\/routes/;

module.exports = function(config, route) {

	let me = this;

	route = route || '';

	for (let name in config) {

		if (config.hasOwnProperty(name)) {

			let value = config[name];

			switch (typeof value) {

				case 'object':

					me.map(value, `${route}${name}`);

					break;

				case 'function':

					route = route.replace(routeReg, '');

					if (route === '') {

						route = '/';
					}

					me[name](route, value);

					console.log(`Route ${route} ${name.toUpperCase()}`);

					break;
			}
		}
	}
};
