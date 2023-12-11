const { Schema, model, Types } = require('mongoose');
const stepSchema = require("./stepSchema")

const goalSchema = new Schema({
  goalId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
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
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
    id: false,
  }
);

goalSchema.virtual("stepsCount").get(function () {
  const stCount = this.steps.length;
  return stCount;
})

goalSchema.virtual("completedStepCount").get(function () {

  var CSCount = 0;
  for (i = 0; i < this.steps.length; i++) {
    if (this.steps[i].completed) {
      CSCount++
    }
  }

  return CSCount;
})

const Goal = model('Goal', goalSchema);
module.exports = Goal;


//user id, then will need to populate it (if we want to display all user info)

// No huge notes on this model- let me know if I should add/omit anything. -LT
// Info attached with thread is stored with an Id, assistant can refer back to an Id

