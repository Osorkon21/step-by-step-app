const router = require('express').Router();

// Import any controllers needed here
const { getAllGoals, getGoalById, createGoal, updateGoalById, deleteGoalById, deleteStep, createStep } = require('../../controllers/goal.controller');

//will need to go add step routing to goal controller file, import functions here

// Declare the routes that point to the controllers above

router.route("/")
  .get(getAllGoals)
  .post(createGoal)


router.route("/:goalId")
  .get(getGoalById)
  .put(updateGoalById)


router.route("/:goalId/steps").post(createStep)

router.route("/:goalId/steps/:stepsId").delete(deleteStep)

router.route("/:userId/:goalId")
  .delete(deleteGoalById)

// will need a post route for ("/:userId/goals") use createGoal function here

// will eventually need a route for ("/:GoalId/steps").get and ("/:_id/steps/:_id")to manipulate data within stepSchema, depending on how we want to store and display steps. 


module.exports = router;

// this file does not have the same limitations as the user routes file, but I did not delete the functions here yet because I want to keep the continuity for now. 
