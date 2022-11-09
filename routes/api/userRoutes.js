// Import express router
const router = require("express").Router();

// Require controller functions (imported from userControllers)
const {
  getUsers,
  getSingleUser,
  createUser, 
  updateUser, 
  deleteUser, 
  createFriend, 
  deleteFriend, 
} = require("../../controllers/userControllers.js");

//Set Endpoint: /api/users | clarify CRUD operations and linked functions for endpoint
router.route("/").get(getUsers).post(createUser);

//Set Endpoint: /api/users/:userId | clarify CRUD operations and linked functions for endpoint
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//Set Endpoint: api/users/:userId/friends/:friendId |clarify CRUD operations and linked functions for endpoint
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

//   Export Router
module.exports = router;
