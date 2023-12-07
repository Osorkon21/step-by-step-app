const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true
  },
  email: {
    type: String,
    required: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Incorrect format! Please try again."]
  },
  password: {
    type: String,
    required: true
  },
  goals: [{
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  }]
}, {
  timestamps: true
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


userSchema.virtual("goalsCount").get(function () {
  const glCount = this.goals.length;
  return glCount;
})


userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


const User = model('User', userSchema);
module.exports = User;

// NOTES FOR GROUP: I added a param for username, but I don't think we'll need both usename and email, so tomorrow we can decide which one to pick. Or, if we want to keep both we can! I added a param that references the goals associated with this user, and in the vituals intialized a goal count in case we want to use that data anywhere in the front end logic. If there is any other info we want to gather from a user when they create an account, we can add it to this model! 