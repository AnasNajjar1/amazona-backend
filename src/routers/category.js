const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Category = require('../models/category');
const data = require('../data');
const { isAuth, isAdmin } = require('../utils');

const categoryRouter = express.Router();

categoryRouter.get('/', expressAsyncHandler(async (req, res) => {

    const categories = await Category.find();

}));

categoryRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Category.remove({});
    const createdCategories = await Category.insertMany(data.categories);
    res.send({ createdCategories });
}));

categoryRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(category) {
        res.send(category);
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
}));

categoryRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const category = new Category({
        name: 'sample name' + Date.now(),
        image: '/images/p1.jpg'
    });
    const createdCategory = await category.save();
    res.status(201).send({ message: 'CategoryCreated', category: createdCategory });
}));

categoryRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if(category) {
        category.name = req.body.name;
        category.image = req.body.image;
        const updatedCategory = await category.save();
        res.send({ message: 'Category Updated', category: updatedCategory });
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
}));

categoryRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(category) {
        const deletedCategory = await category.remove();
        res.send({ message: 'Category Deleted', category: deletedCategory });
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
}));

module.exports = categoryRouter;