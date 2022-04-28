const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel');

const protect = asyncHandler(async (req,res,next) =>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {

            //split because a token is formated like : 'Bearer '+token, but we just want to grab the token nothing else.
            // [1] because an array starts at index 0 => ['Bearer ','token'] we want only the token.
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token,process.env.SECRET_JWT_TOKEN);

            //get user from the token
            req.user = await UserModel.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized !')
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});

module.exports = { protect }