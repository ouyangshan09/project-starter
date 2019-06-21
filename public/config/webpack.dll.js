const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const folderConfig = require('./folderConfig');

const isDev = process.env.NODE_ENV === 'development';

const vendors = folderConfig.vendors.filter(v => v);

// dev vendor.dll.js, prod vendor.min.dll.js

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        vendor: vendors,
    },
    output: {
        path: path.join(folderConfig.build, 'libs'),
        // filename: isDev ? `[name]${prefix}.dll.js` : '[name].dll.js',
        filename: isDev ? '[name].dll.js' : '[name]-[hash].min.dll.js',
        library: '[name]_[hash]',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [`**/*`],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DllPlugin({
            context: folderConfig.root,
            path: path.join(folderConfig.build, 'libs', '[name]-manifest.json'),
            name: '[name]_[hash]'
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: isDev === false,
                parallel: true,
                sourceMap: isDev,
                terserOptions: {
                    compress: {
                        // 删除log
                        drop_console: !isDev,
                        // 打开警告
                        warnings: !isDev
                    }
                },
            }),
        ]
    },
};
