const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const db = require("../db.js");

// /* find all homes
// router.get("/", async function (req, res) {
//   try {
//     const cursor = await db.findAllHomes();
//     const data = await cursor.toArray();
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

/* find home by id */
router.get("/:id", async function (req, res) {
  try {
    const data = await db.findHomeById(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

/* find home by landloard*/
router.get("/landlord/:id", async function (req, res) {
  try {
    const cursor = await db.findHomeByLandlord(req.params.id);
    const data = await cursor.toArray();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

// // find home by price, 1 is low to high, -1 is high to low
// router.get("/price/:num", async function (req, res) {
//   try {
//     var mysort = { "home.price": req.params.num }
//     const cursor = await db.findAllHomes();
//     const data = await cursor.sort(mysort).toArray();
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

// /* find home by type */
// router.get("/type/:num", async function (req, res) {
//   try {
//     const cursor = await db.findHomeByType(req.params.num);
//     const data = await cursor.toArray();
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

/* create home*/
router.post("/create", async function (req, res) {
  try {
    const data = await db.createHome(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/* update home */
router.post("/:id/update", async function (req, res) {
  try {
    const data = await db.updateHome(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/* delete home */
router.delete("/:id", async function (req, res) {
  try {
    const data = await db.deleteHome(req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports.router = router;