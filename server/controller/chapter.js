const mySql = require("../config/database");
const uuid = require("uuid");

const addChapter = (req, res) => {
  const { id } = req.params;
  const { title, story } = req.body;
  const data = {
    id: uuid.v4(),
    title,
    story,
    story_id: id,
  };

  const query = "INSERT INTO chapter SET ?";
  mySql.query(query, data, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to insert data!", error: err });
    }

    res
      .status(201)
      .json({ success: true, message: "Data inserted succesfully!", data });
  });
};

const getAllChapter = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM chapter WHERE story_id = ?";

  mySql.query(query, id, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "There's some problem", error: err });
    }

    res.status(200).json({ success: true, data: rows });
  });
};

const getChapterById = (req, res) => {
  const { id, chapterId } = req.params;
  const query = "SELECT * FROM chapter WHERE story_id = ? AND id = ?";

  mySql.query(query, [id, chapterId], (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "There's some problem", error: err });
    }

    res.status(200).json({ success: true, data: rows });
  });
};
const updateChapter = (req, res) => {
  const { id, chapterId } = req.params;
  const { title, story } = req.body;

  const data = { title, story };
  const querySearch = "SELECT * FROM chapter WHERE story_id = ? AND id = ?";
  const queryUpdate = "UPDATE chapter SET ? WHERE story_id = ? AND id = ?";

  mySql.query(querySearch, [id, chapterId], (err, rows, field) => {
    if (err) {
      return res.status(500).json({ message: "There's a problem", error: err });
    }

    if (rows.length) {
      mySql.query(queryUpdate, [data, id, chapterId], (err, rows, field) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "There's a problem", error: err });
        }

        res
          .status(200)
          .json({ success: true, message: "Data updated succesfully!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Can't find the required data!!", success: false });
    }
  });
};
const deleteChapter = (req, res) => {
  const { id, chapterId } = req.params;

  const querySearch = "SELECT * FROM chapter WHERE story_id = ? AND id = ?";
  const queryDelete = "DELETE FROM chapter WHERE story_id = ? AND id = ?";

  mySql.query(querySearch, [id, chapterId], (err, data, field) => {
    if (err) {
      return res.status(500).json({ message: "There's a problem", error: err });
    }

    if (data.length) {
      mySql.query(queryDelete, [id, chapterId], (err, rows, field) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "There's a problem", error: err });
        }
        res
          .status(200)
          .json({ success: true, message: "Data deleted succesfully!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Can't find the required data!!", success: false });
    }
  });
};

module.exports = {
  addChapter,
  getAllChapter,
  getChapterById,
  updateChapter,
  deleteChapter,
};
