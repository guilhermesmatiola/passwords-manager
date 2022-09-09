import joi from "joi";

const cardSchema = joi.object({

    title:joi.string().required(),
    name:joi.string().required(),
    number:joi.string().required(),
    cvc:joi.string().max(3).min(3).required(),
    expiration_date:joi.string().max(5).min(5).required(),
    password:joi.string().min(4).required(),
    is_virtual:joi.any().valid("true","false").required(),
    type:joi.any().valid("crédito","debito","ambos").required()
})

export default cardSchema;