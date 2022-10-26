import joi from 'joi';

const flavourSchema = joi.object({
    name: joi.string().min(2).required()
});

export {flavourSchema};