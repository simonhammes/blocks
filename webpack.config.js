const config = require( '@wordpress/scripts/config/webpack.config' );
const glob = require( 'glob' );

config.entry = {
	backend: glob.sync( './src/**/*.backend.jsx' ),
	frontend: glob.sync( './src/**/*.frontend.jsx' ),
};

config.output = {
	filename: '[name].build.js',
	path: __dirname + '/build/',
};

// Accept .jsx files
for ( let i = 0; i < config.module.rules.length; i++ ) {
	config.module.rules[ i ].test = /\.(js|jsx)$/;
}

config.stats = 'minimal';

module.exports = config;

/* Legacy config */

/*
mode: 'development',
entry: {
	backend: glob.sync( './src/** /*.backend.jsx' ),
	frontend: glob.sync( './src/** /*.frontend.jsx' ),
},
output: {
	path: __dirname + '/build/',
	filename: '[name].build.js',
},
module: {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			},
		},
	],
},
externals: {
	react: 'React',
	'react-dom': 'ReactDOM',
	jquery: 'jQuery',
},
stats: 'minimal',
*/
