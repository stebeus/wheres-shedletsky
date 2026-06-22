import { sql } from 'drizzle-orm';

import { db } from '#root/lib/drizzle.js';

export const selectExists = async (table, condition) => {
	const rawCondition = sql.raw(condition);

	const [{ exists }] = await db.execute(
		sql`SELECT EXISTS (SELECT 1 FROM ${table} WHERE ${rawCondition})`,
	);

	return exists;
};
