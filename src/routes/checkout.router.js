import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middlewares.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { checkoutSchema } from "../Schemas/checkout.schema.js";
import { checkout, getCheckout } from "../controllers/checkout.controller.js";

const checkoutRouter = Router();

checkoutRouter.use(authValidation);

checkoutRouter.post("/checkout", validateSchema(checkoutSchema), checkout);
checkoutRouter.get("/checkout", getCheckout);

export default checkoutRouter;
