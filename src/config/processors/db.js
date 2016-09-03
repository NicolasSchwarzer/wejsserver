'use strict';

module.exports = (config, name, value) => {

	config[name].url = `mongodb://${value.host}:${value.port}/${value.name}`;
};
