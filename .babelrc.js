const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    "presets": [
        "@babel/preset-react",
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": 3,
            "targets": {
                "edge": "17",
                "firefox": "60",
                "chrome": "60",
                "safari": "11.1",
            },
        }],
    ],
    "plugins": [
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": false }],
        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "lib",
            "style": "css"
        }],
        ["react-css-modules", {
            "generateScopedName": isDev ? "[name]_[local]_[hash:base64:3]" : "[hash:base64:4]",
            "filetypes": {
                ".scss": {
                    "syntax": "postcss-scss",
                },
            }
        }]
    ]
}