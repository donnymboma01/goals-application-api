const mongoose = require('mongoose');

const GoalsSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required :true,
        ref:'user'
    },
    text : {
        type :String,
        required :[true, 'Please add a text value'],
    }
},{
    timestamps : true
});

const goals = mongoose.model('Goal',GoalsSchema);
module.exports = goals;