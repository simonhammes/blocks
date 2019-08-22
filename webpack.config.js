module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
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
    }
};

