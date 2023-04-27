import { Router } from "express";
import { getUser, logout, signup, singin } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { loginSchema, userSchema } from "../Schemas/users.schema.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";

const userRouter = Router()

userRouter.post("/cadastro", validateSchema(userSchema), signup)
userRouter.post("/login", validateSchema(loginSchema), singin)
userRouter.get("/login", authValidation ,getUser)
userRouter.post("/logout", authValidation, logout)



export default userRouter