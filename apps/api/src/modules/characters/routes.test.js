import supertest from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '#root/app.js';

const URL = '/api/v1/characters';

describe('GET /characters', () => {
	it('gets all characters', async () => {
		const { status, body } = await supertest(app).get(URL);

		expect(status).toBe(200);
		expect(body.data).toBeDefined();
	});
});

describe('GET /characters/is-character', () => {
	it.for`
		case            | query
		${'empty'}      | ${''}
		${'incomplete'} | ${'name=john_doe'}
		${'invalid'}    | ${'name=1&position=john_doe'}
	`('rejects requests with $case query parameters', async ({ query }) => {
		const { status } = await supertest(app).get(`${URL}/is-character?${query}`);
		expect(status).toBe(400);
	});

	it("gets the confirmation of the character's existence", async () => {
		const { status, body } = await supertest(app).get(
			`${URL}/is-character?name=john_doe&position=1,1`,
		);

		expect(status).toBe(200);
		expect(body.data).toBeTypeOf('boolean');
	});
});
