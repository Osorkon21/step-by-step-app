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

// GET ALL USERS
router.route("/").get(getAllUsers)
// Declare the routes that point to the controllers above
// router.get("/", async (req, res) => {
//   try {
//     const payload = await getAllUsers()
//     res.status(200).json({ result: "success", payload })
//   } catch (err) {
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// router.route("/verify").get(verifyUser)

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

//  USER BY ID - one user
router.route("/:userId")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById)
// router.get("/:userId", async (req, res) => {
//   try {
//     const user = await getUserById(req.params.id)
//     const payload = stripPassword(user)
//     res.status(200).json({ result: "success", payload })
//   } catch (err) {
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

//this needs to contain the token
// router.route("/").post(createUser)

router.post("/", async (req, res) => {
  try {
    const { user, token } = await createUser(req.body)
    console.log("in route", user, token)
    res.cookie("auth-cookie", token).json({ result: "success", user })
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


// router.route("/:userId").put(updateUserById)
// router.put("/:userId", async (req, res) => {
//   try {
//     const user = await updateUserById(req.params.userId, req.body)
//     console.log("User route put", user)
//     // const payload = stripPassword(user)
//     res.status(200).json({ result: "success", payload })
//   } catch (err) {
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })
// router.route("/:userId").delete(deleteUserById)
// router.delete("/:userId", async (req, res) => {
//   try {
//     const payload = await deleteUserById(req.params.id)
//     res.status(200).json({ result: "success", payload })
//   } catch (err) {
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

module.exports = router;


// Note for this file: I had originally edited each API fetch function to match the format of homeowrk 18, but then realized that we would then be unable to use the password stripping and token functions at the beginning of this document. There might be a way to integrate them into the functionality of the controllers, but I might need a second brain to help me with the routing tomorrow. 
