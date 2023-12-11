const { User, Goal } = require('../models');
const Model = Goal;

// get all goals
async function getAllItems(req, res) {
  try {
    console.log("get all function")
    const goals = await Model.find()
      .select('-__v')
    res.json(goals);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// get one goal by id
async function getItemById(req, res) {
  try {
    const goal = await Model.findOne({ _id: req.params.goalId })

    if (!goal) {
      return res.status(404).json({ message: 'No goal with that ID' })
    }

    res.json(goal);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// create a goal
async function createItem(req, res) {
  try {
    const goal = await Model.create(req.body);
    res.json(goal);

    // const user = await User.findOneAndUpdate(
    //   { _id: req.params.userId },
    //   { $push: { goals: goal.id } }, // might be _id
    //   { runValidators: true, new: true }
    // )

    // if (!user) {
    //   return res.status(404).json({ message: 'No user with that ID' })
    // }


  } catch (err) {
    res.status(500).json(err);
  }
}

// update a goal by its id
async function updateItemById(req, res) {
  try {
    const goal = await Model.findOneAndUpdate(
      { _id: req.params.goalId },
      { $set: req.body },
      { runValidators: true, new: true }
    )

    if (!goal) {
      return res.status(404).json({ message: 'No goal with that ID' })
    }

    res.json(goal);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// delete a goal
async function deleteItemById(req, res) {
  try {
    const goal = await Model.findOneAndDelete({ _id: req.params.goalId });

    if (!goal) {
      return res.status(404).json({ message: 'No such goal exists' });
    }

    // const user = await User.findOneAndUpdate(
    //   { goals: req.params.goalId },
    //   { $pull: { goals: req.params.goalId } },
    //   { runValidators: true, new: true }
    // )

    // if (!user) {
    //   return res.status(404).json({ message: 'No user with that ID' })
    // }

    res.json({ message: 'Goal successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// create a step
async function createStep(req, res) {
  //example of req.body:
  // {
  //   "title": "preheat the oven",
  //    "text": "make sure it is at 400 degrees, and that you have a pan",
  //    "completed": false
  // }

  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.goalId },
      { $push: { steps: req.body } },
      { runValidators: true, new: true }
    )

    if (!goal) {
      return res.status(404).json({ message: 'No goal with that ID' })
    }

    res.json("Reaction successfully added to goal!");

  } catch (err) {
    res.status(500).json(err);
  }
}

// delete a step
async function deleteStep(req, res) {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.goalId },
      { $pull: { steps: { _id: req.params.stepsId } } },
    )

    if (!goal) {
      return res.status(404).json({ message: 'No goal with that ID' })
    }

    res.json({ message: 'Step successfully deleted' });

  } catch (err) {

    res.status(500).json(err);
  }
}


module.exports = {
  getAllGoals: getAllItems,
  getGoalById: getItemById,
  createGoal: createItem,
  updateGoalById: updateItemById,
  deleteGoalById: deleteItemById,
  deleteStep, createStep
}


// step needs ability to update, create, and delete