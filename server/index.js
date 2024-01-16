const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors());
app.use("/api/image", express.static("./image"));
app.use("/api/story", require("./route/story"));
app.use("/api/chapter", require("./route/chapter"));

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Story Chapter API",
  });
});

app.listen(port, () => {
  console.log(`[server] Server is running at Port ${port}`);
});
