import { Router } from "express";
import playersRouter from "./players.router.js";

const router = Router();

//Adicionar as rotas relacionadas aos players
router.use(playersRouter);

export default router;
