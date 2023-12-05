import * as AccountService from "../services/account.js";

async function createAccount(req, res) {
  try {
    const token = await AccountService.createAccount(req.body);
    res.status(201).json({ message: "La cuenta ha sido creada con éxito", ...token });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function getAccountById(req, res) {
  const { id } = req.params;
  try {
    const account = await AccountService.getAccountById(id);
    res.status(200).json({ ...account });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function getAccountVotesById(req, res) {
  const { id } = req.params;
  try {
    const account = await AccountService.getAccountVotesById(id);
    res.status(200).json({ ...account });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

export default {
  createAccount,
  getAccountById,
  getAccountVotesById
}

export {
  createAccount,
  getAccountById,
  getAccountVotesById
}