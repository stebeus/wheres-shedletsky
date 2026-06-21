import { Router } from 'express';

import { getMany, signIn, signUp } from './handlers.js';

const router = Router();

router.get('/', getMany);

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

export { router as users };
