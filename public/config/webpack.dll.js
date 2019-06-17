const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const folderConfig = require('./folderConfig');

const isDev = process.env.NODE_ENV === 'development';


const vendors = folderConfig.vendors.filter(v => v);

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        vendor: [
            // path.resolve(folderConfig.src, 'polyfill.js')0
        ].concat(vendors),
    },
    output: {
        path: path.join(folderConfig.build, 'libs'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['libs/*']
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
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    warnings: true,
                    compress: {
                        // 删除log
                        drop_console: false,
                        // 打开警告
                        warnings: true
                    }
                },
            }),
        ]
    },
};
