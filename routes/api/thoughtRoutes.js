const router = require("express").Router();

const {
  getThoughts, //get all thoughts
  getSingleThought, //get single thought by its _id
  createThought, //create new thought - AND PUSH the created thought's _id to the associated user's thoughts array field
  updateThought, //update a thought by its id
  deleteThought, //delete thought by its _id
  createReaction, // to create a reaction stored in a signle thoughts reactions array field
  deleteReaction, //to pull and remove a reaction by the reaction's reactionId value
} = require("../../controllers/thoughtControllers.js");

//Endpoint: /api/thoughts
router.route("/").get(getThoughts).post(createThought);

//Endpoint: /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//Endpoint /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
