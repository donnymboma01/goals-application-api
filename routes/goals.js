const express = require('express'); //=> commonjs syntaxe
const router =  express.Router();

const { protect } = require('../middlewares/authMiddleware');

const { 
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal 
} = require('../controllers/goalController');


router.get('/',protect, getGoals);

router.post('/',protect, postGoal);

router.put('/:id',protect, updateGoal);

router.delete('/:id',protect,deleteGoal);



module.exports = router;