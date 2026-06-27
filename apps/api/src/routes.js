import { Router } from 'express';

import { charactersRouter } from './modules/characters/routes.js';
import { usersRouter } from './modules/users/routes.js';

const router = Router();

router.use('/characters', charactersRouter);
router.use('/users', usersRouter);

export { router as apiRouter };
