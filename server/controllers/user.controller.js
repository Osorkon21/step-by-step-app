const { User } = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const Model = User;

async function verifyUser(req) {
  const cookie = req.cookies["auth-cookie"]
  if (!cookie) return false

  const isVerified = jwt.verify(cookie, process.env.JWT_SECRET)
  if (!isVerified) return false

  const user = await Model.findOne({ _id: isVerified.id })
  if (!user) return false

  return user
}

// user authentication
async function authenticate(data) {
  let user

  try {
    user = await Model.findOne({ email: data.email })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

  if (!user) throw new Error("No user found")

  let userIsOk = false
  try {
    userIsOk = await bcrypt.compare(data.password, user.password)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

  if (!userIsOk) throw new Error("Could not login")
  return user;
}

// get all users
async function getAllItems(req, res) {
  try {
    console.log("you hit the controller for ALL USERS")
    const users = await User.find()
      .select('-__v')

    res.json(users);


  } catch (err) {
    throw new Error(err)
  }
}

// get one user by id: testing

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await getUserById(req.params.id)
//     const payload = stripPassword(user)
//     res.status(200).json({ result: "success", payload })
//   } catch (err) {
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// get one user by id
async function getItemById(req, res) {
  try {
    console.log("you hit the controller for SINGLE USER")
    const user = await User.findOne({ _id: req.params })
      .select('-__v')
      .populate('goals')

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }

    res.json({ response: "you hit the controller", user: user });

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// signup handler
async function createItem(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

// update one user by id
async function updateItemById(req, res) {
  try {
    const user = await Model.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}


// delete user by id
async function deleteItemById(req, res) {
  try {
    const user = await Model.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' });
    }

    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getAllUsers: getAllItems,
  getUserById: getItemById,
  createUser: createItem,
  updateUserById: updateItemById,
  deleteUserById: deleteItemById,
  authenticate,
  verifyUser
}
