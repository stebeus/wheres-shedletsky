import supertest from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '#root/app.js';

const URL = '/api/v1/users';

describe('GET /users', () => {
	it('retrieves all users', async () => {
		const { status, body } = await supertest(app).get(URL);

		expect(status).toBe(200);
		expect(body.data).toBeDefined();
	});
});

describe('GET /users/sign-up', () => {
	it('rejects invalid form data', async () => {
		const { status } = await supertest(app).post(`${URL}/sign-up`).send({ username: 123 });
		expect(status).toBe(400);
	});

	it('creates an user', async () => {
		// Arrange
		const username = crypto.randomUUID();

		// Act
		const { status, body } = await supertest(app)
			.post(`${URL}/sign-up`)
			.send({ username, password: '1357', bestTimeInMs: 1000 });

		const [user] = body.data;

		// Assert
		expect(status).toBe(201);
		expect(user.id).toBeDefined();
	});
});

describe('GET /users/sign-in', () => {
	it('rejects invalid form data', async () => {
		const { status, body } = await supertest(app)
			.post(`${URL}/sign-in`)
			.send({ username: 'john_doe', password: '2467', bestTimeInMs: 1000 });

		expect(status).toBe(400);
		expect(body.error).toBe('Invalid credentials');
	});

	it('retrieves an updated user', async () => {
		const { status, body } = await supertest(app)
			.post(`${URL}/sign-in`)
			.send({ username: 'john_doe', password: '1357', bestTimeInMs: 1000 });

		expect(status).toBe(201);
		expect(body.data.id).toBeDefined();
	});
});
