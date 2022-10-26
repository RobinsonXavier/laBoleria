import connection from '../database/db.js';

import { clientSchema } from '../schemas/clientSchema.js';

async function createClient (req, res) {
    const {name, address, phone} = req.body;

    const validation = clientSchema.validate(req.body, { abortEarly: false});

    if(validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(400).send(errors);
    }

    if (isNaN(phone)) {
        return res.status(400).send('The phone must be a number');
    }

    try {
        
        const checkPhone = await connection.query(`SELECT * FROM clients WHERE phone = $1;`
        , [phone]);

        if(checkPhone.rows[0]) {
            return res.sendStatus(409);
        }

        await connection.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`
        , [name, address, phone]);

        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }

};

async function getClientOrders (req, res) {
    const {id} = req.params;

    try {
        const checkClient = await connection.query(`SELECT * FROM clients WHERE id = $1;`
        , [id]);

        if (!checkClient.rows[0]) {
            return res.sendStatus(404);
        }

        const clientOrder = await connection.query(
            `SELECT orders.id as "orderId",
            quantity, "createdAt", "totalPrice", cakes.name as "cakeName"
            FROM orders JOIN cakes ON cakes.id = "cakeId" WHERE "clientId" = $1;`,
            [id]
        );

        const clientRequest = clientOrder.rows.map ( element => {
            const newObj = {
                orderId: element.orderId,
                quantity: element.quantity,
                createdAt: element.createdAt.toISOString().slice(0, 19).replace('T', ' '),
                totalPrice: Number(element.totalPrice),
                cakeName: element.cakeName
            }

            return newObj;
        }) 

        return res.status(200).send(clientRequest);

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

}

export {createClient, getClientOrders};