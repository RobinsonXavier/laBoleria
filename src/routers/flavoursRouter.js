import express from 'express';

import { addFlavour } from '../controllers/flavourController.js';

const flavoursRouter = express.Router();

flavoursRouter.post('/flavours', addFlavour);

export default flavoursRouter;