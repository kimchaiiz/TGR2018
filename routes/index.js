

var express = require('express');
var router = express.Router();
var data = require("../controllers/DataController.js");
var moment = require("moment");


var mongoose = require('mongoose');
var schema = require('../models/schema');
var alert = schema.alert;

	var team_id =[];
	var des =[];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Live Long and Prosper' });
});

router.get('/test', function(req, res, next) {
  res.render('status');
});

router.get('/allTeamSensor/:s_time/:e_time/',function(req,res,next){
  var start_time = req.params.s_time;
  var end_time = req.params.e_time;
  //console.log(start_time,end_time);
  data.time(start_time,end_time,res);
 // res.send({start_time,end_time});
})

router.get('/alertmatlab',function(req,res,next){
	    alert.find().sort({_id:-1}).exec(function(err, Datas) {
        if (err) {
            console.log("Error:", err);
        } else {
            res.render("status", { Datas: Datas});
        }
    });
	
});

var event ={"1":"Fire","2":"Tree","3":"Elephant","4":"Normal"}
router.post('/alertmatlab',function(req,res){
	team_id = req.body.teamID;
	des = req.body.alert;
for (var i=0;i<des.length;i++){
	        var data = new alert({
          teamID: team_id[i],
          alert: event[des[i]],
           date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

        });
	        data.save();
	        console.log(data);
	    }
});
module.exports = router;