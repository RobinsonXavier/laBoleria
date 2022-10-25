import express from 'express';

import { createCake } from '../controllers/cakesController.js';

const cakesRouter = express.Router();

cakesRouter.post('/cakes', createCake);

export default cakesRouter;