const path = require('path');

const root = path.resolve(__dirname, '../../');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    root: root,
    src: path.join(root, 'src'),
    test: path.join(root, 'test'),
    build: path.join(root, 'build'),
    scripts: path.join(root, 'scripts'),
    config: path.join(root, 'public', 'config'),
    resource: path.join(root, 'public', 'resource'),
    deploy: '/',

    vendors: [
        'redux',
        'react',
        'history',
        isDev ? '@hot-loader\\react-dom' : 'react-dom',
        isDev && 'react-hot-loader',
        'react-redux',
        'react-router',
        'react-router-redux',
    ],
};

module.exports = config;
