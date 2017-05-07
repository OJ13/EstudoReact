"use strict";

const webpack = require('webpack');
const PATHS = require('./webpack-paths');

exports.devServer = function(oprtions) {
        return {
            devServer: {
                historyApiFallback: true,
                hot: true,
                inline: true,
                stats: 'errors-only',
                host: options.host, //http://localhost
                port: options.port, //3000
                contentBase: './client/dist'
            },
            plugins: [ //habilitar multipla compilação
                new webpack.HotModuleReplacementPlugin({
                    multistep: true
                })
            ]
        };
    }
    //CSS loader
exports.css = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: PATHS.css
    }
    //Arquivo loader
exports.font = {
        test: /\.ttf$/,
        use: ['file-loader']
    }
    //Babel loader
exports.babel = {
    test: /\.jsx?$/,
    exclude: /node_module/,
    use: ['babel-loader']
}