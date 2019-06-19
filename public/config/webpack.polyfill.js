/**
 * 兼容旧浏览器打包的全量polyfill环境
 * 原因: @babel/preset-env中的`useBuiltIns`选项是属于实验性质且不稳定，按需加载有时候并不准确，为了避免这些奇怪问题，使用全量打包
*/

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const folderConfig = require('./folderConfig');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        polyfill: path.resolve(folderConfig.root, 'node_modules', 'core-js', 'index.js')
    },
    output: {
        path: path.resolve(folderConfig.build, 'libs'),
        filename: '[name].dll.js',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['libs/polyfill*.js']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(isDev ? 'development' : 'production')
            }
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
        ]
    }
};
