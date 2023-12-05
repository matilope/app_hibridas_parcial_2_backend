import VotesServices from '../services/votes.js';

async function getVotes(req, res) {
  const { game_id } = req.params;
  try {
    const votes = await VotesServices.getVotes(game_id);
    res.status(200).json(votes);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function getVotesByAccountId(req, res) {
  const { account_id } = req.params;
  try {
    const vote = await VotesServices.getVotesByAccountId(account_id);
    res.status(200).json(vote);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function createVote(req, res) {
  const { game_id } = req.params;
  try {
    const createdVote = await VotesServices.createVote(game_id, req.body);
    res.status(201).json(createdVote);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function getAverage(req, res) {
  const { game_id } = req.params;
  try {
    const getAverga = await VotesServices.getAverage(game_id);
    res.status(201).json(getAverga);
  } catch ({ message }) {
    res.status(500).json({ message });
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