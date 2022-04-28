const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name :{
        type:String,
        required :[true,'Please enter a name !']
    },
    email :{
        type:String,
        required:[true,'Please enter you email !'],
        unique :true
    },
    password :{
        type:String,
        required:[true,'Please enter you password !']
    }
},{
    timestamps :true
});

const user = mongoose.model('user',UserSchema);

module.exports = user;