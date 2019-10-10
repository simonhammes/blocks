const glob = require( 'glob' );

module.exports = {
	devtool: 'source-map',
	mode: 'development',
	entry: {
		backend: glob.sync( './src/js/backend/**/*.jsx' ),
		frontend: glob.sync( './src/js/frontend/**/*.jsx' ),
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
};
