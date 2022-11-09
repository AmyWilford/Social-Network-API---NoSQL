const { ObjectId } = require("mongoose").Types;
// Import User and Thought Models
const { User, Thought } = require("../models");

// Export all functions to be used within routes
module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user with their id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User could not be found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a user by its id and run schemaValidations on information
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User could not be found - nothing updated" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user by its id and all linked thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User could not be found - nothing deleted" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and their thoughts have been deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //   Add a friend to a user - locate a friend by their _id - and add the friend using their _id
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Something went wrong - user could not be found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Delete friend - locate a user by their _id - and remove the specified friend using the param specified id
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        console.log(user);
        !user
          ? res.status(404).json({ message: "User could not be found" })
          : res.json(user);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
};
