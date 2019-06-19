process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const folderConfig = require('./folderConfig');


const devConfig = webpackMerge(baseConfig, {
    mode: 'development',

    entry: {
        app: path.join(folderConfig.src, 'index.dev.js'),
    },

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
