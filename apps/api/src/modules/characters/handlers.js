import validate from 'express-zod-safe';

import { findCharacters, isCharacter } from './services.js';
import { query } from './validations.js';

export const getMany = async (req, res, next) => res.send({ data: await findCharacters() });

export const getIsCharacter = [
	validate({ query }),
	async ({ query }, res, next) => res.send({ isCharacter: await isCharacter(query) }),
];
