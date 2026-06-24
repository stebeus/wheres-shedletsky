import { env, loadEnvFile } from 'node:process';

import * as z from 'zod';

try {
	loadEnvFile();
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}

const dbUrlRegex = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

const schema = z.object({
	CLIENT_URL: z.url().default('*'),
	DATABASE_URL: z.url().regex(dbUrlRegex),
	PORT: z.coerce.number().default(3000),
});

const { data, error, success } = z.safeParse(schema, env);

if (!success) throw new Error(z.prettifyError(error));

export const config = data;
