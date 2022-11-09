// Import requirements from mongoose
const { Schema, model } = require('mongoose');

// Declare latout of userSchema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      // Use regex to validate email input in correct format
      validate: {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "please enter a valid email address",
      },
    },
    //Show all user thoughts as an array within the schema model, using thought _id
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    //Show all user friends as an array within the schema model, using friend's user _id
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  // Allow for virtuals
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Create a virtual that tabulates total friends for each user
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Declare User as a Model
const User = model('user', userSchema);

// Export User Model
module.exports = User;
