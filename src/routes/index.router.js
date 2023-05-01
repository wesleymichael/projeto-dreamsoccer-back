import { Router } from "express";
import playersRouter from "./players.router.js";
import userRouter from "./users.router.js";
import cartRouter from "./cart.router.js";
import checkoutRouter from "./checkout.router.js";

const router = Router();

//Adicionar as rotas relacionadas aos players
router.use(playersRouter);
router.use(userRouter)
router.use(cartRouter)
router.use(checkoutRouter);

export default router;
