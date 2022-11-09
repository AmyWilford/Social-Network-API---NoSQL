// const { ObjectId } = require("mongoose").Types;
// Import User and Thought Models
const { Thought, User } = require("../models");

// Export all functions to be used within routes
module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //   Get a single thought by id
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
  //   Create a new thought - find thought user and push new thought to thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } }, 
          {new: true}
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
  //   Update a thought by its id
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
  //   Delete a thought by its id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
        ? res.status(404).json({ message: "Thought could not be found - nothing deleted" })
        : User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: thought._id } }, 
            {new: true}
          )
          )
      .then((user)=> 
      !user ? res.status(404).json({message: 'Your thought was deleted - but an associated user could not be found'})
      :res.json({ message: 'Thought has been deleted - and user record updated'})
      )
      .catch((err)=> {
        console.log(err);
        res.status(500).json(err);
      })      
  },
  // Create a reaction to a thought - find the linked thought and add the new reaction to the thought document
  createReaction(req, res) {
    console.log(req.params);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought could not be found - your reacting to nothing" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //   Delete a reaction
  //   Find the thought associated with the thought using its id - and pull the reaction by its id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Your reaction could not be find - nothing deleted",
            })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
