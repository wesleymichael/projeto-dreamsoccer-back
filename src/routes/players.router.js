import { Router } from "express";
import { createPlayer, getPlayers } from "../controllers/players.controller.js";
import filterPlayer from "../middlewares/filterPlayers.middeware.js";

const playersRouter = Router();

playersRouter.post("/add-new-player", createPlayer);
playersRouter.get("/players", filterPlayer, getPlayers);

export default playersRouter;
