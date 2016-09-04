'use strict';

let UtilString = require('../util/string'),
	FS = require('../util/fs'),
	Path = require('../util/path');

let db = require('../db/init'),
	idGenerator = require('../helper/id'),
	shaGenerator = require('../helper/sha');

let slashReg = /[\/\\]/,
	underscoreReg = /^_/;

let mapPathFuncHelper = (data, names, func) => {

		let name = `/${names.shift().toLowerCase().replace(underscoreReg, ':')}`,
			result;

		if (names.length === 0) {

			data[name.replace(slashReg, '')] = func;

			return;
		}

		result = data[name];

		if (result === undefined || result === null) {

			result = data[name] = {};
		}

		mapPathFuncHelper(result, names, func);
	},

	mapPathFunc = (data, path, func) => {

		mapPathFuncHelper(data, UtilString.split(path, slashReg), func);

		return data;
	};

module.exports = class {

	constructor() {

		this.$routesPath = Path.join(__dirname, '..', '..', 'routes');
	}

	getRoutings(route, path, result) {

		let me = this;

		route = route || '';

		path = path || me.$routesPath;

		result = result || {};

		let names = FS.readdirSync(path);

		for (let name of names) {

			name = Path.join(path, name);

			if (FS.isDirectory(name)) {

				me.getRoutings(`${route}/${Path.basename(path)}`, name, result);
			}
			else if (FS.isMockFile(name)) {

				let func = (req, res) => {

					require(name)(req, res, db, idGenerator, shaGenerator);
				};

				mapPathFunc(result, `${route}/${Path.basename(path)}/${Path.basename(name, '.js')}`, func);
			}
		}

		return result;
	}
}
