const { Schema, model } = require('mongoose');
const stepSchema = require("./stepSchema")

const goalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  steps: [
    stepSchema
  ]
},
  {
    timestamps: true,
  }
);

const Goal = model('Goal', goalSchema);
module.exports = Goal;

// No huge notes on this model- let me know if I should add/omit anything. -LT
