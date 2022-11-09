// Import requirements from mongoose
const { Schema, Types } = require("mongoose");
// Import moment to formate createAt date & time
const moment = require("moment");
// Declare layout of reactionSchema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String, 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
// Set default date to curent date - Use getters to get that date - and use moment to format date and time
      get: (value) => moment(value).format("MMM Do, YYYY [at] hh:mm A"),
    },
  },
//   Allow for use of getters
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Export reactionSchema
module.exports = reactionSchema;
