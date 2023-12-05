import { MongoClient } from "mongodb";
import { verifyAccount } from "./account.js";
import jwt from "jsonwebtoken";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("GameJAM");
const TokensCollection = db.collection('tokens');

async function createToken(payload) {
  const token = jwt.sign(payload, "secret");
  TokensCollection.insertOne({ token, email: payload.email });
  return token;
}

async function createSession(accountData) {
  const { account } = await verifyAccount({ ...accountData });
  return {
    account,
    token: await createToken({ ...accountData, password: undefined })
  }
}

async function verifyToken(token) {
  await client.connect();
  const payload = jwt.verify(token, "secret");
  if (!await TokensCollection.findOne({ token })) {
    throw new Error({ message: "El token no se encuentra en la base de datos" });
  }
  return payload;
}

async function deleteSession(token) {
  await client.connect();
  TokensCollection.deleteOne({ token })
}

export default {
  createSession,
  verifyToken,
  deleteSession,
  createToken
}

export {
  createSession,
  verifyToken,
  deleteSession,
  createToken
}