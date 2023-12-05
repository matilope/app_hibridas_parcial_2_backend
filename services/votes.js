import { MongoClient, ObjectId } from 'mongodb';
import { getGameById, updateGame } from './games.js';
import { getAccountById } from './account.js';

const client = new MongoClient('mongodb://127.0.0.1:27017');
const db = client.db("GameJAM");

const GamesVotesCollection = db.collection("votes");

async function getVotes(idGame) {
  await client.connect();
  return GamesVotesCollection.find({ game_id: new ObjectId(idGame) }).toArray();
}

async function getVotesByAccountId(idAccount) {
  await client.connect();
  return GamesVotesCollection.find({ account_id: new ObjectId(idAccount) }).toArray();
}

async function createVote(idGame, vote) {
  await client.connect();
  const idAccount = new ObjectId(vote.account_id);
  const gameExist = await validations(idGame, idAccount);
  let gameScore = gameExist.totalScore || 0;
  gameScore += vote.rating;
  await updateGame(idGame, { totalScore: gameScore });
  const newVote = {
    ...vote,
    rating: parseInt(vote.rating),
    account_id: idAccount,
    game_id: new ObjectId(idGame),
    game_name: gameExist.name
  }
  await GamesVotesCollection.insertOne(newVote);
  return newVote;
}

async function getAverage(idGame) {
  const game = await validations(idGame, null);
  const votes = await GamesVotesCollection.find({ game_id: new ObjectId(idGame) }).toArray();
  if (!votes.length) {
    throw new Error(`El juego ${game.name} no tiene votaciones`);
  }
  let totalRating = 0;
  for (const { rating } of votes) {
    totalRating += rating;
  }
  return {
    _id: game._id,
    game: game,
    averageRating: (totalRating / votes.length)
  }
}

async function validations(idGame, idAccount) {
  if (idGame && idAccount) {
    const accountAlreadyVotedOnThisGame = await GamesVotesCollection.findOne({ game_id: new ObjectId(idGame), account_id: idAccount });
    if (accountAlreadyVotedOnThisGame) {
      throw new Error("Ya ha realizado una votación en el juego");
    }
  }
  if (idAccount) {
    const accountExist = await getAccountById(idAccount);
    if (!accountExist) {
      throw new Error("La cuenta no existe");
    }
  }
  if (idGame) {
    const gameExist = await getGameById(idGame);
    if (!gameExist) {
      throw new Error("El juego no existe");
    }
    return gameExist;
  }
}

export default {
  getVotes,
  getVotesByAccountId,
  createVote,
  getAverage
}

export {
  getVotes,
  getVotesByAccountId,
  createVote,
  getAverage
}