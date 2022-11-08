const { Schema, Types } = require("mongoose");
const moment = require("moment");

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
      type: String, //ensure it is the user who created the thought - how to link them
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value) => moment(value).format("MMM Do, YYYY [at] hh:mm A"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
