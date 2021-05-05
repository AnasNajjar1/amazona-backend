const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../data');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
}));

module.exports = userRouter;