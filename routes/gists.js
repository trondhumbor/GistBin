/**
 * Created by Tsh on 5/17/2015.
 */
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/gists/:id", function(req, res, next) {
    res.render("gists");
});

module.exports = router;
