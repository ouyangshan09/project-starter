const path = require('path');
const webpack = require('webpack');
const folderConfig = require('./folderConfig');

const isProd = process.env.NODE_ENV === 'production';

const dllConfig = {
    mode: isProd ? 'production' : '',
    entry: folderConfig.vendors,
    output: {
        path: folderConfig.build,
        filename: '[name].dll.js',
        library: '[name]_library',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new webpack.DllPlugin({
            context: folderConfig.root,
            path: path.join(folderConfig.root, folderConfig.build, '[name].manifest.json'),
            name: '[name]_library',
        }),
    ]
};

const compiler = webpack(dllConfig, (error, status) => {
    if (error) {
        console.error('dll compiler failure:', error);
    }
    console.log('status:', status.toString());
});
