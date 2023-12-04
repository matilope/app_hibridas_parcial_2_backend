import express from 'express';
import VotesController from '../controllers/votes.js';
import { validateCreateVote } from '../middlewares/votes.js';
import { verifySession } from '../middlewares/session.js';

const route = express.Router();

route.route('/:game_id/votes')
  .get(VotesController.getVotes)
  .post([validateCreateVote, verifySession], VotesController.createVote);
route.get('/:game_id/average', VotesController.getAverage);

export default route;
