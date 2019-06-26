const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": "3",
            "modules": false,
            "targets": {
                "edge": "17",
                "firefox": "60",
                "chrome": "60",
                "safari": "11.1",
                "ie": "9"
            },
        }],
        "@babel/preset-typescript",
        "@babel/preset-react",
    ],
    "plugins": [
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-function-bind",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
        ["@babel/plugin-proposal-class-properties", { "loose": false }],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
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
        }],
        "lodash",
    ],
    "env": {
        "test": {
            "presets": [
                ["@babel/preset-env", {
                    "targets": {
                        "edge": "17",
                        "firefox": "60",
                        "chrome": "60",
                        "safari": "11.1",
                        "ie": "9"
                    },
                }],
                "@babel/preset-react",
            ]
        }
    }
}