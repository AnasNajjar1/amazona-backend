const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../data');
const Product = require('../models/product');
const { isAuth, isAdmin, isSellerOrAdmin } = require('../utils');

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller? { seller } : {};
    const products = await Product.find({...sellerFilter});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
}));

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name' + Date.now(),
        seller: req.user._id,
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description'
    });
    const createdProduct = await product.save();
    res.status(201).send({ message: 'Product Created', product: createdProduct });
}));

productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        const deletedProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deletedProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

module.exports = productRouter;