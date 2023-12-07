const router = require('express').Router();
const jwt = require("jsonwebtoken")
require("dotenv").config();

// Import any controllers needed here
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  authenticate,
  verifyUser
} = require('../../controllers/user.controller');

function stripPassword(user) {
  const { password, ...payload } = user.toObject()
  return payload
}


function createToken(email, id) {
  return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET)
}

// Declare the routes that point to the controllers above
router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUserById).delete(deleteUserById)

router.route("/api/users/:userId/friends/:friendId").post(createUser).delete(deleteUserById);

module.exports = router;
