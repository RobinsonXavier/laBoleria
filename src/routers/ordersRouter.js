import express from 'express';

import { createOrder, getOrder, getOrderById } from '../controllers/ordersController.js';
import { getData } from '../middlewares/getData.js';

const ordersRouter = express.Router();

ordersRouter.post('/order', createOrder);

ordersRouter.get('/orders',getData, getOrder);

ordersRouter.get('/orders/:id',getData, getOrderById);

export default ordersRouter;