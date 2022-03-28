const express = require('express');
const dataHandler = require('./data_handler');
const productRouter = require('../routes/products');
const adminRouter = require('../routes/admin_products');

const router = express.Router();
router.use('/products', productRouter);
// router.use('/admin/products', adminRouter);
router.use('/admin/products', validateAdmin, adminRouter);

function validateAdmin(req, res, next) {
	let adminToken = req.get('x-auth');
	if (adminToken === 'admin') {
		next();
	} else {
		res.status(403).send('No autorizado');
	}
}

module.exports = router;
