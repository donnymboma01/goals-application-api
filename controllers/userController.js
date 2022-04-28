const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel');


const registerUser = asyncHandler( async(req,res) =>{
    //console.log(req.body);
    //res.status(200).json({ message :'Register a new user ' });

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please add all fields !');
    }
});


const loginUser = asyncHandler( async(req,res) =>{
    //console.log(req.body);
    res.status(200).json({ message :'Login user ' });
});


const getMe = asyncHandler(async (req,res) =>{
    res.status(200).json({ message :'Yeah, this is actually me !' });
});


module.exports = {
    registerUser,
    loginUser,
    getMe
};