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

// GET ALL USERS
router.route("/")
  .get(getAllUsers)
  .post(async (req, res) => {
    try {
      const { user, token } = await createUser(req.body)
      res.cookie("auth-cookie", token).json({ result: "success", user })
    } catch (err) {
      res.status(500).json({ result: "error", payload: err.message })
    }
  })


router.route("/verify")
  .post(async (req, res) => {
    try {
      const { user, token } = await verifyUser(req)

      if (!user) {
        res.status(401).json({ result: "invalid login" })
      } else {
        res.cookie("auth-cookie", token).json({ result: "success", payload: user })
      }
    }
    catch (err) {
      console.log(err.message)
      res.status(500).json({ result: "error", payload: err.message });
    }
  })


router.route("/auth")
  .post(async (req, res) => {
    try {
      const { user, token } = await authenticate(req.body)
      res.cookie("auth-cookie", token).json({ result: "success", payload: user })
    } catch (err) {
      res.status(500).json({ result: "error", payload: "Could not authenticate user" })
    }
  })

//  USER BY ID - one user
router.route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)

module.exports = router;
