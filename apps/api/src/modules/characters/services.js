import { sql } from 'drizzle-orm';

import { characters } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';

export const findMany = async () => await db.select().from(characters);

export const isCharacter = async ({ name, position: [x, y] }) => {
	const query = sql`
    SELECT EXISTS (
      SELECT 1
      FROM ${characters}
      WHERE ${characters.name} = ${name}
        AND ${characters.position} ~= point(${x}, ${y})
    )
  `;

	const [{ exists }] = await db.execute(query);

	return exists;
};
