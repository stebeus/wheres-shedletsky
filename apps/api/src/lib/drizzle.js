import { drizzle } from 'drizzle-orm/postgres-js';

import { config } from '#root/config.js';

export const db = drizzle({
	casing: 'snake_case',
	connection: config.DATABASE_URL,
});
