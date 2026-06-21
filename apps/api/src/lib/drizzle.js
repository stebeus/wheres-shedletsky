import { drizzle } from 'drizzle-orm/postgres-js';

import { config } from '#root/config.js';
import { relations } from '#root/db/relations.js';

export const db = drizzle({
	casing: 'snake_case',
	connection: config.DATABASE_URL,
	relations,
});
