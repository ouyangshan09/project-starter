const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const dllConfig = require('../public/config/webpack.dll');

const nextConfig = webpackMerge(dllConfig, {
    profile: true,
    bail: true,
});

webpack(nextConfig, (err, status) => {
    if (err) {
        console.error('编译dll失败:', err);
    }

    console.log(status.toString({
        colors: true,
        chunks: true,
        hash: true,
        children: true,
    }));
});

// 读文件，存在，则不重新打包，不存在，打包
// 配置，强制打包,

