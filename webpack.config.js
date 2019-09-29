module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: __dirname + '/build/',
        filename: 'index.js'
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
        'react-dom': 'ReactDOM'
    },
    stats: 'minimal'
};

