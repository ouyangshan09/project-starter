'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const webpack = require('webpack');
const webpackServer = require('webpack-dev-server');
const devConfig = require('../public/config/webpack.dev');
const projectConfig = require('../public/config/projectConfig');
const folderConfig = require('../public/config/folderConfig');

const projectUrl = url.format({
    protocol: projectConfig.protocol,
    hostname: projectConfig.host,
    port: 80
});

// 'react-hot-loader/patch',
// 'webpack-dev-server/client?',
// 'webpack/hot/dev-server',

const compiler = webpack(devConfig);

const options = {
    historyApiFallback: true,
    compress: true,
    hot: true,
    publicPath: '/',
    inline: true,
    stats: {
        colors: true,
        cached: true
    },
    host: projectConfig.host,
    port: projectConfig.port,
    open: false,
    before: (app, server) => {
        // const reactHotLoader = path.join(folderConfig.root, 'node_modules', 'react-hot-loader/patch');
        // server.compiler.options.entry.app.unshift(reactHotLoader);
        // console.log('server:', server.compiler.options);
    },
};

if (projectConfig.protocol === 'https') {
    options['https'] = {
        key: fs.readFileSync(path.join(folderConfig.resource, '_wildcard.ozz.com+3-key.pem')),
        cert: fs.readFileSync(path.join(folderConfig.resource, '_wildcard.ozz.com+3.pem')),
    };
}

const server = new webpackServer(compiler, options);
server.listen(projectConfig.port, projectConfig.host, function () {
    console.log('Starter listen on:', projectUrl);
});
