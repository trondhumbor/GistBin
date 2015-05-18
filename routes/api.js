/**
 * Created by Tsh on 5/16/2015.
 */
var mongoose = require("mongoose");
var sanitize = require("mongo-sanitize");
var express = require("express");

var router = express.Router();


// Database
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/gist_database");

var Schema = mongoose.Schema;

var Gist = new Schema({
    title: { type: String, default: "No title" },
    description: { type: String, default: "No description" },
    data: { type: Object, required: true },
    modified: { type: Date, default: Date.now }
});

var GistModel = mongoose.model("Gist", Gist, process.env.MONGO_COLLECTION || "gists");

router.get("/api/gists/:id", function(req, res){
    var clean = sanitize(req.params.id);
    return GistModel.findById(clean, function(err, data){
        if(!err){
            res.send(data);
        }
    });
});

router.post("/api/gists", function (req, res){
    var gist = new GistModel({
        title: sanitize(req.body.title),
        description: sanitize(req.body.description),
        data: sanitize(req.body.data)
    });
    gist.save(function(err){if(err)console.log(err);});
    return res.send(gist);
});

module.exports = router;