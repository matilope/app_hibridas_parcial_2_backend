import { MongoClient, ObjectId } from "mongodb";
import { getVotesByAccountId } from "../services/votes.js";
import bcrypt from "bcrypt";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("GameJAM");
const AccountsCollection = db.collection('accounts');

async function createAccount(account) {
  await client.connect();
  const newAccount = { ...account };
  const salt = await bcrypt.genSalt(10);
  newAccount.password = await bcrypt.hash(account.password, salt);
  await AccountsCollection.insertOne({ ...newAccount });
}

async function verifyAccount(account) {
  await client.connect();
  let accountData = await AccountsCollection.findOne({ email: account.email });
  if (!accountData) {
    throw new Error("El correo no se encuentra registrado");
  }
  const passwordVerification = await bcrypt.compare(account.password, accountData.password);
  if (!passwordVerification) {
    throw new Error("La contraseña es incorrecta");
  }
  return {
    account: { ...account, password: undefined }
  }
}

async function getAccountById(id) {
  await client.connect();
  return AccountsCollection.findOne({ _id: new ObjectId(id) });
}

async function getAccountVotesById(id) {
  await client.connect();
  const accountVotes = await getVotesByAccountId(id);
  const accountInfo = {
    account_id: id,
    votes: []
  }
  for (const { game_name, rating } of accountVotes) {
    const voteInfo = {
      game_name,
      rating
    };
    accountInfo.votes.push(voteInfo);
  }
  return accountInfo;
}

export {
  createAccount,
  verifyAccount,
  getAccountById,
  getAccountVotesById
}

export default {
  createAccount,
  verifyAccount,
  getAccountById,
  getAccountVotesById
}