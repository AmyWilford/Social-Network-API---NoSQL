// Import express router
const router = require("express").Router();

// Require controller functions (imported from thoughtControllers)
const {
  getThoughts, 
  getSingleThought, 
  createThought, 
  updateThought, 
  deleteThought, 
  createReaction, 
  deleteReaction, 
} = require("../../controllers/thoughtControllers.js");

//Set Endpoint: /api/thoughts
router.route("/").get(getThoughts).post(createThought);

//Set Endpoint: /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//Set Endpoint /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

//Set Endpoint /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// export router
module.exports = router;
