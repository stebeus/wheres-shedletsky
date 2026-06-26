import { Router } from 'express';

import { charactersRouter } from './characters/routes.js';
import { usersRouter } from './users/routes.js';

const router = Router();

router.use('/characters', charactersRouter);
router.use('/users', usersRouter);

export { router as apiRouter };
