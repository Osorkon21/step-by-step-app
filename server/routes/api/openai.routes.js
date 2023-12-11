const router = require('express').Router();
const { generateSteps } = require("../../../chatgptAssistant")

// GET ALL USERS
router.route("/")
  .post(async (req, res) => {
    try {
      const payload = await generateSteps(req.body)
      res.status(200).json({ result: "success", payload })
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ result: "error", payload: err.message })
    }
  })





  // async function createItem(req, res) {
  //   try {
  //     const goal = await Model.create(req.body.goal);
  
  //     console.log(goal);
  
  //     await User.findOneAndUpdate(
  //       { _id: req.body.userId },
  //       { $push: { goals: goal._id } },
  //       { runValidators: true }
  //     )
  
  //     await Category.findOneAndUpdate(
  //       { _id: req.body.goal.category },
  //       { $push: { goals: goal._id } },
  //       { runValidators: true }
  //     )
  
  //     res.status(200).json({ status: "success", payload: goal })
  
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //   }
  // }