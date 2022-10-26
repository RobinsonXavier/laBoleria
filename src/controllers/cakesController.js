import connection from '../database/db.js';

import {cakeSchema} from '../schemas/cakeSchema.js';


async function createCake (req, res) {
    const {name, price, image, description} = req.body;

    const validation = cakeSchema.validate(req.body, {abortEarly: false});

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);

        const findImage = errors.find(error => error.includes('image'));

        if (findImage) {
            return res.status(422).send(findImage);
        }
        
        return res.status(400).send(errors);
    }

    try {

        const checkName = await connection.query(`SELECT * FROM cakes WHERE name = $1;`, [name]);

        if(checkName.rows[0]) {
            return res.sendStatus(409);
        }

        await connection.query(`INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);`
        ,[name, price, image, description]);

        return res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export {createCake};