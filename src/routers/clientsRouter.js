import express from 'express';

import { createClient, getClientOrders } from '../controllers/clientsController.js';

const clientsRouter = express.Router();

clientsRouter.post('/clients', createClient);

clientsRouter.get('/clients/:id/orders', getClientOrders);

export default clientsRouter;