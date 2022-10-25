import express from 'express';

import { createClient } from '../controllers/clientsController.js';

const clientsRouter = express.Router();

clientsRouter.post('/clients', createClient);

export default clientsRouter;