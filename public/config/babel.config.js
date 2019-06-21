module.exports = function (api) {
    api.cache(true);

    const presets = [];
    const plugins = [];

    return {
        presets,
        plugins,
    };
}


// {
//     "presets": [
//         "@babel/preset-env",
//         "@babel/preset-react",
//     ],
//         "env": {
//         "test": {
//             "presets": ["@babel/preset-env", "@babel/preset-react"]
//         }
//     },
//     "plugins": [
//         "@babel/plugin-proposal-function-bind",
//         "@babel/plugin-transform-object-assign",
//         "@babel/plugin-syntax-import-meta",
//         "@babel/plugin-syntax-dynamic-import",
//         "@babel/plugin-proposal-json-strings",
//         "@babel/plugin-proposal-export-default-from",
//         "@babel/plugin-proposal-export-namespace-from",
//         ["@babel/plugin-proposal-class-properties", { "loose": false }],
//         ["@babel/plugin-transform-runtime", { "corejs": 2 }],
//         ["@babel/plugin-proposal-decorators", { "legacy": true }],
//     ]
// }