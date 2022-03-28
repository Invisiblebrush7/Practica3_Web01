'use strict';

const fs = require('fs');
const Product = require('./product');

class DataHandler {
	static products = JSON.parse(fs.readFileSync('./app/data/products.json'));

	static saveFile() {
		fs.writeFileSync('./app/data/products.json', JSON.stringify(DataHandler.products));
	}

	static getProducts() {
		return DataHandler.products;
	}
	static getProductByUUID(_uuid) {
		let product = DataHandler.getProducts().find((product) => product._uuid === _uuid);
		return product;
	}
	static createProduct(product) {
		let newProduct = Product.createFromObject(product);
		DataHandler.getProducts().push(newProduct);
		DataHandler.saveFile();
		return newProduct;
	}
	static updateProduct(uuid, updatedProduct) {
		let productToChange = DataHandler.getProductByUUID(uuid);
		if (productToChange === undefined || updatedProduct === undefined) return undefined;

		for (let property in updatedProduct) {
			if (property !== 'uuid') {
				let subproperty = `_${property}`;

				productToChange[subproperty] = updatedProduct[property];
			}
		}
		DataHandler.saveFile();
		return productToChange;
	}
	static deleteProduct(_uuid) {
		let index = DataHandler.getProducts().findIndex((product) => product['_uuid'] === _uuid);
		let product = undefined;
		if (index !== -1) {
			product = DataHandler.getProducts()[index];
			DataHandler.getProducts().splice(index, 1);
		}
		DataHandler.saveFile();
		return product;
	}
	static findByTitle(title) {
		let productsFiltered = [];
		DataHandler.getProducts().forEach((element) => {
			if (element._title.toLowerCase().includes(title)) {
				productsFiltered.push(element);
			}
		});
		return productsFiltered;
	}
	static findByCategory(category) {
		let productsFiltered = [];
		DataHandler.getProducts().forEach((element) => {
			if (element._category.toLowerCase().includes(category)) {
				productsFiltered.push(element);
			}
		});
		return productsFiltered;
	}
	static findByCategoryAndTitle(category, title) {
		let filteredByTitle = DataHandler.findByTitle(title);
		let filteredByCategory = DataHandler.findByCategory(category);

		let uuids = new Set(filteredByTitle.map((product) => product.uuid));
		let productsFiltered = [...filteredByTitle, ...filteredByCategory.filter((product) => !uuids.has(product.uuid))];

		return productsFiltered;
	}
	static findProduct(query) {
		let products;
		if (query !== undefined && typeof query === 'string') {
			query = query.split(':'); // Could be ["category", "title"], [ "<category>", "" ] or [ "<title>" ]
			if (query.length === 1) {
				// Only title
				products = DataHandler.findByTitle(query[0].toLowerCase());
			} else if (query.length === 2 && query[1] === '') {
				// Only category
				products = DataHandler.findByCategory(query[0].toLowerCase());
			} else {
				// Both
				products = DataHandler.findByCategoryAndTitle(query[0].toLowerCase(), query[1].toLowerCase());
			}
		}
		return products;
	}
}

module.exports = DataHandler;
