const app = require('./app');
const request = require('supertest');

describe('GET /healthCheck', () => {
	test('It should respond the GET method', async () => {
		const response = await request(app).get('/healthCheck');
		expect(response.status).toEqual(200);
	});

	test('It should respond with health check object', async () => {
		const response = await request(app).get('/healthCheck');
		expect(response.body).toHaveProperty('uptime');
		expect(response.body).toHaveProperty('message', 'OK');
		expect(response.body).toHaveProperty('timestamp');
	});
});
