module.exports = {
    mode: 'development',
    entry: {
        editor: './src/js/editor.js',
        frontend: './src/js/frontend.js',
    },
    output: {
        path: __dirname + '/build/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
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

