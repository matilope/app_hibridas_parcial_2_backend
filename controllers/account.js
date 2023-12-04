import * as AccountService from "../services/account.js";

async function createAccount(req, res) {
  try {
    await AccountService.createAccount(req.body);
    res.status(201).json({ message: "La cuenta ha sido creada con éxito" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getAccountById(req, res) {
  const { id } = req.params;
  try {
    const account = await AccountService.getAccountById(id);
    res.status(200).json({ ...account });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getAccountVotesById(req, res) {
  const { id } = req.params;
  try {
    const account = await AccountService.getAccountVotesById(id);
    res.status(200).json({ ...account });
  } catch (err) {
    res.status(500).json({ message: err.message });
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