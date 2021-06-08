const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../data');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils');
const { isAuth, isAdmin } = require('../utils');

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
}));


userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({ name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8) });
    const createdUser = await user.save();
    res.send({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createdUser)
    });
}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(user.isSeller) {
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.sellerLogo || user.seller.logo;
            user.seller.description = req.body.sellerDescription || user.seller.description;
        }
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(updatedUser)
        });
    }
}));

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
}));

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        if(user.email==='admin@example.com') {
            res.status(400).send({ message: 'Can Not Delete Admin User' });
            return;
        }
        const deletedUser = await user.remove();
        res.status(200).send({ message: 'User Deleted', user: deletedUser });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
}));

userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isSeller = req.body.isSeller || user.isSeller;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
}));

module.exports = userRouter;