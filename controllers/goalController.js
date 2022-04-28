const getGoals = (req,res) =>{
    res.status(200).json({ message :' Get all goals from the database' });
};

// @desc Add a new goal

const postGoal = (req,res) =>{
    //res.status(201).json({ message : 'Create a new goal' });
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field !');
    }else{
        res.status(201).json({ message : 'A new goal is created !' });
    }
    
};

const updateGoal = (req,res) =>{
    res.status(200).json({ message :` Update goal ${req.params.id}` });
};

const deleteGoal = (req,res)=>{
    res.status(200).json({ message : `Delete goal ${req.params.id}` });
};

module.exports = {
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal
};