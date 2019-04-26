var webpack = require("webpack");

module.exports = {
    optimization:{
        minimize: false,
        // minimizer: [new UglifyJsPlugin()] if you want to customize it.
    },
    externals: /^@adobe/
}