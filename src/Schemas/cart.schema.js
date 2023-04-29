import Joi from "joi"

export const cartSchema = Joi.object({
    amount: Joi.number().integer().min(1).required(),
    color: Joi.string().pattern(/^#([0-9A-Fa-f]{3}){1,2}$/).required(),
    number: Joi.number().integer().min(1).required()
})

export const updateCartSchema = Joi.object({
    id: Joi.string().required(),
    amount: Joi.number().integer().min(1).required()
})