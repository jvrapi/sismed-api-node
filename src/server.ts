import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import Routers from './routers';
import './database/connection';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routers);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🏃 Running Server on port ${port} `);
});
