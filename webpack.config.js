module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: {
        backend: './src/backend.js',
        frontend: './src/frontend.js',
    },
    output: {
        path: __dirname + '/build/',
        filename: '[name].build.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        jquery: 'jQuery'
    },
    stats: 'minimal'
};
