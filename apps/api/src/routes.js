import { Router } from 'express';

import { characters } from './modules/characters/routes.js';
import { users } from './modules/users/routes.js';

const router = Router();

router.use('/users', users);
router.use('/characters', characters);

export { router as api };
