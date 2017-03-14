const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
    inject: 'body'
});

const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const publicUrl = "";

module.exports = {
    devtool: 'eval-source-map',

    entry: path.resolve("src/index.js"),
    output: {
        path: path.resolve("public/js/"),
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot-loader", 'babel-loader']
            }
        ]
    },

    devServer: {
        contentBase: "./public",
        // do not print bundle build stats
		noInfo: false,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,

        port: PORT,
        host: HOST
    },

    plugins: [
        HtmlWebpackPluginConfig,
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl
        })
    ]
}