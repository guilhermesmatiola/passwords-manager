import joi from "joi";

const wifiSchema = joi.object({

    name:joi.string().required(),
    network:joi.string().required(),
    password:joi.string().required()
})

export default wifiSchema;