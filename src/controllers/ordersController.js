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

        const orders = await connection.query(
            `SELECT clients.name as "clientName", clients.id as "clientId",
             clients.address as address,
            clients.phone as phone, cakes.name as "cakeName",
            cakes.id as "cakeId", cakes.price as price,
            cakes.description as description, cakes.image as image, orders.id as "orderId",
            orders."createdAt" as "createdAt", orders.quantity as quantity,
            orders."totalPrice" as "totalPrice" FROM orders 
            JOIN clients ON clients.id = orders."clientId"
            JOIN cakes ON cakes.id = orders."cakeId";`
        );

        if(!orders.rows[0]) {
            return res.sendStatus(404);
        }
            
        const allData = orders.rows.map( element => {
            const newObj = {
                client: {
                    id: element.clientId,
                    name: element.clientName,
                    address: element.address,
                    phone: element.phone
                },
                cake: {
                    id: element.cakeId,
                    name: element.cakeName,
                    price: element.price,
                    description: element.description,
                    image: element.image
                },
                orderId: element.orderId,
                createdAt: element.createdAt.toISOString().slice(0, 19).replace('T', ' '),
                quantity: element.quantity,
                totalPrice: element.totalPrice
            }

            return newObj;
        });

        if(date) {
            const searchOrder = allData.find ( element => element.createdAt.substring(0, 10) === date);

            if (!searchOrder) {
                return res.sendStatus(404);
            }

            return res.status(200).send(searchOrder);
        }


        return res.status(200).send(allData);

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
};

export { createOrder, getOrder };