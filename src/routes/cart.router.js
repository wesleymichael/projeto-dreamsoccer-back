import { Router } from "express";
import { createCartList } from "../controllers/cart.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { cartSchema } from "../Schemas/cart.schema.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";

const cartRouter = Router()

cartRouter.use(authValidation)
cartRouter.post("/cart/:id",validateSchema(cartSchema), createCartList)

export default cartRouter;