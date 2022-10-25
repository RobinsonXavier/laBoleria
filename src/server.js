import express from 'express';
import cors from 'cors';

import cakesRouter from './routers/cakesRouter.js';
import clientsRouter from './routers/clientsRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(cakesRouter);

app.use(clientsRouter);

app.listen(4000, () => {
    console.log('Server on port 4000');
})