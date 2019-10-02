module.exports = {
    mode: 'development',
    entry: {
        editor: './src/block_editor/index.js',
        frontend: './src/frontend/index.js',
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
