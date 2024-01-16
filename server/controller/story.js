const mySql = require("../config/database");
const fs = require("fs");
const uuid = require("uuid");

const getAllStory = async (req, res) => {
  const query =
    "SELECT * FROM story WHERE (title LIKE ? OR writer LIKE ?) AND category LIKE ? AND status LIKE ?";
  const { key = "", category = "", status = "" } = req.query;

  mySql.query(
    query,
    [
      "%" + key + "%",
      "%" + key + "%",
      "%" + category + "%",
      "%" + status + "%",
    ],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "There's some problem", error: err });
      }

      res.status(200).json({ success: true, data: rows });
    }
  );
};

const getStoryById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM story WHERE id = ?";

  mySql.query(query, id, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "There's some problem", error: err });
    }

    res.status(200).json({ success: true, data: rows });
  });
};

const addStory = async (req, res) => {
  const { files } = req;
  const preUrl = req.protocol + "://" + req.get("host") + "/api/image/";
  const query = "INSERT INTO story SET ?";
  const image = files
    .reduce((cur, val) => {
      return cur + preUrl + val.filename + "$";
    }, "")
    .slice(0, -1);

  const data = { ...req.body, image, id: uuid.v4() };
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

const updateStory = async (req, res) => {
  const { files } = req;
  const preUrl = req.protocol + "://" + req.get("host") + "/api/image/";
  const image = files
    .reduce((cur, val) => {
      return cur + preUrl + val.filename + "$";
    }, "")
    .slice(0, -1);

  const { id } = req.params;
  const data = { ...req.body, image };

  const querySearch = "SELECT * FROM story WHERE id = ?";
  const queryUpdate = "UPDATE story SET ? WHERE id = ?";

  mySql.query(querySearch, id, (err, rows, field) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "There's a problem!", error: err });
    }

    if (rows.length) {
      data.image = rows[0].image;

      if (image) {
        let base = req.protocol + "://" + req.get("host") + "/api";
        url = data.image.replace(base, ".");
        fs.unlinkSync(url);
        data.image = image;
      }

      mySql.query(queryUpdate, [data, id], (err, rows, field) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "There's a problem!", error: err });
        }

        res
          .status(200)
          .json({ success: true, message: "Update data successfully!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Can't find the required data!", success: false });
    }
  });
};

const deleteStory = async (req, res) => {
  const { id } = req.params;

  const querySearch = "SELECT * FROM story WHERE id = ?";
  const queryDelete = "DELETE FROM story WHERE id = ?";

  mySql.query(querySearch, id, (err, data, field) => {
    if (err) {
      return res.status(500).json({ message: "There's a problem", error: err });
    }

    if (data.length) {
      mySql.query(queryDelete, id, (err, rows, field) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "There's a problem", error: err });
        }

        let base = req.protocol + "://" + req.get("host") + "/api";
        let url = data[0].image.replace(base, ".");
        fs.unlinkSync(url);

        res
          .status(200)
          .json({ success: true, message: "Data deleted succesfully!" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Can't find the required data!", success: false });
    }
  });
};

module.exports = {
  getAllStory,
  getStoryById,
  deleteStory,
  updateStory,
  addStory,
};
