const path = require('path');

module.exports = {
    entry: './src/embed.js',
    output: {
        filename: 'embed.js',
        path: path.resolve(__dirname, 'dist/js'),
        library: 'puyoSimulatorElements',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
};