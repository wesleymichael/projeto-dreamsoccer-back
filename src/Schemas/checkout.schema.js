import Joi from "joi";

export const checkoutSchema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            itemId: Joi.string().required(),
            amount: Joi.number().integer().min(1).required(),
            color: Joi.string().required(),
            number: Joi.string().required(),
        })
    ).min(1).required(),
    address: Joi.array().items(
        Joi.object({
            CEP: Joi.string().required().length(8).pattern(/^\d{8}$/).messages({
                'string.base': 'CEP deve ser uma string',
                'string.empty': 'CEP não pode estar vazio',
                'string.length': 'CEP deve ter exatamente 8 caracteres',
                'string.pattern.base': 'CEP deve conter apenas números'
            }),
            road: Joi.string().required().messages({
                'string.base': 'Endereço deve ser uma string',
                'string.empty': 'Endereço não pode estar vazio'
            }),
            number: Joi.number().required().integer().min(1).messages({
                'number.base': 'Número deve ser um número',
                'number.empty': 'Número não pode estar vazio',
                'number.integer': 'Número deve ser um número inteiro',
                'number.min': 'Número deve ser pelo menos 1'
            }),
            city: Joi.string().required().messages({
                'string.base': 'Cidade deve ser uma string',
                'string.empty': 'Cidade não pode estar vazia'
            }),
            state: Joi.string().required().length(2).uppercase().messages({
                'string.base': 'Estado deve ser uma string',
                'string.empty': 'Estado não pode estar vazio',
                'string.length': 'Estado deve ter exatamente 2 caracteres',
                'string.uppercase': 'Estado deve estar em maiúsculas'
            }),
            country: Joi.string().required().messages({
                'string.base': 'País deve ser uma string',
                'string.empty': 'País não pode estar vazio'
            })
        })
    ).min(1).required()
});
