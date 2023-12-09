const db = require("../config/connection")
const Category = require("../models/Category")

const seedData = [
  {
    name: "Social",
    goals: []
  },
  {
    name: "Travel",
    goals: []
  },
  {
    name: "Entertainment",
    goals: []
  },
  {
    name: "Skill",
    goals: []
  },
  {
    name: "Misc.",
    goals: []
  }
]

db.once('open', async () => {
  await Category.insertMany(seedData)
  console.log("seeding complete")
  process.exit(0)
});

/*
  To seed data:

  1. Import your model
  2. Create an array of data with the variable name seedData
  3. Uncomment the code above and replace MODEL with your imported model

*/
