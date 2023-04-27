import { Router } from "express";
import playersRouter from "./players.router.js";
import userRouter from "./users.router.js";

const router = Router();

//Adicionar as rotas relacionadas aos players
router.use(playersRouter);
router.use(userRouter)

export default router;
