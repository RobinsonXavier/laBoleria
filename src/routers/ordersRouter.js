import express from 'express';

import { createOrder } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.post('/order', createOrder);

export default ordersRouter;