const path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
        path: path.join(__dirname, './public'),
        filename: 'bundle.js'
    },
    watch: true,

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};
