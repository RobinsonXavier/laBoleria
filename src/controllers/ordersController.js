import { connection } from '../database/db.js';

import { orderSchema } from '../schemas/orderSchema.js';

async function createOrder (req, res) {
    const {clientId, cakeId, quantity, totalPrice} = req.body;

    const newDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const validation = orderSchema.validate(req.body, { abortEarly: false});

    if(validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(400).send(errors);
    }

    try {

        const checkClient = connection.query(`SELECT * FROM clients WHERE id = $1;`
        , [clientId]);

        if(!checkClient.rows[0]) {
            return res.sendStatus(404);
        }

        const checkCake = connection.query(`SELECT * FROM cakes WHERE id = $1;`
        , [cakeId]);

        if(!checkCake.rows[0]) {
            return res.sendStatus(404);
        }

        connection.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice")
        VALUES ($1, $2, $3, $4, $5);`, [clientId, cakeId, quantity, newDate, totalPrice]);
        
        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }

};

async function getOrder (req, res) {

};

export { createOrder };