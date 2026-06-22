import { characters } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';

export const findCharacters = async () => await db.select().from(characters);

export const isCharacter = async (table, condition) => {
	const [{ exists }] = await db.execute(
		sql`SELECT EXISTS (SELECT 1 FROM ${characters} WHERE name = ${name} AND position ~= POINT(${position}))`,
	);

	return exists;
};
