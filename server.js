'use strict';
const express = require('express');
const router = require('./app/controllers/router');

const app = express();
const port = 3000;

app.use(express.json()); // Use express body-parser to parse all request bodies
app.use('/', router); // Use the file of router to get routes

// req es lo que pide el cliente
// res es lo que enviamos

app.get('/', (req, res) => {
	res.sendFile('home.html', { root: './app/views' });
});
app.get('/home', (req, res) => {
	res.sendFile('home.html', { root: './app/views' });
});
app.get('/shopping_cart', (req, res) => {
	res.sendFile('shopping_cart.html', { root: './app/views' });
});
app.listen(port, () => {});
