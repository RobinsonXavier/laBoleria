import express from 'express';

import { createOrder, getOrder } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.post('/order', createOrder);

ordersRouter.get('/orders', getOrder);

export default ordersRouter;