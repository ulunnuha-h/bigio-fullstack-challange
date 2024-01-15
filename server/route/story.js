const express = require("express");
const router = express.Router();
const {
  getAllStory,
  addStory,
  getStoryById,
  deleteStory,
  updateStory,
} = require("../controller/story");
const multer = require("multer");
const upload = multer({ dest: "image/" });

router.route("/").get(getAllStory).post(upload.array("image", 12), addStory);
router
  .route("/:id")
  .get(getStoryById)
  .delete(deleteStory)
  .put(upload.array("image", 12), updateStory);

module.exports = router;
