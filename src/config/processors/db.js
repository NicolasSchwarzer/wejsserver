'use strict';

module.exports = (config, name, value) => {

	config[name] = `mongodb://${value.host}:${value.port}/${value.name}`;
};
