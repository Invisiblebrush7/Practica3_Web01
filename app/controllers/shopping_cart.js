'use strict';

class ShoppingCart {
	constructor() {
		this._products = [];
		this._productProxies = [];
	}
	addItem(uuid, amount) {
		if (amount <= 0) {
			throw new ShoppingCartException(`Error while adding item with uuid ${uuid}`);
		}
		let flag = false; // See if the product is already in productProxies
		for (let productProxy in this.productProxies) {
			if (productProxy.uuid === uuid) {
				flag = true;
				productProxy.amount = productProxy.amount + amount;
				break;
			}
		}
		if (!flag) {
			this.productProxies.push(new ProductProxy(uuid, amount));
		}
	}
	updateItem(uuid, amount) {
		if (amount < 0) {
			throw new ShoppingCartException(`Error while adding item with uuid ${uuid}`);
		}

		for (let productProxy of this.productProxies) {
			if (productProxy.uuid === uuid && amount > 0) {
				productProxy.amount = amount;
				break;
			} else if (productProxy.uuid === uuid && amount === 0) {
				this.removeItem(uuid);
			}
		}
	}
	removeItem(uuid) {
		const index = this._productProxies.findIndex((productProxy) => {
			productProxy.uuid === uuid;
		});
		this._productProxies.splice(index, 1);
	}
	calcTotal() {
		let total = 0.0;

		for (let index = 0; index < this.productProxies.length; index++) {
			let uuid = this.productProxies[index].uuid;
			let product = DataHandler.getProductByUUID(uuid);
			if (product !== undefined) {
				total = total + this.productProxies[index].amount * product.pricePerUnit;
			}
		}
		return total;
	}
	set products(val) {
		this._products = [];
		if (val) {
			throw new ShoppingCartException("Can't modify products");
		}

		for (const productUUID of this.productProxies) {
			this._products.push(DataHandler.getProductByUUID(productUUID));
		}
	}
	set productProxies(val) {
		if (val) {
			throw new ShoppingCartException("Can't modify productProxies like that");
		}
	}
	get productProxies() {
		return this._productProxies;
	}
	get products() {
		return this._products;
	}
}

class ProductProxy {
	constructor(uuid, amount) {
		this.uuid = uuid;
		this.amount = amount;
	}
	get uuid() {
		return this._uuid;
	}
	get amount() {
		return this._amount;
	}
	set uuid(val) {
		if (val !== undefined && val !== '') {
			this._uuid = val;
		}
	}
	set amount(val) {
		if (val !== undefined && !isNaN(val)) {
			this._amount = val;
		}
	}
}
class ShoppingCartException {
	constructor(msg) {
		this.msg = msg;
	}
}

module.exports = ShoppingCart;
