const express = require("express");
const router = express.Router();
const {
  getAllChapter,
  getChapterById,
  addChapter,
  deleteChapter,
  updateChapter,
} = require("../controller/chapter");

router.route("/:id").get(getAllChapter).post(addChapter);
router
  .route("/:id/:chapterId")
  .get(getChapterById)
  .put(updateChapter)
  .delete(deleteChapter);

module.exports = router;
