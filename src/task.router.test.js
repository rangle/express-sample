const express = require('express');
const request = require('supertest');
const taskRouter = require('./task.router');

const setupTaskRouter = () => {
	const app = express();
	app.use(taskRouter);
	return app;
};

describe('GET /tasks', () => {
	const app = setupTaskRouter();
	
	test('It should respond with a status 200', async () => {
		const response = await request(app).get('/tasks');
		expect(response.status).toEqual(200);
	});

	test('GET /task/:id', async () => {
		const app 
		return request(app)
			.get('/task/1')
			.then(response => {
				expect(response.body).toHaveProperty('uptime');
				expect(response.body).toHaveProperty('message', 'OK');
				expect(response.body).toHaveProperty('timestamp');
			});
	});
});
