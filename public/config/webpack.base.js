const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
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

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: isDev,
        importLoaders: 2,
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: isDev
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
                MiniCssExtractPlugin.loader,
                Object.assign({}, cssLoader, {
                    options: {
                        modules: {
                            localIdentName: isDev ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'
                        }
                    }
                }),
                postcssLoader,
                sassLoader,
            ],
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                cssLoader,
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
        // 在业务内部定义process.env环境变量值
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new webpack.DllReferencePlugin({
            context: folderConfig.root,
            manifest: path.join(folderConfig.build, 'libs', `vendor${isDev ? '-dev' : ''}-manifest.json`)
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: projectConfig.title,
            template: path.join(folderConfig.resource, 'index.html'),
            favicon: path.join(folderConfig.resource, 'img', 'favicon.ico'),
        }),
        new AddAssetHtmlPlugin([
            { filepath: path.resolve(folderConfig.build, 'libs', '*.dll.js') },
            // TODO 编写自动化脚本处理polyfill的打包
            // { filepath: path.resolve(folderConfig.build, 'libs', '*.polyfill.js') },
            { filepath: path.resolve(folderConfig.root, 'node_modules/core-js/stable/index.js') },
            { filepath: path.resolve(folderConfig.root, 'node_modules/regenerator-runtime/runtime.js') },
        ]),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                }
            }
        }
    },
};

module.exports = config;
