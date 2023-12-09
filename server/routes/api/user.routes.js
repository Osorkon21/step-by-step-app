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
  console.log("you hit the strip pass function", user)
  const { password, ...payload } = user.toObject()
  return payload
}

async function stripPasswordMiddleware(req, res, next) {
  if (req.user) {
    req.user = stripPassword(req.user);
    console.log("this is req.user:", req.user)
  }
  next();
}

function createToken(email, id) {
  return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET)
}

// get all users
router.route("/").get(getAllUsers)  // the route to the left works in insomnia


router.get("/verify", async (req, res) => {
  const user = await verifyUser(req)
  if (!user) {
    res.status(401).json({ result: "invalid login" })
  } else {
    const token = createToken(user.email, user._id)
    const payload = stripPassword(user)
    res.cookie("auth-cookie", token).json({ result: "success", payload })
  }
})

router.route("/:_id").get(getUserById, stripPasswordMiddleware, (req, res) => {
  res.json({ status: "you hit this response!", body: req.user });
});

// router.route("/:_id").get(getUserById) // the route to the left works in insomnia but does not strip password 

router.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body)
    const token = createToken(user.email, user._id)
    const payload = stripPassword(user)
    res.cookie("auth-cookie", token).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/auth", async (req, res) => {
  try {
    const user = await authenticate(req.body)
    const token = createToken(user.email, user._id)
    const payload = stripPassword(user)
    res.cookie("auth-cookie", token).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: "Could not authenticate user" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body)
    const payload = stripPassword(user)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteUserById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

module.exports = router;


// Note for this file: I had originally edited each API fetch function to match the format of homeowrk 18, but then realized that we would then be unable to use the password stripping and token functions at the beginning of this document. There might be a way to integrate them into the functionality of the controllers, but I might need a second brain to help me with the routing tomorrow. 