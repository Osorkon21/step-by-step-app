const { User } = require('../models');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const Model = User;

function stripPassword(user) {
  const { password, ...payload } = user.toObject()
  return payload
}

function createToken(email, id) {
  return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET)
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
  const strippedUser = stripPassword(user)
  const token = createToken(user.email, user._id)
  return { user: strippedUser, token };
}

// get all users
async function getAllItems(req, res) {
  try {
    const users = await User.find()
      .select('-__v -password')
    res.json(users);
  } catch (err) {
    throw new Error(err)
  }
}


// get one user by id
async function getItemById(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v -password')
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

async function verifyUser(req) {
  const cookie = req.cookies["auth-cookie"]
  if (!cookie) return false

  const isVerified = jwt.verify(cookie, process.env.JWT_SECRET)
  if (!isVerified) return false

  const user = await Model.findOne({ _id: isVerified.id })
  if (!user) return false

  const token = createToken(user.email, user._id)
  const strippedUser = stripPassword(user)
  return { user: strippedUser, token }
}



// signup handler
async function createItem(data) {
  try {
    const user = await Model.create(data) //USER IS CREATED
    const token = createToken(user.email, user._id) // TOKEN CREATED
    const strippedUser = stripPassword(user)
    return { user: strippedUser, token }
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
      .select("-__v -password")
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
    const user = await Model.findByIdAndDelete({ _id: req.params.userId });

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
