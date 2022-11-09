// const { ObjectId } = require("mongoose").Types;
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
          ? res.status(404).json({ message: "Invalid Id. Could not find user" })
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
              .json({ message: "Invalid ID. Could not update user" })
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
              .json({ message: "Invalid ID. Could not delete User" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and Thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },


//   Add a friend to a user - locate a friend by their _id - and add the friend using their _id
  createFriend(req, res) {
    User.findOneAndUpdate(
        {_id:req.params.userId}, 
        {$addToSet: {friends: req.params.friendId}}, 
    )
    .then((user)=>
    !user ? res.status(404).json({message:"Invalid ID. User not found"})
    : res.json(user)
    )
    .catch((err)=> res.status(500).json(err))
  },
//   Delete a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId}, 
      {$pull: {friends: {friendId: req.params.friendId}}}
    )
    .then((user)=>
      !user ? res.status(404).json({message: 'Could not a delete your friend'})
      : res.json(user)
    )
    .catch((err)=> res.status(500).json(err));
  },
};
