import connection from '../database/db.js';

import { flavourSchema } from '../schemas/flavourSchema.js';

async function addFlavour (req, res) {
    const { name } = req.body;

    const validation = flavourSchema.validate(req.body, {abortEarly: false});

    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        return res.status(400).send(errors)
    }

    try {

        const checkFlavour = await connection.query(`SELECT * FROM flavours WHERE name = $1;`
        , [name]);

        if(checkFlavour.rows[0]) {
            return res.sendStatus(409);
        }

        await connection.query(`INSERT INTO flavours (name) VALUES ($1);`
        ,[name]);
        
        return res.sendStatus(201);

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
};

export {addFlavour};