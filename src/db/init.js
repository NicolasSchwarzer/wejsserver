'use strict';

let FS = require('../util/fs'),
	Path = require('../util/path');

let dir = Path.join(__dirname, 'methods');

if (FS.isDirectory(dir)) {

	let names = FS.readdirSync(dir);

	for (let name of names) {

		let path = Path.join(dir, name);

		if (FS.isJavaScriptFile(path)) {

			let func = require(path);

			if (func instanceof Function) {

				exports[Path.basename(path, '.js')] = func;
			}
		}
	}
}
