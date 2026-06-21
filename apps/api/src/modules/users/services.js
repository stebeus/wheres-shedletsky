import { eq } from 'drizzle-orm';

import { users } from '#root/db/schema.js';
import { db } from '#root/lib/drizzle.js';

export const createUser = async (username, password, bestTimeInMs) =>
	await db.insert(users).values({ username, password, bestTimeInMs }).returning();

export const findUsers = async () => await db.select().from(users).orderBy(users.bestTimeInMs);

export const findUser = async (username) => {
	const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
	return user;
};
