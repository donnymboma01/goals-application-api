const asyncHandler = require('express-async-handler'); // => cette dependance va nous eviter d'ecrire tout le temps des try...catch

const GoalModel = require('../models/goalsModel');
const UserModel = require('../models/userModel');



const getGoals = asyncHandler(async (req,res) =>{
    
    const goals = await GoalModel.find({ user :req.user.id }); //=> cette ligne fait en sorte de ne voir que les goals postés par un user bien specifique selon son token !

    res.status(200).json(goals);
});

// @desc Add a new goal 

const postGoal =asyncHandler( async (req,res) =>{
    
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field !');
    }else{

        const goal = await GoalModel.create({ 
            text : req.body.text,
            user : req.user.id
        });

        res.status(201).json({ message : 'A new goal is created !' });
    }
    
});

const updateGoal =asyncHandler( async (req,res) =>{
    
    const goal = await GoalModel.findById(req.params.id);

    if(!goal){
        res.status(404);
        throw new Error('Goal not found !');
    }

    const user = await UserModel.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found !');
    }

    //make sure the logged user matches the goal user

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not Authorized !');
    }

    const updatedGoal =  await GoalModel.findByIdAndUpdate(req.params.id,req.body,{
        new :true
    });

    res.status(200).json(updatedGoal);
});


const deleteGoal =asyncHandler( async (req,res)=>{
    
    const goal = await GoalModel.findById(req.params.id);

    if(!goal){
        res.status(404);
        throw new Error('Goal not found !');
    }

    const user = await UserModel.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found !');
    }

    //make sure the logged user matches the goal user

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not Authorized !');
    }

    await goal.remove();
    res.status(200).json({ id : req.params.id });
});

module.exports = {
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal
};