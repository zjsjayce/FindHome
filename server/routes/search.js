const e = require("cors");
const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const db = require("../db.js");

/* Search home */
router.get("/", async function (req, res) {
    /*  Search allhome, without keywords */
    if (req.query.keywords == null) {
        try {
            var cursor = await db.findAllHomes();
        } catch (err) {
            console.log(err);
        }

    }
    /* Search home by keywords */
    else {
        try {
            var cursor = await db.SearchHome(req.query.keywords);
        } catch (err) {
            console.log(err);
        }
    };
    /* sort the result, default is from low to high */
    if (req.query.price_sort == null) {
        var price_sort = 1;
        var mysort = { "home.price": price_sort };
    }
    else {
        var mysort = { "home.price": req.query.price_sort }
    };
    var data = await cursor.sort(mysort).toArray();

    //set the price min
    if (req.query.price_min == null) {
        console.log("req.query.price_min is null");
    }
    else {
        var data = data.filter(item => item.home.price >= req.query.price_min)
    };

    /* set the price max */
    if (req.query.price_max == null) {
        console.log("req.query.price_max is null");
    }
    else {
        var data = data.filter(item => item.home.price <= req.query.price_max)
    };


    /* select the home's type */
    if (req.query.type == null) {
    }
    else{
        var data = data.filter(item => item.home.type == req.query.type)
    };

    /* select the room number */
    if (req.query.room_num == null) {
        console.log("req.query.room_num is null");
    }
    else {
        var data = data.filter(item => item.home.room_num == req.query.room_num)
    };

    res.json(data);
});

module.exports.router = router;