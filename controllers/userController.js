const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel');


const registerUser = asyncHandler( async(req,res) =>{

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please add all fields !');
    }

    const userExists = await UserModel.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists !');
    }

    //hash the password.
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password,salt);

    const user = await UserModel.create({
        name : name, 
        email : email,
        password:hashedPassword
    });
    if(user){
        res.status(201).json({
            _id : user._id,
            name :user.name,
            email :user.email,
            password :hashedPassword
        })
    }else{
        res.status(400);
        throw new Error('Invalid user datas !');
    }

    res.status(201).json({ message :  'A new user is added !' })
});



const loginUser = asyncHandler( async(req,res) =>{
    
    const { email , password } = req.body;

    const user = await UserModel.findOne({ email });

    if(user && (await Bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id : user._id,
            name :user.name,
            email :user.email,
            token : generateToken(user.id,user.name,user.email)
        })
    }else{
        res.status(404); 
        throw new Error('Invalid creadentials !');
    }
});


const getMe = asyncHandler(async (req,res) =>{
    res.status(200).json({ message :'Yeah, this is actually me !' });
});


const generateToken = (id,name,email) =>{
    return jwt.sign({
        id,
        name,
        email
    },process.env.SECRET_JWT_TOKEN,{
        expiresIn:'1d'
    })
};


module.exports = {
    registerUser,
    loginUser,
    getMe
};