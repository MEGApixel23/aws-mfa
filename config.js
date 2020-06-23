const dotEnv = require('dotenv');

let loaded = false;

const loadEnvVariables = () => {
	if (loaded === false) {
		dotEnv.config();
		loaded = true;
	}
};

const getConfigVar = key => {
	loadEnvVariables();

	if (process.env[key] !== undefined) {
		return process.env[key];
	}

	return null;
};

module.exports = {
	getConfigVar
};
