// Import requirements from mongoose
const { Schema, model } = require("mongoose");
// Import reactionSchema to be included as a subdocument schema within thought model
const reactionSchema = require("./Reaction.js");
// Import moment to format createAt date & time
const moment = require("moment");
// Declare layout of thoughtSchema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Set default date to curent date - Use getters to get that date - and use moment to format date and time
      get: (value) => moment(value).format("MMM Do, YYYY [at] hh:mm A"),
    },
    username: {
      type: String, 
      required: true,
    },
    // Embed reacations as a subdocument schema
    reactions: [reactionSchema],
  },
  // Allow for getters and setters
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual that tabulates total reactions for each thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Declare Thought as a Model
const Thought = model("thought", thoughtSchema);

// Export Thought Model
module.exports = Thought;
