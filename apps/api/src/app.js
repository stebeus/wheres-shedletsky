import cors from 'cors';
import express from 'express';

import { config } from './config.js';
import { pino } from './lib/logger.js';
import { handleError, handleNotFoundError } from './middleware/errors.js';
import { api } from './routes.js';

export const app = express();

app.use(pino);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: config.CLIENT_URL }));

app.use('/api/v1', api);

app.use(handleNotFoundError);
app.use(handleError);
