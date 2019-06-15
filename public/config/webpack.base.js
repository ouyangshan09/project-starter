const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const folderConfig = require('./folderConfig');
const projectConfig = require('./projectConfig');

const isDev = process.env.NODE_ENV === 'development';

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        from: path.resolve(folderConfig.config, 'postcss.config.js'),
        sourceMap: isDev,
    }
};

const config = {
    context: folderConfig.root,

    entry: {
        app: [
            path.join(folderConfig.src, 'index.js')
        ]
    },

    output: null,

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve(folderConfig.config, 'babel.config.js')
                },
            }],
        }, {
            test: /\.(sa|sc)ss$/,
            use: [
                'style-loader',
                'css-loader',
                postcssLoader,
                'sass-loader',
            ],
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                postcssLoader,
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: { limit: 8192 },
            },  
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: projectConfig.title,
            template: path.join(folderConfig.resource, 'index.html'),
            favicon: path.join(folderConfig.resource, 'img', 'favicon.ico'),
        }),
        // 在业务内部定义process.env环境变量值
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }
        }),
    ],
};

module.exports = config;
