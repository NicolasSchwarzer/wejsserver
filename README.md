<p align="center">
	<a href="https://www.npmjs.com/package/wejsserver">
		<img src="https://img.shields.io/npm/dt/wejsserver.svg" alt="Downloads">
	</a>
	<a href="https://www.npmjs.com/package/wejsserver">
		<img src="https://img.shields.io/npm/v/wejsserver.svg" alt="Version">
	</a>
	<a href="https://www.npmjs.com/package/wejsserver">
		<img src="https://img.shields.io/npm/l/wejsserver.svg" alt="License">
	</a>
</p>

## WeJsServer
WeJsServer is a we (micro) JavaScript written server based on express and mongodb. Core features include:

- Fast and simple routes deployment based on file structure
- Simple mongodb CRUD API
- Extensible configuration definitions and processors
- Lean and extensible core

Note that WeJsServer will be intergrated into [nicolas1.1](https://github.com/NicolasSchwarzer/nicolas1.1).

## Requires

Just keep following latest [node.js](https://nodejs.org/en/) version.

## How to use

- Create `get`, `post`, `put` or `delete` JavaScript files in directory `routes` like `/routes/api/sample/post.js` below:

	```
	'use strict';

	module.exports = (req, res, db, idGenerator, shaGenerator) => {

		let data = req.body.data || {};

		db.insert({

			model: 'sample',

			data: {
				_id: idGenerator.id(),
				name: data.name || 'unknown'
			},

			callback: data => {

				res.send({
					code: 0,
					msg: 'success',
					data: data[0]
				});
			}
		});
	};
	```

- Change directory to `/bin`, type the following command:

	```
	node start
	```

## Stay in Touch

For further updates, please follow [my blog](http://www.jianshu.com/users/0ed0a3f2200c) and GitHub repository [wejsserver](https://github.com/NicolasSchwarzer/wejsserver).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Nicolas Wan
