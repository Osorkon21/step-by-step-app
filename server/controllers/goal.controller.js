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
    const goal = await Model.findOne({ _id: req.params._id })

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

    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { goals: goal.id } }, // might be _id
      { runValidators: true, new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }

    res.json("Goal successfully added to user!");

  } catch (err) {
    res.status(500).json(err);
  }
}

// update a goal by its id
async function updateItemById(req, res) {
  try {
    const goal = await Model.findOneAndUpdate(
      { _id: req.params._id },
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
    const goal = await Model.findOneAndRemove({ _id: req.params._id });

    if (!goal) {
      return res.status(404).json({ message: 'No such goal exists' });
    }

    const user = await User.findOneAndUpdate(
      { goals: req.params.goalId },
      { $pull: { goals: req.params.goalId } },
      { runValidators: true, new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }

    res.json({ message: 'Goal successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getAllGoals: getAllItems,
  getGoalById: getItemById,
  createGoal: createItem,
  updateGoalById: updateItemById,
  deleteGoalById: deleteItemById
}


// step needs ability to update, create, and delete