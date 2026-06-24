import * as z from 'zod';

import { users } from '#root/db/schema.js';

import { isUsernameAvailable } from './services.js';

const { username } = users;
const alphanumericRegex = /\w/g;

export const signinBody = z.looseObject({
	bestTimeInMs: z.coerce.number(),
});

export const signupBody = z.object({
	username: z
		.string()
		.min(1, 'Username is required')
		.max(username.length, `Username cannot be longer than ${username.length} characters`)
		.regex(alphanumericRegex, 'Username must only contain alphanumeric characters')
		.refine(isUsernameAvailable, 'Username is already taken'),
	password: z
		.string()
		.min(4, 'Password must be at least 4 characters long')
		.max(100, 'Password cannot be longer than 100 characters'),
	...signinBody.shape,
});
