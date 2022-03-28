const utils = require('./utils');

class ProductException {
	constructor(msg) {
		this.msg = msg;
	}
}

class Product {
	constructor(title, description, imageUrl, unit, stock, pricePerUnit, category) {
		this._uuid = utils.generateUUID(); // Si lo dejas con this.uuid se llama al setter y falla. Con _ no se llama al setter
		this.title = title;
		this.description = description;
		this.imageUrl = imageUrl;
		this.unit = unit;
		this.stock = stock;
		this.pricePerUnit = pricePerUnit;
		this.category = category;
	}

	static createFromJSON(jsonVal) {
		let obj = JSON.parse(jsonVal);
		return Product.createFromObject(obj);
	}

	static createFromObject(obj) {
		let newProduct = {};
		Object.assign(newProduct, obj); // Valida tmb que obj sea un objeto
		Product.cleanObject(obj);

		return new Product(
			newProduct.title,
			newProduct.description,
			newProduct.imageUrl,
			newProduct.unit,
			newProduct.stock,
			newProduct.pricePerUnit,
			newProduct.category
		);
	}

	static cleanObject(obj) {
		let properties = ['title', 'description', 'imageUrl', 'unit', 'stock', 'pricePerUnit', 'category'];
		for (const prop in obj) {
			if (!properties.includes(prop)) {
				delete obj.prop;
			}
		}
	}

	set uuid(uuid) {
		if (uuid) {
			throw new ProductException("UUID's are auto generated");
		}
	}
	set title(title) {
		if (title === undefined || title.length === 0 || typeof title !== 'string') {
			this._title = 'Sin titulo';
			throw new ProductException('Error while updating title');
		} else {
			this._title = title;
		}
	}
	set description(description) {
		if (description === undefined || description.length === 0 || typeof description !== 'string') {
			this._description = 'Sin titulo';
			throw new ProductException('Error while updating description');
		}
		this._description = description;
	}
	set imageUrl(imageUrl) {
		if (imageUrl === undefined || imageUrl.length === 0 || typeof imageUrl !== 'string') {
			this._imageUrl = 'Sin titulo';
			throw new ProductException('Error while updating imageUrl');
		}
		this._imageUrl = imageUrl;
	}
	set unit(unit) {
		if (isNaN(unit) || unit < 0) {
			this._unit = 0;
			throw new ProductException('Error while updating unit');
		} else this._unit = parseInt(unit);
	}
	set stock(stock) {
		if (isNaN(stock) || stock < 0) {
			this._stock = 0;
			throw new ProductException('Error while updating stock');
		} else this._stock = parseInt(stock);
	}
	set pricePerUnit(pricePerUnit) {
		if (isNaN(pricePerUnit) || pricePerUnit < 0.0) {
			this._pricePerUnit = 0.0;
			throw new ProductException('Error while updating pricePerUnit');
		} else this._pricePerUnit = pricePerUnit;
	}
	set category(category) {
		if (category === undefined || category.length === 0 || typeof category !== 'string') {
			this._category = 'Sin titulo';
			throw new ProductException('Error while updating category');
		}
		this._category = category;
	}
	get uuid() {
		return this._uuid;
	}
	get title() {
		return this._title;
	}
	get description() {
		return this._description;
	}
	get imageUrl() {
		return this._imageUrl;
	}
	get unit() {
		return this._unit;
	}
	get stock() {
		return this._stock;
	}
	get pricePerUnit() {
		return this._pricePerUnit;
	}
	get category() {
		return this._category;
	}
}

module.exports = Product;
