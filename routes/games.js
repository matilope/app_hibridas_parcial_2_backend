import express from 'express';
import GamesController from '../controllers/games.js';
import GamesVotesRoute from './votes.js';
import { validateCreateGame, validateUpdateGame } from '../middlewares/games.js';
import { verifySession } from "../middlewares/session.js";

const route = express.Router();

route.route('/games')
  .get(GamesController.getGames)
  .post([validateCreateGame, verifySession], GamesController.createGame);
route.get('/games/edition', GamesController.getGamesOrderByScore)
route.route('/games/:id')
  .get(GamesController.getGameById)
  .patch([validateUpdateGame, verifySession], GamesController.updateGame)
  .delete([verifySession], GamesController.deleteGame);

route.use('/games', GamesVotesRoute);

export default route;