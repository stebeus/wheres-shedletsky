import validate from 'express-zod-safe';

import { create, findMany, update } from './services.js';
import { signInSchema, signUpSchema } from './validations.js';

export const get = async (req, res) => res.send({ data: await findMany() });

export const postSignIn = [
	validate({ body: signInSchema }),
	async (req, res) => res.send({ data: await update(req.body) }),
];

export const postSignUp = [
	validate({ body: signUpSchema }),
	async (req, res) => res.send({ data: await create(req.body) }),
];
