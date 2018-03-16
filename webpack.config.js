const config = require('@deloitte-digital-au/webpack-config-vuejs');

config.entry = {
	main: [
		'./src/main.js',
		'./src/specificity.scss',
	],
};

module.exports = config;
