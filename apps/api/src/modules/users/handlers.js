import { constants } from 'node:http2';

import validate from 'express-zod-safe';
import jwt from 'jsonwebtoken';

import { config } from '#root/config.js';
import { compare, hash } from '#root/utils/auth.js';

import { createUser, findUser, findUsers } from './services.js';
import { body } from './validations.js';

const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED } = constants;

export const getMany = async (req, res, next) => res.send({ data: await findUsers() });

export const signUp = [
	validate({ body }),
	async (req, res, next) => {
		const { username, password, bestTimeInMs } = req.body;

		const hashedPassword = await hash(password);
		const data = await createUser(username, hashedPassword, bestTimeInMs);

		res.status(HTTP_STATUS_CREATED).send({ data });
	},
];

export const signIn = async (req, res, next) => {
	const { username, password } = req.body;

	const user = await findUser(username);
	const error = 'Invalid credentials';

	if (user == null) return res.status(HTTP_STATUS_BAD_REQUEST).send({ error });

	const isMatch = await compare(password, user.password);
	if (!isMatch) return res.status(HTTP_STATUS_BAD_REQUEST).send({ error });

	const token = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '1d' });
	res.status(HTTP_STATUS_CREATED).send({ token });
};
