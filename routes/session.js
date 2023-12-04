import express from 'express';
import sessionController from "../controllers/session.js";
import { verifySession } from "../middlewares/session.js"
import { validateCreateAccount } from '../middlewares/account.js';

const route = express.Router();

route.post('/session', [validateCreateAccount], sessionController.logIn);
route.delete('/session', [verifySession], sessionController.logOut);

export default route;