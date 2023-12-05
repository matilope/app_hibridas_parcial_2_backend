import express from 'express';
import sessionController from "../controllers/session.js";
import { verifySession } from "../middlewares/session.js"

const route = express.Router();

route.post('/session', sessionController.logIn);
route.delete('/session', [verifySession], sessionController.logOut);

export default route;