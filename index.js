const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
	{
		id: 001,
		task: 'eat yogurt',
	},
	{
		id: 002,
		task: 'make a sandwich',
	},
];

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/tasks', (req, res) => res.send(tasks));

app.get('/task/:id', (req, res) =>
	res.send(tasks.find(task => task.id === +req.params.id))
);

app.put('/updateTask', (req, res) => {
	let index = tasks.findIndex(task => task.id === req.body.id);
	if (index > -1) tasks.splice(index, 1, req.body);
	res.send(tasks);
});

app.post('/task', (req, res) => {
	tasks.push(req.body);
	res.send(tasks);
});

app.delete('/task/:id', (req, res) => {
	let index = tasks.findIndex(task => task.id === +req.params.id);
	if (index > -1) tasks.splice(index, 1);
	res.send(tasks);
});
// To do
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
