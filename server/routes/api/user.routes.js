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
  .get(async (req, res) => {
    const { user, token} = await verifyUser(req)  
    
    if (!user) {
      res.status(401).json({ result: "invalid login" })
    } else {
      // const token = createToken(user.email, user._id)
      // const payload = stripPassword(user)
      res.cookie("auth-cookie", token).json({ result: "success", payload })
    }  
  })  
  
  
  router.route("/auth")
  .post(async (req, res) => {
    console.log(req.body)
    try {
      const {user, token} = await authenticate(req.body)
      // const token = createToken(user.email, user._id)
      // const payload = stripPassword(user)
      res.cookie("auth-cookie", token).json({ result: "success", user })
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
  
  
  
  
  // function stripPassword(user) {
    //   const { password, ...payload } = user.toObject()
    //   return payload
    // }
    
    // function createToken(email, id) {
      //   return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET)
      // }
      
      
      // router.get("/:userId", async (req, res) => {
        //   try {
          //     const user = await getUserById(req.params.id)
    
          //     console.log(user)
//     const payload = stripPassword(user)
//     res.status(200).json({ result: "success", payload })
//   } catch (err) {
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

// CHATGPT EXAMPLE
// router.route("/:id")
//   .get(async (req, res, next) => {
  //     try {
    //       await getSingleUser(req, res);
    //     } catch (err) {
      //       next(err); // This passes the error to the Express error handler
      //     }
      //   })
      //   // ... other methods
      
      








      // Declare the routes that point to the controllers above
      // router.get("/", async (req, res) => {
      //   try {
      //     const payload = await getAllUsers()
      //     res.status(200).json({ result: "success", payload })
      //   } catch (err) {
      //     res.status(500).json({ result: "error", payload: err.message })
      //   }
      // })
      
      //this needs to contain the token
      // router.route("/").post(createUser)
      
      // router.post("/", async (req, res) => {
        //   try {
          //     const { user, token } = await createUser(req.body)
//     res.cookie("auth-cookie", token).json({ result: "success", user })
//   } catch (err) {
//     res.status(500).json({ result: "error", payload: err.message })
//   }
// })

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

// Note for this file: I had originally edited each API fetch function to match the format of homeowrk 18, but then realized that we would then be unable to use the password stripping and token functions at the beginning of this document. There might be a way to integrate them into the functionality of the controllers, but I might need a second brain to help me with the routing tomorrow. 