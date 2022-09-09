import joi from "joi";

const notesSchema = joi.object({

    title:joi.string().min(1).max(50).required(),
    anotation:joi.string().min(1).max(1000).required()
})

export default notesSchema;