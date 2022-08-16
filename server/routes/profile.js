const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const db = require("../db.js");

/* create user */
router.post("/create", async function (req, res) {
  try {
    const data = await db.createUser(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/* find user */
router.get("/:id", async function (req, res) {
  try {
    const data = await db.findUser(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

/* update user profile */
router.post("/:id/update", async function (req, res) {
  try {
    const data = await db.updateUser(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports.router = router;
