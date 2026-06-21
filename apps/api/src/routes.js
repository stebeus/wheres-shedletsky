import { Router } from 'express';

import { users } from './modules/users/routes.js';

const router = Router();

router.use('/users', users);

export { router as api };
