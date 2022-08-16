const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const db = require("../db.js");

/* find applications by landlord */
router.get("/landlord/:userid", async function (req, res) {
  try {
    const cursor = await db.findApplicationsByLandlord(req.params.userid);
    const data = await cursor.toArray();
    for (var i=0;i<data.length;i++)
    {
      const data1 = await db.findUser(data[i].applicant.sub);
      var key1 = "nickname"
      var value1 = data1.user.nickname
      var key2 = "career"
      var value2 = data1.user.career
      var key3 = "phone"
      var value3 = data1.user.phone
      var key4 = "email"
      var value4 = data1.auth0.email
      data[i].applicant[key1]=value1
      data[i].applicant[key2]=value2
      data[i].applicant[key3]=value3
      data[i].applicant[key4]=value4
    }
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

/* find applications by applicant */
router.get("/applicant/:userid", async function (req, res) {
  try {
    const cursor = await db.findApplicationsByApplicant(req.params.userid);
    const data = await cursor.toArray();
    for (var i=0;i<data.length;i++)
    {
      const data1 = await db.findUser(data[i].landlord.sub);
      var key1 = "nickname"
      var value1 = data1.user.nickname
      var key2 = "career"
      var value2 = data1.user.career
      var key3 = "phone"
      var value3 = data1.user.phone
      var key4 = "email"
      var value4 = data1.auth0.email
      data[i].landlord[key1]=value1
      data[i].landlord[key2]=value2
      data[i].landlord[key3]=value3
      data[i].landlord[key4]=value4
    }
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

/* create application */
router.post("/create", async function (req, res) {
  try {
    const data = await db.createApplication(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

/* delete application by id */
router.delete("/:id", async function (req, res) {
  try {
    const data = await db.deleteApplicationById(req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports.router = router;
