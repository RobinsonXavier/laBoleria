
import connection  from '../database/db.js';

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

        const checkClient = await connection.query(`SELECT * FROM clients WHERE id = $1;`
        , [clientId]);

        console.log(checkClient.rows)

        if(!checkClient.rows[0]) {
            return res.sendStatus(404);
        }

        const checkCake = await connection.query(`SELECT * FROM cakes WHERE id = $1;`
        , [cakeId]);

        console.log(checkCake.rows)

        if(!checkCake.rows[0]) {
            return res.sendStatus(404);
        }

        await connection.query(`INSERT INTO orders ("clientId", "cakeId", quantity, "createdAt", "totalPrice")
        VALUES ($1, $2, $3, $4, $5);`, [clientId, cakeId, quantity, newDate, totalPrice]);
        
        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }

};

async function getOrder (req, res) {
    const {date} = req.query;

    try {

        if(date) {
            const searchOrder = res.locals.allData.find ( element => element.createdAt.substring(0, 10) === date);

            if (!searchOrder) {
                return res.sendStatus(404);
            }

            return res.status(200).send(searchOrder);
        }

        return res.status(200).send(res.locals.allData);

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
};

async function getOrderById (req, res) {
    const {id} = req.params;

    try {

        const clientOrders = res.locals.allData.filter( element => element.orderId === Number(id));

        if(!clientOrders) {
            return res.sendStatus(404);
        }

        return res.status(200).send(clientOrders);
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
};

export { createOrder, getOrder, getOrderById };