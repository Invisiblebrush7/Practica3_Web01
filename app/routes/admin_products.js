'use strict';

const express = require('express');
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/').post((req, res) => {
	let newProduct = dataHandler.createProduct(req.body);
	if (newProduct !== undefined) {
		res.status(200).send(newProduct);
	} else {
		res.status(400).send('Error');
	}
});
router
	.route('/:id')
	.put((req, res) => {
		const id = req.params.id;
		let updatedProduct = dataHandler.updateProduct(req.params.id, req.body);
		if (updatedProduct !== undefined) {
			res.status(200).send(updatedProduct);
		} else {
			res.status(400).send('Error');
		}
	})
	.delete((req, res) => {
		if (req.params.id !== undefined) {
			let product = dataHandler.deleteProduct(req.params.id);
			if (product !== undefined) res.status(200).json(product);
			res.status(400).send('Error');
		}
	});

module.exports = router;
