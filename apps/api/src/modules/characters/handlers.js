import validate from 'express-zod-safe';

import { findMany, isCharacter } from './services.js';
import { query } from './validations.js';

export const get = async (req, res) => res.send({ data: await findMany() });

export const getIsCharacter = [
	validate({ query }),
	async (req, res) => {
		const data = await isCharacter(req.query);
		res.send({ data });
	},
];
