'use strict';

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/').get((req, res) => {
	console.log(req.query);
	let products = undefined;
	if (req.query.filter === undefined) {
		products = dataHandler.getProducts();
	} else {
		products = dataHandler.findProduct(req.query.filter);
	}
	if (products !== undefined) res.status(200).json(products);
	else res.status(400).send('Error');
});

router.route('/:id').get((req, res) => {
	if (req.params.id !== undefined) {
		let product = dataHandler.getProductByUUID(req.params.id);
		if (product !== undefined) {
			res.status(200).json(product);
		} else {
			res.status(404).send(':(');
		}
	} else {
		let products = dataHandler.getProducts();
		res.status(404).json(products);
	}
});

router.route('/cart').post((req, res) => {
	let proxies = req.body;
	let products = [];

	if (!Array.isArray(proxies)) {
		res.status(400).send('Wrong arguments');
	}
	for (const proxy of proxies) {
		let product = dataHandler.getProductByUUID(proxy.uuid);
		if (product != undefined) {
			products.push(product);
		} else {
			res.status(400).send("Can't find product");
		}
	}
	res.status(200).json(products);
});

module.exports = router;
