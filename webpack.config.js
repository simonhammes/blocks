module.exports = {
    mode: 'development',
    entry: './src/block.jsx',
    output: {
        path: __dirname + '/build/',
        filename: 'app.js'
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
    }
};

