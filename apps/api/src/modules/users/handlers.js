import { constants } from 'node:http2';

import validate from 'express-zod-safe';

import { compare, hash } from '#root/utils/auth.js';

import { createUser, findUser, findUsers, updateUser } from './services.js';
import { signinBody, signupBody } from './validations.js';

const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED } = constants;

export const getMany = async (req, res, next) => res.send({ data: await findUsers() });

export const signUp = [
	validate({ body: signupBody }),
	async (req, res, next) => {
		const { username, password, bestTimeInMs } = req.body;

		const hashedPassword = await hash(password);
		const data = await createUser(username, hashedPassword, bestTimeInMs);

		res.status(HTTP_STATUS_CREATED).send({ data });
	},
];

export const signIn = [
	validate({ body: signinBody }),
	async (req, res, next) => {
		const { username, password, bestTimeInMs } = req.body;

		const user = await findUser(username);
		const error = 'Invalid credentials';

		if (user == null) return res.status(HTTP_STATUS_BAD_REQUEST).send({ error });

		const isMatch = await compare(password, user.password);
		if (!isMatch) return res.status(HTTP_STATUS_BAD_REQUEST).send({ error });

		await updateUser(bestTimeInMs, username);

		res.status(HTTP_STATUS_CREATED).send({ data: user });
	},
];
