var express = require('express');
var router = express.Router();
var request = require('request');
var https = require('https');
var data = require("../controllers/DataController.js");

// show index
router.get('/', function(req, res) {
  res.render('index');
});



// show temperature
router.get('/temperature',function(req,res){

    data.temperature(req,res);
});

// show temperature
router.get('/din1',function(req,res){

    data.din1(req,res);
});



// show acc
router.get('/accelerometer', function(req, res) {
  data.accelerometer(req, res);
});


// show time after 30 minutes
router.post('/time', function(req, res) {
  data.time(req, res);
});

module.exports = router;
