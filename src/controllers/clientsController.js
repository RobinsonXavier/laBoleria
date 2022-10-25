import { connection } from '../database/db.js';

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
        
        const checkPhone = connection.query(`SELECT * FROM clients WHERE phone = $1;`
        , [phone]);

        if(checkPhone.rows[0]) {
            return res.sendStatus(409);
        }

        connection.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`
        , [name, address, phone]);

        return sendStatus(201);
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }

};

export {createClient};