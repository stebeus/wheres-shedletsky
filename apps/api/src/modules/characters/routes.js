import { Router } from 'express';

import { getIsCharacter, getMany } from './handlers.js';

const router = Router();

router.get('/', getMany);
router.get('/is-character', getIsCharacter);

export { router as characters };
