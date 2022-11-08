const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Invalid Id. Could not find your thought" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } }
        );
      })
      .then((userData) => {
        console.log(userData);
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Invalid ID. Could not update your thought" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Invalid ID. Could not delete your thought" })
          : res.json({ message: "Thought Deleted!" })
      )
      //   .then(() => res.json({ message: "Thought Deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  //  >>> HELP <<<
  // Create a reaction to a thought
  createReaction(req, res) {
    console.log("========= ADDING A REACTION ============");
    console.log(req.params)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Invalid ID. No thought found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //    >>> HELP <<<
  //   Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Invalid reaction ID. Could not remove reaction",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
