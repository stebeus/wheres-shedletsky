import { sql } from 'drizzle-orm';

import { characters } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';

export const findCharacters = async () => await db.select().from(characters);

export const isCharacter = async (position, name) => {
	const [x, y] = position.split('_');

	return await db.execute(
		sql`SELECT EXISTS (SELECT 1 FROM characters WHERE position ~= point(${x}, ${y}) AND name = ${name})`,
	);
};
