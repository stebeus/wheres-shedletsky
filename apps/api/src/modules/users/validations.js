import * as z from 'zod';

import { users } from '#root/db/schema.js';

import { findUser } from './services.js';

const { username } = users;
const alphanumericRegex = /\w/g;

const isUsernameTaken = async (username) => (await findUser(username)) == null;

export const body = z.object({
	username: z
		.string()
		.min(1, 'Field is required')
		.max(username.length, `Username cannot be longer than ${username.length} characters`)
		.regex(alphanumericRegex, 'Username must only contain alphanumeric characters')
		.refine(isUsernameTaken, 'Username is already taken'),
	password: z
		.string()
		.min(4, 'Password must be at least 4 characters long')
		.max(100, 'Password cannot be longer than 100 characters'),
	bestTimeInMs: z.coerce.number(),
});
