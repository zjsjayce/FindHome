const express = require("express");
const db = require("./db.js");
const app = express();

app.use(express.json());
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");

const profile = require("./routes/profile.js");
app.use("/profile", profile.router);

const home = require("./routes/home.js");
app.use("/home", home.router);

const search = require("./routes/search.js");
app.use("/search", search.router);

const application = require("./routes/application.js");
app.use("/application", application.router);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

db.dbConnect().then(() =>
  app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  })
);
