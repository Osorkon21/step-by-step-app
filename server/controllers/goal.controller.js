const { User, Goal, Category } = require('../models');
const Model = Goal;

// get all goals
async function getAllItems(req, res) {
  try {
    console.log("get all function")
    const goals = await Model.find()
      .select('-__v')
    res.json({ result: "success!", payload: goals });
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

    res.json({ result: "success!", payload: goal });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// create a goal
async function createItem(req, res) {
  try {
    const goal = await Model.create(req.body.goal);

    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { goals: goal._id } },
      { runValidators: true }
    )

    await Category.findOneAndUpdate(
      { _id: req.body.goal.category },
      { $push: { goals: goal._id } },
      { runValidators: true }
    )

    res.status(200).json({ status: "success", payload: goal })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// update a goal by its id
async function updateItemById(req, res) {
  try {
    const goal = await Model.findOneAndUpdate(
      { _id: req.params.goalId },
      { $set: req.body.goal },
      { runValidators: true, new: true }
    )

    res.json({ result: "success", payload: goal });

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

    await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { goals: goal._id } },
      { runValidators: true }
    )

    const category = await Category.findOneAndUpdate(
      { _id: goal.category },
      { $pull: { goals: goal._id } },
      { runValidators: true }
    )

    res.json({ message: 'Goal successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// create a step
async function createStep(req, res) {
  //example of req.body (note, text not):
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

    res.json("Step successfully added to goal!");

  } catch (err) {
    res.status(500).json(err);
  }
}

// might end up needing update step route, maybe not? we shall find out!

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
