const { Schema, model, Types } = require('mongoose');
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid");

// for future data gathering: birthday? phone numbers? photo/avatar?

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trimmed: true,
    required: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Invalid email address! Please try again."]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailToken: {
    // confirm email, will create and store uuid - expiration set time
    type: String,
    default: uuidv4()
  },
  resetToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  },
  username: {
    type: String,
    required: true, // may need to omit to avoid glitches w prev accounts
    unique: true,
    trimmed: true,
    match: [/^([A-Za-z0-9]+)$/, "Username can only contain letters or numbers! Please try again."],
    maxLength: [25, "Username cannot exceed 25 characters!"]
    // later: filter out inappropriate words/censoring
  },
  firstName: {
    type: String,
    match: [/^([A-Za-z]+)$/, "Username may not contain numbers or special characters! Please try again."],
    required: false
  },
  lastName: {
    type: String,
    match: [/^([A-Za-z]+)$/, "Username may not contain numbers or special characters! Please try again."],
    required: false
  },
  userBio: {
    type: String,
    required: false
  },
  pronouns: {
    type: String,
    required: false
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long!"],
    required: [true, "You must create a password!"]
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

userSchema.methods.generateResetToken = function () {
  this.resetToken = crypto.randomBytes(20).toString('hex');
  this.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
  return this.resetToken;
};

const User = model('User', userSchema);
module.exports = User;

// NOTES FOR GROUP: I added a param for username, but I don't think we'll need both usename and email, so tomorrow we can decide which one to pick. Or, if we want to keep both we can! I added a param that references the goals associated with this user, and in the vituals intialized a goal count in case we want to use that data anywhere in the front end logic. If there is any other info we want to gather from a user when they create an account, we can add it to this model! - LT
