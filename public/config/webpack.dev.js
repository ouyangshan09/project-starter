const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = webpackMerge(baseConfig, {
    mode: 'development',

    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },

    output: {
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
});

module.exports = devConfig;
