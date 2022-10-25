import joi from 'joi';


const orderSchema = joi.object({
    cleintId: joi.number().integer().required(),
    cakeId: joi.number().integer().required(),
    quantity: joi.number().integer().min(1).max(5).required(),
    totalPrice: joi.number().required()

});

export {orderSchema};