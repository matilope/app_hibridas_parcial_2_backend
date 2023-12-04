import express from 'express';
import cors from 'cors';
import GamesRoutes from './routes/games.js';
import AccountRoutes from "./routes/account.js"
import SessionRoutes from "./routes/session.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use("/api", GamesRoutes);
app.use("/api", AccountRoutes);
app.use("/api", SessionRoutes);

app.listen(PORT, () => {
  console.log(`El servidor esta escuchando el puerto ${PORT}`);
});