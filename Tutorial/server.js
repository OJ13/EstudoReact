import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
//importar models e rotas
import Game from 'morgan';
import { getGames, getGame, postGame, deleteGame } from './app/models/game';

const app = express(); //nosso server
const port = process.env.PORT || 8013;

//Conexão com DB por Mongoose
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}; // <- Opções para a conexão com o DB
mongoose.Promise = global.Promise;
mongoose.connect('MongoConnection', options); //string de conexão do mongoDb

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Middleware (body parse e Morgan)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
//Dizemos ao express onde encontrar os estáticos(no caso diretório client/dist)
app.use(express.static(__dirname + '/client/dist'));
//Habilitar o CORS para poder fazer a requisição HTTP com o webpack-dev-server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//api routes
app.route('/games')
    .post(postGame) //criar um game
    .get(getGames); //retornar todos os games
app.route('/games/:id')
    .get(getGame) //retornar um game
    .delete(deleteGame); //deletar um game
app.route("*").get((req, res) => {
    res.sendFile('client/dist/index.html', { root: __dirname });
}); // Essa requisição vai pra HomePage

app.listen(port);

console.log(`listening on port ${port}`);