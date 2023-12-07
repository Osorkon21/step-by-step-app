const { Schema, model } = require('mongoose');

const goalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (time) {
      return new Date(time).toLocaleDateString()
    }
  },
  steps: [{
    type: Schema.Types.ObjectId,
    ref: 'Step'
  }]
});

const Goal = model('Goal', goalSchema);
module.exports = Goal;

// No huge notes on this model- let me know if I should add/omit anything. -LT
