import Game from '../models/game';

//Retornar todos os jogos depois da PostDate
const getGames = (req, res) => {
        //Query no db, se não tiver erros trará todos os games para o client
        Game.find(null, null, { sort: { postDate: 1 } }, (err, games) => {
            if (err) {
                res.send(err);
            }
            res.json(games); //Games enviados com json
        });
    }
    //Retornar um game filtrado por ID
const getGame = (req, res) => {
        const { id } = req.params;
        //Query no db para trazer um game, se não ouver erros retorna para o client
        Game.findById(id, (err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game); //Game enviados com json
        });
    }
    //Pegar os dados do corpo e criar um novo Game
const postGame = (req, res) => {
        //Nos atribuimos as informações de um jogo vazio, para a inserção dos dados
        let game = Object.assign(new Game(), req.body);
        // Nós salvamos dentro do db
        game.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'game created' }); // Um simples Json como resposta que foi criado o game
        });
    }
    //Excluindo um game pegando Id
const deleteGame = (req, res) => {
        //Excluir o jogo pegando pelo id e se não ouver erros manda uma mensagem de sucesso
        Game.remove({ _id: req.params.id },
            err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'successfully deleted' }); //Um simples Json com a resposta que foi deletado com Sucesso
            }
        );
    }
    //Exportar nossas funções que serão usadas no server routes
export { getGames, getGame, postGame, deleteGame };