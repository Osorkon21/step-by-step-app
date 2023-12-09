const router = require('express').Router();

// Import any controllers needed here
const { getAllGoals, getGoalById, createGoal, updateGoalById, deleteGoalById } = require('../../controllers/goal.controller');

//will need to go add step routing to goal controller file, import functions here

// Declare the routes that point to the controllers above

router.route("/")
  .get(getAllGoals)
  .post(createGoal)

router.route("/:_id")
  .get(getGoalById)
  .put(updateGoalById)
  .delete(deleteGoalById)


module.exports = router;

// this file does not have the same limitations as the user routes file, but I did not delete the functions here yet because I want to keep the continuity for now. 
