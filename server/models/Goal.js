const { Schema, model } = require('mongoose');
const stepSchema = require("./stepSchema")

const goalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
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


//user id, then will need to populate it (if we want to display all user info)

// No huge notes on this model- let me know if I should add/omit anything. -LT
// Info attached with thread is stored with an Id, assistant can refer back to an Id

