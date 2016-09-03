'use strict';

let FS = require('../util/fs'),
	Path = require('../util/path');

let config = JSON.parse(FS.readFileSync(Path.join(__dirname, '..', '..', 'package.json')).toString()).configurations;

for (let name in config) {

	if (config.hasOwnProperty(name)) {

		let path = Path.join(__dirname, 'processors', `${name}.js`);

		if (FS.isFile(path)) {

			let processor = require(path);

			if (processor instanceof Function) {

				processor(config, name, config[name]);
			}
		}
	}
}

module.exports = config;
