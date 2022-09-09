import joi from "joi";

const credentialSchema = joi.object({

    url:joi.string().uri().required(),
    name:joi.string().required(),
    password:joi.string().required(),
    username:joi.string().required()
})

export default credentialSchema;