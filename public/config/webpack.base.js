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
        ],
        // 测试多入口的splitChunks
        // app2: path.join(folderConfig.src, 'split.index.js')
    },

    output: null,

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: [
                folderConfig.src,
            ],
            use: [{
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve(folderConfig.config, 'babel.config.js')
                },
            }],
        }, {
            test: /\.(sa|sc)ss$/,
            include: [
                folderConfig.src,
            ],
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
            include: [
                folderConfig.src,
                folderConfig.resource,
            ],
            use: [
                MiniCssExtractPlugin.loader,
                cssLoader,
                postcssLoader,
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            include: [
                folderConfig.resource,
            ],
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
            manifest: path.join(folderConfig.build, 'libs', 'vendor-manifest.json')
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
            { filepath: path.resolve(folderConfig.build, 'libs', isDev ? 'vendor.dll.js' : 'vendor-*.min.dll.js') },
        ]),
    ],

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            minSize: 30000,
            // 指的是被'entry'引用次数，不是被其它模块引用次数, 这里的'entry'指的是webpack配置中的'entry'
            minChunks: 1,
            maxInitialRequests: 4,
            maxAsyncRequests: 8,
            automaticNameDelimiter: '--',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                commons: {
                    chunks: 'all',
                    name: 'commons',
                    maxAsyncRequests: 6,
                    minChunks: 3,
                },
                bussiness: {
                    chunks: 'all',
                    name: 'bussiness',
                    test: /src/,
                    // test: (module, chunks) => {
                    //     return /utils/.test(module.context);
                    // },
                    maxAsyncRequests: 6,
                    minChunks: 10,
                }
            }
        }
    },
};

module.exports = config;
