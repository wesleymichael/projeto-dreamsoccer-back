import { Router } from "express";
import { createPlayer } from "../controllers/players.controller.js";

const playersRouter = Router();

playersRouter.post("/add-new-player", createPlayer);

export default playersRouter;
