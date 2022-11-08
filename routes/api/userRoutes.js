const router = require("express").Router();

const {
  getUsers, //get all users
  getSingleUser, //get single user by its _id and populated thought and friend data
  createUser, // post a new user
  updateUser, //update a user by its _id
  deleteUser, //remove a user by its _id
  createFriend, // add a new friend to a user's friend list
  deleteFriend, //remove a friend from a user's friend list
} = require("../../controllers/userControllers.js");

//Endpoint: /api/users
router.route("/").get(getUsers).post(createUser);

//Endpoint: /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//Endpoint: api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);
  
module.exports = router;
