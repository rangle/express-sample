const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const taskRouter = require('../task.router');

taskRouter.stack[0].handle = null;
taskRouter.stack[0].handle = (req, res, next) => {
	res.locals.db = {
		all: (sql, params, callback) => {
			callback(null, [
				{
					id: 1,
					task: 'eat pie',
				},
				{
					id: 2,
					task: 'walk the dog',
				},
			]);
		},
		get: (sql, params, callback) => {
			callback(null, {
				id: 1,
				task: 'eat pie',
			});
		},
		run: (sql, params, callback) => {
			callback(null);
		},
	};
	next();
};

const setupTaskRouter = () => {
	const app = express();
	app.use(bodyParser.json());
	app.use(taskRouter);
	return app;
};

describe('GET /tasks', () => {
	const app = setupTaskRouter();

	test('It should respond with a status 200', async () => {
		const response = await request(app).get('/tasks');
		expect(response.status).toEqual(200);
	});

	test('It should respond with all tasks', async () => {
		const response = await request(app).get('/tasks');
		expect(response.body).toEqual([
			{
				id: 1,
				task: 'eat pie',
			},
			{
				id: 2,
				task: 'walk the dog',
			},
		]);
	});
});

describe('GET /task/:id', () => {
	const app = setupTaskRouter();

	test('It should respond with a status 200', async () => {
		const response = await request(app).get('/task/1');
		expect(response.status).toEqual(200);
	});

	test('', async () => {
		const response = await request(app).get('/task/1');
		expect(response.body).toEqual({
			id: 1,
			task: 'eat pie',
		});
	});
});

describe('DELETE /task/:id', () => {
	const app = setupTaskRouter();

	test('', async () => {
		const response = await request(app).delete('/task/1');
		expect(response.body).toEqual({ message: 'deleted' });
	});
	test('It should respond with a status 200', async () => {
		const response = await request(app).delete('/task/1');
		expect(response.status).toEqual(200);
	});
});

describe('PUT /task', () => {
	const app = setupTaskRouter();

	test('', async () => {
		const response = await request(app)
			.put('/task')
			.send({ id: 1, task: 'talks' });
		expect(response.body).toEqual({ message: 'updated' });
	});
	test('It should respond with a status 200', async () => {
		const response = await request(app)
			.put('/task')
			.send({ id: 1, task: 'talks' });
		expect(response.status).toEqual(200);
	});
});

describe('POST /task', () => {
	const app = setupTaskRouter();

	test('', async () => {
		const response = await request(app)
			.post('/task')
			.send({ id: 1, task: 'talks' });
		expect(response.body).toEqual({ message: 'posted' });
	});
	test('It should respond with a status 200', async () => {
		const response = await request(app)
			.post('/task')
			.send({ id: 1, task: 'talks' });
		expect(response.status).toEqual(200);
	});
});
