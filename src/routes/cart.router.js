import { Router } from "express";
import { createCartList, deleteCartList, getCartList, updateCartList } from "../controllers/cart.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { cartSchema, updateCartSchema } from "../Schemas/cart.schema.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";

const cartRouter = Router()

cartRouter.use(authValidation)
cartRouter.post("/cart/:id", validateSchema(cartSchema), createCartList)
cartRouter.get("/cart", getCartList)
cartRouter.put("/cart", validateSchema(updateCartSchema), updateCartList)
cartRouter.delete("/cart", deleteCartList)


export default cartRouter;