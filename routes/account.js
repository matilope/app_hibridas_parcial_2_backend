import express from 'express';
import AccountController from "../controllers/account.js";
import { validateCreateAccount } from "../middlewares/account.js"
import { verifySession } from '../middlewares/session.js';

const route = express.Router();

route.get('/account/:id', [verifySession], AccountController.getAccountById);
route.post('/account', [validateCreateAccount], AccountController.createAccount);
route.get('/account/:id/votes', [verifySession], AccountController.getAccountVotesById);

export default route;