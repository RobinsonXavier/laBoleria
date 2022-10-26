import connection from "../database/db.js";

async function getData (req, res, next) {

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

    res.locals.allData = allData;

    next();
}

export {getData};