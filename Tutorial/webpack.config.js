"use strict";

const merge = require('webpack-merge');
const PATHS = require('/webpack-paths');
const loaders = require('./webpack-loaders');

const common = {
    entry: { //Entra arquivo junto com index.js que está /client/src
        app: PATHS.src
    },
    output: { //Define onde vai retornar a criação do arquivo bundle
        path: PATHS.dist,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            loaders.babel, //Transpiler
            loaders.css, //Nosso bundle conterá CSS
            loaders.font, // e fonts
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'] //extensões pra resolver
    }
};
let config;

switch (process.env.NODE_ENV) {
    case 'build':
        config = merge(
            common, { devtool: 'source-map' } // SourceMaps separa os arquivos
        );
        break;
    case 'development':
        config = merge(
            common, { devtool: 'eval-source-map' }, //valor padrão
            loaders.devServer({
                host: process.env.host,
                port: 3000
            })
        );
}

//Exportar configuração
module.exports = config;