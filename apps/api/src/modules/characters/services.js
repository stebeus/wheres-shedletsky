import { characters } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';
import { selectExists } from '#root/utils/queries.js';

export const findCharacters = async () => await db.select().from(characters);

export const isCharacter = async ({ name, position }) =>
	await selectExists(characters, `name = ${name} AND position ~= POINT(${position})`);
